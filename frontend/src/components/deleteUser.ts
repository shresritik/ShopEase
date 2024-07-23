import { deleteUser, fetchUserProfile } from "../utils/api.ts";
import { removeToken } from "../utils/auth.ts";
import { createElement } from "../utils/createElement.ts";
import { dispatch } from "../utils/dispatch.ts";
import { fetchHtml } from "../utils/fetchHtml.ts";

export const render = async () => {
  const container = createElement("div", {
    className: "flex justify-center items-center",
  });

  try {
    const user = await fetchUserProfile();
    const res = await fetchHtml("deleteNotification");

    container.innerHTML = res;

    const deleteButton = container.querySelector("#deleteBtn");
    if (deleteButton) {
      deleteButton.addEventListener("click", async () => {
        await deleteUser(user.id);
        removeToken();
        dispatch("/");
      });
    }
  } catch (error: any) {
    console.error("Error rendering delete notification:", error);
    // Handle error appropriately, e.g., display an error message
  }

  return container;
};
