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
// @ is an alias to /src
import DragSides from '@/components/DragSides.vue'
import DragItem from '../components/DragItem'

export default {
  name: 'Home',
  components: {
    DragItem,
    DragSides
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
  },
  methods: {

  }
}
</script>

<style>
  html, #app {
    height: 100%;
    box-sizing: border-box;
  }
  body {
    font-size: 14px;
    font-family: -apple-system, 'Noto Sans', 'Helvetica Neue', Helvetica,
    'Nimbus Sans L', Arial, 'Liberation Sans', 'PingFang SC', 'Hiragino Sans GB',
    'Noto Sans CJK SC', 'Source Han Sans SC', 'Source Han Sans CN',
    'Microsoft YaHei', 'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti',
    SimHei, 'WenQuanYi Zen Hei Sharp', sans-serif;
    height: 100%;
    margin: 0;
  }
  .list-group {
    overflow: auto;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }

  .list-group .list-group-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.25rem 0.5rem;
    cursor: pointer;
    user-select: none;
    width: 3.5rem;
  }

  .list-group .list-group-item:hover {
    color: #686ddf80;
  }

  .list-group .list-group-item:hover .icon-wrapper {
    border-color: #686ddf80;
  }

  .list-group .list-group-item .icon-wrapper {
    width: 2rem;
    height: 2rem;
    border: 1px solid #ffffff;
    border-radius: 4px;
    font-size: 1.25rem;
    text-align: center;
    vertical-align: middle;
    padding: 0.625rem;
  }

  .data-list {
    padding: 0;
    overflow: auto;
  }

  .data-list .data-list-item {
    line-height: 2.5rem;
    padding-left: 1rem;
    cursor: pointer;
    user-select: none;
    word-break: break-word;
  }

  .data-list .data-list-item:hover {
    background-color: #686ddf80;
  }
</style>
