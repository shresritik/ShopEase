import { cartStore, userProfileStore } from "../../store";
import { dispatch } from "../../utils/dispatch";

export const Navbar = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const login = document.getElementById("showLogin");
    const profile = document.getElementById("profile");
    const profileImg = document.getElementById(
      "profileImg"
    ) as HTMLImageElement;
    userProfileStore.subscribe((state) => {
      let user = userProfileStore.getState();
      if (!user.name) {
        profile?.classList.add("hidden");

        if (login?.classList.contains("hidden")) {
          login?.classList.add("flex");
          login?.classList.remove("hidden");
        } else {
          login?.classList.remove("flex");
          login?.classList.add("hidden");
        }
      } else {
        login?.classList.add("hidden");
        profileImg!.src = user.pic;
        if (profile?.classList.contains("hidden")) {
          profile?.classList.remove("hidden");
          profile?.classList.add("flex");
        } else {
          profile?.classList.add("hidden");
          profile?.classList.remove("flex");
        }
      }
    });
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
      logoutButton?.addEventListener("click", (e) => {
        e.preventDefault();
        userProfileStore.dispatch({ type: "RESET" });
        cartStore.dispatch({ type: "RESET" });
        dispatch("/login");
      });

      const profileAvatar = document.getElementById("profileAvatar");
      const profileDropdown = document.getElementById("profileDropdown");

      profileAvatar!.addEventListener("click", (e) => {
        e.preventDefault();
        profileDropdown!.classList.toggle("hidden");
      });

      document.addEventListener("click", (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (
          !profileAvatar!.contains(target) &&
          !profileDropdown!.contains(target)
        ) {
          profileDropdown!.classList.add("hidden");
        }
      });
    }
  });
  return `
  <header class="relative h-full w-full border-b-2 shadow-lg border-b-1 border-slate-200 bg-white/90 shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
  <div class="sticky top-0 mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
    <nav id="navbar" aria-label="main navigation" class="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700 sticky top-0 w-full" role="navigation">
      <!-- Brand logo -->
      <a id="WindUI" aria-label="WindUI logo" aria-current="page" class="flex items-center gap-2 py-3 text-lg whitespace-nowrap focus:outline-none" href="/" data-link>
        ShopEase
      </a>
    
      <!-- Navigation links -->
      <ul   class="  flex ">
        <li  class="flex items-stretch">
          <a class="flex items-center gap-2 py-4  hover:text-gray-500 focus:text-gray-600 focus:outline-none focus-visible:outline-none lg:px-8" data-link href="/products">
            Products
          </a>
        </li>
          <div id="cartIcon" class="flex items-center px-6 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
          <path fill="black" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"/>
        </svg>
        <p id="cartList" class="bg-red-500 text-white w-5 h-5 p-3 flex items-center justify-center rounded-full">
          ${!!cartStore.getState() ? cartStore.getState().length : 0}
        </p>
      </div>
   
        <li  id="showLogin" class="  items-stretch hidden">
          <a class="flex items-center gap-2 py-4  hover:text-green-500 focus:text-green-600 focus:outline-none focus-visible:outline-none lg:px-8" data-link href="/login">
            Login
          </a>
        </li>
         <div id="profile" class="relative hidden  items-center md:px-6 ml-auto lg:ml-0 lg:p-0">
          <!-- Avatar -->
          <a   id="profileAvatar" data-link class="relative inline-flex items-center justify-center w-10 h-10 text-white rounded-full">
            <img id="profileImg" src="https://i.pravatar.cc/40?img=35" alt="user name" title="user name" width="40" height="40" class="max-w-full rounded-full inline cursor-pointer"/>
          </a>
          <!-- Dropdown menu -->
          <div id="profileDropdown" class="absolute  hidden  -right-20 top-16 w-48 mt-2 z-[1000] bg-white  border border-gray-300 rounded-lg shadow-lg transition-opacity duration-150 ease-in-out group-hover:opacity-100">
            <a href="/dashboard" data-link class="block px-4 py-2 text-gray-800 hover:bg-gray-100 border-b-2">Dashboard</a>
            <p id="logout" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">Logout</p>
          </div>
        </div>
      </ul>
    </nav>
  </div>
</header>
  `;
};
