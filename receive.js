var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
	    var queue = 'helloword_queue';
	    ch.assertQueue(queue, {durable: false});

	    console.log(" [*] Aguardando %s. Para sair pressione CTRL+C", queue);

		ch.consume(queue, function(msg) {
	  		console.log(" [OK] Mensagem recebida: %s", msg.content.toString());
	  	}, {noAck: true});
	});
});