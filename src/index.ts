import { create, Whatsapp, Message } from '@wppconnect-team/wppconnect';

// Enum para definir possiveis estados do bot durante o atendimento
enum EstadosBot {
    INICIO = 'INICIO',
    ESCOLHA_SERVICO = 'ESCOLHA_SERVICO',
    AGENDANDO_SERVICO = 'AGENDANDO_SERVICO',
}

// Type para definir estrutura do estado de cada usuário na sessão
type EstadoUsuario = {
    etapa: EstadosBot;
    servico?: number;
};

const estadosUsuarios = new Map<string, EstadoUsuario>();

// Type para definir estrutura das mensagens
type MensagensTipo = {
    boasVindas: string;
    opcoesServicos: string;
    servicosEscolhidos: {
        [key: number]: string;
    };
    agendamentoSucesso: string;
    iniciarAtendimento: string;
    opcaoInvalida: string;
}

// Mensagens do bot
const mensagensBot: MensagensTipo = {
    boasVindas: "Olá 👋 Seja bem-vindo(a) à nossa clínica odontológica!",
    opcoesServicos:
        "Temos alguns serviços disponíveis, escolha pelo número:\n" +
        "1️⃣ Limpeza dentária\n" +
        "2️⃣ Clareamento dental\n" +
        "3️⃣ Consulta de avaliação\n" +
        "4️⃣ Tratamento de canal\n" +
        "5️⃣ Extração de dente",
    servicosEscolhidos: {
        1: "Você escolheu 🪥 Limpeza dentária.\n📅 Informe a data desejada (ex: 15/09)\n🕒 E o horário (manhã, tarde ou noite).",
        2: "Você escolheu ✨ Clareamento dental.\n📅 Informe a data desejada (ex: 15/09)\n🕒 E o horário (manhã, tarde ou noite).",
        3: "Você escolheu 👩‍⚕️ Consulta de avaliação.\n📅 Informe a data desejada (ex: 15/09)\n🕒 E o horário (manhã, tarde ou noite).",
        4: "Você escolheu 🦷 Tratamento de canal.\n📅 Informe a data desejada (ex: 15/09)\n🕒 E o horário (manhã, tarde ou noite).",
        5: "Você escolheu 🦷 Extração de dente.\n📅 Informe a data desejada (ex: 15/09)\n🕒 E o horário (manhã, tarde ou noite).",
    },
    agendamentoSucesso: "Seu serviço foi agendado com sucesso!",
    iniciarAtendimento: "Para iniciar o atendimento, por favor, me envie um 'oi'.",
    opcaoInvalida: "Opção inválida. Por favor, escolha um número da lista.",
};

create({
    session: 'sessao'
    })
.then((client: Whatsapp): Promise<void> => start(client))
.catch((error) => {
    console.error('Erro ao criar o cliente:', error);
});

async function start(client: Whatsapp): Promise<void> {
    // QR code será gerado no terminal.
    console.log('Cliente iniciado! Escaneie o QR Code com seu celular.')
    console.log('Aguardando novas mensagens...');
    
    // Listener de mensagens
    client.onMessage(async (message: Message) => {

        // Ignora mensagens de grupo ou vazias
        if (message.isGroupMsg || !message.body) return;

        const numUsuario = message.from;
        const mensagemUsuario = message.body.trim().toLowerCase();
        const estadoAtualUsuario = estadosUsuarios.get(numUsuario);

        console.log('--- Nova Mensagem Recebida ---');
        console.log('De:', message.from); // Número de quem enviou
        console.log('Nome:', message.sender.pushname); // Nome do contato/usuário
        console.log('Mensagem:', message.body); // O conteúdo da mensagem
        console.log('É de grupo?', message.isGroupMsg ? 'Sim' : 'Não'); // Verifica se é mensagem de grupo
        console.log('--------------------------------\n');
        
        switch(estadoAtualUsuario?.etapa) {
            case EstadosBot.ESCOLHA_SERVICO:
                const escolhaUsuario = parseInt(mensagemUsuario, 10);

                if(!isNaN(escolhaUsuario) && escolhaUsuario in mensagensBot.servicosEscolhidos) {

                    const novoEstadoUsuario: EstadoUsuario = {
                        etapa: EstadosBot.AGENDANDO_SERVICO,
                        servico: escolhaUsuario
                    }
                    estadosUsuarios.set(numUsuario, novoEstadoUsuario);
                    console.log(numUsuario, "Agora está no estado: ", novoEstadoUsuario);

                    await client.sendText(numUsuario, mensagensBot.servicosEscolhidos[escolhaUsuario]);
                }
                else{
                    await client.sendText(numUsuario, mensagensBot.opcaoInvalida);
                }
                break;
            case EstadosBot.AGENDANDO_SERVICO:

                // TODO: Implementar lógica de data/hora
                
                await client.sendText(numUsuario, "Obrigado! Seu agendamento foi confirmado para " + mensagemUsuario);
                estadosUsuarios.delete(numUsuario);

                break;
            default:
                // Lida com inicio de conversa
                if(mensagemUsuario === "oi"){
                    try{
                        await client.sendText(numUsuario, mensagensBot.boasVindas);
                        await client.sendText(numUsuario, mensagensBot.opcoesServicos);

                        // Adiciona estado ao usuário
                        const novoEstadoUsuario: EstadoUsuario = {
                            etapa: EstadosBot.ESCOLHA_SERVICO,
                        }
                        estadosUsuarios.set(numUsuario, novoEstadoUsuario);
                        console.log(numUsuario, "agora está no estado:", novoEstadoUsuario);
                    }
                    catch(error){
                        console.log("Erro ao enviar boas-vindas: ", error);
                    }
                }
                else{
                    await client.sendText(numUsuario, mensagensBot.iniciarAtendimento);
                }
                break;
        }
    });

}