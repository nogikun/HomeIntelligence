# Auth Service

## 概要

JWT 認証と Google OAuth2 ID トークン検証機能を提供するサービス。アクセストークンの生成と Google 認証情報の検証を担当する。

## 主要な service の説明

### create_access_token

#### service の概要

JWT アクセストークンを生成する。デフォルトで 30 分の有効期限を設定し、カスタム有効期限も指定可能。

#### 主要なメソッドの説明

**引数:**

- `data` (dict): トークンに含めるペイロードデータ
- `expires_delta` (Optional[timedelta]): カスタム有効期限（省略時は 30 分）

**戻り値:**

- `str`: エンコードされた JWT トークン

### get_id_info

#### service の概要

Google の ID トークンを検証し、ユーザー情報を取得する。Google の公開鍵による署名検証を実行。

#### 主要なメソッドの説明

**引数:**

- `id_token_str` (str): Google の ID トークン文字列

**戻り値:**

- `dict`: 検証済みユーザー情報
- `HTTPException`: 無効なトークンの場合（401 エラー）

#### 設定値

- `SECRET_KEY`: JWT 署名用秘密鍵（ランダム生成）
- `ALGORITHM`: "HS256"
- `ACCESS_TOKEN_EXPIRE_MINUTES`: 30 分

- 依存関係にあるファイル群

- `google.oauth2.id_token`: Google ID トークン検証
- `jose.jwt`: JWT トークン操作
- `fastapi.HTTPException`: エラーハンドリング

## ドキュメント更新履歴

2025-08-03: 初回作成
