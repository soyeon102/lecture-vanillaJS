import { on, qs } from "../helper.js";
import View from "./View.js";

export default class SearchFormView extends View {
  constructor() {
    // 쿼리셀렉터 함수를 호출해 돔을 내부 변수로 저장한다
    super(qs("#search-form-view"));

    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);

    // 처음에는 x버튼이 보일필요 없으므로 숨긴다
    this.showResetButton(false);
    this.bindEvents();
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    // 요구사항 검색폼2 구현
    on(this.inputElement, "keyup", () => this.handleKeyup());
    // 요구사항 검색폼3 구현시 폼 제출 이벤트를 방지한다
    this.on("submit", (event) => this.handleSubmit(event));
    // 요구사항 검색폼4 구현
    this.on("reset", () => this.handleReset());
  }

  // 요구사항 검색폼3 구현. 검색 결과는 다른 뷰에서 보여줄 수 있도록 한다
  // 폼뷰에서는 폼에서 엔터가 입력되었다는 것까지만 처리한다
  // 추후에 SearchResultView에게 위임하기위해 @submit이라는 커스텀 이벤트를 발행
  handleSubmit(event) {
    event.preventDefault();

    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }
  handleKeyup() {
    // 요구사항 검색폼2 구현
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);

    if (value.length <= 0) {
      this.handleReset();
    }
  }
  handleReset() {
    // 요구사항 검색폼4 구현시 검색 결과를 삭제하는 것은 폼뷰의 역할이 아니므로
    // @reset 커스텀 이벤트만 발생시킨다
    this.emit("@reset");
  }
  // 사용자 입력이 아닌 검색어 클릭시 input에 값을 넣어주는 역할
  show(value = "") {
    this.inputElement.value = value;
    this.showResetButton(this.inputElement.value.length > 0);

    // 부모 클래스 View의 show 메서드를 호출해 화면에 노출한다
    super.show();
  }
}
