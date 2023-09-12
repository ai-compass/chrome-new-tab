export function getImgInfo(): Promise<{ width: number; height: number; src: string }> {
  getScreen()
  return new Promise((resolve) => {
    fetch('https://img.nsmc.org.cn/CLOUDIMAGE/FY4A/MTCC/FY4A_DISK.JPG')
      .then((response) => {
        if (!response.ok)
          throw new Error('Network response was not ok')

        return response.blob()
      })
      .then((blob) => {
        const img = new Image()
        img.src = URL.createObjectURL(blob)
        img.onload = () => {
          const width = img.width
          const height = img.height
          resolve({
            width,
            height,
            src: img.src,
          })
        }
      })
      .catch(() => {
        resolve({
          width: 0,
          height: 0,
          src: '',
        })
      })
  })
}

function getScreen() {
  const screen = {
    sWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    sHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  }

  return screen
}

function resizeImage(width: number, height: number, sWidth: number, sHeight: number, scaleFactor: number) {
  const ratio = Math.min(sWidth / width, sHeight / sHeight) * scaleFactor
  const w = Math.floor(width * ratio)
  const h = Math.floor(height * ratio)

  return {
    w,
    h,
  }
}

// 裁剪图片成圆形
function clipImageToCircle(width: number, height: number) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!

  // 设置画布大小
  canvas.width = width // 画布宽度
  canvas.height = height // 画布高度

  context.fillStyle = 'black' // 设置背景颜色为黑色
  context.fillRect(0, 0, width, height)

  // 绘制一个圆形路径
  context.beginPath()
  context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, Math.PI * 2, true)
  context.closePath()
  context.clip() // 将路径裁剪

  return {
    context,
    canvas,
  }
}

// 将数据URL转换为Blob
function dataURLtoBlob(dataURL: string) {
  const arr = dataURL.split(',') // 将数据URL拆分成MIME类型和Base64数据部分
  const mime = arr[0].match(/:(.*?);/)![1] // 从MIME类型中提取出具体的MIME类型
  const bstr = atob(arr[1]) // 将Base64数据解码成二进制字符串
  const n = bstr.length
  const uint8Array = new Uint8Array(n)

  for (let i = 0; i < n; i++)
    uint8Array[i] = bstr.charCodeAt(i)

  return new Blob([uint8Array], { type: mime }) // 创建Blob对象
}

// 裁剪转换图片
function clipImage(w: number, h: number, src: string): Promise<string> {
  const { context, canvas } = clipImageToCircle(w, h)
  const img = new Image()
  img.src = src

  return new Promise((resolve) => {
    img.onload = () => {
      context.drawImage(img, 0, 0, w, h)
      const croppedImage = canvas.toDataURL('image/png')
      resolve(URL.createObjectURL(dataURLtoBlob(croppedImage)))
    }
  })
}

// 初始化
export default async function initWrapper(): Promise<string> {
  // 获取图片信息
  const { width, height, src } = await getImgInfo()
  // 获取屏幕信息
  const { sWidth, sHeight } = getScreen()
  // 计算图片缩放后的宽高
  const { w, h } = resizeImage(width, height, sWidth, sHeight, 0.5)

  const url = await clipImage(w, h, src)

  return url
}
