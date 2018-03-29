/**
* Created by OXOYO on 2018/3/28.
*
* 刻度尺
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-form-editor_scale {
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
      width: 100%;
      height: 18px;
      background: url('../../assets/scale_x.png') repeat-x;

      .scale_item {
        top: 1px;
      }
    }
    .scale_y {
      position: absolute;
      top: 0;
      width: 18px;
      height: 100%;
      background: url('../../assets/scale_y.png') repeat-y;

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

    .guides_x {
      position: absolute;
      top: 0;
      height: 1px;
      background: #4AFFFF;
      cursor: row-resize;

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
      width: 1px;
      background: #4AFFFF;
      cursor: col-resize;

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
  <div class="x-form-editor_scale">
    <!-- 刻度尺 -->
    <div class="scale_x" :style="{ 'width': width + 'px' }" @mousedown.stop.prevent="handleMouseDownOnScale('x', $event)">
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
    <div class="scale_y" :style="{ 'height': height + 'px'}" @mousedown.stop.prevent="handleMouseDownOnScale('y', $event)">
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
      v-for="item in guidesMap.x"
      :key="item.key"
      :guides_key="item.key"
      :style="[{ 'width': width + 'px' }, item.style ]"
      :alt="item.text"
      :title="item.text"
      :type="item.type"
      @mousedown.stop.prevent="handleMouseDownOnGuides(item, $event)"
    >
    </div>
    <div
      class="guides_y"
      v-for="item in guidesMap.y"
      :key="item.key"
      :guides_key="item.key"
      :style="[{ 'height': height + 'px' }, item.style ]"
      :alt="item.text"
      :title="item.text"
      :type="item.type"
      @mousedown.stop.prevent="handleMouseDownOnGuides(item, $event)"
    >
    </div>
  </div>
</template>

<script>
import defConfig from '../../config'
import utils from '../utils'

export default {
  name: 'XFormEditorScale',
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
      // 参考线列表
      guidesList: {
        x: {},
        y: {}
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
      }
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
      utils.bus.$emit('XFormEditor/scale/guides/add/start', {
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
      utils.bus.$emit('XFormEditor/scale/guides/edit/start', {
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
      // 开始画线
      let timeNow = new Date().getTime()
      // 1.处理key
      info.key = info.key || ['guides', info.type, timeNow].join('_')
      let leftVal = info.position.move.x + 'px'
      let topVal = info.position.move.y + 'px'
      // 判断当前key是否已存在
      if (info.type === 'x') {
        _t.guidesList[info.type][info.key] = {
          key: info.key,
          type: info.type,
          text: topVal,
          style: {
            top: topVal
          }
        }
      } else if (info.type === 'y') {
        _t.guidesList[info.type][info.key] = {
          key: info.key,
          type: info.type,
          text: leftVal,
          style: {
            left: leftVal
          }
        }
      }
      _t.guidesMap = JSON.parse(JSON.stringify(_t.guidesList))
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XFormEditor/scale/guides/move', function (info) {
      _t.handleGuidesMove(info)
    })
    utils.bus.$on('XFormEditor/scale/guides/stop', function (info) {
      if (!info.status.start && !info.status.move && info.status.end) {
        _t.guidesMap = JSON.parse(JSON.stringify(_t.guidesList))
      }
    })
  }
}
</script>
