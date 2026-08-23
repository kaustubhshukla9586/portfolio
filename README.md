# Kaustubh Shukla — Portfolio

My personal portfolio site. Dark, code-native, heavy on motion, built to feel
deliberate rather than templated.

**Live:** [kaustubhshukla.dev](https://kaustubhshukla.dev)

---

## Stack

- **React** + **Vite**
- **Tailwind CSS**
- **Framer Motion** — scroll reveals, parallax, spring-based transitions
- **Resend** — contact form, via a Vercel serverless function
- **React Bits** — `BlobCursor`, `PixelSwap` (recolored to the site palette)
- Deployed on **Vercel**

## Design

- Near-black background, warm off-white text, single amber/rust accent used
  sparingly — no default purple, no generic Inter-everywhere look.
- Three-font system: **Barlow Condensed** (display/headings), **JetBrains
  Mono** (labels/status), **Hanken Grotesk** (body).
- Diagonal hazard-stripe motif used sparingly as a section-break device.
- Two distinct motion characters: a smooth, critically-damped spring for the
  hero and headings (word-by-word blur reveal), and a snappier spring for
  cards and general scroll reveals — deliberately varied, not one effect
  copy-pasted everywhere.
- Custom blob cursor on desktop only; disabled on touch devices.
- Full `prefers-reduced-motion` support — animations drop to a static
  presentation when the user has motion reduction enabled at the OS level.
- Mobile-first responsive layout with graceful motion degradation on
  smaller/lower-powered devices.

## Sections

1. **Hero** — oversized, deliberately cropped display type, no photo
2. **About** — a bio, opened with a Marcus Aurelius quote, with a grayscale
   portrait that saturates to color on scroll
3. **Work** — real experience (OffSecDiary, Real Gods eSports)
4. **Projects** — five projects in device-mockup frames
5. **Patent** — a small credential section (DBMS Predictive Execution,
   co-inventor)
6. **Contact** — plain hyperlinked email + a Resend-backed form
7. **Footer** — minimal, with a small click-to-reveal easter egg

## Local development

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173`.

> **Note:** the contact form depends on a Vercel serverless function
> (`/api/contact.js`) and won't work under plain `vite dev`. Use `vercel dev`
> or test against the deployed build.

## Environment variables

```
RESEND_API_KEY=your_resend_api_key
```

## Deployment

Deployed on Vercel, connected to this repo. Pushes to `main` deploy
automatically.

---

Built with a heavy assist from Claude (Anthropic) for planning, copy, and
implementation guidance.