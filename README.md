# 👨‍💻 Rajiv Sharma | React Developer Portfolio

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern, high-performance personal portfolio website built to showcase my skills, projects, and professional experience. Designed with a focus on aesthetics, responsiveness, and performance using the latest web technologies.

## ✨ Key Features

- **🎨 Modern Data-Driven UI**: Clean, minimalistic, and professional design using **Tailwind CSS v4**.
- **🌓 Dark/Light Mode**: Fully integrated theme switching with system preference detection and persistent storage.
- **⚡ High Performance**: Built on **Next.js 15** with **Turbopack** for lightning-fast development and production builds.
- **📱 Fully Responsive**: Mobile-first architecture ensuring perfect rendering on all devices.
- **📧 Functional Contact Form**: Integrated with **Web3Forms** for real-time email inquiries.
- **🧱 Component-Based**: Modular architecture with reusable components (Header, Footer, Skills, Projects, etc.).
- **📂 App Router**: Utilizing Next.js 15 App Router for efficient navigation and layout management.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Linting**: ESLint

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js** (v18.17.0 or higher recommended)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rajivsharma25/rajivsharma-portfolio.git
   cd rajivsharma-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   > **Note**: This project uses `--turbopack` for faster HMR during development.

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 📂 Project Structure

```
├── app/                  # Next.js App Router directory
│   ├── globals.css       # Global styles & Tailwind directives
│   ├── layout.js         # Root layout with ThemeProvider
│   └── page.js           # Main Entry page
├── components/           # Reusable UI components
│   ├── Contact.js        # Contact form logic
│   ├── Footer.js         # Site footer
│   ├── Header.js         # Navigation & Theme toggle
│   ├── Hero.js           # Hero section
│   └── ...
├── context/              # React Context wrappers
│   └── ThemeContext.js   # Theme management logic
├── public/               # Static assets (images, Resume PDF)
└── package.json          # Project dependencies and scripts
```

## 📬 Contact

**Rajiv Sharma**  
📧 [rajivsharma93056@gmail.com](mailto:rajivsharma93056@gmail.com)  
🔗 [LinkedIn](https://linkedin.com/in/rajivsharma25)  
🐱 [GitHub](https://github.com/rajivsharma25)

---

© 2025 Rajiv Sharma. All Rights Reserved.
