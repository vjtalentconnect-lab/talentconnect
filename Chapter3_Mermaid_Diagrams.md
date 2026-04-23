# Chapter 3 Diagram Conversions (Mermaid format)

Below are the modernized, preview-able Mermaid diagram versions of the text/ASCII diagrams from Chapter 3 of your Minor Project Report. You can view these directly in your Markdown previewer, or copy-paste them back into your main report file.

### 3.1 System Architecture

**High-Level Architecture**
```mermaid
graph TD
    subgraph Presentation["PRESENTATION TIER"]
        React["React 19 SPA (Vite 7) <br/><br/> • AuthContext · NotificationContext · ThemeContext <br/> • Axios Interceptors · Socket.io Client · Stripe.js <br/> • Sentry React · ErrorBoundary · TanStack React Query <br/> • Role folders: /pages · /talent · /director · /admin"]
    end
    
    subgraph Application["APPLICATION TIER"]
        Express["Express 5 (ESM) + Socket.io 4.8 <br/><br/> • Middleware: Sentry → Pino HTTP → Helmet → CORS <br/> → Rate Limiter → Body Parser → Routes → Auth <br/> → Validate(Zod) → Controller → Error Handlers <br/> • 8 Controllers · 8 Route Modules · 14 Zod Schemas"]
    end
    
    subgraph Data["DATA & EXTERNAL SERVICES"]
        direction LR
        Firestore[("Firestore <br/> (Primary DB)")]
        MongoDB[("MongoDB <br/> (Backup DB)")]
        Redis[("Redis <br/> (Rate Limit)")]
        Cloudinary[("Cloudinary <br/> (Media Storage)")]
        Stripe(("Stripe <br/> (Subscriptions <br/> + Webhooks)"))
        FirebaseAuth(("Firebase Auth <br/> (Identity)"))
        SMTP(("SMTP <br/> (Nodemailer)"))
    end

    Presentation -- "HTTPS REST + WSS WebSocket" --> Application
    Application --> Firestore
    Application --> MongoDB
    Application --> Redis
    Application --> Cloudinary
    Application --> Stripe
    Application --> FirebaseAuth
    Application --> SMTP
```

### 3.3 Data Flow Diagrams

**Level 0 DFD — Context Diagram**
```mermaid
graph LR
    T[Talent] --> TC[TALENT CONNECT]
    D[Director] --> TC
    A[Admin] --> TC
    
    TC -->|Casting Calls| T
    TC -->|Applications| D
    TC -->|Notifications| T
    TC -->|Notifications| D
    TC -->|Notifications| A
    TC -->|Email Alerts| T
    TC -->|Email Alerts| D
    TC -->|Email Alerts| A
    
    TC --> FB[Firebase Auth <br> identity]
    TC --> CL[Cloudinary <br> media]
    TC --> ST[Stripe <br> payments]
```

**Level 1 DFD — Authentication and Registration Flow**
```mermaid
flowchart TD
    U[User] --> A1[1.1 Submit form data]
    A1 --> A2[1.2 Validate input: Zod registerSchema]
    A2 -- FAIL --> A3[1.3 Return 400 with field errors]
    A2 -- PASS --> A4[1.4 Firebase Admin createUser]
    A4 --> A5[1.5 Create Firestore user document]
    A5 --> A6[1.6 Create Firestore profile document]
    A6 --> A7[1.7 Send verification email]
    A7 --> A8[1.8 Auto-login -> obtain Firebase idToken]
    A8 --> A9[1.9 Return token, user to frontend]
    A9 --> A10[1.10 AuthContext.setSessionFromAuthResponse]
    A10 --> A11[1.11 sessionStorage.setItem]
    A11 --> A12[1.12 Navigate to role-specific dashboard]
```

**Level 1 DFD — Casting Pipeline Flow**
```mermaid
flowchart TD
    D[Director] --> D1[2.1 Submit project form]
    D1 --> D2[2.2 Validate createProjectSchema]
    D2 --> D3[2.3 addWithBackup projects, data]
    D3 --> D4[2.4 Socket.io broadcastProjectCreated]
    
    T[Talent] --> T1[2.5 GET /projects paginated]
    T1 --> T2[2.6 POST /projects/:id/apply]
    T2 --> T3{2.7 Check for duplicate application}
    T3 -- Duplicate --> T4[Return 400 Already applied]
    T3 -- New --> T5[2.8 addWithBackup applications: applied]
    T5 --> T6[2.9 Create notification for director]
    T6 --> T7[2.10 Socket.io sendNotification]
    
    D --> D5[2.11 GET /projects/:id/applications]
    D5 --> D6[2.12 getAll talentRefs]
    D6 --> D7[2.13 getAll profileRefs]
    D7 --> D8[2.14 PUT /applications/:id/status]
    D8 --> D9[2.15 Verify IDOR check]
    D9 --> D10[2.16 updateWithBackup]
    D10 --> D11[2.17 Fetch talent email and name]
    D11 --> D12[2.18 Send lifecycle email]
    D12 --> D13[2.19 Socket.io sendNotification]
```

**Level 1 DFD — Payment Flow**
```mermaid
flowchart TD
    D[Director] --> P1[3.1 POST /payment/create-subscription]
    P1 --> P2[3.2 getOrCreateStripeCustomer]
    P2 --> P3[3.3 Check active subscription]
    P3 --> P4[3.4 stripe.subscriptions.create]
    P4 --> P5[3.5 Return clientSecret, subscriptionId]
    P5 --> P6[3.6 Frontend: stripe.confirmCardPayment]
    
    S[Stripe] --> S1[3.7 POST /payment/webhook]
    S1 --> S2[3.8 stripe.webhooks.constructEvent]
    S2 --> S3[3.9 Check processedWebhookEvents]
    S3 --> S4[3.10 doc.create eventId]
    S4 --> S5[3.11 Update user plan: studio_pro]
```

### 3.4 Activity Diagrams

**Activity Diagram — Talent Registration and Verification**
```mermaid
stateDiagram-v2
    [*] --> Start
    Start --> FillForm: User fills registration form
    FillForm --> Validate: System validates input via Zod
    Validate --> FillForm: FAIL - Show errors
    Validate --> CreateAuth: PASS
    CreateAuth --> CreateUser: Firebase Admin createUser
    CreateUser --> CreateProfile: Create Firestore user doc
    CreateProfile --> SendEmail: Create Firestore profile doc
    SendEmail --> AutoLogin: Send verification link
    AutoLogin --> Dashboard: Auto-login
    Dashboard --> VerifyWiz: User starts Verification Wizard
    
    state VerifyWiz {
        Step1: Upload Government ID
        Step2: Upload Industry Membership Card
        Step3: Upload Video Selfie
        Step1 --> Step2
        Step2 --> Step3
    }
    
    VerifyWiz --> Submit: User clicks Submit for Review
    Submit --> AdminReview: Admin sees submission
    AdminReview --> Approved: Approve
    AdminReview --> Rejected: Reject
    
    Approved --> [*]
    Rejected --> VerifyWiz
```

**Activity Diagram — Director Project Creation and Application Pipeline**
```mermaid
stateDiagram-v2
    [*] --> Step1
    Step1 --> Step2: Fill Create Project Step 1
    Step2 --> Validate: Fill Create Project Step 2
    Validate --> Step1: FAIL - Show field errors
    Validate --> ProjectSaved: PASS
    ProjectSaved --> TalentDiscovers: Project saved to Firestore
    TalentDiscovers --> TalentApplies: Talent discovers project
    TalentApplies --> CheckDup: Talent applies
    CheckDup --> RejectedDup: Duplicate
    CheckDup --> SavedApp: New
    
    SavedApp --> DirReviews: Director opens Project Details
    DirReviews --> DirChangesStatus: Reviews applications
    
    DirChangesStatus --> Shortlisted: 'shortlisted'
    DirChangesStatus --> Auditioning: 'auditioning'
    DirChangesStatus --> Selected: 'selected'
    DirChangesStatus --> Rejected: 'rejected'
```

### 3.5 Entity Relationship Diagram
```mermaid
erDiagram
    USERS ||--|| PROFILES : has
    USERS ||--o{ PROJECTS : creates
    USERS ||--o{ APPLICATIONS : submits
    PROJECTS ||--o{ APPLICATIONS : receives
    USERS ||--o{ MESSAGES : sends
    USERS ||--o{ MESSAGES : receives
    USERS ||--o{ NOTIFICATIONS : receives
    USERS ||--o{ WORKSHOP_BOOKINGS : makes
    WORKSHOPS ||--o{ WORKSHOP_BOOKINGS : receives
    
    USERS {
        string id PK
        string email UK
        string role
        boolean isVerified
        string verificationStatus
        string plan
    }
    
    PROFILES {
        string id PK
        string user FK
        string fullName
        string bio
        string talentCategory
    }
    
    PROJECTS {
        string id PK
        string director FK
        string title
        string category
        string status
    }
    
    APPLICATIONS {
        string id PK
        string project FK
        string talent FK
        string status
    }
    
    MESSAGES {
        string id PK
        string sender FK
        string receiver FK
        string content
    }
```

### 3.6 Sequence Diagrams

**Sequence Diagram — User Registration**
```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant FirebaseAuth as Firebase Auth
    participant Firestore
    participant SMTP as SMTP Email
    
    User->>Frontend: Fill Form
    Frontend->>Backend: POST /auth/register
    Backend->>Backend: validate(registerSchema)
    Backend->>FirebaseAuth: adminAuth.createUser()
    FirebaseAuth-->>Backend: userRecord(uid)
    Backend->>Firestore: setWithBackup(users, uid)
    Backend->>Firestore: addWithBackup(profiles, data)
    Backend->>SMTP: sendVerificationEmail()
    Backend->>FirebaseAuth: signInWithEmailAndPassword()
    FirebaseAuth-->>Backend: idToken
    Backend-->>Frontend: {token, user}
    Frontend->>Frontend: AuthContext.setSession()
    Frontend-->>User: Navigate to Dashboard
```

**Sequence Diagram — Stripe Subscription Payment**
```mermaid
sequenceDiagram
    actor Director
    participant Frontend
    participant Backend
    participant Stripe
    participant Firestore
    
    Director->>Frontend: Upgrade
    Frontend->>Backend: POST /payment/create-subscription
    Backend->>Firestore: getOrCreateStripeCustomer()
    Firestore-->>Backend: stripeCustomerId
    Backend->>Stripe: Check active subscriptions
    Backend->>Stripe: subscriptions.create()
    Stripe-->>Backend: {clientSecret, subscriptionId}
    Backend-->>Frontend: clientSecret
    Frontend->>Stripe: confirmCardPayment()
    Stripe-->>Frontend: paymentResult
    
    Note over Stripe, Backend: Async Webhook
    Stripe->>Backend: POST /payment/webhook (payment_intent.succeeded)
    Backend->>Backend: constructEvent() verify sig
    Backend->>Firestore: Check processedWebhookEvents
    Backend->>Firestore: doc.create(eventId)
    Backend->>Firestore: update user plan='studio_pro'
```

**Sequence Diagram — Real-Time Messaging**
```mermaid
sequenceDiagram
    actor Sender
    participant Frontend
    participant Backend
    participant Firestore
    participant SocketIO as Socket.io
    actor Receiver
    
    Sender->>Frontend: Send Message
    Frontend->>Backend: POST /messages {receiverId, content}
    Backend->>Backend: validate(sendMessageSchema)
    Backend->>Firestore: addWithBackup(messages)
    Backend->>Firestore: addWithBackup(notifications)
    Backend-->>Frontend: {message}
    Frontend->>SocketIO: emit(sendMessage)
    SocketIO->>Receiver: emit(receiveMessage)
    SocketIO->>Receiver: emit(newNotification)
```
