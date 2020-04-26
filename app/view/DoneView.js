class DoneView extends BaseView {

    constructor(element) {
        super(element);
    }

    template(todo) {
        return `<li class="d-flex justify-content-between">${todo.name}
            <button id="btn-delete-item" class="btn btn-default btn-xs pull-right" value="${todo.id}">
                <i class="far fa-trash-alt"></i>
            </button>
        </li>`;
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