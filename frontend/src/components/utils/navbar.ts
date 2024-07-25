import { cartStore, counterStore, updateStore } from "../../store";
import { isAuthenticated } from "../../utils/auth";
import { fetchHtml } from "../../utils/fetchHtml";

export const navbarRender = async () => {
  const navbar = await fetchHtml("navbar");
  document.getElementById("navbar")!.innerHTML = `
  <header
  class="relative z-20 w-full border-b shadow-lg border-b-1 border-slate-200 bg-white/90 shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden"
>
  <div
    class="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]"
  >
    <nav
      aria-label="main navigation"
      class="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700 sticky top-0 w-full"
      role="navigation"
    >
      <!-- Brand logo -->
      <a
        id="WindUI"
        aria-label="WindUI logo"
        aria-current="page"
        class="flex items-center gap-2 py-3 text-lg whitespace-nowrap focus:outline-none lg:flex-1"
        href="/"
        data-link
      >
        ShopEase
      </a>
      <!-- Mobile trigger -->
      <button
        class="relative self-center order-10 visible block w-10 h-10 opacity-100 lg:hidden"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <div
          class="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        >
          <span
            aria-hidden="true"
            class="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            class="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            class="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>
      <!-- Navigation links -->
      <ul
        role="menubar"
        aria-label="Select page"
        class="invisible absolute top-0 left-0 z-[-1] ml-auto h-screen w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-28 font-medium opacity-0 transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100"
      >
        <li role="none" class="flex items-stretch">
          <a
            class="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-gray-500 focus:text-gray-600 focus:outline-none focus-visible:outline-none lg:px-8"
            data-link
            href="/products"
          >
            Products</a
          >
        </li>
        <li role="none" class="flex items-stretch">
          <a
            role="menuitem"
            aria-current="page"
            aria-haspopup="false"
            class="flex items-center gap-2 py-4 transition-colors duration-300 focus:text-gray-600 focus:outline-none focus-visible:outline-none lg:px-8"
            data-link
            href="/orders"
          >
            Orders
          </a>
        </li>
        ${
          !isAuthenticated()
            ? `
           <li role="none" class="flex items-stretch">
          <a
            class="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
            data-link
            href="/login"
          >
            Login
          </a>
        </li>
          
          `
            : ""
        }
       
      </ul>
      <div class="flex items-center px-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
          />
        </svg>
        <p
          id="cartList"
          class="bg-red-500 text-white w-5 h-5 p-3 flex items-center justify-center rounded-full"
        >
          ${!!cartStore.getState() ? cartStore.getState().length : 0}
        </p>
      </div>
      ${
        isAuthenticated()
          ? `  <div class="flex items-center px-6 ml-auto lg:ml-0 lg:p-0">
        <!-- Avatar -->
        <a
          href="/dashboard"
          data-link
          class="relative inline-flex items-center justify-center w-10 h-10 text-white rounded-full"
        >
          <img
            src="https://i.pravatar.cc/40?img=35"
            alt="user name"
            title="user name"
            width="40"
            height="40"
            class="max-w-full rounded-full inline"
          />
        </a>
        <!-- End Avatar -->
      </div>`
          : ""
      }
    
    </nav>
  </div>
</header>

  
  `;
  const text = document.getElementById("cartList");
  cartStore.subscribe((state) => (text!.innerText = "" + state.length));
};
