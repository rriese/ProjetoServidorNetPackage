var net = require('net'),
	readline = require('readline'), 
	client = new net.Socket(),
	rl = readline.createInterface(
		process.stdin,
		process.stdout
	);

// Inicia inserindo o nome da pessoa
rl.question("Digite o nome: ", function (nome) {
	
	// Conecta com o servidor
	client.connect(3000, 'localhost', function () {
		client.write(`${nome} entrou na conversa. Digite algo..`);
		setPrompt(nome);
	});
	
	// Processa o texto digitado e converte
	client.on('data', (data) => {
		console.log(String.fromCharCode.apply(null, data));
		setPrompt(nome);
	});

	// A cada enter dado pelo usuário
	rl.on('line', (line) => {
		client.write(`${nome}: ${line}`)
		setPrompt(nome);
	});

});

// Seta o nome da pessoa no prompt
function setPrompt(nome) {
	rl.setPrompt(`${nome}: `);
	rl.prompt();
}