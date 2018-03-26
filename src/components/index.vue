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
    border: 1px solid #dddddd;
    display: inline-block;
    background: #ffffff;
    overflow: hidden;
  }
  article, aside, blockquote, body, button, dd, details, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, input, legend, li, menu, nav, ol, p, section, td, textarea, th, ul {
    margin: 0;
    padding: 0;
  }
  *, :after, :before {
    box-sizing: border-box;
  }
</style>

<template>
  <div class="x-form-editor">
    <slot name="header" v-if="mergeConfig.UI.header.enable">
      <XFormEditorHeader></XFormEditorHeader>
    </slot>
    <slot name="list" v-if="mergeConfig.UI.list.enable">
      <XFormEditorList :config="mergeConfig.UI.list"></XFormEditorList>
    </slot>
    <slot name="board" v-if="mergeConfig.UI.board.enable">
      <XFormEditorBoard></XFormEditorBoard>
    </slot>
    <slot name="options" v-if="mergeConfig.UI.options.enable">
      <XFormEditorOptions></XFormEditorOptions>
    </slot>
    <slot name="footer" v-if="mergeConfig.UI.footer.enable">
      <XFormEditorFooter></XFormEditorFooter>
    </slot>
  </div>
</template>

<script>
import XFormEditorHeader from './header.vue'
import XFormEditorList from './list.vue'
import XFormEditorBoard from './board.vue'
import XFormEditorOptions from './options.vue'
import XFormEditorFooter from './footer.vue'

import defConfig from '../config'
import utils from '../utils'

export default {
  name: 'XFormEditor',
  components: {
    XFormEditorHeader,
    XFormEditorList,
    XFormEditorBoard,
    XFormEditorOptions,
    XFormEditorFooter
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig
      }
    }
  },
  data () {
    return {
      defConfig,
      // 合并后的config
      mergeConfig: {}
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
      _t.mergeConfig = utils.mergeObject(_t.defConfig, _t.config)
    }
  },
  created: function () {
    let _t = this
    // 初始化
    _t.init()
  }
}
</script>
