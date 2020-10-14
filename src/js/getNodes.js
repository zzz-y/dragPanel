/* eslint-disable no-unreachable */
import { swgraph, currentTransform } from './createNodes'

let offsetX
let offsetY

function getOffset (x, y) {
  offsetX = (x / currentTransform.data.k) - (currentTransform.data.x / currentTransform.data.k)
  offsetY = (y / currentTransform.data.k) - (currentTransform.data.y / currentTransform.data.k)
}

function getNodeData (data) {
  swgraph.i += 1
  const nodeThis = {}
  if (data.datasourceId) { // 数据源
    nodeThis.icon = data.icon
    nodeThis.name = data.datasourceName
    nodeThis.table_name = data.datasourcePath
    nodeThis.data_resourse_id = data.datasourceId
    nodeThis.id = `cnode_${data.datasourceId}_${swgraph.i}`
    nodeThis.type = '01'
    nodeThis.datasource_type = data.datasourceType
    nodeThis.latest_time = data.updateTime
    nodeThis.mouseX = offsetX
    nodeThis.mouseY = offsetY
    nodeThis.dataNum = data.datasourceNum
    nodeThis.isLoad = false
  } else {
    nodeThis.icon = data.componentIcon
    nodeThis.name = data.componentName
    nodeThis.id = `ioper_${data.componentId}_${swgraph.i}`
    nodeThis.type = data.componentId
    nodeThis.datasource_type = '0'
    nodeThis.mouseX = offsetX
    nodeThis.mouseY = offsetY
    nodeThis.isLoad = false
  }
  return nodeThis
}

export {
  getOffset,
  getNodeData
}
