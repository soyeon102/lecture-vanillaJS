export default class Store {
  constructor(storage) {
    // 데이터 저장소 생성
    this.storage = storage;

    // 검색 여부를 나타내는 상태를 만든다(상태는 데이터로 다루기 때문에 MVC패턴에서 모델의 역할)
    this.searchKeyword = "";
    this.searchResult = [];
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((p) =>
      p.name.includes(keyword)
    );
  }
}
