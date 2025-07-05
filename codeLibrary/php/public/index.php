<?php

// public/index.php

require_once __DIR__ . '/../vendor/autoload.php'; // Inclui o autoloader do Composer

use App\Controllers\HomeController;

// Habilita a exibição de erros para depuração (MUDAR PARA PROD!)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Função simples de roteamento
function route(string $path, callable $callback) {
    global $routes;
    $routes[$path] = $callback;
}

// Array para armazenar as rotas
$routes = [];

// --- Definição das Rotas ---

route('/', function() {
    $controller = new HomeController();
    $controller->index();
});

route('/about', function() {
    $controller = new HomeController();
    $controller->about();
});

// --- Processamento da Requisição ---

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove a barra final se existir (para normalizar as rotas)
if ($requestUri !== '/' && substr($requestUri, -1) === '/') {
    $requestUri = rtrim($requestUri, '/');
}


if (array_key_exists($requestUri, $routes)) {
    $routes[$requestUri](); // Executa a função associada à rota
} else {
    // Rota não encontrada - Página 404
    http_response_code(404);
    echo "<h1>404 - Página Não Encontrada</h1>";
    echo "<p>A página que você solicitou '$requestUri' não existe.</p>";
}
