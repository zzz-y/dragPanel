<template>
  <DragSides
    :panelData="sideList"
    width="15%"
    :props="{id: 'aaa', name: 'bbb'}">
    <template v-slot:component="slotProps">
      <component :is="slotProps.componentName"></component>
    </template>
  </DragSides>
</template>

<script>
// @ is an alias to /src
import DragSides from '@/components/DragSides.vue'
import ComponentSide from '../components/sider/componentSide'
import ResourceSide from '../components/sider/resourceSide'

export default {
  name: 'Home',
  components: {
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
  },
  methods: {

  }
}
</script>
