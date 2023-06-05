<template>
  <BaseModal>
    <div class="overflow-y-scroll">
      <h2 class="text-black mb-6 leading-6 text-base font-bold dark:text-white">
        {{ textModal }}
      </h2>

      <form ref="form">
        <label for="title" class="text-medium-grey font-bold text-xs dark:text-white"
          >Title</label
        >
        <CInput
          ref="taskTitle"
          class="mt-2"
          placeholder="e.g. Web Design"
          v-model="task.name"
        />
        <label
          for="description"
          class="text-medium-grey font-bold text-xs dark:text-white block mt-3"
          >Description</label
        >
        <textarea
          name=""
          id=""
          cols="3"
          rows="6"
          resize="none"
          v-model="task.description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break willrecharge the batteries a little."
          class="w-full text-sm font-medium rounded outline-none py-2 pl-4 border-[1px] hover:border-main-purple focus:border-main-purple border-[#828FA340] transition-all duration-200 resize-none mt-2 mb-6 dark:bg-[#2B2C37] dark:text-white"
        ></textarea>

        <label for="subtasks" class="text-medium-grey font-bold text-xs dark:text-white"
          >Subtasks</label
        >
        <div v-if="task.subTasks.length > 0">
          <div
            v-for="(item, i) in task.subTasks"
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
              v-model="item.title"
              class="mt-2"
              type="text"
            />
            <DeleteIcon @click="deleteColumn(i)" class="mt-2 cursor-pointer" />
          </div>
        </div>
        <CButton
          @click="addNewBoard"
          class="bg-light-grey mt-3 text-main-purple text-sm mb-6"
          >+ Add New Column</CButton
        >

        <label
          for="description"
          class="text-medium-grey font-bold text-xs dark:text-white"
          >Status</label
        >
        <CSelect
          selected="Todo"
          class="mt-2"
          placeholder="e.g. Make coffee"
          id="description"
          name="description"
        />
        <CButton class="bg-main-purple mt-6 text-white text-sm" @click="AddNewTask">{{
          controller.taskModal.newTask ? "Save Changes" : "Create New Task"
        }}</CButton>
      </form>
    </div>
  </BaseModal>
</template>

<script setup>
import { reactive, ref } from "vue";
import BaseModal from "./BaseModal.vue";
import CInput from "../forms/CInput.vue";
import CButton from "../forms/CButton.vue";
import CSelect from "../forms/CSelect.vue";
import DeleteIcon from "../Icons/DeleteIcon.vue";
import { useBoardsStore } from "../../stores/boards.js";
import { useController } from "../../stores/controller.js";
import { saveChanges } from "../composables/saveChanges.js";
const controller = useController();
const boardsStore = useBoardsStore();

const form = ref();

const taskTitle = ref();
const isError = ref(false);
const inputs = ref([]);

let textModal = ref("");
textModal.value = controller.taskModal.newTask ? "Edit Task" : "Add New Task";

const examplePlacehlders = ["e.g.Todo...", "e.g.Doing...", "e.g.Done..."];

let task = reactive({
  name: "",
  description: "",
  id: Date.now(),
  subTasks: [],
});

const deleteColumn = (index) => {
  task.subTasks.splice(index, 1);
};

const addNewBoard = () => {
  task.subTasks.push({ title: "", isCompleted: false, id: Date.now() });
  console.log(task.subTasks);
};

const validate = () => {
  let valid = true;
  if (task.name.trim().length === 0) {
    valid = false;
    taskTitle.value.error = true;
  }
  inputs.value.forEach((e, index) => {
    if (task?.subTasks[index]?.title.trim().length === 0) {
      console.log(e.error);
      e.error = true;
      valid = false;
    }
  });
  return valid;
};

if (controller.taskModal.newTask) {
  boardsStore.columns.map((col) => {
    col.tasks.map((el) => {
      if (el.id === controller.taskId) {
        task = el;
      }
    });
  });
}

function AddNewTask() {
  //   Todo: Vuelidate kerak. bunaqa yaratgandan ko'ra.
  if (validate()) {
    if (!controller.taskModal.newTask) {
      boardsStore.columns.map((col) => {
        if (col.name === controller.getSelectValue) {
          col.tasks.push(task);
        }
      });
      boardsStore.saveStorage(boardsStore.boards);
      form.value.reset();
      controller.taskModal.isShown = false;
    }
    if (controller.taskModal.newTask) {
      boardsStore.columns.forEach((col) => {
        col.tasks.forEach((el, index) => {
          if (el.id === controller.taskId) {
            col.tasks[index] = task;
            saveChanges();
            controller.taskModal.isShown = false;
            boardsStore.saveStorage(boardsStore.boards);
          } else {
            controller.taskModal.isShown = false;
            return el;
          }
        });
      });
    }
  } else {
    taskTitle.value.error = true;
    isError.value = true;
    inputs.value.forEach((el) => {
      el.error = true;
    });
  }
}
</script>
