
import { computed } from 'vue'

export default function wave() {
  vineStyle.scoped(scss`
    @import url('./style/index.scss');
    
    `)
  return vine`
   <div class="wave">
      <div class="box"></div>
      <div class="box2"></div>
   </div>
  
  `

}