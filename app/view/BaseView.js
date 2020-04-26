//TodoView, DoneView のベースとなるクラス
class BaseView {

    constructor(element) {
        this._element = element;
    }

    template(model) {
        throw new Error('templateメソッドを実装してください。');
    }

    update(model) {
        this._element.innerHTML = this.template(model);
    }
}