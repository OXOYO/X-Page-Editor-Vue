/**
* Created by OXOYO on 2018/3/29.
*
* 按钮组件 【暂弃】
*/

<style scoped lang="less" rel="stylesheet/less">
  .xpe_button {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 6px 15px;
    font-size: 12px;
    border-radius: 4px;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
    color: #495060;
    background-color: #f7f7f7;
    border-color: #dddee1;

    &:hover {
      color: #57a3f3;
      background-color: #fff;
      border-color: #57a3f3;
    }

    &.xpe-btn-primary {
      color: #fff;
      background-color: #2d8cf0;
      border-color: #2d8cf0;

      &:hover {
        color: #fff;
        background-color: #57a3f3;
        border-color: #57a3f3;
      }
    }
    &.xpe-btn-ghost {
      color: #495060;
      background-color: transparent;
      border-color: #dddee1;

      &:hover {
        color: #57a3f3;
        background-color: transparent;
        border-color: #57a3f3;
      }
    }
    &.xpe-btn-dashed {
      color: #495060;
      background-color: transparent;
      border-color: #dddee1;
      border-style: dashed;

      &:hover {
        color: #57a3f3;
        background-color: transparent;
        border-color: #57a3f3;
      }
    }
    &.xpe-btn-text {
      color: #495060;
      background-color: transparent;
      border-color: transparent;

      &:hover {
        color: #57a3f3;
        background-color: transparent;
        border-color: transparent;
      }
    }
    &.xpe-btn-info {
      color: #fff;
      background-color: #2db7f5;
      border-color: #2db7f5;

      &:hover {
        color: #fff;
        background-color: #57c5f7;
        border-color: #57c5f7;
      }
    }
    &.xpe-btn-success {
      color: #fff;
      background-color: #19be6b;
      border-color: #19be6b;

      &:hover {
        color: #fff;
        background-color: #47cb89;
        border-color: #47cb89;
      }
    }
    &.xpe-btn-warning {
      color: #fff;
      background-color: #f90;
      border-color: #f90;

      &:hover {
        color: #fff;
        background-color: #ffad33;
        border-color: #ffad33;
      }
    }
    &.xpe-btn-error {
      color: #fff;
      background-color: #ed3f14;
      border-color: #ed3f14;

      &:hover {
        color: #fff;
        background-color: #f16543;
        border-color: #f16543;
      }
    }
  }
</style>

<template>
  <button type="button" :class="className">
    <slot></slot>
  </button>
</template>

<script>
// FIXME 【暂弃】改用iview提供的UI组件
export default {
  name: 'XPEButton',
  props: {
    type: {
      type: String,
      validator (value) {
        return ['default', 'primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error'].includes(value)
      },
      default: 'default'
    }
  },
  data () {
    return {
      prefix: 'xpe-btn',
      defClass: 'xpe_button'
    }
  },
  computed: {
    className: function () {
      let _t = this
      let typeClass = ''
      if (_t.type && _t.type !== 'default') {
        typeClass = [_t.prefix, _t.type].join('-')
      }
      return [_t.defClass, typeClass]
    }
  }
}
</script>
