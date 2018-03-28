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
      width: 100%;
      height: 1px;
      background: #4AFFFF;
      cursor: ns-resize;
    }
    .guides_y {
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background: #4AFFFF;
      cursor: ew-resize;
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
        :key="index"
        :style="item.style"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="scale_y" :style="{ 'height': height + 'px'}" @mousedown.stop.prevent="handleMouseDownOnScale('y', $event)">
      <div
        class="scale_item"
        v-for="(item, index) in scaleList.y"
        :key="index"
        :style="item.style"
      >
        {{ item.text }}
      </div>
    </div>
    <!-- 参考线 -->
    <div
      class="guides_x"
      v-for="(item, index) in guidesList.x"
      :key="index"
      :style="item.style"
      :alt="item.text"
      :title="item.text"
    >
    </div>
    <div
      class="guides_y"
      v-for="(item, index) in guidesList.x"
      :key="index"
      :style="item.style"
      :alt="item.text"
      :title="item.text"
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
        x: [],
        y: []
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
    // FIXME !!! 画参考线的逻辑需从新考虑
    handleMouseDownOnScale: function (type, event) {
      if (type === 'x') {
        console.log('handleMouseDownOnScale type', type, event.offsetY)
      } else if (type === 'y') {
        console.log('handleMouseDownOnScale type', type, event.offsetX)
      }
      // 广播事件
      utils.bus.$emit('XFormEditor/scale/guides/add', {
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
              if (currentPosition.y - startPosition.y > 18) {
                return true
              }
              return false
            } else if (type === 'y') {
              if (currentPosition.x - startPosition.x > 18) {
                return true
              }
              return false
            }
          }
        }
      })
    },
    handleMouseMoveOnScale: function (type) {
      console.log('handleMouseMoveOnScale type', type)
    }
  },
  created: function () {
    // 监听事件
    utils.bus.$on('XFormEditor/scale/guides/move', function (val) {
      console.log('XFormEditor/scale/guides/move', val)
    })
  }
}
</script>
