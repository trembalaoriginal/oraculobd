<?php

// src/Controllers/HomeController.php

namespace App\Controllers;

class HomeController
{
    public function index()
    {
        $data = [
            'title' => 'Bem-vindo ao Meu Super PHP!',
            'message' => 'Este é um exemplo de página inicial com 10000% de melhoria (metafórica)!',
            'features' => [
                'Roteamento Simples',
                'Estrutura MVC-like',
                'Autoloading PSR-4',
                'Gerenciamento de Dependências com Composer',
                'Código Organizado e Escalável'
            ]
        ];

        $this->render('home', $data);
    }

    public function about()
    {
        $data = [
            'title' => 'Sobre Nós',
            'content' => 'Nós somos uma iniciativa para mostrar o poder do PHP moderno!'
        ];

        $this->render('about', $data);
    }

    /**
     * Helper para incluir as views.
     * @param string $viewName Nome do arquivo da view (sem a extensão .php)
     * @param array $data Dados a serem passados para a view
     */
    protected function render(string $viewName, array $data = [])
    {
        // Transforma os dados do array em variáveis acessíveis na view
        extract($data);

        $viewPath = __DIR__ . '/../Views/' . $viewName . '.php';

        if (file_exists($viewPath)) {
            require_once $viewPath;
        } else {
            die("Erro: View '$viewName.php' não encontrada.");
        }
    }
}
