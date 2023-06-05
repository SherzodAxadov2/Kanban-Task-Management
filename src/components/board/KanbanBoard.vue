<template>
  <div class="flex gap-6">
    <section
      v-for="(column, colIndex) in store.columns"
      :key="colIndex"
      class="min-w-[280px]"
      data-dragscroll
      @dragover.prevent
    >
      <div class="flex items-center gap-3 pb-6">
        <BulletPoint :columnIndex="colIndex" />
        <h2 class="text-medium-grey font-bold text-xs uppercase">
          {{ column.name }} ( {{ column.tasks.length }} )
        </h2>
      </div>
      <TransitionGroup
        tag="div"
        name="tasks"
        class="flex flex-col gap-5"
        data-dragscroll
      >
        <!--   Todo: onDragEnd($event) => onDragEvent kabi yozsa bo'ladi. Eventni kirgazib yuborish shart emas, default event keladi.       -->
        <BoardTask
          v-for="(task, taskIndex) in column?.tasks"
          :key="taskIndex"
          :task="task"
          draggable="true"
          :class="[
            tempTask?.taskIndex === taskIndex && tempTask?.colIndex === colIndex
              ? tempTaskStyle
              : '',
            draggedTask?.task?.id === task.id ? 'opacity-50' : '',
          ]"
          @dragstart="onDragTask($event, task, colIndex, taskIndex)"
          @dragenter="onDragEnterTask($event, task, colIndex, taskIndex)"
          @dragend="onDragEnd"
          @dragleave.prevent
        />
      </TransitionGroup>
      <div
        @dragenter="onDragEnterColumn(colIndex, $event)"
        class="h-full mt-5"
      />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BoardTask from "./BoardTask.vue";
import BulletPoint from "../BulletPoint.vue";
import { useBoardsStore } from "@/stores/boards";
const store = useBoardsStore();

const tempTask = ref(null);
const draggedTask = ref(null);
let tempTaskStyle = ["border-main-purple", "border-2"];

const onDragTask = (event, task, colIndex, taskIndex) => {
  draggedTask.value = {
    el: event.target,
    task,
    colIndex,
    taskIndex,
  };

  //delete selected task
  store.columns[colIndex].tasks.splice(taskIndex, 1);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
};

const onDragEnterColumn = (colIndex) => {
  removeTempTask();
  store.columns[colIndex].tasks.push(draggedTask.value.task);
  tempTask.value = {
    colIndex,
    taskIndex: store.columns[colIndex].tasks.length - 1,
  };
};

const removeTempTask = () => {
  if (tempTask.value) {
    store.columns[tempTask.value.colIndex].tasks.splice(
      tempTask.value.taskIndex,
      1
    );
    tempTask.value = null;
  }
};

const onDragEnterTask = (event, task, colIndex, taskIndex) => {
  if (draggedTask.value.task.id !== task.id) {
    removeTempTask();
    store.columns[colIndex].tasks.splice(taskIndex, 0, draggedTask.value.task);
    tempTask.value = {
      colIndex,
      taskIndex,
    };
  }
};

const onDragEnd = () => {
  if (!tempTask.value) {
    store.columns[draggedTask.value.colIndex].tasks.splice(
      draggedTask.value.taskIndex,
      0,
      draggedTask.value.task
    );
  }
  store.saveStorage(store.boards);
  draggedTask.value = null;
  tempTask.value = null;
};
</script>

<style lang="css">
.tasks-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.tasks-enter-to {
  opacity: 1;
  transform: scale(1);
}

.tasks-enter-active {
  transition: all 0.5s ease;
}
</style>
