<template>
  <div
    @click="hideOverlay"
    class="absolute left-0 top-0 bottom-0 right-0 sm:min-w-full bg-black bg-opacity-50 z-[11]"
    :class="toggleModal"
  ></div>
  <div
    :class="toggleModal"
    class="absolute overflow-y-auto rounded-md transform w-11/12 sm:w-full max-w-md left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 max-h-[calc(90vh)]"
  >
    <div class="bg-white dark:bg-dark-grey p-8" :class="$attrs.class">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useController } from "@/stores/controller";
import { computed } from "vue";

// Todo: store = useBoardStore(), controllerniki esa controllerStore = useController() qilaylik
const store = useController();

const toggleModal = computed(() => {
  return store.deleteBoard.isShown ||
    store.researchModal ||
    store.showSidebarModal ||
    store.taskModal.isShown ||
    store.boardForm.isShown
    ? "block"
    : "hidden";
});

const hideOverlay = () => {
  store.editBoardIsShown = false;
  store.deleteBoard.isShown = false;
  store.showSidebarModal = false;
  store.taskModal.isShown = false;
  store.researchModal = false;
  store.researchDots = false;
  store.boardForm.isShown = false;
};
</script>

<style>
body {
  overflow: hidden;
}
</style>
