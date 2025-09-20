# 🚀 Painel em Tempo Real - Dashboard com Socket.IO

Um sistema de monitoramento em tempo real que exibe estatísticas de usuários conectados e popularidade de salas de chat, desenvolvido com Node.js, Express e Socket.IO.

## 📋 Sobre o Projeto

Este projeto implementa um painel (dashboard) avançado que monitora em tempo real:

- Número total de usuários conectados
- Sala mais popular
- Ranking completo de todas as salas ativas
- Gráfico visual da distribuição de usuários
- Alertas automáticos quando uma sala atinge muitos usuários

O painel é atualizado automaticamente a cada segundo, proporcionando uma experiência de monitoramento em tempo real sem necessidade de recarregar a página.

## ✨ Funcionalidades

### 🎯 Recursos Principais

- **Monitoramento de Usuários**: Contagem em tempo real de todos os clientes conectados
- **Análise de Salas**: Identificação automática da sala com maior número de usuários
- **Atualizações Automáticas**: Dados atualizados a cada segundo via WebSocket
- **Interface Responsiva**: Design adaptável para diferentes dispositivos

### 🌟 Recursos Avançados

- **Ranking Dinâmico**: Lista ordenada de todas as salas ativas por popularidade
- **Gráfico Interativo**: Visualização em barras usando Chart.js
- **Sistema de Alertas**: Notificações visuais quando uma sala excede 5 usuários
- **Gerenciamento de Salas**: Usuários podem migrar entre salas dinamicamente

## �️ Tecnologias Utilizadas

| Categoria         | Tecnologia              | Versão  |
| ----------------- | ----------------------- | ------- |
| **Backend**       | Node.js                 | 16+     |
| **Framework Web** | Express.js              | ^5.1.0  |
| **WebSocket**     | Socket.IO               | ^4.8.1  |
| **Frontend**      | HTML5, CSS3, JavaScript | Vanilla |
| **Gráficos**      | Chart.js                | CDN     |

## 📁 Estrutura do Projeto

```
painel_tempo_real-TA-2025/
├── 📄 server.js           # Servidor principal com Socket.IO
├── 📄 package.json        # Dependências e scripts
├── 📄 README.md          # Este arquivo
└── 📁 public/            # Arquivos estáticos
    ├── 📄 index.html     # Interface principal
    ├── 📄 style.css      # Estilos da aplicação
    └── 📄 script.js      # Lógica do frontend
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** versão 16 ou superior
- **npm** (vem com o Node.js)
- Navegador web moderno

### 📥 Instalação e Execução

1. **Clone ou baixe o projeto:**

   ```bash
   git clone <url-do-repositorio>
   cd painel_tempo_real-TA-2025
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor:**

   ```bash
   node server.js
   ```

   Você verá a mensagem:

   ```
   Servidor rodando em http://localhost:3000
   ```

4. **Acesse a aplicação:**
   - Abra seu navegador
   - Acesse: `http://localhost:3000`

### 🧪 Como Testar

1. **Teste Básico:**

   - Abra a aplicação em múltiplas abas do navegador
   - Observe o contador de usuários aumentar

2. **Teste de Salas:**

   - Digite nomes de salas diferentes no campo de texto
   - Clique em "Entrar na Sala"
   - Observe o ranking e gráfico se atualizarem

3. **Teste de Alertas:**
   - Abra 6 ou mais abas na mesma sala
   - Veja o alerta de lotação aparecer

### 🔧 Configuração Avançada

**Alternar Porta:**

```bash
PORT=4000 node server.js
```

**Variáveis de Ambiente:**

- `PORT`: Define a porta do servidor (padrão: 3000)

## 📊 Como Funciona

1. **Conexão**: Usuários conectam via WebSocket ao acessar a página
2. **Salas**: Usuários podem entrar em salas específicas digitando o nome
3. **Monitoramento**: Servidor tracked conexões e distribuição por salas
4. **Broadcast**: A cada segundo, estatísticas são enviadas para todos os clientes
5. **Visualização**: Frontend atualiza painel, ranking e gráfico automaticamente

## 🤝 Contribuições

Este projeto foi desenvolvido como atividade prática e está aberto para melhorias:

- Adicionar persistência de dados
- Implementar autenticação de usuários
- Melhorar design responsivo
- Adicionar mais tipos de gráficos