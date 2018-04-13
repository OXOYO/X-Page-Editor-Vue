/**
* Created by OXOYO on 2018/3/22.
*
* 头部组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .xpe_header {
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
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 200px;
      height: 49px;
      line-height: 49px;
      font-size: 24px;
      font-weight: bold;
      display: inline-block;

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
    .block_body {
      position: absolute;
      top: 0;
      right: 400px;
      left: 400px;
      bottom: 0;
      z-index: 2500;
      background: #ffffff;
      /*text-align: right;*/

      .tab-group {
        display: inline-block;
        float: left;
        height: 30px;
        line-height: 30px;
        margin-top: 18px;
        max-width: 70%;
      }

      .btn-group {
        display: inline-block;
        float: right;
        height: 30px;
        line-height: 30px;
        margin-top: 18px;
        max-width: 30%;
        .btn-item {
          padding: 0 5px;
        }
      }
    }
  }
</style>

<template>
  <div :class="{'xpe_header': true, 'block_expand': isExpand}">
    <div class="block_header" v-if="config.title.enable">
      <div class="title">{{ config.title.text }}</div>
    </div>
    <div class="block_body">
      <!-- tab -->
      <div class="tab-group">
        <XPETabList></XPETabList>
      </div>
      <div class="btn-group">
        <!-- TODO 上传UI效果图，进行UI图与界面的比对 -->
        <XUIButton
          type="text"
          class="btn-item"
          @contextmenu.stop.prevent
          @mousedown.stop.prevent
          @click.native.stop.prevent="handleAction('addProject')"
        >
          <XPEIcon type="add-circle" title="新建项目"></XPEIcon>
        </XUIButton>
        <XUIButton
          type="text"
          class="btn-item"
          @contextmenu.stop.prevent
          @mousedown.stop.prevent
          @click.native.stop.prevent="handleAction('ui')"
        >
          <XPEIcon type="ui" title="UI"></XPEIcon>
        </XUIButton>
        <XUIButton
          type="text"
          class="btn-item"
          @contextmenu.stop.prevent
          @mousedown.stop.prevent
          @click.native.stop.prevent="handleAction('preview')"
        >
          <XPEIcon type="preview" title="预览"></XPEIcon>
        </XUIButton>
      </div>
    </div>
    <XPEHandler class="handler" mode="horizontal" position="bottom" :expand="isExpand" :callback="toggleHandler"></XPEHandler>
    <!-- 新建项目弹窗 -->
    <XPEAddProjectModal></XPEAddProjectModal>
  </div>
</template>

<script>
import XPEHandler from '@/global/components/Handler.vue'
import XPEAddProjectModal from './components/AddProjectModal.vue'
import XPETabList from './components/TabList.vue'

import defConfig from '@/config'
import utils from '@/global/utils'

export default {
  name: 'XPEHeader',
  components: {
    XPEHandler,
    XPEAddProjectModal,
    XPETabList
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig.UI.header
      }
    }
  },
  data () {
    return {
      // 是否展开
      isExpand: true,
      // tab列表数据
      tabList: []
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
        utils.bus.$emit('XPE/expand/toggle/single', {
          position: 'top',
          val: {
            top: elHeight
          }
        })
      })
    },
    handleAction: function (actionName) {
      console.log('handleAction', actionName)
      let handleAddProject = function () {
        utils.bus.$emit('XPE/project/add')
      }
      switch (actionName) {
        case 'addProject':
          handleAddProject()
          break
      }
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
