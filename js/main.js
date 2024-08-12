import Controller from "./Controller.js";
import Store from "./Store.js";
import storage from "./storage.js";
import SearchFormView from "./views/SearchFormView.js";
import SearchResultView from "./views/SearchResultView.js";

// 돔이 로딩되는 시점에 메인 함수를 호출한다
document.addEventListener("DOMContentLoaded", main);

function main() {
  // 데이터를 담은 스토어 객체 생성
  const store = new Store(storage);

  // 뷰는 여러 개 생성할 것이므로 객체로 생성
  const view = {
    searchFormView: new SearchFormView(),
    searchResultView: new SearchResultView(),
  };

  // 스토어와 뷰를 컨트롤러에 전달
  new Controller(store, view);
}
