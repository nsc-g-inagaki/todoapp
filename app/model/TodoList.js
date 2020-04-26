//TODOリストを表す
class TodoList extends BaseList {

    constructor() {
        super();
    }

    get count() {
        return this._list.length;
    }

    addTodo(todo) {
        super.addTodo(todo);
    }

    removeItem(todo) {
        super.removeItem(todo);
    }

    //IDを使ってTODOを検索する
    findItemById(itemId){
        return this._list.find((item) => item.id == itemId);
    }

    //IDを使ってアイテムを削除する
    removeItemById(itemId){
        
        let item = this.findItemById(itemId);

        if(item) {
            this.removeItem(item);
        }

    }
}