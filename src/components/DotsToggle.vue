<template>
  <div class="relative cursor-pointer">
    <!--  Todo: Modal store orqali toggle qilinmaydi. Props bilan change qilgan yaxshiroq.    -->
    <svg
      @click="showToggle"
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
    <div
      class="absolute z-[9] -bottom-24 sm:bottom-[-110px] right-[-100%] shadow-selectShadow rounded-[20px] bg-white dark:bg-dark-grey transition-all overflow-hidden"
      :class="store.formDots.isShown ? 'block' : 'hidden'"
    >
      <ul class="flex flex-col w-[160px]" ref="ul">
        <li
          @click="showBoardModal"
          class="text-sm text-medium-grey font-medium p-4 pb-2 transition-all hover:!bg-lines-light dark:hover:!bg-lines-dark"
        >
          Edit {{ store.formDots.board ? "Board" : "Task" }}
        </li>
        <li
          @click="showDeleteModal"
          class="text-sm text-red font-medium p-4 pt-2 transition-all hover:!bg-lines-light dark:hover:!bg-lines-dark"
        >
          Delete {{ store.formDots.board ? "Board" : "Task" }}
        </li>
      </ul>
    </div>
  </div>
  -->
</template>

//
<script setup>
// import { ref } from "vue";
// import { useController } from "../stores/controller.js";
// import { useClickOutside } from "./composables/clickOutside.js";
// const store = useController();
// const ul = ref();
// useClickOutside(ul, () => {
//   store.formDots.isShown = !store.formDots.isShown;
// });

// const showDeleteModal = () => {
//   store.deleteBoardIsShown = true;
//   store.formDots.isShown = false;
//   store.researchModal = false;
// };

// const showBoardModal = () => {
//   store.formDots.isShown = false;
//   store.boardForm.isShown = true;
//   store.boardForm.edit = true;
//   store.researchModal = false;
// };

// const showToggle = () => {
//   store.formDots.board = true;
//   store.formDots.isShown = !store.formDots.isShown;
// };
//
</script>
