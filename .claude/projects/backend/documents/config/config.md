# Configuration

## 概要

アプリケーション全体で使用される設定値を定義する設定モジュール。API、データベース、フロントエンド、Google OAuth2 の各種設定値を一元管理する。

### 設定項目

#### Router 設定

- **BASE_API_V1**: `/api/v1` - API ベースパス

#### Database 設定

- **DB_USER**: `admin` - データベースユーザー名
- **DB_PASSWORD**: `root` - データベースパスワード
- **DB_HOST**: `localhost:3306` - データベースホスト・ポート
- **DB_NAME**: `discussdb` - データベース名

#### Frontend 設定

- **FRONT_DOMAIN**: `http://localhost:5173` - フロントエンド URL（React 開発サーバー）

#### Google OAuth2 設定

- **APP_DIR**: アプリケーションルートディレクトリのパス
- **GOOGLE_CLIENT_SECRET_FILE**: Google OAuth2 クライアント秘密ファイルのパス
- **REDIRECT_URI**: `http://localhost:8000/api/v1/auth/google-oauth/callback` - OAuth2 コールバック URL
- **SCOPES**: Google OAuth2 で要求するスコープ
  - `openid`: OpenID Connect
  - `https://www.googleapis.com/auth/userinfo.email`: メールアドレス取得
  - `https://www.googleapis.com/auth/userinfo.profile`: プロフィール情報取得

### 特徴

- 設定値のハードコーディング（開発環境用）
- パスの動的構築（`Path(__file__).resolve()`使用）
- Google OAuth2 の必要スコープを明確に定義

## ドキュメント更新履歴

2025-08-03: 初回作成
