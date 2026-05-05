<div align="center">

# ⚡ SmartQueue

### Job Processing Infrastructure · Built for Scale

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

**A full-stack job queue management system** — submit jobs, track real-time status, monitor infrastructure metrics, and handle failures with automatic retries.

</div>

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌──────────────────────────────────────────┐
│   Next.js UI    │────▶│            NestJS API (Port 3001)        │
│   (Port 3000)   │     │                                          │
└─────────────────┘     │  ┌──────────┐  ┌──────────────────────┐ │
                         │  │   Auth   │  │    Jobs Controller   │ │
                         │  │  (JWT)   │  │  POST /jobs          │ │
                         │  └──────────┘  │  GET  /jobs          │ │
                         │                │  GET  /jobs/stats    │ │
                         │                │  POST /jobs/:id/retry│ │
                         │                └──────────────────────┘ │
                         │                          │               │
                         │               ┌──────────▼────────────┐ │
                         │               │   Bull Queue (Redis)   │ │
                         │               │   • FIFO Processing   │ │
                         │               │   • 3x Retry + DLQ    │ │
                         │               │   • Priority Support  │ │
                         │               └──────────┬────────────┘ │
                         │                          │               │
                         │               ┌──────────▼────────────┐ │
                         │               │    Job Processor       │ │
                         │               │   (Background Worker) │ │
                         │               └──────────┬────────────┘ │
                         │                          │               │
                         │               ┌──────────▼────────────┐ │
                         │               │   PostgreSQL + TypeORM │ │
                         │               │   (Job Persistence)   │ │
                         │               └───────────────────────┘ │
                         └──────────────────────────────────────────┘
```

---

## ✨ Features

### Backend (NestJS)
- **JWT Authentication** — Register/Login with bcrypt password hashing
- **Job Queue** — Bull + Redis with FIFO processing and priority support
- **Dead Letter Queue** — Failed jobs tracked with exponential backoff retry (3 attempts)
- **5 Job Types** — Data Processing, Document Parsing, Email Notification, Report Generation, Image Processing
- **Real-time Stats** — Live queue metrics from Redis via Bull
- **Swagger Docs** — Full API documentation at `/api/docs`
- **TypeORM** — PostgreSQL with entity relationships, auto-migrations

### Frontend (Next.js)
- **Live Dashboard** — Auto-refreshes every 4 seconds with job status updates
- **Job Submission** — Submit jobs with type, name, and priority (1–10)
- **Filter & Search** — Filter by status (pending/processing/completed/failed)
- **Retry Failed Jobs** — One-click retry from the UI
- **Queue Monitor** — Live Bull queue stats (waiting/active/completed/failed/delayed)

### DevOps
- **Docker Compose** — Full stack runs with a single command
- **Health Checks** — PostgreSQL and Redis health probes before service start
- **Environment Config** — `.env.example` for easy setup

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
git clone https://github.com/Raj4478/SmartQueue-.git
cd SmartQueue-
cp backend/.env.example backend/.env
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend Dashboard | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| Swagger Docs | http://localhost:3001/api/docs |

### Option 2: Manual Setup

**Prerequisites:** Node.js 20+, PostgreSQL 15, Redis 7

```bash
# Backend
cd backend
cp .env.example .env       # update DB/Redis credentials
npm install
npm run start:dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

---

## 📡 API Reference

### Authentication
```http
POST /auth/register    # { name, email, password }
POST /auth/login       # { email, password } → { token }
GET  /auth/profile     # Bearer token required
```

### Jobs
```http
POST   /jobs              # Submit job → queued immediately
GET    /jobs              # List jobs (filter: status, type, page, limit)
GET    /jobs/stats        # Dashboard stats (total, by-status, success rate)
GET    /jobs/:id          # Get specific job
POST   /jobs/:id/retry    # Retry failed job
DELETE /jobs/:id          # Delete job
```

### Queue
```http
GET /queue/stats    # Live Bull queue counts from Redis
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Backend Framework | NestJS + TypeScript | REST API, dependency injection, modules |
| Queue | Bull + Redis | Job queuing, retries, dead letter, priority |
| Database | PostgreSQL + TypeORM | Job persistence, user management |
| Auth | JWT + Passport + bcrypt | Stateless authentication |
| API Docs | Swagger/OpenAPI | Auto-generated API documentation |
| Frontend | Next.js 14 + TypeScript | Dashboard, SSR, routing |
| Styling | Tailwind CSS | Utility-first styling |
| Containerisation | Docker + Docker Compose | One-command local setup |

---

## 📁 Project Structure

```
SmartQueue/
├── backend/
│   ├── src/
│   │   ├── auth/               # JWT auth, guards, strategies
│   │   │   ├── entities/       # User entity
│   │   │   ├── dto/            # RegisterDto, LoginDto
│   │   │   ├── guards/         # JwtAuthGuard
│   │   │   └── strategies/     # JwtStrategy
│   │   ├── jobs/               # Job CRUD + queue submission
│   │   │   ├── entities/       # Job entity (status enum, types)
│   │   │   └── dto/            # CreateJobDto, JobFilterDto
│   │   ├── queue/              # Bull processor + queue stats
│   │   │   ├── job.processor.ts   # Background worker
│   │   │   └── queue.controller.ts
│   │   └── app.module.ts       # Root module wiring
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/          # Auth page
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   └── layout.tsx
│   │   └── lib/
│   │       └── api.ts          # Axios client + API methods
│   └── Dockerfile
└── docker-compose.yml
```

---

## 💡 Key Design Decisions

**Why Bull over raw Redis pub/sub?**
Bull provides battle-tested queue semantics — FIFO ordering, job persistence, automatic retries with backoff, priority queues, and a clean event system. This mirrors production patterns used in high-scale systems.

**Why PostgreSQL for job persistence?**
Jobs need ACID guarantees. If Redis restarts, job history must survive. PostgreSQL stores the source of truth; Redis/Bull stores the processing queue.

**Why exponential backoff?**
Transient failures (network timeouts, rate limits) often self-resolve. Exponential backoff (2s → 4s → 8s) reduces load during degraded conditions before marking a job as dead.

---

## 👤 Author

**Rajeshwar Singh** — SDE-I @ Bimaplan (YC-backed)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/rajeshwar-singh-b6990419a)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/Raj4478)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:Singhrajeshwar28@gmail.com)

---

<div align="center">
<sub>Built to demonstrate production-grade distributed systems patterns · NestJS · Bull · PostgreSQL · Redis · Next.js · Docker</sub>
</div>
