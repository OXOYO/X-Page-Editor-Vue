/**
* Created by OXOYO on 2018/4/3.
*
* 弹窗组件 【暂弃】
*/

<style scoped lang="less" rel="stylesheet/less">
  .xpe_modal {
    position: absolute;
    z-index: 9999;
    top: 20%;
    left: 50%;
    /*border: 1px solid #dddddd;*/
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3);
    text-align: left;
    transition: all .5s ease-in .1s;

    .modal_header {
      border-bottom: 1px solid #e9eaec;
      padding: 14px 16px;
      line-height: 1;

      .header_content {
        display: inline-block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #1c2438;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .modal_body {
      padding: 16px;
      font-size: 12px;
      line-height: 1.5;
    }
    .modal_footer {
      border-top: 1px solid #e9eaec;
      padding: 12px 18px;
      text-align: right;
    }
  }
</style>

<template>
  <div class="xpe_modal" :style="computedStyle" @mousedown.stop>
    <div class="modal_header">
      <div class="header_content">{{ title }}</div>
    </div>
    <div class="modal_body">
      <slot name="body"></slot>
    </div>
    <div class="modal_footer">
      <XPEButton type="text" @click.native="cancel">{{ cancelText }}</XPEButton>
      <XPEButton type="primary" @click.native="ok">{{ okText }}</XPEButton>
    </div>
  </div>
</template>

<script>
// FIXME 【暂弃】改用iview提供的UI组件
import XPEButton from './Button.vue'

export default {
  name: 'XPEModal',
  components: {
    XPEButton
  },
  props: {
    title: {
      type: String,
      default: '提示'
    },
    okText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    width: {
      type: Number,
      default: 500
    }
  },
  computed: {
    computedStyle: function () {
      let _t = this
      return {
        width: _t.width + 'px',
        'margin-left': '-' + Math.ceil(_t.width / 2) + 'px'
      }
    }
  },
  methods: {
    ok: function () {
      this.$emit('on-ok')
    },
    cancel: function () {
      this.$emit('on-cancel')
    }
  }
}
</script>
