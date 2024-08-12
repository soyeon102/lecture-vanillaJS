import { delegate, formatRelativeDate, qs } from "../helper.js";
import KeywordListView from "./KeywordListView.js";

export default class HistoryListView extends KeywordListView {
  constructor() {
    super(qs("#history-view"), new Template());
  }

  // 요구사항 최근검색어2 구현
  // 이벤트를 바인딩하는 메서드를 오버라이딩
  bindEvents() {
    // 삭제 버튼을 클릭하면 handleClickRemoveButton 메서드를 호출한다
    delegate(this.element, "click", "button.btn-remove", (event) =>
      this.handleClickRemoveButton(event)
    );
    // li 엘리먼트 클릭을 처리하는 부모 메서드도 호출한다
    super.bindEvents();
  }

  handleClickRemoveButton(event) {
    const { keyword } = event.target.parentElement.dataset;
    // @remove 커스텀 이벤트를 발행하여 컨트롤러에 위임한다
    this.emit("@remove", { value: keyword });
  }
}

class Template {
  getEmptyMessage() {
    return `
      <div class="empty-box">
        검색 이력이 없습니다
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

  _getItem({ keyword, date }) {
    return `
      <li data-keyword="${keyword}">
        ${keyword}
        <span class="date">${formatRelativeDate(date)}</span>
        <button class="btn-remove"></button>
      </li>
    `;
  }
}
