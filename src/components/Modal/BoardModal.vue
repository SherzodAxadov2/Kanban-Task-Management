<template>
  <BaseModal>
    <h2 class="text-black mb-6 leading-6 text-base font-bold dark:text-white">
      {{ controller.boardForm.edit ? "Edit Board" : "Add New Board" }}
    </h2>

    <form>
      <label
        for="name"
        class="text-medium-grey font-bold text-xs dark:text-white block mb-2"
        >Name</label
      >
      <CInput
        ref="boardTitle"
        placeholder="e.g. Web Design"
        v-model="board.name"
      />

      <label
        for="name"
        class="text-medium-grey font-bold text-xs dark:text-white block mt-6"
        >Columns</label
      >
      <div
        v-for="(item, i) in board.columns"
        :key="i"
        class="flex items-center gap-4"
      >
        <CInput
          :ref="
            (el) => {
              inputs[i] = el;
            }
          "
          :placeholder="
            examplePlacehlders[i] ? examplePlacehlders[i] : 'Your column title'
          "
          v-model="item.name"
          class="mt-1"
          type="text"
        />
        <DeleteIcon @click="deleteColumn(i)" class="mt-2 cursor-pointer" />
      </div>
      <CButton
        @click="addNewBoard"
        class="bg-light-grey mt-3 text-main-purple text-sm"
        >+ Create New Column</CButton
      >
      <CButton
        @click="addToBoard"
        class="bg-main-purple mt-6 text-white text-sm"
      >
        {{
          controller.boardForm.edit ? "SaveChanges" : "Create New Board"
        }}</CButton
      >
    </form>
  </BaseModal>
</template>

<script setup>
import { reactive, ref } from "vue";
import BaseModal from "./BaseModal.vue";
import CInput from "../forms/CInput.vue";
import CButton from "../forms/CButton.vue";
import DeleteIcon from "../Icons/DeleteIcon.vue";

import { useController } from "../../stores/controller";
import { useBoardsStore } from "../../stores/boards";

const controller = useController();
const store = useBoardsStore();

const boardTitle = ref(null);
const inputs = ref([]);

const examplePlacehlders = ["e.g.Todo...", "e.g.Doing...", "e.g.Done..."];

const board = reactive({
  id: Date.now(),
  isActive: false,
  name: "",
  columns: [
    { name: "", tasks: [], id: Date.now() },
    { name: "", tasks: [], id: Date.now() },
  ],
});

const deleteColumn = (index) => {
  if (board.columns.length > 2) {
    board.columns.splice(index, 1);
  }
};

const addNewBoard = () => {
  if (board.columns.length < 8) {
    board.columns.push({ name: "", tasks: [], id: Date.now() });
  }
};

const validate = () => {
  let valid = true;
  if (board.name.trim().length === 0) {
    valid = false;
    boardTitle.value.error = true;
  }
  inputs.value.forEach((e, index) => {
    if (board?.columns[index]?.name.trim().length === 0) {
      valid = false;
      e.error = true;
    }
  });
  return valid;
};

const makeActiveBoard = () => {
  store.boards.forEach((el) => (el.isActive = false));
  store.boards[0].isActive = true;
};

const addToBoard = () => {
  if (validate()) {
    if (!controller.boardForm.edit) {
      store.boards.unshift(board);
      makeActiveBoard();
      controller.boardForm.isShown = false;
      store.saveStorage(store.boards);
    }

    if (controller.boardForm.edit) {
      store.boards.forEach((item) => {
        if (item.isActive) {
          item.columns = board.columns;
          item.name = board.name;
          controller.boardForm.isShown = false;
          store.saveStorage(store.boards);
        }
      });
    }
  }
};

if (controller.boardForm.edit) {
  store.boards.forEach((item, i) => {
    if (item.isActive) {
      board.name = item.name;
      board.columns = JSON.parse(JSON.stringify(item.columns));
    }
  });
}
</script>
