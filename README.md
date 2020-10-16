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
    :props="{id: 'aaa', name: 'bbb', isInline: 'isInline', list: 'list'}"
    position="left">
    <template v-slot:component="slotProps">
      <drag-item :group="slotProps.list"
                 :type="slotProps.isInline?'inline':''">
          <template v-slot:list="slotItem">
            <div :class="slotProps.isInline?'data-list-item':'list-group-item'"
                 v-for="x in slotItem.list"
                 :key="x.id"
                 :title="x.description"
                 :id="`node_${x.id}`">
              <template v-if="!slotProps.isInline">
                <div class="icon-wrapper">
                  <span>icon</span>
                </div>
                <div>{{x.name}}</div>
              </template>
              <template v-if="slotProps.isInline">
                <span>icon</span><span>{{x.name}}</span>
              </template>
            </div>
          </template>
        </drag-item>
    </template>
  </DragSides>
</template>

<script>
import { DragSides, DragItem } from 'drag-panel'

export default {
  name: 'demo',
  components: {
    DragItem,
    DragSides,
  },
  data () {
    return {
      sideList: [
        {
          aaa: 'resourceTab',
          bbb: 'resource-side',
          isInline: true,
          list: [
            {
              id: 1318,
              name: '数据源1',
              icon: 'project'
            }, {
              id: 1319,
              name: '数据源2',
              icon: 'project'
            }, {
              id: 1320,
              name: '数据源3',
              icon: 'project'
            }, {
              id: 1325,
              name: '数据源4',
              icon: 'project'
            }, {
              id: 1341,
              name: '数据源5',
              icon: 'project'
            }, {
              id: 1342,
              name: '数据源6',
              icon: 'project'
            }, {
              id: 1346,
              name: '数据源7',
              icon: 'project'
            }, {
              id: 1348,
              name: '数据源8',
              icon: 'project'
            }, {
              id: 1349,
              name: '数据源9',
              icon: 'project'
            }
          ]
        },
        {
          aaa: 'componentTab',
          bbb: 'component-side',
          isInline: false,
          list: [

            {
              id: 2,
              name: '组件1',
              icon: 'intersection',
              description: ''
            }, {
              id: 3,
              name: '组件2',
              icon: 'difference',
              description: ''
            }, {
              id: 4,
              name: '组件3',
              icon: 'union',
              description: ''
            }, {
              id: 5,
              name: '组件4',
              icon: 'filter',
              description: ''
            }, {
              id: 7,
              name: '组件5',
              icon: 'frequency',
              description: ''
            }, {
              id: 8,
              name: '组件6',
              icon: 'crash',
              description: ''
            }, {
              id: 9,
              name: '组件7',
              icon: 'packet',
              description: ''
            }, {
              id: 11,
              name: '组件8',
              icon: 'resultExtend',
              description: ''
            }, {
              id: 13,
              name: '组件9',
              icon: 'duplicateRemoval',
              description: ''
            }, {
              id: 17,
              name: '组件10',
              icon: 'informationExtraction',
              description: ''
            }, {
              id: 18,
              name: '组件11',
              icon: 'timeAggregation',
              description: ''
            }, {
              id: 19,
              name: '组件12',
              icon: 'weightCoefficient',
              description: ''
            }, {
              id: 20,
              name: '组件13',
              icon: 'lineSum',
              description: ''
            }, {
              id: 26,
              name: '组件14',
              icon: 'intersection',
              description: ''
            }, {
              id: 27,
              name: '组件15',
              icon: 'duplicateRemoval',
              description: ''
            },
            {
              id: 12,
              name: '组件16',
              icon: 'investigate',
              description: ''
            }, {
              id: 14,
              name: '组件17',
              icon: 'identicalWifi',
              description: ''
            }, {
              id: 15,
              name: '组件18',
              icon: 'accompanying',
              description: ''
            }
          ]
        },
        {
          aaa: 'componentTab1',
          bbb: 'component-side',
          isInline: false,
          list: [

            {
              id: 2,
              name: '组件1',
              icon: 'intersection',
              description: ''
            }, {
              id: 3,
              name: '组件2',
              icon: 'difference',
              description: ''
            }, {
              id: 4,
              name: '组件3',
              icon: 'union',
              description: ''
            }, {
              id: 5,
              name: '组件4',
              icon: 'filter',
              description: ''
            }, {
              id: 7,
              name: '组件5',
              icon: 'frequency',
              description: ''
            }, {
              id: 8,
              name: '组件6',
              icon: 'crash',
              description: ''
            }, {
              id: 9,
              name: '组件7',
              icon: 'packet',
              description: ''
            }, {
              id: 11,
              name: '组件8',
              icon: 'resultExtend',
              description: ''
            }, {
              id: 13,
              name: '组件9',
              icon: 'duplicateRemoval',
              description: ''
            }, {
              id: 17,
              name: '组件10',
              icon: 'informationExtraction',
              description: ''
            }, {
              id: 18,
              name: '组件11',
              icon: 'timeAggregation',
              description: ''
            }, {
              id: 19,
              name: '组件12',
              icon: 'weightCoefficient',
              description: ''
            }, {
              id: 20,
              name: '组件13',
              icon: 'lineSum',
              description: ''
            }, {
              id: 26,
              name: '组件14',
              icon: 'intersection',
              description: ''
            }, {
              id: 27,
              name: '组件15',
              icon: 'duplicateRemoval',
              description: ''
            },
            {
              id: 12,
              name: '组件16',
              icon: 'investigate',
              description: ''
            }, {
              id: 14,
              name: '组件17',
              icon: 'identicalWifi',
              description: ''
            }, {
              id: 15,
              name: '组件18',
              icon: 'accompanying',
              description: ''
            }
          ]
        }
      ]
    }
  }
}
</script>
```
