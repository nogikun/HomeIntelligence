# User Manager Service

## 概要

ユーザー管理に関するビジネスロジックを提供するサービスクラス。Google OAuth 認証によるユーザー作成、メールアドレスと UUID によるユーザー検索機能を実装。

## 主要な service の説明

### UserManager クラス

#### service の概要

データベースセッションを管理し、ユーザーの CRUD 操作を提供するサービスクラス。

#### 主要なメソッドの説明

****init**(self, db: Session)**

- データベースセッションを初期化

**create_user(self, email: str, user_name: str = None) -> Optional[Users]**

- 新規ユーザーの作成（Google OAuth 用）
- user_name が未指定の場合、email の@より前の部分を使用
- 重複エラー時は None を返却し、ロールバック実行

**get_user_by_email(self, email: str, include_deleted: bool = False) -> Optional[Users]**

- メールアドレスによるユーザー検索
- 論理削除されたユーザーの含有可否を制御

**get_user_by_uuid(self, uuid: str, include_deleted: bool = False) -> Optional[Users]**

- UUID によるユーザー検索
- 論理削除されたユーザーの含有可否を制御

#### エラーハンドリング

- IntegrityError 発生時の自動ロールバック
- 重複制約違反の適切な処理

- 依存関係にあるファイル群

- `models/users.py`: Users モデル
- `sqlalchemy.orm.Session`: データベースセッション管理
- `sqlalchemy.exc.IntegrityError`: 整合性制約エラー

## ドキュメント更新履歴

2025-08-03: 初回作成
