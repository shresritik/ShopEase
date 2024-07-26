export function Cart() {
  return `
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
}
