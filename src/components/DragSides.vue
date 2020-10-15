<template>
  <div class="container" :style="{flexDirection: position==='right'?'row':'row-reverse'}">
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
          :position="position"
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
import DragPanel from './DragPanel'
import ComponentSide from '../views/sider/componentSide'
import ResourceSide from '../views/sider/resourceSide'
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
      type: Array,
      default: [
        {
          id: '1',
          name: 'defaultPanel'
        },
      ]
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
    position: { // right left
      type: String,
      default: 'right'
    }
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
        const $id = $(`#${id}`).css('top', y).css('transform', 'none').css('z-index', ++this.zIndex)
        if (this.position === 'right') {
          $id.css('left', x - 120)
        } else {
          if ($('.draggable-tab').children().length) {
            $id.css('left', x - 180)
          } else {
            $('#svgContainer > .panel-item').each((i, d) => {
              const left = parseInt(d.style.left)
              $(`#${d.id}`).css('left', left + $('.aside').width())
            })
            $id.css('left', x)
          }
        }
      }
    },
  }
}
</script>

