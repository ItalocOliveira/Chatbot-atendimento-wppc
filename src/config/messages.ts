import { MensagemType } from "../types";

// Mensagens do bot
export const mensagensBot: MensagemType = {
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