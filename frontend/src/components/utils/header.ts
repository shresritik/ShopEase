import { cartStore, counterStore, userProfileStore } from "../../store";
import { isAuthenticated, removeToken } from "../../utils/auth";
import { dispatch } from "../../utils/dispatch";

export const navbarRender = async () => {
  document.getElementById("navbar")!.innerHTML = `
  <header class="relative h-full w-full border-b-2 shadow-lg border-b-1 border-slate-200 bg-white/90 shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
  <div class="sticky top-0 mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
    <nav id="navbar" aria-label="main navigation" class="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700 sticky top-0 w-full" role="navigation">
      <!-- Brand logo -->
      <a id="WindUI" aria-label="WindUI logo" aria-current="page" class="flex items-center gap-2 py-3 text-lg whitespace-nowrap focus:outline-none" href="/" data-link>
        ShopEase
      </a>
      <!-- Mobile trigger -->
      <button class="relative self-center order-10 visible block w-10 h-10 opacity-100 lg:hidden" aria-expanded="false" aria-label="Toggle navigation">
        <div class="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <span aria-hidden="true" class="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"></span>
          <span aria-hidden="true" class="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"></span>
          <span aria-hidden="true" class="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"></span>
        </div>
      </button>
      <!-- Navigation links -->
      <ul role="menubar" aria-label="Select page" class="invisible absolute top-0 left-0 z-[-1] ml-auto h-screen w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-28 font-medium opacity-0 transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100">
        <li role="none" class="flex items-stretch">
          <a class="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-gray-500 focus:text-gray-600 focus:outline-none focus-visible:outline-none lg:px-8" data-link href="/products">
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
   
        <li role="none" id="showLogin" class="  items-stretch hidden">
          <a class="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8" data-link href="/login">
            Login
          </a>
        </li>
         <div id="profile" class="relative hidden  items-center px-6 ml-auto lg:ml-0 lg:p-0">
          <!-- Avatar -->
          <a   id="profileAvatar" data-link class="relative inline-flex items-center justify-center w-10 h-10 text-white rounded-full">
            <img id="profileImg" src="https://i.pravatar.cc/40?img=35" alt="user name" title="user name" width="40" height="40" class="max-w-full rounded-full inline cursor-pointer"/>
          </a>
          <!-- Dropdown menu -->
          <div id="profileDropdown" class="absolute  opacity-0  -right-20 top-16 w-48 mt-2 bg-white  border border-gray-300 rounded-lg shadow-lg transition-opacity duration-150 ease-in-out group-hover:opacity-100">
            <a href="/dashboard" data-link class="block px-4 py-2 text-gray-800 hover:bg-gray-100 border-b-2">Dashboard</a>
            <p id="logout" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">Logout</p>
          </div>
        </div>
      </ul>
    </nav>
  </div>
</header>

  
  `;

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
        dispatch("/login");
      });

      const profileAvatar = document.getElementById("profileAvatar");
      const profileDropdown = document.getElementById("profileDropdown");
      const checkOpacity = profileDropdown!.classList;

      profileAvatar!.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("first");
        if (checkOpacity.contains("opacity-0")) {
          profileDropdown!.classList.add("opacity-100");
          profileDropdown!.classList.remove("opacity-0");
        } else {
          profileDropdown!.classList.add("opacity-0");
          profileDropdown!.classList.remove("opacity-100");
        }
      });

      document.addEventListener("click", (e) => {
        if (
          !profileAvatar!.contains(e.target) &&
          !profileDropdown!.contains(e.target)
        ) {
          if (checkOpacity.contains("opacity-100")) {
            profileDropdown!.classList.add("opacity-0");
            profileDropdown!.classList.remove("opacity-100");
          }
        }
      });
    }
  });
  // adding sidebar
  document.getElementById("navbar")!.innerHTML += `
  <div
  id="sidebar-cart"
  class="fixed top-30 right-0 translate-x-full transition-all ease-in-out duration-300 delay-150 z-50 flex h-full drop-shadow-lg flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5 overflow-auto"
>
  <div class="p-2">
    <div class="relative h-10 w-full min-w-[200px]">
     
      <div id="sidebar-content" class="flex flex-col">
      <h1>Cart is empty</h1>
      </div>
      
    </div>
  </div>
</div>
`;

  const text = document.getElementById("cartList");
  const cartIcon = document.querySelector("#cartIcon");
  const sidebar = document.querySelector("#sidebar-cart");
  const sidebarContent = document.querySelector("#sidebar-content");

  function updateSidebarContent() {
    const cartState = cartStore.getState();
    const counterState = counterStore.getState();
    sidebarContent!.innerHTML = "";
    let totalAmount = 0;

    if (cartState.length > 0) {
      cartState.forEach((prod) => {
        const quantity = counterState[prod.id] || 0;
        const prodTotal = quantity * prod.selling_price;
        totalAmount += prodTotal;

        sidebarContent!.innerHTML += `
      <div class="flex gap-4 justify-start items-center border-b-2 py-3">
        <img src="${prod.pic}" class="w-12 object-contain">
        <h1 class="w-28">${prod.product_name}</h1>
        <div class="flex justify-center items-center gap-1">
          <button data-prod="${prod.id}" data-qty="${prod.stock}" class="plus bg-gray-900 block w-maxselect-none text-white m-1 w-8 text-xl">+</button>
          <p class="quantity" data-id="${prod.id}">${quantity}</p>
          <button data-prod="${prod.id}" class="minus bg-gray-900 block w-maxselect-none text-white m-1 w-8 text-xl">-</button>
        </div>
        <h1 class="w-10">Price: Rs.${prod.selling_price}</h1>
        <h1 class="w-10">Total: Rs.${prodTotal}</h1>
        <button data-prod="${prod.id}" class="remove bg-red-500 text-white px-5 py-2">X</button>
      </div>`;
      });

      sidebarContent!.innerHTML += `
      <div class="flex flex-col justify-end items-center mt-4 gap-2">
        <h1 class="text-lg font-bold">Subtotal: Rs.${totalAmount}</h1>
      <button id="order" class=" block w-full select-none rounded-lg bg-orange-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-orange-900/10 transition-all hover:shadow-lg hover:shadow-orange-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Order</button>
      <button id="reset"     class="  block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
>Reset</button>
        '
      </div>`;
      sidebarContent!
        .querySelector("#reset")!
        .addEventListener("click", (e) => {
          e.preventDefault();
          cartStore.dispatch({ type: "RESET" });
        });
      sidebarContent!.querySelectorAll(".plus").forEach((plus) => {
        plus.addEventListener("click", function (e) {
          e.preventDefault();
          counterStore.dispatch({
            type: "INCREMENT",
            payload: { id: this.dataset.prod, qty: this.dataset.qty },
          });
        });
      });

      sidebarContent!.querySelectorAll(".minus").forEach((minus) => {
        minus.addEventListener("click", function (e) {
          e.preventDefault();
          counterStore.dispatch({
            type: "DECREMENT",
            payload: { id: this.dataset.prod },
          });
        });
      });

      sidebarContent!.querySelectorAll(".remove").forEach((remove) => {
        remove.addEventListener("click", function (e) {
          e.preventDefault();
          cartStore.dispatch({
            type: "REMOVE",
            payload: { id: this.dataset.prod },
          });
          counterStore.dispatch({
            type: "DECREMENT",
            payload: {
              id: this.dataset.prod,
              amount: counterStore.getState()[this.dataset.prod],
            },
          });
        });
      });
    } else {
      sidebarContent!.innerHTML = "<h1>Cart is empty</h1>";
    }
  }

  // Updating quantities and total amount when counterStore changes
  counterStore.subscribe(() => {
    updateSidebarContent();
  });

  // Toggle sidebar visibility on cart icon click
  cartIcon?.addEventListener("click", (e) => {
    e.preventDefault();
    sidebar?.classList.toggle("translate-x-0");
    sidebar?.classList.toggle("translate-x-full");
  });

  // Subscribe to cartStore to update sidebar content
  cartStore.subscribe(updateSidebarContent);

  cartStore.subscribe((state) => (text!.innerText = "" + state.length));
};