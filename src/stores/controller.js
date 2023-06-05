import { defineStore } from "pinia";
import { ref } from "vue";

export const useController = defineStore("controller", () => {
  const showSidebar = ref(true);
  const deleteBoard = ref({ board: false, isShown: false });
  const taskModal = ref({
    newTask: false,
    isShown: false,
  });
  const addNewBoard = ref(false);
  const showSidebarModal = ref(false);
  const researchModal = ref(false);
  const getSelectValue = ref("");
  const taskId = ref();
  const headerDots = ref(false);
  const researchDots = ref(false);
  const boardForm = ref({
    edit: false,
    isShown: false,
  });

  return {
    showSidebar,
    deleteBoard,
    addNewBoard,
    showSidebarModal,
    taskModal,
    getSelectValue,
    researchModal,
    taskId,
    boardForm,
    headerDots,
    researchDots,
  };
});
