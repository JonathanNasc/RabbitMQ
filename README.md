# RabbitMQ Node.js sample

App em javascript que troca mensagens através do RabbitMQ.
O primeiro arquivo envia uma mensagem por vez e o segundo exibe todas as mensagens assim que recebidas.

## Configurações de ambiente

- [Instalar o RabbitMQ](https://www.rabbitmq.com/download.html)
- [Instalar o Node.js](https://nodejs.org/en/download/)
- ```git clone https://github.com/JonathanNasc/rabbitqm-node-sample```
- ```npm install```

## Testando o Hello World

- No primeiro terminal rode ```node send.js "mensagem teste" ```
- Em um segundo terminal ```node receive.js```

##Exemplo de API

Publisher

```javascript

var amqp = require('amqplib/callback_api');

// #1 Iniciamos a conexão com o RabbitMQ Server
amqp.connect('amqp://localhost', function(err, conn) {
	
	// #2 Criamos o canal para enviar os comandos da API
	conn.createChannel(function(err, ch) {
 	
	 	// #3 Declaramos uma fila que identificará a mensagem
		var queue = 'helloword_queue';
	    ch.assertQueue(queue, {durable: true});
	    ch.sendToQueue(queue, new Buffer("hello World"));//parâmetro opcional: {persistent: true}
	    console.log("[OK] mensagem enviada");

	});

	// #4 Fechamos a conexão
	setTimeout(function() { conn.close(); process.exit(0) }, 500);

});

```

Consumer

```javascript

var amqp = require('amqplib/callback_api');

// #1 Iniciamos a conexão com o RabbitMQ Server
amqp.connect('amqp://localhost', function(err, conn) {

	// #2 Criamos o canal para receber os comandos da API
	conn.createChannel(function(err, ch) {
	    
		// #3 Declaramos a fila. Deve ser a mesma da mensagem enviada
	    var queue = 'helloword_queue';
	    ch.assertQueue(queue, {durable: false});

	    // #4 Aguardamos a mensagem
		ch.consume(queue, function(msg) {
	  		console.log("Mensagem recebida: %s", msg.content.toString());
	  	}, {noAck: true});
	});
});

```
