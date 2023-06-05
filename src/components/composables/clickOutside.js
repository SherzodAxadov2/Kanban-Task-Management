import { onBeforeMount, onMounted } from "vue";

export function useClickOutside(el_target, callback_fn) {
  if (!el_target) return;

  let listener = (e) => {
    if (
      !e.target == el_target.value ||
      !e.composedPath().includes(el_target.value)
    ) {
      //clicked inside modal/active
      return;
    }
    if (typeof callback_fn == "function") {
      callback_fn();
    }
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });
  onBeforeMount(() => {
    window.removeEventListener("click", listener);
  });
  return listener;
}
