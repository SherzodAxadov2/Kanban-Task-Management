<template>
  <!-- Todo: Refactor modal name   -->
  <BaseModal>
    <div class="flex items-center justify-between mb-6">
      <h2
        class="text-black text-base font-bold sm:text-[18px] leading-6 max-w-[390px] dark:text-white"
      >
        {{ research.name }}
      </h2>
      <div class="relative cursor-pointer">
        <div @click="showToggle" class="p-[6px]">
          <svg
            class="fill-medium-grey pointer-hover"
            width="5"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill-rule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" class="pointer-hover"></circle>
              <circle cx="2.308" cy="10" r="2.308" class="pointer-hover"></circle>
              <circle cx="2.308" cy="17.692" r="2.308" class="pointer-hover"></circle>
            </g>
          </svg>
        </div>

        <div
          class="absolute z-[9] -bottom-24 sm:bottom-[-110px] right-[-110%] shadow-selectShadow rounded-[20px] bg-white dark:bg-dark-grey transition-all overflow-hidden"
          :class="controller.researchDots ? 'block' : 'hidden'"
        >
          <ul class="flex flex-col w-[160px]" ref="ul">
            <li
              @click="showBoardModal"
              class="text-sm text-medium-grey font-medium p-4 pb-2 transition-all hover:!bg-lines-light dark:hover:!bg-lines-dark"
            >
              Edit Task
            </li>
            <li
              @click="showDeleteModal"
              class="text-sm text-red font-medium p-4 pt-2 transition-all hover:!bg-lines-light dark:hover:!bg-lines-dark"
            >
              Delete Task
            </li>
          </ul>
        </div>
      </div>
    </div>

    <p class="text-medium-grey font-bold text-xs sm:text-[13px] leading-[23px] mb-6">
      {{ research.description }}
    </p>

    <label for="name" class="text-medium-grey font-bold text-xs dark:text-white"
      >Subtasks ({{ research.subTasks.filter((st) => st.isCompleted).length }} of
      {{ research.subTasks.length }})</label
    >
    <!--   Todo: Checkbox component kerak. Stillari ham shu component ichidan o'zgarishi kerak edi. -->
    <label
      v-for="(subtask, index) in research.subTasks"
      :key="index"
      class="relative w-full flex my-4 p-3 items-center rounded bg-light-grey hover:bg-main-purple/25 transition-all duration-200 text-black font-bold text-xs cursor-pointer pl-10 dark:bg-[#20212C] dark:text-[#fff] dark:hover:text-[white]/50"
      :for="index"
      :class="
        subtask.isCompleted ? 'line-through text-[#00011250] dark:text-[#fff]/50 ' : ''
      "
    >
      <input
        type="checkbox"
        class="absolute opacity-0 cursor-pointer"
        :name="index"
        v-model="subtask.isCompleted"
        @change="saveToBoard"
        :id="index"
      />
      <span
        class="absolute w-4 h-4 border-[1px] bg-white border-[#828FA33F] rounded-[2px] mr-4 left-3"
      ></span>
      {{ subtask.title }}
    </label>

    <label
      for="description"
      class="block mt-4 text-medium-grey font-bold text-xs dark:text-white"
      >Current Status</label
    >
    <CSelect
      selected="Todo"
      class="mt-2"
      placeholder="e.g. Make coffee"
      id="description"
      name="description"
    />
    <CButton @click="saveChanges" class="bg-main-purple mt-6 text-white text-sm"
      >Save Changes</CButton
    >
  </BaseModal>
</template>

<script setup>
import BaseModal from "./BaseModal.vue";
import CSelect from "../forms/CSelect.vue";
import CButton from "../forms/CButton.vue";
import { useController } from "@/stores/controller";
import { useBoardsStore } from "@/stores/boards";
// import { saveChanges } from "../composables/saveChanges.js";
import { saveChanges } from "../composables/saveChanges.js";
import { ref } from "vue";

const controller = useController();
const store = useBoardsStore();

let research = ref([]);

controller.getSelectValue = store.columns[0].name;

const col = store.columns.find((col) =>
  col.tasks.some((task) => task.id === controller.taskId)
);

if (col) {
  research.value = col.tasks.find((task) => task.id === controller.taskId);
}

const saveToBoard = () => {
  store.saveStorage(store.boards);
};

// saveChanges();

const showToggle = () => {
  controller.researchDots = !controller.researchDots;
};

const showDeleteModal = () => {
  controller.deleteBoard.isShown = true;
  controller.deleteBoard.board = false;
  controller.researchDots = false;
  controller.researchModal = false;
};

const showBoardModal = () => {
  controller.taskModal.isShown = true;
  controller.taskModal.newTask = true;
  controller.researchDots = false;
  controller.researchModal = false;
};
</script>

<style scoped>
input:checked label {
  text-decoration: line-through;
  opacity: 0.5;
}
span::after {
  content: "";
  position: absolute;
  display: none;
  left: 33%;
  top: 10%;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
input:checked + span {
  background: #635fc7;
  border-color: #635fc7;
}
input:checked + span::after {
  display: block;
}
</style>
