const ConnectionFactory = (function () {

    //DBサイズ
    const dbSize = 1024 * 1024 * 2;

    //DBの名前
    const dbName = 'todo.db';

    //DBの表示名
    const dbDisplayName = 'TodosDB';

    //DBバージョン
    const dbVersion = '1';

    //データベースとの接続を保持しておく
    let connection = null;

    //データベースとの接続を用意してくれるクラス
    return class ConnectionFactory {

        //コンストラクターこいつは直接呼べないようにする
        //外から呼べるようにしてしまうとデータベースとの接続が同時に複数作られる可能性がある
        constructor() {
            throw new Error('Can not create an instance of ConnectionFactory');
        }

        //データベースに接続するメソッド
        static getConnection() {
            return new Promise((resolve, reject) => {

                try {
                    //ここでエラーが出たら    

                    //データベースを開く
                    if(!connection) {
                        connection = openDatabase(
                            //名前
                            dbName,
    
                            //バージョン
                            dbVersion,
    
                            //表示する名前
                            dbDisplayName,
    
                            //DBサイズ
                            dbSize
                        );
    
                    }
                    
                    ConnectionFactory._migrateDb()
                        .then(resolve(connection))
                        .catch(error => { 
                            console.log(error);
                            throw error;
                        });

                } catch (error) {
                    //ここでエラーを処理する
                    console.log(error);

                    reject(error);
                }


            });
        }

        //DBのテーブルの作成・更新などを行う
        static _migrateDb() {
            return new Promise((resolve, reject) => {

                //SQLコマンドを保持する
                let sql = 'CREATE TABLE IF NOT EXISTS todo(\
                    id INTEGER PRIMARY KEY AUTOINCREMENT,\
                    name TEXT,\
                    status INTEGER DEFAULT 0);';

                //トランザクションを開く
                connection.transaction(tx => {
                    
                    //指定したSQLを実行する
                    tx.executeSql(
                        //SQLコマンド
                        sql,

                        //パラメーター
                        [],

                        //成功したとき
                        (tx, result) => resolve(),

                        //失敗したとき
                        (tx, error) => reject(error)
                    )

                });
            });
        }

    }

})();




