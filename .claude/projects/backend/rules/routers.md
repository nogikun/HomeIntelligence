# routers ディレクトリ コーディング規約

## ディレクトリの詳細な説明

FastAPI の API ルーティングを定義するレイヤー。HTTP リクエストを受け取り、適切なサービス層に処理を委譲し、レスポンスを返す。コントローラー層として機能し、API エンドポイントの入口となる。

## 命名規則

- **ファイル名**: 機能名を snake_case で命名
  - 例: `auth.py`
- **エンドポイント関数名**: HTTP メソッド + 処理内容を snake_case で
  - 例: `request_show_google_login_page`, `callback`
- **ルーター変数**: `router = APIRouter()`で統一

## コードの基本構造

- **APIRouter インスタンス**: `router = APIRouter()`で作成
- **デコレータ**: HTTP メソッドとパスを指定
  - 例: `@router.get("/login")`
- **依存関係注入**: FastAPI の`Depends`を活用
  - 例: `db: Session = Depends(get_db)`
- **型ヒント必須**: リクエスト・レスポンス型を明示

## 関数・クラス設計について

- **単一責任の原則**: 各エンドポイント関数は単一の責任を持つ
- **詳細な docstring**: API 仕様を記述（Args、Returns を含む）
- **ビジネスロジックの分離**: 処理は services レイヤーに委譲
- **レスポンス形式の統一**: `RedirectResponse`, `JSONResponse`等を使用

## 例外処理について

- **バリデーションエラー**: 適切な HTTP ステータスコード（400 等）を返す
- **エラーレスポンス**: `JSONResponse`でエラー内容を日本語で返す
  - 例: `JSONResponse(content={"error": "認可コードが見つかりません"}, status_code=400)`
- **認証・認可エラー**: 401（認証）、403（認可）で統一
