# 🤖 Chatbot de Agendamento para WhatsApp com Node.js

Um chatbot simples para WhatsApp, desenvolvido em **Node.js** com a biblioteca **@wppconnect-team/wppconnect**, para automatizar o agendamento de serviços de uma clínica odontológica.  
O bot utiliza uma **máquina de estados** para guiar o usuário desde a saudação inicial até a confirmação do agendamento.

---

## ✨ Funcionalidades

- **Conexão via QR Code**: Autentica a sessão do WhatsApp de forma simples.  
- **Sessão Persistente**: Evita a necessidade de escanear o QR Code a cada reinicialização.
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

## ⚙️ Configuração
1. Copie o arquivo de exemplo .env.example para um novo arquivo chamado .env:

```bash
cp .env.example .env
```

2. Dentro do arquivo .env, você encontrará a seguinte variável:

```bash
WPP_SESSION= "minhaSessao"
```

### ❓ Por que esta variável é necessária?

A **WPP_SESSION** é um nome único que você define para a sua sessão do WhatsApp. A biblioteca wppconnect a utiliza para:

- Salvar a Autenticação: Após escanear o QR Code, as credenciais da conexão são salvas em um arquivo local (ex: tokens/default.json).

- Restaurar a Sessão: Ao reiniciar o bot, a biblioteca procura por um arquivo com o nome definido na WPP_SESSION. Se o arquivo for encontrado, a conexão é restaurada automaticamente, evitando que você precise escanear o QR Code novamente.

Se desejar, você pode alterar o valor default para qualquer outro nome de sua preferência.

---

## 🔮 Melhorias Futuras:

- Implementar um sistema real de verificação de horários.
- Integrar com um banco de dados para persistir os agendamentos.
- Melhorar a validação das entradas do usuário (datas, horários).
- Adicionar fluxos de cancelamento e reagendamento.