# Falcon CRM Template

> A production-ready Next.js template designed for the Falcon Agent to build custom CRMs for agencies. Built with TypeScript, Tailwind CSS v4, shadcn/ui, Supabase Auth, and Neon PostgreSQL.

## 🎯 Purpose

This template serves as the foundation for Falcon Agent to create, customize, and build beautiful, accessible CRMs for agencies. It provides a complete design system, pre-built components, authentication with Supabase, PostgreSQL database with Drizzle ORM, and a scalable architecture that can be extended for any CRM use case.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Database Setup](#-database-setup)
- [Supabase Authentication](#-supabase-authentication)
- [Available Scripts](#-available-scripts)
- [Components](#-components)
- [Design System](#-design-system)
- [Development Guidelines](#-development-guidelines)
- [Building for Production](#-building-for-production)

## 🛠 Tech Stack

### Core Framework

- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library with latest features
- **TypeScript 5.x** - Type-safe development

### Database & ORM

- **Neon PostgreSQL** - Serverless PostgreSQL database
- **Drizzle ORM 0.45.2** - TypeScript-first ORM
- **Drizzle Kit 0.31.10** - Schema management and migrations
- **postgres 3.4.9** - PostgreSQL client for Node.js

### Authentication

- **Supabase Auth** - Complete authentication solution
- **@supabase/ssr 0.9.0** - Server-side rendering support
- **@supabase/supabase-js 2.101.1** - Supabase JavaScript client

### Styling & Design

- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library (New York style)
- **Radix UI 1.4.3** - Unstyled, accessible UI primitives
- **class-variance-authority 0.7.1** - Component variant management
- **tailwind-merge 3.4.0** - Merge Tailwind classes without conflicts

### UI & Icons

- **Lucide React 0.563.0** - Icon library
- **Tabler Icons 3.36.1** - Additional icon set
- **next-themes 0.4.6** - Dark mode support

### Forms & Validation

- **react-hook-form 7.71.2** - Form state management
- **@hookform/resolvers 5.2.2** - Form validation resolvers
- **zod 4.3.6** - TypeScript-first schema validation

### Data Visualization

- **Recharts 2.15.4** - Chart components
- **date-fns 4.1.0** - Date manipulation
- **react-day-picker 9.13.1** - Calendar component

### Additional Libraries

- **Sonner 2.0.7** - Toast notifications
- **Vaul 1.1.2** - Drawer component
- **dotenv 17.2.4** - Environment variable management

### Development Tools

- **Biome 2.2.0** - Fast linter and formatter
- **pnpm 10.18.0** - Fast, disk space efficient package manager
- **tsx 4.21.0** - TypeScript execution

## 📁 Project Structure

```
falcon-crm-template/
├── .git/                       # Git repository
├── .vscode/                    # VS Code settings
├── node_modules/               # Dependencies
├── public/                     # Static assets
│   ├── falcon-full-black.webp  # Logo (black)
│   ├── falcon-full-white.webp  # Logo (white)
│   ├── falcon-full.webp        # Logo (full color)
│   └── falcon.webp             # Logo (icon)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── favicon.ico         # Site favicon
│   │   ├── globals.css         # Global styles & design tokens
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   └── ui/                 # shadcn/ui components (38 components)
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── direction.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── empty.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   ├── hooks/                  # Custom React hooks
│   │   └── use-mobile.ts       # Mobile detection hook
│   ├── lib/                    # Utility functions
│   │   ├── db/                 # Database layer (⚠️ CRITICAL)
│   │   │   ├── connection.ts   # PostgreSQL client & Drizzle instance
│   │   │   ├── index.ts        # Database exports
│   │   │   ├── migrate.ts      # Migration runner script
│   │   │   ├── migrations/     # Generated migration files
│   │   │   └── schema.ts       # Database schema definitions
│   │   └── utils.ts            # cn() helper for class merging
│   ├── providers/              # React context providers
│   │   ├── index.ts            # Provider exports
│   │   └── theme.tsx           # Theme provider for dark mode
│   └── supabase/               # Supabase clients (⚠️ CRITICAL)
│       ├── admin.ts            # Admin client (service role)
│       ├── client.ts           # Browser client
│       └── server.ts           # Server client (SSR)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── biome.json                  # Biome configuration
├── components.json             # shadcn/ui configuration
├── COMPONENTS.md               # Component documentation
├── drizzle.config.ts           # Drizzle Kit configuration
├── next.config.ts              # Next.js configuration
├── next-env.d.ts               # Next.js TypeScript declarations
├── package.json                # Dependencies and scripts
├── pnpm-lock.yaml              # Lock file
├── pnpm-workspace.yaml         # pnpm workspace config
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # This file
├── SUPABASE_SETUP.md           # Supabase setup guide
├── tsconfig.json               # TypeScript configuration
└── tsconfig.tsbuildinfo        # TypeScript build info
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 22.21.0
- **pnpm**: 10.18.0 (recommended package manager)
- **Neon PostgreSQL Account**: [Sign up at neon.tech](https://neon.tech)
- **Supabase Account**: [Sign up at supabase.com](https://supabase.com) (optional, for auth)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# Generate database migrations
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Run development server
pnpm dev
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# ─── Database — Neon PostgreSQL ───────────────────────────────────────────────
# Get this from: https://console.neon.tech → your project → Connection Details
DATABASE_URL=postgresql://user:password@ep-example.us-east-2.aws.neon.tech/neondb?sslmode=require
DATABASE_URL=postgresql://user:password@ep-example-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require

# ─── Supabase Authentication ──────────────────────────────────────────────────
# Get these from: https://supabase.com/dashboard → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ─── Next.js ──────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_TELEMETRY_DISABLED=1
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🗄️ Database Setup

This template uses **Neon PostgreSQL** with **Drizzle ORM** for type-safe database operations.

### Database Files Overview

#### `src/lib/db/schema.ts`

**Purpose**: Defines your database schema using Drizzle ORM

**Key Features**:

- PostgreSQL-specific types (UUID, TIMESTAMP, BOOLEAN)
- Type-safe schema definitions
- Automatic TypeScript type inference
- Relations between tables

**Default Schema**:

```typescript
// Users table (CRM team members)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("member"),
  avatarUrl: text("avatar_url"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

**Usage**:

```typescript
import { users } from "@/lib/db/schema";
import { db } from "@/lib/db";

// Query users
const allUsers = await db.select().from(users);

// Insert user
await db.insert(users).values({
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
});
```

#### `src/lib/db/connection.ts`

**Purpose**: Creates and exports the Drizzle database instance

**Key Features**:

- PostgreSQL connection using `postgres` client
- Environment-based configuration
- Schema integration
- Connection pooling support

**Usage**:

```typescript
import db from "@/lib/db/connection";

// Use db instance for queries
const users = await db.query.users.findMany();
```

#### `src/lib/db/index.ts`

**Purpose**: Central export point for database utilities

**Exports**:

- `db` - Drizzle database instance

**Usage**:

```typescript
import { db } from "@/lib/db";
```

#### `src/lib/db/migrate.ts`

**Purpose**: Migration runner script for applying database changes

**Key Features**:

- Reads migrations from `src/lib/db/migrations/`
- Applies migrations in order
- Tracks applied migrations
- Error handling and logging

**Usage**:

```bash
# Run via npm script
pnpm db:migrate

# Or directly with tsx
tsx src/lib/db/migrate.ts
```

**How it works**:

1. Connects to PostgreSQL using `DATABASE_URL`
2. Reads migration files from `src/lib/db/migrations/`
3. Applies unapplied migrations in order
4. Logs progress and completion time
5. Exits with appropriate status code

#### `src/lib/db/migrations/`

**Purpose**: Stores generated SQL migration files

**Contents**:

- SQL migration files (generated by `drizzle-kit generate`)
- Migration metadata
- Journal of applied migrations

**Note**: This directory is auto-generated. Do not edit manually.

### Database Workflow

1. **Define Schema** - Edit `src/lib/db/schema.ts`
2. **Generate Migration** - Run `pnpm db:generate`
3. **Review Migration** - Check `src/lib/db/migrations/` for SQL
4. **Apply Migration** - Run `pnpm db:migrate`
5. **Use in Code** - Import `db` and query your tables

### Database Scripts

```bash
# Generate migration from schema changes
pnpm db:generate

# Apply migrations to database
pnpm db:migrate

# Push schema directly (skip migrations)
pnpm db:push

# Open Drizzle Studio (database GUI)
pnpm db:studio

# Complete setup (generate + migrate)
pnpm db:setup
```

### Drizzle Configuration

The `drizzle.config.ts` file configures Drizzle Kit:

```typescript
export default defineConfig({
  schema: "./src/lib/db/schema.ts", // Schema location
  out: "./src/lib/db/migrations", // Migration output
  dialect: "postgresql", // Database type
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Connection string
  },
  verbose: true, // Detailed logging
  strict: true, // Strict mode
});
```

## 🔐 Supabase Authentication

This template includes Supabase for authentication. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed setup instructions.

### Supabase Files Overview

#### `src/supabase/client.ts`

**Purpose**: Browser-side Supabase client for client components

**Usage**:

```typescript
"use client";
import { createClient } from "@/supabase/client";

export default function ClientComponent() {
  const supabase = createClient();

  // Sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "user@example.com",
    password: "password",
  });
}
```

**When to use**: Client Components, browser-only operations

#### `src/supabase/server.ts`

**Purpose**: Server-side Supabase client for Server Components and API routes

**Usage**:

```typescript
import { createClient } from "@/supabase/server";

export default async function ServerComponent() {
  const supabase = await createClient();

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();

  return <div>Hello {user?.email}</div>;
}
```

**When to use**: Server Components, API Routes, Server Actions

#### `src/supabase/admin.ts`

**Purpose**: Admin client with service role key for privileged operations

**⚠️ SECURITY WARNING**: Never import this on the client side!

**Usage**:

```typescript
import { supabaseAdmin } from "@/supabase/admin";

// Generate email verification link
const { data, error } = await supabaseAdmin.auth.admin.generateLink({
  type: "signup",
  email: "user@example.com",
});
```

**When to use**: Server-only operations, admin tasks, bypassing RLS

## 📜 Available Scripts

### Development

```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server
```

### Code Quality

```bash
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
```

### Database Operations

```bash
pnpm db:generate  # Generate migrations from schema changes
pnpm db:migrate   # Apply migrations to database
pnpm db:push      # Push schema directly (skip migrations)
pnpm db:studio    # Open Drizzle Studio (database GUI)
pnpm db:setup     # Complete setup (generate + migrate)
```

### Script Details

| Script        | Command                               | Description                                       |
| ------------- | ------------------------------------- | ------------------------------------------------- |
| `dev`         | `next dev`                            | Starts Next.js development server with hot reload |
| `build`       | `next build`                          | Creates optimized production build                |
| `start`       | `next start`                          | Starts production server (requires build first)   |
| `lint`        | `biome check`                         | Runs Biome linter to check code quality           |
| `format`      | `biome format --write`                | Formats code using Biome                          |
| `db:generate` | `drizzle-kit generate`                | Generates SQL migrations from schema.ts           |
| `db:migrate`  | `tsx src/db/migrate.ts`               | Runs migration script to apply changes            |
| `db:push`     | `drizzle-kit push`                    | Pushes schema directly without migrations         |
| `db:studio`   | `drizzle-kit studio`                  | Opens Drizzle Studio GUI at localhost:4983        |
| `db:setup`    | `pnpm db:generate && pnpm db:migrate` | Complete database setup                           |

### When to Use Each Database Script

- **`db:generate`**: After modifying `schema.ts`, generates migration files
- **`db:migrate`**: Applies pending migrations to your database
- **`db:push`**: Quick prototyping, pushes schema without migration history
- **`db:studio`**: Visual database browser and editor
- **`db:setup`**: First-time setup or after pulling schema changes

## 🧩 Components

This template includes 38 shadcn/ui components in `src/components/ui/`. All components are:

- Fully accessible (ARIA compliant)
- Keyboard navigable
- Dark mode compatible
- Customizable with Tailwind CSS
- Type-safe with TypeScript

### Component Categories

**Form & Input** (9): button, input, textarea, label, checkbox, switch, select, slider, calendar

**Layout** (9): card, separator, scroll-area, sidebar, tabs, accordion, breadcrumb, collapsible, direction

**Overlay** (9): dialog, alert-dialog, sheet, drawer, popover, tooltip, dropdown-menu, context-menu, menubar

**Feedback** (6): alert, sonner, progress, skeleton, badge, empty

**Display** (5): avatar, table, chart, aspect-ratio, pagination

See [COMPONENTS.md](./COMPONENTS.md) for detailed component documentation.

## 🎨 Design System

### Brand Colors (OKLCH)

```css
--brand-primary: oklch(72.348% 0.17235 53.784)
  --brand-dim: oklch(72.348% 0.17235 53.784 / 0.12)
  --brand-glow: oklch(72.348% 0.17235 53.784 / 0.35);
```

### Typography

```css
--font-heading: Host Grotesk /* Headings */ --font-body: Inter /* Body text */
  --font-mono: Geist Mono /* Code */;
```

### Border Radius

```css
--radius: 0.625rem (10px) /* Base */ --radius-sm: 6px --radius-md: 8px
  --radius-lg: 10px --radius-xl: 14px --radius-2xl: 18px --radius-3xl: 22px
  --radius-4xl: 26px;
```

### Dark Mode

The template includes a complete dark mode implementation using `next-themes`:

```typescript
import { ThemeProvider } from "@/providers/theme";

<ThemeProvider attribute="class" defaultTheme="system">
  {children}
</ThemeProvider>
```

## 🛠 Development Guidelines

### Adding New Database Tables

1. Edit `src/lib/db/schema.ts`:

```typescript
export const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  ...timestamps,
});
```

2. Generate migration:

```bash
pnpm db:generate
```

3. Apply migration:

```bash
pnpm db:migrate
```

### Using the Database

```typescript
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Select all
const allUsers = await db.select().from(users);

// Select with condition
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, "user@example.com"));

// Insert
await db.insert(users).values({
  email: "new@example.com",
  firstName: "Jane",
  lastName: "Doe",
});

// Update
await db.update(users).set({ isActive: false }).where(eq(users.id, userId));

// Delete
await db.delete(users).where(eq(users.id, userId));
```

### Adding New Components

```bash
# Add shadcn/ui component
pnpm dlx shadcn@latest add [component-name]

# Example: Add command component
pnpm dlx shadcn@latest add command
```

### Code Style

This project uses Biome for linting and formatting:

```bash
# Check code
pnpm lint

# Format code
pnpm format
```

## 🏗 Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Production Checklist

- [ ] Set `DATABASE_URL` and `DATABASE_URL` to production database
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` and keys to production Supabase
- [ ] Run `pnpm db:migrate` on production database
- [ ] Set `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Enable `NEXT_TELEMETRY_DISABLED=1` if desired
- [ ] Test authentication flow
- [ ] Test database connections
- [ ] Verify environment variables are set

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Neon PostgreSQL Documentation](https://neon.tech/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This template is created for use with Falcon Agent.

## 👤 Author

**usmanunfolds@alabura.com**

---

Built with ❤️ for Falcon Agent
