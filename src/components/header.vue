/**
* Created by OXOYO on 2018/3/22.
*
* 头部组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-form-editor_header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    margin-top: -49px;
    border-bottom: 1px solid #dddddd;
    display: inline-block;
    z-index: 2500;
    background: #ffffff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
    transition: all .5s ease-in .1s;

    &.block_expand {
      margin-top: 0;
    }

    &:hover {
      .handler {
        margin-bottom: -10px;
      }
    }

    .block_header {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 24px;
      font-weight: bold;
      display: inline-block;
    }
    .block_body {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 2500;
      background: #ffffff;
      text-align: center;

      .title {
        height: 30px;
        line-height: 30px;
        font-size: 24px;
        font-weight: bold;
        text-shadow: 2px 0px 10px rgba(0, 0, 0, 0.3);
        display: inline-block;
        margin: 0 auto;
      }
    }
  }
</style>

<template>
  <div :class="{'x-form-editor_header': true, 'block_expand': isExpand}">
    <div class="block_body">
      <div class="title">X-Form-Editor</div>
    </div>
    <XFormEditorHandler class="handler" mode="horizontal" position="bottom" :expand="isExpand" :callback="toggleHandler"></XFormEditorHandler>
  </div>
</template>

<script>
import XFormEditorHandler from '../global/components/handler.vue'
import utils from '../global/utils'

export default {
  name: 'XFormEditorHeader',
  components: {
    XFormEditorHandler
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
        let elHeight = _t.isExpand ? _t.$el.offsetHeight : 0
        // 广播事件
        utils.bus.$emit('XFormEditor/expand/toggle/single', {
          position: 'top',
          val: {
            top: elHeight
          }
        })
      })
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XFormEditor/expand/toggle/all', function (val) {
      _t.toggleHandler(val)
    })
  }
}
</script>
