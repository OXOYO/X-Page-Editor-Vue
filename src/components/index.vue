/**
* Created by OXOYO on 2018/3/21.
*
* 表单编辑器根容器
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-form-editor {
    position: relative;
  }
</style>

<template>
  <div class="x-form-editor">
    <h1>TODO XFormEditor</h1>
    <slot></slot>
  </div>
</template>

<script>
import config from '../config'

export default {
  name: 'XFormEditor',
  props: {
    config: {
      type: Object,
      default: config
    }
  },
  methods: {
    // 初始化方法
    init: function () {
      let _t = this
      // 渲染主界面
      _t.renderUI()
    },
    // 渲染编辑器主界面
    renderUI: function () {
      let _t = this
      // 处理配置信息
      let config = JSON.parse(JSON.stringify(_t.config))
      console.log('UIconfig', config)
    }
  },
  created: function () {
    let _t = this
    // 初始化
    _t.init()
  }
}
</script>
