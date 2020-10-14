/* eslint-disable no-unreachable */

function drawStraight (startPoint, endPoint, shortCaptionLength) {
  const square = l => l * l
  // 其中参数在原版中根据样式确定并有调用函数通过参数方式传入，而非内部直接定义；
  const startRadius = 42
  const endRadius = 38
  const shaftWidth = 1 / 4
  const headWidth = 7
  const headHeight = 7
  // 其中参数在原版中根据样式确定并有调用函数通过参数方式传入，而非内部直接定义；

  const dx = endPoint.x - startPoint.x
  const dy = endPoint.y - startPoint.y
  const centreDistance = Math.sqrt(square(dy) + square(dx))

  // 两节点圆的间距（不算半径的最小间距），也即箭头总长；
  const length = centreDistance - (startRadius + endRadius)
  // 箭头的身体长度（箭头总长度减去箭头头部宽度）；
  const shaftLength = length - headHeight

  // 以下确定箭头画法各个点之间的关系及计算（以出发节点的圆心为原点）；
  // 箭头起始点的X坐标（尾巴）
  const startArrow = startRadius
  // 箭头肩部位置的X坐标；
  const endShaft = startArrow + shaftLength
  // 箭头身体轴半径
  const shaftRadius = shaftWidth / 2
  // 箭头头部轴半径
  const headRadius = headWidth / 2
  // 箭头尖X轴坐标
  const endArrow = startArrow + length
  // 计算中点坐标供文字使用
  // const midpoint = (shaftLength / 2) + startArrow;

  const startBreak = startArrow + ((shaftLength - shortCaptionLength) / 2)
  const endBreak = endShaft - ((shaftLength - shortCaptionLength) / 2)
  return ['M', startArrow, shaftRadius, 'L', startBreak, shaftRadius,
    'L', startBreak, -shaftRadius, 'L', startArrow, -shaftRadius,
    'Z', 'M', endBreak, shaftRadius, 'L', endShaft, shaftRadius,
    'L', endShaft, headRadius, 'L', endArrow, 0, 'L', endShaft, -headRadius,
    'L', endShaft, -shaftRadius, 'L', endBreak, -shaftRadius, 'Z'].join(' ')

  /* this.outline = (shortCaptionLength) => {
    const startBreak = startArrow + (shaftLength - shortCaptionLength) / 2;
    const endBreak = endShaft - (shaftLength - shortCaptionLength) / 2;
    return ['M', startArrow, shaftRadius, 'L', startBreak, shaftRadius,
    'L', startBreak, -shaftRadius, 'L', startArrow, -shaftRadius, 'Z',
    'M', endBreak, shaftRadius, 'L', endShaft, shaftRadius,
    'L', endShaft, headRadius, 'L', endArrow, 0, 'L', endShaft, -headRadius,
     'L', endShaft, -shaftRadius, 'L', endBreak, -shaftRadius, 'Z'].join(' ');
  }; */

  // 新增一个确定文字位置的方法
  /* this.textpos_x = () => {
    return midpoint;
  };
  this.textpos_y = () => {
    return 0;
  }; */

  // 该方法确定关系文字说明元素的scrollWidth宽度，以此同步关系线条中间断开部分的宽度。并在一定条件下使关系线条没有断开；
  /* this.textWidth = (d) => {
    const o = document.getElementById('ppt-text_' + d.id);
    const w = o.scrollWidth || 0;  //宽度
    if (centreDistance > 4 * w && centreDistance > 20) {
      return w;
    } else {
      return 0;
    }
  }; */
}

function translatePath (d) {
  const dx = d.target.x - d.source.x
  const dy = d.target.y - d.source.y
  const angle = (((Math.atan2(dy, dx) / Math.PI) * 180) + 360) % 360
  return `translate(${d.source.x},${d.source.y}) rotate(${d.target === d.nodeA ? (angle + 180) % 360 : angle})`
}

export {
  drawStraight,
  translatePath
}
