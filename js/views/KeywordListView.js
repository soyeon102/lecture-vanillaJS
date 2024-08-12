import { delegate, qs } from "../helper.js";
import View from "./View.js";

export default class KeywordListView extends View {
  // KeywordListView와 HistroyListView는 화면에 보이는 방식의 차이만 있으므로
  // 기존 코드에서 HistroyListView에 상속 가능하도록 변경한다
  // constructor() {
  //   super(qs("#keyword-view"));
  //   this.template = new Template();
  //   this.bindEvents();
  // }

  // 생성 시점에 엘리먼트와 템플릿을 주입하는 방식으로 바꾼다
  // 이 형태로 상속하면 돔 엘리먼트와 템플릿 객체를 외부에서 주입받아 화면에 출력하는 모습만 다르고, 키워드 뷰의 동작은 재활용할 수 있다
  constructor(element = qs("#keyword-view"), template = new Template()) {
    super(element);
    this.template = template;

    this.bindEvents();
  }

  bindEvents() {
    delegate(this.element, "click", "li", (event) => this.handleClick(event));
  }

  handleClick(event) {
    const { keyword } = event.target.dataset;
    this.emit("@click", { value: keyword });
  }

  show(data = []) {
    this.element.innerHTML =
      data.length > 0 ? this.template.getList(data) : this.getEmptyMessage();

    super.show();
  }
}

class Template {
  getEmptyMessage() {
    return `
    <div class="empty-box">
      추천 검색어가 없습니다
    </div>
  `;
  }

  getList(data = []) {
    return `
    <ul class="list">
      ${data.map(this._getItem).join("")}
    </ul>
  `;
  }

  _getItem({ id, keyword }) {
    return `
      <li data-keyword="${keyword}">
        <span class="number">${id}</span>
        ${keyword}
      </li>
    `;
  }
}
