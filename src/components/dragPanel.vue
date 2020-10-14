<template>
  <div class="panel-item" :ref="id" :id="id">
    <slot name="panel"></slot>
    <div class="move" @mousedown="(evt) => mousedown(evt, id)">
    </div>
    <span class="del" @click="closeComponent(id)">
      <svg-icon icon-class="18x"></svg-icon>
    </span>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'dragPanel',
  components: {
  },
  props: {
    showSide: Boolean,
    id: [Number, String],
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
        const xScale = evt.x < (document.body.clientWidth - $('.aside').width() - 20) &&
          evt.x > 50
        const yScale = evt.y > 10 && evt.y < (document.body.clientHeight - 20)
        if (xScale) {
          const left = (evt.x - offsetX)
          $(`#${id}`).css('left', left)
        }
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
            if (d.offsetLeft >= (x - 120)) {
              $(`#${d.id}`).css('left', x - (document.body.clientWidth * 0.15))
            }
          })
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
