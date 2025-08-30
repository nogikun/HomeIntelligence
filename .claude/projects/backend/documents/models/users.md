# Users

## 概要

SQLAlchemy を使用したユーザー情報管理のためのデータベースモデル。Google OAuth2 認証によるユーザー登録・管理機能を提供する。

## モデルのアーキテクチャ

### テーブル名

`users`

### フィールド構成

- **user_uuid** (String(64), Primary Key): ユーザーの一意識別子、UUID v4 形式で自動生成
- **name** (String(255), Not Null): ユーザー名
- **email** (String(100), Unique, Not Null): メールアドレス（一意制約あり）
- **is_deleted** (Boolean, Default: False): 論理削除フラグ
- **created_at** (DateTime): 作成日時（自動設定）
- **updated_at** (DateTime): 更新日時（自動更新）

### 特徴

- SQLAlchemy declarative_base を継承
- UUID による主キー管理
- 論理削除対応
- タイムスタンプ自動管理

## 依存関係にあるファイル

- `sqlalchemy`: ORM 機能
- `uuid`: UUID 生成
- `services/user_manager.py`: ユーザー操作ビジネスロジック

## ドキュメント更新履歴

2025-08-03: 初回作成
