<template>
  <div>
    <transition name="show">
      <div v-if="visible" class="drawer">
        <div class="drawer__header">
          <slot name="header">
            <div class="default-header">
              <h3>{{ title }}</h3>
              <button class="close-button" @click="close">&#x2715;</button>
            </div>
          </slot>
        </div>
        <div class="drawer__content">
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
    <div v-if="visible" class="overlay" @click="close"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UIDrawer",
  emits: ["close"],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };

    return { close };
  },
});
</script>

<style lang="scss">
.drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 700px;
  height: 100%;
  background: #fff;
  z-index: 1;

  &__header {
    .default-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24px;
      font-weight: 600;
      padding: 12px;

      .close-button {
        background: transparent;
        border: none;
        cursor: pointer;
      }
    }
  }
  &__content {
    padding: 15px 20px;
  }
}
.show {
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateX(300px);
  }
  &-enter-active,
  &-leave-active {
    transition: all 500ms;
  }
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.5);
  z-index: 0;
}
</style>
