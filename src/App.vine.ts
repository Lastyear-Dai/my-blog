import { RouterView } from 'vue-router'
import Header from "@/components/header/index.vine"
export default function App() {
  return vine`
  <Header />
  <RouterView />
  `
}
