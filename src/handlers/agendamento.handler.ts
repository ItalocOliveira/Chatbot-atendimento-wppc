import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { estadoService } from "../services/estado.service";

export async function agendamentoServicoHandler(client: Whatsapp, message: Message){
    if (message.isGroupMsg || !message.body) return;

    const numUsuario = message.from;
    const mensagemUsuario = message.body.trim().toLowerCase();

    await client.sendText(numUsuario, "Obrigado! Seu agendamento foi confirmado para " + mensagemUsuario);
    estadoService.reset(numUsuario);
}