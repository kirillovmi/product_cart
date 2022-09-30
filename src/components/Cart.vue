<template>
  <div class="cart">
    <table class="cart__content">
      <tr class="cart__content__header">
        <th class="cart__content__header-title">
          Наименование товара и описание
        </th>
        <th class="cart__content__header-count">Количество</th>
        <th class="cart__content__header-price">Цена</th>
        <th class="cart__content__header-control"></th>
      </tr>
      <tr
        v-for="selectedProduct in cart.products"
        :key="selectedProduct.id"
        class="cart__content__product"
      >
        <td>
          <h3 class="cart__content__product-title">
            {{ selectedProduct.product.title }}
          </h3>
        </td>
        <td>
          <input
            v-model="selectedProduct.count"
            type="number"
            class="cart__content__product-count"
            :min="1"
            :max="selectedProduct.product.count"
          /><span>шт.</span>
        </td>
        <td>
          <p
            class="cart__content__product-price"
            :class="{ grow: isPriceGrow === true, fall: isPriceGrow === false }"
          >
            {{ (selectedProduct.product.price * usdPrice).toFixed(2) }} ₽<span
              >/ шт.</span
            >
          </p>
        </td>
        <td>
          <button
            class="cart__content__product-control"
            @click="removeProduct(selectedProduct.product.id)"
          >
            Удалить
          </button>
        </td>
      </tr>
    </table>
    <div class="cart__footer">
      <p class="sum">
        Общая стоимость:
        <span
          class="sum-number"
          :class="{ grow: isPriceGrow === true, fall: isPriceGrow === false }"
          >{{ (cart.sum * usdPrice).toFixed(2) }} ₽</span
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { Cart } from "../models/CartModel";

export default defineComponent({
  setup() {
    const store = useStore();

    const removeProduct = (productId: number): void => {
      store.commit("cart/removeProduct", productId);
    };

    return {
      cart: computed(() => new Cart(store.getters["cart/products"])),
      usdPrice: computed(() => store.getters["mutual/usdPrice"]),
      isPriceGrow: computed(() => store.getters["mutual/isPriceGrow"]),
      removeProduct,
    };
  },
});
</script>

<style lang="scss">
.grow {
  color: green;
}
.fall {
  color: red;
}
.cart {
  width: 100%;
  font-family: sans-serif;

  &__content {
    width: 100%;

    &__header {
      text-align: left;

      th {
        font-size: 16px;
        border-bottom: 1px dashed;
      }

      &-title {
        width: 40%;
      }
      &-count {
        width: 30%;
        width: 50px;
      }
      &-price {
        width: 20%;
      }
      &-control {
        width: 10%;
      }
    }

    &__product {
      td {
        padding: 8px;

        &:first-child {
          padding-left: 0;
        }

        &:last-child {
          padding-right: 0;
        }
      }
      &-title {
        font-size: 14px;
      }
      &-control {
        padding: 8px;
        background: transparent;
        border: 1px dashed;
        text-transform: uppercase;
        cursor: pointer;
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
    border-top: 1px dashed;

    .sum {
      font-size: 20px;
      &-number {
        font-weight: 600;
        border-bottom: 1px dashed;
      }
    }
  }
}
</style>
