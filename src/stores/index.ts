import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  //这个就是state  声明一个响应式数据
  const count = ref(0)
  //计算属性就是  
  const doubleCount = computed(() => count.value * 2)
  //函数就是actions
  function increment() {
    count.value++
  }
  //这里要导出
  return { count, doubleCount, increment }
})
