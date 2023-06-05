import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useBoardsStore = defineStore("boards", () => {
  const saveStorage = (boards) => {
    localStorage.setItem("boards", JSON.stringify(boards));
  };

  const boards = ref([]);
  if (localStorage.getItem("boards")) {
    boards.value = JSON.parse(localStorage.getItem("boards"));
  }
  const columns = computed(() => {
    return boards.value.filter((board) => board?.isActive)[0]?.columns;
  });

  const activeBoardName = computed(() => {
    return boards.value.filter((board) => board?.isActive)[0]?.name;
  });

  const columnTasks = computed(() => {
    return boards.value.filter((board) => board?.isActive)[0]?.tasks;
  });

  const columnNames = computed(() => {
    return boards.value[0]?.columns.map((item) => item.name);
  });

  const tasks = computed(() => {
    return boards.value[0]?.columns[0].tasks;
  });

  return {
    boards,
    columns,
    columnNames,
    tasks,
    activeBoardName,
    columnTasks,
    saveStorage,
  };
});
