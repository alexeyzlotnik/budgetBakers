<template>
   <div class="toast py-2 px-5">
      <div class="toast-body relative">
         <p>{{ message }}</p>
         <span v-if="removeAction" class="text-xs">
            You have {{ timer / 1000 }} sec to
            <a @click.prevent="cancelEvent" class="underline cursor-pointer">cancel this</a>
         </span>
         <span
            @click="closeToast"
            class="close absolute -top-4 -right-6 rounded-full bg-white w-5 h-5 text-center flex justify-center items-center shadow-grey cursor-pointer shadow">
            X
         </span>
      </div>
   </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let props = defineProps({
   message: String,
   removeAction: {
      type: Boolean,
      default: false,
   }
});

let emits = defineEmits(['close', 'cancel']);

// data
let timer = ref(30000);

// methods
let closeToast = () => {
   emits('close');
};

let closeToastAfterTimer = () => {
   setInterval(() => {
      timer.value -= 1000;
      if (timer.value === 0) {
         closeToast();
      }
   }, 1000);
};

let cancelEvent = () => {
   emits('cancel');
   resetTimer();
};

let resetTimer = () => {
   timer.value = 30000;
};

// lifecycle
onMounted(() => {
   closeToastAfterTimer();
   resetTimer();;
});

</script>

<style scoped>
.toast{
   position: fixed;
   bottom: 40px;
   left: 50%;
   transform: translateX(-50%);
   background: #fff;
   color: #000;
}

</style>