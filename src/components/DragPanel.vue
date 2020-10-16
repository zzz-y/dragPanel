<template>
  <div class="panel-item" :ref="id" :id="id">
    <div class="resource-tab">
      <div class="title"></div>
      <slot name="panel"></slot>
    </div>
    <div class="move" @mousedown="(evt) => mousedown(evt, id)">
    </div>
    <span class="del" @click="closeComponent(id)">X</span>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'DragPanel',
  components: {
  },
  props: {
    showSide: Boolean,
    position: String,
    id: [Number, String]
  },
  data () {
    return {
    }
  },
  methods: {
    mousedown (evt, id) {
      $(`#${id}`).css('z-index', ++this.zIndex)
      const offsetX = evt.offsetX
      const drag = (evt) => {
        let xScale
        if (this.position === 'right') {
          xScale = evt.x < (document.body.clientWidth - $('.aside').width() - 10) &&
            evt.x > 10
        } else {
          xScale = evt.x < (document.body.clientWidth - 50) &&
            evt.x > $('.aside').width()
        }
        if (xScale) {
          if (this.position === 'right') {
            const left = (evt.x - offsetX)
            $(`#${id}`).css('left', left)
          } else {
            if ($('.aside').width() > 0) {
              $(`#${id}`).css('left', evt.x - offsetX - 180)
            } else {
              $(`#${id}`).css('left', evt.x - 120)
            }
          }
        }
        const yScale = evt.y > 10 && evt.y < (document.body.clientHeight - 10)
        if (yScale) {
          $(`#${id}`).css('top', evt.y - 5)
        }
      }
      this.onDrag(drag)
    },
    onDrag (drag) {
      const up = () => {
        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', drag)
      document.addEventListener('mouseup', up)
    },
    closeComponent (id) {
      const parent = document.getElementsByClassName('draggable-tab')[0]
      const children = this.$refs[id]
      $(`#${id}`).css('left', '').css('top', '').css('transform', '')
      parent.appendChild(children)
      if (!this.showSide) {
        this.$emit('sideVisible')
        const x = document.body.clientWidth * 0.85
        if ($('.draggable-tab').children().length === 1) {
          const nodes = $('#svgContainer > .panel-item')
          nodes.each((i, d) => {
            if (this.position === 'right') {
              if (d.offsetLeft >= (x - 120)) {
                $(`#${d.id}`).css('left', x - (document.body.clientWidth * 0.15))
              }
            } else {
              const nodeLeft = parseInt(d.style.left)
              const width = document.body.clientWidth * 0.15 > 240 ? 240 : document.body.clientWidth * 0.15
              const left = nodeLeft - width > (width / 2) ? nodeLeft - width : width / 2
              $(`#${d.id}`).css('left', left)
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  .resource-tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #b5bde0;
  }

  .resource-tab .title {
    height: 1.5rem;
    min-height: 1.5rem;
    background: #9da6c9;
  }

</style>
