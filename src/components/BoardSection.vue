<template>
  <div
    v-dragscroll:nochilddrag
    class="relative overflow-auto min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] max-w-[calc(100vw+256px)] h-full w-screen bg-light-grey dark:bg-very-dark-grey transition-all"
    :class="
      controller.showSidebar
        ? 'sm:translate-x-[256px] lg:translate-x-[300px]'
        : 'translate-x-0'
    "
  >
    <div v-if="!boardsStore.boards.length">
      <EmptyBoard />
    </div>
    <div v-else data-dragscroll class="mx-auto w-11/12 pt-6 pb-24">
      <div data-dragscroll>
        <div class="flex gap-6">
          <KanbanBoard data-dragscroll />
          <NewColumn />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import KanbanBoard from "./board/KanbanBoard.vue";
import NewColumn from "./board/NewColumn.vue";
import { useBoardsStore } from "@/stores/boards";
import { useController } from "@/stores/controller";
import EmptyBoard from "./board/EmptyBoard.vue";
const controller = useController();
const boardsStore = useBoardsStore();
</script>
