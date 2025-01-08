# NimbleBrain API Specification

This repository contains the OpenAPI specification for the NimbleBrain API, generated
from TypeScript and Zod schemas. It provides a comprehensive documentation of all
available endpoints, request/response schemas, and authentication requirements.

## 🚀 Features

- OpenAPI 3.0.0 specification
- Type-safe schema definitions using Zod
- Automatic SwaggerUI generation
- Bearer token authentication
- Detailed request/response examples
- Built with TypeScript

## 📖 API Documentation

The API documentation is available at: [https://developer.nimblebrain.ai/](https://developer.nimblebrain.ai/)

## 🔑 Authentication

All endpoints require authentication using a Bearer token. To authenticate:

1. Include an `Authorization` header with your requests
2. Format: `Authorization: Bearer [your_jwt_token]`

## 🛠️ Available Endpoints

### Conversations

- `GET /agents/:agentUuid/conversations` - List agent conversations (paginated)
- `POST /agents/:agentUuid/conversations` - Create a new conversation
- `GET /agents/:agentUuid/conversations/:conversationUuid/messages` - Gets a single conversation
- `GET /agents/:agentUuid/conversations/:conversationUuid/messages` - List conversation messages (paginated)
- `POST /agents/:agentUuid/conversations/:conversationUuid` - Add a message to a conversation
- `DELETE /agents/:agentUuid/conversations/:conversationUuid` - Delete a conversation

## 💻 Local Development

### Prerequisites

- Node.js (v20 or later)
- npm (or yarn)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nimblebrain-api-spec.git
cd nimblebrain-api-spec
```

2. Install dependencies:

```bash
npm install
```

3. Generate documentation:

```bash
npm run generate-docs
```

4. Start local server:

```bash
npm start
```

The SwaggerUI will be available at `http://localhost:9000`

### Project Structure

```
src/
├── schemas/          # Zod schema definitions
│   ├── zodSetup.ts   # Zod configuration
│   ├── message.schema.ts
│   ├── conversation.schema.ts
│   └── requests.schema.ts
├── routes/           # API route definitions
│   └── agents/
│       └── index.ts
│   └── conversations/
│       └── index.ts
│   └── messages/
│       └── index.ts
│   └── common.ts     # Common route types
└── generateDocs.ts   # Documentation generator
```

## 🔄 Updating the Documentation

1. Make changes to the schemas or routes
2. Run `npm run generate-docs` to regenerate the documentation
3. Run `npm start` and confirm your changes are correct
4. Commit and push your changes
5. The documentation will be automatically deployed via GitHub Actions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📮 Support

For support, please reach out to our team at support@nimblebrain.ai

For nimblebrain run:

```
git remote set-url origin git@github.com:NimbleBrainInc/nimblebrain.git
```

For gloader run:

```
git remote set-url origin git@github.com:NimbleBrainInc/gloader.git
```
