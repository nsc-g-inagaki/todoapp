//完了したTODOを持っておくリストクラス
class DoneList extends BaseList {

    constructor() {
        //BaseListのコンストラクターを呼び出す
        super();
    }

    //TODOを追加する
    addTodo(todo) {
        //追加する前にTODOが完了していることをチェック
        if(todo.isDone()) {
            super.addTodo(todo);
        }
    }

    //IDを使ってアイテムを削除する
    removeItemById(itemId){
        
        let item = this.findItemById(itemId);

        if(item) {
            super.removeItem(item);
        }

    }

    //IDを使ってアイテムを検索する
    findItemById(itemId) {
        return this._list.find((item) => item.id == itemId);
    }
}