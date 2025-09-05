import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { mensagensBot } from "../config/messages";
import { estadoService } from "../services/estado.service";
import { EstadoBot, EstadoUsuarioType } from "../types";

export async function escolhaServicoHandler(client: Whatsapp, message: Message){
    if (message.isGroupMsg || !message.body) return;

    const numUsuario = message.from;
    const escolhaUsuario = parseInt(message.body.trim().toLowerCase(), 10);

    if(!isNaN(escolhaUsuario) && escolhaUsuario in mensagensBot.servicosEscolhidos) {

        const novoEstadoUsuario: EstadoUsuarioType = {
            etapa: EstadoBot.AGENDAMENTO_SERVICO,
            servico: escolhaUsuario
        }
        estadoService.set(numUsuario, novoEstadoUsuario);
        console.log(numUsuario, "Agora está no estado: ", novoEstadoUsuario);

        await client.sendText(numUsuario, mensagensBot.servicosEscolhidos[escolhaUsuario]);
    }
    else{
        await client.sendText(numUsuario, mensagensBot.opcaoInvalida);
    }
}