import { ref } from 'vue'
import style from '../style/index.module.scss'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, type FormRules, type FormInstance } from 'element-plus'
import { sendEmail, enrollApi } from '@/api/login/index'
import type { EnrollPage } from '@/type/login';
function enroll() {
  const formData = ref<EnrollPage>({
    username: '',
    password: '',
    email: '',
    code: '',
  })
  //验证码计时
  const countdown = ref<number>(0)
  //获取验证码定时器id
  const intervalId = ref<number>(0)
  const formDom = ref<FormInstance>()
  //按钮loading
  const loadingBtn = vineProp<boolean>()

  const emit = vineEmits<{
    submit: [is: boolean],
    change: []
  }>()
  //表单校验规则
  const rules = ref<FormRules<EnrollPage>>({
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
    email: [
      {
        required: true,
        message: '邮箱不能为空',
        trigger: 'blue',
      },
      {
        validator: (rule: any, value: string, callback: (error?: string | Error) => void) => {
          const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          !regex.test(value) && callback(new Error('请输入有效的邮箱地址'));
          callback()
        }, trigger: 'blur'
      }
    ],
    code: [
      {
        required: true,
        message: '验证码不能为空',
        trigger: 'blue',
      },
      { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
    ],
  })

  function getCaptcha() {
    formDom.value?.validateField('email', async (is: boolean) => {
      if (!is) return
      try {
        const { message } = await sendEmail({ email: formData.value.email })
        ElMessage({
          message,
          type: 'success',
        })
        // 设置倒计时为60秒
        countdown.value = 59;
        // 使用setInterval进行倒计时
        intervalId.value = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value--; // 倒计时递减
          } else {
            clearInterval(intervalId.value); // 倒计时结束，清除定时器
            countdown.value = 0; // 重置倒计时
          }
        }, 1000);

      } catch (error) {
        ElMessage({
          message: '网络嘎了!!',
          type: 'error',
        })
      }


    })
  }
  function submit() {
    formDom.value?.validate(async (is) => {
      if (!is) return
      try {
        emit('submit', true)
        const { code, message } = await enrollApi(formData.value)
        ElMessage({
          message,
          type: code === 200 ? 'success' : 'warning',
        })
        code === 200 && emit('change')
      } catch (error) {
        ElMessage({
          message: '网络嘎了!!',
          type: 'error',
        })
      } finally {
        emit('submit', false)
      }
    })
  }

  return vine`
    <div :class="style.enrollPage">
    <h1>注册</h1>
    <ElForm :model="formData"  :rules="rules" ref="formDom" label-width="auto" >
        <ElFormItem  prop="username">
        <ElInput style="width: 300px"  v-model="formData.username"  placeholder="用户名"/>
        </ElFormItem>
        <ElFormItem prop="password" >
        <ElInput style="width: 300px"  v-model="formData.password"  placeholder="密码"/>
        </ElFormItem>
        <ElFormItem prop="email" >
        <ElInput style="width: 300px"  v-model="formData.email"  placeholder="邮箱"/>
        </ElFormItem>
        <ElFormItem  prop="code">
        <ElInput style="width: 300px"  v-model="formData.code"  placeholder="验证码">
        <template #suffix>
        <ElButton size="small" color="var(--el-color-primary)" @click="getCaptcha">{{ countdown > 0 ? countdown + '秒后重新获取' : '获取验证码' }}</ElButton>
        </template>
        </ElInput>
        </ElFormItem>
        <ElFormItem  >
         <el-button :loading="loadingBtn" style="width:100%;" size="large" @click="submit" color="var(--el-color-primary)">注册</el-button>
        </ElFormItem>
    </ElForm>
    </div>
  `

}

export default enroll