var amqp = require('amqplib/callback_api');
var mensagemTxt = process.argv[2] || "Hello Word!";

amqp.connect('amqp://localhost', function(err, conn) {
	conn.createChannel(function(err, ch) {
		var queue = 'helloword_queue';
	    ch.assertQueue(queue, {durable: false});
	    ch.sendToQueue(queue, new Buffer(mensagemTxt));
	    console.log("[OK] "+mensagemTxt+" enviado");
	});
	setTimeout(function() { conn.close(); process.exit(0) }, 500);
});


