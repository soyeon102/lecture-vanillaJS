import { TabType } from "./views/TabView.js";

export default class Controller {
  constructor(
    store,
    {
      searchFormView,
      searchResultView,
      tabView,
      keywordListView,
      historyListView,
    }
  ) {
    // 스토어와 뷰는 서로 알지 못하기 때문에 이 역할을 컨트롤러가 한다
    this.store = store;
    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;
    this.historyListView = historyListView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    // 폼 뷰에서 입력한 검색어에 @submit이벤트를 걸어 메서드가 처리하도록 연결
    this.searchFormView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", () => this.reset());

    // 탭 뷰에서 받은 @change이벤트는 changeTab메서드를 호출한다
    this.tabView.on("@change", (event) => this.changeTab(event.detail.value));

    // 키워드 뷰에서 받은 @click이벤트로 검색을 한다
    this.keywordListView.on("@click", (event) =>
      this.search(event.detail.value)
    );

    this.historyListView
      .on("@click", (event) => this.search(event.detail.value))
      .on("@remove", (event) => this.removeHistory(event.detail.value));
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
  changeTab(tab) {
    this.store.selectedTab = tab;
    // 화면에 변경된 탭을 갱신하기 위해서 render를 다시 호출한다
    this.render();
  }
  removeHistory(keyword) {
    this.store.removeHistory(keyword);
    this.render();
  }
  render() {
    // 검색어가 있을 경우 메서드를 분리하여 호출
    if (this.store.searchKeyword.length > 0) {
      return this.renderSearchResult();
    }

    // 검색어가 없는 경우 탭 노출
    this.tabView.show(this.store.selectedTab);

    // 탭 값에 따라 화면을 다르게 노출
    if (this.store.selectedTab === TabType.KEYWORD) {
      this.keywordListView.show(this.store.getKeywordList());
      this.historyListView.hide();
    } else if (this.store.selectedTab === TabType.HISTORY) {
      this.keywordListView.hide();
      this.historyListView.show(this.store.getHistoryList());
    } else {
      throw "사용할 수 없는 탭";
    }

    // 검색어가 없는 경우 검색결과 숨김
    this.searchResultView.hide();
  }
  renderSearchResult() {
    // 탭, 추천 검색어, 최근 검색어 숨기기
    this.tabView.hide();
    this.keywordListView.hide();
    this.historyListView.hide();

    // formView와 resultView에 해당값 넣어주기
    this.searchFormView.show(this.store.searchKeyword);
    this.searchResultView.show(this.store.searchResult);
  }
}
