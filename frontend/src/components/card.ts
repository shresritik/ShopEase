export interface ICard {
  title: string;
  price: number;
  qty: number;
  img: string;
  category: string;
}
export default function Card(props: ICard) {
  return `<div
  class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
>
  <div
    class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96"
  >
    <img
      alt="prod"
      src="${props.img}"
      class="object-cover w-full h-full"
    />
  </div>
  <div class="p-6">
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
      class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75"
    >
   Category: ${props.category}
    </p>
    <p
      class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75"
    >
   Quanity: ${props.qty}
    </p>
  </div>
  <div class="p-6 pt-0">   

    <button
      class="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
     
      type="button"
         ${props.qty == 0 ? "disabled" : ""}
    >
      Add to Cart
    </button>
  </div>
</div>
`;
}
