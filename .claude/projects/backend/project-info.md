# バックエンドプロジェクト情報

## 技術スタック

- **言語**: Python 3.11
- **Web フレームワーク**: FastAPI 0.116.1+
- **パッケージ管理**: uv
- **データベース**: MySQL 8.0
- **ORM**: SQLAlchemy 2.0.42+
- **認証**: Google OAuth (google-auth-oauthlib)
- **JWT**: python-jose
- **WSGI/ASGI**: Uvicorn, Mangum (AWS Lambda 対応)
- **コード品質**: Ruff
- **コンテナ**: Docker

## プロジェクト構造

```
dev/backend/
├── main.py              # エントリーポイント
├── pyproject.toml       # 依存関係とプロジェクト設定
├── config/              # アプリケーション設定
├── routers/             # APIエンドポイントの定義
├── services/            # ビジネスロジック層
├── models/              # データモデル
├── utils/               # 共通ユーティリティ
└── Dockerfile           # Docker設定
```

## 開発コマンド

- **開発サーバー起動**: `uv run uvicorn main:app --reload`
- **コード品質チェック**: `uv run ruff check`

## コーディング規約

各ディレクトリの詳細なコーディング規約は以下を参照してください：

- **[config](.claude/projects/backend/rules/config.md)** - アプリケーション設定とコンフィグ管理
- **[models](.claude/projects/backend/rules/models.md)** - データモデルと ORM 定義
- **[routers](.claude/projects/backend/rules/routers.md)** - API ルーティングとエンドポイント定義
- **[services](.claude/projects/backend/rules/services.md)** - ビジネスロジックとサービス層
- **[utils](.claude/projects/backend/rules/utils.md)** - 共通ユーティリティとヘルパー関数
