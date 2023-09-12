import { ref } from 'vue'
import { getChromeStorage, setChromeStorage } from '../utils/chromeStorage'

export function useWeather() {
  const weatherStorageKey = 'one-tab-bex-weather-365'
  const city = ref('')

  function setChromeStorageLocation(): Promise<string> {
    return new Promise((resolve) => {
      ElMessageBox.prompt('输入天气地区', '提示', {
        confirmButtonText: '确认',
        // 不能为空
        inputPattern: /\S+/,
        inputValue: city.value,
        inputErrorMessage: '地区不能为空',
      })
        .then(({ value }) => {
          setChromeStorage(weatherStorageKey, value)
          city.value = value
          resolve(value)
        })
    })
  }

  return { city, weatherStorageKey, setChromeStorageLocation, getChromeStorage, setChromeStorage }
}
