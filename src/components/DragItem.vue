<template>
  <draggable
    :class="type==='inline'?'data-list':'list-group'"
    v-model="group"
    :sort="false"
    :group="{ name:'components', pull:'clone', put:false }">
    <div :class="type==='inline'?'data-list-item':'list-group-item'"
         v-for="x in group"
         :key="x.id"
         :title="x.description"
         :id="`node_${x.id}`">
      <template v-if="!type">
        <div class="icon-wrapper">
          <svg-icon :icon-class="x.icon"></svg-icon>
        </div>
        <div>{{x.name}}</div>
      </template>
      <template v-if="type==='inline'">
        <svg-icon :icon-class="x.icon"></svg-icon>
        <span>{{x.name}}</span>
      </template>
    </div>
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

<style scoped>

</style>
