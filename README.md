# isotter-front
シンプルなツイッター風SNSアプリです。  
React, Redux, Node.js, Mongo.dbの学習用として作成しました。  
アプリURL： https://isotter.netlify.app/

## デモ（ゲストログイン）
ID: guest
Pass: 111111

## ツイッター風SNSアプリ
アプリは、こちらのクライアントサイドリポジトリと、  
サーバーサイドのリポジトリ（https://github.com/kazu150/isotter-back ）にて構成。  
アプリの概要はこちらのREADMEに記載する。

## 使用技術
Client Side
- React (classコンポーネント)
- Redux
- Redux-thunk
- React-router
- Semantic-ui
- Netlify(Hosting先)

Server Side
- Node.js
- express
- Mongo.db
- Mongoose
- Heroku(Hosting先)

## アプリ仕様
- メールアドレスでのユーザー登録機能
- メールアドレスの認証機能
- メールアドレスでのパスワード再設定機能
- プロフィールの登録・修正機能、プロフィールアイコン機能
- メッセージ投稿機能
- 自分が投稿したメッセージの削除機能
- 各種バリデーション

## 環境設定
1. Gitをクローン
2. npm iを実行
3. npm run start:devを実行
