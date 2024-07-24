import { store } from "../../store.ts";
function script(state) {
  document.getElementById("asd").innerText = state;
}
store.subscribe(script);
