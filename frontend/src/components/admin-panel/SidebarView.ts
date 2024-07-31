import { userProfileStore } from "../../store";
import productImg from "../../assets/svg/products.svg";
import categoryImg from "../../assets/svg/category.svg";
import deleteImg from "../../assets/svg/delete.svg";
import userImg from "../../assets/svg/user.svg";
export const SidebarView = () => {
  const user = userProfileStore.getState();
  // TODO CHANGE ICON CLASS
  return /* html */ `
  
  <div
  class="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-xl shadow-blue-gray-900/5"
>
  <nav
    class="flex min-w-[240px] flex-col gap-1 font-sans text-base font-normal text-blue-gray-700"
  >${
    user.roleId != 2
      ? /* html */ `
    <div
      role="button"
      class="sidebar border orders flex items-center w-full p-6 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    >
      <div class="grid mr-4 place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          class="w-5 h-5 orders"
        >
          <path
          class="orders"
            fill-rule="evenodd"
            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      Orders
    </div>

    
    `
      : ""
  }
    
    <div
      role="button"
      class="sidebar profile flex items-center w-full p-6 border leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    >
      <div class="grid mr-4 place-items-center">
      <img src="${userImg}" class="delete"/>
      </div>
      Profile
    </div>

    <div
      role="button"
      class="sidebar delete flex items-center w-full p-6 border leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    >
      <div class="grid mr-4 place-items-center">
      <img src="${deleteImg}" class="delete"/>

      </div>
      Delete
    </div>
    ${
      user.roleId != 3
        ? /* html */ `
         <div
      id="create-user"
      role="button"
      class="sidebar create-user  flex items-center w-full p-6 border leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    ><div class="grid mr-4 place-items-center">
    <img src="${userImg}" class="create-user" />

      </div>
       Create User
    </div>
         <div
      id="create-user"
      role="button"
      class="sidebar update-user  flex items-center w-full p-6 border leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    ><div class="grid mr-4 place-items-center">
    <img src="${userImg}" class="update-user" />

      </div>
       Update User
    </div>
    <div
      role="button"
      id="create-product"
      class="sidebar create-product  flex items-center w-full p-6 border leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    >
      <div class="grid mr-4 place-items-center">
  <img src="${productImg}" class="create-product"/>
      </div>
      
      Create Product
    </div>
    <div
      role="button"
      id="update-product"
      class="sidebar update-product  flex items-center w-full p-6 border leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    >
      <div class="grid mr-4 place-items-center">
      <img src="${productImg}" class="update-product"/>

      </div>
      Update Product
    </div>
    <div
      role="button"
      id="delete-product"
      class="sidebar delete-product  flex items-center w-full p-6 border leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    >
      <div class="grid mr-4 place-items-center delete-product">
      <img src="${deleteImg}" class="delete-product"/>

      </div>
      Delete Product
    </div>
    <div
      role="button"
      id="create-category"
      class="sidebar create-category  flex items-center w-full p-6 border leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    >
      <div class="grid mr-4 place-items-center create-category">
      <img src="${categoryImg}" class="create-category"/>

      </div>
  Create Category
    </div>
    <div
      role="button"
      id="update-category"
      class="sidebar update-category  flex items-center w-full p-6 border leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    >
      <div class="grid mr-4 place-items-center update-category">
      <img src="${categoryImg}" class="update-category"/>

      </div>
  Update Category
    </div>
    <div
      role="button"
      id="delete-category"
      class="sidebar delete-category  flex items-center w-full p-6 border leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
    >
      <div class="grid mr-4 place-items-center delete-category">
      <img src="${deleteImg}" class="delete-category"/>

      </div>
  Delete Category
    </div>
        `
        : ""
    }
   
  </nav>
</div>
`;
};
