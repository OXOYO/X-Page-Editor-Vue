/**
* Created by OXOYO on 2018/3/21.
*
* 表单编辑器根容器
*/

<style scoped lang="less" rel="stylesheet/less">
  article, aside, blockquote, body, button, dd, details, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, input, legend, li, menu, nav, ol, p, section, td, textarea, th, ul {
    margin: 0;
    padding: 0;
  }
  *, :after, :before {
    box-sizing: border-box;
  }
  .xpe {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #dddddd;
    display: inline-block;
    background: #ffffff;
    overflow: hidden;
    cursor: default;
    user-select: none;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

<template>
  <div id="xpe" class="xpe" @contextmenu.stop.prevent @mousedown.stop="handleMouseDown">
    <slot name="header" v-if="mergeConfig.UI.header.enable">
      <XPEHeader :config="mergeConfig.UI.header"></XPEHeader>
    </slot>
    <slot name="list" v-if="mergeConfig.UI.list.enable">
      <XPEList :config="mergeConfig.UI.list">
        <slot name="listItem"></slot>
      </XPEList>
    </slot>
    <slot name="board" v-if="mergeConfig.UI.board.enable">
      <XPEBoard :config="mergeConfig.UI.board"></XPEBoard>
    </slot>
    <slot name="options" v-if="mergeConfig.UI.options.enable">
      <XPEOptions :config="mergeConfig.UI.options"></XPEOptions>
    </slot>
    <slot name="footer" v-if="mergeConfig.UI.footer.enable">
      <XPEFooter :config="mergeConfig.UI.footer"></XPEFooter>
    </slot>
    <!-- 右键菜单 -->
    <XPEContextMenu></XPEContextMenu>
  </div>
</template>

<script>
import '@/global/icon/iconfont.css'

import XPEHeader from './Header'
import XPEList from './List.vue'
import XPEBoard from './Board'
import XPEOptions from './Options.vue'
import XPEFooter from './Footer.vue'
import XPEContextMenu from '@/global/components/ContextMenu/Index.vue'

import defConfig from '@/config'
import utils from '@/global/utils'

export default {
  name: 'XPE',
  components: {
    XPEHeader,
    XPEList,
    XPEBoard,
    XPEOptions,
    XPEFooter,
    XPEContextMenu
    // ,
    // XPEAddProjectModal
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
      mergeConfig: {},
      // 项目列表
      projectList: []
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
    },
    // 鼠标点击事件
    handleMouseDown: function () {
      // 关闭菜单
      utils.bus.$emit('XPE/contextMenu/hide')
    }
  },
  created: function () {
    let _t = this
    // 初始化
    _t.init()
  }
}
</script>
