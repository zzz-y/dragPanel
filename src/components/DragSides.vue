<template>
  <div class="container">
    <div class="main">
      <draggable id="svgContainer" class="for-svg"
                 v-model="containerList" group="components"
                 draggable=".draggable"
                 @add="onAdd" style="height:100%;">
      </draggable>
    </div>
    <div class="aside" :style="{'width': showSide? width:'0'}">
      <draggable class="draggable-tab"
                 :draggable="dragPanel?'.panel-item':'.item'"
                 group="components"
                 :sort="false"
                 @end="onEnd">
        <drag-panel
          v-for="item in panelData"
          :key="item[props.id]"
          :id="item[props.id]"
          :name="item[props.name]"
          :showSide="showSide"
          @sideVisible="showSide = !showSide">
          <template v-slot:panel>
            <slot name="component" :componentName="item[props.name]"></slot>
          </template>
        </drag-panel>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import $ from 'jquery'
import _ from 'lodash'
import DragPanel from './dragPanel'
import ComponentSide from './sider/componentSide'
import ResourceSide from './sider/resourceSide'
import { start } from '../js/createNodes'
import { getNodeData, getOffset } from '../js/getNodes'

export default {
  name: 'DragSides',
  components: {
    DragPanel,
    draggable,
    ComponentSide,
    ResourceSide,
  },
  props: {
    // panel是否可拖拽出来
    dragPanel: {
      type: Boolean,
      default: true
    },
    panelData: {
      type: Array
    },
    width: {
      type: String,
      default: '15%'
    },
    props: {
      default() {
        return {
          id: 'id',
          name: 'name',
        };
      }
    },
  },
  data () {
    return {
      containerList: [],
      showSide: true,
      zIndex: 2,
    }
  },
  methods: {
    onAdd (evt) {
      if (evt && evt.pullMode === 'clone') {
        getOffset(evt.originalEvent.offsetX, evt.originalEvent.offsetY)
        const nodeData = getNodeData(this.containerList[0])
        start(_.cloneDeep([nodeData]))
        this.containerList = []
      }
    },
    onEnd (evt) {
      if (evt.pullMode) {
        const id = evt.item.id
        const x = evt.originalEvent.offsetX
        const y = evt.originalEvent.offsetY
        if (!$('.draggable-tab').children().length) {
          this.showSide = !this.showSide
        }
        $(`#${id}`).css('left', x - 120).css('top', y).css('transform', 'none').css('z-index', ++this.zIndex)
      }
    },
  }
}
</script>

