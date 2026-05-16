# 🚀 Streaksmith

> **Turn your habits into an epic quest.**

Streaksmith is a gamified habit-tracking application built for those who want to level up their daily routines. By combining classic habit building with RPG-style elements, Streaksmith keeps you motivated to maintain your streaks, earn coins, and unlock exclusive rewards.

---

## ✨ Features

- **Habit Tracking**: Create, manage, and track daily habits with varying difficulties and frequencies.
- **Streaks System**: Never break the chain! Track your current and longest streaks for every habit.
- **Gamification & Rewards**:
  - **Coins**: Earn coins for completing habits and maintaining streaks.
  - **Badges**: Unlock special badges of varying rarities (Common, Rare, Epic, Legendary) as you hit milestones.
  - **Rewards**: Spend your hard-earned coins in the shop to redeem custom rewards.
- **Daily Missions**: Complete randomized daily missions for bonus rewards.
- **Secure Authentication**: Built-in credential auth with secure session management.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Frontend**: React 19, Tailwind CSS v4
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech/))
- **ORM**: [Prisma 7](https://www.prisma.io/) 
- **Package Manager**: [Bun](https://bun.sh/)

## 🏃‍♂️ Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/offsideDebugger/Streaksmith.git
   cd Streaksmith
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Environment Setup:**
   Copy the example environment file and add your Neon PostgreSQL database URL.
   ```bash
   cp .env.example .env
   ```
   *Make sure your `DATABASE_URL` is set in `.env`.*

4. **Database Migration:**
   Generate the Prisma Client and push the schema to your database:
   ```bash
   bun run db:setup
   ```

5. **Start the Development Server:**
   ```bash
   bun run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎮 Hackathon Demo Mode

For quick evaluation during the hackathon, we have implemented a **Demo User Bypass**. You can instantly log into the platform and test out the UI without needing to set up a database or register an account.

To use Demo Mode, go to the login page and use the following credentials:
- **Email:** `demo@demo.com`
- **Password:** `demo`

*(This will bypass database connection checks and initialize a mocked session with 9999 coins for testing purposes).*

---

## 🤝 Contributing

Feedback and contributions are welcome! Feel free to open an issue or submit a pull request.
