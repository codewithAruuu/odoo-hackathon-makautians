<div align="center">

# 🧑‍💼 HR Management

### A modern platform for managing your organization's people — all from one clean dashboard

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-0F172A?style=for-the-badge)](https://tanstack.com/start)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

<!-- 📸 Once you have one, swap this comment for a real banner:
![HR Management banner](./docs/banner.png)
-->

<br>

## 📖 Overview

**HR Management** is a web application for handling the everyday work of an HR team — keeping employee records in one place, tracking attendance and leave, and giving managers a clear view of their people. It's built on **TanStack Start** for a fast, type-safe, server-rendered React foundation, with **shadcn/ui** and **Tailwind CSS** powering the interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

<!-- Check this list against what's actually implemented, and add/remove modules as needed -->

- 👥 **Employee Directory** — Centralized profiles with role, department, and contact info
- 🗓️ **Attendance & Leave Management** — Track check-ins, leave requests, and approvals
- 🧾 **Onboarding Workflows** — A smoother process for bringing new hires on board
- 📊 **Dashboards & Analytics** — At-a-glance insights into headcount and activity
- 🔐 **Role-Based Access** — Separate views and permissions for admins, managers, and employees
- 🌓 **Modern, Responsive UI** — Built with shadcn/ui components and Tailwind CSS

## 📸 Screenshots

<!-- Drop screenshots or a GIF walkthrough in here once available, e.g.:
| Dashboard | Employee Directory |
|---|---|
| ![Dashboard](./docs/dashboard.png) | ![Directory](./docs/directory.png) |
-->
<img width="1600" height="657" alt="WhatsApp Image 2026-07-05 at 18 27 30" src="https://github.com/user-attachments/assets/68bb17dc-9cad-4873-9060-d224037ac419" />
<img width="1600" height="704" alt="WhatsApp Image 2026-07-05 at 18 28 31" src="https://github.com/user-attachments/assets/27725a43-c32c-4472-8ab7-224d53c4ca61" />
<img width="1600" height="708" alt="WhatsApp Image 2026-07-05 at 18 29 48" src="https://github.com/user-attachments/assets/fef70609-ebe7-459e-9f2a-f6494ee8e595" />
<img width="1600" height="705" alt="WhatsApp Image 2026-07-05 at 18 31 24" src="https://github.com/user-attachments/assets/91eabe25-e6b0-4947-8041-bba9bb863473" />
<img width="1600" height="700" alt="WhatsApp Image 2026-07-05 at 18 43 22" src="https://github.com/user-attachments/assets/610566c4-b5f8-4e3c-9ffe-4d167b517e7f" />
<img width="1600" height="697" alt="WhatsApp Image 2026-07-05 at 18 45 01" src="https://github.com/user-attachments/assets/7f0e9da5-628b-46d3-a8bb-182daf9fd8f1" />



## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (React) |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/) |
| Package Manager / Runtime | [Bun](https://bun.sh/) |
| Linting / Formatting | ESLint + Prettier |

## 📁 Project Structure

```
HR Management/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Project utilities
│   ├── routes/           # TanStack Router route definitions
│   ├── router.tsx        # Router configuration
│   ├── routeTree.gen.ts  # Auto-generated route tree
│   ├── server.ts         # Server entry point
│   ├── start.ts          # App entry point
│   └── style.css         # Global styles
├── components.json       # shadcn/ui configuration
├── eslint.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.x or later

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd "HR Management"

# Install dependencies
bun install
```

### Environment Variables

If the app talks to a backend or any external services, create a `.env` file in the project root and add the required keys before running it.

### Running Locally

```bash
bun dev
```

Then open `http://localhost:3000` in your browser (check your terminal — Vite will confirm the exact port).

### Building for Production

```bash
bun run build
```

## 📜 Available Scripts

| Command | Description |
|---|---|
| `bun dev` | Start the development server |
| `bun run build` | Build the app for production |
| `bun run lint` | Run ESLint checks |

> Script names may differ slightly — check the `scripts` field in `package.json` to confirm.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

<div align="center">

Made with ❤️ by the HR Management team

</div>
