<template>
  <div
    class="w-full h-full bg-white flex flex-col items-center p-[50px] fixed top-[10%]"
  >
    <h1 class="text-[32px]">Sign up</h1>

    <form
      action=""
      class="mt-[25px] flex flex-col gap-[20px]"
      @submit.prevent="submitForm"
    >
      <div class="flex flex-col gap-y-[8px] w-[320px] relative">
        <label for="email" class="font-medium text-[15px] mb-0">Email</label>
        <input
          type="email"
          id="email"
          class="py-[12px] px-[15px] text-[16px] border-[1px] rounded outline-none w-full"
          placeholder="john@example.com"
          v-model="state.email"
          :class="{ 'border-red': v$.email.$error }"
        />
        <span
          v-if="v$.email.$error"
          class="text-red absolute top-[80px] text-[14px]"
          >please enter email correctly</span
        >
      </div>

      <div class="flex flex-col gap-y-[8px] w-[320px] relative">
        <label for="name" class="font-medium text-[15px] mb-0 mt-2"
          >Full Name</label
        >
        <input
          type="text"
          id="name"
          class="py-[12px] px-[15px] text-[16px] border-[1px] rounded outline-0 w-full"
          placeholder="John Doe"
          v-model="state.name"
          :class="{ 'border-red': v$.name.$error }"
        />
        <span
          v-if="v$.name.$error"
          class="text-red absolute top-[90px] text-[14px]"
          >fill this field</span
        >
      </div>

      <div class="flex flex-col gap-y-[8px] w-[320px] relative">
        <label for="password" class="font-medium text-[15px] mb-0 mt-2"
          >Password</label
        >
        <input
          type="password"
          id="password"
          class="py-[12px] px-[15px] text-[16px] border-[1px] rounded outline-0 w-full"
          placeholder="At least 8 characters"
          v-model="state.password"
          :class="{ 'border-red': v$.password.$error }"
        />
        <span
          v-if="v$.password.$error"
          class="text-red absolute top-[90px] text-[14px]"
          >at least 8 characters</span
        >
      </div>

      <button
        class="bg-[#5a1fe0] p-[14px] w-full text-white outline-none rounded-[5px] text-[14px] cursor-pointer mt-2"
      >
        Create Account
      </button>
    </form>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import { reactive } from "vue";

const state = reactive({
  name: "",
  email: "",
  password: "",
});

const rules = {
  name: { required },
  email: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, state);

function submitForm() {
  v$.value.$touch();
  v$.value.$validate();
  console.log(v$.state.name.$error);
}
</script>
