# フロントエンドプロジェクト情報

## 技術スタック

- **フレームワーク**: React 19.0.0
- **ビルドツール**: Vite 6.3.1
- **言語**: TypeScript 5.7.2
- **ルーティング**: @tanstack/react-router 1.120.3
- **状態管理**: Redux Toolkit 2.7.0
- **国際化**: i18next 25.0.2
- **テスト**: Jest 29.7.0 + Testing Library
- **UI 開発**: Storybook 8.6.12
- **コード品質**: ESLint + Prettier

## プロジェクト構造

```
dev/frontend/react_app/
├── src/
│   ├── components/     # 共通コンポーネント
│   ├── features/       # 機能別モジュール
│   │   ├── MeetingList/    # 会議リスト機能
│   │   └── __Template__/   # 機能モジュールテンプレート
│   │       ├── api/
│   │       ├── assets/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── stores/
│   │       ├── types/
│   │       └── utils/
│   ├── pages/         # ページコンポーネント
│   ├── routes/        # ルーティング設定
│   ├── stores/        # Redux状態管理
│   ├── hooks/         # カスタムフック
│   ├── utils/         # ユーティリティ
│   ├── types/         # 型定義
│   ├── assets/        # 静的リソース
│   ├── i18n/         # 国際化設定
│   ├── config/       # 設定ファイル
│   ├── test/         # テストファイル
│   └── storybook/    # Storybook設定
├── public/           # 静的ファイル
└── dist/            # ビルド出力
```

## 開発コマンド

- **開発サーバー**: `npm run dev`
- **ビルド**: `npm run build`
- **テスト**: `npm run test`
- **Storybook**: `npm run storybook`
- **Lint**: `npm run lint-check` / `npm run lint-fix`
- **フォーマット**: `npm run format-check` / `npm run format-write`
- **Storybook ファイル生成**: `npm run plop`
