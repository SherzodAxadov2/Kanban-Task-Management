<template>
  <div
    class="rounded-full h-4 w-4"
    :style="{ backgroundColor: bulletColors(columnIndex) }"
  ></div>
</template>

<script setup>
defineProps(["columnIndex"]);

const bulletColors = (index) => {
  const color = ["#49C4E5", "#8471F2", "#67E2AE"];
  if (color[index]) {
    return color[index];
  } else {
    // Todo: Nega Math.random() 2 martta ishlatilingan?
    let rand = Math.random();
    rand = Math.floor(rand * 360) + 1;
    // Todo: to'g'ridan to'g'ri return qilib yuborsa ham bo'ladi.
    const randomColor = `hsl(${rand}, 80%, 70%)`;
    return randomColor;
  }
};
</script>

<style lang="scss"></style>
