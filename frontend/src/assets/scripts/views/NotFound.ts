import Abstract from "./Abstract";

export class NotFound extends Abstract {
  constructor(params: any) {
    super(params);
    this.setTitle("Not Found");
  }
  async getHtml() {
    const res = await fetch("./src/components/not-found.html");
    const data = res.text();
    return data;
  }
}
