# Ink

<div align="center">

![Ink Logo](apps/desktop/public/icon.png)

**A Modern, Local-First, AI-Enhanced Markdown Editor.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tauri](https://img.shields.io/badge/built_with-Tauri-24C8DB.svg)](https://tauri.app/)
[![React](https://img.shields.io/badge/frontend-React-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6.svg)](https://www.typescriptlang.org/)
[![Rust](https://img.shields.io/badge/backend-Rust-000000.svg)](https://www.rust-lang.org/)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Development](#-development) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📖 Introduction

**Ink** is an elegant desktop Markdown editor designed for seamless writing and knowledge management. It marries the fluidity of a modern block-based editor with the privacy and speed of a local-first application.

Built on the robust **Tauri** framework and the extensible **Stone** engine, Ink offers a native experience across macOS, Windows, and Linux. With built-in **AI capabilities** (via the Well engine), Ink helps you write, refine, and organize your thoughts without leaving your editor.

## ✨ Features

- **🔒 Local-First & Private**: Your data resides on your device. Works fully offline with no cloud dependency.
- **🧱 Block-Based Editing**: Effortlessly structure content with drag-and-drop blocks for paragraphs, headers, lists, code, tables, and more.
- **🤖 AI Assistant**: Integrated AI conversational assistant to help draft, summarize, and enhance your writing (powered by **Well**).
- **🔌 Extensible Architecture**:
  - **Plugins**: Extend functionality via the plugin system.
  - **Themes**: Switch between Light, Dark, GitHub, and Nord themes, or create your own.
- **🌍 Global Ready**: Multilingual support including English, Chinese (Simplified/Traditional), Japanese, Korean, Spanish, and Portuguese.
- **⚡ High Performance**: Optimized Rust backend ensures instant startup and low memory footprint.
- **📤 Versatile Export**: Export documents to HTML, PDF, Markdown, Image, or Word formats.
- **🔍 Deep Search**: Instant global search across all your local files and content.

## 📥 Installation

### Download Binaries

Visit the [Releases](https://github.com/mamahuhu-io/ink/releases) page to download the latest installer for your OS:

| Platform    | Format                     |
| ----------- | -------------------------- |
| **macOS**   | `.dmg`, `.app` (Universal) |
| **Windows** | `.msi`, `.exe`             |
| **Linux**   | `.deb`, `.AppImage`        |

## 🚀 Usage

### Quick Start

1.  **Open a Folder**: Launch Ink and open any local folder to start managing your Markdown files.
2.  **Create Note**: Click `+` or use `Cmd/Ctrl + N` to create a new document.
3.  **Insert Blocks**: Type `/` to open the block menu and insert images, code blocks, or dividers.
4.  **AI Assist**: Access the AI assistant panel to get help with your writing context.

## 🛠 Development

### Prerequisites

- **Node.js**: v18 or later
- **pnpm**: v9.x
- **Rust**: Latest stable version
- **OS Dependencies**: See [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) for your platform.

### Setup Guide

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/mamahuhu-io/ink.git
    cd ink
    ```

2.  **Install Dependencies**

    ```bash
    pnpm install
    ```

3.  **Build Core Libraries**
    The editor engine (`stone`) must be built before running the app.

    ```bash
    pnpm build:stone
    ```

4.  **Run in Development Mode**
    Starts the React frontend and Tauri window with hot-reloading.

    ```bash
    pnpm tauri:dev
    ```

5.  **Build for Production**
    Generates the optimized application bundle.
    ```bash
    pnpm tauri:build
    ```
    Artifacts will be in `apps/desktop/src-tauri/target/release/bundle`.

## 🏗 Architecture

Ink uses a Monorepo structure managed by **pnpm workspaces**.

### 📂 Directory Structure

- **`apps/desktop`**: The main application shell built with **Tauri** (Rust) and **React** (TypeScript).
- **`packages/stone`**: The Core Editor Engine.
  - `stone-core`: CRDT-based state management (Yjs) and editor logic.
  - `stone-blocks`: Standard block implementations (Paragraph, Image, List, etc.).
  - `stone-ext-loader`: Plugin and extension loading system.
  - `stone-theme`: Theming and styling primitives.
- **`packages/well`**: The AI & Intelligence Layer.
  - `well-assistant`: Conversational AI logic and session management.
  - `well-core`: Core intelligence utilities.
  - `well-enhance`: Text enhancement and processing features.

## 🤝 Contributing

We love contributions! Whether it's a bug fix, new feature, or documentation improvement.

1.  **Fork** the repository.
2.  **Create a branch** for your feature (`git checkout -b feature/amazing-feature`).
3.  **Commit** your changes (`git commit -m 'Add amazing feature'`).
4.  **Push** to the branch (`git push origin feature/amazing-feature`).
5.  **Open a Pull Request**.

### Localization

Help translate Ink to your language! Locales are located in `apps/desktop/src/i18n/locales/`.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by the <a href="https://github.com/mamahuhu-io">Mamahuhu.io</a> team.</sub>
</div>
