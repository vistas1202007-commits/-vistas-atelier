# Vistas Atelier website

Next.js site for Vistas Atelier: homepage, case studies, journal, contact form with a real backend, and a private admin panel.

## Run on your computer
1. Install Node.js LTS.
2. In this folder run `npm install`, then `npm run dev`.
3. Open http://localhost:3000.

## Where to change things
| What | File |
|---|---|
| Email, WhatsApp, booking link, prices, services, FAQ | `src/content/site.ts` |
| Portfolio projects & case studies | `src/content/projects.ts` |
| Journal articles | `src/content/journal.ts` |
| Your photo (optional) | save as `public/studio/founder.jpg` |
| Colours, fonts, spacing | `src/app/globals.css` (section 1: tokens) |

## Publish free on Netlify
1. Create a free GitHub account and upload this folder as a repository (the `.env.local` file is excluded automatically).
2. Create a free Netlify account → **Add new site → Import from GitHub** → pick the repository. Netlify detects Next.js and builds it.
3. In Netlify → **Site configuration → Environment variables**, add `ADMIN_PASSWORD` (a long password of your choice).
4. Redeploy. Your site is live on a free `something.netlify.app` address; connect `vistasatelier.com` later under **Domain management**.

Enquiries are saved automatically in Netlify's free built-in storage (Netlify Blobs). Read them at `/admin`.

## Optional extras (all have free plans)
- **Email notifications:** create a Resend account and add `RESEND_API_KEY` (see `.env.example`). Without it, check `/admin` for new enquiries.
- **Call booking:** create a Calendly or Cal.com account and paste the link into `bookingUrl` in `src/content/site.ts`.
- **Supabase:** only if you outgrow Netlify storage. Run `supabase/schema.sql` and add its keys.

## Before going live
- Replace `REPLACE_WITH_REAL_EMAIL` in `src/content/site.ts`.
- Add real prices (or keep "Fixed quote after a call").
- Concept projects stay labelled as concepts; add real client work when you can.
- Only publish genuine testimonials and client names.
