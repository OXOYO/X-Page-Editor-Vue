/**
* Created by OXOYO on 2018/4/3.
*
* 自定义列表元素组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .navigate{
    font-size: 14px;

    .menu-block {
      width: 100% !important;
      text-align: left;

      &:after {
        display: none;
      }
    }

    &-group{
      font-size: 16px;
      margin: 8px 0;
      padding-left: 15px;
    }
    .ivu-menu{
      &-item{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 34px;
      }
      span.navigate-group-span{
        font-size: 12px;
        color: #80848f;
        padding-left: 2px;
      }
      &-item-selected{
        span.navigate-group-span{
          color: #2d8cf0;
        }
      }
    }
  }
</style>

<template>
  <div class="navigate">
    <Menu class="menu-block">
      <Menu-group v-for="item in navigate.components" :key="item.type" :title="item.type">
        <!-- TODO 拖拽事件 -->
        <Menu-item
          v-for="component in item.list"
          :key="component.path"
          :name="component.path"
          draggable="true"
          @dragstart="handleDragStart"
          @mousedown.stop.prevent="() => false"
          @click.stop.prevent
        >
          <i class="ivu-icon" :class="'ivu-icon-' + component.icon"></i>
          <template v-if="lang === 'zh-CN'">
            {{ component.title.split(' ')[0] }}
            <span class="navigate-group-span">{{ component.title.split(' ')[1] }}</span>
          </template>
          <template v-else>{{ component.title.split(' ')[0] }}</template>
        </Menu-item>
      </Menu-group>
    </Menu>
  </div>
</template>

<script>
  import navigate from '../resources/config/navigate'

  export default {
    name: 'CustomListItem',
    data () {
      return {
        navigate,
        lang: this.$lang
      }
    },
    methods: {
      handleDragStart: function () {
        console.log('handleDragStart')
      }
    }
  }
</script>
