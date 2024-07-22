export default class {
  params = { id: 0 };
  constructor(params: { id: number }) {
    this.params = params;
  }

  setTitle(title: string) {
    document.title = title;
  }

  async getHtml() {
    return "";
  }
}
