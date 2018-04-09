/**
* Created by OXOYO on 2018/4/8.
*
* 画布组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .xpe_canvas {
    display: inline-block;
    position: absolute;
    z-index: 2000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .canvas_item {
      display: inline-block;
      position: absolute;
      left: 50%;
      margin: 100px 0;
      background: #fff;

      &.active,
      &:hover {
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
      }

      &.pc {
        width: 960px;
        height: 1000px;
        margin-left: -480px;
      }
      &.mobile {
        width: 360px;
        height: 1349px;
        margin-left: -180px;
      }

      .component-node {

        &:hover {
          background: red;
        }
      }
    }
  }
</style>

<template>
  <div class="xpe_canvas">
    <div
      v-for="item in canvasMap"
      v-if="currentActive === item.id"
      :class="[ 'canvas_item', currentActive === item.id ? 'active' : '', item.type === 'pc' ? 'pc' : item.type === 'mobile' ? 'mobile' : '' ]"
      :key="item.id"
      :project-id="item.id"
      :name="item.name"
      :title="item.name"
      @contextmenu.stop.prevent="handlerRightClick($event)"
      @drop.stop.prevent="handleDrop(item, $event)"
      @dragover.stop.prevent
    >
      <h1> {{ item.name }}</h1>
      <h1> {{ item.id }}</h1>
      <template
        v-for="(node, index) in item.components"
      >
        <component
          class="component-node"
          :is="node.component.name"
          :key="index"
          :node-id="node.id"
          v-bind="node.props"
          :style="node.style"
          @click="handleComponentTrigger(node)"
        >
          {{ node.innerHTML}}
        </component>
      </template>
    </div>
  </div>
</template>

<script>
import utils from '@/global/utils'

export default {
  name: 'XPECanvas',
  data () {
    return {
      // 画布列表
      canvasMap: {},
      // 当前激活对象
      currentActive: '',
      // 当前操作对象
      currentTarget: ''
    }
  },
  methods: {
    // 桌面右键点击
    handlerRightClick: function (event) {
      let _t = this
      console.log(event)
      let xpeEl = document.querySelector('#xpe')
      let xVal
      let yVal
      if (xpeEl) {
        xVal = event.clientX - xpeEl.offsetLeft
        yVal = event.clientY - xpeEl.offsetTop
      } else {
        xVal = event.offsetX
        yVal = event.offsetY
      }
      // 菜单信息
      let contextMenuInfo = {
        isShow: true,
        x: xVal,
        y: yVal,
        target: 'XPE_board',
        list: [
          {
            name: 'expand',
            icon: {
              type: 'icon-expand',
              style: ''
            },
            text: '展开',
            enable: _t.isExpand,
            action: {
              type: 'bus',
              handler: 'XPE/expand/toggle/all',
              params: false
            }
          },
          {
            name: 'fold',
            icon: {
              type: 'icon-fold',
              style: ''
            },
            text: '折叠',
            enable: !_t.isExpand,
            action: {
              type: 'bus',
              handler: 'XPE/expand/toggle/all',
              params: true
            }
          },
          {
            name: 'clear',
            icon: {
              type: '',
              style: ''
            },
            text: '清空画布',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XPE/canvas/clear',
              params: _t.currentActive
            }
          }
        ]
      }
      // 广播事件
      utils.bus.$emit('XPE/contextMenu/show', contextMenuInfo)
    },
    // 处理组件点击
    handleComponentTrigger: function (nodeInfo) {
      console.log('handleComponentTrigger', nodeInfo.component.name)
      // 广播事件，更新当前激活组件
      utils.bus.$emit('XPE/project/component/trigger', nodeInfo)
    },
    // 元素drop
    handleDrop: function (item, event) {
      let _t = this
      console.log('handleDrop')
      // 获取节点数据
      let nodeInfo = JSON.parse(event.dataTransfer.getData('node'))
      let offsetX = event.offsetX
      let offsetY = event.offsetY
      let style = {
        position: 'absolute',
        left: offsetX + 'px',
        top: offsetY + 'px'
      }
      nodeInfo.style = style
      // 更新当前画布下的组件数据
      _t.canvasMap[item.id]['components'].push(nodeInfo)
      // 广播事件，更新当前激活组件
      utils.bus.$emit('XPE/project/component/trigger', nodeInfo)
      // TODO 完善组件上右键菜单
    },
    // 处理props更新
    handlePropsSet: function (nodeInfo) {
      let _t = this
      _t.canvasMap[_t.currentActive]['components'].map(node => {
        if (node.id === nodeInfo.id) {
          console.log('node.id', node.id)
          node.props = nodeInfo.props
          node.slots = nodeInfo.slots
          node.innerHTML = nodeInfo.innerHTML
        }
        return node
      })
      console.log('handlePropsSet')
    },
    // 清空画布
    clearCanvas: function (projectID) {
      let _t = this
      _t.canvasMap[projectID]['components'] = []
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XPE/project/add/ok', function (projectInfo) {
      console.log('canvasMap', projectInfo.name)
      _t.canvasMap = {
        ..._t.canvasMap,
        [projectInfo.id]: projectInfo
      }
      // 更新当前激活对象
      _t.currentActive = projectInfo.id
    })
    utils.bus.$on('XPE/project/trigger', function (projectID) {
      // 更新当前激活对象
      _t.currentActive = projectID
    })
    utils.bus.$on('XPE/project/remove', function (projectID) {
      // 删除当前操作对象数据
      delete _t.canvasMap[projectID]
    })
    utils.bus.$on('XPE/project/component/props/set', function (nodeInfo) {
      _t.handlePropsSet(nodeInfo)
    })
    utils.bus.$on('XPE/canvas/clear', function (projectID) {
      _t.clearCanvas(projectID)
    })
  }
}
</script>
