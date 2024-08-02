export const FilterView = () => {
  return `
    <div class="container mx-auto p-4">
  <div class="flex flex-wrap -mx-2 flex-[0.3]">
    <!-- Filter Section -->
    <div class="w-full px-2">
      <form class="bg-white p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Filters</h2>

        <!-- Category Filter -->
        <div class="mb-4">
          <input
            type="text"
            id="search"
            placeholder="Search"
            class="border px-2 py-1 mb-3"
          />
          <div class="mb-4">
            <h3 class="font-semibold mb-2">Category</h3>
            <select class="w-full form-select" id="category-dropdown"></select>
          </div>
        </div>

        <!-- Price Filter -->
        <div class="mb-4">
          <h3 class="font-semibold mb-2">Price</h3>
          <div>
            <input
              type="range"
              min="0"
              value="0"
              max="10000"
              id="priceRange"
              class="w-full"
            />
          </div>
          <div class="flex justify-between text-sm mt-2">
            <span>0</span>
            <span id="priceValue"></span>

            <span>Rs.10000</span>
          </div>
        </div>
        <!-- Rating -->
        <div class="mb-4">
          <h3 class="font-semibold mb-2">Ratings</h3>
          <ul class="space-y-2">
            <li>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  class="form-radio"
                />
                <span class="ml-2">4 Stars & Up</span>
              </label>
            </li>
            <li>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  class="form-radio"
                />
                <span class="ml-2">3 Stars & Up</span>
              </label>
            </li>
            <li>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  class="form-radio"
                />
                <span class="ml-2">2 Stars & Up</span>
              </label>
            </li>
            <li>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  class="form-radio"
                />
                <span class="ml-2">1 Star & Up</span>
              </label>
            </li>
          </ul>
        </div>
        <button
          id="filterBtn"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Apply Filters
        </button>
      </form>
    </div>
  </div>
</div>

    `;
};