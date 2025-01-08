// src/generateDocs.ts
import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import * as fs from "fs";
import * as path from "path";
import { registerRoutes } from "./routes";

// Create registry
const registry = new OpenAPIRegistry();

// Register security scheme
registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description: "Enter the agent access token (JWT)",
});

// Register routes
registerRoutes(registry);

// Create generator
const generator = new OpenApiGeneratorV3(registry.definitions);

// Generate document
const document = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "NimbleBrain API",
    version: "1.0.0",
    description: "API specification for NimbleBrain",
  },
  servers: [
    {
      url: "https://api.nimblebrain.ai/v1",
      description: "Production server",
    },
    {
      url: "http://localhost:3001/v1",
      description: "Local development",
    },
  ],
});

const docsDir = path.join(__dirname, "../docs");
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// Generate OpenAPI JSON
fs.writeFileSync(path.join(docsDir, "openapi.json"), JSON.stringify(document, null, 2));

// Create SwaggerUI HTML
const swaggerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NimbleBrain API Documentation</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
    <script>
        window.onload = () => {
            window.ui = SwaggerUIBundle({
                url: 'openapi.json',
                dom_id: '#swagger-ui',
            });
        };
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(docsDir, "index.html"), swaggerHtml);
