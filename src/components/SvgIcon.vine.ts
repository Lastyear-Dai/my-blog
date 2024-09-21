
import { computed } from 'vue'
export default function SvgIcomVine() {
  const prefix = vineProp.withDefault('icon')
  const name = vineProp<string>()
  const color = vineProp.withDefault('#000')
  const size = vineProp.withDefault('20')
  const symbolId = computed(() => `#${prefix.value}-${name.value}`)
  return vine`
   <span :style="'font-size:'+size+'px;'+'display:flex; align-items:center;justify-content:center;'">
    <!-- 是设置svg的宽度,忘记了 -->
    <svg aria-hidden="true" style="width:1em; height: 1em">
      <use :href="symbolId" :fill="color" />
    </svg>
  </span>
  
  `

}