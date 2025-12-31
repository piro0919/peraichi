# Peraichi

シンプルで美しいメモアプリ。余計なものは何もない、ただ書くだけ。

## Features

- **すぐに使える** - アカウント不要ですぐに使える
- **クラウド同期** - ログインすればどこでも同期
- **PWA対応** - オフラインでも快適に使える
- **多彩なテーマ** - 8種類のカラーテーマ（ライト4種・ダーク4種）
- **フォントカスタマイズ** - 5種類のGoogle Fonts対応
- **多言語対応** - 日本語・英語

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Convex](https://www.convex.dev/) - Backend
- [Clerk](https://clerk.com/) - Authentication
- [next-intl](https://next-intl-docs.vercel.app/) - i18n
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Available Scripts

| Command               | Description                          |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Start development server (Turbopack) |
| `npm run build`       | Build for production                 |
| `npm run type-check`  | Run TypeScript type checking         |
| `npm run lint`        | Run ESLint                           |
| `npm run lint:fix`    | Run ESLint with auto-fix             |
| `npm run lint:style`  | Run StyleLint                        |
| `npm run prettier`    | Format code with Prettier            |

## Themes

### Light Themes

- Light (default)
- Sepia - 目に優しい暖色系
- Ocean - 落ち着いたブルー系
- Forest - 自然なグリーン系

### Dark Themes

- Dark (default)
- Midnight - 深いブルーダーク
- Mocha - 暖かみのあるダーク
- Emerald - 深いグリーンダーク

## Fonts

- Noto Sans JP (ゴシック体)
- Noto Serif JP (明朝体)
- Zen Maru Gothic (丸ゴシック)
- Klee One (手書き風)
- Monospace (等幅)

## License

MIT
