<!-- 'sm:translate-x-[-85%] sm:w-6/12 md:translate-x-[-80%] lg:translate-x-[-75%]' : ''" -->

<template>
  <div
    class="flex flex-col items-center gap-4 absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] sm:translate-x-[-75%] w-11/12 sm:w-auto max-w-sm transition-all"
  >
    <p class="text-center text-lg font-bold text-medium-grey">
      This board is empty. Create a new board to get started.
    </p>
    <CButton
      @click="showBoardModal"
      class="text-white text-base bg-main-purple w-48 py-[14px]"
    >
      + Add New Board
    </CButton>
  </div>
</template>

<script setup>
import CButton from "../forms/CButton.vue";
import { useController } from "../../stores/controller";
const controller = useController();

const showBoardModal = () => {
  controller.boardForm.isShown = true;
};
</script>
