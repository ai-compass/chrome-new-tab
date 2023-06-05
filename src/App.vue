<script setup lang="ts">
import { ref } from 'vue'
import SwitchImage from '~icons/majesticons/image'

const drawer = ref(false)

// 引入文件下所有图片
const images = import.meta.glob('./assets/bg/*.png', { eager: true })
const random = (max: number, min: number) => Math.floor(Math.random() * (max - min + 1) + min)
const img = images[`./assets/bg/bg${random(1, 9)}.png`] as { default: string }
const bg = ref(img.default)

// onMounted(() => {
//   fetch('http://bing.ioliu.cn/v1/rand?type=json&w=1920&h=1080')
//     .then(res => res.json())
//     .then((res) => {
//       const { data, status } = res
//       if (status.code === 200)
//         bg.value = data.url || img.default
//     })
//     .catch(() => {
//       bg.value = img.default
//     })
// })
</script>

<template>
  <div class="app-container" :style="{ background: `url(${bg}) no-repeat 100%/cover` }">
    <div class="flex max-w-[1400px] h-screen m-auto py-16 font-mono">
      <div class="flex flex-col gap-6 w-[500px]">
        <BexTime />
        <Weather />
        <Hitokoto />
        <Translate />
      </div>
      <div class="flex flex-1 flex-col gap-6 pl-8">
        <Search />
        <CustomWebsite />
      </div>
    </div>
  </div>

  <SwitchImage class="fixed top-4 right-4 text-[#fff] cursor-pointer" @click="drawer = false" />
  <wallpaper-drawer v-model:drawer="drawer" />
</template>

<style>
#app {
  background-size: cover;
}
.app-bg1 {
  background: url(./assets/bg/bg1.png) no-repeat center center;
}
</style>
