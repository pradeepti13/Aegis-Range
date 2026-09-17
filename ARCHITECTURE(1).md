# Aegis Range --- Architecture Document

## 1. Architecture Strategy

Aegis Range has two architecture levels:

1.  **Review 1 Skeletal Architecture** --- intentionally small and
    local.
2.  **Target Aegis Range Architecture** --- the full phased product.

The Review 1 system must NOT implement the target architecture
prematurely.

------------------------------------------------------------------------

# 2. Review 1 Architecture

## 2.1 Minimal Architecture

``` text
                    ┌──────────────┐
                    │     USER     │
                    └──────┬───────┘
                           │
                           ▼
                 ┌──────────────────┐
                 │   React Frontend │
                 │                  │
                 │ Login            │
                 │ Dashboard        │
                 │ Solo Mode        │
                 │ Challenge        │
                 │ Result           │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Local Application│
                 │ State / Mock Data │
                 │                  │
                 │ Challenge Data   │
                 │ Flag Validation  │
                 │ Score            │
                 └──────────────────┘
```

### Review 1 principle

There is intentionally no database, Docker environment, CTFd instance,
ML model, or production backend.

The purpose is to demonstrate the end-to-end user experience.

------------------------------------------------------------------------

# 3. Review 1 Component Ownership

## Person A --- Platform Shell

Owns:

``` text
src/
├── pages/
│   ├── Login
│   └── Dashboard
├── components/
├── routing/
└── App
```

Responsibilities:

-   application shell
-   navigation
-   login
-   dashboard
-   global UI

## Person B --- Challenge Module

Owns:

``` text
src/
└── features/
    └── challenge/
        ├── Challenge
        ├── challengeData
        └── challenge styles
```

Responsibilities:

-   challenge display
-   hint
-   flag input
-   validation
-   score
-   completion state

------------------------------------------------------------------------

# 4. Integration Boundary

Person B should expose a simple Challenge page/component.

Conceptually:

``` text
Dashboard
   │
   │ Select Solo
   ▼
Solo Mode
   │
   │ Start Challenge
   ▼
Challenge
   │
   ├── submitFlag()
   │
   ├── showHint()
   │
   └── completeChallenge()
   │
   ▼
Result
```

The challenge module should not own the application's global navigation.

This minimizes merge conflicts.

------------------------------------------------------------------------

# 5. Review 1 Data Model

A challenge can be represented locally as:

``` js
{
  id: "SQL-001",
  title: "SQL Injection — Login Bypass",
  category: "Web Security",
  difficulty: "Beginner",
  points: 100,
  description: "...",
  objective: "...",
  hint: "...",
  flag: "AEGIS{sql_injection_basic}"
}
```

A simple session state can contain:

``` js
{
  user: "...",
  score: 100,
  completedChallenges: ["SQL-001"],
  hintsUsed: 0
}
```

This is sufficient for Review 1.

------------------------------------------------------------------------

# 6. Target Aegis Range Architecture

The eventual system separates the **Cyber Range** from the **Learning
Intelligence Layer**.

``` text
                         USER
                           │
                           ▼
                  ┌─────────────────┐
                  │ React Dashboard │
                  └────────┬────────┘
                           │
                      REST / WS
                           │
                           ▼
                  ┌─────────────────┐
                  │    FastAPI      │
                  │    API Layer    │
                  └───────┬─────────┘
                          │
        ┌─────────────────┼──────────────────┐
        │                 │                  │
        ▼                 ▼                  ▼
     ┌──────┐       ┌───────────┐      ┌───────────┐
     │ CTFd │       │ Telemetry │      │ PostgreSQL│
     │ Game │       │ Service   │      │ Database  │
     └──┬───┘       └─────┬─────┘      └─────┬─────┘
        │                 │                  │
        │                 └────────┬─────────┘
        │                          ▼
        │                  ┌───────────────┐
        │                  │ Cyber Twin    │
        │                  │ + Analytics   │
        │                  └───────┬───────┘
        │                          │
        │                          ▼
        │                  ┌───────────────┐
        │                  │ Recommendation│
        │                  │ / Hint Engine │
        │                  └───────────────┘
        │
        ▼
 ┌─────────────────────────────────────┐
 │       Container Manager             │
 │              Docker                 │
 └──────────────────┬──────────────────┘
                    │
                    ▼
        ┌────────────────────────┐
        │ Isolated Cyber Range   │
        │                        │
        │ Vulnerable Applications│
        │ Red / Blue / Purple    │
        │ White / Scenario Data  │
        └────────────────────────┘
```

------------------------------------------------------------------------

# 7. Architectural Separation

## Cyber Range

Responsible for:

-   running scenarios
-   vulnerable applications
-   team roles
-   challenge execution
-   reporting events upward

It should NOT contain the adaptive-learning logic.

## Learning Intelligence Layer

Responsible for:

-   telemetry interpretation
-   Cyber Twin
-   analytics
-   replay
-   recommendations
-   adaptive hints
-   difficulty selection

The AI/Learning Engine observes the simulation rather than becoming one
of the Red/Blue/Purple/White participants.

------------------------------------------------------------------------

# 8. Target Telemetry Flow

``` text
Learner Action
      │
      ▼
Challenge / Cyber Range
      │
      ▼
Telemetry Event
      │
      ├── timestamp
      ├── action
      ├── step type
      ├── challenge
      └── session
      │
      ▼
PostgreSQL
      │
      ▼
Analytics
      │
      ▼
Cyber Twin
      │
      ▼
Recommendation / Hint / Difficulty
```

The project defines telemetry as meaningful, timestamped, step-tagged
learner activity rather than a raw recording.

------------------------------------------------------------------------

# 9. Cyber Twin

The Cyber Twin is a persistent structured learner profile.

It is NOT an AI clone.

Example conceptual record:

``` text
Learner
│
├── Recon Score
├── Enumeration Score
├── Exploitation Score
├── Efficiency
├── Stealth
├── Tool Dependency
├── Average Completion Time
├── Hints Used
└── Preferred Attack Style
```

The profile is updated after sessions.

------------------------------------------------------------------------

# 10. Attack Replay

Replay does not require recording a video of the terminal.

Instead:

``` text
Telemetry Events
      │
      ▼
Ordered by timestamp
      │
      ▼
Timeline Renderer
      │
      ▼
Step 1 → Step 2 → Step 3 → Flag
```

This allows the system to show how a learner approached the challenge.

------------------------------------------------------------------------

# 11. Adaptive Logic

### MVP rule-based model

``` text
Successful repeatedly
        ↓
Higher difficulty

Repeated failures
        ↓
Lower difficulty / foundational challenge

High hint usage
        ↓
Foundational practice

Fast + successful
        ↓
Higher challenge tier
```

This is intentionally interpretable.

### Later ML

Possible enhancement modules:

``` text
Telemetry
   ↓
Feature Extraction
   ↓
Clustering
   ├── K-means
   └── DBSCAN

Skill Prediction

Recommendation Ranking

Strategy Classification
```

------------------------------------------------------------------------

# 12. AI Opponent Architecture

Baseline:

``` text
Scenario
   ↓
Finite-State Behavior
   ↓
Predefined Attack Action
   ↓
Environment
   ↓
Telemetry
```

The AI opponent is scripted/rule-based in the baseline.

Later:

``` text
CyberBattleSim
      ↓
RL Environment
      ↓
RL Agent
      ↓
Learned Attack Path
```

This is an enhancement path, not Review 1.

------------------------------------------------------------------------

# 13. Phase-to-Architecture Mapping

  Phase      Main Architecture Added
  ---------- --------------------------------
  Phase 0    Repository + shared context
  Phase 1    React application shell
  Phase 2    Challenge + scoring
  Phase 3    Review 1 integration
  Phase 4    Docker + vulnerable lab + CTFd
  Phase 5    Telemetry
  Phase 6    Cyber Twin + analytics
  Phase 7    Replay + adaptive coaching
  Phase 8    Team modes + scripted AI
  Phase 9    ML / IRT / RL / optional tutor
  Phase 10   Hardening + polish

------------------------------------------------------------------------

# 14. Architectural Principle

Do not confuse the **target architecture** with the **current
implementation**.

For Review 1:

``` text
React + Local State
```

For the later product:

``` text
React
  ↓
FastAPI
  ↓
CTFd + Docker + PostgreSQL + Telemetry
  ↓
Cyber Twin
  ↓
Adaptive Learning
```

The repository should evolve toward the second architecture one phase at
a time.
