# InsurePost - Social Media Automation for Insurance Agents

AI-powered social media content creation, scheduling, and automated posting platform built for insurance professionals.

## Features

- **Account Management** - Register, login, and manage your profile
- **Social Media Linking** - Connect Facebook, Instagram, LinkedIn, and Twitter/X
- **Smart Scheduling** - Auto-suggested optimal posting times with custom day/time selection
- **Lines of Business** - Select which insurance lines you sell (Auto, Home, Life, Health, Commercial, and 12+ more)
- **AI Content Generation** - Automatically generates engaging, insurance-specific social media posts
- **Weekly Email Approval** - Receive a weekly digest email to review and approve upcoming content
- **Multi-Platform Posting** - Approved content is automatically posted to all connected platforms
- **Analytics Dashboard** - Track engagement metrics across all platforms

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth.js (Credentials provider)
- **Styling:** Tailwind CSS
- **Email:** Nodemailer (SMTP)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your database URL and other config

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed demo data (optional)
npm run db:seed

# Start development server
npm run dev
```

### Demo Account

After seeding, you can log in with:
- **Email:** demo@insurepost.com
- **Password:** demo1234

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, Register, Onboarding pages
│   ├── (dashboard)/      # All authenticated dashboard pages
│   │   └── dashboard/
│   │       ├── page.tsx          # Dashboard overview
│   │       ├── platforms/        # Social media connections
│   │       ├── content/          # Content library & generation
│   │       ├── schedule/         # Posting schedule settings
│   │       ├── approvals/        # Weekly approval workflow
│   │       ├── analytics/        # Performance metrics
│   │       └── preferences/      # Lines of business & preferences
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── social-accounts/  # Platform linking
│   │   ├── posts/        # Content CRUD & generation
│   │   ├── approvals/    # Approval workflow
│   │   ├── preferences/  # User preferences
│   │   ├── schedule/     # Schedule settings
│   │   ├── analytics/    # Analytics data
│   │   └── cron/         # Cron job endpoints
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
├── lib/                  # Utilities (Prisma, auth, email, content generation)
└── types/                # TypeScript type definitions
```

## How It Works

1. **Sign Up** - Create an account and complete the onboarding wizard
2. **Connect Platforms** - Link your social media accounts (OAuth)
3. **Set Preferences** - Select lines of business, content tone, and schedule
4. **Generate Content** - AI creates tailored insurance posts with stock images
5. **Weekly Approval** - Review posts via email or the approvals dashboard
6. **Auto-Publish** - Approved posts are automatically published at scheduled times

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| GET/PUT | `/api/preferences` | User preferences & lines of business |
| GET/POST | `/api/social-accounts` | List/connect social platforms |
| DELETE | `/api/social-accounts/:id` | Disconnect a platform |
| GET/PUT | `/api/schedule` | Posting schedule settings |
| GET | `/api/posts` | List all posts |
| PATCH/DELETE | `/api/posts/:id` | Update/delete a post |
| POST | `/api/posts/generate` | Generate new AI content |
| GET | `/api/approvals` | List approval batches |
| POST | `/api/approvals/:id/approve-all` | Approve all posts in batch |
| POST | `/api/approvals/send-email` | Send approval digest email |
| GET | `/api/analytics` | Get analytics data |
| POST | `/api/cron/weekly-digest` | Cron: send weekly emails |
| POST | `/api/cron/publish` | Cron: publish approved posts |
