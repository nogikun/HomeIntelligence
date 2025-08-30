# models ディレクトリ コーディング規約

## ディレクトリの詳細な説明

- SQLAlchemy を使用した ORM（Object-Relational Mapping）モデルを定義
- データベーステーブルと Python クラスの対応付けを管理
- 各テーブルに対応する単一の Python ファイルを配置

## 命名規則

- **ファイル名**: テーブル名の複数形（例：`users.py`）
- **クラス名**: テーブル名の単数形、パスカルケース（例：`Users`）
- **テーブル名**: 小文字、複数形（例：`users`）
- **カラム名**: スネークケース（例：`user_uuid`, `created_at`）
- **主キー**: `{テーブル名単数形}_uuid`の形式（例：`user_uuid`）

## コードの基本構造

```python
from sqlalchemy import Column, String, Boolean, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class ModelName(Base):
    __tablename__ = "table_name"

    # 主キー（UUID）
    primary_key_uuid = Column(String(64), primary_key=True, default=lambda: str(uuid.uuid4()))

    # 必須フィールド
    required_field = Column(String(255), nullable=False)

    # 必要に応じて追加するフィールド
    is_deleted = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<ModelName(primary_key='{self.primary_key}', identifier='{self.identifier}')>"
```

## 関数・クラス設計について

- **必須メソッド**: `__repr__`メソッドを実装し、主キーと識別用フィールドを表示
- **主キー**: UUID4 を使用し、String(64)で定義
- **デフォルト値**: タイムスタンプは`func.now()`を使用

## 例外処理について

- モデルクラス自体では例外処理は行わない
- 例外処理はサービス層（`services/`）で実装
- `IntegrityError`などのデータベース関連例外はサービス層で処理
