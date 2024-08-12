import { qs } from "../helper.js";
import View from "./View.js";

export default class SearchResultView extends View {
  constructor() {
    super(qs("#search-result-view"));
    this.template = new Tamplate();
  }

  // 부모 View클래스의 show 메서드를 오버라이드
  // * 자바스크립트는 자바와 다르게 함수명으로 식별하기 때문에 메서드오버로딩 개념이 없다
  // * 다형성을 위해 오버라이딩을 통해 상위 클래스 기능을 확장·수정하여 재사용성을 높일 수 있다
  show(data = []) {
    // 요구사항 검색결과1 구현
    // 배열의 길이에 따라 구분하여 UI를 그린다
    this.element.innerHTML =
      data.length > 0
        ? this.template.getList(data)
        : this.template.getEmptyMessage();

    // 부모 클래스 View의 show 메서드를 호출해 화면에 노출한다
    super.show();
  }
}

class Tamplate {
  getEmptyMessage() {
    return `
    <div class="empty-box">
      검색결과가 없습니다
    </div>
  `;
  }

  getList(data = []) {
    return `<ul class="result">${data.map(this._getItem).join("")}</ul>`;
  }

  _getItem({ name, imageUrl }) {
    return `
      <li>
        <img src="${imageUrl}" alt="${name}" />
        <p>${name}</p>
      </li>
    `;
  }
}
