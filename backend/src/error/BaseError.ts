export class BaseError extends Error {
  constuctor(message = "") {
    this.message = message;
  }
}
