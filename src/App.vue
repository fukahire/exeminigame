<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import Index from './pages/index.vue';
// import navDesktop from './components/navDesktop.vue';
// import navMobile from './components/navMobile.vue';

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- <navDesktop class="hidden md:flex sticky top-4" /> -->
    <!-- <div class="text-green-500">App.vue loaded</div> -->

    <!-- <Index /> -->
    <div class="p-2">
      <router-view class="grow pt-10 md:pt-10 mb-20" />
      
         <p>X:@Annaki40734081</p>
    </div>
    <!-- <navMobile class="block fixed md:hidden z-10" />  -->
  </div>
</template>