/**
* Created by OXOYO on 2018/3/26.
*
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-form-editor_handler {
    display: inline-block;
    position: absolute;
    background: #ffffff;
    border: 1px solid #dddddd;
    overflow: hidden;
    transition: all .5s ease-in .1s;

    &:hover {
      .handler-content {
        transform: rotate(360deg);
      }
    }

    &.horizontal {
      width: 40px;
      height: 20px;
      line-height: 20px;
      left: 50%;
      margin-left: -20px;
    }
    &.vertical {
      width: 20px;
      height: 40px;
      line-height: 40px;
      top: 50%;
      margin-top: -20px;
    }

    &.top {
      top: 0;
      margin-top: -22px;
      border-bottom-color: #ffffff;
    }
    &.right {
      right: 0;
      margin-right: -22px;
      border-left-color: #ffffff;
    }
    &.bottom {
      bottom: 0;
      margin-bottom: -22px;
      border-top-color: #ffffff;
    }
    &.left {
      left: 0;
      margin-left: -22px;
      border-right-color: #ffffff;
    }

    &.expand {
      &.top {
        margin-top: 0;
      }
      &.right {
        margin-right: 0;
      }
      &.bottom {
        margin-bottom: 0;
      }
      &.left {
        margin-left: 0;
      }
    }

    .handler-content {
      display: inline-block;
      cursor: default;
      transition: all .5s ease-in .1s;
    }
  }

</style>

<template>
  <div :class="className">
    <div class="handler-content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: 'XFormEditorHandler',
  props: {
    // 模式
    mode: {
      type: String,
      validator (value) {
        return ['horizontal', 'vertical'].includes(value)
      },
      default: 'vertical'
    },
    // 相对目标元素位置关系
    position: {
      type: String,
      validator (value) {
        return ['top', 'right', 'bottom', 'left'].includes(value)
      },
      default: 'right'
    },
    // 是否展开
    expand: {
      type: Boolean,
      default: true
    },
    // 内容
    content: {
      type: String,
      default: '>'
    },
    // 回调
    callback: {
      type: Function
    }
  },
  computed: {
    className: function () {
      let _t = this
      return ['x-form-editor_handler', _t.mode, _t.position, _t.expand]
    }
  }
}
</script>
