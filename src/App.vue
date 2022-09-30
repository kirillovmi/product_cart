<template>
  <div class="market">
    <header>
      <div class="market__currency">
        1$ = <input v-model="usdPrice" type="number" min="20" max="80" />₽
      </div>
      <div class="market__cart" @click="isDrawerVisible = true">
        <img
          class="market__cart-img"
          src="https://img.icons8.com/fluency-systems-regular/35/000000/shopping-cart.png"
        />
        <div v-if="cart.length" class="market__cart-badge">
          {{ cart.length }}
        </div>
      </div>
    </header>
    <section>
      <Goods />
    </section>
    <UIDrawer
      :title="'Корзина'"
      :visible="isDrawerVisible"
      @close="isDrawerVisible = false"
    >
      <template v-slot:content>
        <Cart />
      </template>
    </UIDrawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import Goods from "./components/Goods.vue";
import Cart from "./components/Cart.vue";
import UIDrawer from "./components/ui/UIDrawer.vue";

export default defineComponent({
  name: "App",
  components: {
    Goods,
    Cart,
    UIDrawer,
  },
  setup() {
    const store = useStore();

    const isDrawerVisible = ref(false);

    const usdPrice = computed({
      get() {
        return store.getters["mutual/usdPrice"];
      },
      set(value) {
        store.commit("mutual/updatePrice", value);
      },
    });

    const cart = computed(() => store.getters["cart/products"]);

    onMounted(async () => {
      store.dispatch("goods/getDataFromFiles");
      updateData();
    });

    const updateData = () => {
      setInterval(() => {
        store.dispatch("goods/getDataFromFiles");
      }, 15000);
    };

    return { usdPrice, isDrawerVisible, cart };
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
}

.market {
  padding: 0px 30px;

  header {
    padding: 16px 0px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__currency {
  }

  &__cart {
    position: relative;
    margin-left: 16px;

    &-badge {
      position: absolute;
      bottom: 0;
      right: -10px;
      color: white;
      background: red;
      padding: 4px 8px;
      border-radius: 100%;
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>
