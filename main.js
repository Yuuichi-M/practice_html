(() => {
  // 利用するAPI情報元
  //   - 利用するAPI : https://opentdb.com/api.php?amount=10&type=multiple

  const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

  // API_URLを使って実装してもらいたいこと
  //   1. Fetch API(fetchメソッド)を使ってAPI経由でデータを取得する
  //     - https://developer.mozilla.org/ja/docs/Web/API/WindowOrWorkerGlobalScope/fetch
  //   2. fetchメソッドで取得したResponseデータからJSON形式のデータをオブジェクトに変換して次のthenメソッドにデータを渡す
  //     - https://developer.mozilla.org/ja/docs/Web/API/Response
  //   3. 2から受け取ったデータの中に含まれている次のデータをid属性値が `quiz-list` のul要素にリスト表示する
  //     - resultsプロパティ(配列)の中に含まれている10件のデータ(オブジェクト)をforEachで取得する
  //       - 「◯件目のクイズデータ」をli要素として追加する
  //       - buildQuizList関数の戻り値(ul要素のDOM)をli要素に追加する。(結果としてネスト(入れ子)構造のリストになる)



  // `buildQuizList関数` を実装する
  //   - 実装する内容
  //     - 引数で受けとったクイズデータを使ってul要素にクイズ情報を追加する
  //     - クイズ情報を表示する際は以下の仕様で実装する
  //       - 「◯件目のクイズデータ」をli要素として追加する
  //       - クイズデータは「◯件目のクイズデータ」の表示より一段深いネスト(入れ子)でリスト表示にする
  //       - 表示するクイズデータの表示形式は次の通り
  //         - プロパティ名 : プロパティの値
  //       - プロパティ名はstrong要素で囲んで強調する
  //  - 引数
  //    - quiz : オブジェクト(クイズデータ)
  //  - 戻り値
  //    - ul要素のDOM


})();
