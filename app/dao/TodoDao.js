//DAO Data Access Object データ アクセス オブジェクト
//特定クラスのオブジェクトとDBとの間を取り持つクラスです。
class TodoDao {

    //データベースとの接続が必要
    constructor(connection) {
        this._con = connection;
    }

    //未完了のTODOを取得する
    fetchAllOpenTodo(){

        return new Promise((resolve, reject) => {

            this._con.transaction(tx => {

                tx.executeSql(

                    //SQLコマンド
                    'SELECT * FROM todo WHERE status = 0;',
                    
                    //パラメーター
                    [],
                    
                    //成功したとき
                    (tx, result) => {
                        //データベースにあるTODOを保持しておくためのarray
                        let todoList = [];

                        //SELECTの結果の一行一行順番に処理していく
                        for(let i = 0; i < result.rows.length; i++) {
                            let data = result.rows.item(i);
                            
                            //一行のデータをTodoobjectに変換してtodoListに入れる
                            todoList.push(
                                new Todo(data.name, data.id, data.status)
                            );
                        }

                        resolve(todoList);
                    },
                    //失敗したとき
                    (tx, error) => {
                        console.log(error);
                        reject(error);
                    }
                )
            });

        });
    }

    //TODOをデータベースに入れる
    storeTodo(todo) {
        return new Promise((resolve, reject) => {
           //DBとの接続からトランザクションを作成します
           this._con.transaction(tx => {

                //テーブルにデータを入れるSQLコマンドの実行
                tx.executeSql(
                    //SQLコマンド
                    'INSERT INTO todo(name) VALUES ($1)',

                    //パラメーター
                    [todo.name],

                    //成功したときの処理
                    (tx, result) => resolve(),

                    //失敗したときの処理
                    (tx, error) => {
                        console.log(error);
                        reject(error);
                    }
                );

           }); 
        });
    }

    //TODOを完了状態にする　(ステータスを１に変更)
    completeTodo(todoId){

        return new Promise((resolve, reject) => {

            this._con.transaction(tx => {
                //SQLコマンドの実行
                tx.executeSql(
                    //SQLコマンド
                    'UPDATE todo SET status = 1 WHERE id = $1;',

                    //パラメーター
                    [todoId],

                    //成功したときの処理
                    (tx, result) => resolve(),

                    //失敗したときの処理
                    (tx, error) => {
                        console.log(error);
                        reject(error);
                    }
                );
            });

        });

    }

}