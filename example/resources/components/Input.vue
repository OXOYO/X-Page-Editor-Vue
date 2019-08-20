/**
* Created by OXOYO on 2018/3/26.
*
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-ui-input {
    display: inline-block;
    width: 100%;
    height: 25px;
    line-height: 25px;

    .x-ui-prepend {
      display: inline-block;
    }
    input {
      display: inline-block;
      border: 1px solid red;
    }
    .x-ui-append {
      display: inline-block;
    }
  }
</style>

<template>
  <div class="x-ui-input">
    <slot class="x-ui-prepend" name="prepend"></slot>
    <input :type="type" :placeholder="placeholder">
    <slot class="x-ui-append" name="append"></slot>
  </div>
</template>

<script>
  export default {
    name: 'CustomInput',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: ''
      }
    }
  }
</script>

