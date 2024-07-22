import AbstractView from "./Abstract.ts";

export default class extends AbstractView {
  postId: number;
  constructor(params: { id: number }) {
    super(params);
    this.postId = params.id;
    this.setTitle("Viewing Post");
  }

  async getHtml() {
    return `
            <h1>Post</h1>
            <p>You are viewing post #${this.postId}.</p>
        `;
  }
}
