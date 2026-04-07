# Supabase Authentication Setup Guide

This guide provides comprehensive documentation for setting up and using Supabase authentication in the Falcon CRM Template.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Setup Instructions](#setup-instructions)
- [Client Files Deep Dive](#client-files-deep-dive)
- [Usage Examples](#usage-examples)
- [Authentication Flows](#authentication-flows)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The Falcon CRM Template uses **Supabase** for authentication, providing:

- Email/password authentication
- OAuth providers (Google, GitHub, etc.)
- Magic link authentication
- Session management
- Server-side rendering (SSR) support
- Row Level Security (RLS) integration

### Why Supabase?

- **Built on PostgreSQL**: Integrates seamlessly with Neon PostgreSQL
- **SSR Support**: Works with Next.js App Router and Server Components
- **Secure**: Built-in security features and RLS
- **Flexible**: Multiple authentication methods
- **Developer-friendly**: Excellent TypeScript support

## Architecture

The template uses three separate Supabase clients for different contexts:

```
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Clients                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Client     │  │   Server     │  │    Admin     │    │
│  │  (Browser)   │  │    (SSR)     │  │ (Privileged) │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│         │                 │                  │             │
│         │                 │                  │             │
│    Client         Server            Server Only           │
│  Components      Components         (Backend)             │
│                  API Routes                                │
│                Server Actions                              │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

```
src/supabase/
├── client.ts      # Browser client for Client Components
├── server.ts      # Server client for Server Components/API Routes
└── admin.ts       # Admin client for privileged operations
```

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name**: Your project name
   - **Database Password**: Strong password (save this!)
   - **Region**: Choose closest to your users
4. Wait for project to be created (~2 minutes)

### 2. Get API Credentials

1. Go to **Project Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: Starts with `eyJ...`
   - **service_role key**: Starts with `eyJ...` (⚠️ Keep secret!)

### 3. Configure Environment Variables

Add to your `.env.local` file:

```env
# ─── Supabase Authentication ──────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Configure Authentication Providers

#### Email/Password (Default)

Already enabled by default. No additional configuration needed.

#### OAuth Providers (Google, GitHub, etc.)

1. Go to **Authentication** → **Providers**
2. Enable desired provider (e.g., Google)
3. Add OAuth credentials:
   - **Client ID**: From provider's developer console
   - **Client Secret**: From provider's developer console
4. Add redirect URL to provider:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```

#### Magic Links

1. Go to **Authentication** → **Email Templates**
2. Customize "Magic Link" template
3. Enable in **Authentication** → **Providers** → **Email**

### 5. Configure Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL**: `http://localhost:3000` (development)
3. Add **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   https://yourdomain.com/auth/callback
   ```

### 6. Test Connection

Create a test file to verify setup:

```typescript
// app/test-auth/page.tsx
import { createClient } from "@/supabase/server";

export default async function TestAuth() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  return (
    <div>
      <h1>Auth Test</h1>
      <pre>{JSON.stringify({ data, error }, null, 2)}</pre>
    </div>
  );
}
```

## Client Files Deep Dive

### `src/supabase/client.ts`

**Purpose**: Browser-side Supabase client for Client Components

**File Contents**:

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

**Key Features**:

- Uses `createBrowserClient` from `@supabase/ssr`
- Automatically manages cookies in the browser
- Handles session refresh automatically
- Safe to use in Client Components

**When to Use**:

- Client Components (`"use client"`)
- Browser-only operations
- Interactive UI elements (forms, buttons)
- Real-time subscriptions

**Example Usage**:

```typescript
"use client";

import { createClient } from "@/supabase/client";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
    } else {
      console.log("Logged in:", data.user);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

**Security Notes**:

- Only uses public `anon` key (safe for browser)
- Respects Row Level Security (RLS) policies
- Cannot bypass database security rules

---

### `src/supabase/server.ts`

**Purpose**: Server-side Supabase client for Server Components and API Routes

**File Contents**:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from Server Component — middleware handles session refresh
          }
        },
      },
    },
  );
}
```

**Key Features**:

- Uses `createServerClient` from `@supabase/ssr`
- Integrates with Next.js cookies API
- Handles SSR session management
- Supports Server Components and API Routes

**When to Use**:

- Server Components (default in App Router)
- API Routes (`app/api/*/route.ts`)
- Server Actions
- Middleware
- Any server-side rendering context

**Example Usage - Server Component**:

```typescript
// app/dashboard/page.tsx
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Get current user
  const { data: { user }, error } = await supabase.auth.getUser();

  // Redirect if not authenticated
  if (error || !user) {
    redirect("/login");
  }

  // Fetch user-specific data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div>
      <h1>Welcome, {profile?.full_name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

**Example Usage - API Route**:

```typescript
// app/api/user/route.ts
import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user });
}
```

**Example Usage - Server Action**:

```typescript
// app/actions/update-profile.ts
"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const fullName = formData.get("fullName") as string;

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
```

**Security Notes**:

- Uses `anon` key (respects RLS)
- Session tied to user's cookies
- Cannot access other users' data (unless RLS allows)
- Safe for server-side operations

---

### `src/supabase/admin.ts`

**Purpose**: Admin client with service role key for privileged operations

**File Contents**:

```typescript
import { createClient } from "@supabase/supabase-js";

/**
 * Supabase admin client using the service role key.
 * Used for privileged operations like generating email verification links.
 * NEVER expose this client or import it on the client side.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);
```

**Key Features**:

- Uses `service_role` key (bypasses RLS)
- Full database access
- Can perform admin operations
- No session management

**⚠️ CRITICAL SECURITY WARNINGS**:

- **NEVER** import this in Client Components
- **NEVER** expose service role key to browser
- **ONLY** use in server-side code
- Can bypass all Row Level Security policies
- Has full database access

**When to Use**:

- Creating users programmatically
- Generating email verification links
- Admin operations (delete any user, etc.)
- Bypassing RLS for legitimate admin tasks
- Background jobs and cron tasks

**Example Usage - Generate Email Link**:

```typescript
// app/api/admin/invite-user/route.ts
import { supabaseAdmin } from "@/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // ⚠️ Add your own admin authentication check here!

  const { email } = await request.json();

  // Generate signup link
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: "signup",
    email,
    options: {
      data: {
        role: "member",
      },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Send email with data.properties.action_link
  return NextResponse.json({ link: data.properties.action_link });
}
```

**Example Usage - Delete User**:

```typescript
// app/api/admin/delete-user/route.ts
import { supabaseAdmin } from "@/supabase/admin";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  // ⚠️ Add your own admin authentication check here!

  const { userId } = await request.json();

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
```

**Example Usage - Create User**:

```typescript
// app/api/admin/create-user/route.ts
import { supabaseAdmin } from "@/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // ⚠️ Add your own admin authentication check here!

  const { email, password, metadata } = await request.json();

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Skip email verification
    user_metadata: metadata,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ user: data.user });
}
```

**Security Best Practices**:

1. Always verify admin permissions before using
2. Never expose admin endpoints publicly
3. Add authentication middleware to admin routes
4. Log all admin operations
5. Use environment-specific service role keys

---

## Usage Examples

### Sign Up with Email/Password

```typescript
"use client";

import { createClient } from "@/supabase/client";

export default function SignUpForm() {
  const supabase = createClient();

  const handleSignUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Sign up error:", error.message);
    } else {
      console.log("Check your email for verification link");
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleSignUp(
        formData.get("email") as string,
        formData.get("password") as string
      );
    }}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### Sign In with OAuth (Google)

```typescript
"use client";

import { createClient } from "@/supabase/client";

export default function GoogleSignIn() {
  const supabase = createClient();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("OAuth error:", error.message);
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
}
```

### Sign Out

```typescript
"use client";

import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
```

### Get Current User (Server Component)

```typescript
import { createClient } from "@/supabase/server";

export default async function UserProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <h1>{user.email}</h1>
      <p>User ID: {user.id}</p>
    </div>
  );
}
```

### Protected Route

```typescript
// app/dashboard/layout.tsx
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
```

### Password Reset

```typescript
"use client";

import { createClient } from "@/supabase/client";

export default function ForgotPassword() {
  const supabase = createClient();

  const handleReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      console.error("Reset error:", error.message);
    } else {
      console.log("Check your email for reset link");
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleReset(formData.get("email") as string);
    }}>
      <input name="email" type="email" required />
      <button type="submit">Reset Password</button>
    </form>
  );
}
```

## Authentication Flows

### Email/Password Flow

```
1. User submits signup form
   ↓
2. supabase.auth.signUp() called
   ↓
3. Supabase sends verification email
   ↓
4. User clicks link in email
   ↓
5. Redirected to /auth/callback
   ↓
6. Session created, user logged in
```

### OAuth Flow

```
1. User clicks "Sign in with Google"
   ↓
2. supabase.auth.signInWithOAuth() called
   ↓
3. Redirected to Google login
   ↓
4. User authorizes app
   ↓
5. Redirected to /auth/callback
   ↓
6. Session created, user logged in
```

### Magic Link Flow

```
1. User enters email
   ↓
2. supabase.auth.signInWithOtp() called
   ↓
3. Supabase sends magic link email
   ↓
4. User clicks link
   ↓
5. Redirected to /auth/callback
   ↓
6. Session created, user logged in
```

## Best Practices

### 1. Client Selection

```typescript
// ✅ CORRECT: Client Component
"use client";
import { createClient } from "@/supabase/client";

// ✅ CORRECT: Server Component
import { createClient } from "@/supabase/server";

// ❌ WRONG: Server client in Client Component
("use client");
import { createClient } from "@/supabase/server"; // Error!

// ❌ WRONG: Admin client in Client Component
("use client");
import { supabaseAdmin } from "@/supabase/admin"; // Security risk!
```

### 2. Error Handling

```typescript
const { data, error } = await supabase.auth.signIn({
  email,
  password,
});

if (error) {
  // Handle specific error codes
  switch (error.message) {
    case "Invalid login credentials":
      setError("Incorrect email or password");
      break;
    case "Email not confirmed":
      setError("Please verify your email");
      break;
    default:
      setError("An error occurred. Please try again.");
  }
  return;
}

// Success handling
console.log("Logged in:", data.user);
```

### 3. Session Management

```typescript
// Listen for auth state changes (Client Component)
"use client";

import { createClient } from "@/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthListener() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        router.push("/dashboard");
      } else if (event === "SIGNED_OUT") {
        router.push("/login");
      }
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return null;
}
```

### 4. Type Safety

```typescript
import { createClient } from "@/supabase/server";
import type { User } from "@supabase/supabase-js";

async function getUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
```

### 5. Middleware for Protected Routes

```typescript
// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

## Troubleshooting

### Issue: "Invalid API key"

**Solution**: Check that environment variables are set correctly:

```bash
# Verify in .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Issue: "User not found" after sign up

**Solution**: Check email confirmation settings:

1. Go to **Authentication** → **Providers** → **Email**
2. Disable "Confirm email" for testing
3. Or check spam folder for verification email

### Issue: OAuth redirect not working

**Solution**: Add redirect URL to Supabase:

1. Go to **Authentication** → **URL Configuration**
2. Add `http://localhost:3000/auth/callback` to Redirect URLs
3. Add production URL when deploying

### Issue: Session not persisting

**Solution**: Check cookie settings:

1. Ensure cookies are enabled in browser
2. Check that `sameSite` and `secure` are configured correctly
3. Verify middleware is handling session refresh

### Issue: "Failed to fetch" error

**Solution**: Check CORS settings:

1. Go to **Settings** → **API**
2. Add your domain to allowed origins
3. For localhost, add `http://localhost:3000`

### Issue: Admin client not working

**Solution**: Verify service role key:

1. Check `.env.local` has `SUPABASE_SERVICE_ROLE_KEY`
2. Ensure it's the service_role key, not anon key
3. Never use admin client in Client Components

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase SSR Guide](https://supabase.com/docs/guides/auth/server-side-rendering)
- [Next.js App Router with Supabase](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)

---

**Need Help?** Check the [Supabase Discord](https://discord.supabase.com) or [GitHub Discussions](https://github.com/supabase/supabase/discussions)
