import { ElButton } from 'element-plus'
import style from '../style/index.module.scss'
import { ref } from 'vue'
function prompt() {
  const emit = vineEmits<{
    change: [isState: boolean]
  }>()
  //按钮loading
  const loadingBtn = vineProp<boolean>()
  const isState = ref<boolean>(false)
  const onclick = () => {
    isState.value = !isState.value
    emit('change', isState.value)
  }

  return vine`
  <div :class="style.prompt">
        <h1>{{isState?'已' : '没'}}有账号?</h1>
        <p>{{isState?'请登录🚀':'立即注册吧😊'}}</p>
  <ElButton :loading="loadingBtn" round size="large" @click="onclick"  color="var(--el-color-primary)" style="width:120px;border-color: #fff;">{{isState?'登录' : '注册'}}</ElButton>
  </div>

  
  `
}


export default prompt