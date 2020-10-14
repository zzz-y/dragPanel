<template>
  <el-tabs v-model="activeName" class="resource-tab">
    <el-tab-pane label="资源" name="first">
      <draggable
        tag="ul"
        class="data-list"
        v-model="sourceList"
        :sort="false"
        :group="{ name:'components', pull:'clone', put:false }">
        <li title="双击预览"
            v-for="x in sourceList"
            :key="x.datasourceId"
            :id="`node_${x.datasourceId}`">
          <svg-icon :icon-class="x.icon"></svg-icon>
          <span>{{x.datasourceName}}</span>
        </li>
      </draggable>
    </el-tab-pane>
    <el-tab-pane label="模型" name="second">
      <ul class="data-list">
        <li v-for="x in modelList"
            :key="x.modelId">
          {{x.modelName}}
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'resourceSide',
  components: {
    draggable,
  },
  data () {
    return {
      activeName: 'first',
      sourceList: [
        {
          'datasourceId': 1318,
          'datasourceName': '管培莲招行',
          'datasourcePath': '/data/csvType/upload/parse_20200628_144416690_管培莲招行.csv',
          'updateTime': '2020-06-28 14:44:17',
          'datasourceNum': 4334,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'datasourceId': 1319,
          'datasourceName': '管培莲农行',
          'datasourcePath': '/data/csvType/upload/parse_20200628_144416643_管培莲农行.csv',
          'updateTime': '2020-06-28 14:44:18',
          'datasourceNum': 496,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'datasourceId': 1320,
          'datasourceName': '管培莲中信',
          'datasourcePath': '/data/csvType/upload/parse_20200628_144416729_管培莲中信.csv',
          'updateTime': '2020-06-28 14:44:20',
          'datasourceNum': 34,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'datasourceId': 1325,
          'datasourceName': '管培莲建行',
          'datasourcePath': '/data/csvType/upload/parse_20200628_144944639_管培莲建行.csv',
          'updateTime': '2020-06-28 14:49:45',
          'datasourceNum': 909,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'datasourceId': 1341,
          'datasourceName': '陈波建行',
          'datasourcePath': '/data/csvType/upload/parse_20200628_161639457_陈波_陈波建行.csv',
          'updateTime': '2020-06-28 16:16:40',
          'datasourceNum': 237,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'datasourceId': 1342,
          'datasourceName': '陈波中信',
          'datasourcePath': '/data/csvType/upload/parse_20200628_161639525_陈波_陈波中信.csv',
          'updateTime': '2020-06-28 16:16:40',
          'datasourceNum': 434,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'datasourceId': 1346,
          'datasourceName': '刘智建行',
          'datasourcePath': '/data/csvType/upload/parse_20200628_161639905_刘智_刘智建行.csv',
          'updateTime': '2020-06-28 16:16:41',
          'datasourceNum': 14,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'datasourceId': 1348,
          'datasourceName': '刘智兴业',
          'datasourcePath': '/data/csvType/upload/parse_20200628_161639820_刘智_刘智兴业.csv',
          'updateTime': '2020-06-28 16:16:42',
          'datasourceNum': 7,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }, {
          'datasourceId': 1349,
          'datasourceName': '陈波恒丰',
          'datasourcePath': '/data/csvType/upload/parse_20200628_161639651_陈波_陈波恒丰.csv',
          'updateTime': '2020-06-28 16:16:43',
          'datasourceNum': 2414,
          'shareLabelName': '项目数据',
          'icon': 'project',
          'datasourceType': 9
        }
      ],
      modelList: [
        {
          'modelId': 629,
          'modelName': '交易对象交易次数'
        }, {
          'modelId': 628,
          'modelName': '所有交易对象'
        }, {
          'modelId': 625,
          'modelName': '高管-大额资金输入分析'
        }, {
          'modelId': 621,
          'modelName': '高管交易对象分析'
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
