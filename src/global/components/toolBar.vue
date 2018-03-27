/**
* Created by OXOYO on 2018/3/27.
*
* 画板工具栏
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-form-editor_tool-bar {
    display: inline-block;
    position: absolute;
    z-index: 2500;
    background: #ffffff;
    border: 1px solid #dddddd;
    overflow: hidden;
    transition: all .5s ease-in .1s;
    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);

    .bar-list {
      display: inline-block;

      .bar-item {
        position: relative;
        /*width: 40px;*/
        /*height: 40px;*/
        /*line-height: 40px;*/
        padding: 5px;

        +.bar-item {
          &:before {
            content: ' ';
            width: 20px;
            height: 1px;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -10px;
            background: #dddddd;
            display: inline-block;
          }
        }

        .iconfont {
          width: 20px;
          height: 20px;
          line-height: 20px;
          padding: 5px;
          display: inline-block;

          &:hover {
            background: #dddddd;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="x-form-editor_tool-bar" :style="style">
    <div class="bar-list">
      <div class="bar-item" v-for="(item, index) in barList" :key="index">
        <i :class="['iconfont', item.icon]" :alt="item.title" :title="item.title" @click="handleAction(item.name)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import defConfig from '../../config'
import utils from '../utils'

export default {
  name: 'XFormEditorToolBar',
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig.UI.board.toolBar
      }
    },
    // 是否展开
    expand: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 默认工具列表
      defBarList: [
        {
          name: 'fold',
          title: '折叠',
          icon: 'icon-fold',
          category: 'expand'
        },
        {
          name: 'expand',
          title: '展开',
          icon: 'icon-expand',
          category: 'expand'
        },
        {
          name: 'zoom-in',
          title: '放大',
          icon: 'icon-zoom-in',
          category: 'zoom'
        },
        {
          name: 'zoom-out',
          title: '缩小',
          icon: 'icon-zoom-out',
          category: 'zoom'
        }
      ],
      // 工具列表
      barList: [],
      // 工具栏默认样式，// 位置，可选值 top-left || top-right || bottom-right || bottom-left
      defStyle: {
        'top-left': {
          top: '100px',
          left: '450px'
        },
        'top-right': {
          top: '100px',
          right: '450px'
        },
        'bottom-right': {
          bottom: '100px',
          right: '450px'
        },
        'bottom-left': {
          bottom: '100px',
          left: '450px'
        }
      },
      // 工具栏样式
      style: {},
      // 工具栏与其他面板间距, 默认50px
      distance: 50
    }
  },
  watch: {
    expand: function (val) {
      let _t = this
      console.log('isExpand', val)
      // 处理barList
      _t.handleBarList(val)
    }
  },
  methods: {
    // 初始化
    init: function () {
      let _t = this
      // 计算样式
      _t.style = _t.defStyle[_t.config.position]
      // 处理barList
      _t.handleBarList(_t.expand)
    },
    // 处理barList
    handleBarList: function (isExpand) {
      let _t = this
      // 处理barList
      let tmpArr = _t.defBarList.filter(item => {
        if (item.category === 'expand') {
          if (isExpand) {
            if (item.name === 'expand') {
              return item
            }
          } else {
            if (item.name === 'fold') {
              return item
            }
          }
        } else {
          return item
        }
      })
      _t.barList = tmpArr
    },
    // 处理操作
    handleAction: function (actionName) {
      console.log('actionName', actionName)
      switch (actionName) {
        case 'fold':
          // 广播事件
          utils.bus.$emit('XFormEditor/expand/toggle/all', true)
          break
        case 'expand':
          // 广播事件
          utils.bus.$emit('XFormEditor/expand/toggle/all', false)
          break
      }
    }
  },
  created: function () {
    let _t = this
    // 初始化
    _t.init()
    // 监听事件
    utils.bus.$on('XFormEditor/expand/toggle/single', function (data) {
      let tmpObj = {}
      if (data && data.position) {
        switch (_t.config.position) {
          case 'top-left':
            if (data.position === 'top') {
              tmpObj = {
                top: data.val.top + _t.distance + 'px',
                left: _t.style.left
              }
            } else if (data.position === 'left') {
              tmpObj = {
                top: _t.style.top,
                left: data.val.left + _t.distance + 'px'
              }
            }
            break
          case 'top-right':
            if (data.position === 'top') {
              tmpObj = {
                top: data.val.top + _t.distance + 'px',
                right: _t.style.right
              }
            } else if (data.position === 'right') {
              tmpObj = {
                top: _t.style.top,
                right: data.val.right + _t.distance + 'px'
              }
            }
            break
          case 'bottom-right':
            if (data.position === 'bottom') {
              tmpObj = {
                bottom: data.val.bottom + _t.distance + 'px',
                right: _t.style.right
              }
            } else if (data.position === 'right') {
              tmpObj = {
                bottom: _t.style.bottom,
                right: data.val.right + _t.distance + 'px'
              }
            }
            break
          case 'bottom-left':
            if (data.position === 'bottom') {
              tmpObj = {
                bottom: data.val.bottom + _t.distance + 'px',
                left: _t.style.left
              }
            } else if (data.position === 'left') {
              tmpObj = {
                bottom: _t.style.bottom,
                left: data.val.left + _t.distance + 'px'
              }
            }
            break
        }
        if (Object.keys(tmpObj).length) {
          _t.style = tmpObj
        }
      }
    })
  }
}
</script>
