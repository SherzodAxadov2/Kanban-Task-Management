<template>
  <label
    class="relative w-full flex p-3 items-center rounded bg-light-grey hover:bg-main-purple/25 transition-all duration-200 text-black font-bold text-xs cursor-pointer pl-10 dark:bg-[#20212C] dark:text-[#fff] dark:hover:text-[white]/50"
    :for="$attrs.name"
    :class="
      ($attrs.class,
      checkbox ? 'line-through text-[#00011250] dark:text-[#fff]/50 ' : '')
    "
  >
    <input
      type="checkbox"
      class="absolute opacity-0 cursor-pointer"
      :name="$attrs.name"
      v-model="checkbox"
      :id="$attrs.name"
    />
    <p>{{ isCompleted }}</p>
    <span
      class="absolute w-4 h-4 border-[1px] bg-white border-[#828FA33F] rounded-[2px] mr-4 left-3"
    ></span>
    <slot />
  </label>
</template>

<script setup>
import { ref } from "vue";
defineProps({
  isCompleted: Boolean,
});
const checkbox = ref(false);
</script>

<style lang="css" scoped>
input:checked label {
  text-decoration: line-through;
  opacity: 0.5;
}
span::after {
  content: "";
  position: absolute;
  display: none;
  left: 33%;
  top: 10%;
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
input:checked + span {
  background: #635fc7;
  border-color: #635fc7;
}
input:checked + span::after {
  display: block;
}
</style>
