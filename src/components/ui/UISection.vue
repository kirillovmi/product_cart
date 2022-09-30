<template>
  <div class="section">
    <div class="section__header" @click="visible = !visible">
      <h3 class="section__header-title">
        {{ title }}
      </h3>
      <span>{{ visible ? "&#215;" : "&#8594;" }}</span>
    </div>
    <transition
      name="section"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <ul class="section__content" v-if="visible">
        <li
          class="section__content-item"
          v-for="(product, i) in sections"
          :key="i"
        >
          <UIProduct :product="product" />
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import UIProduct from "./UIProduct.vue";

export default defineComponent({
  name: "UISection",
  components: {
    UIProduct,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    sections: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const visible = ref(false);

    const start = (el: any) => {
      el.style.height = el.scrollHeight + "px";
    };

    const end = (el: any) => {
      el.style.height = "";
    };

    return { start, end, visible };
  },
});
</script>

<style lang="scss">
.section {
  border-bottom: 1px solid;
  margin-bottom: 8px;
  max-width: 1000px;

  &__header {
    padding: 10px;
    border-bottom: 1px solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;

    &-title {
      margin: 0;
      font-family: "Lato";
    }
  }
  &__content {
    margin: 0;
    padding: 0;
    margin-left: 50px;

    list-style: none;

    &-item {
      border-bottom: 1px solid;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  &-enter-active,
  &-leave-active {
    will-change: height, opacity;
    transition: height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
  }
  &-enter,
  &-leave-to {
    height: 0 !important;
    opacity: 0;
  }
}
</style>
