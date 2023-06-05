<template>
  <header
    class="hidden bg-white left-0 top-0 dark:bg-dark-grey sm:flex items-center sm:pr-4"
  >
    <div
      class="flex items-center pl-6 h-20 md:min-h-24 border-r border-r-lines-light dark:border-r-lines-dark transition-all"
      :class="
        controller.showSidebar ? 'min-w-[256px] lg:min-w-[300px]' : '!min-w-[200px]'
      "
    >
      <img
        class="hidden dark:block"
        src="../assets/icons/logo-dark.png"
        alt="kanban logo"
      />
      <img
        class="block dark:hidden"
        src="../assets/icons/logo-light.png"
        alt="kanban logo"
      />
    </div>
    <div class="flex flex-1 items-center h-16 sm:h-20 gap-4">
      <h1 class="text-2xl text-black dark:text-white font-bold pl-4 line-clamp-1">
        {{ store.activeBoardName ? store.activeBoardName : "" }}
      </h1>
      <div v-if="store.boards.length > 0" class="flex items-center ml-auto gap-4">
        <CButton
          @click="showTaskModal"
          class="text-sm font-bold rounded-3xl cursor-pointer bg-main-purple py-3 px-4 text-white hover:bg-main-purple-light whitespace-nowrap"
        >
          + Add New Task
        </CButton>

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
            class="absolute z-[9] -bottom-24 sm:bottom-[-110px] right-[-100%] shadow-selectShadow rounded-[20px] bg-white dark:bg-dark-grey transition-all overflow-hidden"
            :class="controller.headerDots ? 'block' : 'hidden'"
          >
            <ul class="flex flex-col w-[160px]" ref="ul">
              <li
                @click="showBoardModal"
                class="text-sm text-medium-grey font-medium p-4 pb-2 transition-all hover:!bg-lines-light dark:hover:!bg-lines-dark"
              >
                Edit Board
              </li>
              <li
                @click="showDeleteModal"
                class="text-sm text-red font-medium p-4 pt-2 transition-all hover:!bg-lines-light dark:hover:!bg-lines-dark"
              >
                Delete Board
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Mobile -->
  <div
    class="bg-white left-0 top-0 dark:bg-dark-grey flex sm:hidden items-center sm:pr-4"
  >
    <div class="flex items-center gap-4 h-16 mx-auto w-11/12">
      <div>
        <img src="../assets/icons/logo-mobile.png" alt="logo mobile" />
      </div>
      <div
        v-if="store.boards.length > 0"
        class="flex items-center gap-2 cursor-pointer"
        @click="showSidebarModal"
      >
        <h1 class="text-black dark:text-white font-bold text-lg">
          {{ store.activeBoardName ? store.activeBoardName : "" }}
        </h1>
        <div>
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4"></path>
          </svg>
        </div>
      </div>
      <div v-if="store.boards.length > 0" class="flex items-center ml-auto gap-4">
        <CButton
          @click="showTaskModal"
          class="rounded-3xl cursor-pointer bg-main-purple min-w-[48px] min-h-[32px] hover:bg-main-purple-light"
        >
          <span class="flex items-center justify-center text-lg font-bold text-white"
            >+</span
          >
        </CButton>
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
            class="absolute z-[9] -bottom-24 sm:bottom-[-110px] right-[-100%] shadow-selectShadow rounded-[20px] bg-white dark:bg-dark-grey transition-all overflow-hidden"
            :class="controller.headerDots ? 'block' : 'hidden'"
          >
            <ul class="flex flex-col w-[160px]" ref="ul">
              <li
                @click="showBoardModal"
                class="text-sm text-medium-grey font-medium p-4 pb-2 transition-all hover:!bg-lines-light dark:hover:!bg-lines-dark"
              >
                Edit Board
              </li>
              <li
                @click="showDeleteModal"
                class="text-sm text-red font-medium p-4 pt-2 transition-all hover:!bg-lines-light dark:hover:!bg-lines-dark"
              >
                Delete Board
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SidebarModal v-if="controller.showSidebarModal" />
</template>

<script setup>
import { useBoardsStore } from "../stores/boards";
import { useController } from "../stores/controller.js";
import SidebarModal from "./SidebarModal.vue";

const controller = useController();
const store = useBoardsStore();

const showTaskModal = () => {
  if (store.boards.length > 0) {
    controller.taskModal.isShown = true;
    controller.taskModal.newTask = false;
  }
};

const showSidebarModal = () => {
  controller.showSidebarModal = true;
};

const showToggle = () => {
  controller.headerDots = !controller.headerDots;
};

const showBoardModal = () => {
  if (store.boards.length > 0) {
    controller.boardForm.isShown = true;
    controller.boardForm.edit = true;
  }
  controller.headerDots = false;
};

const showDeleteModal = () => {
  if (store.boards.length > 0) {
    controller.deleteBoard.isShown = true;
    controller.deleteBoard.board = true;
    controller.researchModal = false;
  }
  controller.headerDots = false;
};
</script>
