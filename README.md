# Ink

<div align="center">

![Ink Logo](apps/desktop/public/icon.png)

**A Local-First, Extensible Markdown Workspace.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tauri](https://img.shields.io/badge/built_with-Tauri-24C8DB.svg)](https://tauri.app/)
[![React](https://img.shields.io/badge/frontend-React-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6.svg)](https://www.typescriptlang.org/)

[Features](#-features) • [Installation](#-installation) • [Development](#-development) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📖 Introduction

**Ink** is a modern, elegant desktop Markdown editor built for the privacy-conscious and the power user. It combines the fluidity of a block-based editor with the reliability of local file storage.

Powered by the **Stone** engine and wrapped in **Tauri**, Ink delivers native performance with a web-based extensibility model. Whether you are taking quick notes, writing long-form articles, or managing a personal knowledge base, Ink grows with your needs through its plugin architecture.

## ✨ Features

- **🔒 Local-First**: Your data lives on your device. No cloud lock-in, fully offline capable.
- **🧱 Block-Based Editing**: Intuitive drag-and-drop blocks for paragraphs, headers, lists, code, and more.
- **🔌 Extensible Architecture**: Built on the **Stone** engine, supporting custom blocks, widgets, and themes.
- **🎨 Theming**: Built-in support for Light, Dark, GitHub, and Nord themes.
- **🌍 Internationalization**: 
  - English
  - Chinese (Simplified & Traditional)
  - Japanese
  - Korean
  - Spanish
  - Portuguese (Brazil)
- **⚡ Performance**: Written in Rust (Tauri) and TypeScript (React/Lit), optimized for speed.
- **📤 Export**: Export your documents to HTML, PDF, Markdown, Image, or Word.
- **🔍 Global Search**: Fast file and content search.

## 📥 Installation

### Download Binaries

Visit the [Releases](https://github.com/mamahuhu-io/ink/releases) page to download the latest installer for your operating system:

- **macOS** (`.dmg`, `.app`)
- **Windows** (`.msi`, `.exe`)
- **Linux** (`.deb`, `.AppImage`)

## 🛠 Development

### Prerequisites

- **Node.js** (v18 or later)
- **pnpm** (v9.x)
- **Rust** (latest stable)
- **System Dependencies** (for Tauri, see [Tauri Docs](https://tauri.app/v1/guides/getting-started/prerequisites))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mamahuhu-io/ink.git
   cd ink
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build Core Packages**
   Before running the app, ensure core packages are built:
   ```bash
   pnpm build:stone
   ```

### Running the App

To start the development server with hot-reload:

```bash
pnpm tauri:dev
```

This command will start the React dev server and launch the Tauri application window.

### Building for Production

To build the application bundle/installer:

```bash
pnpm tauri:build
```

The output binaries will be located in `apps/desktop/src-tauri/target/release/bundle`.

## 🏗 Architecture

Ink is a **Monorepo** managed by pnpm workspaces.

- **`apps/desktop`**: The main application entry point, built with Tauri and React.
- **`packages/stone`**: The core editor engine.
  - **`stone-core`**: Core logic and state management (Yjs CRDT).
  - **`stone-blocks`**: Standard block implementations (Paragraph, Heading, List, etc.).
  - **`stone-ext-loader`**: Plugin loading and management system.
  - **`stone-theme`**: Theming system.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and request features.

### Localization

Help us translate Ink! Translation files are located in `apps/desktop/src/i18n/locales/`.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by the <a href="https://github.com/mamahuhu-io">Mamahuhu.io</a> team.</sub>
</div>
