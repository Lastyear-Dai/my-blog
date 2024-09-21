import LoginPage from "./components/login.vine";
import EnrollPage from "./components/enroll.vine";
import Prompt from "./components/prompt.vine";
import style from './style/index.module.scss';

import { ref } from "vue";
function Login() {
  const active = ref<boolean>(false)
  //提交状态
  const loadingBtn = ref<boolean>(false)
  const changePrompt = () => {
    active.value = !active.value
  }
  function submitLoading(is: boolean) {
    loadingBtn.value = is
  }
  return vine`
   <div :class="style.login">
   <ElCard :class="style.card" >
      <!-- 注册卡片 -->
      <EnrollPage @submit="submitLoading" :loadingBtn="loadingBtn" @change="changePrompt"  :style="active?'left:50%;opacity: 1;':''"/>
      <!-- 登录卡片 -->
      <LoginPage   @submit="submitLoading" :loadingBtn="loadingBtn"  :style="active?'top:100%;':''"  />
      <!-- 登录注册切换卡片 -->
      <Prompt  :loadingBtn="loadingBtn"   :style="active?'right:50%;':''" @change="changePrompt"/>
  </ElCard>
  </div>
`

}

export default Login; 