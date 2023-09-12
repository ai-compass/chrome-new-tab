import { computed, onMounted, ref, watch } from 'vue'
import getFYWrapper from '../utils/getFYWallpaper'
import { getChromeStorage, setChromeStorage } from '../utils/chromeStorage'

type Wallpaper = 'wallpaper' | 'fy'

function getLocalWallpaper() {
  // 引入文件下所有图片
  const images = import.meta.glob('../assets/bg/*.png', { eager: true })
  const random = (max: number, min: number) => Math.floor(Math.random() * (max - min + 1) + min)
  const img = images[`../assets/bg/bg${random(1, 9)}.png`] as { default: string }
  return img.default
}

export function useBackground() {
  const wallpaper = ref<Wallpaper>('wallpaper')
  const bg = ref('')

  const content = computed(() => {
    return wallpaper.value === 'fy' ? '切换到壁纸' : '切换到风云图'
  })

  watch(wallpaper, async (value) => {
    if (value === 'fy')
      bg.value = await getFYWrapper()
    else
      bg.value = getLocalWallpaper()
  })

  onMounted(async () => {
    const storageWallpaper = await getChromeStorage<Wallpaper>('wallpaper')
    if (storageWallpaper)
      wallpaper.value = storageWallpaper

    // 这里不在 watch 中设置 immediate 为 true，会导致页面背景闪烁
    if (storageWallpaper === 'fy')
      bg.value = await getFYWrapper()
    else
      bg.value = getLocalWallpaper()
  })

  function switchWrapper() {
    wallpaper.value = wallpaper.value === 'wallpaper' ? 'fy' : 'wallpaper'
    setChromeStorage('wallpaper', wallpaper.value)
  }

  return {
    bg,
    wallpaper,
    content,
    switchWrapper,
  }
}
