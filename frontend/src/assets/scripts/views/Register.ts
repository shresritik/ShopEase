import axios from "axios";
import Abstract from "./Abstract";

// Register function remains the same

export class Register extends Abstract {
  constructor(params: any) {
    super(params);
    this.setTitle("Register");
  }

  async getHtml() {
    const res = await fetch("./src/pages/register.html");
    const data = await res.text();
    return data;
  }

  async render() {
    const html = await this.getHtml();
    document.getElementById("app")!.innerHTML = html; // Insert the fetched HTML into a container
    this.attachEventListeners(); // Attach event listeners after rendering
  }

  private attachEventListeners() {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", async function (event) {
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
        const fileInput = document.getElementById(
          "file-upload"
        ) as HTMLInputElement;
        const file = fileInput?.files?.[0];
        console.log("file", fileInput);
        if (password !== passwordConfirmation) {
          alert("Passwords do not match");
          return;
        }

        // const data: IUser = {
        //   name: username,
        //   email,
        //   password,
        //   roleId: 3,
        // };
        const formData = new FormData();
        formData.append("name", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("roleId", "3");
        if (file) formData.append("pic", file);
        try {
          // const res = await registerUser(formData);
          // console.log(res);
        } catch (error) {
          console.error("Error during registration:", error);
        }
      });
    }
  }
}
