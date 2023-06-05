<template>
  <BaseModal>
    <h2 class="text-red font-bold text-lg leading-6">
      <slot> Delete this {{ deleteName }}? </slot>
    </h2>
    <p class="my-6 text-medium-grey leading-6 font-medium text-sm">
      Are you sure you want to delete the ‘{{ text }}’ task? This action will
      remove all columns and tasks and cannot be reversed.
    </p>
    <div class="flex items-center space-x-4">
      <CButton @click="onDelete" class="bg-red text-white text-sm"
        >Delete</CButton
      >
      <CButton @click="onCancel" class="bg-light-grey text-main-purple text-sm"
        >Cancel</CButton
      >
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref } from "vue";
import CButton from "../forms/CButton.vue";
import BaseModal from "./BaseModal.vue";
import { useBoardsStore } from "@/stores/boards";
import { useController } from "@/stores/controller";

const store = useBoardsStore();
const controller = useController();
const taskName = ref("");
const deleteName = computed(() => {
  return controller.deleteBoard.board ? "board" : "task";
});
const text = computed(() => {
  return controller.deleteBoard.board
    ? `${store.boards.filter((board) => board.isActive)[0].name}`
    : `${taskName.value}`;
});

store.columns.map((col) => {
  col.tasks.map((task) => {
    if (task.id === controller.taskId) {
      taskName.value = task.name;
    }
  });
});

const saveStorage = () => {
  store.saveStorage(store.boards);
};

const onDelete = () => {
  const boards = store.boards;
  // delete active board

  // Todo: Bunaqa qilgandan ko'ra, button bosilgan vaqti index'ni ichkariga props orqali kirgazvorish kerak.
  boards.forEach((item, i) => {
    if (item.isActive && controller.deleteBoard.board) {
      boards.splice(i, 1);
      boards[0].isActive = true;
      controller.deleteBoard.isShown = false;
      saveStorage();
    }

    if (item.isActive && !controller.deleteBoard.board) {
      item.columns.map((col) => {
        col.tasks.map((task, i) => {
          if (task.id === controller.taskId) {
            col.tasks.splice(i, 1);
            saveStorage();
            controller.deleteBoard.isShown = false;
          }
        });
      });
    }
  });
  saveStorage();
};

const onCancel = () => {
  controller.deleteBoard.isShown = false;
};
</script>

<style lang="scss"></style>
