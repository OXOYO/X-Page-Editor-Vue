/**
* Created by OXOYO on 2018/3/28.
*
* 刻度尺
*/

<style scoped lang="less" rel="stylesheet/less">
  .xpe_scale {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2500;
    /*overflow: hidden;*/
    transition: all .5s ease-in .1s;

    .scale_x {
      position: absolute;
      left: 0;
      z-index: 2500;
      width: 100%;
      height: 18px;
      background: url('../../../assets/scale_x.png') repeat-x;

      .scale_item {
        top: 1px;
      }
    }
    .scale_y {
      position: absolute;
      top: 0;
      z-index: 2500;
      width: 18px;
      height: 100%;
      background: url('../../../assets/scale_y.png') repeat-y;

      .scale_item {
        width: 8px;
        left: 3px;
        word-wrap: break-word;
      }
    }
    .scale_item {
      position: absolute;
      font: 10px/1 Arial, sans-serif;
      color: #333;
      cursor: default;
    }

    .toolTip {
      position: absolute;
      display: none;
      margin: 15px;
    }

    .guides_x {
      position: absolute;
      top: 0;
      z-index: 2500;
      height: 1px;
      background: #4AFFFF;
      cursor: row-resize;

      &:hover {
        .toolTip {
          display: inline-block;
        }
      }

      &:after {
        content: ' ';
        position: absolute;
        z-index: -1;
        top: -1px;
        right: 0;
        bottom: 0;
        left: 0;
        height: 3px;
        background: transparent;
      }
    }
    .guides_y {
      position: absolute;
      left: 0;
      z-index: 2500;
      width: 1px;
      background: #4AFFFF;
      cursor: col-resize;

      &:hover {
        .toolTip {
          display: inline-block;
        }
      }

      &:after {
        content: ' ';
        position: absolute;
        z-index: -1;
        top: 0;
        right: 0;
        bottom: 0;
        left: -1px;
        height: 3px;
        background: transparent;
      }
    }
  }
</style>

<template>
  <div class="xpe_scale">
    <!-- 刻度尺 -->
    <div
      class="scale_x"
      :style="{ 'width': width + 'px' }"
      @mousedown.stop.prevent="handleMouseDownOnScale('x', $event)"
      @contextmenu.stop.prevent="handlerRightClick($event)"
    >
      <div
        class="scale_item"
        v-for="(item, index) in scaleList.x"
        :key="'scale_x_' + index"
        :style="item.style"
        :type="item.type"
      >
        {{ item.text }}
      </div>
    </div>
    <div
      class="scale_y"
      :style="{ 'height': height + 'px'}"
      @mousedown.stop.prevent="handleMouseDownOnScale('y', $event)"
      @contextmenu.stop.prevent="handlerRightClick($event)"
    >
      <div
        class="scale_item"
        v-for="(item, index) in scaleList.y"
        :key="'scale_y_' + index"
        :style="item.style"
      >
        {{ item.text }}
      </div>
    </div>
    <!-- 参考线 -->
    <div
      class="guides_x"
      v-show="showGuides"
      v-for="item in guidesMap.x"
      :key="item.key"
      :guides_key="item.key"
      :style="[{ 'width': width + 'px' }, item.style ]"
      :title="item.text"
      :type="item.type"
      @mousedown.stop.prevent="handleMouseDownOnGuides(item, $event)"
    >
      <div class="toolTip" :style="item.toolTip.style">{{ item.toolTip.text }}</div>
    </div>
    <div
      class="guides_y"
      v-show="showGuides"
      v-for="item in guidesMap.y"
      :key="item.key"
      :guides_key="item.key"
      :style="[{ 'height': height + 'px' }, item.style ]"
      :title="item.text"
      :type="item.type"
      @mousedown.stop.prevent="handleMouseDownOnGuides(item, $event)"
    >
      <div class="toolTip" :style="item.toolTip.style">{{ item.toolTip.text }}</div>
    </div>
  </div>
</template>

<script>
import defConfig from '@/config'
import utils from '@/global/utils'

export default {
  name: 'XPEScale',
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig.UI.board.scale
      }
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 刻度尺列表
      scaleList: {
        x: [],
        y: []
      },
      // 参考线map
      guidesMap: {
        x: {},
        y: {}
      },
      // 缩放级别
      zoom: {
        // 当前缩放级别 0: 未缩放 1: 放大一级 -1: 缩小一级
        current: 0,
        max: 5,
        min: -5
      },
      // 显示参考线
      showGuides: true,
      // 显示toolTips
      showToolTip: false
    }
  },
  watch: {
    width: function (val) {
      console.log('width', val)
      let _t = this
      _t.computeScaleList('x', val)
    },
    height: function (val) {
      console.log('height', val)
      let _t = this
      _t.computeScaleList('y', val)
    }
  },
  methods: {
    // 计算刻度列表
    computeScaleList: function (type, val) {
      let _t = this
      // FIXME 默认一个大刻度为50px，需考虑按zoom等级来定义一个大刻度的长度
      let scale = 50
      let count = Math.ceil(val / scale)
      // 默认间距2px
      let margin = 2
      let tmpArr = []
      if (type === 'x') {
        for (let i = 0; i < count; i++) {
          tmpArr.push({
            style: {
              left: i * scale + margin + 'px'
            },
            text: i * scale
          })
        }
        _t.scaleList.x = tmpArr
      } else if (type === 'y') {
        for (let i = 0; i < count; i++) {
          tmpArr.push({
            style: {
              top: i * scale + margin + 'px'
            },
            text: i * scale
          })
        }
        _t.scaleList.y = tmpArr
      }
    },
    // 处理刻度尺上mousedown事件
    handleMouseDownOnScale: function (type, event) {
      // 开始画线
      let timeNow = new Date().getTime()
      // 生成key
      let key = ['guides', type, timeNow].join('_')
      // 广播事件
      utils.bus.$emit('XPE/scale/guides/drag/start', {
        // 参考线key
        key: key,
        // 参考线类别
        type: type,
        // 状态
        status: {
          start: true,
          move: false,
          end: false
        },
        // 位置
        position: {
          start: {
            x: event.offsetX,
            y: event.offsetY
          }
        },
        // 条件
        condition: {
          draw: function (type, currentPosition, startPosition) {
            if (type === 'x') {
              if (currentPosition.y - startPosition.y > 5) {
                return true
              }
              return false
            } else if (type === 'y') {
              if (currentPosition.x - startPosition.x > 5) {
                return true
              }
              return false
            }
          }
        }
      })
    },
    // 处理参考线上mousedown事件
    handleMouseDownOnGuides: function (item, event) {
      // 广播事件
      utils.bus.$emit('XPE/scale/guides/drag/start', {
        // 参考线key
        key: item.key,
        // 参考线类别
        type: item.type,
        // 状态
        status: {
          start: true,
          move: false,
          end: false
        },
        // 位置
        position: {
          start: {
            x: event.offsetX,
            y: event.offsetY
          }
        },
        // 条件
        condition: {
          draw: function (type, currentPosition, startPosition) {
            if (type === 'x') {
              if (currentPosition.y - startPosition.y > 5) {
                return true
              }
              return false
            } else if (type === 'y') {
              if (currentPosition.x - startPosition.x > 5) {
                return true
              }
              return false
            }
          }
        }
      })
    },
    // 处理参考线移动
    handleGuidesMove: function (info) {
      let _t = this
      if (!info.status.start || !info.status.move) {
        return
      }
      let guidesMap = _t.guidesMap
      // 开始画线
      let timeNow = new Date().getTime()
      // 1.处理key
      info.key = info.key || ['guides', info.type, timeNow].join('_')
      let leftVal = info.position.move.x + 'px'
      let topVal = info.position.move.y + 'px'
      // 判断当前key是否已存在
      if (info.type === 'x') {
        guidesMap[info.type][info.key] = {
          key: info.key,
          type: info.type,
          text: topVal,
          style: {
            top: topVal
          },
          toolTip: {
            text: topVal,
            style: {
              display: 'inline-block',
              left: leftVal
            }
          }
        }
      } else if (info.type === 'y') {
        guidesMap[info.type][info.key] = {
          key: info.key,
          type: info.type,
          text: leftVal,
          style: {
            left: leftVal
          },
          toolTip: {
            text: leftVal,
            style: {
              display: 'inline-block',
              top: topVal
            }
          }
        }
      }
      _t.guidesMap = {
        ...guidesMap
      }
    },
    // 桌面右键点击
    handlerRightClick: function (event) {
      let _t = this
      let xVal = parseInt(event.offsetX)
      let yVal = parseInt(event.offsetY)
      // 菜单信息
      let contextMenuInfo = {
        isShow: true,
        x: xVal,
        y: yVal,
        target: 'XPE_board',
        list: [
          {
            name: 'showGuides',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: _t.showGuides ? '隐藏参考线' : '显示参考线',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XPE/scale/guides/toggle'
            }
          },
          {
            name: 'showToolTip',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: _t.showToolTip ? '隐藏参考线坐标' : '显示参考线坐标',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XPE/scale/guides/toolTip/toggle'
            }
          }
        ]
      }
      // 广播事件
      utils.bus.$emit('XPE/contextMenu/show', contextMenuInfo)
    },
    // 处理toolTip显示隐藏
    toggleToolTip: function () {
      let _t = this
      // 遍历参考线，处理toolTip显示隐藏
      let guidesMap = _t.guidesMap
      Object.keys(guidesMap).map(type => {
        Object.keys(guidesMap[type]).map(key => {
          guidesMap[type][key]['toolTip']['style'] = {
            ...guidesMap[type][key]['toolTip']['style'],
            'display': _t.showToolTip ? 'inline-block' : 'none'
          }
        })
      })
      _t.guidesMap = {
        ...guidesMap
      }
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XPE/scale/guides/drag/move', function (info) {
      _t.handleGuidesMove(info)
    })
    utils.bus.$on('XPE/scale/guides/drag/stop', function (info) {
      if (!info.status.start && !info.status.move && info.status.end) {
        // 处理toolTip显示隐藏
        _t.toggleToolTip()
      }
    })
    utils.bus.$on('XPE/board/clear', function () {
      // 清空画板
      _t.guidesMap = {
        x: {},
        y: {}
      }
    })
    utils.bus.$on('XPE/scale/guides/toggle', function () {
      _t.showGuides = !_t.showGuides
    })
    utils.bus.$on('XPE/scale/guides/toolTip/toggle', function () {
      _t.showToolTip = !_t.showToolTip
      // 处理toolTip显示隐藏
      _t.toggleToolTip()
    })
  }
}
</script>
