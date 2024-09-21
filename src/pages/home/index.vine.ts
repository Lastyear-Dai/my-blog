// @ts-ignore
import { LyTypewriter, LyTime } from 'last-year-components/index.js'
import type { typewriterOptions, options } from 'last-year-components/index'
import SvgIcomVine from "@/components/SvgIcon.vine"
import { ElInput } from 'element-plus'
import { getHitokoto } from '@/api'
import { useBlurApp, useSearch } from '@/hook'
import { onMounted, ref } from "vue"
function Home() {
  vineStyle.scoped(scss`
  @import url("./style/index.module.scss");
  // 给搜索框添加透明背景色
:deep(.el-input__wrapper) {
  background-color: rgba(0, 0, 0, 0.223) !important;
}
// 搜索框添加过度效果
.InputItem {
  transition: all 0.3s;
}
// 时间鼠标移入放大
:deep(.time) {
  transition: all 0.3s;
  &:hover {
    transform: scale(1.2);
  }
}
  `)
  //打字机参数
  const LyTypewriteroptions: typewriterOptions = {
    el: '#lyTypewriter',
    content: '',
    startSpeed: 50,
    endSpeed: 50,
    waitTime: 10000,
    isWay: 'roundTrip'
  }
  //时间组件参数
  const LyTimeoptions: options = {
    el: '#time',
    props: {
    }
  }
  //输入框内容
  const input = ref('')
  //搜索框提示语
  const placeholder = ref('输入搜索内容吧...')
  // 搜索框长度
  const inputWidth = ref(240)
  //搜索框聚焦失焦事件
  const inputFocus = (is: boolean) => {
    useBlurApp('#app', is)
    placeholder.value = is ? '' : '输入搜索内容吧...'
    inputWidth.value = is ? 500 : 200
  }
  //搜索框点击回车事件
  const search = () => {
    useSearch(input.value)
  }
  const initDZJ = () => {
    //获取打字机文本内容初始化打字机
    getHitokoto().then(res => {
      LyTypewriteroptions.content = res
      const lyTypewriter = new LyTypewriter(LyTypewriteroptions)
      lyTypewriter.on('character', (data: { status: boolean }) => {
        if (data.status) {
          getHitokoto().then(res => {
            lyTypewriter.setContent(res)
            lyTypewriter.typeCharacter()
          })
        }
      })
      lyTypewriter.typeCharacter()
    })
  }
  //初始化时间组件
  const initTime = () => {
    const lyTime = new LyTime(LyTimeoptions)
    lyTime.create()
  }
  onMounted(() => {
    initTime()
    initDZJ()
  })
  return vine`
    <div class="home">
    
        <div class="time" id="time" />
        <div class="myInput">
            <el-input class="InputItem" @keyup.enter="search" size="large" input-style="color:#fff;"  @focus="inputFocus(true)" @blur="inputFocus(false)" v-model="input" :style="'width:'+ inputWidth+'px'" :placeholder="placeholder" >
            <template #prefix>
                <SvgIcomVine name="Bing" size="24" />
            </template>
            <template #suffix>
            <SvgIcomVine class="searchIcon" name="搜索" @click="search" size="24" />
                </template>
            </el-input>
        </div>
       <div id="lyTypewriter" class="lyTypewriter"></div>
    </div>   
    `
}

export default Home