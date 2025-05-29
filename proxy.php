<?php
// proxy.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/vnd.apple.mpegurl');

$url = isset($_GET['url']) ? $_GET['url'] : '';
if (empty($url)) {
    die('URL parameter missing');
}

// Forward headers from the original request
$opts = [
    'http' => [
        'method' => 'GET',
        'header' => implode("\r\n", [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        ])
    ]
];

$context = stream_context_create($opts);
$content = file_get_contents($url, false, $context);

if ($content === false) {
    http_response_code(404);
    die('Stream not found');
}

echo $content;
?>