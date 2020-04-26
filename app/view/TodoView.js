class TodoView extends BaseView {

    constructor(element) {
        super(element);
    }

    template(todo) {
        return `<li">
            <label class="d-flex align-items-center">
                <input type="checkbox" value="${todo.id}"/>
                <span>${todo.name}</span>
            </label>
        </li>`
    }

    update(todoList) {
        //todoListのアイテム1個ごとにtemplateでHTMLを作成
        let content = '';

        todoList.forEach(todo => {
            content += this.template(todo);
        });

        //elementのinnerHTMLに入れる
        this._element.innerHTML = content;
    }
}