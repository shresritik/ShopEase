import axios from "axios";
import Abstract from "./Abstract";
import { IUser } from "../../../interface/user";

// Register function remains the same
const register = async (data: IUser) => {
  return await axios.post("/api/users", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

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

        if (password !== passwordConfirmation) {
          alert("Passwords do not match");
          return;
        }

        const data: IUser = {
          name: username,
          email,
          password,
          roleId: 3,
        };

        try {
          const res = await register(data);
          console.log(res);
        } catch (error) {
          console.error("Error during registration:", error);
        }
      });
    }
  }
}
