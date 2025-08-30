# services ディレクトリ コーディング規約

## ディレクトリの詳細な説明

ビジネスロジックを担当するサービス層。外部 API 連携、認証処理、データ操作などのコア機能を提供する。routers と models の中間に位置し、複雑な処理ロジックを担当する。

## 命名規則

- **ファイル名**: 機能名を snake_case で命名
  - 例: `auth.py`, `user_manager.py`
- **クラス名**: PascalCase
  - 例: `UserManager`
- **関数名**: snake_case で動詞から始める
  - 例: `create_user`, `get_user_by_email`
- **定数**: UPPER_SNAKE_CASE
  - 例: `SECRET_KEY`, `ACCESS_TOKEN_EXPIRE_MINUTES`

## コードの基本構造

- **関数型**: 認証やトークン生成などの単純な処理
- **クラス型**: 状態を持つ複雑なビジネスロジック（データベースセッションなど）
- **型ヒント必須**: パラメータと戻り値に`typing`モジュールを活用

## 関数・クラス設計について

- **単一責任の原則**: 一つの機能に特化
- **依存関係の注入**: クラスの場合は`__init__`で依存関係を注入
  - 例: `def __init__(self, db: Session)`
- **戻り値の明示**: `Optional[Model]`で未取得時の None を明示
- **docstring**: 処理内容を簡潔に記述
  - 例: `"""新規ユーザーの作成（Google OAuth用）"""`

## 例外処理について

- **HTTPException**: HTTP ステータスと詳細を指定
  - 例: `raise HTTPException(status_code=401, detail="Invalid ID token")`
- **データベース例外**: SQLAlchemy 例外をキャッチ
  - 例: `except IntegrityError:`
- **ロールバック処理**: `try-except`内でデータベースのロールバックを実装
  - 例: `self.db.rollback()`
