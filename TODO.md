# Aegis Range --- TODO & Phase Plan

## 0. Operating Rule

Build Aegis Range in vertical slices.

**Do not build the complete architecture at once.**

For Review 1, the only mandatory path is:

`Login → Dashboard → Solo → Challenge → Flag → Score → Result`

Everything else is either theory, future implementation, or optional if
time remains.

------------------------------------------------------------------------

# Phase 0 --- Shared Context & Repository Setup

**Goal:** Make two Antigravity accounts work from one source of truth.

### Repository setup

-   [ ] Create GitHub repository.
-   [ ] Add `PROJECT_REQUIREMENTS.md`.
-   [ ] Add `ARCHITECTURE.md`.
-   [ ] Add `TODO.md`.
-   [ ] Add `PROJECT_CONTEXT.md` containing the short AI-agent
    instructions.
-   [ ] Add `.gitignore`.
-   [ ] Add README with local run instructions.
-   [ ] Decide frontend stack/version before coding.
-   [ ] Create `main` branch.
-   [ ] Create separate feature branches for each contributor.

### Shared rules

-   [ ] Both contributors read all project docs before prompting.
-   [ ] Do not independently redesign the architecture.
-   [ ] Do not add dependencies unless necessary.
-   [ ] Do not modify another contributor's module unless required for
    integration.
-   [ ] Keep Review 1 local/mock.
-   [ ] Commit small, working changes.

### Output

A clean repository that both Antigravity accounts can understand from
files alone.

------------------------------------------------------------------------

# Phase 1 --- Review 1 Application Shell

**Owner: Antigravity Person A**

**Goal:** Build the application foundation.

### Tasks

-   [ ] Create React application.
-   [ ] Create base styling/theme.
-   [ ] Create application layout.
-   [ ] Create Login page.
-   [ ] Create Dashboard page.
-   [ ] Create navigation/routing.
-   [ ] Add user display.
-   [ ] Add score/progress display.
-   [ ] Add Solo Mode card.
-   [ ] Add future/locked mode cards if visually useful.
-   [ ] Ensure application runs cleanly.

### Output

`Login → Dashboard → Solo Mode`

### Checkpoint

Commit and push the working foundation before Person B integrates the
challenge module.

------------------------------------------------------------------------

# Phase 2 --- Challenge & Scoring

**Owner: Antigravity Person B**

**Goal:** Add one complete playable challenge without changing the
application foundation.

### Tasks

-   [ ] Read the existing repository and all project context files.
-   [ ] Create Challenge component/page.
-   [ ] Create local challenge data.
-   [ ] Add challenge title/description/objective.
-   [ ] Add difficulty.
-   [ ] Add points.
-   [ ] Add Hint button.
-   [ ] Add flag input.
-   [ ] Add validation.
-   [ ] Add correct/incorrect states.
-   [ ] Add score award.
-   [ ] Add completion/result state.
-   [ ] Integrate Challenge page into existing Solo Mode.
-   [ ] Verify Login and Dashboard still work.

### Output

`Solo → Challenge → Submit Flag → Score → Result`

### Checkpoint

Push feature branch and merge into `main`.

------------------------------------------------------------------------

# Phase 3 --- Review 1 Integration & Demo Hardening

**Owner: Both**

### Tasks

-   [ ] Pull merged `main`.
-   [ ] Run from a clean environment.
-   [ ] Test Login.
-   [ ] Test Dashboard.
-   [ ] Test Solo Mode.
-   [ ] Test correct flag.
-   [ ] Test incorrect flag.
-   [ ] Test hint.
-   [ ] Test score.
-   [ ] Test return navigation.
-   [ ] Remove unnecessary dependencies.
-   [ ] Fix obvious UI bugs.
-   [ ] Update README.
-   [ ] Record demo flow.
-   [ ] Prepare explanation of future architecture.

### Definition of Done

A reviewer can complete the full Review 1 flow without developer
intervention.

------------------------------------------------------------------------

# Phase 4 --- Real Cyber Range Foundation

**Future baseline**

**Goal:** Replace the simulated challenge UI with a controlled
cybersecurity lab.

### Tasks

-   [ ] Introduce Docker.
-   [ ] Introduce Docker Compose.
-   [ ] Run one vulnerable application.
-   [ ] Start with Juice Shop or DVWA.
-   [ ] Define isolated lab network.
-   [ ] Define lab start/stop/reset lifecycle.
-   [ ] Connect challenge metadata to the lab.
-   [ ] Integrate CTFd.
-   [ ] Connect flag validation/scoring to CTFd.
-   [ ] Add backend service where required.

### Target flow

`React → FastAPI → CTFd/Docker → Vulnerable Lab`

------------------------------------------------------------------------

# Phase 5 --- Telemetry Foundation

**Future baseline**

**Goal:** Capture how the learner solves a challenge.

### Tasks

-   [ ] Define telemetry event schema.
-   [ ] Record challenge events.
-   [ ] Record hint events.
-   [ ] Record flag attempts.
-   [ ] Record timestamps.
-   [ ] Categorize actions.
-   [ ] Store session history.
-   [ ] Add basic telemetry API.
-   [ ] Add privacy/consent controls.

### Target flow

`Learner Action → Telemetry Event → Storage`

------------------------------------------------------------------------

# Phase 6 --- Cyber Twin & Analytics

**Future baseline**

### Tasks

-   [ ] Define Cyber Twin schema.
-   [ ] Update learner profile after sessions.
-   [ ] Calculate Recon score.
-   [ ] Calculate Enumeration score.
-   [ ] Calculate Exploitation score.
-   [ ] Calculate Efficiency score.
-   [ ] Track completion time.
-   [ ] Track hints used.
-   [ ] Track tool dependency.
-   [ ] Store preferred attack style where meaningful.
-   [ ] Build learner profile UI.

### Target flow

`Telemetry → Analytics → Cyber Twin`

------------------------------------------------------------------------

# Phase 7 --- Replay & Adaptive Coaching

**Future baseline**

### Attack Replay

-   [ ] Store ordered telemetry events.
-   [ ] Build timestamped timeline.
-   [ ] Display session replay.

### Recommendations

-   [ ] Create rule-based difficulty thresholds.
-   [ ] Create rule-based next-challenge selection.
-   [ ] Add tiered hints.
-   [ ] Add learner-specific recommendations.

### Target flow

`Cyber Twin → Recommendation → Next Challenge`

------------------------------------------------------------------------

# Phase 8 --- Competitive / AI Features

**Future baseline**

### Team Modes

-   [ ] Red Team mode.
-   [ ] Blue Team mode.
-   [ ] Purple Team analysis.
-   [ ] White Team scenario configuration.

### Scripted AI Opponent

-   [ ] Define finite states.
-   [ ] Define predefined attack behaviors.
-   [ ] Implement deterministic transitions.
-   [ ] Add opponent actions to session telemetry.

Do NOT turn this into autonomous pentesting.

------------------------------------------------------------------------

# Phase 9 --- Enhancement / Research

Only start after the baseline is stable.

### ML

-   [ ] Learner clustering.
-   [ ] Skill prediction.
-   [ ] Recommendation ranking.
-   [ ] Strategy classification.

### Adaptive Difficulty

-   [ ] Evaluate rule-based thresholds.
-   [ ] Explore IRT-based difficulty matching.

### RL

-   [ ] Run CyberBattleSim example.
-   [ ] Define abstract network graph.
-   [ ] Experiment with RL attack paths.
-   [ ] Compare against scripted behavior.

### Optional Tutor

-   [ ] RAG over project/scenario documentation.
-   [ ] LLM-based conversational tutor.

------------------------------------------------------------------------

# Phase 10 --- Final Polish

-   [ ] UI polish.
-   [ ] Performance testing.
-   [ ] Security testing.
-   [ ] Internal penetration test.
-   [ ] Documentation.
-   [ ] Architecture diagrams.
-   [ ] Demo rehearsal.
-   [ ] Research evaluation.
-   [ ] Final presentation.

------------------------------------------------------------------------

# Current Priority Queue

## MUST DO NOW

1.  [ ] Repository setup
2.  [ ] Shared project context
3.  [ ] React shell
4.  [ ] Login
5.  [ ] Dashboard
6.  [ ] Solo Mode
7.  [ ] One challenge
8.  [ ] Flag validation
9.  [ ] Score
10. [ ] Result
11. [ ] Integration testing

## DO NOT DO NOW

-   [ ] Docker
-   [ ] CTFd
-   [ ] PostgreSQL
-   [ ] ML
-   [ ] RL
-   [ ] CyberBattleSim
-   [ ] Telemetry pipeline
-   [ ] Cyber Twin engine
-   [ ] AI opponent
-   [ ] RAG
-   [ ] Kubernetes
-   [ ] Cloud deployment

These are deliberately preserved in the phase plan.

------------------------------------------------------------------------

# Git Workflow

## Person A

``` bash
git checkout -b feature/platform-shell
```

Build → test → commit → push.

## Person B

After the shell is stable:

``` bash
git pull origin main
git checkout -b feature/challenge-system
```

Build only the challenge module.

## Merge

``` text
feature/platform-shell
          ↓
         main
          ↓
feature/challenge-system
          ↓
         main
```

Do not have both contributors repeatedly edit the same core files.

------------------------------------------------------------------------

# Commit Convention

Use simple commits:

``` text
feat: create review 1 application shell
feat: add dashboard and solo mode
feat: add cybersecurity challenge
feat: add flag validation and scoring
fix: repair challenge navigation
docs: update review 1 run instructions
```
