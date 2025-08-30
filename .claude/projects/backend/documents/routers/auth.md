# Auth Router

## 概要

Google OAuth2 を使用した認証機能を提供する API ルーター。ログイン画面表示とコールバック処理により、ユーザー認証を実現する。

## 主要な API の説明

### GET /login

#### API の概要

Google OAuth2 のログイン画面への認証要求を実行し、Google の認証 URL にリダイレクトする。

#### 引数の型

- なし（void）

#### 戻り値の型

- `RedirectResponse`: Google の認証 URL へのリダイレクト

### GET /google-oauth/callback

#### API の概要

Google からの認証コールバックを処理し、認可コードからアクセストークンを取得してフロントエンドにリダイレクトする。

#### 引数の型

- `request` (Request): FastAPI リクエストオブジェクト
- `db` (Session): データベースセッション（依存性注入）

#### 戻り値の型

- `RedirectResponse`: フロントエンドへのリダイレクト（認証情報付き）
- `JSONResponse`: エラー時のレスポンス

#### 依存関係にあるファイル群

- `config/config.py`: Google OAuth 設定値
- `utils/database.py`: データベースセッション管理
- `services/auth.py`: JWT トークン生成・ID トークン検証
- `services/user_manager.py`: ユーザー管理機能（現在コメントアウト）

## ドキュメント更新履歴

2025-08-03: 初回作成
