# Backend (FastAPI + Uvicorn)

このディレクトリは FastAPI ベースのバックエンドです。`uv` を使用して依存関係管理と実行を行います。

## セットアップ

- 依存関係の同期

```bash
uv sync
```

## 起動

- ホットリロード有効（ENV!=prod）で起動。デフォルトは <http://127.0.0.1:8000>

```bash
uv run python main.py
```

環境変数でホスト/ポートを変更できます。

- `HOST` (default: 127.0.0.1)
- `PORT` (default: 8000)
- `ENV`  (default: dev)  prod の場合はリロード無効

例:

```bash
HOST=0.0.0.0 PORT=9000 uv run python main.py
```

## 動作確認

- ヘルスチェック

```bash
curl http://127.0.0.1:8000/health
```

レスポンス

```json
{"status":"ok"}
```
