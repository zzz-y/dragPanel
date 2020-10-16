<template>
  <draggable
    :class="type==='inline'?'data-list':'list-group'"
    v-model="group"
    :sort="false"
    :group="{ name:'components', pull:'clone', put:false }">
    <slot name="list" :list="group"></slot>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'DragItem',
  components: {
    draggable
  },
  props: {
    group: {
      type: Array,
      default: () => []
    },
    type: String
  },
  created () {
  }
}
</script>

<style>
</style>
