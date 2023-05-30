<script lang='ts' setup>
import { ref } from 'vue'

const time = ref(new Date().toLocaleTimeString())

setInterval(() => {
  time.value = new Date().toLocaleTimeString()
}, 1000)
</script>

<template>
  <div class="pt-16 text-7xl text-center">
    <span class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
      {{ time }}
    </span>
  </div>
</template>

<style lang='scss' scoped>
</style>
