import { useBoardsStore } from "../../stores/boards.js";
import { useController } from "../../stores/controller.js";

export const saveChanges = async () => {
  const controller = useController();
  const store = useBoardsStore();

  const selectedTask = {};

  for (const col of store.columns) {
    const index = col.tasks.findIndex((task) => task.id === controller.taskId);
    if (index !== -1) {
      Object.assign(selectedTask, col.tasks[index]);
      col.tasks.splice(index, 1);
    }
    if (col.name === controller.getSelectValue) {
      col.tasks.push(selectedTask);
    }
  }

  await Promise.all(store.columns.map(() => store.saveStorage(store.boards)));
  controller.researchModal = false;
};
