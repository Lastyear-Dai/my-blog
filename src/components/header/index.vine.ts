import style from "./style/index.module.scss"
import { ElMenu, ElMenuItem, ElSubMenu } from "element-plus"
import SvgIcon from "@/components/SvgIcon.vine"
import { RouterLink, useRouter } from 'vue-router'
function Header() {
  vineStyle.scoped(scss`
    @media (max-width: 650px){
        .myMenu{
          display: none;
        }
    }
    `)
  const router = useRouter()
  return vine`
    <div :class="style.header">
          <div :class="style.logo" @click="router.push('/')">
              <span :class="style.logoIcon2"></span>
              <span :class="style.logoIcon1"></span>
          </div>
          <ElMenu  :collapse="true" default-active="1" class="myMenu">
              <ElMenuItem index="1">🏡首页</ElMenuItem>
              <ElMenuItem index="2">🥝博客</ElMenuItem>
          </ElMenu>
        <RouterLink to="/login" :class="style.toLogin" >登录</RouterLink>
    </div>
    `
}


export default Header