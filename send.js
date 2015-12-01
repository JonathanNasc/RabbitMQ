var amqp = require('amqplib/callback_api');
var mensagemTxt = process.argv[2] || "Hello Word!";

// #1 Iniciamos a conexão com o RabbitMQ Server
amqp.connect('amqp://localhost', function(err, conn) {
	
	// #2 Criamos o canal para enviar os comandos da nossa API
	conn.createChannel(function(err, ch) {
 	
	 	// #3 Declaramos uma fila que identificará a nossa mensagem
		var queue = 'helloword_queue';
	    ch.assertQueue(queue, {durable: false});
	    ch.sendToQueue(queue, new Buffer(mensagemTxt));
	    console.log("[OK] "+mensagemTxt+" enviado");

	});

	// #4 Fechamos a conexão
	setTimeout(function() { conn.close(); process.exit(0) }, 500);

});


