<?php
/**
 * 3D Model Library API — PHP 7.0 compatible
 *
 * Serves and stores STEP files for the rec-circuit-design MCP tool.
 * Deploy to: rec-admin/api/3d-models.php on Lightsail server.
 *
 * GET    ?part=KEY           - Returns STEP file (gzip or decompressed per Accept-Encoding)
 * GET    ?list=1             - Returns JSON index of all stored models (auto-migrates legacy .step)
 * GET    ?search=QUERY       - Search models by part number, package, manufacturer, tags
 * GET    ?search=Q&field=F   - Search a specific metadata field only
 * PUT    (JSON body)         - Stores a new STEP file (base64 or gzip+base64)
 * POST   (multipart)         - Browser file upload (admin UI drag-and-drop)
 * DELETE ?part=KEY           - Remove a model and its metadata
 *
 * Auth: Bearer token in Authorization header.
 */

$API_KEY = getenv('REC_3D_MODELS_KEY') ? getenv('REC_3D_MODELS_KEY') : 'rec-3d-models-2026';
$STORAGE_DIR = __DIR__ . '/../../data/3d-models';

// ── Auth ──

function authenticate($apiKey) {
    $header = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
    if (strpos($header, 'Bearer ') !== 0) {
        http_response_code(401);
        echo json_encode(array('error' => 'Missing Authorization header'));
        exit;
    }
    $token = substr($header, 7);
    if (!hash_equals($apiKey, $token)) {
        http_response_code(403);
        echo json_encode(array('error' => 'Invalid API key'));
        exit;
    }
}

// ── Helpers ──

function safeKey($key) {
    return preg_replace('/[^a-zA-Z0-9._-]/', '_', $key);
}

function ensureStorageDir($dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

function _g($arr, $key, $default = null) {
    return isset($arr[$key]) ? $arr[$key] : $default;
}

/**
 * Resolve the STEP file path for a key, preferring .step.gz over .step.
 * Returns array(path, isGzipped) or array(null, false) if not found.
 */
function resolveStepFile($dir, $key) {
    $gzPath = $dir . '/' . $key . '.step.gz';
    if (file_exists($gzPath)) return array($gzPath, true);
    $plainPath = $dir . '/' . $key . '.step';
    if (file_exists($plainPath)) return array($plainPath, false);
    return array(null, false);
}

/**
 * Load all model metadata files into an array.
 */
function loadAllMeta($dir) {
    $models = array();
    $metaFiles = glob($dir . '/*.json');
    if (!$metaFiles) return $models;
    foreach ($metaFiles as $metaFile) {
        $meta = json_decode(file_get_contents($metaFile), true);
        if (!$meta || !isset($meta['key'])) continue;
        $key = $meta['key'];
        $resolved = resolveStepFile($dir, $key);
        $stepPath = $resolved[0];
        if (!$stepPath) continue;
        $meta['compressedSize'] = filesize($stepPath);
        $meta['modified'] = date('c', filemtime($stepPath));
        $models[] = $meta;
    }
    return $models;
}

/**
 * Migrate legacy .step files to .step.gz on first list call.
 */
function migrateLegacyFiles($dir) {
    $migrated = 0;
    $legacyFiles = glob($dir . '/*.step');
    if (!$legacyFiles) return 0;
    foreach ($legacyFiles as $plainPath) {
        $key = basename($plainPath, '.step');
        $gzPath = $dir . '/' . $key . '.step.gz';
        if (file_exists($gzPath)) continue;
        $data = file_get_contents($plainPath);
        if ($data === false) continue;
        $compressed = gzencode($data, 9);
        if ($compressed === false) continue;
        file_put_contents($gzPath, $compressed);
        $metaFile = $dir . '/' . $key . '.json';
        if (file_exists($metaFile)) {
            $meta = json_decode(file_get_contents($metaFile), true);
            if (!$meta) $meta = array();
            $meta['uncompressedSize'] = strlen($data);
            $meta['compressedSize'] = strlen($compressed);
            file_put_contents($metaFile, json_encode($meta, JSON_PRETTY_PRINT));
        }
        unlink($plainPath);
        $migrated++;
    }
    return $migrated;
}

/**
 * Case-insensitive substring check (PHP 7 polyfill for str_contains).
 */
function contains_ci($haystack, $needle) {
    return strpos(strtolower($haystack), strtolower($needle)) !== false;
}

// ── Main ──

header('Content-Type: application/json');
authenticate($API_KEY);
ensureStorageDir($STORAGE_DIR);

$method = $_SERVER['REQUEST_METHOD'];

// ── GET ──

if ($method === 'GET') {

    // Search models
    if (isset($_GET['search'])) {
        $query = strtolower(trim($_GET['search']));
        $field = isset($_GET['field']) ? trim($_GET['field']) : null;
        $searchableFields = array('partNumber', 'manufacturer', 'packageName', 'category', 'key');

        $allMeta = loadAllMeta($STORAGE_DIR);
        $matched = array();

        foreach ($allMeta as $meta) {
            $found = false;
            if ($field && in_array($field, $searchableFields)) {
                $val = _g($meta, $field, '');
                if (contains_ci($val, $query)) $found = true;
            } elseif ($field === 'tags') {
                $tags = _g($meta, 'tags', array());
                foreach ($tags as $tag) {
                    if (contains_ci($tag, $query)) { $found = true; break; }
                }
            } else {
                foreach ($searchableFields as $f) {
                    if (contains_ci(_g($meta, $f, ''), $query)) { $found = true; break; }
                }
                if (!$found) {
                    $tags = _g($meta, 'tags', array());
                    foreach ($tags as $tag) {
                        if (contains_ci($tag, $query)) { $found = true; break; }
                    }
                }
            }
            if ($found) $matched[] = $meta;
        }

        echo json_encode(array('count' => count($matched), 'query' => $_GET['search'],
                               'field' => $field, 'models' => $matched), JSON_PRETTY_PRINT);
        exit;
    }

    // List all models (with auto-migration)
    if (isset($_GET['list'])) {
        $migrated = migrateLegacyFiles($STORAGE_DIR);
        $allMeta = loadAllMeta($STORAGE_DIR);

        $totalCompressed = 0;
        $totalUncompressed = 0;
        foreach ($allMeta as $m) {
            $totalCompressed += _g($m, 'compressedSize', 0);
            $totalUncompressed += _g($m, 'uncompressedSize', 0);
        }

        $result = array(
            'count' => count($allMeta),
            'totalCompressedBytes' => $totalCompressed,
            'totalUncompressedBytes' => $totalUncompressed,
            'models' => $allMeta,
        );
        if ($migrated > 0) $result['migrated'] = $migrated;
        echo json_encode($result, JSON_PRETTY_PRINT);
        exit;
    }

    // Fetch a specific model
    if (!isset($_GET['part'])) {
        http_response_code(400);
        echo json_encode(array('error' => 'Missing ?part= parameter'));
        exit;
    }

    $key = safeKey($_GET['part']);
    $resolved = resolveStepFile($STORAGE_DIR, $key);
    $filePath = $resolved[0];
    $isGzipped = $resolved[1];

    if (!$filePath) {
        http_response_code(404);
        echo json_encode(array('error' => 'Model not found', 'key' => $key));
        exit;
    }

    $acceptEncoding = isset($_SERVER['HTTP_ACCEPT_ENCODING']) ? $_SERVER['HTTP_ACCEPT_ENCODING'] : '';
    $clientAcceptsGzip = strpos($acceptEncoding, 'gzip') !== false;

    if ($isGzipped && $clientAcceptsGzip) {
        header('Content-Type: application/step');
        header('Content-Encoding: gzip');
        header('Content-Disposition: attachment; filename="' . $key . '.step"');
        header('Content-Length: ' . filesize($filePath));
        readfile($filePath);
    } elseif ($isGzipped) {
        $data = gzdecode(file_get_contents($filePath));
        header('Content-Type: application/step');
        header('Content-Disposition: attachment; filename="' . $key . '.step"');
        header('Content-Length: ' . strlen($data));
        echo $data;
    } else {
        header('Content-Type: application/step');
        header('Content-Disposition: attachment; filename="' . $key . '.step"');
        header('Content-Length: ' . filesize($filePath));
        readfile($filePath);
    }
    exit;
}

// ── PUT (JSON body) ──

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || !isset($input['key']) || !isset($input['stepData'])) {
        http_response_code(400);
        echo json_encode(array('error' => 'PUT body must include key and stepData (base64)'));
        exit;
    }

    $key = safeKey($input['key']);
    $encoding = _g($input, 'encoding', 'base64');
    $rawData = base64_decode($input['stepData'], true);

    if ($rawData === false || strlen($rawData) < 50) {
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid or empty stepData'));
        exit;
    }

    if ($encoding === 'gzip+base64') {
        $compressed = $rawData;
        $uncompressed = gzdecode($rawData);
        $uncompressedSize = ($uncompressed !== false) ? strlen($uncompressed) : null;
        $compressedSize = strlen($compressed);
    } else {
        $uncompressedSize = strlen($rawData);
        $compressed = gzencode($rawData, 9);
        $compressedSize = strlen($compressed);
    }

    $filePath = $STORAGE_DIR . '/' . $key . '.step.gz';
    file_put_contents($filePath, $compressed);

    $legacyPath = $STORAGE_DIR . '/' . $key . '.step';
    if (file_exists($legacyPath)) unlink($legacyPath);

    // Merge with existing metadata if re-uploading (preserve usedInDesigns etc.)
    $metaFile = $STORAGE_DIR . '/' . $key . '.json';
    $existingMeta = array();
    if (file_exists($metaFile)) {
        $existingMeta = json_decode(file_get_contents($metaFile), true);
        if (!$existingMeta) $existingMeta = array();
    }

    // Merge usedInDesigns: combine existing + new
    $existingDesigns = _g($existingMeta, 'usedInDesigns', array());
    $newDesigns = _g($input, 'usedInDesigns', array());
    $mergedDesigns = array_values(array_unique(array_merge($existingDesigns, $newDesigns)));

    $meta = array(
        'key' => $key,
        'partNumber' => _g($input, 'partNumber', $key),
        'manufacturer' => _g($input, 'manufacturer'),
        'packageName' => _g($input, 'packageName'),
        'category' => _g($input, 'category'),
        'tags' => _g($input, 'tags', array()),
        'sourceUrl' => _g($input, 'sourceUrl'),
        'usedInDesigns' => $mergedDesigns,
        'uploadedAt' => date('c'),
        'compressedSize' => $compressedSize,
        'uncompressedSize' => $uncompressedSize,
    );
    file_put_contents($metaFile, json_encode($meta, JSON_PRETTY_PRINT));

    echo json_encode(array(
        'status' => 'stored',
        'key' => $key,
        'compressedSize' => $compressedSize,
        'uncompressedSize' => $uncompressedSize,
    ));
    exit;
}

// ── POST (multipart file upload) ──

if ($method === 'POST') {
    if (!isset($_FILES['stepFile']) || $_FILES['stepFile']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(array('error' => 'Missing or invalid stepFile upload'));
        exit;
    }

    $uploadedFile = $_FILES['stepFile'];
    $rawData = file_get_contents($uploadedFile['tmp_name']);

    if (strlen($rawData) < 50) {
        http_response_code(400);
        echo json_encode(array('error' => 'Uploaded file is too small'));
        exit;
    }

    $partNumber = isset($_POST['partNumber']) ? trim($_POST['partNumber']) : '';
    $manufacturer = isset($_POST['manufacturer']) ? trim($_POST['manufacturer']) : '';
    $packageName = isset($_POST['packageName']) ? trim($_POST['packageName']) : '';
    $category = isset($_POST['category']) ? trim($_POST['category']) : '';
    $tagsRaw = isset($_POST['tags']) ? trim($_POST['tags']) : '';
    $tags = $tagsRaw ? array_map('trim', explode(',', $tagsRaw)) : array();

    $manufacturer = $manufacturer ?: null;
    $packageName = $packageName ?: null;
    $category = $category ?: null;

    if (!$partNumber) {
        $partNumber = pathinfo($uploadedFile['name'], PATHINFO_FILENAME);
    }
    $key = safeKey($partNumber);
    if ($packageName) {
        $key .= '__' . safeKey($packageName);
    }

    $uncompressedSize = strlen($rawData);
    $compressed = gzencode($rawData, 9);
    $compressedSize = strlen($compressed);

    $filePath = $STORAGE_DIR . '/' . $key . '.step.gz';
    file_put_contents($filePath, $compressed);

    $legacyPath = $STORAGE_DIR . '/' . $key . '.step';
    if (file_exists($legacyPath)) unlink($legacyPath);

    $meta = array(
        'key' => $key,
        'partNumber' => $partNumber,
        'manufacturer' => $manufacturer,
        'packageName' => $packageName,
        'category' => $category,
        'tags' => $tags,
        'sourceUrl' => 'browser-upload',
        'uploadedAt' => date('c'),
        'compressedSize' => $compressedSize,
        'uncompressedSize' => $uncompressedSize,
    );
    $metaFile = $STORAGE_DIR . '/' . $key . '.json';
    file_put_contents($metaFile, json_encode($meta, JSON_PRETTY_PRINT));

    echo json_encode(array(
        'status' => 'stored',
        'key' => $key,
        'compressedSize' => $compressedSize,
        'uncompressedSize' => $uncompressedSize,
    ));
    exit;
}

// ── DELETE ──

if ($method === 'DELETE') {
    if (!isset($_GET['part'])) {
        http_response_code(400);
        echo json_encode(array('error' => 'Missing ?part= parameter'));
        exit;
    }

    $key = safeKey($_GET['part']);
    $deleted = false;

    foreach (array('.step.gz', '.step', '.json') as $ext) {
        $path = $STORAGE_DIR . '/' . $key . $ext;
        if (file_exists($path)) {
            unlink($path);
            $deleted = true;
        }
    }

    if (!$deleted) {
        http_response_code(404);
        echo json_encode(array('error' => 'Model not found', 'key' => $key));
        exit;
    }

    echo json_encode(array('status' => 'deleted', 'key' => $key));
    exit;
}

http_response_code(405);
echo json_encode(array('error' => 'Method not allowed. Use GET, PUT, POST, or DELETE.'));
