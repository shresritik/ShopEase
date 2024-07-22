import Abstract from "./Abstract";

export class Login extends Abstract {
  constructor(params: any) {
    super(params);
    this.setTitle("Not Found");
  }
  async getHtml() {
    const res = await fetch("./src/pages/login.html");
    const data = res.text();
    return data;
  }
}
