<template>
  <div class="container mx-auto">
    <!--  Todo: Bu component nega kerak?    -->
    <h1 class="font-bold text-2xl text-black">Design System</h1>

    <!-- Title With Number -->
    <NumberedHeading class="font-bold text-2xl text-black">
      <template #number>01</template>
      <template #title>Colors</template>
    </NumberedHeading>

    <!-- Interactive Elements -->
    <NumberedHeading class="font-bold text-2xl text-black">
      <template #number>03</template>
      <template #title>Interactive Elements</template>
    </NumberedHeading>
    <div class="flex gap-8 mb-20">
      <CButton
        class="text-base bg-main-purple text-white hover:bg-main-purple-light"
      >
        Button Primary (L)
      </CButton>
      <CButton
        class="text-sm bg-main-purple text-white hover:bg-main-purple-light"
      >
        Button Primary (S)
      </CButton>
      <CButton
        class="text-sm bg-purple-secondary text-main-purple hover:bg-purple-secondary-hover"
      >
        Button Secondary
      </CButton>
      <CButton class="text-sm bg-red text-white hover:bg-red-light">
        Button Destructive
      </CButton>
    </div>

    <div class="flex gap-8 mb-16">
      <CheckBox name="idle">Idle</CheckBox>
      <CheckBox name="hovered">Hovered</CheckBox>
    </div>

    <div class="flex mb-16">
      <CInput class="block" type="text" placeholder="Enter task name" />
      <CInput class="block" type="email" placeholder="Enter email" />
    </div>

    <!-- Select -->
    <div class="flex">
      <CSelect />
    </div>
  </div>
</template>

<script setup>
import NumberedHeading from "./NumberedHeading.vue";
import CButton from "./forms/CButton.vue";
import CheckBox from "./forms/CheckBox.vue";
import CInput from "./forms/CInput.vue";
import CSelect from "./forms/CSelect.vue";
</script>
