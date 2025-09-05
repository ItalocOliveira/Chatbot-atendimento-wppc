// Enum para definir possiveis estados do bot durante o atendimento
export enum EstadoBot {
    INICIO = 'INICIO',
    ESCOLHA_SERVICO = 'ESCOLHA_SERVICO',
    AGENDAMENTO_SERVICO = 'AGENDANDO_SERVICO',
}

// Type para definir estrutura do estado de cada usuário na sessão
export type EstadoUsuarioType = {
    etapa: EstadoBot;
    servico?: number;
};

// Type para definir estrutura das mensagens
export type MensagemType = {
    boasVindas: string;
    opcoesServicos: string;
    servicosEscolhidos: {
        [key: number]: string;
    };
    agendamentoSucesso: string;
    iniciarAtendimento: string;
    opcaoInvalida: string;
}