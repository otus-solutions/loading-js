# loading-js
Basic Loading Page 

## Artefatos
```html
<script src="node_modules/loading/loading-min.js"></script>
<link href="node_modules/loading/loading.css" rel="stylesheet" />
```

## Importação de Módulo
```javascript
(function() {
    angular
        .module('modulo', [
            'loading'
        ]);
}());
```

## Utilização

Iniciar
```javascript
LoadingPlayer.start()
```
Parar
```javascript
LoadingPlayer.stop()
```
Alterar Mensagem
```javascript
LoadingPlayer.changeMessage('Carregando Informações')
```
