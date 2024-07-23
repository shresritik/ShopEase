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
  async render() {
    const html = await this.getHtml();
    document.getElementById("app")!.innerHTML = html; // Insert the fetched HTML into a container
    this.attachEventListeners(); // Attach event listeners after rendering
  }

  attachEventListeners() {
    document
      .getElementById("login-form")
      ?.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = (
          document.getElementById("username") as HTMLInputElement
        ).value;
        const email = (
          document.getElementById("emailAddress") as HTMLInputElement
        ).value;
        const password = (
          document.getElementById("password") as HTMLInputElement
        ).value;
        const passwordConfirmation = (
          document.getElementById("passwordConfirmation") as HTMLInputElement
        ).value;
        // Prevent the default form submission
        // Handle form submission here
        console.log("Form submitted with values:", {
          username,
          email,
          password,
          passwordConfirmation,
        });
      });
  }
}
