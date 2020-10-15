/* eslint-disable no-unreachable */
import Vue from 'vue'
import * as _ from 'lodash'
import * as d3 from 'd3'
import * as $ from 'jquery'
import { drawStraight, translatePath } from './drawStraight'

const nodes = [] // 力导向节点的数组，更新建议直接改动该项
const links = [] // 力导向连线的数组
let svg // svg容器
let g // svg内最大g元素用于zoom
let nodesContainer // 节点容器
let linksContainer // 连线容器
let nodeParts // 节点的update和enter部分
let linkParts // 连线的update和enter部分
let width // svg宽度
let height // svg高度
const r = 24
// const zoom = d3.zoom()
const currentTransform = {
  data: {
    x: 0,
    y: 0,
    k: 1
  }
} // 当前画布zoom量，在zoomend时更新
const swgraph = {
  startNodePos: {
    x: '',
    y: '',
    id: '',
    transX: '',
    transY: '',
    scale: ''
  },
  currentNodePos: {
    x: '',
    y: ''
  },
  idKeeper: {
    sourceID: '',
    targetID: ''
  },
  i: 0,
  removeLinkData: {
    sourcePageId: '',
    targetPageId: ''
  },
  linkingCondition: false, // 判断是否处于正在连线的状态
  attachCondition: false, // 判断是否处于吸附状态
  isOpenArcMenu: false, // 判断是否处于点击环形菜单状态
  drag: {}
}

/* eslint-disable no-use-before-define */

/**
 * 启动函数，接收数据并生成视图
 * @param { Array } mynodes 需要生成的力导向节点数据
 * @param {Boolean} clear 定义是否需要清空nodes和links
 * @return { Undefined }
 * */
function start (mynodes = nodes, clear = true) {
  if (clear) {
    nodes.splice(0)
  }

  if (!$('#dropSetting').length) {
    createLayout()
  }

  mynodes.forEach((d) => {
    const fx = d.mouseX
    const fy = d.mouseY
    Object.assign(d, { fx, fy })
  })

  swgraph.force.nodes().push(...mynodes)
  // 如果再更新前不计算，则会出现节点乱跑的现象；
  swgraph.force.stop()
  updateLayout()
}

/**
 * 创建svg节点以及力导向图节点连线相应容器
 * */
function createLayout () {
  const containerBox = $('#svgContainer')
  width = containerBox.width()
  height = containerBox.height()
  svg = d3.select('#svgContainer')
    .append('svg')
    .attr('id', 'dropSetting')
    .attr('class', 'mainSVG')
    .attr('width', width)
    .attr('height', height)

  // svg.call(zoom
  //   .on('zoom', zooming)
  //   .on('end', zoomEnd))
  //   .on('dblclick.zoom', null)

  svg.call(d3.drag()
    .on('start', () => {
      if (swgraph.isOpenArcMenu) return
      d3.selectAll('.pieGuideLine').style('display', 'none')
    })
    .on('drag', dragged)
    .on('end', dragEnd))

  g = svg.append('g')
    .attr('class', 'mainG')

  g.append('g').attr('id', 'nodesContainer')
  g.append('g').attr('id', 'linksContainer')
  g.append('g').attr('id', 'pieContainer')

  swgraph.force = d3.forceSimulation()
    .force('x', d3.forceX(width / 2).strength(0.05))
    .force('y', d3.forceY(height / 2).strength(0.05))
    .force('link', d3.forceLink().distance(200))
    .force('charge', d3.forceManyBody().strength(-300))
    .velocityDecay(0.9)
    .on('tick', forceTick)

  swgraph.drag = d3.drag()
    .subject((event) => swgraph.force.find(event.x, event.y))
    .on('start', (event, d) => {
      window.event.stopPropagation()
      if (!event.active) swgraph.force.alphaTarget(0.3).restart()

      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y

      // 隐藏引线
      d3.selectAll('.pieGuideLine')
        .filter(e => e.id === d.id)
        .style('display', 'none')
    })
    .on('drag', (event, d) => {
      event.subject.fx = event.x
      event.subject.fy = event.y
    })
    .on('end', (event, d) => {
      event.subject.fx = event.x
      event.subject.fy = event.y
    })

  d3.select('#dropSetting')
    .on('mouseup', mouseupSVG)
    .on('mousemove', mousemoveSVG)
    .on('click', mouseClickSVG)

  nodesContainer = d3.select('#nodesContainer')
  linksContainer = d3.select('#linksContainer')
}

function dragged (event) {
  window.event.stopPropagation()

  const newPos = {
    x: event.x,
    y: event.y
  }
  const starPos = event.subject
  const x = (newPos.x - starPos.x) + currentTransform.data.x
  const y = (newPos.y - starPos.y) + currentTransform.data.y
  swgraph.startNodePos.transX = x
  swgraph.startNodePos.transY = y
  g.attr('transform', `translate(${x},${y}) scale(${currentTransform.data.k})`)
}

function dragEnd (event) {
  currentTransform.data.x += event.x - event.subject.x
  currentTransform.data.y += event.y - event.subject.y
}

function zooming () {
  d3.selectAll('.pieGuideLine').style('display', 'none')
  g.attr('transform', `translate(${d3.zoomTransform(this).x},${d3.zoomTransform(this).y})
scale(${d3.zoomTransform(this).k})`)
  currentTransform.data.x = d3.zoomTransform(this).x
  currentTransform.data.y = d3.zoomTransform(this).y
  currentTransform.data.k = d3.zoomTransform(this).k
}

function zoomEnd () {
  // 将当前zoom值存储到变量中保存
  currentTransform.data = d3.zoomTransform(this)
  swgraph.startNodePos.scale = currentTransform.data.k
  swgraph.startNodePos.transX = currentTransform.data.x
  swgraph.startNodePos.transY = currentTransform.data.y
}

function forceTick () {
  d3.selectAll('.nodeText')
    .attr('x', d => d.fx)
    .attr('y', d => d.fy + 48)
  d3.selectAll('.backgroundCircle')
    .attr('cx', d => d.fx)
    .attr('cy', d => d.fy)
  d3.selectAll('.circleBg')
    .attr('cx', d => d.fx)
    .attr('cy', d => d.fy)
  d3.selectAll('.calculateIcon')
    .attr('x', d => d.fx - 14)
    .attr('y', d => d.fy - 14)
  d3.selectAll('.datalink')
    .attr('d', d => drawStraight(d.source, d.target, 0))
    .attr('transform', d => translatePath(d))
  d3.selectAll('.hover-link')
    .attr('d', d => drawStraight(d.source, d.target, 0))
    .attr('transform', d => translatePath(d))
  /* d3.selectAll('.innerCircle')
    .attr('x', d => d.fx - 24)
    .attr('y', d => d.fy) */
  d3.selectAll('.totalNum')
    .attr('x', d => d.fx)
    .attr('y', d => d.fy + 48)
  /* d3.selectAll('animateTransform')
    .attr('from', d => `0 ${d.fx} ${d.fy}`)
    .attr('to', d => `360 ${d.fx} ${d.fy}`) */
}

/**
 * 更新力导向视图函数，直接会在内部使用到外部两个变量
 * 分别为 nodes和links，为节点和连线数据
 * */
function updateLayout () {
  swgraph.force.restart()

  /**
   * 节点部分
   * */
  const updateNode = nodesContainer.selectAll('.nodeContainer').data(swgraph.force.nodes())
  nodeParts = updateNode
    .enter()
    .append('g')
    .attr('position', 'absolute')
    .attr('id', d => `g${d.id}`)
    .attr('class', 'nodeContainer')

  nodeParts.append('circle')
    .attr('class', 'backgroundCircle')
    .attr('position', 'absolute')
    .attr('id', d => `back${d.id}`)
    .attr('opacity', 0)
    .attr('r', 40)
    .attr('cx', d => d.fx)
    .attr('cy', d => d.fy)
    .attr('stroke', '#686ddf')
    .attr('fill', 'transparent')
    .attr('stroke-width', 3)
    .on('mouseover', mouseoverBackgroundCircle)
    .on('mousedown', mousedownBackgroundCircle)
    .on('mouseout', mouseoutBackgroundCircle)
    .on('mouseup', mouseupBackgroundCircle)

  updateNode.select('.backgroundCircle')
    .attr('cx', d => d.fx)
    .attr('cy', d => d.fy)

  const circle = nodeParts
    .append('g')
    .style('cursor', 'pointer')
    .on('mouseup', mouseupElements)
    .on('mouseover', mouseoverElements)
    .on('mouseout', mouseoutElements)
    .call(swgraph.drag)

  circle.append('circle')
    .attr('class', 'calculateBg circleBg')
    .attr('position', 'absolute')
    .attr('r', 24)
    .attr('cx', d => d.fx)
    .attr('cy', d => d.fy)
    .attr('fill', d => {
      return d.type === '01' ? '#ffffff' : 'transparent'
    })
    .attr('stroke-width', 2)
    .attr('stroke', d => {
      return d.type === '01' ? 'transparent' : '#686ddf'
    })

  updateNode.select('.circleBg')
    .attr('cx', d => d.fx)
    .attr('cy', d => d.fy)

  circle
    .append('use')
    .attr('class', 'calculateIcon')
    .attr('width', 28)
    .attr('height', 28)
    .attr('id', d => d.id)
    .attr('xlink:href', d => `#icon-${d.icon}`)
    .attr('position', 'absolute')
    .attr('data-data-type', d => d.type)
    .attr('data-data-name', d => d.name)
    .attr('x', d => d.fx - 14)
    .attr('y', d => d.fy - 14)
    .attr('fill', '#686ddf')

  updateNode.select('.calculateIcon')
    .attr('x', d => d.fx - 14)
    .attr('y', d => d.fy - 14)

  /* const imgG = nodeParts.append('g')
  imgG.append('image')
    .attr('class', 'innerCircle')
    .attr('position', 'absolute')
    .attr('width', 27)
    .attr('height', 27)
    .attr('xlink:href', './static/anC.png')
    .attr('x', d => d.fx - 24)
    .attr('y', d => d.fy)
    .style('display', 'none')

  imgG.append('animateTransform')
    .attr('attributeName', 'transform')
    .attr('begin', '0s')
    .attr('dur', '3s')
    .attr('type', 'rotate')
    .attr('from', d => `0 ${d.fx} ${d.fy}`)
    .attr('to', d => `360 ${d.fx} ${d.fy}`)
    .attr('repeatCount', 'indefinite')

  updateNode.select('.innerCircle')
    .attr('x', d => d.fx - 24)
    .attr('y', d => d.fy)
    .style('display', 'none')

  updateNode.select('animateTransform')
    .attr('from', d => `0 ${d.fx} ${d.fy}`)
    .attr('to', d => `360 ${d.fx} ${d.fy}`) */

  nodeParts
    .append('text')
    .attr('class', 'nodeText')
    .attr('position', 'absolute')
    .attr('dy', '.3em')
    .attr('id', d => `text${d.id}`)
    .attr('text-anchor', 'middle')
    .attr('x', d => d.fx)
    .attr('y', d => d.fy + 48)
    .attr('pointer-events', 'none')
    .text(d => `${d.name}${d.id.match(/[0-9]\d*/g)[1]}`)
    .style('fill', '#ffffff')

  updateNode
    .select('.nodeText')
    .attr('dy', '.3em')
    .attr('id', d => `text${d.id}`)
    .attr('text-anchor', 'middle')
    .attr('x', d => d.fx)
    .attr('y', d => d.fy + 48)
    .attr('pointer-events', 'none')
    .text(d => `${d.name}${d.id.match(/[0-9]\d*/g)[1]}`)
    .style('fill', '#ffffff')

  /* eslint-disable no-confusing-arrow */
  nodeParts
    .append('text')
    .attr('class', 'totalNum')
    .attr('position', 'absolute')
    .attr('dy', '-7em')
    .attr('text-anchor', 'middle')
    .attr('x', d => d.fx)
    .attr('y', d => d.fy + 38)
    .attr('pointer-events', 'none')
    .text(d => d.dataNum ? `${d.dataNum}` : '')
    .style('fill', '#ffffff')
    .style('display', 'none')

  updateNode
    .select('.totalNum')
    .attr('dy', '-7em')
    .attr('text-anchor', 'middle')
    .attr('x', d => d.fx)
    .attr('y', d => d.fy + 48)
    .attr('pointer-events', 'none')
    .text(d => d.dataNum ? `${d.dataNum}` : '')
    .style('fill', '#ffffff')

  updateNode.exit().remove()

  /**
   * 连线部分
   * */
  const updateLink = linksContainer.selectAll('g')
    .data(swgraph.force.force('link').links())
  linkParts = updateLink.enter()

  linkParts.append('g')
    .attr('class', 'glink')
    .attr('position', 'absolute')
    .append('path')
    .attr('stroke-width', '1px')
    .attr('stroke', '#ffffff')
    .attr('id', d => d.id)
    .attr('fill', '#cccccc')
    .attr('class', 'datalink')
    .attr('d', d => drawStraight(d.source, d.target, 0))

  updateLink.select('.datalink')
    .attr('id', d => d.id)
    .attr('d', d => drawStraight(d.source, d.target, 0))
  updateLink.exit().remove()

  // 额外添加线段增加鼠标移上效果；
  d3.selectAll('.glink')
    .append('path')
    .attr('stroke-width', '6px')
    .attr('stroke', '#686ddf')
    .attr('opacity', 0)
    .attr('id', d => `hover_${d.id}`)
    .attr('class', 'hover-link')
    .attr('d', d => drawStraight(d.source, d.target, 0))
    .on('dblclick', (event, d) => {
      // 保存数据，用来在removeLink的时候使用
      swgraph.removeLinkData.targetPageId = d.target.id
      swgraph.removeLinkData.sourcePageId = d.source.id
      removeLink(d.id)
    })

  swgraph.linkingCondition = false
  swgraph.idKeeper.sourceID = ''
  swgraph.idKeeper.targetID = ''

  swgraph.force.restart()
}

// const brush = d3.brush()

/**
 * 鼠标移上组件背景圆
 * */
function mouseoverBackgroundCircle () {
  if (swgraph.linkingCondition) {
    if (d3.select(this).attr('id').slice(4) !== swgraph.startNodePos.id) {
      swgraph.attachCondition = true
    }
  }
  d3.select(this)
    .attr('opacity', 1)
  const thisID = d3.select(this).attr('id').slice(4)
  d3.select(`#${thisID}`)
    .attr('', (d) => {
      const scale = swgraph.startNodePos.scale
      if (scale === '') {
        swgraph.currentNodePos.x = d.x + swgraph.startNodePos.transX
        swgraph.currentNodePos.y = d.y + swgraph.startNodePos.transY
      } else {
        swgraph.currentNodePos.x = (d.x * scale) + swgraph.startNodePos.transX
        swgraph.currentNodePos.y = (d.y * scale) + swgraph.startNodePos.transY
      }
    })
}

/**
 * 鼠标移上组件中心图标
 * 重新组装中心图标图片引用地址名称
 * 判断连线状态变量并变更吸附状态变量
 * 存储currentNodePos的x和y以供后续addLink等使用
 * */
function mouseoverElements () {
  const element = d3.select(this).select('use')
  if (swgraph.linkingCondition) {
    if (d3.select(this).select('use').attr('id') !== swgraph.startNodePos.id) {
      swgraph.attachCondition = true
    }
  }
  const thisId = element.attr('id')
  d3.select(`#${thisId}`)
    .attr('', (d) => {
      const scale = swgraph.startNodePos.scale
      if (scale === '') {
        swgraph.currentNodePos.x = d.x + swgraph.startNodePos.transX
        swgraph.currentNodePos.y = d.y + swgraph.startNodePos.transY
      } else {
        swgraph.currentNodePos.x = (d.x * scale) + swgraph.startNodePos.transX
        swgraph.currentNodePos.y = (d.y * scale) + swgraph.startNodePos.transY
      }
    })
  d3.select(this).select('.calculateBg').attr('fill', '#686ddf')
  d3.select(this).select('.calculateIcon').attr('fill', '#ffffff')
}

/**
 * 鼠标离开背景圆范围
 * */
function mouseoutBackgroundCircle () {
  swgraph.attachCondition = false

  // 使背景圆透明度为0，隐藏背景圆
  d3.selectAll('.backgroundCircle')
    .attr('opacity', 0)
}

/**
 * 鼠标离开组件中心图标范围
 * */
function mouseoutElements () {
  swgraph.attachCondition = false
  d3.select(this).select('.calculateBg').attr('fill', (d) => {
    return d.type === '01' ? '#ffffff' : 'transparent'
  })
  d3.select(this).select('.calculateIcon').attr('fill', '#686ddf')
}

/**
 * 鼠标在背景圆上按下
 * 存储起点swgraph.startNodePos的x和y
 * 创建临时连线（起点至鼠标位置的连线）
 * */
function mousedownBackgroundCircle () {
  const event = window.event
  event.stopPropagation()
  if (event.button === 0) {
    swgraph.linkingCondition = true
    const thisID = d3.select(this).attr('id')
    swgraph.idKeeper.sourceID = thisID.slice(4)
    d3.select(this)
      .attr('', (d) => {
        const scale = swgraph.startNodePos.scale
        if (scale === '') {
          swgraph.startNodePos.x = d.x + swgraph.startNodePos.transX
          swgraph.startNodePos.y = d.y + swgraph.startNodePos.transY
        } else {
          swgraph.startNodePos.x = (d.x * scale) + swgraph.startNodePos.transX
          swgraph.startNodePos.y = (d.y * scale) + swgraph.startNodePos.transY
        }
        swgraph.startNodePos.id = d.id
      })
    // 创建临时连线（起点至鼠标位置的连线）
    createTmpLinePath()
  }
}

/**
 * 从背景圆上松开鼠标按钮时的操作
 * */
function mouseupBackgroundCircle () {
  const event = window.event
  if (event.button === 0) {
    const thisID = d3.select(this).attr('id')
    swgraph.idKeeper.targetID = thisID.slice(4)
    const a = swgraph.idKeeper.sourceID
    const b = swgraph.idKeeper.targetID
    if (swgraph.linkingCondition && (a !== b)) {
      // 如果是连接到数据源，则无法连线
      if (b.slice(0, 5) === 'cnode') {
        Vue.prototype.$message.warning('请从数据源连线至计算组件!')
      } else {
        addLink()
      }
    }
    swgraph.linkingCondition = false
  }
}

/**
 * 从组件中心图标上松开鼠标按钮时的操作
 * */
function mouseupElements () {
  const event = window.event
  const thisId = d3.select(this).select('use').attr('id')
  if (event.button === 0) {
    swgraph.idKeeper.targetID = thisId
    const a = swgraph.idKeeper.sourceID
    const b = swgraph.idKeeper.targetID
    if (swgraph.linkingCondition && (a !== b)) {
      // 如果是连接到数据源，则无法连线
      if (b.slice(0, 5) === 'cnode') {
        Vue.prototype.$message.warning('请从数据源连线至计算组件!')
      } else {
        addLink()
      }
    }
    swgraph.linkingCondition = false
  }
}


/**
 * 创建临时连线，即从某一节点上按住引出但未点击到目标节点时的连线
 * */
function createTmpLinePath () {
  const tmpLineContainer = d3.select('#dropSetting')
    .append('g')
    .attr('class', 'tmpLineContainer')
  tmpLineContainer.append('path')
    .attr('fill', '#686ddf')
    .attr('pointer-events', 'none')
    .attr('id', 'tmpLine')
    .attr('stroke-width', 2)
    .attr('stroke', '#686ddf')
}

/**
 * 删除临时连线
 * */
function removeTmpLinePath () {
  d3.selectAll('.tmpLineContainer').remove()
}

/**
 * 绘制临时连线
 * */
function mousemoveSVG (event) {
  const startX = swgraph.startNodePos.x
  const startY = swgraph.startNodePos.y
  let currentX
  let currentY
  if (!swgraph.attachCondition) {
    currentX = d3.pointer(event)[0]
    currentY = d3.pointer(event)[1]
  } else {
    currentX = swgraph.currentNodePos.x
    currentY = swgraph.currentNodePos.y
  }

  const startPoint = {
    x: startX,
    y: startY
  }
  const endPoint = {
    x: currentX,
    y: currentY
  }
  const data = {
    source: startPoint,
    target: endPoint
  }

  // 绘制临时连线
  d3.select('#tmpLine')
    .attr('d', () => drawStraight(startPoint, endPoint, 0))
    .attr('transform', () => translatePath(data))
}

function mouseupSVG () {
  swgraph.linkingCondition = false
  d3.selectAll('.tmpLineContainer').selectAll('path').remove()
  removeTmpLinePath()
}

function mouseClickSVG () {
  // 让svg的点击事件忽略d3的拖拽；
  // if (d3.event.defaultPrevented) return
}

/**
 * 生成连线数据
 * 添加linkToId，innerdatafrom以及datafrom
 * 冒泡给后续组件，传递source组件的输出字段
 * */
function addLink () {
  const sourceNodeID = swgraph.idKeeper.sourceID
  const targetNodeID = swgraph.idKeeper.targetID

  const sourceNode = swgraph.force.nodes().filter(d => d.id === sourceNodeID)[0]
  const targetNode = swgraph.force.nodes().filter(d => d.id === targetNodeID)[0]

  const linkThis = {
    source: sourceNode,
    target: targetNode,
    id: `${sourceNode.id}_${targetNode.id}`
  }

  const addLinkArr = swgraph.force.force('link').links().filter(d =>
    d.source.id === sourceNodeID && d.target.id === targetNodeID)
  if (addLinkArr.length === 0) {
    swgraph.force.force('link').links().push(linkThis)
  }
  updateLayout()
}

function removeLink (removeId) {
  const tmpArray = swgraph.force.force('link').links().filter(e => e.id !== removeId)
  const delLink = swgraph.force.force('link').links().filter(e => e.id === removeId)[0]

  const tId = delLink.target.id
  const sId = delLink.source.id

  swgraph.force.force('link').links().splice(0)
  tmpArray.forEach(e => swgraph.force.force('link').links().push(e))

  // 删除对应hover线段
  d3.selectAll(`#hover_${removeId}`).remove()
  updateLayout()
}

export {
  start,
  swgraph,
  currentTransform,
  nodes,
  zooming,
  zoomEnd,
  links,
  updateLayout,
  createLayout,
}
