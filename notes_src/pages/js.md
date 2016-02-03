# JS

[TOC]

## HTTP

```js
window.http = (() => {
  'use strict'

  const logger = (err, data) => {
    console.log(err, data)
  }

  const handleResponse = (res, cb) => {
    if (res.status === 200) {
      let err = null
      let data = null
      if (res.response) {
        try {
          data = JSON.parse(res.response)
        } catch (e) {
          err = `Cannot parse response: ${res.response} because ${e}`
        }
      }
      cb(err, data)
    } else {
      cb(res)
    }
  }

  return {

    get: (url, cb) => {
      if (!cb) cb = logger
      const req = new XMLHttpRequest()
      req.open('GET', url)
      req.onload = function() { handleResponse(this, cb) }
      req.onerror = function() { cb(this) }
      req.send()
    },

    post: (url, data, cb) => {
      if (!cb) cb = logger
      const req = new XMLHttpRequest()
      req.open('POST', url)
      req.setRequestHeader('Content-type', 'application/json; charset=utf-8')
      req.onload = function() { handleResponse(this, cb) }
      req.onerror = function() { cb(this) }
      req.send(JSON.stringify(data))
    },

    put: (url, data, cb) => {
      if (!cb) cb = logger
      const req = new XMLHttpRequest()
      req.open('PUT', url)
      req.setRequestHeader('Content-type', 'application/json; charset=utf-8')
      req.onload = function() { handleResponse(this, cb) }
      req.onerror = function() { cb(this) }
      req.send(JSON.stringify(data))
    },

    delete: (url, cb) => {
      if (!cb) cb = logger
      const req = new XMLHttpRequest()
      req.open('DELETE', url)
      req.onload = function() { handleResponse(this, cb) }
      req.onerror = function() { cb(this) }
      req.send()
    }

  }

})()
```

## ArrOp

```js
function match(el, query) {
  var result = true
  for (var prop in query) {
    // Treat time objects separately. To make a proper comparison we must use .getTime()
    if (el[prop] && el[prop].getTime && query[prop].getTime) {
      if (el[prop].getTime() !== query[prop].getTime()) {
        result = false
        break
      }
    } else {
      if (el[prop] !== query[prop]) {
        result = false
        break
      }
    }
  }
  return result
}

window.arrop = {

  remove: function(arr, query) {
    var count = 0
    var i = arr.length
    while (i--) {
      if (match(arr[i], query)) {
        arr.splice(i, 1)
        count++
      }
    }
    return count
  },

  removeByFilter: function(arr, query) {
    var count = 0
    arr = arr.filter(function(el) {
      if (match(el, query)) {
        count++
      }
      return match
    })
    return count
  },

  findOne: function(arr, query) {
    for (var i = 0; i < arr.length; i++) {
      if (match(arr[i], query)) {
        return arr[i]
      }
    }
    return null
  },

  contains: function(arr, query) {
    return this.findOne(arr, query) !== null
  },

  indexOf: function(arr, query) {
    for (var i = 0; i < arr.length; i++) {
      if (match(arr[i], query)) {
        return i
      }
    }
    return -1
  }

}
```

## SVG

```js
// binify([1,2,3,5,5,5], 2) === [[1, 2], [3, 1], [5,3]]
function binify(data, binSize) {
  'use strict'

  const minValue = Math.min.apply(null, data)
  const maxValue = Math.max.apply(null, data)

  let output = []
  for (let i = minValue; i <= maxValue; i += binSize) {
    output.push([i, 0])
  }

  for (let i = 0; i < data.length; i++) {
    let x = minValue
    while (x <= (data[i] - binSize)) {
      x += binSize
    }
    output[(x - minValue) / binSize][1] += 1
  }

  return output

}


// let s = new Scale([-10, 10], [0, 1])
// s(5) === 0.75
// s.inv(0.75) === 5
function Scale(domain, range) {
  'use strict'

  const scaler = domainValue => {
    return (range[1]-range[0]) / (domain[1]-domain[0]) * (domainValue-domain[0]) + range[0]
  }
  scaler.inv = rangeValue => {
    return (domain[1]-domain[0]) / (range[1]-range[0]) * (rangeValue-range[0]) + domain[0]
  }
  return scaler
}



function lineGraph(el, data, opts) {
  'use strict'

  if (!opts) opts = {}

  const elHeight = el.getBoundingClientRect().height
  const elWidth = el.getBoundingClientRect().width

  const xAxisLabelText = opts.xAxisLabel
  const yAxisLabelText = opts.yAxisLabel
  const isDate = opts.isDate

  const height = elHeight
  const width = elWidth
  const margin = { bottom: 30, left: 40 }
  if (isDate) margin.bottom = 60

  const svgNS = 'http://www.w3.org/2000/svg'

  const xMin = Math.min.apply(null, data.map(d => d[0]))
  const xMax = Math.max.apply(null, data.map(d => d[0]))
  const yMin = Math.min.apply(null, data.map(d => d[1]))
  const yMax = Math.max.apply(null, data.map(d => d[1]))

  const x = new Scale([xMin, xMax], [margin.left, width])
  const y = new Scale([yMin, yMax], [height-margin.bottom, 0])

  // Ticks and Grid
  const xTickWidth = 50
  const xTickCount = (width - margin.left) / xTickWidth
  const xFactor = (xMax - xMin) / xTickCount
  console.log(xMin, xMax, xTickCount, xFactor)

  for (let i = 0; i <= xTickCount + 1; i++) {

    const j = xMin + i * xFactor

    const tick = document.createElementNS(svgNS, 'text')
    tick.classList.add('tick')
    tick.setAttribute('alignment-baseline', 'central')

    if (isDate) {
      tick.setAttribute('text-anchor', 'end')
      tick.setAttribute('transform', 'rotate(-90)')
      tick.setAttribute('x', -(height - margin.bottom + 4))
      tick.setAttribute('y', x(Math.floor(j)))
      tick.textContent = moment(Math.floor(j) * 1000).format('YY-MM-DD')
    } else {
      tick.setAttribute('text-anchor', 'middle')
      tick.setAttribute('x', x(Math.floor(j)))
      tick.setAttribute('y', height - margin.bottom / 2)
      tick.textContent = Math.floor(j)
    }

    el.appendChild(tick)

    const gridLine = document.createElementNS(svgNS, 'line')
    gridLine.classList.add('grid')
    gridLine.setAttribute('x1', x(Math.floor(j)))
    gridLine.setAttribute('y1', height - margin.bottom)
    gridLine.setAttribute('x2', x(Math.floor(j)))
    gridLine.setAttribute('y2', 0)
    el.appendChild(gridLine)

  }

  const yTickWidth = 50
  const yTickCount = (height - margin.bottom) / yTickWidth
  const yFactor = (yMax - yMin) / yTickCount

  for (let i = 0; i <= yTickCount; i++) {

    const j = yMin + i * yFactor

    const tick = document.createElementNS(svgNS, 'text')
    tick.classList.add('tick')
    tick.setAttribute('x', margin.left - 4)
    tick.setAttribute('y', y(Math.floor(j)))
    tick.setAttribute('text-anchor', 'end')
    tick.setAttribute('alignment-baseline', 'central')
    tick.textContent = Math.floor(j)
    el.appendChild(tick)

    const gridLine = document.createElementNS(svgNS, 'line')
    gridLine.classList.add('grid')
    gridLine.setAttribute('x1', margin.left)
    gridLine.setAttribute('y1', y(Math.floor(j)))
    gridLine.setAttribute('x2', width)
    gridLine.setAttribute('y2', y(Math.floor(j)))
    el.appendChild(gridLine)

  }

  // Line
  let d = 'M' + x(data[0][0]) + ',' + y(data[0][1])
  for (let i = 1; i < data.length; i++) {
    d += 'L' + x(data[i][0]) + ',' + y(data[i][1])
  }
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('d', d)
  el.appendChild(path)

  // Axes
  const xAxis = document.createElementNS(svgNS, 'line')
  xAxis.classList.add('axis')
  xAxis.setAttribute('x1', margin.left)
  xAxis.setAttribute('y1', height - margin.bottom)
  xAxis.setAttribute('x2', width)
  xAxis.setAttribute('y2', height - margin.bottom)
  el.appendChild(xAxis)

  const yAxis = document.createElementNS(svgNS, 'line')
  yAxis.classList.add('axis')
  yAxis.setAttribute('x1', margin.left)
  yAxis.setAttribute('y1', height - margin.bottom)
  yAxis.setAttribute('x2', margin.left)
  yAxis.setAttribute('y2', 0)
  el.appendChild(yAxis)

  // Axis labels
  const yAxisLabel = document.createElementNS(svgNS, 'text')
  yAxisLabel.setAttribute('x', -(height-margin.bottom)/2)
  yAxisLabel.setAttribute('y', 16)
  yAxisLabel.classList.add('axis-label')
  yAxisLabel.setAttribute('text-anchor', 'middle')
  // yAxisLabel.setAttribute('alignment-baseline', 'central')
  yAxisLabel.setAttribute('transform', 'rotate(-90)')
  yAxisLabel.textContent = yAxisLabelText
  el.appendChild(yAxisLabel)

  const xAxisLabel = document.createElementNS(svgNS, 'text')
  xAxisLabel.setAttribute('x', (width - margin.left) / 2)
  xAxisLabel.setAttribute('y', height)
  xAxisLabel.classList.add('axis-label')
  xAxisLabel.setAttribute('text-anchor', 'middle')
  xAxisLabel.setAttribute('alignment-baseline', 'central')
  xAxisLabel.textContent = xAxisLabelText
  el.appendChild(xAxisLabel)

}


function histGraph(el, data, opts) {

  if (!opts) opts = {};
  var isDate = opts.isDate;
  var svgNS = "http://www.w3.org/2000/svg"

  var elHeight = el.getBoundingClientRect().height;
  var elWidth = el.getBoundingClientRect().width;

  // var min = Math.min.apply(null, data.map(function(d) {return d.value}))
  var max = Math.max.apply(null, data.map(function(d) {return d.value}))

  var binWidth = elWidth / data.length;
  var marginBottom = 75;
  var y = new Scale([0, max], [0, elHeight - marginBottom - 15])

  for (var i = 0; i < data.length; i++) {

    var padding = 5
    var rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('x', i * binWidth);
    rect.setAttribute('y', elHeight - marginBottom - y(data[i].value));
    rect.setAttribute('width', binWidth - padding);
    rect.setAttribute('height', y(data[i].value));
    el.appendChild(rect);

    var yval = document.createElementNS(svgNS, 'text')
    yval.setAttribute('x', i * binWidth + (binWidth - padding) / 2);
    yval.setAttribute('y', elHeight - marginBottom - y(data[i].value) - 3);
    yval.setAttribute('text-anchor', 'middle')
    yval.textContent = data[i].value;
    el.appendChild(yval);

    if (data[i].bottomLabel) {
      var bottomLabel = document.createElementNS(svgNS, 'text')
      bottomLabel.setAttribute('x', i * binWidth);
      bottomLabel.setAttribute('y', elHeight);
      bottomLabel.setAttribute('text-anchor', 'start');
      bottomLabel.textContent = isDate ? moment(data[i].bottomLabel * 1000).format('YY-MM-DD') : data[i].bottomLabel;
      el.appendChild(bottomLabel);
    }

    if (data[i].innerLabel) {
      var innerLabel = document.createElementNS(svgNS, 'text')
      innerLabel.setAttribute('transform', "rotate(-90)");
      innerLabel.setAttribute("x", -elHeight + y(data[i].value) + marginBottom - 7)
      innerLabel.setAttribute("y", i * binWidth + (binWidth - padding) / 2)
      innerLabel.setAttribute('text-anchor', 'end')
      innerLabel.setAttribute('alignment-baseline', 'central')
      innerLabel.classList.add('innerLabel');
      innerLabel.textContent = data[i].innerLabel;
      el.appendChild(innerLabel);
    }

  }

}


function pieGraph(el, data) {

  var colorList = ['#faa', '#aaf', '#afa', '#ddd', '#aff', '#ffa', '#faf'];
  var total = data.reduce(function(acc, el) { return acc + el.value }, 0)

  var elHeight = el.getBoundingClientRect().height;
  var elWidth = el.getBoundingClientRect().width;

  var svgNS = "http://www.w3.org/2000/svg"

  var radius = Math.min(elWidth / 2, elHeight / 2) - 1;
  var xCenter = radius + 1;
  var yCenter = radius + 1;

  var angle = 0
  var prevAngle = 0

  for (var i = 0; i < data.length; i++) {

    prevAngle = angle
    angle -= 2 * Math.PI * data[i].value / total

    var x1 = xCenter + radius*Math.cos(prevAngle);
    var y1 = yCenter + radius*Math.sin(prevAngle);
    var x2 = xCenter + radius*Math.cos(angle);
    var y2 = yCenter + radius*Math.sin(angle);

    var a = (angle - prevAngle) > -Math.PI ? 0 : 1

    console.log(angle, a)

    var cSector = document.createElementNS(svgNS, 'path');
    cSector.setAttribute('d', 'M' + xCenter + ',' + yCenter + 'L' + x1 + ',' + y1 + 'A' + radius + ',' + radius + ' 0 ' + a + ' 0 ' + x2 + ',' + y2 + 'z');
    cSector.setAttribute('fill', colorList[i]);
    cSector.setAttribute('stroke', 'black');
    el.appendChild(cSector);

    var cText = document.createElementNS(svgNS, 'text');
    cText.setAttribute('x', xCenter + radius*0.8*Math.cos(prevAngle - 2 * Math.PI * data[i].value / total / 2))
    cText.setAttribute('y', yCenter + radius*0.8*Math.sin(prevAngle - 2 * Math.PI * data[i].value / total / 2))
    cText.setAttribute('text-anchor', 'middle')
    cText.setAttribute('alignment-baseline', 'central')
    cText.textContent = Math.round(data[i].value / total * 100) + "%"
    el.appendChild(cText)

    var legendBlob = document.createElementNS(svgNS, 'circle')
    legendBlob.setAttribute('cx', 25 + 2 * radius)
    legendBlob.setAttribute('cy', 10 + 20 * i)
    legendBlob.setAttribute('r', 6)
    legendBlob.setAttribute('fill', colorList[i])
    legendBlob.setAttribute('stroke', '#000')
    el.appendChild(legendBlob)

    var legendText = document.createElementNS(svgNS, 'text')
    legendText.setAttribute('x', 40 + 2 * radius)
    legendText.setAttribute('y', 10 + 20 * i)
    legendText.setAttribute('text-anchor', 'start')
    legendText.setAttribute('alignment-baseline', 'central')
    legendText.setAttribute('font-size', '9px')
    legendText.textContent = data[i].label
    el.appendChild(legendText)

  }

}
```

Some CSS for the line graph:

```css
path.line {
  stroke-width: 2;
  fill: none;
}

.axis path,
.axis line {
  fill: none;
  stroke: #aaa;
  stroke-width: 1;
  shape-rendering: crispEdges;
}

.hist rect {
  stroke-width: 1px;
  stroke: #ccc;
  fill: #ccfafa;
  shape-rendering: crispEdges;
}

.hists {
  float: left;
  margin-right: 20px;
}

.hists .innerLabel {
  font-weight: bold;
}

#svg path {
  fill: none;
  stroke-width: 2px;
  stroke: steelblue;
}

#svg .axis {
  fill: none;
  stroke: #aaa;
  stroke-width: 1;
  shape-rendering: crispEdges;
}

#svg .grid {
  fill: none;
  stroke: #eee;
  stroke-width: 1;
  shape-rendering: crispEdges;
}

#svg .axis-label {
  font-size: 12px;
  font-family: Arial;
  color: #333;
}

#svg .tick {
  font-size: 12px;
  font-family: Arial;
  color: #333;
}
```
