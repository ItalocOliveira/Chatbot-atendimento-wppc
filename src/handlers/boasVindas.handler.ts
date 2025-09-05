import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { mensagensBot } from "../config/messages";
import { EstadoBot, EstadoUsuarioType } from "../types";
import { estadoService } from "../services/estado.service";

export async function boasVindasHandler(client: Whatsapp, message: Message){

    if (message.isGroupMsg || !message.body) return;

    const numUsuario = message.from;
    const mensagemUsuario = message.body.trim().toLowerCase();

    if(mensagemUsuario === "oi"){
        try{
            await client.sendText(numUsuario, mensagensBot.boasVindas);
            await client.sendText(numUsuario, (mensagensBot.opcoesServicos + "\n*Sistema de horarios ainda incompleto*"));

            // Adiciona estado ao usuário
            const novoEstadoUsuario: EstadoUsuarioType = {
                etapa: EstadoBot.ESCOLHA_SERVICO,
            }
            estadoService.set(numUsuario, novoEstadoUsuario);
            console.log(numUsuario, "agora está no estado:", novoEstadoUsuario);
        }
        catch(error){
            console.log("Erro ao enviar boas-vindas: ", error);
        }
    }
    else{
        await client.sendText(numUsuario, "Gostaria de iniciar um atendimento? Envie um 'oi'.");
    }
}