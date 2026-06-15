# 🚛 FreteRun - Mobile App

Aplicativo mobile desenvolvido em **React Native com Expo**, especialmente para iPhone, que conecta **clientes e motoristas** para realização de fretes e mudanças de forma digital, segura e eficiente.

---

## 📸 Telas do aplicativo

### Landing Page
![Landing Hero](./screenshots/tela-landing-hero.png)

### Como Funciona
![Como Funciona](./screenshots/tela-como-funciona.png)

### Vantagens
![Vantagens](./screenshots/tela-vantagens.png)

### Cadastro — Cliente
![Cadastro Cliente](./screenshots/tela-cadastro-cliente.png)

### Cadastro — Motorista
![Cadastro Motorista](./screenshots/tela-cadastro-motorista-1.png)

### Dashboard do Cliente
![Dashboard Cliente](./screenshots/tela-cliente-dashboard.png)

### Chat com Motorista
![Chat](./screenshots/tela-chat.png)

---

## ✨ Funcionalidades Implementadas

### 🔐 Autenticação e Persistência
- **AsyncStorage**: Persistência de dados local para usuários e fretes.
- **Validações Robustas**: Verificação de e-mail, telefone (máscara), senha forte e campos obrigatórios.
- **Sistema de Login**: Suporte a múltiplos perfis com usuários de teste pré-carregados.

### 🏠 Landing Page
- Design moderno e responsivo.
- Navegação fluida para fluxos de cliente e motorista.

### 📦 Gestão de Fretes
- **Dashboard Cliente**: Solicitação de fretes com estimativa de preço em tempo real.
- **Rastreamento**: Fluxo de acompanhamento de frete com 6 etapas animadas.
- **Dashboard Motorista**: Lista de fretes disponíveis e resumo de ganhos diários.

### 💬 Comunicação e Feedback
- **Chat Modal**: Interface de chat integrada para negociação.
- **Sistema de Avaliação**: Modal de feedback com sistema de estrelas.
- **Toasts Customizados**: Feedback visual para ações do usuário (sucesso, erro, avisos).

---

## 👥 Usuários de teste

| Nome | E-mail | Perfil | Senha |
|---|---|---|---|
| João Silva | joao@email.com | Cliente | 123456 |
| Maria Oliveira | maria@email.com | Cliente | 123456 |
| Ana Costa | ana@email.com | Cliente | 123456 |
| Carlos Santos | carlos@email.com | Motorista | 123456 |
| Pedro Alves | pedro@email.com | Motorista | 123456 |

---

## 🚀 Como executar

### Via VS Code / Terminal
```bash
# Instalar dependências
npm install

# Iniciar o projeto
npx expo start --tunnel --clear
```
Escaneie o QR Code com o **Expo Go** no seu smartphone.

---

## 🗂️ Estrutura do projeto

```
FreteRun/
├── App.js                 ← Componente principal e roteamento
├── src/
│   ├── components/        ← Componentes reutilizáveis (Chat, Avaliação, Toast)
│   ├── services/          ← Lógica de dados (Auth, Fretes com AsyncStorage)
│   ├── utils/             ← Constantes, Validações e Estilos globais
│   └── context/           ← (Pronto para Context API)
├── assets/                ← Imagens e recursos estáticos
└── screenshots/           ← Prints das telas para referência
```

---

## 👨‍💻 Tecnologias

- **React Native** (v0.76)
- **Expo SDK 54**
- **AsyncStorage** (Persistência local)
- **@expo/vector-icons** (Ionicons)
- **JavaScript**
- **Expo Notifications**

---

## 🎨 Design

- **Tema**: Dark Mode
- **Cor Primária**: Verde `#16A34A`
- **Background**: `#0A0F1E`
- **Tipografia**: Sistema (San Francisco/Roboto)
