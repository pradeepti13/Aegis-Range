# Aegis Range --- Project Requirements Document (PRD)

## 1. Project Overview

**Aegis Range** is an adaptive cybersecurity learning ecosystem that
combines a cyber range, ethical hacking exercises, behavioral telemetry,
learner modeling, and adaptive coaching.

For the current Review 1 prototype, the objective is deliberately
limited to a **skeletal, demonstrable vertical slice**:

> **Login → Dashboard → Solo Mode → One Cybersecurity Challenge → Flag
> Submission → Score → Result**

The larger adaptive-learning architecture remains part of the project
requirements and theory, but expensive infrastructure and AI/ML
components are phased into later implementation.

The project documents define the cyber range, Cyber Twin, telemetry,
replay, recommendations, and adaptive coaching as the long-term product
direction. The MVP uses interpretable rule-based intelligence; ML/RL are
enhancement paths rather than Review 1 requirements.

------------------------------------------------------------------------

## 2. Review 1 Objective

A reviewer should be able to:

1.  Open the application.
2.  Log in.
3.  Reach the Aegis Range dashboard.
4.  Select Solo Mode.
5.  Open one cybersecurity challenge.
6.  Read the challenge objective.
7.  Enter a flag.
8.  Receive correct/incorrect feedback.
9.  Receive a score for a successful submission.
10. Return to the dashboard.

### Review 1 success criterion

The prototype must demonstrate one complete user-facing learning loop
rather than many incomplete subsystems.

------------------------------------------------------------------------

## 3. Review 1 Functional Requirements

### FR-01 --- Login

The application shall provide a simple login screen.

For the skeletal prototype, authentication may use local/mock
credentials or local state.

Production authentication is not required.

### FR-02 --- Dashboard

The dashboard shall display:

-   Aegis Range branding
-   User/welcome information
-   Current score
-   Challenge/progress information
-   Solo Mode
-   Future/locked modes where appropriate

### FR-03 --- Solo Mode

The user shall be able to select Solo Mode from the dashboard.

### FR-04 --- Cybersecurity Challenge

The prototype shall contain one beginner-level web-security challenge.

Recommended challenge:

**SQL Injection --- Login Bypass**

The challenge shall contain:

-   Title
-   Description
-   Objective
-   Difficulty
-   Points
-   Hint
-   Flag submission field

### FR-05 --- Flag Validation

The application shall compare the submitted flag against the predefined
challenge flag.

Correct flag:

`AEGIS{sql_injection_basic}`

Incorrect submission shall display an error and allow another attempt.

### FR-06 --- Score

A successful challenge completion shall award points.

Recommended:

`100 XP`

The score may be maintained using local/mock state.

### FR-07 --- Result

After successful completion, the user shall see:

-   Challenge completed
-   Score earned
-   Basic completion feedback
-   Return-to-dashboard action

### FR-08 --- Hint

A simple predefined hint may be displayed when the user presses a Hint
button.

This is a UI/demo feature, not an AI tutor.

------------------------------------------------------------------------

## 4. Explicitly Out of Scope for Review 1

Do NOT implement these in the skeletal prototype unless everything above
is already stable:

-   Docker-based lab provisioning
-   CTFd integration
-   PostgreSQL
-   real FastAPI backend
-   real telemetry pipeline
-   Cyber Twin persistence
-   Attack Replay
-   adaptive recommendation engine
-   ML models
-   reinforcement learning
-   CyberBattleSim
-   AI opponent
-   Red/Blue/Purple/White gameplay
-   Kubernetes
-   cloud deployment
-   RAG/LLM tutor
-   enterprise network simulation
-   monitoring stack

These remain part of the planned system and theory.

------------------------------------------------------------------------

## 5. Full Product Requirements --- Later Phases

### Cyber Range Platform

The target system will eventually provide isolated cybersecurity
exercises using Docker-based environments and vulnerable applications
such as Juice Shop/DVWA.

### CTF/Game Layer

CTFd is intended to provide the game/scoring foundation rather than
rebuilding a CTF platform from scratch.

### Telemetry

The target telemetry layer records meaningful learner actions such as:

-   commands/actions
-   pages/endpoints visited
-   API requests
-   challenge events
-   flags captured
-   hints opened
-   timing between actions

Events are timestamped and categorized by step type.

### Cyber Twin

The target Cyber Twin is a persistent structured learner profile, not an
AI clone.

Potential fields include:

-   Recon
-   Enumeration
-   Exploitation
-   Stealth
-   Tool Dependency
-   Average Completion Time
-   Hints Used
-   Preferred Attack Style

### Attack Analytics

The target system calculates category-based performance:

-   Reconnaissance
-   Enumeration
-   Exploitation
-   Efficiency

### Attack Replay

Telemetry events can later be rendered as a timestamped session
timeline.

### Adaptive Recommendation

The MVP-level intelligence is rule-based and interpretable.

Example:

-   repeated failure → recommend easier material
-   repeated success → unlock higher difficulty
-   high hint dependency → recommend foundational practice

ML-based clustering, skill prediction, recommendation ranking, and
strategy classification are enhancement work.

### AI Opponent

The baseline product may use a scripted/rule-based attacker with
predefined behavior states.

A reinforcement-learning/CyberBattleSim version is an enhancement path.

------------------------------------------------------------------------

## 6. Non-Functional Requirements

### NFR-01 --- Simplicity

Review 1 must prioritize a stable demo over architectural completeness.

### NFR-02 --- Reproducibility

The repository must run from a clean clone using documented commands.

### NFR-03 --- Modularity

Challenge functionality should be isolated from the application shell so
another contributor can work on it without rewriting the dashboard.

### NFR-04 --- Honest Scope

Do not label mock/local behavior as production infrastructure or ML.

### NFR-05 --- Security

The actual cyber range, when implemented, must be isolated from public
networks. Review 1 may use a simulated challenge UI instead of a live
vulnerable environment.

### NFR-06 --- Privacy

The eventual telemetry system must include consent, controlled access,
anonymization/pseudonymization for comparative statistics, and a defined
retention/deletion policy.

------------------------------------------------------------------------

## 7. Technology Direction

### Review 1

-   React
-   JavaScript/TypeScript
-   CSS
-   Local/mock data
-   Local state

### Later baseline

-   React
-   FastAPI
-   CTFd
-   PostgreSQL
-   Docker / Docker Compose
-   Juice Shop / DVWA

### Enhancement

-   scikit-learn
-   IRT-based adaptation
-   CyberBattleSim
-   reinforcement learning
-   optional RAG/LLM tutor
-   richer monitoring/deployment infrastructure

------------------------------------------------------------------------

## 8. Review 1 Definition of Done

The Review 1 build is complete when:

-   [ ] Application starts successfully.
-   [ ] Login works.
-   [ ] Dashboard works.
-   [ ] Solo Mode opens.
-   [ ] Challenge opens.
-   [ ] Correct flag produces success.
-   [ ] Wrong flag produces failure.
-   [ ] Score is displayed.
-   [ ] User can return to dashboard.
-   [ ] No existing flow is broken.
-   [ ] README contains run instructions.
-   [ ] A clean clone can run the project.

------------------------------------------------------------------------

## 9. Design Principle

Aegis Range ultimately shifts the question from:

> "Did the learner solve the challenge?"

toward:

> "How did the learner solve it, how is that changing over time, and
> what should they practice next?"

Review 1 only establishes the first working loop. The
behavioral-learning layer is deliberately phased after the foundation.
