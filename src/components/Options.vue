/**
* Created by OXOYO on 2018/3/21.
*
* 配置组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .xpe_options {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 400px;
    margin-right: -400px;
    padding-top: 50px;
    border-left: 1px solid #dddddd;
    display: inline-block;
    z-index: 2000;
    background: #ffffff;
    box-shadow: -2px 0 2px 0 rgba(0, 0, 0, 0.1);
    transition: all .5s ease-in .1s;

    &.block_expand {
      margin-right: 0;
    }

    &:hover {
      .handler {
        margin-left: -10px;
      }
    }

    .block_header {
      width: 100%;
      height: 39px;
      line-height: 39px;
      border-bottom: 1px solid #dddddd;
      text-align: right;

      .title {
        font-size: 16px;
        font-weight: bold;
        margin-right: 20px;
        display: inline-block;
      }
    }
    .block_body {
      position: absolute;
      top: 90px;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 2000;
      background: #ffffff;
    }
  }
</style>

<template>
  <div :class="{'xpe_options': true, 'block_expand': isExpand}">
    <div class="block_header">
      <div class="title">TODO Options</div>
    </div>
    <div class="block_body">

    </div>
    <XPEHandler class="handler" mode="vertical" position="left" :expand="isExpand" :callback="toggleHandler"></XPEHandler>
  </div>
</template>

<script>
import XPEHandler from '../global/components/Handler.vue'

import defConfig from '../config'
import utils from '../global/utils'

export default {
  name: 'XPEOptions',
  components: {
    XPEHandler
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig.UI.options
      }
    }
  },
  data () {
    return {
      // 是否展开
      isExpand: true
    }
  },
  methods: {
    // 切换handler显示/隐藏
    toggleHandler: function (val) {
      let _t = this
      _t.isExpand = val !== undefined ? val : !_t.isExpand
      _t.$nextTick(function () {
        let elWidth = _t.isExpand ? _t.$el.offsetWidth : 0
        // 广播事件
        utils.bus.$emit('XPE/expand/toggle/single', {
          position: 'right',
          val: {
            right: elWidth
          }
        })
      })
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XPE/expand/toggle/all', function (val) {
      _t.toggleHandler(val)
    })
  }
}
</script>
