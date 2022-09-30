<template>
  <div class="product">
    <p class="product__title">{{ product.title }}</p>
    <p class="product__count">
      <span>{{ product.count }}</span> шт.
    </p>
    <p
      class="product__cost"
      :class="{ grow: isPriceGrow === true, fall: isPriceGrow === false }"
    >
      <span>{{ (product.price * usdPrice).toFixed(2) }} ₽</span> / шт.
    </p>
    <button class="product__action" @click="addToCart">В корзину</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { Goods, SelectedGoods } from "../../models/GoodsModel";

export default defineComponent({
  name: "UIProduct",
  props: {
    product: {
      type: Object,
      default: () => ({
        id: 0,
        title: "test",
        count: 0,
        cost: 0,
      }),
    },
  },
  setup(props) {
    const store = useStore();

    const addToCart = () => {
      const product: SelectedGoods = {
        product: props.product as Goods,
        count: 1,
      };
      store.commit("cart/addProduct", product);
    };

    return {
      addToCart,
      usdPrice: computed(() => store.getters["mutual/usdPrice"]),
      isPriceGrow: computed(() => store.getters["mutual/isPriceGrow"]),
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
.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-family: sans-serif;

  p {
    margin: 0;
    font-size: 16px;
  }

  &__title {
    width: 40%;
    font-weight: 400;
  }

  &__count {
    width: 10%;

    span {
      border-bottom: 1px dashed;
    }
  }
  &__cost {
    width: 20%;

    span {
      border-bottom: 1px dashed;
    }
  }
  &__action {
    width: 10%;
    background: transparent;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    padding: 8px;
    outline: 1px dashed;
    font-weight: 600;

    &:hover {
      outline: 1px solid;
    }
  }
}
</style>
