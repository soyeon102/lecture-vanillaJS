export default class Controller {
  constructor(store, { searchFormView, searchResultView }) {
    // 스토어와 뷰는 서로 알지 못하기 때문에 이 역할을 컨트롤러가 한다
    this.store = store;
    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    // 폼 뷰에서 입력한 검색어에 @submit이벤트를 걸어 메서드가 처리하도록 연결
    this.searchFormView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", () => this.reset());
  }
  search(keyword) {
    // @submit이벤트가 발생하면 스토어에 이를 저장한다
    this.store.search(keyword);
    // 이어 상태에 따라 화면을 그리도록 render메서드를 호출한다
    this.render();
  }
  reset() {
    console.log("@reset");

    this.store.searchKeyword = "";
    this.store.searchResult = [];
    this.render();
  }
  render() {
    // 검색어가 있을 경우 검색결과를 노출하고
    if (this.store.searchKeyword.length > 0) {
      return this.searchResultView.show(this.store.searchResult);
    }
    // 그렇지 않을 경우 검색결과를 숨긴다
    this.searchResultView.hide();
  }
}
