import { ElMenu, ElMenuItem, ElSubMenu } from "element-plus"
import { RouterLink, useRouter, useRoute } from 'vue-router'
function Header() {
  vineStyle.scoped(scss`
  @import url('./style/index.module.scss');
    `)
  const router = useRouter()
  const route = useRoute()
  console.log(route.fullPath)
  return vine`
    <div class="header">
          <div class="logo" @click="router.push('/')">
              <span class="logoIcon2"></span>
              <span class="logoIcon1"></span>
          </div>
          <ElMenu  router :default-active="route.fullPath"  :collapse="true"  class="myMenu">
              <ElMenuItem index="/home">🏡起始页</ElMenuItem>
              <ElMenuItem index="/blogList">🥝博客</ElMenuItem>
          </ElMenu>
        <RouterLink to="/login" class="toLogin" >登录</RouterLink>
    </div>
    `
}


export default Header