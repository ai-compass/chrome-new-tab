<script setup lang="ts">
import { useBackground } from './hooks/useBackground'
import SwitchImage from '~icons/majesticons/image'

const { bg, wallpaper, content, switchWrapper } = useBackground()
</script>

<template>
  <div class="app-container" :style="{ backgroundImage: `url(${bg})`, backgroundSize: `${wallpaper === 'fy' ? 'unset' : 'cover'}` }">
    <div class="flex max-w-[1400px] h-screen m-auto py-16 font-mono">
      <div class="flex flex-col gap-6 w-[500px]">
        <BexTime />
        <QWeather />
        <Hitokoto />
        <TimeProgress />
        <Translate />
      </div>
      <div class="flex flex-1 flex-col gap-6 pl-8">
        <Search />
        <CustomWebsite />
      </div>
    </div>
  </div>

  <el-tooltip effect="dark" :content="content" placement="bottom">
    <SwitchImage class="fixed top-4 right-4 text-[#fff] cursor-pointer" @click="switchWrapper" />
  </el-tooltip>
</template>

<style>
#app {
  background-size: cover;
}
.app-container {
  background-color: #000;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background 0.5s;
}
</style>
