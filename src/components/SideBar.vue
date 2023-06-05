<template>
  <div
    class="fixed z-10 transition-all"
    :class="controller.showSidebar ? 'translate-x-0' : 'translate-x-[-100%]'"
  >
    <div
      class="hidden sm:min-h-[calc(100vh-80px)] sm:flex sm:flex-col w-64 lg:w-[300px] bg-white dark:bg-dark-grey border-r border-r-lines-light dark:border-r-lines-dark"
    >
      <div class="w-full flex flex-1 flex-col pb-8">
        <p
          class="text-xs text-medium-grey tracking-[2.4px] py-4 px-6 uppercase"
        >
          ALL BOARDS ({{ boardsStore.boards.length }})
        </p>
        <ul>
          <div class="max-h-[calc(100vh-300px)] overflow-y-scroll pr-6">
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
              class="group flex items-center gap-4 py-4 px-6 rounded-tr-full rounded-br-full hover:bg-main-purple/10 dark:hover:bg-white cursor-pointer transition-all duration-200"
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

        <div class="mt-auto pr-6">
          <div class="mb-2">
            <ThemeSwitcher />
          </div>

          <div>
            <div
              @click="controller.showSidebar = !controller.showSidebar"
              class="group flex items-center gap-4 py-4 pl-8 rounded-tr-full rounded-br-full hover:bg-main-purple/10 dark:hover:bg-white cursor-pointer transition-all duration-200"
            >
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  class="group-hover:fill-main-purple transition-all"
                  d="M17.7923 8.76153C16.7538 10.5238 15.1854 11.941 13.3062 12.8081L14.8099 14.9563C14.9286 15.1259 14.8874 15.3598 14.7177 15.4785L14.0697 15.9322C13.9 16.051 13.6662 16.0097 13.5474 15.84L3.19013 1.04373C3.07135 0.874074 3.11263 0.64023 3.28229 0.521481L3.93032 0.067825C4.09998 -0.050956 4.33382 -0.00967486 4.45257 0.159981L6.18775 2.63888C7.08163 2.38573 8.02525 2.25001 9 2.25001C12.7456 2.25001 16.0311 4.24982 17.7923 7.23847C18.0692 7.7084 18.0692 8.2916 17.7923 8.76153ZM1.50001 8C2.99714 10.5406 5.79513 12.25 9 12.25C9.07946 12.2499 9.15892 12.2487 9.23834 12.2465L10.239 13.676C9.82784 13.7253 9.4141 13.75 9 13.75C5.25438 13.75 1.96889 11.7502 0.207702 8.76156C-0.069234 8.29163 -0.069234 7.7084 0.207702 7.23847C0.997544 5.89816 2.09379 4.75732 3.4001 3.90623L4.26076 5.13569C3.12813 5.86432 2.17986 6.84635 1.50001 8ZM8.52194 11.2231C6.00685 10.9415 4.26532 8.50791 4.86788 6.00303L8.52194 11.2231ZM9.74494 3.78104C12.6351 4.02282 15.1201 5.65835 16.5 8C15.5721 9.57456 14.1446 10.8297 12.4302 11.5566L11.596 10.3649C13.2731 9.06931 13.7072 6.7886 12.75 4.99869L12.75 5C12.75 5.9665 11.9665 6.75 11 6.75C10.0335 6.75 9.25 5.9665 9.25 5C9.25 4.52594 9.43881 4.09619 9.74494 3.78104Z"
                  fill="#828FA3"
                />
              </svg>

              <h3
                class="text-base font-bold text-medium-grey transition-all group-hover:text-main-purple"
              >
                Hide Sidebar
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
    counter.value < boardsStore.boards.length
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
};

const selectBoard = (id) => {
  boardsStore.boards = boardsStore.boards.map((board) =>
    board.id === id
      ? { ...board, isActive: true }
      : { ...board, isActive: false }
  );
  boardsStore.saveStorage(boardsStore.boards);
};
</script>
<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
