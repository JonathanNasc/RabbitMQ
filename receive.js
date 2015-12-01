var amqp = require('amqplib/callback_api');

// #1 Iniciamos a conexão com o RabbitMQ Server
amqp.connect('amqp://localhost', function(err, conn) {

	// #2 Criamos o canal para receber os comandos da nossa API
	conn.createChannel(function(err, ch) {
	    
		// #3 Declaramos uma fila que deve ser a mesma que foi enviada
	    var queue = 'helloword_queue';
	    ch.assertQueue(queue, {durable: false});

	    console.log(" [*] Aguardando %s. Para sair pressione CTRL+C", queue);

	    // #4 Aguardamos a mensagem
		ch.consume(queue, function(msg) {
	  		console.log(" [OK] Mensagem recebida: %s", msg.content.toString());
	  	}, {noAck: true});
	});
});