
import { ref } from 'vue'
import style from '../style/index.module.scss'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import type { LoginPage } from '@/type/login';
import { loginApi } from '@/api/login/index'
import { useRouter } from 'vue-router';
function login() {
  const router = useRouter()
  //表单实例
  const formDom = ref<FormInstance | null>(null)
  //表单数据
  const formData = ref<LoginPage>({
    username: '',
    password: ''
  })
  //是否提交时
  const emit = vineEmits<{
    submit: [is: boolean]
  }>()
  //按钮loading
  const loadingBtn = vineProp<boolean>()
  //提交登录
  async function validatedLogin(is: boolean) {
    if (!is) return
    try {
      emit('submit', true)
      const { code, message } = await loginApi(formData.value)
      ElMessage({
        message,
        type: code === 200 ? 'success' : 'warning',
      })
      setTimeout(() => {
        if (code === 200) {
          router.push('/')
        }

      }, 1000);
    } catch (error) {
      ElMessage({
        message: '请检查网络连接!',
        type: 'success',
      })
    } finally {
      emit('submit', false)

    }
  }
  //表单校验规则
  const rules = ref<FormRules<LoginPage>>({
    username: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blue',
      },
      { min: 6, max: 20, message: '请输入6到20长度的用户名', trigger: 'blur' },
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blue',
      },
      { min: 6, max: 20, message: '请输入6到20长度的密码', trigger: 'blur' },
    ],
  })
  return vine`
  <div  :class="style.loginPage" >
      <h1>登录</h1>
      <ElForm  :model="formData" ref="formDom"   :rules="rules" label-width="auto" >
          <ElFormItem prop='username' >
          <ElInput  v-model="formData.username" style="width: 300px" placeholder="用户名/邮箱" />
          </ElFormItem>
          <ElFormItem  prop='password'>
          <ElInput v-model="formData.password"  @keyup.enter="formDom?.validate(validatedLogin)" style="width: 300px" type="password" placeholder="密码" />
          </ElFormItem >
          <ElFormItem  ><div :class="style.revisePwd">忘记密码?</div></ElFormItem>
          <ElFormItem  ><ElButton :loading="loadingBtn" :class="style.loginBtn" color="var(--el-color-primary)" @click="formDom?.validate(validatedLogin)" >登录</ElButton></ElFormItem>
      </ElForm>
  </div>
  `
}

export default login