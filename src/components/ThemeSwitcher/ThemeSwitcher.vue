<template>
  <div class="pl-6">
    <div
      class="flex justify-center rounded-[6px] bg-light-grey dark:bg-very-dark-grey py-[14px] gap-6"
    >
      <img src="../../assets/icons/Sun.svg" alt="sun" />
      <label class="switch" @click="toggleTheme">
        <input type="checkbox" v-model="isDark" />
        <span class="slider round"></span>
      </label>
      <img src="../../assets/icons/Moon.svg" alt="sun" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const isDark = ref(false);

// Todo: onmounted'ni ichidagi funksiyani ham shu qatordan keyin yozvorish kerak.
if (localStorage.getItem("themeMode")) {
  isDark.value = localStorage.getItem("themeMode") === "dark";
}

const toggleTheme = () => {
  if (isDark.value) {
    document.body.classList.remove("dark");
    localStorage.setItem("themeMode", "light");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("themeMode", "dark");
  }
};

onMounted(() => {
  if (isDark.value) {
    document.body.classList.add("dark");
  }
});
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  /* margin: 9px; */
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #635fc7;
  -webkit-transition: 0.4s;
  transition: 0.4s cubic-bezier(0, 1, 0.5, 1);
  border-radius: 4px;
}

.slider:hover,
input:checked + .slider:hover {
  background-color: #8884f0;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.3s;
  transition: 0.4s cubic-bezier(0, 1, 0.5, 1);
  border-radius: 3px;
}

input:checked + .slider {
  background-color: #635fc7;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 12px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
