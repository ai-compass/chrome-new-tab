/// <reference types="vite/client" />


interface ImportMetaEnv {
  readonly VITE_WEATHER_KEY: string
  readonly VITE_BAIDU_APP_ID: string
  readonly VITE_BAIDU_APP_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
