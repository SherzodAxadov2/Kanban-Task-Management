<template>
  <div @click="showEditBoard" class="flex items-center min-h-screen pt-11">
    <div
      class="h-full flex items-center min-w-[280px] cursor-pointer bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50 dark:from-dark-grey dark:to-dark-grey/25 rounded-md text-medium-grey hover:text-main-purple"
    >
      <p class="text-2xl text-center w-full font-bold select-none">
        + New Column
      </p>
    </div>
  </div>
</template>

<script setup>
import { useController } from "../../stores/controller";
const controller = useController();

const showEditBoard = () => {
  controller.boardForm.isShown = true;
  controller.boardForm.edit = true;
};
</script>
