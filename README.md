
# 📚 Documentação da API de Visitantes

## 🎯 Visão Geral

API RESTful desenvolvida com **NestJS** para gerenciar registros de visitantes. A API fornece operações completas de CRUD (Create, Read, Update, Delete) com validação de dados e documentação automática via Swagger.

---

## 🚀 Como Acessar a Documentação Interativa

**URL:** `http://localhost:3000/swagger`

A documentação interativa permite:
- ✅ Visualizar todos os endpoints disponíveis
- ✅ Testar chamadas em tempo real
- ✅ Ver modelos de requisição e resposta
- ✅ Validar dados antes de enviar

---

## 📊 Arquitetura da API

```mermaid
graph TB
    Client["🌐 Cliente HTTP"]
    Gateway["🔗 HTTP Gateway"]
    Controller["🎮 VisitorsController"]
    Service["⚙️ VisitorsService"]
    Repository["💾 TypeORM Repository"]
    Database["🗄️ PostgreSQL Database"]
    
    Client -->|HTTP Request| Gateway
    Gateway -->|Route /visitors| Controller
    Controller -->|Business Logic| Service
    Service -->|Query/Mutate| Repository
    Repository -->|SQL| Database
    Database -->|Result| Repository
    Repository -->|Entity| Service
    Service -->|DTO| Controller
    Controller -->|JSON Response| Gateway
    Gateway -->|HTTP Response| Client
```

---

## 🔗 Endpoints Disponíveis

### 1️⃣ Criar Novo Visitante

**`POST /visitors`**

```
POST /visitors HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 98765-4321"
}
```

**✅ Resposta (201 Created):**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "visitDate": "2026-05-26T12:42:04.000Z"
}
```

**📋 Regras de Validação:**
- `name`: Obrigatório, string, mínimo 3 caracteres
- `email`: Obrigatório, deve ser email válido
- `phone`: Obrigatório, formato: (XX) 9XXXX-XXXX

---

### 2️⃣ Listar Todos os Visitantes

**`GET /visitors`**

```
GET /visitors HTTP/1.1
Host: localhost:3000
```

**✅ Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "visitDate": "2026-05-26T12:42:04.000Z"
  },
  {
    "id": 2,
    "name": "Maria Santos",
    "email": "maria@example.com",
    "visitDate": "2026-05-26T13:15:00.000Z"
  }
]
```

---

### 3️⃣ Obter Visitante por ID

**`GET /visitors/:id`**

```
GET /visitors/1 HTTP/1.1
Host: localhost:3000
```

**✅ Resposta (200 OK):**
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com",
  "visitDate": "2026-05-26T12:42:04.000Z"
}
```

**❌ Erro (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Visitante não encontrado"
}
```

---

### 4️⃣ Deletar Visitante

**`DELETE /visitors/:id`**

```
DELETE /visitors/1 HTTP/1.1
Host: localhost:3000
```

**✅ Resposta (200 OK):**
```json
{
  "message": "Visitante deletado com sucesso"
}
```

**❌ Erro (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Visitante não encontrado"
}
```

---

## 📦 Modelo de Dados

### Entidade: Visitor

```mermaid
classDiagram
    class Visitor {
        +number id
        +string name
        +string email
        +Date visitDate
    }
    
    note for Visitor "
    ✓ ID gerado automaticamente
    ✓ Email com validação
    ✓ Data registrada automaticamente
    "
```

---

## 🔄 Fluxo de Requisição e Resposta

```mermaid
sequenceDiagram
    participant Client as 👤 Cliente
    participant API as 🔌 API Gateway
    participant Controller as 🎮 Controller
    participant Service as ⚙️ Service
    participant DB as 🗄️ Database

    Client->>API: POST /visitors {name, email, phone}
    API->>Controller: Valida request
    Controller->>Service: create(createVisitorDto)
    Service->>DB: Salva visitante
    DB->>Service: Retorna entidade criada
    Service->>Controller: Retorna Visitor DTO
    Controller->>API: Serializa JSON
    API->>Client: 201 Created + Visitor
```

---

## 🛡️ Validações e Regras de Negócio

| Campo | Tipo | Validação | Exemplo |
|-------|------|-----------|---------|
| **name** | string | Obrigatório, 3-255 caracteres | "João Silva" |
| **email** | string | Obrigatório, formato email | "joao@example.com" |
| **phone** | string | Obrigatório, formato telefone | "(11) 98765-4321" |
| **visitDate** | Date | Gerado automaticamente | "2026-05-26T..." |

---

## 🌍 Tratamento de Erros

### Status HTTP Utilizados

| Status | Significado | Exemplo |
|--------|-------------|---------|
| **200** | OK | Requisição bem-sucedida |
| **201** | Created | Recurso criado com sucesso |
| **400** | Bad Request | Dados inválidos |
| **404** | Not Found | Recurso não encontrado |
| **500** | Server Error | Erro interno do servidor |

### Exemplo de Erro de Validação

```json
{
  "statusCode": 400,
  "message": [
    "name deve ser uma string",
    "email deve ser válido"
  ],
  "error": "Bad Request"
}
```

---

## 🔧 Tecnologias Utilizadas

```mermaid
graph LR
    A["⚙️ NestJS 11"] --> B["📚 TypeORM"]
    B --> C["🗄️ PostgreSQL"]
    A --> D["🔐 Class-Validator"]
    A --> E["📖 Swagger"]
    A --> F["🛠️ TypeScript"]
    
    style A fill:#ff6b6b
    style B fill:#1e7e34
    style C fill:#336791
    style D fill:#2e8555
    style E fill:#85d065
    style F fill:#3178c6
```

---

## 💡 Exemplos de Uso com cURL

### Criar Visitante
```bash
curl -X POST http://localhost:3000/visitors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "(11) 98765-4321"
  }'
```

### Listar Todos
```bash
curl -X GET http://localhost:3000/visitors
```

### Obter por ID
```bash
curl -X GET http://localhost:3000/visitors/1
```

### Deletar
```bash
curl -X DELETE http://localhost:3000/visitors/1
```

---

## 🚀 Como Iniciar a API

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API estará disponível em: **http://localhost:3000**

Swagger estará disponível em: **http://localhost:3000/swagger**

---

## 📝 Notas Importantes

- ✅ O campo `visitDate` é gerado automaticamente no banco de dados
- ✅ Todos os campos de entrada são validados antes de serem salvos
- ✅ O sistema usa transações para garantir consistência dos dados
- ✅ Erros são retornados em formato JSON padronizado

---

**Desenvolvido com ❤️ usando NestJS e TypeScript**
