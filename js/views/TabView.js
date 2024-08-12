import { delegate, qs, qsAll } from "../helper.js";
import View from "./View.js";

export const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
};

export default class TabView extends View {
  constructor() {
    super(qs("#tab-view"));

    this.template = new Template();
    this.bindEvents();
  }

  // 자식 li 중 클릭 이벤트가 발생하면 handleClick 메서드를 호출하는 핸들러를 연결
  bindEvents() {
    delegate(this.element, "click", "li", (event) => this.handleClick(event));
  }

  handleClick(event) {
    // 이벤트 객체를 받아 클릭된 요소의 탭 정보를 조회한 후 커스텀 이벤트 @change를 발행한다
    const value = event.target.dataset.tab;
    this.emit("@change", { value });
  }

  // 부모 클래스 View에 정의된 show 메서드 재정의
  // 화면에 노출하기 전에 템플릿 객체로부터 탭 리스트 마크업 문자열을 가져와 돔에 추가하기 위해
  show(tab) {
    // 요구사항 탭1 구현
    this.element.innerHTML = this.template.getTabList();

    // 요구사항 탭2 구현
    qsAll("li", this.element).forEach((li) => {
      li.className = li.dataset.tab === tab ? "active" : "";
    });
    super.show();
  }
}

class Template {
  // 전체 탭 리스트
  getTabList() {
    return `
      <ul class="tabs">
        ${Object.values(TabType)
          .map((key) => ({ key, label: TabLabel[key] }))
          .map(this._getTab)
          .join("")}
      </ul>
    `;
  }
  // 하나의 탭
  _getTab({ key, label }) {
    return `
      <li data-tab="${key}">${label}</li>
     `;
  }
}
