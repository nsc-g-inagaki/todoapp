//アプリのコントロールをするクラス
class TodoController {
    constructor() {
        const btnRemoveItemId = 'btn-delete-item';

        //DBとの接続を行う前までのだんかいでとりあえず、TodoのIdを作っておいてくれる変数
        this.idCounter = 0;

        //document.querySelectorの仮名を作る　
        let selector = document.querySelector.bind(document);

        //画面のインプットを呼び出してくる
        this.inputTodo = selector('.add-todo');
        this._ulTodos = selector('#sortable');
        this._ulDones = selector('#done-items');
        this._countTodos = selector('.count-todos');


        //画面のインプットにキーボードが押されたことを監視する。
        this.inputTodo.addEventListener('keypress', function (event) {
            event.preventDefault;

            //押されたキーがEnterかどうかをチェック
            // if (event.key.toLowerCase() == 'enter') {
            
            if(isEquals('enter', event.key)){

                //インプットの値が空ではないことをチェック
                if (event.target.value != '') {
                    console.log(event.target.value);
                    //TODOを追加するを呼び出す。
                    this.addTodo(event.target.value);

                }
            }

        }.bind(this));

        this._todoList = new TodoList();
        this._doneList = new DoneList();
        this._todoView = new TodoView(this._ulTodos);
        this._doneView = new DoneView(this._ulDones);

        this._ulDones.addEventListener('click', function(event){
            event.preventDefault;

            // console.log(event.target);
            // console.log(event.target.parentElement);
            let itemValue;



            if (isEquals(btnRemoveItemId, event.target.id)) {
                itemValue = event.target.value;
            } else if (isEquals(btnRemoveItemId, event.target.parentElement.id)) {
                itemValue = event.target.parentElement.value;
            }
            
            console.log(itemValue);

            if (itemValue) {
                this.deleteItem(itemValue);
            }
            
        }.bind(this));

        this._ulTodos.addEventListener('click', function(event){
            event.preventDefault();
            console.log(event);

            
            let labelNode;
            
            if(event.target.matches('label')) {
                labelNode = event.target;
            } else {
                labelNode = event.target.parentNode;
            }
            
            console.log(labelNode.firstElementChild);
            this.finishTask(labelNode.firstElementChild.value);

        }.bind(this));

        this._updateTodosCount();
    }

    //TODO を追加する
    addTodo(inputValue) {

        //inputValueを使ってTodoオブジェクトを作成
        let todo = new Todo(inputValue, ++this.idCounter);

        //作成したTodoオブジェクトを_todoListに追加
        this._todoList.addTodo(todo);

        //画面にリストを表示
        this._todoView.update(this._todoList.list);

        //インプットに入力されているものを消す。
        this.inputTodo.value = '';

        this._updateTodosCount();
    }


    //TODOを一つ完了状態にする
    finishTask(taskId){
        let item = this._todoList.findItemById(taskId);

        if(item) {
            this._todoList.removeItem(item);

            item.done();

            this._doneList.addTodo(item);

            this._todoView.update(this._todoList.list);
            this._doneView.update(this._doneList.list);
        }

        this._updateTodosCount();
    }

    //TODOすべてを完了の状態にする
    allDone() {
        //_todoListの中に入っているTodoすべてをステータス１にする
        //Todoオブジェクトのdone()メソッドを呼ぶ
        this._todoList.list.forEach(todo => {
            todo.done();
            //ステータス１のTodoを_doneListに追加する
            this._doneList.addTodo(todo);
        });

        //_todoListを空にする
        this._todoList.clearList();

        //_todoViewのupdateを呼ぶ
        this._todoView.update(this._todoList.list);

        //_doneViewのupdateを呼ぶ
        this._doneView.update(this._doneList.list);

        this._updateTodosCount();
    }

    deleteItem(itemId){
        
        this._doneList.removeItemById(itemId);

        this._doneView.update(this._doneList.list);

        
    }

    _updateTodosCount() {

        this._countTodos.innerHTML = this._todoList.count;

    }

}