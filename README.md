# drag-panel

## 安装
```
npm install drag-panel
```

## 查看示例

## 使用说明
```
// demo.js
<template>
 <DragSides
     :panelData="sideList"
     width="15%"
     :props="{id: 'aaa', name: 'bbb'}"
     position="left">
     <template v-slot:component="slotProps">
       <component :is="slotProps.componentName">
         <template v-slot:group="groupProps">
           <drag-item :group="groupProps.list"
                      :type="slotProps.componentName==='resource-side'?'inline':''"></drag-item>
         </template>
       </component>
     </template>
   </DragSides>
</template>

<script>
import DragSides from '@/components/DragSides.vue'
import ComponentSide from '../components/sider/componentSide'
import ResourceSide from '../components/sider/resourceSide'
import DragItem from '../components/DragItem'

export default {
  name: 'demo',
  components: {
    DragItem,
    DragSides,
    ComponentSide,
    ResourceSide,
  },
  data () {
    return {
      sideList: [
        {
          aaa: 'resourceTab',
          bbb: 'resource-side'
        },
        {
          aaa: 'componentTab',
          bbb: 'component-side'
        },
        {
          aaa: 'componentTab1',
          bbb: 'component-side'
        }
      ],
    }
  }
}
</script>
```
