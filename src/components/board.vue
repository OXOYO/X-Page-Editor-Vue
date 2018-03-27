/**
* Created by OXOYO on 2018/3/21.
*
* 画板组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-form-editor_board {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    padding: 0;
    display: inline-block;
    z-index: 1000;

    .block_body {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1000;
      background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0), linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
      background-position: 0 0, 10px 10px;
      background-size: 20px 20px;

      .list_item {
        height: 20px;
        line-height: 20px;
        padding: 10px;
        margin: 5px;
        border-bottom: 1px solid;
      }
    }
  }
</style>

<template>
  <div class="x-form-editor_board" @dblclick="toggleExpand">
    <div class="block_body">
      <h1>TODO Board</h1>
    </div>
    <slot name="toolBar" v-if="config.toolBar.enable">
      <XFormEditorToolBar :config="config.toolBar" :expand="isExpand"></XFormEditorToolBar>
    </slot>
  </div>
</template>

<script>
import XFormEditorToolBar from '../global/components/toolBar.vue'
import defConfig from '../config'
import utils from '../global/utils'

export default {
  name: 'XFormEditorBoard',
  components: {
    XFormEditorToolBar
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig.UI.board
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
    toggleExpand: function () {
      let _t = this
      _t.isExpand = !_t.isExpand
      // 广播事件
      utils.bus.$emit('XFormEditor/expand/toggle/all', _t.isExpand)
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XFormEditor/expand/toggle/all', function (val) {
      _t.isExpand = val
    })
  }
}
</script>
