export default class Section {
    // items - массив данных (карточек)
    // renderer - функция которая создает и отрисовывает данные (карточки)
    // containerSelector -  селектор в который нужно добавить сами элементы
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
// Расставляет данные в заданном порядке
  addItem(element) {
    this._container.prepend(element);
  }

//  Включает метод который ответственен за отрисовку элементов
  renderItems() {
    this._renderedItems.forEach(item => {this._renderer(item));
    };
  }
}
