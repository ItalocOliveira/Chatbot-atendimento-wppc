const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect
    .create({
        session: 'sessao'
    })
    .then((client) => start(client))
    .catch((error) => {
        console.error('Erro ao criar o cliente:', error);
    });

async function start(client) {
    console.log('Cliente iniciado! Escaneie o QR Code com seu celular.');

    // QR code será gerado no terminal.

    console.log('Aguardando novas mensagens...');

    const estadosEnum = {
        ESCOLHA_SERVICO: 'ESCOLHA_SERVICO',
        SERVICO_AGENDADO: 'SERVICO_AGENDADO',
    };

    const estadosUsuarios = new Map();

    const mensagens = {
                opcoesServicos: [
                    "Temos alguns serviços disponíveis, escolha pelo número:\n" +
                    "1️⃣ Limpeza dentária\n" +
                    "2️⃣ Clareamento dental\n" +
                    "3️⃣ Consulta de avaliação\n" +
                    "4️⃣ Tratamento de canal\n" +
                    "5️⃣ Extração de dente"
                ],

                servicosEscolhidos: {
                    1: "Você escolheu 🪥 Limpeza dentária.\n📅 Informe a data desejada (ex: 15/09)\n🕒 E o horário (manhã, tarde ou noite).",
                    2: "Você escolheu ✨ Clareamento dental.\n📅 Informe a data desejada (ex: 15/09)\n🕒 E o horário (manhã, tarde ou noite).",
                    3: "Você escolheu 👩‍⚕️ Consulta de avaliação.\n📅 Informe a data desejada (ex: 15/09)\n🕒 E o horário (manhã, tarde ou noite).",
                    4: "Você escolheu 🦷 Tratamento de canal.\n📅 Informe a data desejada (ex: 15/09)\n🕒 E o horário (manhã, tarde ou noite).",
                    5: "Você escolheu 🦷 Extração de dente.\n📅 Informe a data desejada (ex: 15/09)\n🕒 E o horário (manhã, tarde ou noite)."
                },      
    }

    // Listener de mensagens
    client.onMessage(async (message) => {
        console.log('--- Nova Mensagem Recebida ---');
        console.log('De:', message.from); // Número de quem enviou
        console.log('Nome:', message.sender.pushname); // Nome do contato/usuário
        console.log('Mensagem:', message.body); // O conteúdo da mensagem
        console.log('É de grupo?', message.isGroupMsg ? 'Sim' : 'Não'); // Verifica se é mensagem de grupo
        console.log('--------------------------------\n');

        // Ignora mensagens sem texto
        if (!message.body) return;

        const numDestino = message.from
        const mensagemUsuario = message.body.trim().toLowerCase();

        // Verificando resposta do usuário
        if(mensagemUsuario === "oi"){
            
            // Responde o usuário se a mensagem recebida for "oi"
            try {
                await client.sendText(numDestino, "Olá 👋 Seja bem-vindo(a) à nossa clínica odontológica!");
                await client.sendText(numDestino, mensagens.opcoesServicos.join("\n"));
                console.log('Resposta enviada com sucesso.');
            } 
            catch (error) {
                console.error('Erro ao enviar mensagem:', error);
            }

            await client.sendText(numDestino);

            // Setando estado atual do usuário
            estadosUsuarios.set(numDestino, {etapa: estadosEnum.ESCOLHA_SERVICO});
            const estadoAtual = estadosUsuarios.get(numDestino);
            console.log(numDestino, "Agora está no estado: ", estadoAtual);
        }

        else{
            const estadoAtual = estadosUsuarios.get(numDestino);

            // Se o usuário não tiver um estado
            if (!estadoAtual) {
                await client.sendText(numDestino, "Para iniciar o atendimento, por favor, me envie um 'oi'.");
                return;
            }

            if (estadoAtual.etapa === estadosEnum.ESCOLHA_SERVICO){
                // Converte a resposta do usuário em número ou throw erro
                const escolhaUsuario = parseInt(mensagemUsuario);

                // Verifica se a escolha do usuário está dentro das opções
                if (!isNaN(escolhaUsuario) && mensagens.servicosEscolhidos[escolhaUsuario]){
                    try{
                        await client.sendText(numDestino, mensagens.servicosEscolhidos[escolhaUsuario]);

                        // Atualizando estado do usuário
                        estadosUsuarios.set(numDestino, {
                            etapa: estadosEnum.SERVICO_AGENDADO,
                            servico: escolhaUsuario
                        });

                        // TODO: Sistema de horario

                        await client.sendText(numDestino, "Seu serviço foi agendado com sucesso!");
                        console.log(numDestino, "Agora está no estado: ", estadoAtual);
                    }
                    catch(error){
                        console.log("Erro ao enviar mensagem.", error)
                    }
                }
            }
        }
    })

}


        