import { createNextId } from "./helper.js";
import { TabType } from "./views/TabView.js";

export default class Store {
  constructor(storage) {
    // 데이터 저장소 생성
    this.storage = storage;

    // 검색 여부를 나타내는 상태를 만든다(상태는 데이터로 다루기 때문에 MVC패턴에서 모델의 역할)
    this.searchKeyword = "";
    this.searchResult = [];

    // 요구사항 탭2 구현
    // 모델에서 선택된 탭 상태 관리
    this.selectedTab = TabType.KEYWORD;
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((p) =>
      p.name.includes(keyword)
    );

    // 요구사항 최근검색어3 구현
    // 검색시 키워드를 최근 검색어 목록에 추가한다
    this.addHistory(keyword);
  }

  // 원본 배열을 쓰는 것보다 복사해서 쓸 것
  getKeywordList() {
    return [...this.storage.keywordData];
  }

  getHistoryList() {
    return [...this.storage.historyData.sort(this._sortHistory)];
  }

  _sortHistory(history1, history2) {
    return history2.date - history1.date;
  }

  // 삭제할 키워드를 받아 데이터를 제거하는 메서드 생성
  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
      (history) => history.keyword !== keyword
    );
  }

  addHistory(keyword = "") {
    keyword = keyword.trim();
    if (!keyword) return;

    const hasHistory = this.storage.historyData.some(
      (history) => history.keyword === keyword
    );
    if (hasHistory) this.removeHistory(keyword);

    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({ id, keyword, date });
    this.storage.historyData = [
      ...this.storage.historyData.sort(this._sortHistory),
    ];
  }
}
