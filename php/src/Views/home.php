<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($title ?? 'Meu Projeto PHP'); ?></title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; background-color: #f4f4f4; color: #333; }
        .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        h1, h2 { color: #0056b3; }
        ul { list-style: none; padding: 0; }
        ul li { background: #e2e2e2; margin-bottom: 5px; padding: 10px; border-radius: 4px; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1><?php echo htmlspecialchars($title ?? 'Título Padrão'); ?></h1>
        <p><?php echo htmlspecialchars($message ?? 'Mensagem Padrão'); ?></p>

        <h2>Recursos Demonstrados:</h2>
        <ul>
            <?php if (isset($features) && is_array($features)): ?>
                <?php foreach ($features as $feature): ?>
                    <li><?php echo htmlspecialchars($feature); ?></li>
                <?php endforeach; ?>
            <?php else: ?>
                <li>Nenhum recurso especificado.</li>
            <?php endif; ?>
        </ul>

        <p><a href="/about">Saiba mais sobre nós</a></p>
    </div>
</body>
</html>
