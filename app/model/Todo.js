class Todo {

    //プロパティー
    // _id デフォルトで0　
    // _name
    // _status デフォルト0
    constructor(name, id = 0, status = 0) {
        this._id = id;
        this._name = name;
        this._status = status;
    }

    //メソッド
    //get id()
    get id() {
        return this._id;
    }

    // get name()
    get name() {
        return this._name;
    }

    // isDone()
    isDone() {
        return this._status == 1;
    }
    
    //done() <= status を　1に変更
    done() {
        this._status = 1;
    }
}