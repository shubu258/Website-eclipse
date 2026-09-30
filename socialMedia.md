# The Wire Desk

## Making Social Media Publishing Easier to Plan, Review, and Trust

### Overview

The Wire Desk is a full-stack social media planning and publishing application designed to bring content creation, AI-assisted writing, scheduling, and publishing into a single workflow.

The application supports **LinkedIn, X, and Instagram**, allowing users to create posts manually or with AI assistance, review and edit content, save drafts, schedule posts, and publish them through connected social accounts.

The project was built around a simple product question:

> **How can AI make social media content creation faster without making the publishing workflow harder to understand or trust?**

The solution combines an AI-assisted content workflow with explicit handling of AI failures, usage limits, social-account authentication, scheduling, and external publishing results.

---

# 1. The Problem

Managing social media content across multiple platforms involves more than simply writing a post.

A typical workflow may require a user to:

1. Think of a topic.
2. Write the initial content.
3. Adapt it for a particular platform.
4. Review and edit the content.
5. Save the draft.
6. Decide when it should be published.
7. Connect the appropriate social account.
8. Confirm whether publishing actually succeeded.

When these activities are spread across different tools, maintaining a consistent publishing workflow becomes difficult.

AI can make the writing stage faster, but it introduces another dependency. An AI provider may be unavailable, rate-limited, or inaccessible because the user's usage allowance has been exhausted.

There is also a second reliability problem: **processing a post inside an application is not the same as successfully publishing it to a social platform.**

The Wire Desk was therefore designed around two connected problems:

* **How can content creation and publishing be brought into one clear workflow?**
* **How can the application make AI and external-platform failures visible instead of hiding them behind a generic success state?**

The intended audience is an individual creator or marketer managing recurring social content. This audience is inferred from the implemented workflow rather than formal user research.

---

# 2. Product Goals

The project was designed with the following goals:

* Make it easy to move from an idea to reviewable social-media copy.
* Support both manual writing and AI-assisted drafting.
* Keep drafts, scheduled posts, publishing activity, and connected accounts in one workspace.
* Allow users to choose when content is published.
* Prevent AI credit exhaustion or provider failures from completely blocking the workflow.
* Clearly distinguish application-level publishing from successful external delivery.
* Protect social-account credentials and user data.
* Support multiple social platforms through separate integration services.

These goals shaped both the user experience and the backend architecture.

---

# 3. The User Journey

The product is organized around the lifecycle of a social post:

**Create → Generate → Review → Edit → Save → Schedule → Publish → Track Result**

## Step 1: Sign in and connect accounts

Users can register and log in through JWT-based authentication.

They can then connect their LinkedIn, X, or Instagram accounts using OAuth flows.

Account connections are optional during the drafting stage. They become necessary when the user wants to publish content externally.

For Instagram, the application also checks for a media URL because publishing requires media.

---

## Step 2: Start with an idea

The post composer collects the information required to create content:

* Topic or idea
* Target platform
* Tone
* Audience
* Optional media URL

Users can either write their content manually or request AI-generated alternatives.

The AI workflow generates **three alternatives**, allowing the user to select the version they prefer before editing or publishing.

This was an intentional product decision: AI generates possibilities, while the user remains responsible for reviewing the final content.

---

## Step 3: Review and edit

Instead of automatically publishing generated content, the application presents the generated alternatives to the user.

The user can:

* Compare alternatives.
* Select one.
* Edit the generated content.
* Save it as a draft.
* Publish it immediately.
* Schedule it for later.

This creates a human-review step between AI generation and publishing.

---

## Step 4: Schedule or publish

Users can publish immediately or select a future date and time.

Scheduled posts appear in weekly and list-based schedule views.

The system also supports an **Auto-regenerate before publish** option. When enabled, the backend attempts to generate fresh content immediately before the scheduled publishing time.

If AI generation is unavailable, the system uses fallback content rather than allowing the scheduled workflow to stop completely.

---

## Step 5: Understand what happened

After a publishing operation, the application records information about the result.

A post can contain:

* Application status
* Publishing time
* Whether fallback content was used
* Whether the external platform accepted the post
* Any external publishing error

This distinction is one of the central design decisions of the project.

A post being processed by The Wire Desk does not automatically mean that LinkedIn, X, or Instagram successfully received it.

---

# 4. Designing AI as an Assistant, Not an Autopilot

One of the most important product decisions was to keep the user in control of AI-generated content.

Instead of:

**AI → Automatically publish**

the workflow is:

**Brief → AI generates alternatives → User reviews → User edits → User decides → Publish**

The AI request contains contextual information such as:

* Topic
* Platform
* Tone
* Audience

This gives the model a structured brief rather than sending only a raw topic.

The user then chooses from the generated alternatives and can modify the content before publication.

This approach reduces the risk of treating generated content as automatically approved material.

---

# 5. Handling AI Failure

AI introduces a new failure point into the application.

A generation request can fail because:

* The user has exhausted their AI credits.
* The external AI provider is unavailable.
* The provider returns an error.
* The application cannot complete the provider request.

The project therefore implements a fallback mechanism.

### AI generation flow

```text
User enters topic, platform, tone and audience
                    ↓
              Check credits
                    ↓
          ┌─────────┴─────────┐
          ↓                   ↓
      Available            Exhausted
          ↓                   ↓
   Call Mistral API       Use fallback
          ↓                templates
     ┌────┴────┐              ↓
     ↓         ↓              ↓
 Success     Failure      Mark fallback
     ↓         ↓              ↓
 AI content  Refund       Fallback content
             credit            ↓
     └─────────┬───────────────┘
               ↓
          Show content
               ↓
        User reviews/edits
               ↓
        Save / Schedule /
             Publish
```

If a provider request fails after a credit has been deducted, the application refunds the credit.

If credits are exhausted, the application can generate template-based fallback content without calling the provider.

The post records whether fallback content was used so that the user can distinguish it from AI-generated content.

### Why this matters

The fallback mechanism is not intended to reproduce the quality of the language model.

Its purpose is different:

**prevent an external AI failure from becoming a complete workflow failure.**

---

# 6. Making External Publishing Trustworthy

Another important engineering problem was separating **application state** from **external delivery state**.

Consider the following situation:

A user clicks "Publish."

The application successfully processes the request, but the user's social account is not connected.

If the interface simply says:

> Published successfully

the user receives misleading information.

The Wire Desk therefore stores external delivery information separately.

The publishing service:

1. Identifies the user's connected account.
2. Retrieves the required credentials.
3. Refreshes X tokens when required.
4. Calls the appropriate platform service.
5. Records whether the external request succeeded.
6. Stores an error when delivery fails.

This means the application can show that a publish action was processed while separately indicating whether the social platform actually accepted the post.

---

# 7. Protecting Social Account Credentials

Social-media integrations require sensitive OAuth credentials.

The project therefore separates credentials from normal UI data.

Social access and refresh tokens are encrypted using **AES-256-GCM**.

Additionally:

* API responses do not expose token values.
* User passwords are hashed with bcrypt.
* Protected routes require JWT authentication.
* Post operations are scoped to the authenticated user.

This ensures that frontend clients receive the information they need about connected accounts without receiving the underlying OAuth secrets.

---

# 8. System Architecture

The application follows a client-server architecture.

```text
┌────────────────────────────────────┐
│       Next.js / React / TypeScript │
│                                    │
│ Dashboard                          │
│ Composer                           │
│ Posts                              │
│ Schedule                           │
│ Social Accounts                    │
└──────────────────┬─────────────────┘
                   │
              HTTPS / REST
                   │
                   ▼
┌────────────────────────────────────┐
│          Node.js / Express         │
│                                    │
│ Authentication                     │
│ Controllers                        │
│ Services                           │
│ AI Credit Management               │
│ Publishing                         │
│ Scheduling                         │
└───────────┬──────────┬─────────────┘
            │          │
            ▼          ▼
       MongoDB      Mistral API
            │
            ▼
     Social Platform APIs
     ┌────────┬────────┐
     │LinkedIn│ X      │
     │        │        │
     │        │ Meta / │
     │        │Instagram
     └────────┴────────┘
```

### Technology Stack

| Layer               | Technology                               |
| ------------------- | ---------------------------------------- |
| Frontend            | Next.js, React, TypeScript, Tailwind CSS |
| Backend             | Node.js, Express                         |
| Database            | MongoDB, Mongoose                        |
| AI                  | Mistral API                              |
| Authentication      | JWT                                      |
| Password security   | bcrypt                                   |
| Token encryption    | AES-256-GCM                              |
| Social integrations | LinkedIn, X, Meta APIs                   |

The backend is organized into controllers, services, and models, while the frontend provides the dashboard, composer, post library, scheduling interface, account management, and settings.

---

# 9. Scheduled Publishing

Scheduled publishing is handled by a backend scheduler.

Every **60 seconds**, the scheduler checks MongoDB for posts whose scheduled publication time has arrived.

The process is:

```text
Scheduled Post
      ↓
Scheduler checks every 60 seconds
      ↓
Is publication time reached?
      ↓
     Yes
      ↓
Is auto-regeneration enabled?
      ↓
 ┌────┴────┐
 ↓         ↓
Yes        No
 ↓          ↓
Generate    Continue
fresh copy
 ↓
Fallback if unavailable
      ↓
Publisher Service
      ↓
Social Platform API
      ↓
Record result
```

The scheduler then saves the application status, publishing timestamp, external delivery result, and any reported error.

The current implementation is intentionally simple. It uses a polling mechanism rather than a distributed job queue, which is appropriate for a small deployment but would require additional infrastructure as workload and deployment scale increase.

---

# 10. Multi-Platform Publishing

The application supports:

* LinkedIn
* X
* Instagram

Each integration has its own service layer because platform APIs have different authentication and publishing requirements.

For example:

* X uses OAuth 2.0 with PKCE and refresh tokens.
* LinkedIn and Instagram use OAuth-based connection flows.
* Instagram publishing requires media.
* Platform-specific errors are captured rather than being hidden behind a generic publishing result.

When multiple platforms are selected for a post, the application saves the edited content as a separate post for each selected platform.

The current implementation does **not** independently rewrite the content for each platform. Platform-specific content generation would therefore be a potential future enhancement.

---

# 11. Key Engineering Challenges

## Challenge 1: External AI dependency

The application could not assume that the AI provider would always be available.

### Solution

A combination of credit validation, provider-error handling, credit refunds, and template fallback keeps the content workflow functional.

---

## Challenge 2: Distinguishing publishing from delivery

An internal application action does not guarantee successful delivery to a third-party platform.

### Solution

The post model maintains separate external-delivery information, including success state and error messages.

---

## Challenge 3: Protecting OAuth credentials

Social integrations require sensitive access and refresh tokens.

### Solution

Tokens are encrypted in the database and excluded from account responses sent to the frontend.

---

## Challenge 4: Scheduled publishing

The application needed to publish content without requiring the user to keep the interface open.

### Solution

A backend scheduler periodically checks for due posts and invokes the same publishing services used by immediate publishing.

---

## Challenge 5: Platform-specific requirements

Each social network has different authentication and content requirements.

### Solution

Platform operations are isolated into individual services, allowing the core post workflow to remain relatively independent of platform-specific implementation details.

---

# 12. What Was Delivered

The implemented application provides an end-to-end workflow covering:

* User registration and authentication
* JWT-protected API routes
* User-scoped post management
* AI generation of three content alternatives
* AI credit tracking and monthly refill logic
* Credit refunds after provider failures
* Template-based fallback content
* LinkedIn, X, and Instagram account connections
* OAuth-based authentication
* Encrypted social-account tokens
* Immediate publishing
* Scheduled publishing
* Optional AI regeneration before publishing
* Dashboard and post-management views
* Search and filtering
* Explicit recording of fallback usage
* Explicit recording of external publishing failures

These are implementation outcomes based on the repository. They should not be interpreted as measured improvements in engagement, productivity, or user adoption.

---

# 13. Constraints and Trade-offs

The project also has several deliberate limitations.

### No measured user outcomes

The repository does not contain user research, analytics, or controlled experiments. Therefore, improvements in writing speed, engagement, reach, or publishing consistency cannot be claimed.

### Fallback content is not equivalent to AI content

Template-generated content provides continuity but is less personalized than model-generated content. It is therefore identified as fallback content and requires user review.

### Multi-platform content is not independently adapted

When multiple platforms are selected, the same edited content is used for each platform rather than generating a separate optimized version for each one.

### Scheduler scalability

The 60-second polling approach is straightforward but does not provide the guarantees of a distributed queue. Larger deployments would need stronger concurrency controls, idempotency, retry handling, and job monitoring.

### External API dependency

Successful publishing depends on platform permissions, OAuth scopes, account configuration, API availability, and platform policies.

### Media management

The current application accepts media through a URL rather than providing a complete media-upload and asset-management system.

---

# 14. Evaluation Plan

Because the project does not currently contain user research or product analytics, the next stage would be to evaluate the workflow with actual creators or marketers.

A usability study could ask participants to take a social-media idea through the complete workflow:

**Idea → Draft → Review → Edit → Schedule → Publish**

Potential measures include:

| Product Question                 | Possible Measure                                    |
| -------------------------------- | --------------------------------------------------- |
| Does the workflow reduce effort? | Time from starting a post to saving/scheduling      |
| Are AI drafts useful?            | Percentage of generated content selected and edited |
| Is fallback understandable?      | User understanding of fallback notifications        |
| Is publishing reliable?          | External publishing success/failure rate            |
| Is scheduling usable?            | Time required to find or modify scheduled posts     |
| Are account connections clear?   | OAuth completion and reconnection rates             |

These measurements would provide evidence for product decisions rather than assuming that the implemented features automatically create business impact.

---

# 15. Future Improvements

Based on the current implementation, several areas could be explored:

### 1. Platform-specific AI generation

Generate separate versions of content for LinkedIn, X, and Instagram instead of reusing the same edited copy.

### 2. Media management

Add media uploads, previews, asset storage, and reusable media libraries.

### 3. Reliable background processing

Replace the polling-based scheduler with a durable job queue with retries, idempotency, concurrency control, and monitoring.

### 4. Publishing analytics

Track post performance where platform APIs provide appropriate access.

### 5. Team collaboration

Introduce shared workspaces, approval workflows, and user roles if team-based usage is validated.

### 6. Integration health

Provide clearer notifications for expired tokens, disconnected accounts, missing permissions, and platform integration problems.

---

# 16. Key Takeaways

The Wire Desk demonstrates that building an AI-powered product is not only about connecting an application to a language model.

The more important engineering challenge is designing the workflow around the model's limitations.

Three principles shaped the project:

**AI should assist, not silently approve.**

Users should be able to review and edit generated content before publishing.

**External failures should have a controlled fallback.**

AI provider failures and exhausted credits should not unnecessarily block the rest of the workflow.

**Application state should not be confused with external success.**

A publishing action inside the application should be distinguishable from confirmed delivery to a social platform.

Together, these decisions turn AI generation from an isolated feature into one component of a broader, observable, and fault-aware publishing workflow.

---

# Project References

**Repository README:** Setup, architecture, configuration, API routes, and deployment information.

**Frontend:** `frontend/src/app/` and `frontend/src/lib/`

**Backend:** `backend/src/controller/`, `backend/src/service/`, and `backend/src/model/`