import DragSides from './components/DragSides'
import DragItem from './components/DragItem'
import DragPanel from './components/DragPanel'

const components = [
  DragSides,
  DragItem,
  DragPanel
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  DragSides,
  DragItem,
  DragPanel
}
