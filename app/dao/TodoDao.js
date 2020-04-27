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

}