import { removeToken } from "../utils/auth";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { fetchHtml } from "../utils/fetchHtml";
import * as Update from "../components/update";
import * as Delete from "../components/deleteUser";

export const render = async () => {
  const container = createElement("div", { className: "p-6" });
  const divElement = createElement("div", {
    className: "flex item-center",
  });
  const leftElement = createElement("div", {
    className: "flex flex-col item-center",
  });
  const rightElement = createElement("div", {
    className: "p-6 flex flex-col w-full",
  });
  const heading = createElement(
    "h1",
    { className: "text-3xl mb-4" },
    "Dashboard"
  );
  const logoutButton = createElement(
    "button",
    { className: "bg-red-500 text-white p-2 rounded" },
    "Logout"
  );
  container.appendChild(heading);

  const renderSidebar = async () => {
    try {
      const res = await fetchHtml("sidebar");
      leftElement.innerHTML = res;

      const handleSidebarClick = async (event: Event) => {
        const target = event.target as HTMLElement;
        const classArray = [...target.classList];

        rightElement.innerHTML = ""; // Clear right element

        if (classArray.includes("orders")) {
          console.log("orders");
          // Add orders related content here
        } else if (classArray.includes("profile")) {
          const update = await Update.render();
          update.classList.add("profile-update");
          rightElement.appendChild(update);
        } else if (classArray.includes("delete")) {
          const deleteUser = await Delete.render();
          deleteUser.classList.add("delete-user");
          rightElement.appendChild(deleteUser);
        }
      };

      document
        .querySelectorAll(".sidebar")
        .forEach((element) =>
          element.addEventListener("click", handleSidebarClick)
        );
    } catch (error) {
      console.error("Error fetching sidebar:", error);
    }
  };

  renderSidebar();

  logoutButton.addEventListener("click", () => {
    removeToken();
    dispatch("/login");
  });

  divElement.appendChild(leftElement);
  divElement.appendChild(rightElement);
  container.appendChild(divElement);
  container.appendChild(logoutButton);
  return container;
};
