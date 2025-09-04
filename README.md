# 🤖 Chatbot de Agendamento para WhatsApp com Node.js

Um chatbot simples para WhatsApp, desenvolvido em **Node.js** com a biblioteca **@wppconnect-team/wppconnect**, para automatizar o agendamento de serviços de uma clínica odontológica.  
O bot utiliza uma **máquina de estados** para guiar o usuário desde a saudação inicial até a confirmação do agendamento.

---

## ✨ Funcionalidades

- **Conexão via QR Code**: Autentica a sessão do WhatsApp de forma simples.  
- **Menu Interativo**: Apresenta um menu de serviços para o usuário escolher.  
- **Gerenciamento de Estado**: Controla o fluxo da conversa para cada cliente.  
- **Agendamento Simples**: Coleta o serviço desejado, data e horário.  

---

## 🚀 Tecnologias

- **Node.js** → Ambiente de execução.  
- **TypeScript** → Linguaguem utilizada para codificação
- **@wppconnect-team/wppconnect** → Biblioteca de integração com o WhatsApp.  

---

## 🛠️ Como Executar

### Pré-requisitos
- Node.js (v18+ recomendado)  
- NPM ou Yarn  

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o bot:

```bash
npm run dev
```

4. Autentique:

Escaneie o QR Code que aparecerá no terminal com o seu app do WhatsApp.

---

Após a autenticação, o chatbot estará online e pronto para interagir com os usuários. 🎉

---

## 🔮 Melhorias Futuras:

- Implementar um sistema real de verificação de horários.
- Integrar com um banco de dados para persistir os agendamentos.
- Melhorar a validação das entradas do usuário (datas, horários).
- Adicionar fluxos de cancelamento e reagendamento.