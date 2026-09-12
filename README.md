# 👨‍💻 Rajiv Sharma | Software Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js_16.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Serwist PWA](https://img.shields.io/badge/PWA-Serwist-FF6B6B?style=for-the-badge&logo=pwa&logoColor=white)](https://serwist.pages.dev/)
[![i18n](https://img.shields.io/badge/i18n-EN_%7C_HI_%7C_AR-4A90E2?style=for-the-badge)](https://github.com/rajivsharma25/Rajiv-Portfolio)
[![Resend](https://img.shields.io/badge/Email-Resend-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)

A modern, high-performance personal portfolio built for **Rajiv Sharma**, Software Developer. Engineered with cutting-edge web technologies, glassmorphism aesthetics, dynamic internationalization (i18n) supporting **English**, **Hindi**, and **Arabic (RTL)**, installable PWA capabilities, and interactive bento-grid layouts.

🌐 **Live Website**: [rajivsharma.vercel.app](https://rajivsharma.vercel.app)

---

## ✨ Key Features

- **🌐 Tri-Lingual Internationalization (i18n)**:
  - Full support for **English (`en`)**, **Hindi (`hi`)**, and **Arabic (`ar`)**.
  - Instant zero-flicker client-side switching with persistent `localStorage` preference.
  - Comprehensive localization covering all section headlines, bio highlights, skill taxonomies, experience timelines, project cards, education, and contact forms.

- **🔄 Native Right-to-Left (RTL) Layout**:
  - Full bidirectional support for Arabic (`html[dir="rtl"]`).
  - Intelligently mirrored vertical career timeline, directional navigation chevrons, link arrows, and floating widgets.

- **📱 Progressive Web App (PWA) with Offline Support**:
  - Built with **Serwist** service workers for robust asset caching.
  - Dedicated offline fallback screen (`/~offline`) with network retry capabilities.
  - Installable web app manifest with custom theme colors and icons.

- **🎨 Modern Bento-Grid & Glassmorphism UI**:
  - Contemporary design featuring backdrop blurs, soft ambient lighting gradients, and fluid micro-animations powered by **Framer Motion**.
  - **Dark & Light Mode** with automatic system preference detection and seamless theme toggle via `next-themes`.

- **🔤 Dynamic On-Demand Font Loading**:
  - Core Latin typography (`Outfit` and `Plus Jakarta Sans`) loaded statically via Next.js Google Fonts.
  - Script-specific fonts (`Noto Sans Devanagari` and `Cairo`) are fetched on-demand only when Hindi or Arabic is activated, minimizing initial payload.

- **✉️ Serverless Contact API with Resend**:
  - Native Next.js API route (`/api/contact`) sending beautiful, responsive HTML notifications with sender details and timestamps.
  - Theme-synced feedback banners powered by **Sonner** toast notifications.

- **💬 Interactive WhatsApp Floating Widget**:
  - Floating direct chat button with an expandable modal preview, online status indicators, and multilingual greeting templates.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | Next.js 16.1 (App Router, Turbopack, Webpack Production Bundler) |
| **Library** | React 19, React DOM 19 |
| **Styling & Design** | Vanilla Tailwind CSS v4, Glassmorphism, CSS Logical Properties |
| **Animation & Motion** | Framer Motion |
| **PWA & Offline** | Serwist (`@serwist/next`, `serwist`) |
| **Email Delivery** | Resend API |
| **Notifications** | Sonner (`next-themes` synced) |
| **Icons & Fonts** | Lucide React, React Icons, Google Fonts (Outfit, Plus Jakarta Sans, Noto Sans Devanagari, Cairo) |
| **Image Optimization** | Sharp, Next.js Image Component (WebP) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.18.0` or higher (Node `v20+` recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rajivsharma25/Rajiv-Portfolio.git
   cd Rajiv-Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # Resend API Key for contact form emails
   RESEND_API_KEY=your_resend_api_key_here

   # Target email where inquiries will be delivered
   CONTACT_EMAIL=your_email@example.com
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts development server with **Turbopack** on port `3000` |
| `npm run build` | Compiles optimized production build with Webpack and Serwist PWA bundling |
| `npm run start` | Runs the compiled production build locally |
| `npm run lint` | Runs ESLint to identify code quality and style issues |

---

## 📂 Project Structure

```text
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js        # Serverless Resend email API handler
│   ├── ~offline/
│   │   └── page.js             # PWA offline fallback screen
│   ├── globals.css             # Tailwind v4 theme, fonts & RTL styles
│   ├── layout.js               # Root layout, Google Fonts & Providers
│   ├── manifest.js             # Web App Manifest generator
│   ├── page.js                 # Portfolio homepage entry point
│   └── sw.js                   # Serwist PWA service worker logic
├── components/
│   ├── About.jsx               # Bio, career stats & key highlights
│   ├── Certifications.jsx      # AWS certification & academic timeline
│   ├── Contact.jsx             # Direct contact channels & email form
│   ├── DynamicFontLoader.jsx   # On-demand loader for Hindi & Arabic fonts
│   ├── Experience.jsx          # Interactive career trajectory timeline
│   ├── Footer.jsx              # Site footer with quick navigation links
│   ├── Header.jsx              # Responsive navigation & controls
│   ├── Hero.jsx                # Profile showcase & typewriter banner
│   ├── LanguageToggle.jsx      # Multilingual dropdown switcher
│   ├── Projects.jsx            # Filterable project bento cards & live demos
│   ├── Skills.jsx              # Tech stack grid & core capabilities
│   ├── Toaster.jsx             # Theme-aware Sonner toast provider
│   ├── Typewriter.jsx          # Dynamic typewriter role animator
│   ├── WhatsAppButton.jsx      # Floating interactive chat modal
│   └── theme-provider.jsx      # next-themes context provider
├── context/
│   └── LanguageContext.jsx     # i18n state manager & RTL synchronization
├── locales/
│   ├── en.json                 # English translation dictionary
│   ├── hi.json                 # Hindi (हिन्दी) translation dictionary
│   └── ar.json                 # Arabic (العربية) translation dictionary
├── public/
│   ├── assets/images/          # Optimized WebP project banners
│   ├── icons/                  # PWA application icons
│   ├── logo.webp               # Portfolio brand logo
│   └── profile.webp            # Optimized developer profile photo
├── next.config.mjs             # Next.js & Serwist configuration
└── package.json                # Dependencies and project metadata
```

---

## 📬 Connect With Me

- **Name**: Rajiv Sharma
- **Role**: Software Developer
- **Email**: [rajivsharma93056@gmail.com](mailto:rajivsharma93056@gmail.com)
- **LinkedIn**: [linkedin.com/in/rajivsharma25](https://linkedin.com/in/rajivsharma25)
- **GitHub**: [github.com/rajivsharma25](https://github.com/rajivsharma25)
- **WhatsApp**: [+91 9305635022](https://wa.me/919305635022)

---

© 2026 [Rajiv Sharma](https://github.com/rajivsharma25). Crafted with Next.js, React, and Tailwind CSS.
