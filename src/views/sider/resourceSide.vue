<template>
  <div class="resource-tab">
    <div class="title"></div>
    <slot name="group" :list="sourceList"></slot>
  </div>
</template>

<script>
export default {
  name: 'resourceSide',
  data () {
    return {
      sourceList: [
        {
          'id': 1318,
          'name': '数据源1',
          'updateTime': '2020-06-28 14:44:17',
          'datasourceNum': 4334,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'id': 1319,
          'name': '数据源2',
          'updateTime': '2020-06-28 14:44:18',
          'datasourceNum': 496,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'id': 1320,
          'name': '数据源3',
          'updateTime': '2020-06-28 14:44:20',
          'datasourceNum': 34,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'id': 1325,
          'name': '数据源4',
          'updateTime': '2020-06-28 14:49:45',
          'datasourceNum': 909,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'id': 1341,
          'name': '数据源5',
          'updateTime': '2020-06-28 16:16:40',
          'datasourceNum': 237,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'id': 1342,
          'name': '数据源6',
          'updateTime': '2020-06-28 16:16:40',
          'datasourceNum': 434,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'id': 1346,
          'name': '数据源7',
          'updateTime': '2020-06-28 16:16:41',
          'datasourceNum': 14,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'id': 1348,
          'name': '数据源8',
          'updateTime': '2020-06-28 16:16:42',
          'datasourceNum': 7,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'id': 1349,
          'name': '数据源9',
          'updateTime': '2020-06-28 16:16:43',
          'datasourceNum': 2414,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }
      ],
    }
  },
  created () {
  },
  watch: {
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
