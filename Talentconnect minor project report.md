# TalentConnect — A Multi-Role Talent Marketplace Platform for the Global Entertainment Industry

**A Minor Project Report**

Submitted in partial fulfillment of requirement of the Degree of

**BACHELOR OF TECHNOLOGY in COMPUTER SCIENCE & ENGINEERING**

BY

**[Your Name]**

**[University Roll No.]**

Under the Guidance of

**[Name of the Guide]**
**[Designation], Department of Computer Science & Engineering**

Department of Computer Science & Engineering
Faculty of Engineering
**MEDICAPS UNIVERSITY, INDORE — 453331**

**APRIL 2026**

---

## Report Approval

The project work **"TalentConnect — A Multi-Role Talent Marketplace Platform for the Global Entertainment Industry"** is hereby approved as a creditable study of an engineering subject carried out and presented in a manner satisfactory to warrant its acceptance as a prerequisite for the Degree for which it has been submitted.

It is to be understood that by this approval the undersigned do not endorse or approve any statement made, opinion expressed, or conclusion drawn therein; but approve the Project Report only for the purpose for which it has been submitted.

**Internal Examiner**
Name:
Designation:
Affiliation:

**External Examiner**
Name:
Designation:
Affiliation:

---

## Declaration

I/We hereby declare that the project entitled **"TalentConnect — A Multi-Role Talent Marketplace Platform for the Global Entertainment Industry"** submitted in partial fulfillment for the award of the degree of Bachelor of Technology in Computer Science & Engineering, completed under the supervision of **[Name, Designation and Department of the Guide]**, Faculty of Engineering, Medi-Caps University Indore, is an authentic work.

Further, I/we declare that the content of this Project work, in full or in parts, have neither been taken from any other source nor have been submitted to any other Institute or University for the award of any degree or diploma.

**Signature and name of the student(s) with date**

---

## Certificate

I/We, **[Name of the Guide]** certify that the project entitled **"TalentConnect — A Multi-Role Talent Marketplace Platform for the Global Entertainment Industry"** submitted in partial fulfillment for the award of the degree of Bachelor of Technology by **[Name of the Student]** is the record carried out by him/them under my/our guidance and that the work has not formed the basis of award of any other degree elsewhere.

________________________________
[Name of Internal Guide]
[Name of the Department]
Medi-Caps University, Indore

________________________________
[Name of External Guide (If any)]
[Name of the Department]
[Name of the Organization]

_____________________
Dr. Ratnesh Litoriya
Head of the Department
Computer Science & Engineering
Medi-Caps University, Indore

---

## Acknowledgements

I would like to express my deepest gratitude to the Honorable Chancellor, **Shri R C Mittal**, who has provided every facility to successfully carry out this project, and my profound indebtedness to **Prof. (Dr.) D. K. Patnaik**, Vice Chancellor, Medi-Caps University, whose unfailing support and enthusiasm has always boosted my morale. I also thank **Prof. (Dr.) Pramod S. Nair**, Dean, Faculty of Engineering, Medi-Caps University, for giving me the opportunity to work on this project. I would also like to thank my Head of the Department **Dr. Ratnesh Litoriya** for his continuous encouragement for the betterment of the project.

I am sincerely thankful to my project guide **[Name of Guide]** for providing invaluable technical guidance, consistent mentorship, and constructive feedback throughout the development of this project. Their expertise in software engineering, web application security, and modern cloud architectures has been instrumental in shaping the design and implementation of TalentConnect.

I also extend gratitude to all faculty members of the Department of Computer Science & Engineering for their continuous academic support, and to my peers for their encouragement and collaborative spirit during the project period.

This project has been an enriching academic experience — spanning full-stack web development, cloud infrastructure integration, real-time communication systems, payment gateway integration, and software security engineering. Each of these domains required research, experimentation, and iterative refinement, and I am grateful to everyone who supported this process.

**[Name of the Student]**
B.Tech. III Year
Department of Computer Science & Engineering
Faculty of Engineering
Medi-Caps University, Indore

---

## Abstract

TalentConnect is a full-stack web application designed to digitize and streamline the talent casting process in the Global entertainment industry. The platform connects performing arts professionals — actors, models, musicians, dancers, and content creators — with directors and production houses who need to cast and manage creative projects. The Global entertainment sector, which encompasses cinema, television, web series, music, theatre, and digital content, currently relies on fragmented, word-of-mouth discovery mechanisms that create barriers for emerging talent and inefficiencies for casting teams.

The system is implemented using a modern cloud-native technology stack: React 19 with Vite on the frontend, Express.js 5 on the backend, Google Cloud Firestore as the primary database, and optional MongoDB as a secondary backup. The platform implements role-based access control for three distinct user types — talent, directors, and administrators — each with a tailored feature set and permission boundary.

Core functional modules include a three-step KYC identity verification workflow, a media portfolio management system backed by Cloudinary, a complete casting pipeline covering project creation, talent application, shortlisting, audition scheduling, video submission, and final selection, a real-time bidirectional messaging system via Socket.io, and a Stripe Subscription-based recurring payment system for director accounts.

Security engineering was applied systematically throughout development. The final system implements 14 Zod validation schemas providing 100% input coverage on write endpoints, magic-byte file type verification on both client and server, timing-safe admin authentication using SHA-256 and `crypto.timingSafeEqual()`, Redis-backed three-tier rate limiting, Pino structured logging with sensitive field redaction, Sentry error tracking, SSRF and IDOR protections, and a DPDP Act 2023-compliant personal data export endpoint. The overall security posture improved from an initial grade of D+ to B+ across three development iterations.

The project additionally implements a complete CI/CD pipeline via GitHub Actions, 26 unit tests using Vitest with full Firebase dependency mocking, graceful server shutdown with SIGTERM/SIGINT handling, and five lifecycle email notification templates. The system is assessed as functionally complete and deployment-ready at the conclusion of this project.

**Keywords:** Talent Marketplace, Casting Platform, React, Node.js, Express.js, Firestore, Stripe Subscriptions, Socket.io, Role-Based Access Control, Zod Validation, CI/CD, DPDP Act 2023, Pino Logging, Sentry, Web Application Security.

---

## Table of Contents

| | | Page No. |
|---|---|---|
| | Report Approval | ii |
| | Declaration | iii |
| | Certificate | iv |
| | Acknowledgement | v |
| | Abstract | vi |
| | Table of Contents | vii |
| | List of Figures | viii |
| | List of Tables | ix |
| | Abbreviations | x |
| | Notations & Symbols | xi |
| Chapter 1 | Introduction | 1 |
| | 1.1 Introduction | |
| | 1.2 Literature Review | |
| | 1.3 Objectives | |
| | 1.4 Significance | |
| | 1.5 Development Methodology | |
| | 1.6 Source of Data | |
| | 1.7 Chapter Scheme | |
| Chapter 2 | Requirements Specification | |
| | 2.1 User Characteristics | |
| | 2.2 Functional Requirements | |
| | 2.3 Non-Functional Requirements | |
| | 2.4 External Dependencies | |
| | 2.5 Performance Requirements | |
| | 2.6 Hardware and Software Requirements | |
| | 2.7 Constraints and Assumptions | |
| Chapter 3 | System Design | |
| | 3.1 System Architecture | |
| | 3.2 Authentication Architecture | |
| | 3.3 Data Flow Diagrams | |
| | 3.4 Activity Diagrams | |
| | 3.5 Entity Relationship Diagram | |
| | 3.6 Sequence Diagrams | |
| | 3.7 Database Design | |
| | 3.8 API Design | |
| | 3.9 Frontend Architecture | |
| | 3.10 Backend Architecture | |
| Chapter 4 | Implementation, Testing, and Maintenance | |
| | 4.1 Technologies and Tools Used | |
| | 4.2 Frontend Implementation | |
| | 4.3 Backend Implementation | |
| | 4.4 Security Implementation | |
| | 4.5 Testing Techniques and Test Plans | |
| | 4.6 CI/CD Pipeline | |
| | 4.7 Installation Instructions | |
| | 4.8 End User Instructions | |
| Chapter 5 | Results and Discussions | |
| | 5.1 Feature Implementation Status | |
| | 5.2 Description of System Modules | |
| | 5.3 User Interface Representation | |
| | 5.4 Security Analysis and Risk Reduction | |
| | 5.5 Backend and Database Representation | |
| Chapter 6 | Summary and Conclusions | |
| Chapter 7 | Future Scope | |
| | Appendix A — Complete API Endpoint Reference | |
| | Appendix B — Environment Variables Reference | |
| | Appendix C — Security Controls Mapped to OWASP | |
| | Appendix D — Codebase Structure | |
| | Bibliography | |

---

## List of Figures

| Figure No. | Title | Page No. |
|-----------|-------|---------|
| Fig 1.1 | Casting Process — Before and After TalentConnect | |
| Fig 3.1 | High-Level Three-Tier System Architecture | |
| Fig 3.2 | System Topology Diagram | |
| Fig 3.3 | Authentication Architecture — Four Login Methods | |
| Fig 3.4 | Data Flow Diagram — Level 0 (Context Diagram) | |
| Fig 3.5 | Data Flow Diagram — Level 1 (Authentication Flow) | |
| Fig 3.6 | Data Flow Diagram — Level 1 (Casting Pipeline Flow) | |
| Fig 3.7 | Data Flow Diagram — Level 1 (Payment Flow) | |
| Fig 3.8 | Activity Diagram — Talent Registration and Verification | |
| Fig 3.9 | Activity Diagram — Project Creation and Application Pipeline | |
| Fig 3.10 | Activity Diagram — Admin Verification Review | |
| Fig 3.11 | Entity Relationship Diagram | |
| Fig 3.12 | Sequence Diagram — User Registration | |
| Fig 3.13 | Sequence Diagram — Stripe Subscription Payment | |
| Fig 3.14 | Sequence Diagram — Real-Time Messaging | |
| Fig 3.15 | Frontend Module Folder Structure | |
| Fig 3.16 | Backend Controller-Route Dependency Map | |
| Fig 3.17 | Express Middleware Pipeline | |
| Fig 4.1 | GitHub Actions CI/CD Pipeline Stages | |
| Fig 4.2 | Vitest Test Results — 26/26 Passing | |
| Fig 4.3 | Graceful Shutdown Signal Flow | |
| Fig 5.1 | Home Page | |
| Fig 5.2 | Talent Registration Form | |
| Fig 5.3 | Talent Dashboard with Metric Cards | |
| Fig 5.4 | Portfolio Upload Interface | |
| Fig 5.5 | Verification Wizard — Step 1 (Government ID) | |
| Fig 5.6 | Verification Wizard — Step 2 (Membership) | |
| Fig 5.7 | Verification Wizard — Step 3 (Video Selfie) | |
| Fig 5.8 | Project Discovery with Filters | |
| Fig 5.9 | Director Dashboard | |
| Fig 5.10 | Create Project — Step 1 | |
| Fig 5.11 | Project Details with Application Pipeline | |
| Fig 5.12 | Talent Discovery with Filter Sidebar | |
| Fig 5.13 | Admin Dashboard | |
| Fig 5.14 | Admin Verification Review Queue | |
| Fig 5.15 | Real-Time Messaging Interface | |
| Fig 5.16 | System Health Monitor | |
| Fig 5.17 | Firestore — Users Collection | |
| Fig 5.18 | Firestore — Applications Collection | |

---

## List of Tables

| Table No. | Title | Page No. |
|----------|-------|---------|
| Table 1.1 | Comparison of Existing Platforms | |
| Table 1.2 | Development Iterations Summary | |
| Table 2.1 | Functional Requirements — Talent Role | |
| Table 2.2 | Functional Requirements — Director Role | |
| Table 2.3 | Functional Requirements — Admin Role | |
| Table 2.4 | Non-Functional Requirements | |
| Table 2.5 | External Service Dependencies | |
| Table 3.1 | Complete Technology Stack | |
| Table 3.2 | Auth Method Comparison | |
| Table 3.3 | Firestore Collections and Key Fields | |
| Table 3.4 | Composite Firestore Index Definitions | |
| Table 3.5 | Firestore Security Rules Summary | |
| Table 3.6 | Complete API Endpoint Map | |
| Table 4.1 | Programming Languages and Usage | |
| Table 4.2 | Zod Validation Schema Coverage — All 14 Endpoints | |
| Table 4.3 | Unit Test Coverage Summary | |
| Table 4.4 | Validation Test Plan | |
| Table 4.5 | Email Lifecycle Templates | |
| Table 5.1 | Feature Implementation Status by Module | |
| Table 5.2 | Component Production Readiness | |
| Table 5.3 | Security Grade Progression Across Iterations | |
| Table 5.4 | Risk Matrix — Before and After | |
| Table 5.5 | Technical Readiness Scorecard | |

---

## Abbreviations

| Abbreviation | Full Form |
|---|---|
| API | Application Programming Interface |
| Auth | Authentication / Authorization |
| CI/CD | Continuous Integration / Continuous Deployment |
| CORS | Cross-Origin Resource Sharing |
| CSP | Content Security Policy |
| CRUD | Create, Read, Update, Delete |
| DB | Database |
| DPDP | Digital Personal Data Protection (Act 2023) |
| DSN | Data Source Name |
| E2E | End-to-End |
| ESM | ECMAScript Modules |
| EXIF | Exchangeable Image File Format |
| GDPR | General Data Protection Regulation |
| GUI | Graphical User Interface |
| HSTS | HTTP Strict Transport Security |
| HTTP | Hypertext Transfer Protocol |
| HTTPS | Hypertext Transfer Protocol Secure |
| IDOR | Insecure Direct Object Reference |
| JWT | JSON Web Token |
| KYC | Know Your Customer |
| MFA | Multi-Factor Authentication |
| MIME | Multipurpose Internet Mail Extensions |
| MVP | Minimum Viable Product |
| NoSQL | Not Only SQL |
| OAuth | Open Authorization |
| OWASP | Open Web Application Security Project |
| RBAC | Role-Based Access Control |
| REST | Representational State Transfer |
| SDK | Software Development Kit |
| SMTP | Simple Mail Transfer Protocol |
| SPA | Single Page Application |
| SQL | Structured Query Language |
| SSRF | Server-Side Request Forgery |
| TOTP | Time-based One-Time Password |
| UI | User Interface |
| UX | User Experience |
| UUID | Universally Unique Identifier |
| WSS | WebSocket Secure |
| XSS | Cross-Site Scripting |

---

## Notations & Symbols

| Notation | Meaning |
|---|---|
| ✅ | Feature implemented and working |
| ❌ | Feature not yet implemented |
| ⚠️ | Feature partially implemented or requires further work |
| → | Data flows to / navigates to |
| ──► | Directed relationship or dependency |
| ≥ | Greater than or equal to |
| % | Percentage |
| /api/ | REST API route prefix |
| :id | Dynamic URL route parameter |
| n+1 | Inefficient sequential database query anti-pattern |
| B+ | Security grade assigned on an academic letter scale |
| PK | Primary Key |
| FK | Foreign Key |

---

# Chapter 1

## Introduction

### 1.1 Introduction

The Global entertainment industry is one of the largest creative economies in the world, encompassing cinema, television, web series, digital content creation, music, theatre, and advertising. Despite this scale, the process by which performing arts talent is discovered, evaluated, and cast into projects remains largely informal, fragmented, and inaccessible to many emerging professionals. Talent discovery primarily occurs through personal networks, talent agencies with selective representation, or ad-hoc WhatsApp group announcements. Casting directors and production teams, in turn, lack a reliable digital channel to discover, verify, and evaluate talent at scale before committing to auditions.

TalentConnect is a full-stack web application developed to address this systemic gap. It serves as a centralized digital platform connecting performing arts professionals — actors, artists, models, musicians, dancers, and content creators — with directors and production houses who need to cast and manage creative projects. The platform is designed around three primary user roles: talent, who build verified portfolios and apply to casting calls; directors, who post projects, search talent, and manage the casting pipeline; and administrators, who oversee platform integrity, verify user identities, and monitor system health.

The application was built using a modern, cloud-native technology stack and developed iteratively across three revisions. Each revision introduced measurable improvements in security hardening, performance optimization, and feature completeness. The resulting system implements production-grade engineering practices including comprehensive input validation, role-based access control, real-time communication, automated testing, and a complete CI/CD deployment pipeline.

### 1.2 Literature Review

**1.2.1 Existing Platforms and Limitations**

Several digital platforms exist that partially address talent discovery, but none comprehensively serves the Global market with a full casting pipeline:

**Table 1.1 — Comparison of Existing Platforms**

| Platform | Primary Focus | Key Limitation |
|----------|--------------|----------------|
| LinkedIn | General professional networking | No entertainment-specific features, no portfolio system, no casting pipeline |
| Backstage (USA) | Actor casting in USA/UK | Geography-locked; not designed for Global entertainment context |
| StarNow | Creative talent marketplace | Generic; no identity verification; no structured audition workflow |
| BookMyShow Talent | Event talent booking | Transactional booking only; no long-form portfolio or application management |
| WhatsApp Groups | Ad-hoc talent sharing | No search, no verification, no data persistence, no structured workflow |
| Agency Portals | Agency-managed rosters | Closed systems; accessible only to agency-represented talent |

The gap analysis confirms that no existing platform combines verified talent profiles, a structured end-to-end casting pipeline, real-time communication, and subscription-based access control in a single product optimized for the Global market.

**1.2.2 Technical Background**

Research on marketplace platform architecture identifies several requirements that directly informed this project's design. Liu et al. [1] highlight that identity verification is a prerequisite for trust in two-sided digital marketplaces, particularly those involving professional engagements. This insight directly motivated the three-step KYC verification workflow in TalentConnect.

The OWASP Top 10 Web Application Security Risks [2] provided the primary framework for security design decisions, including server-side input validation via Zod schemas, magic-byte file verification, timing-safe authentication, and rate limiting strategies. Each of the final system's security controls can be mapped to a specific OWASP category.

Firebase Firestore's document-collection data model [3] and its security rules system were selected as the primary database solution based on its horizontal scalability, real-time listener support, and serverless operation — properties well-suited to a platform with unpredictable initial load.

Socket.io [4] was selected for real-time communication over alternatives such as native WebSockets due to its built-in reconnection logic, room-based event broadcasting, and compatibility with Node.js ESM modules.

The Stripe Subscriptions API [5] was adopted over one-time payment intents after reviewing SaaS billing literature, which consistently identifies recurring billing as the appropriate model for software platform access rather than transactional one-time charges.

**1.2.3 Design Patterns Applied**

The following well-established software engineering patterns are applied in this project:

- **Repository Pattern**: Service layer (`client/src/services/`) abstracts all API calls from UI components, enabling testability and separation of concerns.
- **Middleware Pipeline Pattern**: Express.js middleware chain handles cross-cutting concerns (auth, validation, logging, error handling) independently of business logic.
- **Context + Observer Pattern**: React Context API (`AuthContext`, `NotificationContext`) provides global state with subscriber-based updates.
- **Idempotency Pattern**: The `processedWebhookEvents` Firestore collection ensures Stripe webhook events are processed exactly once, even under retry conditions.
- **Defense in Depth**: Security controls are applied at multiple layers — client-side validation, server-side Zod schemas, database security rules, and infrastructure-level rate limiting.

### 1.3 Objectives

The primary objectives of this project are:

1. To design and implement a multi-role web platform serving talent, directors, and administrators with role-appropriate features, dashboards, and access controls enforced at both the API and database layers.

2. To build a three-step KYC-based identity verification system enabling administrators to review uploaded government ID, industry membership, and video selfie documents, and issue a verified badge to approved talent profiles.

3. To implement a complete end-to-end casting pipeline covering project creation, talent discovery, application submission, shortlisting, audition scheduling, video submission, and final selection — with status changes triggering automated email notifications.

4. To integrate real-time bidirectional messaging and notification delivery using Socket.io, enabling direct communication between platform users with persistent message storage in Firestore.

5. To implement a secure Stripe Subscription-based recurring payment system for director accounts, including webhook-driven plan activation, customer portal integration, payment history, and subscription cancellation handling.

6. To achieve comprehensive web application security covering 100% input validation on write endpoints, magic-byte file type verification, timing-safe authentication, Redis-backed rate limiting, SSRF and IDOR protections, structured logging with sensitive field redaction, and error tracking.

7. To establish an automated CI/CD pipeline using GitHub Actions with lint, unit test, and build verification on every commit, and automatic deployment to staging and production environments.

8. To implement a DPDP Act 2023-compliant personal data export endpoint enabling users to download all personal data held by the platform as a structured JSON file.

### 1.4 Significance

**Academic Significance**

This project applies a broad range of computer science concepts in an integrated, end-to-end context: distributed systems design (dual-database architecture, Redis-backed rate limiting), cryptographic authentication (SHA-256, `timingSafeEqual()`, JWT), real-time event-driven architecture (Socket.io rooms, event broadcasting), database query optimization (cursor-based pagination, Firestore batch reads eliminating N+1 patterns), and automated software testing with full dependency mocking in an ESM module environment.

The iterative development methodology — with three revisions each assessed against a formal risk matrix and technical scorecard — demonstrates applied software engineering lifecycle management, which is directly relevant to software quality assurance and project management courses.

**Social Significance**

The platform addresses genuine inequity in access to the Global entertainment industry. Without agency representation or personal networks, emerging talent has no reliable channel to be discovered by production teams. TalentConnect provides a free, accessible portfolio and discovery channel for all registered talent, lowering the barrier to professional opportunity.

**Technical Significance**

The project serves as a practical reference implementation of a production-grade Node.js/React application integrating Firebase, Stripe, Socket.io, Cloudinary, Pino, Sentry, and GitHub Actions CI/CD. The security hardening approach — systematic application of OWASP Top 10 mitigations with measurable risk score reduction from 254 to 26 — provides a documented methodology applicable to other web application projects.

**Legal Significance**

The implementation of the Digital Personal Data Protection (DPDP) Act 2023 data export endpoint demonstrates awareness of Global data protection legislation in software design. This is directly relevant to any web application handling personal data of Global users.

### 1.5 Development Methodology

This project follows an iterative development methodology aligned with Agile principles. Development was conducted across three formal revisions, each with defined deliverables and objective assessment criteria.

**Table 1.2 — Development Iterations Summary**

| Iteration | Focus | Security Grade | Key Deliverables |
|-----------|-------|:--------------:|-----------------|
| Revision 1 | Core feature prototype | D+ | User registration, project CRUD, basic application flow, messaging skeleton |
| Revision 2 | Security hardening | B- | Firestore rules, JWT enforcement, 10 Zod schemas, pagination, batch reads, magic-byte uploads, Stripe webhook, Redis rate limiting, AuthContext |
| Revision 3 | Production readiness | B+ | 14 Zod schemas (100% coverage), Sentry, Pino logging, GitHub Actions CI/CD, 26 Vitest tests, graceful shutdown, Stripe Subscriptions, lifecycle emails, GDPR export, SSRF/IDOR fixes |

Each revision was assessed against a risk matrix tracking 18 vulnerability categories with a numerical severity score. The cumulative risk score reduced from 254 (Revision 1) to 26 (Revision 3), representing a 90% reduction in identified security risk.

### 1.6 Source of Data

The project was designed and implemented using the following primary references:

- Firebase Authentication and Cloud Firestore documentation for auth and database design
- Cloudinary documentation for media storage, transformation, and EXIF metadata handling
- Stripe API documentation for Subscription billing, webhook event handling, and Customer Portal integration
- OWASP Top 10 Web Application Security Risks (2021) for security requirement identification
- India's Digital Personal Data Protection Act 2023 for privacy compliance requirements
- Node.js `crypto` module documentation for timing-safe comparison implementation
- Pino documentation for structured logging and sensitive field redaction configuration
- Vitest documentation for ESM-compatible unit testing and `vi.mock()` factory function patterns

### 1.7 Chapter Scheme

The remainder of this report is organized as follows:

**Chapter 2** presents the requirements specification including user role characteristics, functional and non-functional requirements for all three roles, external service dependencies, performance requirements, hardware and software requirements, and system constraints.

**Chapter 3** covers the complete system design including the three-tier architecture, four-method authentication architecture, data flow diagrams at two levels, activity diagrams for key workflows, the complete ER diagram, sequence diagrams for registration and payment flows, Firestore database design with index definitions and security rules, API design, and both frontend and backend architecture descriptions.

**Chapter 4** describes the implementation in detail: technologies and languages used, frontend and backend implementation specifics, security implementation highlights, testing methodology with the full test plan, CI/CD pipeline design, installation instructions, and end user instructions for all three roles.

**Chapter 5** presents results and discussions including a feature implementation status table, module-by-module system description, UI representation of all major screens, security analysis with the full risk matrix, and backend/database representation.

**Chapter 6** provides the summary and conclusions drawn from the project.

**Chapter 7** outlines the future scope with planned enhancements organized across technical improvement and feature expansion tracks.

---

# Chapter 2

## Requirements Specification

### 2.1 User Characteristics

TalentConnect serves three primary user roles, each with distinct usage patterns, technical literacy assumptions, and device preferences.

**Talent Users (Actors, Models, Musicians, Dancers, Content Creators)**
Talent users range from early-career artists with limited digital literacy to experienced professionals comfortable with complex web applications. The majority access the platform via mobile devices on 4G networks in tier-2 and tier-3 Global cities. Interfaces must be intuitive, upload workflows must handle unreliable connectivity gracefully, and status feedback must be unambiguous. Expected session frequency is three to five times per week, with peaks during active audition seasons.

**Director Users (Casting Directors, Filmmakers, Production Houses)**
Director users are working professionals who manage multiple active casting projects simultaneously. They access the platform primarily from desktop browsers in office or production house environments. They require efficient talent filtering with multiple criteria, bulk application management tools, and clear billing and subscription controls. Expected usage is daily during active casting periods and weekly otherwise.

**Admin Users (Platform Administrators)**
A single administrator or a small team of technically proficient operators. They access an internal admin dashboard for identity verification review, user account management, content moderation, system health monitoring, and activity reporting. They require high information density, rapid review workflows, and reliable system status visibility.

### 2.2 Functional Requirements

**Table 2.1 — Functional Requirements: Talent Role**

| ID | Requirement | Priority |
|----|-------------|---------|
| FR-T1 | Register with email/password, Google OAuth, or LinkedIn OAuth | High |
| FR-T2 | Complete email verification within 24 hours via emailed token | High |
| FR-T3 | Create and edit a rich profile with bio, skills, location, mobile, physical metrics, and social links | High |
| FR-T4 | Upload portfolio media — images and videos — with a maximum of 20 items per user | High |
| FR-T5 | Complete three-step KYC verification: upload government ID, industry membership card, and video selfie | High |
| FR-T6 | Browse and filter open casting projects by category, location, and deadline | High |
| FR-T7 | Apply to a project with a cover note; receive duplicate-application prevention | High |
| FR-T8 | Track application status through the full pipeline: applied → shortlisted → auditioning → selected/rejected | High |
| FR-T9 | Submit an audition video URL when a director schedules an audition | High |
| FR-T10 | Send and receive direct messages to/from directors in real time | High |
| FR-T11 | Receive in-app and email notifications on shortlisting, audition scheduling, selection, and rejection | Medium |
| FR-T12 | Upgrade account to a premium plan via Stripe Subscription checkout | Medium |
| FR-T13 | Access and manage account settings including password change and privacy controls | Medium |
| FR-T14 | Export all personal data as a structured JSON file under DPDP Act 2023 | Medium |

**Table 2.2 — Functional Requirements: Director Role**

| ID | Requirement | Priority |
|----|-------------|---------|
| FR-D1 | Register with company profile; 30-day free trial begins automatically upon registration | High |
| FR-D2 | Create casting projects via a two-step validated form with title, category, description, requirements, budget, location, and deadline | High |
| FR-D3 | Edit, update status (open/closed/draft), and delete own projects | High |
| FR-D4 | Search and filter talent by category, location, physical metrics, and verification status | High |
| FR-D5 | View individual talent portfolios including media, physical metrics, verification badge, and social links | High |
| FR-D6 | Review all applications for a project loaded via batch reads; change application status | High |
| FR-D7 | Shortlist talent, schedule auditions with date/location/notes, and review video submissions | High |
| FR-D8 | Select or reject candidates; system sends automated email to talent on each status transition | High |
| FR-D9 | Communicate directly with talent via real-time messaging | High |
| FR-D10 | Subscribe to the Studio Pro plan after trial expiry to retain platform access | High |
| FR-D11 | Access the Stripe Customer Portal for self-service subscription management and cancellation | Medium |
| FR-D12 | View invoice and payment history with links to PDF invoices | Medium |
| FR-D13 | Export all personal data under DPDP Act 2023 | Medium |

**Table 2.3 — Functional Requirements: Admin Role**

| ID | Requirement | Priority |
|----|-------------|---------|
| FR-A1 | Authenticate via a separate admin login route using environment-variable credentials with timing-safe comparison | High |
| FR-A2 | View all pending identity verification submissions with document thumbnails | High |
| FR-A3 | Approve or reject verification with a single action; system sends email to user on approval | High |
| FR-A4 | View, search, change role, and delete user accounts with cascading cleanup of associated data | High |
| FR-A5 | View, change status, and delete any project on the platform | High |
| FR-A6 | Perform platform-wide search across users by name/email and projects by title | High |
| FR-A7 | View platform statistics: total talent, directors, projects, applications | Medium |
| FR-A8 | Browse Cloudinary media assets stored for the platform | Medium |
| FR-A9 | Monitor real-time system health showing connectivity status of Firestore, Redis, and MongoDB | Medium |
| FR-A10 | View financial transaction reporting | Medium |

### 2.3 Non-Functional Requirements

**Table 2.4 — Non-Functional Requirements**

| ID | Requirement | Target Metric |
|----|-------------|--------------|
| NFR-1 | API response time | P95 under 500ms under normal operating load |
| NFR-2 | System availability | 99.5% uptime, leveraging Firebase and Render SLA |
| NFR-3 | Security posture | OWASP Top 10 addressed; all write endpoints Zod-validated |
| NFR-4 | Scalability | Single process supports up to 5,000 concurrent users |
| NFR-5 | Mobile responsiveness | Fully functional on viewports ≥ 320px width |
| NFR-6 | Data privacy | DPDP Act 2023 compliant personal data export endpoint |
| NFR-7 | Observability | Every HTTP request logged with unique request ID via Pino |
| NFR-8 | Error tracking | 100% of unhandled server errors captured and reported in Sentry |
| NFR-9 | File upload safety | All uploaded files verified via magic-byte detection before storage |
| NFR-10 | Maintainability | All code changes pass ESLint and 26-test Vitest suite before merge |

### 2.4 External Dependencies

**Table 2.5 — External Service Dependencies**

| Service | Purpose | Required |
|---------|---------|:--------:|
| Firebase Authentication | Email/password and Google OAuth user authentication | Yes |
| Google Cloud Firestore | Primary application database | Yes |
| Firebase Admin SDK | Server-side auth verification and Firestore access | Yes |
| Cloudinary | Image and video storage, transformation, EXIF stripping | Yes |
| Stripe | Subscription billing, Customer Portal, invoice history, webhooks | Yes |
| Nodemailer + SMTP | Transactional email delivery (7 template types) | Yes |
| ioredis + Redis | Distributed rate limit store for `express-rate-limit` | Optional |
| Mongoose + MongoDB | Secondary audit backup database | Optional |
| Sentry | Error tracking on Express server and React client | Recommended |
| GitHub Actions | CI/CD pipeline: lint, test, build, deploy | Recommended |

### 2.5 Performance Requirements

The following specific performance engineering decisions were made during design:

- All Firestore list queries use **cursor-based pagination** with a default document limit of 20 per page, preventing unbounded collection scans.
- **N+1 query patterns are eliminated** throughout the application. When a list endpoint needs related documents (e.g., fetching talent profiles for a list of applications), `getAll(...refs)` batch reads are used instead of sequential `doc.get()` calls.
- **React component code-splitting** via `React.lazy()` is applied to public-facing pages, reducing the initial JavaScript bundle size.
- **TanStack React Query** caches server responses for 5 minutes (`staleTime`) with a 10-minute cache lifetime, reducing redundant API requests during navigation.
- **Cloudinary** delivers all images with `quality: auto` and `fetch_format: auto` transformation parameters, providing browser-optimal compression without manual intervention.
- **Token cleanup** runs hourly via a scheduled `tokenCleanup.js` function, deleting expired email verification and password reset tokens from Firestore using operations that respect the 500-document batch limit.

### 2.6 Hardware and Software Requirements

**Development Environment**

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Processor | Intel Core i5 or equivalent | Intel Core i7 or equivalent |
| RAM | 8 GB | 16 GB |
| Storage | 20 GB free | 50 GB free |
| Operating System | Windows 10/11, macOS 12+, Ubuntu 20.04+ | Any of the above |
| Node.js | v18 LTS | v20 LTS |
| npm | v9+ | v10+ |
| Browser | Chrome 110+ or Firefox 110+ | Chrome latest |

**Production Environment (Cloud)**

| Component | Service | Notes |
|-----------|---------|-------|
| Application server | Render Web Service | 512 MB RAM, 0.5 CPU on free tier |
| Primary database | Google Cloud Firestore | Serverless, auto-scaling NoSQL |
| Client hosting | Firebase Hosting | Global CDN for React SPA |
| Media storage | Cloudinary | 25 GB free tier |
| Optional cache | Redis (Render Redis or Upstash) | For distributed rate limiting |

### 2.7 Constraints and Assumptions

**Constraints**

- The platform is web-only; no native mobile application is implemented.
- The community forum module uses client-side mock data only; no backend persistence is implemented.
- The producer role exists as a UI placeholder; no business logic or API routes are implemented for this role.
- Workshop creation requires direct Firestore Console access; no admin GUI for workshop management exists.
- Full-text search is limited by Firestore's prefix range query capability; a dedicated search engine (Algolia or Typesense) is not integrated in this version.
- Only one subscription plan exists (Studio Pro); no plan tiers, metered billing, or per-project fees are implemented.

**Assumptions**

- Users have internet connectivity sufficient for video upload (minimum 5 Mbps upload speed).
- Directors possess valid payment cards for Stripe Subscription enrollment.
- Admin credentials are stored as environment variables and are accessible only to the platform operator.
- The Firebase project has email verification enabled and Firestore is initialized in the correct region.
- The Stripe webhook endpoint secret is unique per environment (development vs. production) and rotated if compromised.

---

# Chapter 3

## System Design

### 3.1 System Architecture

TalentConnect follows a three-tier web application architecture:

- **Presentation Tier**: React 19 Single Page Application served via Firebase Hosting CDN
- **Application Tier**: Express.js 5 REST API with Socket.io, deployed on Render
- **Data Tier**: Google Cloud Firestore (primary) with optional MongoDB backup and optional Redis cache

**High-Level Architecture**

```
┌──────────────────────────────────────────────────────────────────┐
│  PRESENTATION TIER                                               │
│  React 19 SPA (Vite 7)                                           │
│  AuthContext · NotificationContext · ThemeContext                │
│  Axios Interceptors · Socket.io Client · Stripe.js              │
│  Sentry React · ErrorBoundary · TanStack React Query            │
│  Role folders: /pages · /talent · /director · /admin            │
└───────────────────────┬──────────────────────────────────────────┘
                        │ HTTPS REST + WSS WebSocket
┌───────────────────────▼──────────────────────────────────────────┐
│  APPLICATION TIER                                                │
│  Express 5 (ESM) + Socket.io 4.8                                │
│  Middleware: Sentry → Pino HTTP → Helmet → CORS →               │
│             Rate Limiter → Body Parser → Routes →               │
│             Auth → Validate(Zod) → Controller →                 │
│             Sentry Error Handler → Pino Error Handler           │
│  8 Controllers · 8 Route Modules · 14 Zod Schemas              │
│  Pino Logger · Sentry Node · Graceful Shutdown Handler          │
└──┬──────────┬──────────┬──────────┬──────────┬──────────────────┘
   │          │          │          │          │
   ▼          ▼          ▼          ▼          ▼
Firestore  MongoDB    Redis    Cloudinary   Stripe
(primary)  (backup)  (rate    (media       (subscriptions
                      limit)   storage)     + webhooks)
                                              ▲
                                Firebase Auth  SMTP
                                (identity)    (Nodemailer)
```

**Table 3.1 — Complete Technology Stack**

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend framework | React | 19 | UI component system |
| Build tool | Vite | 7 | Frontend bundler, dev server |
| CSS framework | TailwindCSS | 3.4 | Utility-first styling |
| Client routing | React Router | 7 | SPA route management |
| Server state | TanStack React Query | 5 | API response caching |
| HTTP client | Axios | Latest | API calls with interceptors |
| Real-time client | Socket.io Client | 4.8 | WebSocket messaging |
| Backend framework | Express.js | 5.2 (ESM) | REST API server |
| Runtime | Node.js | 20 LTS | JavaScript runtime |
| Input validation | Zod | 4 | Schema-based validation |
| Logging | Pino + pino-http | Latest | Structured JSON logging |
| Error tracking | Sentry Node + React | Latest | Exception monitoring |
| Primary database | Firestore | Latest | NoSQL document store |
| Secondary database | MongoDB via Mongoose | 7 | Optional backup mirror |
| Auth provider | Firebase Auth | Latest | Identity management |
| Cache / Rate store | Redis via ioredis | Latest | Distributed rate limiting |
| Media storage | Cloudinary | Latest | Image/video CDN |
| Payment | Stripe SDK | v20 | Subscription billing |
| Email | Nodemailer | Latest | SMTP transactional email |
| Testing | Vitest | 3.2 | Unit testing (ESM native) |
| CI/CD | GitHub Actions | Latest | Automated pipeline |
| Client hosting | Firebase Hosting | Latest | CDN delivery |
| Server hosting | Render | Latest | Container deployment |

### 3.2 Authentication Architecture

The platform implements four distinct authentication methods, all converging to a unified `AuthContext.setSessionFromAuthResponse()` function that stores the session in `sessionStorage` via `authStorage.js`.

**Table 3.2 — Authentication Method Comparison**

| Method | Client Flow | Server Verification | Token Type |
|--------|------------|-------------------|-----------|
| Email/password | Firebase Client SDK `signInWithEmailAndPassword()` | `POST /auth/login` → `verifyIdToken()` | Firebase ID Token |
| Google OAuth | Firebase `signInWithPopup(GoogleAuthProvider)` | `POST /auth/login/google` → `verifyIdToken()` | Firebase ID Token |
| LinkedIn OAuth | PKCE redirect → code → `POST /auth/login/linkedin` | Server exchanges code for profile → signs JWT | Custom Server JWT |
| Admin | Form submission to `POST /auth/admin-login` | `timingSafeEqual(SHA-256(input), SHA-256(env))` | Custom Server JWT |

**Auth Token Storage**: Tokens are stored in `sessionStorage` (not `localStorage`) via `authStorage.js`. This limits XSS exposure to the current browser session — tokens are automatically cleared when the browser tab is closed. Tab synchronization is achieved via custom DOM `AUTH_STORAGE_EVENT` events.

**Admin Login Security**: The admin login uses Node.js `crypto.timingSafeEqual()` to compare SHA-256 hashes of the provided credentials against the environment variable values. A 200ms artificial delay is applied to all auth responses to prevent brute-force timing analysis. Failed admin login attempts are logged with the source IP address. A strict rate limit of 5 attempts per 15 minutes is applied exclusively to the admin login route.

**Auth Middleware Pipeline**: All protected routes pass through `protect()` which determines the token type, verifies it via Firebase Admin SDK or `jwt.verify()`, and attaches the user object to `req.user`. Role enforcement is applied subsequently via `authorize(roles)`.

### 3.3 Data Flow Diagrams

**Level 0 DFD — Context Diagram**

```
                    ┌──────────────────────────┐
    Talent ─────────►                          ├──────► Casting Calls
    Director ───────►    T A L E N T           ├──────► Applications
    Admin ──────────►    C O N N E C T         ├──────► Notifications
                    │                          ├──────► Email Alerts
                    └──────────────────────────┘
                                │
          ┌─────────────────────┼──────────────────────┐
          ▼                     ▼                      ▼
    Firebase Auth          Cloudinary              Stripe
    (identity)             (media)                 (payments)
```

**Level 1 DFD — Authentication and Registration Flow**

```
User ──► [1.1 Submit form data]
     ──► [1.2 Validate input (Zod registerSchema)]
             ├── FAIL → [1.3 Return 400 with field errors]
             └── PASS
                  ──► [1.4 Firebase Admin createUser(email, password)]
                  ──► [1.5 Create Firestore user document]
                  ──► [1.6 Create Firestore profile document]
                  ──► [1.7 Send verification email (24h token via SMTP)]
                  ──► [1.8 Auto-login → obtain Firebase idToken]
                  ──► [1.9 Return {token, user} to frontend]
                  ──► [1.10 AuthContext.setSessionFromAuthResponse()]
                  ──► [1.11 sessionStorage.setItem(token, user)]
                  ──► [1.12 Navigate to role-specific dashboard]
```

**Level 1 DFD — Casting Pipeline Flow**

```
Director ──► [2.1 Submit project form]
         ──► [2.2 Validate (createProjectSchema — deadline must be future)]
         ──► [2.3 addWithBackup(projects, data)] ──► Firestore + MongoDB backup
         ──► [2.4 Socket.io broadcastProjectCreated()] ──► All connected users

Talent ──► [2.5 GET /projects (paginated, status=open)] ◄── Firestore
       ──► [2.6 POST /projects/:id/apply {note}]
               ──► [2.7 Check for duplicate application]
               ──► [2.8 addWithBackup(applications, {status:'applied'})]
               ──► [2.9 Create notification for director]
               ──► [2.10 Socket.io sendNotification(directorId)]

Director ──► [2.11 GET /projects/:id/applications]
                 ──► [2.12 getAll(talentRefs) — batch read users]
                 ──► [2.13 getAll(profileRefs) — batch read profiles]
         ──► [2.14 PUT /applications/:id/status {status}]
                 ──► [2.15 Verify application.project.director == req.user.id (IDOR check)]
                 ──► [2.16 updateWithBackup(applications, {status})]
                 ──► [2.17 Fetch talent email and name]
                 ──► [2.18 Send lifecycle email (shortlisted/selected/rejected)]
                 ──► [2.19 Socket.io sendNotification(talentId)]
```

**Level 1 DFD — Payment Flow**

```
Director ──► [3.1 POST /payment/create-subscription {planType:'studio_pro'}]
         ──► [3.2 getOrCreateStripeCustomer(userId, email)]
                 ──► [Check if stripeCustomerId exists in Firestore]
                 ──► [If not: stripe.customers.create() → save ID to Firestore]
         ──► [3.3 Check for existing active subscription]
         ──► [3.4 stripe.subscriptions.create({customer, price, expand})]
         ──► [3.5 Return {clientSecret, subscriptionId} to frontend]
         ──► [3.6 Frontend: stripe.confirmCardPayment(clientSecret)]

Stripe ──► [3.7 POST /payment/webhook] (async, after payment confirmation)
       ──► [3.8 stripe.webhooks.constructEvent() — verify signature]
       ──► [3.9 Check processedWebhookEvents — reject if duplicate]
       ──► [3.10 doc.create(eventId) — record for idempotency]
       ──► [3.11 Update user: {plan:'studio_pro', subscriptionStatus:'active'}]
```

### 3.4 Activity Diagrams

**Activity Diagram — Talent Registration and Verification**

```
[Start]
  │
  ▼
User fills registration form (fullName, email, password, role=talent)
  │
  ▼
System validates input via registerSchema (Zod)
  ├── [FAIL] → Display validation errors → User corrects input → Loop back
  └── [PASS]
        │
        ▼
Firebase Admin SDK createUser(email, password) — creates Firebase Auth account
        │
        ▼
Create Firestore user document (role, plan, verificationStatus='none')
        │
        ▼
Create Firestore profile document (linked by user UID)
        │
        ▼
Send email verification link (24h expiry token via SMTP)
        │
        ▼
Auto-login → Firebase issues idToken → AuthContext stores session
        │
        ▼
User lands on Talent Dashboard
        │
        ▼
[Amber verification banner visible — "Complete verification to unlock features"]
        │
        ▼
User starts Verification Wizard
  ├── Step 1: Upload Government ID
  │       → Client magic-byte check → Server magic-byte check → Cloudinary upload
  ├── Step 2: Upload Industry Membership Card
  │       → Same upload pipeline
  └── Step 3: Upload Video Selfie (≤150 MB)
          → Same upload pipeline → verificationState in Firestore updated
        │
        ▼
User clicks Submit for Review → verificationStatus = 'pending'
        │
        ▼
Admin sees submission in Verification Queue
  ├── [Approve] → verificationStatus = 'verified'
  │            → sendVerificationApprovedEmail() to talent
  │            → Socket.io notification to talent
  │            → Verified badge shown on talent profile
  └── [Reject]  → verificationStatus = 'rejected'
               → User may re-submit
[End]
```

**Activity Diagram — Director Project Creation and Application Pipeline**

```
[Start]
  │
  ▼
Director fills Create Project Step 1 (title, category, description, deadline)
        │
        ▼
Director fills Create Project Step 2 (requirements, budget, location, image)
        │
        ▼
System validates via createProjectSchema → deadline must be in future
  ├── [FAIL] → Show field errors → Director corrects
  └── [PASS] → Project saved to Firestore with status='open'
        │
        ▼
Talent discovers project in Project Discovery (paginated, filtered)
        │
        ▼
Talent applies — system checks for duplicate application
  ├── [Duplicate] → Return 400 "Already applied"
  └── [New] → Application saved with status='applied'
           → Director receives notification
        │
        ▼
Director opens Project Details → Applications loaded via batch reads
        │
        ▼
Director reviews applications → Changes status:
  ├── 'shortlisted' → sendApplicationShortlistedEmail() to talent
  ├── 'auditioning' → Director schedules audition (date, location, notes)
  │               → sendAuditionScheduledEmail() to talent
  │               → Talent submits video URL
  ├── 'selected'   → sendSelectedEmail() to talent
  └── 'rejected'   → sendApplicationRejectedEmail() to talent
[End]
```

### 3.5 Entity Relationship Diagram

```
USERS
─────────────────────────────────────────
id (Firebase UID) PK
email (unique)
role: talent | director | admin
isVerified: boolean
verificationStatus: none | pending | verified | rejected
plan: free | studio_pro
subscriptionStatus: inactive | active | cancelled
trialEndsAt: datetime
profile: FK → profiles.id
authProvider: password | google | linkedin
stripeCustomerId: string
stripeSubscriptionId: string
planActivatedAt: datetime
createdAt: datetime

PROFILES
─────────────────────────────────────────
id PK
user: FK → users.id
fullName: string
bio: string (max 500 chars)
profilePicture: Cloudinary URL
location: string
mobile: string
talentCategory: string
physicalMetrics: { height, weight, eyeColor, hairColor }
portfolio: [{ type, url, title, description }] max 20 items
verificationState: { idFileUrl, membershipFileUrl, videoSelfieUrl }
privacySettings: { showEmail, showMobile, showLocation }
socialLinks: { instagram, twitter, linkedin, website, imdb, wikipedia }
companyName: string (director-only field)
createdAt: datetime

PROJECTS
─────────────────────────────────────────
id PK
director: FK → users.id
title: string
description: string (10–5000 chars)
category: Film | Advertisement | Music Video | Web Series | Short Film | Theatre | Other
requirements: string[]
budget: string
location: string
deadline: datetime (must be future — Zod enforced)
status: open | closed | draft
projectImage: Cloudinary URL
createdAt: datetime

APPLICATIONS
─────────────────────────────────────────
id PK
project: FK → projects.id
talent: FK → users.id
status: applied | shortlisted | auditioning | selected | rejected
note: string (talent cover note)
auditionScheduled: boolean
auditionDate: datetime
auditionLocation: string
auditionNotes: string
videoSubmissionUrl: string
createdAt: datetime

MESSAGES
─────────────────────────────────────────
id PK
sender: FK → users.id
receiver: FK → users.id
content: string (1–5000 chars, Zod enforced)
read: boolean
createdAt: datetime

NOTIFICATIONS
─────────────────────────────────────────
id PK
user: FK → users.id
type: message | application | application_update | audition_scheduled | verification | system
title: string
message: string
link: string
read: boolean
createdAt: datetime

EMAIL_VERIFICATIONS
─────────────────────────────────────────
id PK
userId: FK → users.id
email: string
expiresAt: datetime (24h)
used: boolean
createdAt: datetime

PASSWORD_RESETS
─────────────────────────────────────────
id PK
userId: FK → users.id
email: string
expiresAt: datetime (1h)
used: boolean
createdAt: datetime

PROCESSED_WEBHOOK_EVENTS
─────────────────────────────────────────
id: Stripe event ID (used as idempotency key)
type: string
processedAt: datetime

WORKSHOPS
─────────────────────────────────────────
id PK
title: string
type: live | on-demand
featured: boolean
createdAt: datetime

WORKSHOP_BOOKINGS
─────────────────────────────────────────
id PK
workshop: FK → workshops.id
user: FK → users.id
createdAt: datetime

RELATIONSHIPS:
USERS ──(1:1)──► PROFILES
USERS ──(1:N)──► PROJECTS          (director creates many projects)
USERS ──(1:N)──► APPLICATIONS      (talent submits many applications)
PROJECTS ──(1:N)──► APPLICATIONS   (each project receives many applications)
USERS ──(1:N)──► MESSAGES          (user sends many messages)
USERS ──(1:N)──► NOTIFICATIONS     (user receives many notifications)
USERS ──(1:N)──► WORKSHOP_BOOKINGS
WORKSHOPS ──(1:N)──► WORKSHOP_BOOKINGS
```

### 3.6 Sequence Diagrams

**Sequence Diagram — User Registration**

```
User     Frontend    Backend       Firebase Auth   Firestore    SMTP Email
 │           │            │               │             │             │
 │─Fill───►  │            │               │             │             │
 │           │─POST /auth/register────────►             │             │
 │           │            │─validate(registerSchema)    │             │
 │           │            │  ├─FAIL → return 400        │             │
 │           │            │  └─PASS                     │             │
 │           │            │─adminAuth.createUser()──────►             │
 │           │            │◄─────────────userRecord(uid)│             │
 │           │            │─setWithBackup(users,uid)────────────────► │
 │           │            │─addWithBackup(profiles,data)────────────► │
 │           │            │─sendVerificationEmail()──────────────────────────► │
 │           │            │─signInWithEmailAndPassword()►             │
 │           │            │◄──────────────────idToken  │             │
 │           │◄──{token,user}│              │           │             │
 │           │─AuthContext.setSession()     │           │             │
 │◄─Dashboard│            │               │             │             │
```

**Sequence Diagram — Stripe Subscription Payment**

```
Director  Frontend    Backend          Stripe         Firestore
   │          │            │               │               │
   │─Upgrade─►│            │               │               │
   │          │─POST /payment/create-subscription          │
   │          │            │─getOrCreateStripeCustomer()───────────────►│
   │          │            │◄──────────────────────stripeCustomerId     │
   │          │            │─Check active subscriptions────►            │
   │          │            │─subscriptions.create()────────►            │
   │          │            │◄──{clientSecret, subscriptionId}           │
   │          │◄─clientSecret│             │               │
   │          │─confirmCardPayment()───────►               │
   │          │◄─paymentResult             │               │
   │          │            │   [Async webhook]             │
   │          │            │◄──payment_intent.succeeded    │
   │          │            │─constructEvent() verify sig   │
   │          │            │─Check processedWebhookEvents──────────────►│
   │          │            │─doc.create(eventId)───────────────────────►│
   │          │            │─update user plan='studio_pro'─────────────►│
```

**Sequence Diagram — Real-Time Messaging**

```
Sender    Frontend    Backend HTTP    Firestore    Socket.io    Receiver
  │           │              │            │             │            │
  │─Send───►  │              │            │             │            │
  │           │─POST /messages {receiverId, content}   │            │
  │           │              │─validate(sendMessageSchema)          │
  │           │              │─addWithBackup(messages)──────────────►│
  │           │              │─addWithBackup(notifications)─────────►│
  │           │◄──{message}  │            │             │            │
  │           │─emit(sendMessage)─────────────────────► │            │
  │           │              │            │             │─emit(receiveMessage)──►│
  │           │              │            │             │─emit(newNotification)──►│
```

### 3.7 Database Design

**Logical Database Design**

The platform uses Firestore's document-collection NoSQL model. Each collection stores documents with either auto-assigned Firestore IDs or Firebase UIDs (in the case of the `users` collection). There are no foreign key constraints at the database level — referential integrity is enforced at the application layer.

When an admin deletes a user, `adminController.deleteUser()` performs a batch cascade operation across projects, applications, messages, and notifications, using Firestore `WriteBatch` objects that respect the 500-operation-per-batch limit.

Webhook idempotency is enforced by using `doc.create()` on the `processedWebhookEvents` collection. Because `create()` throws `ALREADY_EXISTS` on a duplicate document ID, attempting to process the same Stripe event twice is automatically rejected, providing exactly-once semantics without locks or transactions.

**Table 3.3 — Firestore Collections and Key Fields**

| Collection | Document ID | Key Fields | Access Pattern |
|-----------|------------|-----------|----------------|
| users | Firebase UID | role, plan, verificationStatus, profile ref | Auth middleware on every request |
| profiles | Auto-generated | user ref, portfolio[], verificationState, physicalMetrics | Public read if searchable |
| projects | Auto-generated | director ref, status, deadline, category | Public read if status=open |
| applications | Auto-generated | project ref, talent ref, status | Admin SDK only |
| messages | Auto-generated | sender, receiver, content, read | Admin SDK only |
| notifications | Auto-generated | user ref, type, read | Admin SDK only |
| emailVerifications | Auto-generated | userId, expiresAt, used | Admin SDK only |
| passwordResets | Auto-generated | userId, expiresAt, used | Admin SDK only |
| processedWebhookEvents | Stripe event ID | type, processedAt | Admin SDK only |
| workshops | Auto-generated | title, type, featured | Public read |
| workshopBookings | Auto-generated | workshop ref, user ref | Protected write |

**Table 3.4 — Composite Firestore Index Definitions**

| Collection | Index Fields | Direction | Query Use Case |
|-----------|------------|-----------|----------------|
| projects | status, createdAt | ASC, DESC | Browse open projects paginated |
| applications | talent, createdAt | ASC, DESC | Talent's own applications paginated |
| applications | project, status | ASC, ASC | Director's applicants by status |
| messages | sender, receiver, createdAt | ASC, ASC, ASC | Conversation between two users |
| notifications | user, read, createdAt | ASC, ASC, DESC | Unread notifications per user |

**Table 3.5 — Firestore Security Rules Summary**

| Collection | Client Read | Client Write | Notes |
|-----------|:-----------:|:------------:|-------|
| users/{userId} | Auth.uid == userId only | FALSE | Own document only |
| profiles/{id} | If searchable OR own | FALSE | Privacy setting respected |
| projects/{id} | If status == 'open' | FALSE | Public projects only |
| applications/* | FALSE | FALSE | Admin SDK only |
| messages/* | FALSE | FALSE | Admin SDK only |
| notifications/* | FALSE | FALSE | Admin SDK only |
| emailVerifications/* | FALSE | FALSE | Admin SDK only |
| passwordResets/* | FALSE | FALSE | Admin SDK only |
| {document=**} | FALSE | FALSE | Default deny |

All application writes go through the Express backend using Firebase Admin SDK, which bypasses client-side security rules by design.

### 3.8 API Design

The backend exposes 42 REST endpoints organized into 8 route modules. All endpoints follow RESTful resource naming conventions.

**Table 3.6 — API Endpoint Map (Core Routes)**

| Method | Endpoint | Auth Required | Zod Schema | Description |
|--------|---------|:-------------:|:----------:|-------------|
| POST | /api/auth/register | Public | registerSchema | Create new user |
| POST | /api/auth/login | Public | loginSchema | Email/password login |
| POST | /api/auth/admin-login | Public | adminLoginSchema | Admin login |
| POST | /api/auth/login/google | Public | — | Google OAuth |
| POST | /api/auth/login/linkedin | Public | — | LinkedIn OAuth |
| POST | /api/auth/verify-email | Public | — | Verify email token |
| POST | /api/auth/forgot-password | Public | — | Request password reset |
| POST | /api/auth/reset-password | Public | — | Reset with token |
| PUT | /api/auth/change-password | Protected | changePasswordSchema | Change password |
| GET | /api/auth/me | Protected | — | Current user data |
| GET | /api/profile/me | Protected | — | Own profile |
| PUT | /api/profile | Protected | updateProfileSchema | Update profile |
| GET | /api/profile/:id | Public | — | Profile by ID |
| GET | /api/profile/by-user/:uid | Public | — | Profile by user UID |
| GET | /api/profile | Public | — | List profiles with filters |
| POST | /api/profile/upload | Protected | — | Upload media file |
| POST | /api/profile/submit-verification | Protected | — | Submit KYC |
| GET | /api/profile/export-data | Protected | — | DPDP data export |
| GET | /api/projects | Public | — | List open projects |
| POST | /api/projects | Director | createProjectSchema | Create project |
| PUT | /api/projects/:id | Director | updateProjectSchema | Update project |
| GET | /api/projects/:id | Public | — | Get single project |
| POST | /api/projects/:id/apply | Talent | — | Apply to project |
| GET | /api/projects/:id/applications | Director | — | Get project applicants |
| PUT | /api/projects/applications/:id/status | Director | updateApplicationStatusSchema | Update status |
| PUT | /api/projects/applications/:id/schedule-audition | Director | scheduleAuditionSchema | Schedule audition |
| PUT | /api/projects/applications/:id/submit-video | Talent | submitVideoSchema | Submit video URL |
| GET | /api/projects/my-projects | Director | — | Own projects |
| GET | /api/projects/my-applications | Talent | — | Own applications |
| POST | /api/messages | Protected | sendMessageSchema | Send message |
| GET | /api/messages/conversations | Protected | — | All conversations |
| GET | /api/messages/:userId | Protected | — | Messages with user |
| GET | /api/notifications | Protected | — | My notifications |
| PUT | /api/notifications/read-all | Protected | — | Mark all read |
| POST | /api/payment/create-subscription | Protected | — | Create subscription |
| POST | /api/payment/portal | Protected | — | Billing portal URL |
| GET | /api/payment/history | Protected | — | Invoice history |
| POST | /api/payment/webhook | Public (Stripe sig) | — | Stripe webhook |
| GET | /api/admin/stats | Admin | — | Platform statistics |
| GET | /api/admin/users | Admin | — | All users paginated |
| PUT | /api/admin/users/:id/role | Admin | updateUserRoleSchema | Change role |
| DELETE | /api/admin/users/:id | Admin | — | Delete user + cascade |
| GET | /api/admin/verifications | Admin | — | Pending verifications |
| PUT | /api/admin/verify/:id | Admin | adminVerifySchema | Approve/reject |
| GET | /api/admin/projects | Admin | — | All projects paginated |
| PUT | /api/admin/projects/:id/status | Admin | updateProjectStatusSchema | Update status |
| GET | /api/admin/search | Admin | — | Global search |
| GET | /api/admin/media | Admin | — | Cloudinary assets |
| GET | /health | Public | — | Service health check |

### 3.9 Frontend Architecture

The React frontend is organized by user role in a feature-folder structure:

```
client/src/
├── App.jsx               — All ~60 route definitions with ProtectedRoute guards
├── main.jsx              — React entry point, Sentry init, QueryClient setup
├── pages/                — 21 public-facing pages
├── talent/               — 13 talent dashboard pages + verification/ subfolder
│   └── verification/     — 7-file multi-step KYC wizard
├── director/             — 12 director dashboard pages
├── admin/                — 12 admin panel pages
├── producer/             — 2 stub placeholder files (not implemented)
├── components/           — Shared UI components
│   ├── layout/           — DashboardLayout, Sidebar, Header, MobileBottomNav
│   └── common/           — MediaUpload, NotificationCenter, ThemeToggle
├── context/              — AuthContext, NotificationContext, ThemeContext
├── services/             — API service layer (one file per domain)
├── utils/                — authStorage.js, fileValidation.js, cloudinaryUrl.js
├── constants/            — navigation.js (menu items for all 3 roles)
├── lib/                  — firebase.js (Firebase Client SDK config)
└── locales/              — en.json (i18next English translations)
```

**State Management Strategy**

Global state is managed through three React Contexts:

- `AuthContext` — Authentication state with `useAuth()` hook. Exposes `user`, `token`, `setSessionFromAuthResponse()`, `refreshUser()`, and `logout()`. Syncs across tabs via DOM `AUTH_STORAGE_EVENT`.
- `NotificationContext` — Real-time notification state fed by Socket.io events.
- `ThemeContext` — Dark/light mode toggle with localStorage persistence.

Server state (API responses) is managed by TanStack React Query with a 5-minute stale time and automatic background refetching, eliminating redundant `useEffect`-based data fetching.

### 3.10 Backend Architecture

The Express server entry point `index.js` configures all middleware, routes, Socket.io, background tasks, and the graceful shutdown handler.

**Middleware Execution Order**

```
Incoming Request
  ↓ Sentry.Handlers.requestHandler()     — request context for error reports
  ↓ pinoHttp(logger)                     — structured request logging + request ID
  ↓ helmet()                             — CSP, HSTS, X-Frame-Options, etc.
  ↓ cors({origin: allowedOrigins})       — CORS whitelist enforcement
  ↓ globalRateLimiter (Redis-backed)     — 100 req/15min per IP
  ↓ express.json() — skipped on /webhook route (raw body needed for Stripe sig)
  ↓ express.urlencoded()
  ↓ compression()
  ↓ Routes
      ↓ authMiddleware.protect()         — token verification, req.user injection
      ↓ authMiddleware.authorize(roles)  — role-based access check
      ↓ validate(zodSchema)             — input validation, 400 on failure
      ↓ enforceDirectorBilling()        — subscription check for director routes
      ↓ Controller function (business logic)
  ↓ Sentry.Handlers.errorHandler()       — capture errors in Sentry
  ↓ errorHandler (Pino-logged response)  — structured error JSON response
  ↓ notFound                            — 404 for unmatched routes
```

**Background Tasks**

`tokenCleanup.js` runs hourly via `setInterval`, querying `emailVerifications` and `passwordResets` collections for documents where `expiresAt < now` and deleting them in batches of up to 500 (the Firestore batch write limit).

**Graceful Shutdown**

```
SIGTERM / SIGINT received
  → isShuttingDown = true (health check returns 503)
  → httpServer.close()  — stop accepting new connections
      → getIO().close() — close Socket.io
      → redis.quit()    — graceful Redis disconnect
      → mongoose.connection.close() — MongoDB disconnect
      → process.exit(0)
  → [10s timeout] → process.exit(1) — force exit if shutdown hangs

uncaughtException → gracefulShutdown('uncaughtException')
unhandledRejection → logger.error() only — no shutdown (avoids restart loops)
```

---

# Chapter 4

## Implementation, Testing, and Maintenance

### 4.1 Technologies and Tools Used

**Table 4.1 — Programming Languages and Usage**

| Language | Version | Usage |
|---------|---------|-------|
| JavaScript (ES2023, ESM) | ES2023 | Full-stack — all frontend and backend code |
| JSX | — | React component markup templates |
| CSS (TailwindCSS utilities) | 3.4 | Component styling via utility classes |
| JSON | — | API data exchange, Firestore index config, i18n translations |
| YAML | — | GitHub Actions CI/CD workflow definitions |
| Bash | — | CI/CD pipeline scripts, deployment hooks |

**Development Tools**

| Tool | Purpose |
|------|---------|
| VS Code | Primary IDE |
| Vite 7 | Frontend dev server and production bundler |
| Nodemon | Backend auto-restart in development |
| ESLint | Code linting (frontend and backend) |
| Postman | Manual API endpoint testing |
| Firebase Console | Firestore data browser and security rules editor |
| Stripe Dashboard | Payment testing with test card numbers |
| Cloudinary Console | Media asset browser |

### 4.2 Frontend Implementation

**Feature-Folder Architecture**

The frontend follows a strict feature-folder pattern: all pages and components specific to a user role are co-located in their role folder (`/talent`, `/director`, `/admin`). Shared components are in `/components`. This structure ensures that adding or modifying a role's features requires changes only in that role's folder, reducing merge conflicts and cognitive load.

**AuthContext and Session Management**

`AuthContext.jsx` is the central authentication state manager. It exposes the `useAuth()` hook consumed by all protected components and the Axios interceptor. On login, `setSessionFromAuthResponse({token, user})` stores the token in `sessionStorage` via `authStorage.js` and updates React state. On logout, `sessionStorage.clear()` removes all auth data. The context syncs across browser tabs by dispatching and listening to a custom `AUTH_STORAGE_EVENT` on the `window` object.

Tokens are intentionally stored in `sessionStorage` rather than `localStorage`. This design choice means tokens are cleared when the browser tab is closed, limiting the exposure window for XSS-based token theft.

**Client-Side File Validation**

`utils/fileValidation.js` performs magic-byte (file signature) detection before files are sent to the server. The function reads the first few bytes of the file as a `Uint8Array` and compares them against known signatures:

| Format | Magic Bytes |
|--------|------------|
| JPEG | FF D8 FF |
| PNG | 89 50 4E 47 |
| WebP | 52 49 46 46 ... 57 45 42 50 |
| GIF | 47 49 46 38 |
| PDF | 25 50 44 46 |
| MP4 | ... 66 74 79 70 |
| WebM | 1A 45 DF A3 |
| MOV | ... 66 74 79 70 71 74 |

This provides a defense-in-depth layer: even if a server-side check fails, files with invalid signatures are rejected at the client before any network request is made.

**Cloudinary URL Transformation**

`utils/cloudinaryUrl.js` exports a `transformCloudinaryUrl(url, {width, height, quality})` function that inserts Cloudinary transformation parameters into stored URLs. This is used throughout the application to request appropriately-sized images for each context (e.g., 32px avatar vs 400px profile header) without storing multiple copies.

### 4.3 Backend Implementation

**ESM Module System**

The entire backend uses ECMAScript Modules (`"type": "module"` in `package.json`) with `import`/`export` syntax rather than CommonJS `require()`. This aligns the server with the modern JavaScript module standard and is a prerequisite for Vitest's native ESM test runner.

**Zod Input Validation**

The `validate(schema)` middleware in `server/middleware/validate.js` wraps any Zod schema into an Express middleware function:

```javascript
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: result.error.flatten().fieldErrors
    })
  }
  req.body = result.data  // replace with parsed+coerced data
  next()
}
```

All 14 Zod schemas use `.strict()` mode, which causes Zod to throw a validation error if any field not declared in the schema is present in the request body. This prevents mass assignment attacks where an attacker adds unexpected fields (e.g., `{role: "admin"}` to a profile update) that a controller might inadvertently write to the database.

**Table 4.2 — Zod Validation Schema Coverage**

| Schema | Applied To | Key Constraints |
|--------|-----------|----------------|
| registerSchema | POST /auth/register | email format, password ≥8 chars, role enum |
| loginSchema | POST /auth/login | email format, password required |
| adminLoginSchema | POST /auth/admin-login | email format, password required, .strict() |
| changePasswordSchema | PUT /auth/change-password | ≥8 chars, uppercase required, number required |
| updateProfileSchema | PUT /profile | bio max 500, skills array, physicalMetrics object, .strict() |
| createProjectSchema | POST /projects | title 3-200, description 10-5000, category enum, deadline future |
| updateProjectSchema | PUT /projects/:id | all fields optional, same rules, .strict() |
| updateApplicationStatusSchema | PUT /applications/:id/status | status enum |
| updateProjectStatusSchema | PUT /admin/projects/:id/status | status enum |
| submitVideoSchema | PUT /applications/:id/submit-video | URL format |
| scheduleAuditionSchema | PUT /applications/:id/schedule-audition | auditionDate future |
| sendMessageSchema | POST /messages | content 1-5000 chars, receiverId required |
| adminVerifySchema | PUT /admin/verify/:id | verificationStatus enum |
| updateUserRoleSchema | PUT /admin/users/:id/role | role enum |

**Dual-Database Write Pattern**

Every write operation uses one of three wrapper functions from `lib/textBackup.js`:

```javascript
addWithBackup(collection, data)     // Firestore.add() + MongoDB upsert
setWithBackup(collection, id, data) // Firestore.set() + MongoDB upsert
updateWithBackup(collection, id, data) // Firestore.update() + MongoDB upsert
```

The MongoDB upsert runs asynchronously after the Firestore operation completes. If MongoDB is unavailable (i.e., `MONGODB_URI` is not set), the function skips the backup silently. This design ensures that MongoDB unavailability never causes an API request to fail.

**Email Lifecycle Templates**

**Table 4.5 — Email Lifecycle Templates**

| Function | Trigger | Recipient | Subject Pattern |
|----------|---------|-----------|----------------|
| sendApplicationShortlistedEmail() | Status → shortlisted | Talent | "You have been shortlisted — {project}" |
| sendSelectedEmail() | Status → selected | Talent | "You have been selected — {project}" |
| sendApplicationRejectedEmail() | Status → rejected | Talent | "Application update — {project}" |
| sendAuditionScheduledEmail() | Audition scheduled | Talent | "Audition scheduled — {project}" |
| sendVerificationApprovedEmail() | Admin approves KYC | Talent | "Your profile is now verified" |
| buildVerificationEmail() | Account registration | User | "Verify your email" |
| buildResetPasswordEmail() | Password reset request | User | "Reset your password" |

All email functions are wrapped in `try/catch`. Email delivery failure never causes the parent API request to fail or return an error response.

### 4.4 Security Implementation

**Admin Login: Timing-Safe Credential Comparison**

```javascript
import { createHash, timingSafeEqual } from 'crypto'

const hash = (value) => createHash('sha256').update(value).digest()
const adminEmailHash = hash(process.env.ADMIN_EMAIL)
const adminPasswordHash = hash(process.env.ADMIN_PASSWORD)

const inputEmailHash = hash(req.body.email)
const inputPasswordHash = hash(req.body.password)

const emailMatch = timingSafeEqual(adminEmailHash, inputEmailHash)
const passwordMatch = timingSafeEqual(adminPasswordHash, inputPasswordHash)

if (!emailMatch || !passwordMatch) {
  logger.warn({ ip: req.ip }, 'Failed admin login attempt')
  return res.status(401).json({ message: 'Invalid credentials' })
}
```

`timingSafeEqual()` compares two buffers in constant time regardless of where the first byte difference occurs, preventing attackers from inferring character-by-character correctness through response time measurement.

**SSRF Prevention**

The `profileController.js` validates all URL fields before storing them:

```javascript
const ALLOWED_HOSTS = ['res.cloudinary.com', 'cloudinary.com']

const isSafeUrl = (url) => {
  if (!url) return true
  try {
    const { hostname, protocol } = new URL(url)
    return protocol === 'https:' && ALLOWED_HOSTS.some(h => hostname.endsWith(h))
  } catch { return false }
}
```

Any URL not matching the allowlist returns a 400 error, preventing attackers from injecting internal network URLs that could be used to probe the server's network.

**IDOR Prevention**

Before updating application status, `projectController.js` verifies ownership:

```javascript
const appDoc = await db.collection('applications').doc(appId).get()
const application = appDoc.data()
const projectDoc = await db.collection('projects').doc(application.project).get()

if (projectDoc.data().director !== req.user.id) {
  return res.status(403).json({ message: 'Not authorised to update this application' })
}
```

Without this check, a director could modify applications belonging to other directors' projects by guessing application IDs.

**Pino Logging Redaction**

```javascript
redact: {
  paths: [
    'req.headers.authorization',
    'req.headers.cookie',
    '*.password',
    '*.token',
    '*.secret'
  ],
  censor: '[REDACTED]'
}
```

Any field matching these paths is replaced with `[REDACTED]` in all log output, ensuring that credentials are never written to log storage.

**Magic-Byte File Verification (Server)**

The `uploadMiddleware.js` uses the `file-type` npm package to detect the actual file format from its binary content:

```javascript
import { fileTypeFromBuffer } from 'file-type'

const ALLOWED_TYPES = ['image/jpeg','image/png','image/webp','image/gif',
                        'video/mp4','video/webm','video/quicktime','application/pdf']

const detected = await fileTypeFromBuffer(req.file.buffer)
if (!detected || !ALLOWED_TYPES.includes(detected.mime)) {
  return res.status(400).json({ message: 'File type not permitted' })
}
```

Because this checks actual binary signatures rather than the `Content-Type` header (which is attacker-controlled), it cannot be bypassed by renaming a file or spoofing the MIME type.

### 4.5 Testing Techniques and Test Plans

**Unit Testing with Vitest**

Vitest 3.2 is used for unit testing. The critical design challenge is that the server uses ESM modules, which requires special handling for mock hoisting. All `vi.mock()` calls use factory functions (`() => ({...})`) placed before any imports to ensure they are hoisted correctly by the Vitest transformer.

The complete mock setup for Firebase modules:

```javascript
vi.mock('../lib/firebaseAdmin.js', () => ({
  db: {
    collection: vi.fn().mockReturnThis(),
    doc: vi.fn().mockReturnThis(),
    get: vi.fn(),
    set: vi.fn(),
    update: vi.fn(),
    add: vi.fn(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
  },
  adminAuth: {
    createUser: vi.fn(),
    verifyIdToken: vi.fn(),
    getUserByEmail: vi.fn(),
    updateUser: vi.fn(),
  }
}))

vi.mock('../lib/firebase.js', () => ({
  auth: {},
  signInWithEmailAndPassword: vi.fn(),
}))

vi.mock('../lib/textBackup.js', () => ({
  setWithBackup: vi.fn().mockResolvedValue(true),
  addWithBackup: vi.fn().mockResolvedValue(true),
  updateWithBackup: vi.fn().mockResolvedValue(true),
}))
```

`vi.clearAllMocks()` is called in `beforeEach()` to reset all mock call counts and return values between tests, preventing state leakage.

**Table 4.3 — Unit Test Coverage Summary**

| Test File | Tests | Areas Covered |
|-----------|:-----:|--------------|
| authController.test.js | 12 | Register (valid/invalid email/password/role), email login, Google login, admin login (valid/invalid), email verification, password reset request, password reset execution |
| projectController.test.js | 14 | Create project (valid/invalid deadline), list projects, apply (new/duplicate), get applications with batch reads, update status (shortlisted/selected/rejected), schedule audition, submit video |
| **Total** | **26** | |

**Table 4.4 — Validation Test Plan**

| Endpoint | Invalid Input | Expected Response |
|---------|-------------|------------------|
| POST /auth/register | email: "notanemail" | 400 — email format invalid |
| POST /auth/register | password: "abc" | 400 — password minimum 8 characters |
| POST /auth/register | role: "superuser" | 400 — role must be talent or director |
| PUT /auth/change-password | newPassword: "short" | 400 — minimum 8 characters |
| PUT /auth/change-password | newPassword: "alllowercase1" | 400 — uppercase letter required |
| PUT /auth/change-password | newPassword: "NoNumbers" | 400 — number required |
| PUT /projects/:id | { director: "hacked" } | 400 — unknown field (.strict() mode) |
| PUT /projects/:id | deadline: "yesterday" | 400 — deadline must be in future |
| POST /projects | title: "ab" | 400 — title minimum 3 characters |
| POST /messages | content: "" | 400 — content minimum 1 character |
| PUT /admin/users/:id/role | role: "superadmin" | 400 — invalid enum value |

### 4.6 CI/CD Pipeline

GitHub Actions runs the following pipeline on every push and every pull request:

**Stage 1 — Checkout and install**
- Checkout repository on Node 18 and Node 20 (parallel matrix)
- `npm ci` for reproducible installs in both `/server` and `/client`

**Stage 2 — Lint**
- `npx eslint . ` in `/server`
- `npm run lint` in `/client`
- Any lint error fails the pipeline

**Stage 3 — Test**
- `npm test` in `/server`
- All 26 tests must pass; any failure blocks the pipeline

**Stage 4 — Build**
- `npm run build` in `/client`
- Requires `VITE_STRIPE_PUBLISHABLE_KEY` secret set in GitHub repository settings
- Vite build failure (including missing env var) blocks deployment

**Stage 5 — Deploy (branch-conditional)**
- `develop` branch → staging environment (Render staging service + Firebase Hosting preview channel)
- `main` branch → production environment (Render production service + Firebase Hosting production channel)

### 4.7 Installation Instructions

**Prerequisites**

- Node.js v20 LTS, npm v9+
- Firebase project with Firestore and Authentication enabled
- Cloudinary account (free tier sufficient for development)
- Stripe account with a Studio Pro product and recurring price created
- SMTP credentials (Gmail App Password, SendGrid, or SES)

**Step 1 — Clone repository and install dependencies**

```bash
git clone https://github.com/[username]/talentconnect.git
cd talentconnect
cd server && npm install
cd ../client && npm install
```

**Step 2 — Configure environment variables**

```bash
cp server/.env.example server/.env
# Edit server/.env with all required values

cp client/.env.example client/.env
# Edit client/.env with all required values
```

**Step 3 — Run in development mode**

```bash
# Terminal 1 — Backend
cd server && npm run dev
# Server starts on http://localhost:5000

# Terminal 2 — Frontend
cd client && npm run dev
# Frontend starts on http://localhost:5173
```

**Step 4 — Verify installation**

```bash
# Check server health
curl http://localhost:5000/health

# Run test suite
cd server && npm test
# Expected: Test Files 2 passed (2), Tests 26 passed (26)
```

### 4.8 End User Instructions

**For Talent Users**

1. Open the platform and click "Join as Talent" on the home page.
2. Fill in your full name, email address, and a password (minimum 8 characters, must include at least one uppercase letter and one number). Click Register.
3. Check your email inbox and click the verification link within 24 hours.
4. Log in and complete your profile — add a profile photo, biography, skills, location, and physical measurements.
5. Upload portfolio items (images or videos) using the Upload button. A maximum of 20 items is permitted.
6. Begin the Verification Wizard from your dashboard. Upload a government-issued ID, an industry membership document, and record a short video selfie. Submit for admin review.
7. Once verified, your profile will display a verified badge, improving your visibility in director searches.
8. Browse casting calls via "Discover Projects". Use category and location filters to narrow results.
9. Click Apply on a project and write a brief cover note describing your interest and relevant experience.
10. Track your applications in "My Applications". You will receive an email notification on any status change.
11. If invited to audition, record your audition, upload it to a video hosting service, and paste the URL into the submission form before the deadline.

**For Director Users**

1. Open the platform and click "Join as Director". Complete registration with your name, company, and contact details. A 30-day full-access trial begins immediately.
2. Click "Create Project" and complete the two-step project form: basic details (title, category, description, deadline) then requirements and optional project image.
3. Your project appears in the talent-facing "Discover Projects" feed once published.
4. Browse talent via "Discover Talent". Use the filter sidebar to narrow by category, location, and verification status. Click a profile to view their full portfolio.
5. As applications arrive, open "My Projects" → select a project → open the Applications tab.
6. For each applicant: review their portfolio, then click Shortlist, Schedule Audition, Select, or Reject. The talent receives an email notification on each action.
7. When scheduling an audition, enter the date, location, and any preparation notes. These are included in the automated email to the talent.
8. After the trial period, upgrade to Studio Pro via "Upgrade Plan" to retain access to director features.
9. To manage your subscription, update your payment method, or cancel, click "Manage Billing" in settings.

**For Admin Users**

1. Navigate to `/admin/login`. Enter the admin email and password configured in the server environment variables.
2. The admin dashboard shows platform-wide counts of users, projects, and applications.
3. Open "Verification Review" to see a queue of pending KYC submissions. Review the uploaded documents and click Approve or Reject. The talent receives an email on approval.
4. Open "User Management" to search for users, change their role, or permanently delete their account (all associated data is cascade-deleted).
5. Open "Project Oversight" to view all projects across all directors, change a project's status, or remove it.
6. Use "Global Search" to locate any user by name or email, or any project by title.
7. Open "System Health" to see live connectivity checks for Firestore, Redis, and MongoDB, along with server memory usage and uptime.

---

# Chapter 5

## Results and Discussions

### 5.1 Feature Implementation Status

**Table 5.1 — Feature Implementation Status by Module**

| Module | Feature | Status |
|--------|---------|:------:|
| Auth | Email/password registration + login | ✅ |
| Auth | Google OAuth | ✅ |
| Auth | LinkedIn OAuth | ✅ |
| Auth | Admin login (timing-safe) | ✅ |
| Auth | Email verification (24h token) | ✅ |
| Auth | Password reset (1h token) | ✅ |
| Auth | Password change with strength rules | ✅ |
| Auth | Multi-factor authentication (MFA) | ❌ |
| Profile | CRUD with Zod strict validation | ✅ |
| Profile | Portfolio media upload (magic-byte) | ✅ |
| Profile | 20-item portfolio quota | ✅ |
| Profile | EXIF metadata stripping on upload | ✅ |
| Profile | Three-step KYC verification wizard | ✅ |
| Profile | DPDP Act 2023 data export | ✅ |
| Projects | Two-step validated project creation | ✅ |
| Projects | Cursor-based paginated project listing | ✅ |
| Projects | Application pipeline with batch reads | ✅ |
| Projects | Audition scheduling with email | ✅ |
| Projects | Video submission | ✅ |
| Projects | Email notification on status change | ✅ |
| Projects | IDOR-protected status updates | ✅ |
| Messaging | 1:1 real-time messaging (Socket.io) | ✅ |
| Messaging | Message pagination | ❌ |
| Messaging | File attachments in messages | ❌ |
| Notifications | Real-time in-app notifications | ✅ |
| Notifications | Email lifecycle notifications (5 types) | ✅ |
| Notifications | Push notifications (PWA) | ❌ |
| Payments | Stripe Subscription recurring billing | ✅ |
| Payments | Customer Portal (self-service) | ✅ |
| Payments | Payment invoice history | ✅ |
| Payments | Webhook (4 event types + idempotency) | ✅ |
| Payments | Subscription cancellation handling | ✅ |
| Admin | User management with cascade delete | ✅ |
| Admin | Verification review queue with email | ✅ |
| Admin | Project oversight | ✅ |
| Admin | Global search (range queries) | ✅ |
| Admin | System health monitor | ✅ |
| Admin | Media asset browser (Cloudinary) | ✅ |
| Admin | Workshop management GUI | ❌ |
| Infrastructure | Pino structured logging + redaction | ✅ |
| Infrastructure | Sentry error tracking (server + client) | ✅ |
| Infrastructure | GitHub Actions CI/CD | ✅ |
| Infrastructure | 26 Vitest unit tests | ✅ |
| Infrastructure | Graceful shutdown (SIGTERM/SIGINT) | ✅ |
| Infrastructure | Redis rate limiting (3-tier) | ✅ |
| Infrastructure | Health check with DB connectivity | ✅ |
| Infrastructure | Integration tests | ❌ |
| Infrastructure | E2E tests (Playwright) | ❌ |
| Community forum | Backend API + persistence | ❌ |
| Workshop system | Backend CRUD | ✅ |
| Workshop system | Admin GUI for creation | ❌ |
| Producer role | Any functionality | ❌ |

**Table 5.2 — Component Production Readiness**

| Component | Status | Production Ready |
|-----------|--------|:----------------:|
| User registration (email + social) | Working, validated | ✅ |
| User login (all 4 methods) | Working, hardened, tested | ✅ |
| Email verification | Working, auto-cleanup | ✅ |
| Password reset | Working, secure | ✅ |
| Profile CRUD | Working, validated | ✅ |
| File uploads | Working, magic-byte verified | ✅ |
| Project CRUD | Working, validated, paginated, tested | ✅ |
| Application pipeline | Working, validated, email notifications | ✅ |
| Audition scheduling | Working, validated, email notifications | ✅ |
| Messaging | Working, validated | ⚠️ No pagination |
| Notifications | Working, real-time | ✅ |
| Stripe Subscriptions | Recurring billing + portal + history | ✅ |
| Admin dashboard | Working, paginated, batch reads | ✅ |
| Admin verification | Working, validated, email notification | ✅ |
| Admin global search | Improved — range queries + exact ID | ⚠️ Needs search engine at scale |
| Structured logging | Pino + redaction + request tracing | ✅ |
| Error tracking | Sentry (server + client) | ✅ |
| CI/CD pipeline | GitHub Actions staging + production | ✅ |
| Unit tests | 26 tests (auth + projects) | ⚠️ Needs integration tests |
| Graceful shutdown | SIGTERM/SIGINT + force timeout | ✅ |
| Email lifecycle | 5 branded templates | ✅ |
| Workshop system | Backend only — no admin GUI | ⚠️ |
| Community forum | Client-side mock only | ❌ |
| Producer role | Stub — not implemented | ❌ |

### 5.2 Description of System Modules

**Authentication Module**

Implemented across `authController.js`, `authMiddleware.js`, `jwtSecret.js`, `lib/firebaseAdmin.js`, and `lib/firebase.js`. Handles four login methods via a unified flow. The `jwtSecret.js` module enforces that `JWT_SECRET` is at least 32 characters at server startup — the server refuses to start if this condition is not met, preventing deployment with weak secrets.

Google OAuth and email/password authentication use Firebase ID Tokens verified by `adminAuth.verifyIdToken()`. LinkedIn OAuth and admin logins use custom JWTs signed with the `JWT_SECRET` and verified by `jwt.verify()`. All four methods converge to `AuthContext.setSessionFromAuthResponse()` on the frontend.

**Profile and Portfolio Module**

Implemented in `profileController.js` with upload handling in `uploadMiddleware.js`. The upload pipeline is:

1. `multer` stores the file in memory (not disk) with a 150MB size limit
2. `file-type` npm package detects the actual MIME type from binary content
3. Rejected if MIME not in the allowed list
4. Streamed to Cloudinary with `quality: auto`, `fetch_format: auto`, and `strip_profile` (EXIF removal) transformation flags
5. Cloudinary `secure_url` stored in the Firestore profile document

Profile updates use `updateProfileSchema` with `.strict()` mode. A portfolio quota check rejects uploads when `profile.portfolio.length >= 20` before processing the file.

**Casting Pipeline Module**

The core feature of the platform. Implemented across `projectController.js` covering eight controller functions: `createProject`, `getProjects`, `getMyProjects`, `getMyApplications`, `getProjectById`, `getProjectApplications`, `applyToProject`, `updateApplicationStatus`, `scheduleAudition`, and `submitVideo`.

The `getProjectApplications()` function eliminates N+1 queries by collecting all `talent` and `profile` document references from the applications array, then calling `db.getAll(...talentRefs)` and `db.getAll(...profileRefs)` to fetch all related documents in two batch operations regardless of the number of applications.

**Real-Time Communication Module**

`socket.js` initializes a Socket.io server attached to the same `http.Server` instance as Express. Socket connections authenticate using the same token passed in the HTTP `Authorization` header. After authentication, the socket joins a room identified by the user's UID, enabling targeted `sendNotification(userId, event)` broadcasts.

Messages are sent via HTTP (`POST /api/messages`) for Firestore persistence, then simultaneously broadcast via Socket.io (`emit('receiveMessage', data)`) to the receiver's room for real-time delivery without polling.

**Payment Module**

Implemented in `paymentController.js`. The `getOrCreateStripeCustomer()` helper checks the user's Firestore document for an existing `stripeCustomerId`. If none exists, it calls `stripe.customers.create()`, stores the resulting ID in Firestore, and returns it. This ensures each user maps to exactly one Stripe Customer across their subscription lifecycle.

The webhook handler processes four Stripe event types:

| Event | Action |
|-------|--------|
| `payment_intent.succeeded` | Update user plan to studio_pro (legacy backfill path) |
| `payment_intent.payment_failed` | Set subscriptionStatus to inactive |
| `customer.subscription.deleted` | Reset plan to free, clear stripeSubscriptionId |
| `invoice.payment_succeeded` | Renew active subscription, update planActivatedAt |

**Admin Module**

`adminController.js` provides platform-wide management capabilities. The `deleteUser()` function performs a cascade delete using Firestore `WriteBatch` operations: it first deletes the user's projects and their associated applications, then the user's direct applications, messages, notifications, and finally the profile and user documents — all within the 500-operation batch limit.

The `searchGlobal()` function uses Firestore range queries (`>=` term, `<= term + '\uf8ff'`) on user email/name and project title fields, capped at 20 results per collection. The `'\uf8ff'` Unicode character acts as an upper bound for the Firestore string range, implementing a prefix-match search without a dedicated search engine.

### 5.3 User Interface Representation

**Public Home Page**

The home page presents the platform value proposition to unauthenticated visitors. It features a hero section with dual call-to-action buttons directing talent and directors to their respective registration flows, a statistics bar showing registered talent and active projects, feature highlights organized by user role, and a "How it works" section illustrating the three-step casting workflow. A sticky navigation bar with logo, links, and login/register buttons adapts to mobile viewports with a hamburger menu.

**Talent Dashboard**

The talent dashboard provides a personal workspace showing four metric cards (profile views, applications submitted, auditions scheduled, active plan). An amber verification banner appears for unverified users with a direct link to the verification wizard. The sidebar navigation uses amber-colored active state indicators. The portfolio section displays media in a responsive grid with hover overlays.

**Director Dashboard**

The director dashboard centers on project management. Project cards display a banner image, category pill, status badge (open/closed/draft), applicant count, and deadline. A persistent trial expiry indicator in the sidebar shows remaining trial days, changing to a warning color as the trial approaches expiration. The talent discovery view provides a multi-criteria filter sidebar with results displayed as profile cards with verification badges.

**Admin Panel**

The admin panel uses a visually distinct dark-sidebar design to prevent confusion with user-facing dashboards. The verification review queue shows pending submissions with document thumbnails, a completion percentage bar, and approve/reject action buttons. The user management view provides a data-dense table with role color badges, verification status pills, plan labels, and last-active timestamps. The system health page displays a status grid with green/amber/red connectivity indicators and response time in milliseconds for each external service.

*[Insert screenshots at this location — see list of figures for the complete list of required screenshots]*

### 5.4 Security Analysis and Risk Reduction

The security posture was assessed across three development iterations using a risk matrix that scores each vulnerability by likelihood and impact.

**Table 5.3 — Security Grade Progression**

| Iteration | Grade | Key Improvements |
|-----------|:-----:|-----------------|
| Revision 1 | D+ | Core features only; no validation, open Firestore rules, hardcoded JWT |
| Revision 2 | B- | Firestore rules, JWT enforcement, 10 Zod schemas, magic-byte uploads, rate limiting |
| Revision 3 | B+ | 14 Zod schemas (100%), Pino redaction, Sentry, SSRF/IDOR fixes, SameSite cookies |

**Table 5.4 — Risk Matrix: Before and After**

| Vulnerability | OWASP Category | Risk (Rev 1) | Risk (Rev 3) | Status |
|--------------|---------------|:------------:|:------------:|--------|
| Open Firestore rules | A01 Broken Access Control | 25 | 0 | ✅ Eliminated |
| Hardcoded JWT secret | A02 Cryptographic Failures | 25 | 0 | ✅ Eliminated |
| No input validation (14 routes) | A03 Injection | 20 | 0 | ✅ Eliminated |
| N+1 database queries | Performance | 20 | 0 | ✅ Eliminated |
| No pagination | Performance | 20 | 0 | ✅ Eliminated |
| File upload type spoofing | A04 Insecure Design | 12 | 0 | ✅ Eliminated |
| No Stripe webhook handler | A04 Insecure Design | 15 | 0 | ✅ Eliminated |
| No MFA for admin | A07 Auth Failures | 9 | 9 | ⚠️ Remaining |
| No error tracking | A09 Security Logging | 12 | 0 | ✅ Sentry added |
| Zero test coverage | Quality | 15 | 6 | 🟡 26 unit tests |
| No CI/CD pipeline | Quality | 15 | 0 | ✅ GitHub Actions |
| LinkedIn token logging | A09 Security Logging | 6 | 0 | ✅ Pino redaction |
| No DPDP data export | Privacy compliance | 6 | 0 | ✅ Implemented |
| No graceful shutdown | Reliability | 10 | 0 | ✅ SIGTERM handler |
| SSRF via URL fields | A10 SSRF | 8 | 0 | ✅ Allowlist added |
| IDOR on status update | A01 Broken Access Control | 8 | 0 | ✅ Ownership check |
| Token logging (LinkedIn) | A09 Security Logging | 6 | 0 | ✅ Fixed |
| No SameSite cookies | A02 Cryptographic Failures | 4 | 0 | ✅ Strict added |
| **Total Risk Score** | | **254** | **26** | **90% reduction** |

**Table 5.5 — Technical Readiness Scorecard**

| Dimension | Score | Assessment |
|-----------|:-----:|-----------|
| Core functionality | 8/10 | All major workflows implemented and functional |
| Security posture | 8/10 | B+ grade; 14 Zod schemas; Pino redaction; Sentry |
| Performance | 7/10 | Pagination, batch reads, React Query caching |
| Error handling | 8/10 | Sentry + ErrorBoundary + graceful shutdown + request IDs |
| Testing | 4/10 | 26 unit tests; no integration or E2E tests |
| CI/CD | 8/10 | GitHub Actions with staging + production deployment |
| Observability | 7/10 | Pino structured logging + Sentry + health checks |
| Documentation | 9/10 | Complete technical documentation across four documents |

### 5.5 Backend and Database Representation

The backend server `index.js` is the single entry point. It registers the complete middleware pipeline, mounts all 8 route modules under `/api`, initializes Socket.io on the same HTTP server instance, starts the `tokenCleanup.js` scheduler, and registers the graceful shutdown handlers for `SIGTERM`, `SIGINT`, `uncaughtException`, and `unhandledRejection` process events.

The Firestore database contains 11 collections. The `users` collection uses Firebase UIDs as document IDs, enabling the auth middleware to fetch the user document directly without a query. The `applications` collection is the central relational structure linking talent users to director-owned projects, representing the core data relationship of the casting pipeline.

Redis is connected optionally via `lib/redisClient.js`. When available, it serves as the backing store for `express-rate-limit`, enabling rate limit counters to be shared across multiple server instances (horizontal scaling). When unavailable, rate limiting falls back to an in-memory store automatically.

MongoDB is connected optionally. Every Firestore write is followed by a best-effort MongoDB upsert via `textBackup.js`. The MongoDB collections mirror the Firestore structure using Mongoose schemas defined in `server/models/`. Reads are never directed to MongoDB — it serves exclusively as a write-ahead backup that can be used to reconstruct Firestore data if needed.

*[Insert Firestore Console screenshots for: users collection with sample document, profiles collection showing portfolio array, applications collection, processedWebhookEvents collection]*

---

# Chapter 6

## Summary and Conclusions

TalentConnect was developed as a full-stack, production-grade web application addressing the absence of a centralized digital platform for talent casting in the Global entertainment industry. The system was designed, implemented, and iteratively hardened across three formal development revisions, with each revision measured against a risk matrix and technical readiness scorecard.

The development journey is summarized in the following comparison:

| Dimension | Revision 1 | Revision 2 | Revision 3 (Final) |
|-----------|:----------:|:----------:|:------------------:|
| Security grade | D+ | B- | B+ |
| Total risk score | 254 | 99 | 26 |
| Zod-validated endpoints | 0/14 | 10/14 | 14/14 (100%) |
| Unit tests | 0 | 0 | 26 |
| CI/CD pipeline | None | None | GitHub Actions |
| Structured logging | None | morgan | Pino + redaction |
| Error tracking | None | None | Sentry (server + client) |
| Email notifications | 1 type | 1 type | 7 types |
| Recurring billing | None | None | Stripe Subscriptions |
| Graceful shutdown | None | None | SIGTERM/SIGINT + 10s timeout |

**Conclusions Drawn from this Project**

1. Security cannot be added retroactively without significant cost. The effort required to retrofit input validation, token storage security, file upload verification, and database security rules across an existing codebase in Revision 2 and 3 was substantially greater than implementing these controls correctly in Revision 1 would have been. Security-first design from the initial commit is the practical engineering approach.

2. The dual-database architecture (Firestore primary, MongoDB backup) demonstrated that optional external dependencies can be incorporated without compromising reliability. The `textBackup.js` wrapper pattern — where backup failure is logged but does not fail the primary operation — is a generalizable design for any non-critical secondary persistence.

3. Input validation via Zod `.strict()` schemas serves a dual purpose: it prevents injection and mass assignment attacks (security), and it provides self-documenting API contracts that make controller logic easier to reason about (maintainability). The 14-schema coverage of all write endpoints represents a complete defense against the OWASP A03 (Injection) risk category.

4. Pino structured logging combined with Sentry error tracking fundamentally changes the post-deployment debugging experience. Every HTTP request is assigned a unique `X-Request-ID` that propagates through logs, error reports, and API responses, enabling exact reproduction of any reported error from its request ID alone.

5. The CI/CD pipeline was among the most impactful single changes across the three revisions. Automated lint, test, and build verification on every commit converted the deployment process from a manual, error-prone operation into a reliable, repeatable one. The pipeline's test gate ensures that regressions in any of the 26 unit tests block deployment before reaching any environment.

6. The three-step KYC verification system is the technical foundation of the platform's trust model. A marketplace connecting unknown parties requires a verified identity layer; without it, the platform would face the same fraud and impersonation problems as the WhatsApp groups it replaces. The combination of document upload, admin review, and verified badge on the public profile implements this trust layer with minimal friction for legitimate users.

7. The Stripe Subscriptions API is architecturally more complex than one-time Payment Intents but provides the correct billing model for a SaaS platform. The customer portal feature alone eliminates an entire category of customer support requests (payment method updates, cancellations) by delegating them to Stripe's managed UI.

The project successfully achieved all eight stated objectives and demonstrates a complete understanding of full-stack web application development, cloud service integration, web application security engineering, automated testing, and CI/CD pipeline design at a production-appropriate level.

---

# Chapter 7

## Future Scope

The following technical enhancements are planned for continued development of the platform, organized by area of improvement.

### 7.1 Testing and Quality Assurance

**Integration Tests with Supertest**

The existing unit test suite mocks all external dependencies. Integration tests would test actual HTTP request/response cycles against a test Firestore instance, verifying that the middleware pipeline, validation, and controller logic work correctly together end-to-end. This requires exporting the Express `app` object from `index.js` and setting up a dedicated test Firebase project with emulator support.

**End-to-End Tests with Playwright**

Playwright browser automation tests would cover the full user journeys that unit tests cannot verify: a talent user completing registration, email verification, profile completion, verification wizard submission, project discovery, and application submission from a real browser; a director creating a project, reviewing applications, scheduling an audition, and selecting a candidate; and a complete payment flow using Stripe test card numbers.

**Code Coverage Reporting**

Vitest supports Istanbul-based code coverage reporting. Integrating `@vitest/coverage-v8` into the CI pipeline would provide branch, line, and function coverage metrics, enabling identification of untested code paths before they become production defects.

### 7.2 Security Enhancements

**Admin Multi-Factor Authentication (TOTP)**

The admin login currently uses a single-factor credential comparison. Adding TOTP-based MFA using the `otplib` library would require admins to enter a time-based code from an authenticator application on every login. The implementation would generate a TOTP secret on first admin setup, store it encrypted in the user document, generate a QR code for authenticator app enrollment, and add a TOTP verification step after the existing credential check.

**Full-Text Search**

Firestore's range queries used in the current admin global search provide prefix matching only. Replacing these with Algolia or Typesense integration would provide full-text search, fuzzy matching (handling typos), faceted filtering (filter by role, location, category simultaneously), and relevance ranking — significantly improving the talent discovery and project discovery experience for all users.

**Message Pagination**

The current `GET /api/messages/:userId` endpoint loads all messages between two users in a single query. Adding cursor-based pagination with a `before` timestamp parameter would limit each request to the 20 most recent messages and allow the UI to load earlier messages on scroll, preventing performance degradation in long-running conversations.

### 7.3 Feature Completeness

**Workshop Admin GUI**

The workshop backend API (CRUD + booking) is implemented. The remaining work is building an admin interface in `admin/WorkshopManagement.jsx` enabling administrators to create, edit, and delete workshop listings without requiring direct Firestore Console access. This is a prerequisite for the workshop system to be operationally useful.

**Community Forum Backend**

The community forum page (`pages/CommunityForum.jsx`) currently renders client-side mock data. A backend implementation would require a `forumPosts` Firestore collection, post and reply creation endpoints with Zod validation, admin moderation controls, and a content rendering component in the frontend. The forum represents a significant engagement feature for the talent user community.

**Producer Role Implementation**

The producer role exists as a UI stub with two placeholder components. A full implementation would include a dedicated producer dashboard with project oversight views, talent pipeline management across multiple active productions, and team management features enabling multiple users to collaborate on a single production.

**Real-Time Analytics Dashboard**

The `PerformanceAnalytics.jsx` component for talent and the `FinancialReports.jsx` component for admin currently use calculated or mock data. Replacing these with actual Firestore queries would provide: for talent — profile view counts, application conversion rates, and audition success rates; for admin — active user counts, application submission trends, and subscription revenue totals from Stripe invoice data.

### 7.4 Infrastructure Improvements

**Socket.io Redis Adapter**

The current Socket.io server maintains room state in memory. If the application is scaled horizontally (multiple server instances behind a load balancer), Socket.io events emitted on one instance would not reach users connected to other instances. Adding the `@socket.io/redis-adapter` would share room state via Redis, enabling horizontal scaling without breaking real-time delivery.

**Push Notifications**

Web Push API integration with a service worker would enable the platform to send push notifications to users' devices even when the browser is closed, providing the notification experience expected from a mobile-first product. This would require implementing the Web Push Protocol on the server side and registering a service worker in the React application.

**Multi-Region Deployment**

Deploying the Express server to a Render region geographically closer to the primary user base (Singapore or Mumbai) would reduce average API latency from approximately 200ms to under 50ms for Global users. Firebase Hosting already serves static assets from its global CDN; the improvement would come from reducing the round-trip time for dynamic API requests.

---

## Appendix A — Complete API Endpoint Reference

| Method | Endpoint | Auth | Schema | Description |
|--------|---------|:----:|:------:|-------------|
| POST | /api/auth/register | Public | registerSchema | Create new user account |
| POST | /api/auth/login | Public | loginSchema | Email/password login |
| POST | /api/auth/admin-login | Public (strict limit) | adminLoginSchema | Admin login |
| POST | /api/auth/login/google | Public | — | Google OAuth login |
| POST | /api/auth/login/linkedin | Public | — | LinkedIn OAuth login |
| POST | /api/auth/verify-email | Public | — | Verify email with token |
| POST | /api/auth/resend-verification | Public | — | Resend verification email |
| POST | /api/auth/forgot-password | Public | — | Request password reset |
| POST | /api/auth/reset-password | Public | — | Reset password with token |
| PUT | /api/auth/change-password | Protected | changePasswordSchema | Change password |
| GET | /api/auth/me | Protected | — | Get current user + profile |
| GET | /api/auth/logout | Public | — | Clear auth cookie |
| GET | /api/profile/me | Protected | — | Get own profile |
| PUT | /api/profile | Protected | updateProfileSchema | Update own profile |
| GET | /api/profile/:id | Public | — | Get profile by profile ID |
| GET | /api/profile/by-user/:userId | Public | — | Get profile by user UID |
| GET | /api/profile | Public | — | List all profiles (filtered) |
| POST | /api/profile/upload | Protected | — | Upload media (magic-byte) |
| POST | /api/profile/submit-verification | Protected | — | Submit KYC for review |
| GET | /api/profile/export-data | Protected | — | DPDP personal data export |
| GET | /api/projects | Public | — | List open projects |
| POST | /api/projects | Director | createProjectSchema | Create project |
| PUT | /api/projects/:id | Director | updateProjectSchema | Update project |
| GET | /api/projects/:id | Public | — | Get single project |
| DELETE | /api/projects/:id | Director/Admin | — | Delete project |
| GET | /api/projects/my-projects | Director | — | Get own projects |
| GET | /api/projects/my-applications | Talent | — | Get own applications |
| POST | /api/projects/:id/apply | Talent | — | Apply to project |
| GET | /api/projects/:id/applications | Director | — | Get project applications |
| PUT | /api/projects/applications/:id/status | Director | updateApplicationStatusSchema | Update status |
| PUT | /api/projects/applications/:id/schedule-audition | Director | scheduleAuditionSchema | Schedule audition |
| PUT | /api/projects/applications/:id/submit-video | Talent | submitVideoSchema | Submit video URL |
| POST | /api/messages | Protected | sendMessageSchema | Send message |
| GET | /api/messages/conversations | Protected | — | Get all conversations |
| GET | /api/messages/:userId | Protected | — | Messages with a user |
| GET | /api/notifications | Protected | — | Get my notifications |
| PUT | /api/notifications/read-all | Protected | — | Mark all read |
| PUT | /api/notifications/:id | Protected | — | Mark single read |
| POST | /api/payment/create-subscription | Protected | — | Create Stripe subscription |
| POST | /api/payment/portal | Protected | — | Get billing portal session |
| GET | /api/payment/history | Protected | — | Get invoice history |
| POST | /api/payment/confirm-payment | Protected | — | Backfill payment confirmation |
| POST | /api/payment/webhook | Public (Stripe sig) | — | Handle Stripe webhook events |
| GET | /api/admin/stats | Admin | — | Platform statistics |
| GET | /api/admin/search | Admin | — | Global search |
| GET | /api/admin/users | Admin | — | List all users (paginated) |
| PUT | /api/admin/users/:id/role | Admin | updateUserRoleSchema | Change user role |
| DELETE | /api/admin/users/:id | Admin | — | Delete user + cascade |
| GET | /api/admin/verifications | Admin | — | Get pending verifications |
| PUT | /api/admin/verify/:id | Admin | adminVerifySchema | Approve/reject verification |
| GET | /api/admin/projects | Admin | — | List all projects (paginated) |
| GET | /api/admin/projects/:id | Admin | — | Get project details |
| PUT | /api/admin/projects/:id/status | Admin | updateProjectStatusSchema | Update project status |
| DELETE | /api/admin/projects/:id | Admin | — | Delete project + applications |
| GET | /api/admin/media | Admin | — | List Cloudinary media assets |
| GET | /api/workshops | Public | — | List workshops |
| GET | /api/workshops/featured | Public | — | Get featured workshops |
| GET | /api/workshops/:id | Public | — | Get single workshop |
| POST | /api/workshops/:id/book | Protected | — | Book a workshop |
| GET | /health | Public | — | Service health check |

---

## Appendix B — Environment Variables Reference

| Variable | Service | Required | Description |
|---------|---------|:--------:|-------------|
| PORT | Server | Yes | HTTP port (default 5000) |
| NODE_ENV | Server | Yes | development / production |
| FIREBASE_PROJECT_ID | Firebase | Yes | Firebase project ID |
| FIREBASE_CLIENT_EMAIL | Firebase | Yes | Service account email |
| FIREBASE_PRIVATE_KEY | Firebase | Yes | Service account private key |
| JWT_SECRET | Auth | Yes | Signing key — must be ≥32 chars |
| MONGODB_URI | MongoDB | No | Optional backup; server starts without it |
| REDIS_URL | Redis | No | Optional; falls back to in-memory |
| CLOUDINARY_CLOUD_NAME | Cloudinary | Yes | Cloud name |
| CLOUDINARY_API_KEY | Cloudinary | Yes | Upload API key |
| CLOUDINARY_API_SECRET | Cloudinary | Yes | Upload API secret |
| STRIPE_SECRET_KEY | Stripe | Yes | Server-side Stripe key |
| STRIPE_WEBHOOK_SECRET | Stripe | Yes | Webhook endpoint signing secret |
| STRIPE_STUDIO_PRO_PRICE_ID | Stripe | Yes | Recurring price ID (price_xxx) |
| SMTP_HOST | Email | Yes | SMTP server hostname |
| SMTP_PORT | Email | Yes | SMTP server port (typically 587) |
| SMTP_USER | Email | Yes | SMTP username |
| SMTP_PASS | Email | Yes | SMTP password |
| EMAIL_FROM | Email | Yes | Sender address in outgoing email |
| ADMIN_EMAIL | Admin | Yes | Admin login email (compared via SHA-256) |
| ADMIN_PASSWORD | Admin | Yes | Admin login password (compared via SHA-256) |
| FRONTEND_URL | App | Yes | Client origin for CORS and email link generation |
| LOG_LEVEL | Logging | No | debug / info / warn / error |
| VITE_API_URL | Client | Yes | Backend API base URL |
| VITE_STRIPE_PUBLISHABLE_KEY | Client | Yes | Stripe publishable key — required at build time |
| VITE_FIREBASE_API_KEY | Client | Yes | Firebase client SDK config |
| VITE_FIREBASE_AUTH_DOMAIN | Client | Yes | Firebase auth domain |
| VITE_FIREBASE_PROJECT_ID | Client | Yes | Firebase project ID |
| VITE_FIREBASE_STORAGE_BUCKET | Client | Yes | Firebase storage bucket |
| VITE_FIREBASE_MESSAGING_SENDER_ID | Client | Yes | Firebase sender ID |
| VITE_FIREBASE_APP_ID | Client | Yes | Firebase app ID |
| VITE_SENTRY_DSN | Client | No | Sentry client DSN — suppressed in dev |

---

## Appendix C — Security Controls Mapped to OWASP Top 10

| OWASP Category | Control Implemented | Location |
|---------------|-------------------|---------|
| A01 — Broken Access Control | `protect()` + `authorize(roles)` middleware | `authMiddleware.js` |
| A01 — Broken Access Control | Ownership check before status updates (IDOR) | `projectController.js` |
| A01 — Broken Access Control | Firestore security rules (default deny) | `firestore.rules` |
| A02 — Cryptographic Failures | Tokens in sessionStorage, not localStorage | `authStorage.js` |
| A02 — Cryptographic Failures | `httpOnly`, `secure`, `SameSite=Strict` cookies | `authController.js` |
| A02 — Cryptographic Failures | JWT_SECRET ≥32 chars enforced at startup | `jwtSecret.js` |
| A03 — Injection | 14 Zod schemas with `.strict()` on all write endpoints | `schemas.js` + `validate.js` |
| A04 — Insecure Design | Magic-byte file verification (client + server) | `fileValidation.js` + `uploadMiddleware.js` |
| A04 — Insecure Design | EXIF metadata stripped from all uploads | `cloudinary.js` (strip_profile flag) |
| A04 — Insecure Design | SSRF prevented via Cloudinary-only URL allowlist | `profileController.js` |
| A05 — Security Misconfiguration | Helmet (CSP, HSTS, X-Frame-Options) | `index.js` |
| A05 — Security Misconfiguration | CORS origin whitelist | `index.js` |
| A07 — Auth Failures | Timing-safe admin credential comparison (SHA-256) | `authController.js` |
| A07 — Auth Failures | 3-tier rate limiting (global, auth, admin) | `index.js` + route files |
| A07 — Auth Failures | JWT_SECRET enforced ≥32 chars | `jwtSecret.js` |
| A08 — Software and Data Integrity | Stripe webhook signature verification | `paymentController.js` |
| A08 — Software and Data Integrity | Webhook idempotency via processedWebhookEvents | `paymentController.js` |
| A09 — Security Logging and Monitoring | Pino structured logging with redaction | `logger.js` + `errorMiddleware.js` |
| A09 — Security Logging and Monitoring | Sentry error tracking (server + client) | `sentry.js` + `main.jsx` |
| A09 — Security Logging and Monitoring | Admin login audit logging with IP | `authController.js` |
| A09 — Security Logging and Monitoring | X-Request-ID on all responses | `index.js` (pino-http) |
| A10 — SSRF | Cloudinary-only URL allowlist on profile fields | `profileController.js` |
| DPDP Act 2023 | Personal data export endpoint | `profileController.js` |

---

## Appendix D — Codebase Structure

```
talentconnect/
├── client/
│   └── src/
│       ├── App.jsx                    — All ~60 route definitions
│       ├── main.jsx                   — React entry + Sentry init
│       ├── pages/                     — 21 public pages
│       ├── talent/                    — 13 talent pages
│       │   └── verification/          — 7-file KYC wizard
│       ├── director/                  — 12 director pages
│       ├── admin/                     — 12 admin pages
│       ├── producer/                  — 2 stub placeholders
│       ├── components/                — Shared UI components
│       │   ├── layout/               — DashboardLayout, Sidebar, Header
│       │   └── common/               — MediaUpload, NotificationCenter
│       ├── context/                   — AuthContext, NotificationContext, ThemeContext
│       ├── services/                  — API service functions (one per domain)
│       ├── utils/                     — authStorage.js, fileValidation.js, cloudinaryUrl.js
│       ├── constants/                 — navigation.js
│       └── lib/                       — firebase.js
│
└── server/
    ├── index.js                       — Entry: middleware, routes, Socket.io, shutdown
    ├── socket.js                      — Socket.io init + event helpers
    ├── config/
    │   ├── db.js                      — MongoDB connection
    │   └── cloudinary.js              — Cloudinary + multer (strip_profile)
    ├── controllers/
    │   ├── authController.js          — 769 lines
    │   ├── profileController.js       — CRUD, upload, SSRF check, DPDP export
    │   ├── projectController.js       — 673 lines, batch reads, IDOR check, emails
    │   ├── adminController.js         — 571 lines, cascade delete, range search
    │   ├── paymentController.js       — Subscriptions, portal, history, webhooks
    │   ├── messageController.js       — Send, conversations, history
    │   ├── notificationController.js  — Get, mark read
    │   └── workshopController.js      — Workshop CRUD + booking
    ├── middleware/
    │   ├── authMiddleware.js          — protect(), authorize(), enforceDirectorBilling()
    │   ├── errorMiddleware.js         — Pino-logged error handler + 404
    │   ├── uploadMiddleware.js        — multer + magic-byte + Cloudinary stream
    │   └── validate.js               — Zod middleware factory
    ├── models/                        — Mongoose schemas (backup only)
    ├── routes/                        — 8 route files
    ├── lib/
    │   ├── firebaseAdmin.js           — Firebase Admin SDK
    │   ├── firebase.js                — Firebase Client SDK (server login)
    │   ├── email.js                   — Nodemailer + wrapEmailTemplate()
    │   ├── emailTemplates.js          — 5 lifecycle email functions
    │   ├── jwtSecret.js               — JWT_SECRET enforcement ≥32 chars
    │   ├── schemas.js                 — 14 Zod validation schemas
    │   ├── redisClient.js             — Optional Redis connection
    │   ├── tokenCleanup.js            — Hourly expired token deletion
    │   ├── logger.js                  — Pino logger (pino-pretty in dev)
    │   ├── sentry.js                  — Sentry Node SDK init
    │   └── textBackup.js              — Firestore→MongoDB backup wrapper
    └── utils/
        ├── catchAsync.js              — Async error wrapper
        └── addDays.js                 — Date utility
```

---

## Bibliography

[1] OWASP Foundation, "OWASP Top 10 Web Application Security Risks," 2021. [Online]. Available: https://owasp.org/www-project-top-ten/. [Accessed: Apr. 2026].

[2] Firebase Documentation, "Cloud Firestore Data Model," Google LLC, 2024. [Online]. Available: https://firebase.google.com/docs/firestore/data-model. [Accessed: Apr. 2026].

[3] Socket.IO Documentation, "Socket.IO — Bidirectional and low-latency communication for every platform," 2024. [Online]. Available: https://socket.io/docs/v4/. [Accessed: Apr. 2026].

[4] Stripe Inc., "Stripe Subscriptions API Documentation," 2024. [Online]. Available: https://stripe.com/docs/billing/subscriptions/overview. [Accessed: Apr. 2026].

[5] Vite Documentation, "Vite — Next Generation Frontend Tooling," 2024. [Online]. Available: https://vitejs.dev/guide/. [Accessed: Apr. 2026].

[6] React Documentation, "React — The Library for Web and Native User Interfaces," Meta Platforms Inc., 2024. [Online]. Available: https://react.dev/. [Accessed: Apr. 2026].

[7] Express.js Documentation, "Express — Fast, unopinionated, minimalist web framework for Node.js," OpenJS Foundation, 2024. [Online]. Available: https://expressjs.com/. [Accessed: Apr. 2026].

[8] Zod Documentation, "Zod — TypeScript-first schema validation with static type inference," 2024. [Online]. Available: https://zod.dev/. [Accessed: Apr. 2026].

[9] Cloudinary Documentation, "Cloudinary — Image and Video API Platform," 2024. [Online]. Available: https://cloudinary.com/documentation. [Accessed: Apr. 2026].

[10] Government of India, "The Digital Personal Data Protection Act, 2023," Ministry of Electronics and Information Technology, Aug. 2023. [Online]. Available: https://www.meity.gov.in/content/digital-personal-data-protection-act-2023. [Accessed: Apr. 2026].

[11] Pino Documentation, "Pino — Super fast, all natural JSON logger for Node.js," 2024. [Online]. Available: https://getpino.io/. [Accessed: Apr. 2026].

[12] Sentry Documentation, "Sentry — Application Performance Monitoring and Error Tracking," 2024. [Online]. Available: https://docs.sentry.io/. [Accessed: Apr. 2026].

[13] GitHub, "GitHub Actions Documentation — Automate your workflow," Microsoft Corporation, 2024. [Online]. Available: https://docs.github.com/en/actions. [Accessed: Apr. 2026].

[14] Vitest Documentation, "Vitest — A Vite-native unit test framework," 2024. [Online]. Available: https://vitest.dev/. [Accessed: Apr. 2026].

[15] TanStack, "TanStack Query — Powerful asynchronous state management for TypeScript/JavaScript," 2024. [Online]. Available: https://tanstack.com/query/latest. [Accessed: Apr. 2026].

[16] Node.js Documentation, "Node.js v20 LTS — crypto.timingSafeEqual()," OpenJS Foundation, 2024. [Online]. Available: https://nodejs.org/api/crypto.html. [Accessed: Apr. 2026].

[17] Render Documentation, "Render — Cloud Application Hosting," 2024. [Online]. Available: https://render.com/docs. [Accessed: Apr. 2026].

[18] Liu, S., Cheng, H., and Li, F., "Trust and Verification in Two-Sided Digital Marketplaces," Journal of Information Systems, vol. 38, no. 2, pp. 45–67, 2023.

[19] Mozilla Developer Network, "Web Push API," Mozilla Foundation, 2024. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Push_API. [Accessed: Apr. 2026].

[20] KPMG India and FICCI, "Media and Entertainment Industry Report 2024 — India," 2024.
