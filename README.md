## JavaScript で特定の要素を削除、子要素を全削除する

### 【DOM】特定の子要素の削除

- parentNode.removeChild(子要素 ID);

```html
<ul>
  <li id="item1">アイテム1</li>
  <li id="item2">アイテム2</li>
</ul>
```

```JS
const itemElement = document.getElementById('item1');
itemElement.parentNode.removeChild(itemElement);

//指定したIDを持つ子要素が削除される
```

<br />

### 【DOM】全ての子要素を削除

- 「while」「firstChild」を組み合わせる

```html
<ul id="item-container">
  <li>アイテム1</li>
  <li>アイテム2</li>
  <li>アイテム3</li>
</ul>
```

```JS
const ulElement = document.getElementById('item-container');

//ul要素の最初の子要素を指定
while( ulElement.firstChild ) {
  //ul要素の最初の子要素がなくなるまで削除
  ulElement.removeChild(ulElement.firstChild);
}
```

<br />

## 【エクササイズ】DOM の新規作成・追加・削除・全削除をする

```JS
/**
 * 課題1: id属性値が `main` のdiv要素にul要素を追加する
 */
const ulElement = document.createElement('ul');
const mainDivElement = document.getElementById('main');
mainDivElement.appendChild(ulElement);

/**
 * 課題2: 課題1で作成したul要素に5つのli要素(DOM)を追加する
 *   - forループを使って5つのli要素(DOM)を追加すること
 *   - li要素(DOM)には先頭から次のテキストをセットする(textContentを使うこと)
 *     1. アイテム1
 *     2. アイテム2
 *     3. アイテム3
 *     4. アイテム4
 *     5. アイテム5
 */

for(let i = 1; i <= 5; i++) {
  const liElement = document.createElement('li');
  liElement.textContent = `アイテム${i}`;
  ulElement.appendChild(liElement);
}

/**
 * 課題3: 課題2で作成した5つのli要素の内、先頭から4番目(アイテム4)の要素を削除する
 *   - ヒント: DOMのchildrenプロパティが使える
 *     - https://developer.mozilla.org/ja/docs/Web/API/ParentNode/children
 */

const targetElement = ulElement.children[3];
ulElement.removeChild(targetElement);


/**
 * 課題4: id属性値が `remove-all-items` のul要素内の全てのli要素を削除する
 *   - ul要素は削除しないこと
 */

const itemsElement = document.getElementById('remove-all-items');

while(itemsElement.firstChild) {
  itemsElement.removeChild(itemsElement.firstChild);
}
```

<br />

## 【JavaScript】DOM をクリックしたときの処理を実装する

### クリックイベント

```html
<h1 id="clickable1">h1要素</h1>
<p id="clickable2">p要素</p>
```

```JS
h1Element.addEventListener('click', (event) => {
  console.log('h1をクリック');
});

pElement.addEventListener('click', (event) => {
  console.log('pをクリック');
})
```

<br />

### 少し高度なクリックイベント実装(if で各要素のイベントを定義)

- html は上と同様

```JS
const h1Element = document.getElementById('clickable1');
const pElement = document.getElementById('clickable2');

const onClick = (event) => {
  if (event.target === h1Element) {
    console.log('h1要素です!!');
  } else if (event.target === pElement) {
    console.log('p要素です!!');
  }
};

h1Element.addEventListener('click', onClick);

pElement.addEventListener('click', onClick);
```

<br />

## 【JavaScript】DOM を使って入力ボックスの値を操作する

- 「value」プロパティを使った値の取得・上書き

```html
<div>入力ボックス</div>
<input id="textbox" type="text" />
<button id="output">出力</button>
```

```JS
const textBox = document.getElementById('textbox');
const outputButton = document.getElementById('output');

outputButton.addEventListener('click', (event) => {
  //入力ボックス内のテキストを出力する(=値の取得)
  console.log('textBoxの中身 : ', textBox.value);

  //ボタン押下後、入力ボックス内のテキストを空にする(=値の上書き)
  textBox.value = '';
});
```

## 【エクササイズ】DOM 操作をして Todo リストを作成する

```html
<h1>Todoアプリ</h1>
<div>
  <label for="input-todo-box">Todoタスクの入力</label>
  <input id="input-todo-box" type="text" />
  <button id="add-button">追加</button>
</div>

<h2>現在のTodoリスト</h2>
<ul id="todo-list"></ul>
```

```JS
// グローバル空間に変数や関数をセットしないために即時関数で閉じ込めている
(() => {
  // 入力したTodoタスクの一覧を保持する配列を定義する
 const todos = [];

  // HTMLのID値を使って以下のDOM要素を取得する
  //   - テキストボックス(input[type="text"])
  //   - 追加ボタン(button要素)
  //   - Todoリストを一覧表示するul要素

  const inputBox = document.getElementById('input-todo-box');
  const addButton = document.getElementById('add-button');
  const listContainer = document.getElementById('todo-list');

  //「追加」ボタンがクリックされたときの処理を実装する
  //   - テキストボックスに入力されたテキストをTodoリスト一覧に追加する
  //   - テキストボックスの中を空にする

  addButton.addEventListener('click', (event) => {
    const todo = inputBox.value; //入力値取得
    inputBox.value = '';

    //todoに入力値が追加された場合に、配列(todos)に入力値をプッシュ(格納)
    //その後、Todo一覧に表示させる
    if (todo) {
      todos.push(todo);
      showTodos();
    }
  });


  // 「todos」の中身を一覧表示する
  //    - ul要素にli要素を追加して、li要素内にtodoタスクの内容を表示する
  //    - li要素内に削除ボタンを配置して、削除ボタンをクリックしたら対応するタスクを削除する

  const showTodos = () => {
    //todoリストに値が追加されるたびに追加した値を一旦削除する。
    //重複で追加されていくのを防ぐ為
    while(listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }

    todos.forEach((todo, index) => {
      const todoItem = document.createElement('li'); //li要素追加
      const taskNumber = index + 1; //タスク番号

      //todo表示(作成したliにテキストを定義)
      todoItem.textContent = `${taskNumber} : ${todo}`;
      listContainer.appendChild(todoItem); //todoリストにtodo(li)を追加

      //削除ボタン
      const deleteButton = document.createElement('button'); //li要素の末尾にボタン追加
      deleteButton.textContent = '削除'; //削除テキスト追加
      todoItem.appendChild(deleteButton);

      //削除処理
      deleteButton.addEventListener('click', (event) => {
        //deleteTodoを呼び込む
        deleteTodo(index);//インデックス番号を渡す
      })
    });
  };

  // Todo情報を表すli要素(showTodo関数で作成される要素)の中にある削除ボタンをクリックしたら実行される。
  //   - todosから対応するtodo情報を削除する
  //   - 引数はindexを受け取る(インデックス番号)
  //   - 削除後はshowTodosを実行して、Todoリストを整理する
const deleteTodo = (index) => {
  todos.splice(index, 1);
  showTodos();
}

})();

```

# 非同期処理

## 【JavaScript】setTimeout を使った非同期処理

- 何秒後に処理を実装したいか
- 1000 ミリ秒 === 1 秒、5000 ミリ秒 === 5 秒

```JS
setTimeout(コールバック関数, ミリ秒);
```

```JS
setTimeout(() => {
  console.log('3番目に処理される');
}, 1000)

setTimeout(() => {
  console.log('2番目に処理される');
}, 0)

console.log('1番目に処理される');
```

## 【エクササイズ】setTimeout が実行される順番の理解をする

```JS
// 課題: console.logで出力される数の順番を答える

console.log(1);

setTimeout(() => {
  setTimeout(() => {
    console.log(2);
  }, 0);
  console.log(3);
}, 100);

console.log(4);

 // 50 + 40　で(2+3)より早いため先に実行(外の処理から実行されるので6 → 5)
setTimeout(() => {
  setTimeout(() => {
    console.log(5);
  }, 40);
  console.log(6);
}, 50);

console.log(7);

// 以下にconsole.logで出力される数をコメントで記述してください。(解答後の答えはこのmain.jsを実行して確認してください。)

// 1, 4, 7, 6, 5, 3, 2

```

## 【JavaScript】Promise で非同期を実装するメリット

- 非同期処理の実装に便利なオブジェクト
- コールバック地獄を軽減する

- コールバック地獄(下のコード)

```JS
setTimeout(() => {
    console.log('1つ目の出力');
    setTimeout(() => {
        console.log('2つ目の出力');
        setTimeout(() => {
            console.log('3つ目の出力');
            setTimeout(() => {
                 console.log('4つ目の出力');
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000);

```

- Promise を使った実装

```JS
const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('１回目');
    resolve();
  }, 1000);
});
promise.then(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('2回目');
      resolve();
    }, 1000);
  });
})
.then(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('3回目');
      resolve();
    }, 1000);
  });
});

```

## 【JavaScript】Promise オブジェクトを作成する

- 「new Promise()」で Promise オブジェクトが作れる
- 引数にコールバック関数をセットできる

  - 第 1 引数 : **resolve** (コールバック関数)

    - 処理が一通り完了したら実行する(特にエラーがない場合)
      - 引数に値を渡すと「then」メソッド経由で値えを受け取る

  - 第２引数 : **reject**(コールバック関数)
    - 例外を発生させたい時に実行(何かしらのエラーが起きた時)
      - 引数に値を渡すと「catch」メソッド経由で値を受け取る

```JS
const resolvePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('then経由で渡す値');
  }, 1000);
});
resolvePromise
  .then(data => { console.log('①then : ', data); })
  .catch(error => { console.log('①catch : ', error); });

const rejectPromise = new Promise((resolve, reject) => {
  //例外を発生させたい場合はrejectを実行
  setTimeout(() => {
    reject('catch経由で受け取る');
  }, 1000);
});
rejectPromise
  .then(data => { console.log('②then : ', data); })
  .catch(error => { console.log('③catch : ', error); });

/**
 * ①then :  then経由で渡す値
 * ③catch :  catch経由で受け取る
*/
```

<br />

### Promise.resolve(), Promise.reject()

- 「Promise.resolve(1)」は以下のコードの省略

```JS
  new Promise((resolve, reject) => {
    resolve(1);
  });
```

- 「Promise.reject(1)」は以下のコードの省略形

```JS
new Promise((resolve, reject) => {
  reject(1);
});
```

```JS
const resolvePromise = Promise.resolve(1);
resolvePromise
  .then(data => { console.log('①then : ', data); })
  .catch(error => { console.log('①catch : ', error); });

  const rejectPromise = Promise.reject(1);
rejectPromise
  .then(data => { console.log('②then : ', data); })
  .catch(error => { console.log('②catch : ', error); });

// ①then :  1
// ②catch :  1

```

## 【JavaScript】Promise の then メソッドの使い方

- Promise オブジェクトは then メソッドを持つ
- then メソッドは戻り値も Promise オブジェクトである
- つまり、then メソッドを連続で記述することができる(メソッドチェーン)
-

```JS
// thenメソッドはPromiseオブジェクトを戻り値とするため、
// 受け取った戻り値に対してさらにthenメソッドをつなげる事ができる。
// (いつまでもつなげる事ができる)
const promise1 = Promise.resolve(1);
promise1.then(() => {}).then(() => {console.log('promise1の最後のthen');});

// メソッドチェーンを書くときは以下のようにインデントを
// 1段下げて、メソッド毎に改行すると読みやすくなる
const promise2 = Promise.resolve(2);
promise2
  .then(() => {})
  .then(() => {console.log('promise2の最後のthen');});
```

<br />

- 非同期関数を使った時 ↓
- then メソッド内で非同期処理を実装したい場合は<br />
  then メソッド内で return new Promise((resolve, reject) => {}とする

```JS
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(999);
  }, 1000);
});
// 999を次のthenの引数に渡す

promise
  .then((value) => {
    console.log('1つ目のthenの引数 : ', value);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1000);
      }, 1000);
    });
  })
  // 1000を次のthenの引数に渡す
  .then((value) => {
    console.log('2つ目のthenの引数 : ', value);
  });

/**
 * //各1秒後に表示
 * 1つ目のthenの引数 :  999
 * 1つ目のthenの引数 :  1000
 */

```

## 【JavaScript】Promise の catch メソッドの使い方

- Promise オブジェクトは catch メソッドを持つ
- catch メソッドは１番最後にセットするのが一般的
  (全ての then メソッドの後に記述する)
- reject 関数を実行したら全ての then メソッドは無視されて、
  catch メソッドまでスキップする。

```JS
const promise = new Promise((resolve, reject) => {
  reject(new Error('何かしらエラーを渡す'));
});
promise
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .catch((error) => {
    //reject(new Error('何かしらエラーを渡す'))の引数が返る
    console.log(error.message)
  });

//　何かしらエラーを渡す
```

<br />

### then メソッド内で例外処理を発生させた場合の catch の挙動

- then メソッド内で throw を使う

```JS
const promise = Promise.resolve(1);
promise
  .then(() => {
    console.log(1)
  })
  .then(() => {
    //throw以降のthenが全て省略されてcatchに飛ぶ
    throw 'errorです'
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .catch((error) => {
    //'errorです'がerrorに返る
    console.log(error, 'ここ')
  });

  /**
   * 1
   * errorです ここ
   */
```

- throw を使う一例
  - 意図しない値を取得したとき
  - API 通信がうまくいかなかった時

## エクササイズ】Promise を使って Todo アプリを作成する

```JS
// グローバル空間に変数や関数をセットしないために即時関数で閉じ込めている
(() => {
  // - 入力したTodoタスクの一覧を保持する配列を定義する
  //   - 変数名は `todos` とする
  const todos = [];

  // - HTMLのID値を使って以下のDOM要素を取得する
  //   - テキストボックス(input[type="text"])
  //   - 追加ボタン(button要素)
  //   - Todoリストを一覧表示するul要素

  const inputBox = document.getElementById('input-todo-box');
  const addButton = document.getElementById('add-button');
  const listContainer = document.getElementById('todo-list');

  // `pickupTodoFromTextBox関数` を実装する
  // - 実現したい機能
  //   - `input[type="text"]`から文字列を取得する
  //   - 文字列を取得した後は`input[type="text"]`を空にする
  // - 引数
  //   - 無し
  // - 戻り値
  //   - `input[type="text"]`から取得した文字列を返す

  const pickupTodoFromTextBox = () => {
    const todo = inputBox.value;
    inputBox.value = '';

    return todo;
  }

  // `validateTodo関数` を実装する
  // - 実現したい機能
  //   - テキストが空の時は「何も入力されていません」という文字列をErrorオブジェクトにセットして例外として投げる
  //   - 既に同名のタスクがある場合は「同じ名前のタスクは既に作成されています」という文字列をErrorオブジェクトにセットして例外として投げる
  // - 引数
  //   - todo : 文字列を受け取る。
  // - 戻り値
  //   - 引数で受け取ったtodoをそのまま返す

  const validateTodo = (todo) => {
    if (!todo) {
      //エラー分 -> throw new Error();
      throw new Error('何も入力されていません');
    }

    //同名タスクのチェック
    //入力されたtodoと追加ずみのtodoをチェックして一件でも
    //同じものはあれば、length(1)とカウント
    const duplicatedTodos = todos.filter((_todo) => {
      return todo === _todo;
    });

    //重複タスクが1以上の場合
    if (duplicatedTodos.length > 0) {
      throw new Error('同じ名前のタスクは既に作成されています');
    }

    return todo;
  }

  // `addTodo関数` を実装する
  // - 実現したい機能
  //   - 引数に受け取ったTodoを配列todosに追加する
  // - 引数
  //   - todo
  // - 戻り値
  //   - 無し
const addTodo = (todo) => {
  todos.push(todo);
};

  // `showTodos関数` を実装する
  // - 実現したい機能
  //   - Todoタスクの一覧を表示している要素を全削除する
  //   - 全削除後、todosに格納されているタスク一覧を表示する
  //   - 各タスクの右に削除ボタンを配置する
  //   - 削除ボタンをクリックしたら後述の「promiseTaskOfDeletingTodo関数」実行する
  // - 引数
  //   - 無し
  // - 戻り値
  //   - 無し

  const showTodos = () => {
    //一覧全削除
    while( listContainer.firstChild ) {
      listContainer.removeChild(listContainer.firstChild);
    }

    todos.forEach((todo, index) => {
      const todoItem = document.createElement('li');
      const taskNumber = index + 1;
      todoItem.textContent = `${taskNumber} : ${todo} `;
      listContainer.appendChild(todoItem);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = '削除';
      todoItem.appendChild(deleteButton);

      deleteButton.addEventListener('click', (event) => {
        //削除処理
        promiseTaskOfDeletingTodo(index);
      })
    });
  };

  // `deleteTodo関数` を実装する
  // - 実現したい機能
  //   - 配列todosから対応するtodo情報を削除する
  // - 引数
  //   - index : 配列から削除したい要素のインデックス番号

  const deleteTodo = (index) => {
    //splice -> 削除
    todos.splice(index, 1);
  }

  // `promiseTaskOfAddingTodo関数を実装する`
  // - 実現したい機能
  //   - Promiseを使って以下のフローを実現する
  //     - Promise.resolveメソッドでPromiseオブジェクトを作成する
  //     - Promiseのthenにここまでに実装した関数をセットする。(メソッドチェーンの形式実装する)
  //       - 関数をセットする順番は以下の通り
  //         ①. `input[type="text"]` を取得する関数
  //         ②. ①で取得した文字列が配列todosに追加しても良いか事前に検証する関数
  //         ③. ②の検証を通過したタスクを配列todosに追加する関数
  //         ④. ③で配列todosにタスクを追加した後にWebページ上にタスク一覧を表示する関数
  //     - ②の検証で例外が発生したときに、Promiseのcatchを使ってエラーオブジェクトを受け取りメッセージ内容をアラート表示する
  // - 引数
  //   - 無し
  // - 戻り値
  //   - 無し

  const promiseTaskOfAddingTodo = () => {
    Promise
      .resolve()
      //①. `input[type="text"]` を取得する関数
      .then(pickupTodoFromTextBox)
      //②. ①で取得した文字列が配列todosに追加しても良いか事前に検証する関数
      .then(validateTodo)
      //③. ②の検証を通過したタスクを配列todosに追加する関数
      .then(addTodo)
      //一覧を取得
      .then(showTodos)
      //②の検証で例外が発生したときに、Promiseのcatchを使ってエラーオブジェクトを受け取りメッセージ内容をアラート表示する
      //問題があればvalidateTodoで定義したメッセージを表示
      .catch((error) => {
        alert(error.message);
      });
  }

  // `promiseTaskOfDeletingTodo関数を実装する`
  // - 実現したい機能
  //   - Promiseを使って以下のフローを実現する
  //     - Promise.resolveメソッドでPromiseオブジェクトを作成する。その際にresolveに引数indexを渡す
  //     - Promiseのthenにここまでに実装した関数をセットする(メソッドチェーンの形式実装する)
  //       - 関数をセットする順番は以下の通り
  //         ①. 配列todosから指定した要素を削除する関数
  //         ②. ①で配列todosから指定したタスクを削除した後にWebページ上にタスク一覧を表示する関数
  // - 引数
  //   - index : 配列から削除したい要素のインデックス番号
  // - 戻り値
  //   - 無し

  const promiseTaskOfDeletingTodo = (index) => {
    Promise
      .resolve(index)
      .then((_index) => {
        deleteTodo(_index);
        showTodos();
      });
  };

  // 追加ボタンをクリックしたら `promiseTaskOfAddingTodo` を実行する
  addButton.addEventListener('click', (event) => {
    promiseTaskOfAddingTodo();
  });
})();
```

## 【JavaScript】fetch を使って外部データを取得する

- サーバーとデータのやり取りができる機能

  - API 経由でサーバーからデータを取得する

    - タイムラインの取得、ユーザー情報取得

  - API 経由でサーバーにデータを送る
    - 新規登録、ログイン情報の送信、ツイート内容の送信

- fetch メソッドの戻り値は Promise
- JS0N 形式のデータの所得

```JS
// 例: クイズ情報を取得できうAPIを利用
fetch('https://opentdb.com/api.php?amount=10')
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
  });
```
