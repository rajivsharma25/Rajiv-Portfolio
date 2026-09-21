# 👨‍💻 Rajiv Sharma | Software Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js_16.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Resend](https://img.shields.io/badge/Email-Resend-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)

A modern, high-performance personal portfolio built for **Rajiv Sharma**, Software Developer. Engineered with cutting-edge web technologies, glassmorphism aesthetics, full MongoDB-backed Blog CMS, and interactive bento-grid layouts.

🌐 **Live Website**: [rajivsharma.vercel.app](https://rajivsharma.vercel.app)

---

## ✨ Key Features

- **📝 MongoDB-Backed Blog & Content Management System (CMS)**:
  - Dynamic technical blog engine powered by **MongoDB Atlas** and **Mongoose**.
  - Secure Admin Console (`/admin`) for publishing, editing, and previewing articles in real time.
  - Rich content block support (code snippets, syntax highlighting, callouts, tables, and images).
  - Dynamic SEO metadata generation and Schema.org JSON-LD structured data.

- **🎨 Modern Bento-Grid & Glassmorphism UI**:
  - Contemporary design featuring backdrop blurs, soft ambient lighting gradients, and fluid micro-animations powered by **Framer Motion**.
  - **Dark & Light Mode** with automatic system preference detection and seamless theme toggle via `next-themes`.

- **✉️ Serverless Contact API with Resend**:
  - Native Next.js API route (`/api/contact`) sending beautiful, responsive HTML notifications with sender details and timestamps.
  - Theme-synced feedback banners powered by **Sonner** toast notifications.

- **💬 Interactive WhatsApp Floating Widget**:
  - Floating direct chat button with an expandable modal preview, online status indicators, and direct chat launch.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | Next.js 16.1 (App Router) |
| **Library** | React 19, React DOM 19 |
| **Database & ODM** | MongoDB Atlas, Mongoose |
| **Styling & Design** | Vanilla Tailwind CSS v4, Glassmorphism |
| **Animation & Motion** | Framer Motion |
| **Email Delivery** | Resend API |
| **Notifications** | Sonner (`next-themes` synced) |
| **Icons & Fonts** | Lucide React, React Icons, Google Fonts (Outfit, Plus Jakarta Sans) |
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
| `npm run dev` | Starts development server on port `3000` |
| `npm run build` | Compiles optimized production build |
| `npm run start` | Runs the compiled production build locally |
| `npm run lint` | Runs ESLint to identify code quality and style issues |

---

## 📂 Project Structure

```text
├── app/
│   ├── admin/
│   │   └── page.js             # Admin console entry page
│   ├── api/
│   │   ├── admin/
│   │   │   ├── auth/           # Admin key authentication route
│   │   │   └── blogs/          # Blog CRUD API routes
│   │   └── contact/
│   │       └── route.js        # Serverless Resend email API handler
│   ├── blogs/
│   │   ├── [slug]/
│   │   │   └── page.js         # Individual blog post page
│   │   └── page.js             # Blog hub entry point
│   ├── globals.css             # Tailwind v4 theme & base styles
│   ├── layout.js               # Root layout, Google Fonts & Providers
│   ├── page.js                 # Portfolio homepage entry point
│   ├── robots.js               # SEO robots.txt generator
│   └── sitemap.js              # Dynamic XML sitemap generator
├── components/
│   ├── admin/
│   │   └── AdminClient.jsx     # Full-featured blog CMS admin interface
│   ├── blog/
│   │   ├── ArticleClient.jsx   # Interactive individual blog article view
│   │   └── BlogListClient.jsx  # Filterable blog search & listing interface
│   ├── layout/
│   │   ├── Footer.jsx          # Site footer with quick navigation links
│   │   └── Header.jsx          # Responsive navigation & controls
│   ├── providers/
│   │   └── theme-provider.jsx  # next-themes context provider
│   ├── sections/
│   │   ├── About.jsx           # Bio, career stats & key highlights
│   │   ├── Certifications.jsx  # AWS certification & academic timeline
│   │   ├── Contact.jsx         # Direct contact channels & email form
│   │   ├── Experience.jsx      # Interactive career trajectory timeline
│   │   ├── Hero.jsx            # Profile showcase & typewriter banner
│   │   ├── Projects.jsx        # Filterable project bento cards & live demos
│   │   └── Skills.jsx          # Tech stack grid & core capabilities
│   └── ui/
│       ├── Toaster.jsx         # Theme-aware Sonner toast provider
│       ├── Typewriter.jsx      # Dynamic typewriter role animator
│       └── WhatsAppButton.jsx  # Floating interactive chat modal
├── lib/
│   ├── blogs.js                # Blog database queries & helpers
│   └── mongodb.js              # Cached MongoDB Atlas connection singleton
├── models/
│   └── Blog.js                 # Mongoose Blog schema & validation
├── public/
│   ├── assets/images/          # Optimized WebP project banners
│   ├── logo.webp               # Portfolio brand logo
│   └── profile.webp            # Optimized developer profile photo
├── scripts/
│   └── test-db.mjs             # Database connectivity & seeding utility
├── svg/                        # Custom inline SVG icons
├── next.config.mjs             # Next.js configuration
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
