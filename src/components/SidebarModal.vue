<template>
  <BaseModal class="!p-0">
    <div class="bg-white dark:bg-dark-grey">
      <div class="sm:flex sm:flex-col bg-white dark:bg-dark-grey">
        <div class="w-full flex flex-1 flex-col pb-4">
          <p
            class="text-xs text-medium-grey tracking-[2.4px] py-4 px-6 uppercase"
          >
            ALL BOARDS ({{ boardsStore.boards.length }})
          </p>
          <ul>
            <div class="max-h-[calc(80vh-200px)] overflow-y-scroll pr-6">
              <TransitionGroup name="list" tag="ul">
                <li
                  v-for="board in boardsStore.boards.slice(0, counter)"
                  :key="board.id"
                  @click="selectBoard(board.id)"
                >
                  <div
                    class="group flex items-center gap-4 py-4 pl-6 rounded-tr-full rounded-br-full hover:text-main-purple hover:bg-main-purple/10 dark:hover:bg-white cursor-pointer transition-all duration-200"
                    :class="
                      board.isActive
                        ? 'bg-main-purple hover:!bg-main-purple-light'
                        : ''
                    "
                  >
                    <div class="flex-shrink">
                      <BoardIcon
                        :color="board.isActive ? 'white' : '#828FA3'"
                        :class="board.isActive ? 'group-hover:!fill-white' : ''"
                      />
                    </div>

                    <h3
                      class="text-base font-bold group-hover:text-main-purple line-clamp-1"
                      :class="
                        board.isActive
                          ? 'text-white group-hover:!text-white'
                          : 'text-medium-grey'
                      "
                    >
                      {{ board.name }}
                    </h3>
                  </div>
                </li>
              </TransitionGroup>
            </div>
            <div
              @click="loadMore"
              v-if="showMore()"
              class="group my-1 hover:bg-purple-secondary-hover bg-purple-secondary dark:hover:bg-main-purple-light rounded mx-6 flex items-center justify-center py-[6px] cursor-pointer transition-all"
            >
              <p
                class="text-base font-bold text-medium-grey group-hover:text-dark-grey/50 transition-all"
              >
                Load More
              </p>
              <div class="ml-1 mt-[3px]">
                <svg
                  width="10"
                  height="7"
                  xmlns="http://www.w3.org/2000/svg"
                  class="group-hover:rotate-180 transition-all group-hover:mt-[2px] group-hover:animate-bounce"
                >
                  <path
                    stroke="#635FC7"
                    stroke-width="2"
                    fill="none"
                    d="m1 1 4 4 4-4"
                  ></path>
                </svg>
              </div>
            </div>

            <li @click="showBoardModal">
              <div
                class="group flex items-center gap-4 py-4 pl-6 mr-6 rounded-tr-full rounded-br-full hover:bg-main-purple/10 dark:hover:bg-white cursor-pointer transition-all duration-200"
              >
                <div class="flex-shrink">
                  <BoardIcon color="#635FC7" />
                </div>
                <h3 class="text-base font-bold text-main-purple line-clamp-1">
                  + Create New Board
                </h3>
              </div>
            </li>
          </ul>

          <div class="mt-[14px] pr-6">
            <div class="mb-2">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from "./Modal/BaseModal.vue";
import BoardIcon from "./Icons/BoardIcon.vue";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher.vue";
import { useController } from "@/stores/controller";

import { useBoardsStore } from "@/stores/boards";
import { ref } from "vue";

const controller = useController();
const boardsStore = useBoardsStore();

const counter = ref(5);

const showMore = () => {
  if (
    boardsStore.boards.length >= 6 &&
    counter.value !== boardsStore.boards.length
  ) {
    return true;
  } else {
    return false;
  }
};

const loadMore = () => {
  counter.value += 2;
};

const showBoardModal = () => {
  controller.boardForm.isShown = true;
  controller.boardForm.edit = false;
  controller.showSidebarModal = false;
};

const selectBoard = (id) => {
  boardsStore.boards = boardsStore.boards.map((board) =>
    board.id === id
      ? { ...board, isActive: true }
      : { ...board, isActive: false }
  );
  boardsStore.saveStorage(boardsStore.boards);
  controller.showSidebarModal = false;
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(30px);
}
</style>
