import { create, Whatsapp, Message } from '@wppconnect-team/wppconnect';
import { estadoService } from './services/estado.service';
import { EstadoBot } from './types/index';
import { boasVindasHandler } from './handlers/boasVindas.handler';
import { escolhaServicoHandler } from './handlers/escolhaServico.handler';
import { agendamentoServicoHandler } from './handlers/agendamento.handler';

const mensagensHandler = {
    [EstadoBot.INICIO]: boasVindasHandler,
    [EstadoBot.ESCOLHA_SERVICO]: escolhaServicoHandler,
    [EstadoBot.AGENDAMENTO_SERVICO]: agendamentoServicoHandler,
    
}

create({
    session: process.env.WPP_SESSION || 'default'
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
        const estadoAtualUsuario = estadoService.get(numUsuario);

        console.log('--- Nova Mensagem Recebida ---');
        console.log('De:', message.from);
        console.log('Nome:', message.sender.pushname);
        console.log('Estado:', estadoAtualUsuario.etapa);
        console.log('Mensagem:', message.body);
        console.log('É de grupo?', message.isGroupMsg ? 'Sim' : 'Não');
        console.log('--------------------------------\n');
        
        const handler = mensagensHandler[estadoAtualUsuario.etapa];

        if(handler){
            try{
                await handler(client, message);
            }
            catch(error){
                console.log("Erro ao executar handler de: ", estadoAtualUsuario, "\nErro: ", error)
                await client.sendText(numUsuario, "Ops! Ocorreu um erro no nosso sistema. Por favor, tente novamente mais tarde.");
            }
        }
        else{
            console.log("Erro ao localizar um handler adequado.");
        }
    });

}