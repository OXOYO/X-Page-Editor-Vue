/**
 * Created by OXOYO on 2018/3/21.
 *
 * 插件默认配置信息
 */

export default {
  // 自定义编辑器内相关UI
  UI: {
    // 编辑器功能：表单元素列表
    list: {
      // 是否启用该功能，true: 启用 false: 不启用
      enable: true,
      // 自定义该功能组件路径，空 或 false 则使用插件默认组件
      component: './components/list.vue',
      // 该功能数据源
      data: [],
      // 初始化数据
      initData: []
    },
    // 编辑器画板
    board: {
      // 是否启用该功能，true: 启用 false: 不启用
      enable: true,
      // 自定义该功能组件路径，空 或 false 则使用插件默认组件
      component: './components/board.vue',
      // 该功能数据源
      data: [],
      // 初始化数据
      initData: []
    },
    // 表单元素配置组件
    options: {
      // 是否启用该功能，true: 启用 false: 不启用
      enable: true,
      // 自定义该功能组件路径，空 或 false 则使用插件默认组件
      component: './components/options.vue',
      // 该功能数据源
      data: [],
      // 初始化数据
      initData: []
    }
  },
  // 导出
  output: {
    // 钩子函数
    before: () => {},
    after: () => {}
  }
}
