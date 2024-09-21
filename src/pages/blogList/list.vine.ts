import { onMounted } from "vue"
function Home() {
  vineStyle.scoped(scss`
  @import url('@/pages/blogList/style/list.scss') ;
  `)

  onMounted(() => {
  })
  return vine`
   <div class="list">
  
   </div>
    `
}

export default Home