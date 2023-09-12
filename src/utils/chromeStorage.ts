//
export function getChromeStorage<T>(key: string): Promise<T> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      if (result[key])
        resolve(result[key])
      else
        resolve('' as unknown as T)
    })
  })
}

export function setChromeStorage(key: string, item: string): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: item }, () => {
      resolve(true)
    })
  })
}
