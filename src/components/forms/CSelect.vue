<template>
  <div class="w-full flex flex-col gap-2 tracking-[1px]">
    <div
      @click="showSelectors = !showSelectors"
      class="relative w-full rounded flex items-center justify-between py-2 px-4 border-[1px] border-[#828FA340] hover:border-main-purple focus-within:border-main-purple cursor-pointer"
    >
      <p class="text-black text-sm font-medium dark:text-white line-clamp-1">
        {{ controller.getSelectValue }}
      </p>
      <span></span>
    </div>
    <ul
      v-if="showSelectors"
      class="py-2 rounded-lg border-[1px] border-purple-secondary shadow-selectShadow max-h-[150px] overflow-hidden overflow-y-scroll"
    >
      <li
        class="py-2 px-4 text-medium-grey line-clamp-1 text-sm font-medium hover:bg-light-grey dark:hover:bg-main-purple-light cursor-pointer transition-all duration-200"
        v-for="selector in boardsStore.columns"
        :key="selector.id"
        @click="select(selector.id)"
      >
        {{ selector.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBoardsStore } from "../../stores/boards.js";
import { useController } from "../../stores/controller.js";
const controller = useController();
const boardsStore = useBoardsStore();

const showSelectors = ref(false);

controller.getSelectValue = boardsStore.columns[0].name;
boardsStore.columns.forEach((col) => {
  col.tasks.forEach((el) => {
    if (el.id === controller.taskId) {
      controller.getSelectValue = col.name;
      boardsStore.saveStorage(boardsStore.boards);
    }
  });
});

const select = (id) => {
  boardsStore.columns.map((c) => {
    if (c.id === id) {
      controller.getSelectValue = c.name;
    }
  });
  showSelectors.value = false;
};
</script>

<style lang="css" scoped>
span {
  border: solid #635fc7;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  margin-left: 5px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
</style>
