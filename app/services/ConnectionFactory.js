const ConnectionFactory = (function () {

    //データベースのサイズ
    const dbSize = 1024 * 1024 * 2; //2MB

    //データベースの名前（ファイルの場所）
    const dbName = 'todoapp.db';

    //表示用のデータベース名
    const dbDisplayName = 'TodosDB';

    //データベースバージョン
    const version = 1;

    //データベースとの接続を保持しておく
    let connection = null;

    //データベースとの接続を用意してくれるクラス
    return class ConnectionFactory {

        //コンストラクターこいつは直接呼べないようにする
        //外から呼べるようにしてしまうとデータベースとの接続が同時に複数作られる可能性がある
        constructor() {
            throw new Error('Can not create an instance of ConnectionFactory');
        }

        //接続を行うメソッド
        static getConnection() {
            return new Promise((resolve, reject) => {

                try {
                    connection = openDatabase(
                        dbName,
                        version,
                        dbDisplayName, 
                        dbSize
                    )
                
                    ConnectionFactory._migrateDatabase()
                        .then(() => resolve(connection))
                        .catch(error => {
                            throw new Error(error.message);
                        });

                } catch(error) {
                    console.log(error);

                    reject(error);
                }
            });
        }

        static _migrateDatabase() {

            return new Promise((resolve, reject) => {
                let sqlCommand;

                switch(version) {
                case 1:
                    sqlCommand = 
                        'CREATE TABLE IF NOT EXISTS todo(\
                            id INTEGER PRIMARY KEY AUTOINCREMENT,\
                            description TEXT,\
                            status INTEGER DEFAULT 0);';
                    break;

                    default:
                        throw new Error('不正データベースバージョンです、データベースバージョンをみなしてください。');
                }

                connection.transaction((tx) => {
                    tx.executeSql(sqlCommand, null, () => resolve(), (tx, error) => {
                        reject(error);
                    });
                });
            });
        }
    }
})();