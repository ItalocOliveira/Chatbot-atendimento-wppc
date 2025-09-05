import { EstadoBot, EstadoUsuarioType } from "../types/index";

class EstadoService {
    private estadoUsuario: Map<string, EstadoUsuarioType>;

    constructor(){
        this.estadoUsuario = new Map<string, EstadoUsuarioType>();
    }

    // Retorna o estado atual do usuário
    get(numUsuario: string): EstadoUsuarioType{
        return this.estadoUsuario.get(numUsuario) || { etapa: EstadoBot.INICIO };
    }

    // Seta um novo estado para um usuário
    set(numUsuario: string, estadoUsuario: EstadoUsuarioType): void{
        this.estadoUsuario.set(numUsuario, estadoUsuario);
        console.log(`Estado de ${numUsuario} atualizado para:`, estadoUsuario);
    }

    // Reseta o estado de um usuário(retira da lista de estados)
    reset(numUsuario: string): void{
        this.estadoUsuario.delete(numUsuario);
        console.log(`Estado de ${numUsuario} resetado. Usuário excluído da lista de estados.`);
    }
}

export const estadoService = new EstadoService();