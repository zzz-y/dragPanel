<template>
  <el-tabs v-model="activeName" class="resource-tab">
    <el-tab-pane
      class="component-group"
      v-for="(group,index) in componentList"
      :name="`group${index}`"
      :key="group.name"
      :label="group.name">
      <slot name="group" :list="group.lists"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'componentSide',
  components: {
    draggable
  },
  data () {
    return {
      activeName: 'group0',
      componentList: [
        {
          'name': 'tab1',
          'lists': [
            {
              'id': 2,
              'name': '组件1',
              'icon': 'intersection',
              'description': '',
              'directiveName': 'intersection',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 3,
              'name': '组件2',
              'icon': 'difference',
              'description': '',
              'directiveName': 'difference',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 4,
              'name': '组件3',
              'icon': 'union',
              'description': '',
              'directiveName': 'union',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 5,
              'name': '组件4',
              'icon': 'filter',
              'description': '',
              'directiveName': 'filter',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 7,
              'name': '组件5',
              'icon': 'frequency',
              'description': '',
              'directiveName': 'frequency',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 8,
              'name': '组件6',
              'icon': 'crash',
              'description': '',
              'directiveName': 'crash',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 9,
              'name': '组件7',
              'icon': 'packet',
              'description': '',
              'directiveName': 'packet',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 11,
              'name': '组件8',
              'icon': 'resultExtend',
              'description': '',
              'directiveName': 'resultextend',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 13,
              'name': '组件9',
              'icon': 'duplicateRemoval',
              'description': '',
              'directiveName': 'duplicateremoval',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 17,
              'name': '组件10',
              'icon': 'informationExtraction',
              'description': '',
              'directiveName': 'informationextraction',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 18,
              'name': '组件11',
              'icon': 'timeAggregation',
              'description': '',
              'directiveName': 'timeaggregation',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 19,
              'name': '组件12',
              'icon': 'weightCoefficient',
              'description': '',
              'directiveName': 'weightcoefficient',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 20,
              'name': '组件13',
              'icon': 'lineSum',
              'description': '',
              'directiveName': 'linesum',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 26,
              'name': '组件14',
              'icon': 'intersection',
              'description': '',
              'directiveName': 'constant',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'id': 27,
              'name': '组件15',
              'icon': 'duplicateRemoval',
              'description': '',
              'directiveName': 'columnoperation',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }]
        },
        {
          'name': 'tab2',
          'lists': [
            {
              'id': 12,
              'name': '组件16',
              'icon': 'investigate',
              'description': '',
              'directiveName': 'investigate',
              'componentType': 1,
              'componentCategory': 1,
              'valid': 1
            }, {
              'id': 14,
              'name': '组件17',
              'icon': 'identicalWifi',
              'description': '',
              'directiveName': 'identicalwifi',
              'componentType': 1,
              'componentCategory': 1,
              'valid': 0
            }, {
              'id': 15,
              'name': '组件18',
              'icon': 'accompanying',
              'description': '',
              'directiveName': 'accompanying',
              'componentType': 1,
              'componentCategory': 1,
              'valid': 0
            }]
        }
      ]
    }
  },
  created () {
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
