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
            <slot name="component"
                  :componentName="item[props.name]"
                  :isInline="item[props.isInline]"
                  :list="item[props.list]"></slot>
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
import { start } from '../js/createNodes'
import { getNodeData, getOffset } from '../js/getNodes'

export default {
  name: 'DragSides',
  components: {
    DragPanel,
    draggable
  },
  props: {
    // panel是否可拖拽出来
    dragPanel: {
      type: Boolean,
      default: true
    },
    panelData: {
      type: Array,
      default: () => [
        {
          id: '1',
          name: 'defaultPanel'
        }
      ]
    },
    width: {
      type: String,
      default: '15%'
    },
    props: {
      default () {
        return {
          id: 'id',
          name: 'name',
          isInline: 'isInline',
          list: 'list'
        }
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
      zIndex: 2
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
    }
  }
}
</script>

<style>
  .container {
    display: flex;
    height: 100%;
  }

  .main {
    background: #f6f5f9;
    flex: 1;
    overflow: hidden;
  }

  .aside {
    width: 15%;
    max-width: 15rem;
    display: flex;
    background-color: #f6f5f9;
  }

  svg {user-select: none;width: 100%;height: 100%;}

  .draggable-tab {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .draggable-tab > .panel-item {
    position: relative;
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .draggable-tab .del, .draggable-tab .move {
    display: none;
    position: absolute;
  }

  .draggable-tab .resource-tab {margin-bottom: 2px;}

  .draggable-tab > .sortable-ghost {display: none}

  .for-svg {
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  .for-svg > .panel-item {
    width: 15rem;
    display: flex;
    flex: initial;
    max-height: calc(50vh - 4rem);
    border: 1px solid #97a4ba;
    border-radius: 4px;
    position: absolute;
    user-select: none;
  }

  .for-svg > .panel-item > span {
    display: initial;
    position: absolute;
    top: 0.25rem;
  }

  .for-svg > .panel-item .move {
    position: absolute;
    width: 100%;
    height: 1.5rem;
    cursor: move;
  }

  .for-svg > .panel-item .del {right: 0.5rem;cursor: pointer;}

  .for-svg > .sortable-ghost {display: none;}

  .hover-link {
    transition: all 0.4s;
    -webkit-transition: all 0.4s;
  }

  .hover-link:hover {opacity: 0.6;}
</style>
