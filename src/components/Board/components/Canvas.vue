/**
* Created by OXOYO on 2018/4/8.
*
* 画布组件
*/

<style  lang="less" rel="stylesheet/less">
  .xpe_canvas {
    display: inline-block;
    position: absolute;
    z-index: 2000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    .canvas-box {
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

      .component-node {}

      .selection {
        display: none;
        position: absolute;
        border: 1px solid transparent;
        border-image: url("../../../assets/selection.gif");
        border-image-slice: 1;
        border-image-width: 1px;
        border-image-repeat: round;
      }
    }
  }
</style>

<template>
  <!-- FIXME 【!!!】 .xpe_canvas div 上的 mousemove.stop 会导致无法拖拽 guides 考虑可以将 Board上的mousemove 事件绑定改完动态绑定 -->
  <div
    class="xpe_canvas"
  >
    <div
      v-for="item in canvasMap"
      v-show="currentProject === item.id"
      :class="[ 'canvas-box', currentProject === item.id ? 'active' : '', item.type === 'pc' ? 'pc' : item.type === 'mobile' ? 'mobile' : '' ]"
      :key="item.id"
      :project-id="item.id"
      :name="item.name"
      :title="item.name"
      @contextmenu.stop.prevent="handlerRightClickOnCanvas($event)"
      @drop.stop.prevent="handleDrop(item, $event)"
      @dragover.stop.prevent
    >
      <h1> {{ item.name }}</h1>
      <h1> {{ item.id }}</h1>
      <!-- 选中虚线框效果 -->
      <div
        v-for="(selectionStyle, key) in item.selectionStyleMap"
        :key="'selection-' + key"
        :selection-id="'selection-' + key"
        class="selection"
        :style="selectionStyle"
      ></div>
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
          @contextmenu.native.stop.prevent="handlerRightClickOnNode(node, $event)"
          @click.stop.prevent="handleComponentTrigger(node)"
          draggable="true"
          @dragstart.native="handleDragStart(node, $event)"
          @mouseover.native.stop.prevent="handleMouseOverOnNode(node)"
          @mouseout.native.stop.prevent="handleMouseOutOnNode(node)"
        >
          {{ node.innerHTML}}
        </component>
      </template>
    </div>
  </div>
</template>

<script>
import XPEButton from '@/ui/Button.vue'
import utils from '@/global/utils'

export default {
  name: 'XPECanvas',
  components: {
    XPEButton
  },
  data () {
    return {
      // 画布列表
      canvasMap: {},
      // 当前激活对象
      currentProject: '',
      // 当前操作元素
      currentNode: ''
    }
  },
  methods: {
    // 画布右键点击
    handlerRightClickOnCanvas: function (event) {
      let _t = this
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
        target: 'XPE_canvas',
        list: [
          {
            name: 'expand',
            icon: {
              type: 'icon-expand',
              style: '',
              category: 'iconfont'
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
              style: '',
              category: 'iconfont'
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
            name: 'showGuides',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: '显示 / 隐藏参考线',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XPE/scale/guides/toggle'
            }
          },
          {
            name: 'showToolTip',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: '显示 / 隐藏参考线坐标',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XPE/scale/guides/toolTip/toggle'
            }
          },
          {
            name: 'clear',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: '清空画布',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XPE/canvas/clear',
              params: _t.currentProject
            }
          }
        ]
      }
      // 广播事件
      utils.bus.$emit('XPE/contextMenu/show', contextMenuInfo)
    },
    // 元素上右键
    handlerRightClickOnNode: function (nodeInfo, event) {
      let _t = this
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
        target: 'XPE_canvas_node',
        list: [
          {
            name: 'expand',
            icon: {
              type: 'icon-expand',
              style: '',
              category: 'iconfont'
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
              style: '',
              category: 'iconfont'
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
              style: '',
              category: 'iconfont'
            },
            text: '清空画布',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XPE/canvas/clear',
              params: _t.currentProject
            }
          },
          {
            name: 'showGuides',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: '显示 / 隐藏参考线',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XPE/scale/guides/toggle'
            }
          },
          {
            name: 'showToolTip',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: '显示 / 隐藏参考线坐标',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XPE/scale/guides/toolTip/toggle'
            }
          },
          {
            name: 'edit',
            icon: {
              type: 'edit',
              style: '',
              category: 'iview'
            },
            text: '编辑',
            enable: true,
            action: {
              type: 'callback',
              handler: _t.handleComponentTrigger,
              params: nodeInfo
            }
          }
        ]
      }
      // 广播事件
      utils.bus.$emit('XPE/contextMenu/show', contextMenuInfo)
    },
    // 处理组件点击
    handleComponentTrigger: function (nodeInfo) {
      let _t = this
      // 更新当前操作的节点
      _t.currentNode = nodeInfo.id
      console.log('handleComponentTrigger', nodeInfo.component.name)
      // 广播事件，更新当前激活组件
      utils.bus.$emit('XPE/project/component/trigger', nodeInfo)
      _t.$nextTick(function () {
        _t.handleMouseOverOnNode(nodeInfo)
        _t.handleMouseOutOnNode()
      })
    },
    // 元素drop
    handleDrop: function (item, event) {
      let _t = this
      console.log('handleDrop')
      let canvasMap = _t.canvasMap
      // 获取节点数据
      let nodeInfo = JSON.parse(event.dataTransfer.getData('node'))
      nodeInfo = {
        id: '',
        components: {},
        props: {},
        slots: {},
        innerHTML: '',
        ...nodeInfo
      }
      let offsetX = event.offsetX
      let offsetY = event.offsetY
      let style = {
        position: 'absolute',
        'pointer-events': 'auto',
        left: offsetX + 'px',
        top: offsetY + 'px'
      }
      console.log('style', style)
      nodeInfo.style = {
        ...nodeInfo.style,
        ...style
      }
      // 更新当前画布下的组件数据
      if (canvasMap[item.id]['components'].length) {
        // 判断该节点是否已存在
        let nodeIndex = canvasMap[item.id]['components'].findIndex(node => node.id === nodeInfo.id)
        if (nodeIndex > -1) {
          canvasMap[item.id]['components'][nodeIndex] = nodeInfo
        } else {
          canvasMap[item.id]['components'].push(nodeInfo)
        }
      } else {
        canvasMap[item.id]['components'].push(nodeInfo)
      }
      _t.canvasMap = {
        ...canvasMap
      }
      // 更新当前操作的节点
      _t.currentNode = nodeInfo.id
      // 广播事件，更新当前激活组件
      utils.bus.$emit('XPE/project/component/trigger', nodeInfo)
      _t.$nextTick(function () {
        _t.handleMouseOverOnNode(nodeInfo)
        _t.handleMouseOutOnNode()
      })
    },
    // 节点拖拽
    handleDragStart: function (nodeInfo, event) {
      console.log('handleDragStart nodeInfo', nodeInfo.component.name)
      // 拖拽的节点数据
      event.dataTransfer.setData('node', JSON.stringify(nodeInfo))
    },
    // 处理options更新
    handleOptionsSet: function (nodeInfo) {
      let _t = this
      let canvasMap = _t.canvasMap
      canvasMap[_t.currentProject]['components'].map(node => {
        if (node.id === nodeInfo.id) {
          console.log('node.id', node.id)
          node.props = nodeInfo.props
          node.slots = nodeInfo.slots
          node.innerHTML = nodeInfo.innerHTML
          node.style = nodeInfo.style
        }
        return node
      })
      _t.canvasMap = {
        ...canvasMap
      }
      console.log('handleOptionsSet')
      _t.$nextTick(function () {
        _t.handleMouseOverOnNode(nodeInfo)
      })
    },
    // 清空画布
    clearCanvas: function (projectID) {
      let _t = this
      _t.canvasMap[projectID]['components'] = []
      _t.canvasMap[projectID]['selectionStyleMap'] = {}
    },
    handleMouseOverOnNode: function (nodeInfo) {
      let _t = this
      console.log('handleMouseOverOnNode')
      let target = document.querySelector('[node-id=' + nodeInfo.id + ']')
      if (target) {
        let width = target.offsetWidth + 2
        let height = target.offsetHeight + 2
        console.log('width', width, 'height', height)
        let style = {
          display: 'inline-block',
          width: width + 'px',
          height: height + 'px',
          margin: '-1px',
          left: nodeInfo.style.left,
          top: nodeInfo.style.top
        }
        _t.canvasMap[_t.currentProject]['selectionStyleMap'] = {
          ..._t.canvasMap[_t.currentProject]['selectionStyleMap'],
          [nodeInfo.id]: style
        }
      }
    },
    handleMouseOutOnNode: function () {
      let _t = this
      console.log('handleMouseOutOnNode')
      if (Object.keys(_t.canvasMap[_t.currentProject]['selectionStyleMap']).length) {
        let selectionStyleMap = _t.canvasMap[_t.currentProject]['selectionStyleMap']
        Object.keys(selectionStyleMap).map(key => {
          if (key !== _t.currentNode) {
            delete selectionStyleMap[key]
          }
        })
        _t.canvasMap[_t.currentProject]['selectionStyleMap'] = {
          ...selectionStyleMap
        }
      }
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XPE/project/add/ok', function (projectInfo) {
      console.log('canvasMap', projectInfo.name)
      _t.canvasMap = {
        ..._t.canvasMap,
        [projectInfo.id]: {
          id: '',
          name: '',
          type: 'pc',
          components: [],
          selectionStyleMap: {},
          ...projectInfo
        }
      }
      // 更新当前激活对象
      _t.currentProject = projectInfo.id
    })
    utils.bus.$on('XPE/project/trigger', function (projectID) {
      // 更新当前激活对象
      _t.currentProject = projectID
    })
    utils.bus.$on('XPE/project/remove', function (projectID) {
      // 删除当前操作对象数据
      delete _t.canvasMap[projectID]
    })
    utils.bus.$on('XPE/project/component/options/set', function (nodeInfo) {
      _t.handleOptionsSet(nodeInfo)
    })
    utils.bus.$on('XPE/canvas/clear', function (projectID) {
      _t.clearCanvas(projectID)
    })
  }
}
</script>
