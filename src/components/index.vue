/**
* Created by OXOYO on 2018/3/21.
*
* 表单编辑器根容器
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-form-editor {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #f5f7f9;
  }
</style>

<template>
  <div class="x-form-editor">
    <h1>TODO XFormEditor</h1>
    <component :is="components.list"></component>
  </div>
</template>

<script>
import Vue from 'vue'
import defConfig from '../config'

export default {
  name: 'XFormEditor',
  props: {
    config: {
      type: Object,
      default: defConfig
    }
  },
  data () {
    return {
      defConfig,
      components: {}
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
      console.log('defConfig', _t.defConfig)
      console.groupCollapsed('XFormEditor COMPONENTS LOAD ERROR::')
      Object.keys(config.UI).map(key => {
        let item = config.UI[key]
        // 判断是否启用
        if (item.enable) {
          // 处理组件路径
          let componentPath = item.component || _t.defConfig.UI[key].component
          try {
            // 加载组件
            _t.components[key] = Vue.extend(require('' + componentPath).default)
          } catch (err) {
            console.warn('LOAD', componentPath, 'FAIL:', err.message)
          }
        }
      })
      console.groupEnd()
    }
  },
  created: function () {
    let _t = this
    // 初始化
    _t.init()
  }
}
</script>
