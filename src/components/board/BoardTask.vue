<template>
  <div
    @click="showModal(task.id)"
    class="group flex flex-col bg-white dark:bg-dark-grey p-4 rounded-lg cursor-pointer shadow-task max-w-[280px]"
  >
    <p
      class="text-black dark:text-white font-bold select-none pointer-events-none group-hover:text-main-purple"
    >
      {{ task.name }}
    </p>
    <span
      class="text-xs text-medium-grey font-bold select-none pointer-events-none"
      >{{ completedCount }} of {{ task.subTasks.length }} substasks</span
    >
  </div>
</template>

<script setup>
const controller = useController();
const props = defineProps({
  task: Object,
});

import { useController } from "@/stores/controller";
import { computed } from "vue";

const showModal = (id) => {
  controller.researchModal = true;
  controller.taskId = id;
};
const completedCount = computed(() => {
  return props.task.subTasks.filter((st) => st.isCompleted).length;
});
</script>

<style lang="scss"></style>
