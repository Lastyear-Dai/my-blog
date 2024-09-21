// @ts-ignore
import { LyTypewriter } from 'last-year-components/index.js'
import type { typewriterOptions } from 'last-year-components/index'
import Wave from "@/components/wave/index.vine"
import List from "./list.vine"
import { ElInput } from 'element-plus'
import { getHitokoto } from '@/api'

import { onMounted, ref } from "vue"
function Home() {
  vineStyle.scoped(scss`
  @import url('@/pages/blogList/style/index.module.scss') ;
  `)
  //打字机参数
  const LyTypewriteroptions: typewriterOptions = {
    el: '.lyTypewriter',
    content: '',
    startSpeed: 50,
    endSpeed: 50,
    waitTime: 10000,
    isWay: 'roundTrip'
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

  onMounted(() => {

    initDZJ()
  })
  return vine`
  <div class="blogList">
    <div class="blogList-top">
        <div class="bg" />
        <h1>故事</h1>
        <div class="lyTypewriter"></div>
        <Wave/>
    </div>
      <List/>
  
  </div>

  
    `
}

export default Home