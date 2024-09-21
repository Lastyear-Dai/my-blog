//添加毛玻璃效果
export const useBlurApp = (el: string, isBlur: boolean) => {
  const app = document.querySelector(el)
  isBlur ? app?.classList.add('appBlur') : app?.classList.remove('appBlur')
}

//跳转必应搜索https://cn.bing.com/search?q=
export const useSearch = (keyword: string) => {
  window.open(`https://cn.bing.com/search?q=${keyword}`)
}