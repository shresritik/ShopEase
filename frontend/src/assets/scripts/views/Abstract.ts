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
  async render() {
    const html = await this.getHtml();
    document.getElementById("app")!.innerHTML = html; // Insert the fetched HTML into a container
  }
}
