# Main Application

## 概要

FastAPI アプリケーションのエントリーポイント。アプリケーションの初期化、ミドルウェア設定、ルーター登録、AWS Lambda 対応を実装する。

### アプリケーション構成

#### FastAPI アプリケーション

- **app**: FastAPI インスタンス
- CORS 設定により React フロントエンドからのアクセスを許可

#### CORS 設定

- **allow_origins**: フロントエンドドメイン（`http://localhost:5173`）のみ許可
- **allow_credentials**: `True` - 認証情報付きリクエストを許可
- **allow_methods**: `["*"]` - 全 HTTP メソッドを許可
- **allow_headers**: `["*"]` - 全ヘッダーを許可

#### ルーター設定

- **auth_router**: 認証関連 API（`/api/v1/auth`プレフィックス）
- タグ: `["認証"]` - Swagger UI でのグループ化

#### エンドポイント

- **GET /api/v1/hello**: ヘルスチェック用エンドポイント
  - レスポンス: `{"message": "Hello from FastAPI!"}`

#### AWS Lambda 対応

- **handler**: Mangum ラッパーにより Lambda 関数として実行可能
- サーバーレス環境での動作を可能にする

### 依存関係

- `fastapi`: Web フレームワーク
- `fastapi.middleware.cors`: CORS 対応
- `mangum`: AWS Lambda アダプター
- `config/config.py`: 設定値管理
- `routers/auth.py`: 認証ルーター

## ドキュメント更新履歴

2025-08-03: 初回作成
