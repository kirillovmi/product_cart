<template>
  <div class="goods">
    <h2 class="goods__title">Товары</h2>
    <UISection
      v-for="(section, i) in sections"
      :key="i"
      :title="section.title"
      :sections="section.products"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import UISection from "./ui/UISection.vue";

export default defineComponent({
  name: "Goods",
  components: {
    UISection,
  },
  setup() {
    const store = useStore();

    const sections = computed(() => store.getters["goods/sections"]);

    return {
      sections,
    };
  },
});
</script>

<style lang="scss">
.goods {
  &__title {
    font-size: 32px;
  }
}
</style>
