//DAO Data Access Object データ アクセス オブジェクト
//特定クラスのオブジェクトとDBとの間を取り持つクラスです。
class TodoDao {

    //データベースとの接続が必要
    constructor(connection){
        this._connection = connection;
    }

    //追加するメソッド
    add(todo) {
        //Promiseを使用して追加するresolveが成功時rejectが失敗時
        return new Promise((resolve, reject) => {
            //DBトランザクションを使う    
            this._connection.transaction(tx => {
                //SQLを実行
                tx.executeSql(
                    //SQLコマンド
                    'INSERT INTO todo(description) VALUES (?);', 
                    //パラメーター
                    [todo.name], 

                    //成功　何もせず終了
                    () => resolve(), 

                    //失敗
                    (error) => {
                        //エラーをログ出力
                        console.log(error.message);
                        //エラーで終了
                        reject(error);
                    })
                });
        });
    }

    //DBよりTodoを取得する
    getOpenTodos() {
        return new Promise((resolve, reject) => {
            this._connection.transaction(tx => {

                tx.executeSql(
                    'SELECT * FROM todo',
                    [],

                    (tx, result) => {
                        let todoList = [];
                        console.log(result);
                        console.log(result.length);
                        console.log(result.rows.length);
                        for(let i = 0; i < result.rows.length; i++){
                            
                            let data = result.rows.item(i);

                            todoList.push(
                                new Todo(data.description, data.id, data.status)
                            );

                        }

                        console.log(todoList);
                        resolve(todoList);
                    },

                    (tx, error) => reject(error)
                )

            });
        });
    }

}