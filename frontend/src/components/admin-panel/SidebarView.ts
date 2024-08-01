import { userProfileStore } from "../../store";
import productImg from "../../assets/svg/products.svg";
import categoryImg from "../../assets/svg/category.svg";
import userImg from "../../assets/svg/user.svg";
import couponImg from "../../assets/svg/coupon.svg";

export const SidebarView = () => {
  const user = userProfileStore.getState();

  return /* html */ `
  <div class="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-xl shadow-blue-gray-900/5">
  <nav class="flex min-w-[240px] flex-col gap-1 font-sans text-base font-normal text-blue-gray-700">
    
    <!-- Orders Section (clickable, not part of accordion) -->
    ${
      user.role?.roleRank != 2
        ? `
    <div class="border-b">
      <div class="sidebar orders flex items-center w-full p-4 cursor-pointer hover:bg-blue-gray-50 border-b">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 mr-4 orders">
          <path class="orders" fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clip-rule="evenodd"></path>
        </svg>
        Orders
      </div>
    </div>
    `
        : ""
    }

    <!-- User Management Section -->
    <div class="border-b">
      <button class="flex items-center justify-between w-full p-4 text-left focus:outline-none">
        <span class="flex items-center">
          <img src="${userImg}" class="w-5 h-5 mr-4"/>
          User Management
        </span>
        <svg class="w-4 h-4 transition-transform transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div class="hidden p-4 pt-0">
        <div class="sidebar profile py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Profile</div>
        ${
          user.role?.roleRank != 3
            ? `
        <div class="sidebar create-user py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Create User</div>
        <div class="sidebar update-user py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Update User</div>
        `
            : ""
        }
        <div class="sidebar delete py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Delete</div>
      </div>
    </div>

    <!-- Product Management Section -->
    ${
      user.role?.roleRank != 3
        ? `
    <div class="border-b">
      <button class="flex items-center justify-between w-full p-4 text-left focus:outline-none">
        <span class="flex items-center">
          <img src="${productImg}" class="w-5 h-5 mr-4"/>
          Product Management
        </span>
        <svg class="w-4 h-4 transition-transform transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div class="hidden p-4 pt-0">
        <div class="sidebar create-product py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Create Product</div>
        <div class="sidebar update-product py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Update Product</div>
        <div class="sidebar delete-product py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Delete Product</div>
      </div>
    </div>

    <!-- Category Management Section -->
    <div class="border-b">
      <button class="flex items-center justify-between w-full p-4 text-left focus:outline-none">
        <span class="flex items-center">
          <img src="${categoryImg}" class="w-5 h-5 mr-4"/>
          Category Management
        </span>
        <svg class="w-4 h-4 transition-transform transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div class="hidden p-4 pt-0">
        <div class="sidebar create-category py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Create Category</div>
        <div class="sidebar update-category py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Update Category</div>
        <div class="sidebar delete-category py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Delete Category</div>
      </div>
    </div>
    <!-- Coupon Management Section -->
    ${
      user.role?.roleRank == 1
        ? ` <div class="border-b">
      <button class="flex items-center justify-between w-full p-4 text-left focus:outline-none">
        <span class="flex items-center">
          <img src="${couponImg}" class="w-5 h-5 mr-4"/>
         Coupon Management
        </span>
        <svg class="w-4 h-4 transition-transform transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div class="hidden p-4 pt-0">
        <div class="sidebar create-coupon py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Create Coupon</div>
        <div class="sidebar update-coupon py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Update Coupon</div>
        <div class="sidebar delete-coupon py-2 cursor-pointer hover:bg-blue-gray-50 border-b">Delete Coupon</div>
      </div>
    </div>`
        : ""
    }
   
    `
        : ""
    }
  </nav>
</div>
  `;
};
