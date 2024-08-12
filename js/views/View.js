import { on, emit } from "../helper.js";

export default class View {
  constructor(element) {
    // 생성 시점에 화면 출력을 위한 돔 엘리먼트를 저장
    this.element = element;
    // 뷰를 화면에 보이고 숨기기 위해 스타일의 display 속성을 사용해 원래 값을 저장
    this.originalDisplay = this.element.style.display || "";
  }

  hide() {
    this.element.style.display = "none";
    return this;
  }
  show() {
    this.element.style.display = this.originalDisplay;
    return this;
  }

  // 뷰가 관리하는 엘리먼트에서 발생한 이벤트를 핸들러와 연결하거나 외부에서 구독하기 위한 용도
  on(eventName, hanlder) {
    on(this.element, eventName, hanlder);
    return this;
  }
  emit(eventName, data) {
    emit(this.element, eventName, data);
    return this;
  }
}
