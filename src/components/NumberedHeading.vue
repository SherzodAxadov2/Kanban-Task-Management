<template>
  <div class="flex items-center gap-4">
    <p class="text-main-purple"><slot name="number" /></p>
    <h2>
      <slot name="title" :class="$attrs.class" />
    </h2>
  </div>
</template>
<!-- Todo: Bu component'ni vazifasi nima?? Va ishlatilingan joyni ham ko'rdim, tashqaridan style'lar kirib kelyabdi. Componentni o'ziga kiritsakcHI?-->
