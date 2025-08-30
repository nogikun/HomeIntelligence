Issue #$ARGUMENT の内容を確認して作業着手してください。

## ルール

- ブランチ名は`feature/0.3.0/Issue番号/作業内容`にして下さい。
- コミットタスクは`.claude/commands/git/commit.md`を参照してください。
- Pull Request タスクは`.claude/commands/git/pull-request.md`を参照してください。
- frontend のタスクの場合、ドキュメント作成タスクは`.claude/commands/tasks/make-frontend-documents.md`を参照してください。
- backend のタスクの場合、ドキュメント作成タスクは`.claude/commands/tasks/make-backend-documents.md`を参照してください。
- database のタスクの場合、ドキュメント作成タスクは`.claude/commands/tasks/make-database-documents.md`を参照してください。
- postman のリクエスト作成タスクは`.claude/tasks/make-postman.md`を参照してください。
- 作成したドキュメントは`.claude/projects/*/project_info.md`にドキュメントのタイトルとドキュメントまでの Path を追記してください。
- タスクが 3 回連続で失敗した場合、失敗した旨をユーザーに伝え、支持を仰いでください。
- backend のプロジェクト説明は`.claude/projects/backend/project-info.md`にあります。
- backend のコーディング規約は`.claude/projects/backend/rules`ディレクトリにあります。
- frontend のプロジェクト説明は`.claude/projects/frontend/project-info.md`にあります。
- frontend のコーディング規約は`.claude/projects/frontend/coding_role.md`にあります。
- backend のルートを作成・更新した場合、postman のリクエスト作成タスクをコーディング作業後に追加する。

## 作業手順

- Issue の情報からどのディレクトリにどのように作成すればよいかドキュメントやコーディング規約を参考に手順を考察してください。
- ユーザーに作業手順を必ずレビューしてもらってください。
- どのように作業するかを Issue コメントに箇条書きで入力してください。
- 最新の`development/0.3.0` ブランチから Issue 用のブランチを切って作業開始してください。
- コーディングはドキュメントや関連コードを参考に丁寧に記載してください。
- 作業終了後、ユーザーからレビューをもらってください。
- レビュータスク終了後、ドキュメント作成のタスクに移行してください。
- ドキュメント作成後、コミットタスクに移行してください。
- 作業完了後は対応内容を Issue コメントに入力して、Pull Request タスクに移行してください。
