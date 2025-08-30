# Database Utility

## 概要

SQLAlchemy を使用したデータベース接続とセッション管理機能を提供するユーティリティモジュール。MySQL データベースへの接続設定とセッション生成を担当する。

### データベース接続設定

**DATABASE_URL**: `mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}`

- MySQL + PyMySQL ドライバーを使用
- 設定値は`config/config.py`から取得

**engine**: SQLAlchemy エンジンオブジェクト

- データベース接続プールの管理

**SessionLocal**: セッションメーカー

- autocommit=False: 手動コミット制御
- autoflush=False: 手動フラッシュ制御

### 関数

**get_db() -> Generator[Session, None, None]**

- データベースセッションのジェネレーター関数
- FastAPI の依存性注入で使用
- セッションの自動クリーンアップ（finally 節）
- リソースリークを防止

### 使用パターン

```python
# FastAPI エンドポイントでの使用例
def endpoint(db: Session = Depends(get_db)):
    # データベース操作
    pass
```

## ドキュメント更新履歴

2025-08-03: 初回作成
