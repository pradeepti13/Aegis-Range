# Aegis Range --- PROJECT_CONTEXT.md

## READ THIS FIRST

You are an AI coding agent working inside the Aegis Range repository.

Before changing code:

1.  Read this file.
2.  Read `PROJECT_REQUIREMENTS.md`.
3.  Read `ARCHITECTURE.md`.
4.  Read `TODO.md`.
5.  Inspect the existing repository structure.
6.  Preserve working functionality created by other contributors.

## CURRENT OBJECTIVE

We are building the **Review 1 skeletal prototype**.

The required working flow is:

`Login → Dashboard → Solo Mode → One Challenge → Flag Submission → Score → Result`

## CRITICAL SCOPE LIMIT

This prototype is intentionally small.

DO NOT implement unless explicitly requested later:

-   Docker
-   CTFd
-   PostgreSQL
-   production authentication
-   real telemetry
-   Cyber Twin persistence
-   Attack Replay
-   ML
-   RL
-   CyberBattleSim
-   AI opponent
-   Red/Blue/Purple/White gameplay
-   RAG
-   LLM tutor
-   Kubernetes
-   cloud deployment
-   monitoring infrastructure

These belong to later phases and are documented for theory/architecture.

## CURRENT TECHNOLOGY

Use the existing React project.

Prefer: - existing dependencies - existing components - existing
routing - local/mock data - simple state management

Do not introduce a framework or library just because it is convenient.

## CHALLENGE

Use one simple beginner web-security challenge:

Title: `SQL Injection — Login Bypass`

Category: `Web Security`

Difficulty: `Beginner`

Points: `100`

Flag: `AEGIS{sql_injection_basic}`

The challenge is a simulated learning interaction for Review 1. It does
not need a real vulnerable server.

## OWNERSHIP

### Platform contributor

Responsible for: - Login - Dashboard - Navigation - application shell -
global styling

### Challenge contributor

Responsible for: - Challenge page - Challenge data - Hint - Flag input -
Validation - Score - Result

Avoid modifying the other contributor's module.

## INTEGRATION RULE

Prefer isolated feature files.

Challenge functionality should live under something like:

`src/features/challenge/`

Do not unnecessarily rewrite `App`, routing, or global components.

## CODE QUALITY RULES

-   Keep code simple.
-   Do not over-engineer.
-   Do not add unnecessary abstractions.
-   Do not add unnecessary dependencies.
-   Do not delete working code without a reason.
-   Keep naming consistent with the existing project.
-   Test the existing flow after changes.
-   Make changes that are easy to merge.

## BEFORE FINISHING

Verify:

-   Login works.
-   Dashboard works.
-   Solo Mode works.
-   Challenge opens.
-   Correct flag works.
-   Incorrect flag works.
-   Hint works.
-   Score works.
-   Result works.
-   Existing navigation still works.

Then report:

1.  files created
2.  files modified
3.  dependencies added
4.  how the feature integrates
5.  tests/run commands performed
6.  anything the next contributor needs to know

## FUTURE ARCHITECTURE

The full project eventually evolves toward:

`React → FastAPI → CTFd/Docker/PostgreSQL → Telemetry → Cyber Twin → Adaptive Learning`

The Cyber Twin is a structured learner model. Baseline adaptive logic is
rule-based. ML/RL are enhancement paths.

Do not implement future architecture merely because you see it in the
documents.

## GOLDEN RULE

**The repository is the shared memory. The chat history is not.**
