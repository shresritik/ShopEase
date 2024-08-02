export interface ICard {
  title: string;
  price: number;
  qty: number;
  img: string;
  category: string;
  avgRating: number;
}
export default function BaseCard(props: ICard) {
  console.log(props);

  return /*html */ `
  <div
  class="hover:cursor-pointer relative flex flex-col text-gray-700 bg-white drop-shadow-lg  bg-clip-border rounded-xl  lg:w-96"
>
  <div
    class="card relative mx-4 mt-4 overflow-hidden text-gray-700  bg-clip-border rounded-xl lg:h-72"
  >
    <img
      alt="prod"
      src="${props.img}"
      class="object-contain w-full hover:scale-110 transition duration-300 ease-out h-full"
    />
  </div>
  <div class="p-6 bg-gray-100 h-36 ">
    <div class="flex items-center justify-between mb-2">
      <p
        class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900"
      >
   ${props.title}
      </p>
      <p
        class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900"
      >
  Rs. ${props.price}
      </p>
    </div>
    <p
      class="block font-sans text-sm antialiased font-normal leading-normal text-black  opacity-75"
    >
   Category: ${props.category}
    </p>
    <div class="flex justify-start items-center gap-4 relative text-black  text-sm">

    <p
      class="block font-sans  antialiased  leading-normal opacity-75"
    >
   Quanity: ${props.qty}
    </p>
        <div class="quantity-div hidden absolute right-0  justify-center items-center gap-3 ">
    <button class="plus bg-orange-800  block w-maxselect-none  text-white m-1 w-8 text-xl ">+</button>
    <p class="quantity">0</p>
        <button class="minus bg-orange-800  block w-maxselect-none  text-white m-1 w-8 text-xl ">-</button>
  </div>
  </div>
  ${
    props.avgRating
      ? ` <div class="rate flex items-center "> <span class="mr-2 text-sm">Rating:<span> </div>`
      : ""
  }
 
  </div>

  <div class="p-6 pt-0 bg-gray-100">   

    <button
      class=" cart block w-full select-none rounded-lg bg-orange-800 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
         ${props.qty == 0 ? "disabled" : ""}
    >
      Add to Cart
    </button>
    <button
      class=" remove-cart  w-full hidden select-none rounded-lg bg-orange-800 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
    >
  Remove from Cart
    </button>
  </div>
</div>
`;
}
