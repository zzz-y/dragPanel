<template>
  <el-tabs v-model="activeName" class="resource-tab">
    <el-tab-pane
      class="component-group"
      v-for="(group,index) in componentList"
      :name="`group${index}`"
      :key="group.name"
      :label="group.name">
      <draggable
        tag="ul"
        class="list-group"
        v-model="group.lists"
        :sort="false"
        :group="{ name:'components', pull:'clone', put:false }">
        <li class="list-group-item"
            v-for="x in group.lists"
            :key="x.componentId"
            :title="x.description"
            :id="`oper_${x.componentId}`"
            v-show="x.valid">
          <div class="icon-wrapper">
            <svg-icon :icon-class="x.componentIcon"></svg-icon>
          </div>
          <div>{{x.componentName}}</div>
        </li>
      </draggable>
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
          'name': '通用',
          'lists': [
            {
              'componentId': 2,
              'componentName': '碰撞求同',
              'componentIcon': 'intersection',
              'description': '通过两个或多个数据源的某字段相等，用于对数据源之间进行求交集。',
              'directiveName': 'intersection',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 3,
              'componentName': '碰撞求异',
              'componentIcon': 'difference',
              'description': '用于对两个数据源进行求差集，根据一特定的数据字段，选择主数据集，进行计算。',
              'directiveName': 'difference',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 4,
              'componentName': '合并数据',
              'componentIcon': 'union',
              'description': '通过选择一个或多个字段，将两个及以上数据源进行合并操作',
              'directiveName': 'union',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 5,
              'componentName': '结果过滤',
              'componentIcon': 'filter',
              'description': '用于对前一个运算结果进行条件过滤，得出相应的结果。',
              'directiveName': 'filter',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 7,
              'componentName': '频率分析',
              'componentIcon': 'frequency',
              'description': '用于筛选特定字段中字段内容出现频率大于，少于或等于某个值的数据。',
              'directiveName': 'frequency',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 8,
              'componentName': '条件碰撞',
              'componentIcon': 'crash',
              'description': '通过设定条件，得出符合比对规则的数据项。',
              'directiveName': 'crash',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 9,
              'componentName': '分组统计',
              'componentIcon': 'packet',
              'description': '对于选取的字段进行分组，并统计出所有分组数据的数量。',
              'directiveName': 'packet',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 11,
              'componentName': '关联字段',
              'componentIcon': 'resultExtend',
              'description': '用于将运算得到的结果，通过某一特定字段，与已有数据源数据进行关联，得到已有数据源相关字段的结果集。',
              'directiveName': 'resultextend',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 13,
              'componentName': '数据去重',
              'componentIcon': 'duplicateRemoval',
              'description': '通过选择一个或多个字段，对一个数据源进行数据内容去重操作',
              'directiveName': 'duplicateremoval',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 17,
              'componentName': '信息提取',
              'componentIcon': 'informationExtraction',
              'description': '从已知内容中提取相关信息。',
              'directiveName': 'informationextraction',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 18,
              'componentName': '时间聚合',
              'componentIcon': 'timeAggregation',
              'description': '通过将时间统一到相同的时间点，如年、月、日、周，便于进一步统计分析。',
              'directiveName': 'timeaggregation',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 19,
              'componentName': '权重设置',
              'componentIcon': 'weightCoefficient',
              'description': '',
              'directiveName': 'weightcoefficient',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 20,
              'componentName': '行求和',
              'componentIcon': 'lineSum',
              'description': null,
              'directiveName': 'linesum',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 26,
              'componentName': '常量设置',
              'componentIcon': 'intersection',
              'description': '新增常量列',
              'directiveName': 'constant',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }, {
              'componentId': 27,
              'componentName': '列操作',
              'componentIcon': 'duplicateRemoval',
              'description': '操作指定列，生成新列。',
              'directiveName': 'columnoperation',
              'componentType': 0,
              'componentCategory': 0,
              'valid': 1
            }]
        },
        {
          'name': '专用',
          'lists': [
            {
              'componentId': 12,
              'componentName': '同轨排查',
              'componentIcon': 'investigate',
              'description': '通过配置维度规则，找出与已知重点人同轨迹的非重点人员',
              'directiveName': 'investigate',
              'componentType': 1,
              'componentCategory': 1,
              'valid': 1
            }, {
              'componentId': 14,
              'componentName': '同Wi-Fi',
              'componentIcon': 'identicalWifi',
              'description': '通过配置维度规则，找出与重点人多次处于相同WiFi环境的非重点人。',
              'directiveName': 'identicalwifi',
              'componentType': 1,
              'componentCategory': 1,
              'valid': 0
            }, {
              'componentId': 15,
              'componentName': '同车随行',
              'componentIcon': 'accompanying',
              'description': '通过配置维度规则，找出与重点车辆多次先后通过同一卡口的非重点车辆。',
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
