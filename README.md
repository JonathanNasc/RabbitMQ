# RabbitMQ Node.js sample

App em javascript que troca mensagens através do RabbitMQ.
O primeiro arquivo envia uma mensagem por vez e o segundo exibe todas as mensagens assim que recebidas.

## Configurações de ambiente

- [Instalar o RabbitMQ](https://www.rabbitmq.com/download.html)
- [Instalar o Node.js](https://nodejs.org/en/download/)
- ```git clone https://github.com/JonathanNasc/rabbitqm-node-sample```
- ```npm install```

## Testando

- No primeiro terminal rode ```node receive.js```
- Em um segundo terminal ```node send.js "mensagem teste" ```
