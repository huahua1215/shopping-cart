<script setup>
import { ref } from "vue";
// 切換 產品列表 / 購物車 的 tab
const isShowingCart = ref(false);
const products = ref([
  {
    name: "Miss Dior 淡香水",
    price: 2900,
    thumb:
      "https://s5.pimg.tw/album/styleme/element/16810585_1450092930-1717385843/sresize/380x380.jpg",
    amountShow: 1,
    amount: 0,
    showingIcon: false,
  },
  {
    name: "All in one 亮彩膏",
    price: 1350,
    thumb:
      "https://s7.pimg.tw/album/styleme/element/89173767_1485853372-1511782940/sresize/380x380.jpg",
    amountShow: 1,
    amount: 0,
    showingIcon: false,
  },
  {
    name: "超放電晶潤雙色唇膏",
    price: 850,
    thumb:
      "https://s8.pimg.tw/album/styleme/element/89516838_1486096498-3741399352/sresize/380x380.png",
    amountShow: 1,
    amount: 0,
    showingIcon: false,
  },
  {
    name: "奇蹟活源精露",
    price: 2100,
    thumb:
      "https://s.pimg.tw/album/styleme/element/62038610_1471836809-2423849843/sresize/380x380.jpg",
    amountShow: 1,
    amount: 0,
    showingIcon: false,
  },
]);
// 切換產品列表/購物車的tab
const toggleTab = (shouldShowCart) => {
  isShowingCart.value = shouldShowCart;
};
// 點擊-後的動作
const minusOne = (product) => {
  product.amountShow--;
  product.amountShow = product.amountShow < 1 ? 1 : product.amountShow;
};
//點擊＋後的動作
const addOne = (product) => {
  product.amountShow++;
};
//點擊add to cart後的動作
const addToCart = (product) => {
  product.amount += product.amountShow;
  product.showingIcon = true;
  setTimeout(() => {
    product.showingIcon = false;
    updateProductsInCart();
  }, 900);
};

// 在購物車移除單一品項
const remove = (product) => {
  product.amount = 0;
  updateProductsInCart();
};

// 購物車裡的品項
const productsInCart = ref([]);
const updateProductsInCart = () => {
  productsInCart.value = products.value
    .filter((p) => p.amount)
    .map((p) => {
      p.sum = p.amount * p.price;
      return p;
    });
};
const total = () => {
  return productsInCart.value.reduce((sum, p) => sum + p.sum, 0);
};
</script>

<template>
  <div class="phone">
    <!-- 導航列 -->
    <nav class="pt-5 bg-white">
      <ul class="flex">
        <li
          class="pb-2 mx-12 cursor-pointer"
          :class="{
            'text-red-400 border-b-4 border-red-400 ': !isShowingCart,
          }"
          @click="toggleTab(false)"
        >
          PRODUCTS
        </li>
        <li
          class="pb-2 mx-12 cursor-pointer"
          :class="{
            'text-red-400 border-b-4 border-red-400': isShowingCart,
          }"
          @click="toggleTab(true)"
        >
          SHOPPING CART
        </li>
      </ul>
    </nav>
    <main
      :class="{ shift: isShowingCart }"
      class="flex w-414px h-736px overflow-hidden overflow-y-scroll bg-lightGray"
    >
      <!-- 瀏覽商品 -->
      <div class="content box-border w-full shrink-0">
        <div class="product" v-for="product in products">
          <div class="shadow-infoBox relative p-2.5 bg-white rounded-md m-5">
            <div class="flex items-center">
              <img class="max-h-24" :src="product.thumb" />
              <div class="text-start">
                <h2 class="text-xl font-bold">{{ product.name }}</h2>
                <p class="text-l">${{ product.price }}</p>
              </div>
            </div>
            <!-- 按鈕點擊區 -->
            <div class="border-t mt-3 pt-3 flex justify-between">
              <div>
                <button
                  class="border-0 focus:outline-none"
                  @click="minusOne(product)"
                >
                  -
                </button>
                <span class="mx-3">{{ product.amountShow }}</span>
                <button
                  class="border-0 focus:outline-none"
                  @click="addOne(product)"
                >
                  +
                </button>
              </div>
              <div>
                <button
                  class="border-0 focus:outline-none"
                  @click="addToCart(product)"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <!-- 購物成功的 icon -->
            <div
              class="icon-container absolute inset-0 z-10 text-lightRed text-20px bg-lightWhite opacity-0 pointer-events-none pt-30px pr-20px pl-20px"
              :class="{
                'showing opacity-100 pointer-events-auto': product.showingIcon,
              }"
            >
              <p>
                <svg
                  class="ml-110px"
                  viewBox="0 0 100 100"
                  width="80"
                  height="80"
                >
                  <circle
                    class="circle fill-none stroke-lightRed stroke-2"
                    cx="50"
                    cy="50"
                    r="48"
                  ></circle>
                  <polyline
                    class="check fill-none stroke-lightRed stroke-2"
                    points="28,53 42,66 74,34"
                  ></polyline>
                </svg>
                成功加入購物車
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 購物車 -->
      <div class="content box-border w-full shrink-0">
        <table
          class="m-20px border-spacing-0 border-collapse bg-white shadow-table width-90%"
        >
          <thead class="text-lightRed text-16px text-left">
            <tr>
              <th colspan="5">Order</th>
            </tr>
          </thead>
          <tbody class="text-14px">
            <tr class="txet-c2c2c2 text-12px">
              <td>品項</td>
              <td>數量</td>
              <td>單價</td>
              <td>小計</td>
              <td></td>
            </tr>
            <tr v-for="product in productsInCart">
              <td>{{ product.name }}</td>
              <td>{{ product.amount }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.sum }}</td>
              <td>
                <button
                  class="outline-0 border-0 pb-0.4em text-b6b6b6 text-18px py-5px px-15px cursor-pointer"
                  @click="remove(product)"
                >
                  X
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot class="text-959595 text-12px bg-f9f9f9">
            <tr>
              <td></td>
              <td colspan="3">
                Total
                <span class="ml-base text-black text-20px"
                  >$ {{ total() }}</span
                >
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  </div>
</template>

<style scoped>
/*#region Tab切換頁面之動畫 */
main {
  .content {
    transition: transform 300ms;
  }
  &.shift {
    .content {
      transform: translate(-100%, 0);
    }
  }
}
/* #endregion */

/*#region 購物成功的 icon 動畫 */
.icon-container {
  transition: opacity 0.3s;
  .check {
    stroke-dasharray: 80;
    stroke-dashoffset: 80;
  }
  &.showing {
    .check {
      animation: check 0.3s cubic-bezier(0.5, 0, 0.6, 1) forwards 0.2s;
    }
  }
}
@keyframes check {
  from {
    stroke-dashoffset: 80;
  }
  to {
    stroke-dashoffset: 0;
  }
}
/* #endregion 購物成功的 icon 動畫*/

/*#region 購物車表格樣式 */
table {
  tr {
    border-bottom: 1px solid #f3f3f3;
  }
  th,
  td {
    min-width: 5em;
    padding: 15px 9px;
    text-align: right;
    &:first-child {
      text-align: left;
    }
  }
}
/* #endregion 購物車表格樣式*/
</style>
