# Jorge Ariel Garrone — Portfolio

Personal portfolio website built with Next.js 14+, TypeScript, and Tailwind CSS.

**Live site:** [jorgegarrone.com](https://www.jorgegarrone.com)

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Email:** Resend
- **Testing:** Vitest + React Testing Library
- **Deploy:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file and fill in your values
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | Email address to receive contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site |

## Scripts

```bash
npm run dev            # Start development server
npm run test           # Run tests (watch mode)
npm run test:ui        # Run tests with Vitest UI
npm run test:coverage  # Run tests with coverage report
```

## Before Going Live

- [ ] Add `RESEND_API_KEY` to `.env.local` and Vercel dashboard
- [ ] Replace `public/images/projects/*.png` with real project screenshots
- [ ] Create `public/og-image.png` (1200×630 px) for social sharing
- [ ] Verify sender domain in Resend dashboard

## Project Structure

```
app/                  # Next.js App Router
├── api/contact/      # Contact form serverless handler
├── layout.tsx        # Root layout with metadata
├── page.tsx          # Single-page composition
├── sitemap.ts        # Auto-generated sitemap
└── robots.ts         # Robots.txt

src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, About, Skills, Projects, Contact
│   └── ui/           # Badge, Button, SectionTitle, AnimatedSection, JsonLd
├── data/             # Static content (skills, projects, timeline, services)
├── hooks/            # useActiveSection, useContactForm
├── lib/              # Resend client, Zod validations
├── test/             # All test files
└── types/            # Shared TypeScript interfaces

public/
├── images/           # Profile photo + project screenshots
└── resume.pdf        # Downloadable CV
```
