# 🔐 Next.js Auth Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **modern and robust authentication and authorization starter** template for Next.js 14+ applications built with the App Router. This starter provides a solid foundation using industry-standard tools like **NextAuth.js (v5)**, **Prisma**, and **PostgreSQL**.

It comes pre-configured with essential features like email/password login, OAuth (Google, GitHub), email verification, password reset, and basic role-based access control (RBAC), allowing you to kickstart your project quickly with secure authentication.

---

## ✨ Key Features

*   ✅ **Credential Authentication:** Secure login using email and password (`actions/login.ts`, `actions/register.ts`).
    *   Password hashing using `bcryptjs`.
    *   Input validation using `zod` (`schema/index.ts`).
*   🔐 **OAuth Integration:** Easily log in or sign up using popular providers:
    *   Google (`auth.config.ts`)
    *   GitHub (`auth.config.ts`)
    *   *Easily extendable to add more providers.*
*   📧 **Email Verification:** Ensures users own their email address upon registration with credentials (`actions/register.ts`, `actions/new-verification.ts`, `lib/mail.ts`).
    *   Verification links sent via email.
    *   Prevents login until email is verified (`auth.ts` signIn callback).
*   🔁 **Password Reset:** Secure flow for users to reset forgotten passwords via email (`actions/reset.ts`, `actions/new-password.ts`, `lib/mail.ts`).
*   🔑 **Token-Based Sessions:** Uses JSON Web Tokens (JWT) for session management (`auth.ts`), the recommended strategy for NextAuth.js v5.
*   👮‍♂️ **Role-Based Access Control (RBAC):**
    *   Pre-defined `USER` (default) and `ADMIN` roles (`prisma/schema.prisma`).
    *   Role included in the session JWT (`auth.ts` jwt/session callbacks).
    *   Example of checking `session.user.role` for access control.
*   🔒 **Protected Routes:** Middleware-based protection for application routes (`middleware.ts`, `routes.ts`).
    *   Defines `publicRoutes`, `authRoutes`, and protected routes.
    *   Redirects unauthenticated users from protected routes to login.
    *   Redirects authenticated users from auth routes (like `/login`) to a default page (`/user`).
*   🧪 **Session-Aware Redirect Logic:** Built-in logic in middleware and forms for seamless user experience based on auth state.
*   🛠️ **Database & ORM:** Uses **PostgreSQL** with **Prisma** for type-safe database access (`prisma/schema.prisma`, `lib/db.ts`, `data/*`).
*   💅 **Modern UI:** Clean UI components built with **Tailwind CSS** and **ShadCN/UI** (`components/ui`, `components/auth`). Includes reusable form components and feedback messages.
*   🧱 **Modular Codebase:** Well-organized project structure separating concerns (API routes, server actions, UI components, lib utilities, data access).
*   📧 **Transactional Emails:** Uses **Resend** for sending verification and password reset emails (`lib/mail.ts`).

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
*   **Authentication:** [NextAuth.js (Auth.js) v5](https://authjs.dev/)
*   **Database ORM:** [Prisma](https://www.prisma.io/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [ShadCN/UI](https://ui.shadcn.com/)
*   **Schema Validation:** [Zod](https://zod.dev/)
*   **Transactional Emails:** [Resend](https://resend.com/)
*   **Icons:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
*   **Password Hashing:** [bcryptjs](https://www.npmjs.com/package/bcryptjs)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
*   A running [PostgreSQL](https://www.postgresql.org/download/) database instance.
*   [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Bhavesh2k4/Next_Auth_Template.git
cd Next_Auth_Template
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Generate Auth Secret
This creates a .env.local file
```bash
npx auth secret 
```

### 4. Setup .env file
```bash
# PostgreSQL Database Connection URL
# cloud options - neondb / supabase are my go to
# Example: postgresql://<user>:<password>@<host>:<port>/<database_name>
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Application Base URL (used for email links, OAuth callbacks etc.)
# Use http://localhost:3000 for local development
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# OAuth Providers (Optional - leave blank if not using)
# Get credentials from Google Cloud Console and GitHub Developer Settings
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Resend Email API Key (REQUIRED for email verification/password reset)
# Get your key from https://resend.com/
RESEND_API_KEY=""

# Email address Resend is configured to send from (Optional, but good practice)
# RESEND_FROM_EMAIL="onboarding@resend.dev" # Or your verified domain email
```

Important:
AUTH_SECRET is mandatory for NextAuth.js v5 to encrypt JWTs and session cookies.
DATABASE_URL must point to your running PostgreSQL instance.
RESEND_API_KEY is required for email features to work.
OAuth credentials are only needed if you want to enable Google/GitHub login.

### 5. Initialize the Database
Make sure your PostgreSQL server is running and the database specified in DATABASE_URL exists. Then, run the Prisma migrations:
```bash
npx prisma generate
npx prisma db push
```
This command will:
- Create the database if it doesn't exist (depending on your setup).
- Apply the SQL generated from your prisma/schema.prisma file to set up the User, Account, VerificationToken, and PasswordResetToken tables.
- Generate the Prisma Client library.

### 6. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
The application should now be running at http://localhost:3000.

## 🧪 Usage & Testing
Once the application is running:
1. Register: Navigate to http://localhost:3000/register. Create an account using your email and a password.
2. Email Verification: Check your email inbox for a verification link (make sure Resend is configured correctly). Click the link to verify your email address. You'll be redirected to the login page upon successful verification.
3. Login (Credentials): Go to http://localhost:3000/login and log in with the credentials you just created.
4. Login (OAuth): If you configured Google or GitHub OAuth credentials in your .env file, you can use the respective buttons on the login/register pages. The first time you use OAuth with an email, it will link the account. Email verification is automatically handled for OAuth providers.
5. Protected Route: After logging in, you should be redirected to http://localhost:3000/user. This page displays your session information and is protected; accessing it directly without being logged in will redirect you to /login.
6. Logout: Click the "Sign Out" button on the /user page.
7. Password Reset: Go to http://localhost:3000/reset-password. Enter the email address you registered with. Check your email for a password reset link, click it, and enter a new password on the /new-password page.

## 🗂️ Project Structure
```
.
├── actions/                 # Server Actions (login, register, reset, verify logic)
├── app/                     # Next.js App Router Directory
│   ├── (auth)/              # Route group for authentication pages (login, register, etc.)
│   │   ├── error/           # Auth error page
│   │   ├── login/
│   │   ├── new-password/
│   │   ├── new-verification/
│   │   ├── register/
│   │   └── reset-password/
│   ├── (protected)/         # Route group for pages requiring authentication
│   │   └── user/            # Example protected user page
│   ├── api/auth/            # NextAuth.js API route handler catch-all
│   │   └── [...nextauth]/route.ts
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (public)
│   └── globals.css          # Global styles (Tailwind)
├── components/              # React components
│   ├── auth/                # Authentication-specific components (forms, wrappers, buttons)
│   └── ui/                  # Generic UI components (ShadCN/UI - Button, Card, Input, etc.)
├── data/                    # Database query functions (getUserByEmail, getToken, etc.)
├── lib/                     # Utility functions and libraries
│   ├── db.ts                # Prisma client instance
│   ├── mail.ts              # Email sending logic (Resend)
│   ├── tokens.ts            # Token generation logic (verification, password reset)
│   └── utils.ts             # General utility functions (e.g., cn for classnames)
├── prisma/                  # Prisma configuration
│   └── schema.prisma        # Prisma database schema definition
├── public/                  # Static assets (e.g., images, fonts)
├── routes.ts                # Definitions for public, auth, and API routes used by middleware
├── schema/                  # Zod schema definitions for form validation
│   └── index.ts
├── .env.example             # Example environment variables file
├── auth.config.ts           # NextAuth.js configuration (providers)
├── auth.ts                  # NextAuth.js initialization, callbacks, adapter setup
├── middleware.ts            # Next.js middleware for route protection
├── next-auth.d.ts           # TypeScript definitions for NextAuth session/user extensions
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── tailwind.config.ts       # Tailwind CSS configuration
```

## 🔐 Core Concepts Explained

### Authentication Flow
Handled primarily by **NextAuth.js**.

- **auth.config.ts**:  
  Defines authentication providers (Credentials, Google, GitHub).  
  The `authorize` function in Credentials handles email/password validation against the database using `bcryptjs` comparison.

- **auth.ts**:  
  Initializes NextAuth.js with the Prisma adapter, JWT session strategy, custom callbacks (like adding user id and role to the session token), event handlers (like setting `emailVerified` on OAuth link), and page overrides (like a custom `/login` page).

- **actions/*.ts**:  
  Server Actions contain logic for:
  - Handling form submissions (register, login, password reset)
  - Interacting with the database (`data/*`)
  - Generating tokens (`lib/tokens.ts`)
  - Sending emails (`lib/mail.ts`)

---

### Middleware & Routing (`middleware.ts`)
- Intercepts requests and checks the user's authentication status using `req.auth` (from NextAuth.js middleware).
- Uses route definitions from `routes.ts` (`publicRoutes`, `authRoutes`, `apiAuthPrefix`) to determine access rules.
- Redirects users based on their auth state and the route they are trying to access (e.g., unauthenticated users to `/login` for protected routes).

---

### Role-Based Access Control (RBAC)
- Defined in `prisma/schema.prisma` with the `UserRole` enum (`USER`, `ADMIN`).
- The user's role is:
  - Fetched from the database
  - Added to the JWT in the `auth.ts` JWT callback
  - Added to the `session.user` object in the session callback
- Use `session.user.role` in components, pages, or middleware to implement role-specific logic  
  *(e.g., show an admin dashboard link only if `session.user.role === 'ADMIN'`)*.

---

### Email Handling (`lib/mail.ts`)
- Uses the **Resend SDK** to send HTML emails.
- Functions:
  - `sendVerificationEmail`
  - `sendResetPasswordEmail`  
  These construct and send emails with unique, expiring tokens.
- Requires `RESEND_API_KEY` and `NEXT_PUBLIC_BASE_URL` environment variables.

---

### Database (`lib/db.ts`, `data/*`, `prisma/*`)
- **Prisma** handles database migrations and provides a type-safe client.
- `data/*` files contain reusable functions for common database queries (fetching users, tokens).

---

### UI & Forms (`components/*`, `schema/index.ts`)
- Uses **ShadCN/UI** components built on **Tailwind CSS**.
- Forms:
  - Built using `react-hook-form`
  - Validated with `zod` (`schema/index.ts`)
- Reusable components like:
  - `CardWrapper`
  - `FormError`
  - `FormSuccess`  
  Provide consistent UI for auth flows.

---

## 🛠 Customization Guide

This starter is designed to be easily customizable:

### 🎨 UI & Theme
- Modify styles in `app/globals.css` and Tailwind configuration (`tailwind.config.ts`).
- Customize or replace components in:
  - `components/ui`
  - `components/auth`

### 🔐 Authentication Logic
- Adjust validation rules in `schema/index.ts`.
- Modify server action logic in `actions/*.ts`  
  *(e.g., add more checks during registration or login)*.

### 🌐 OAuth Providers
- Add more providers by configuring them in `auth.config.ts`.
- Add the required environment variables.
- Refer to [NextAuth.js Providers Documentation](https://next-auth.js.org/providers) for available options.

### 🛡️ Roles & Permissions
- Extend the `UserRole` enum in `prisma/schema.prisma`.  
  *(Run `npx prisma generate` and `npx prisma db push` afterward)*
- Update RBAC checks in your application logic.
- Optionally add more complex role checks in `middleware.ts`.

### 📧 Email Templates
- Modify HTML content inside:
  - `sendVerificationEmail`
  - `sendResetPasswordEmail`  
  Located in `lib/mail.ts`.

### 🗃️ Database Schema
- Add or modify fields in `prisma/schema.prisma`.
- After changes:
  ```bash
  npx prisma generate
  npx prisma db push
  ```

  





