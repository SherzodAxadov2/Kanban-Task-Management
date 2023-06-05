<template>
  <button
    type="button"
    class="rounded-3xl tracking-[1px] hover:opacity-75 font-bold active:scale-90 py-2 w-full flex items-center justify-center cursor-pointer transition-all duration-200"
    :class="$attrs.class"
  >
    <slot />
  </button>
</template>
