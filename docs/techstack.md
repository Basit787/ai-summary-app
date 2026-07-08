# Technology Stack

## Overview

This project is a full-stack AI-powered document summarization application built with a modern frontend, a serverless backend, and AWS cloud services.

---

# Frontend

| Technology | Purpose |
|------------|---------|
| React | Build the user interface |
| Vite | Fast development server and build tool |
| TypeScript | Type-safe JavaScript development |
| Shadcn/UI | Reusable UI components |
| TanStack Query | API requests, caching, polling, and server state management |

---

# Backend

| Technology | Purpose |
|------------|---------|
| Python | Backend programming language |
| FastAPI | High-performance REST API framework |
| AWS Lambda | Serverless backend deployment |
| Amazon API Gateway | Expose REST APIs |
| Amazon S3 | Store uploaded documents |
| MongoDB | Store document metadata, status, and AI summaries |

---

# AWS Services

| Service | Purpose |
|---------|---------|
| Amazon S3 | Frontend hosting (optional) and document storage |
| Amazon API Gateway | Route API requests to Lambda functions |
| AWS Lambda | Execute backend APIs and AI processing |
---

# Deployment Architecture

```text
Frontend
│
├── React
├── Vite
├── Shadcn/UI
└── TanStack Query

↓

Amazon API Gateway

↓

Backend Lambda Functions
├── Upload Document API
├── Get Document Status API
├── Get Summary API
└── Other REST APIs

↓

Amazon S3
(MongoDB stores metadata)

↓

AI Lambda Function
├── Download Document
├── Generate Summary
└── Store Summary in PostgreSQL
```
