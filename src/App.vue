<template>
  <div class="flex flex-col">
    <Header />
    <main>
      <div class="flex w-full">
        <SideBar />
        <BoardSection />
      </div>
      <ShowSidebar />
      <DeleteModal v-if="store.deleteBoard.isShown" />
      <BoardModal v-if="store.boardForm.isShown" />
      <TaskModal v-if="store.taskModal.isShown" />
      <Research v-if="store.researchModal" />
      <!-- <SignUpPage /> -->
    </main>
  </div>
</template>

<script setup>
import SideBar from "./components/SideBar.vue";
import Header from "./components/KanbanHeader.vue";
import { useController } from "./stores/controller";
import BoardSection from "./components/BoardSection.vue";
import ShowSidebar from "./components/ShowSidebar.vue";
import BoardModal from "./components/Modal/BoardModal.vue";
import DeleteModal from "./components/Modal/DeleteModal.vue";
import TaskModal from "./components/Modal/TaskModal.vue";
import Research from "./components/Modal/ResearchModal.vue";
import SignUpPage from "./components/SignUpPage.vue";

const store = useController();
</script>
