// 定义左侧导航

const list = {
  components: [
    {
      type: 'Basic',
      title: '基础',
      children: [
        // {
        //   title: 'XPageEditor',
        //   name: 'XPageEditor',
        //   icon: 'edit'
        // },
        {
          title: 'Grid 栅格 Row',
          name: 'Row',
          icon: 'ios-grid-view-outline'
        },
        {
          title: 'Grid 栅格 Col',
          name: 'Col',
          icon: 'ios-grid-view-outline'
        },
        {
          title: 'Button 按钮',
          name: 'Button',
          icon: 'social-youtube-outline'
        },
        {
          title: 'Icon 图标',
          name: 'Icon',
          icon: 'ios-heart-outline'
        }
      ]
    },
    {
      type: 'Form',
      title: '表单',
      children: [
        {
          title: 'Input 输入框',
          name: 'Input',
          icon: 'ios-compose-outline'
        },
        {
          title: 'Radio 单选框',
          name: 'Radio',
          icon: 'ios-circle-filled'
        },
        {
          title: 'RadioGroup 单选框组',
          name: 'RadioGroup',
          icon: 'ios-circle-filled'
        },
        {
          title: 'Checkbox 多选框',
          name: 'Checkbox',
          icon: 'android-checkbox-outline'
        },
        {
          title: 'CheckboxGroup 多选框组',
          name: 'CheckboxGroup',
          icon: 'android-checkbox-outline'
        },
        {
          title: 'Switch 开关',
          name: 'Switch',
          icon: 'toggle'
        },
        {
          title: 'Table 表格',
          name: 'Table',
          icon: 'ios-grid-view'
        },
        {
          title: 'Select 选择器',
          name: 'Select',
          icon: 'ios-arrow-down'
        },
        {
          title: 'Option 选择器选项',
          name: 'Option',
          icon: 'ios-arrow-down'
        },
        {
          title: 'AutoComplete 自动完成',
          name: 'AutoComplete',
          icon: 'ios-list-outline'
        },
        {
          title: 'Slider 滑块',
          name: 'Slider',
          icon: 'minus-round'
        },
        {
          title: 'DatePicker 日期选择器',
          name: 'DatePicker',
          icon: 'ios-calendar-outline'
        },
        {
          title: 'TimePicker 时间选择器',
          name: 'TimePicker',
          icon: 'ios-clock-outline'
        },
        {
          title: 'Cascader 级联选择',
          name: 'Cascader',
          icon: 'ios-more-outline'
        },
        {
          title: 'Transfer 穿梭框',
          name: 'Transfer',
          icon: 'ios-pause-outline'
        },
        {
          title: 'InputNumber 数字输入框',
          name: 'InputNumber',
          icon: 'ios-calculator'
        },
        {
          title: 'Rate 评分',
          name: 'Rate',
          icon: 'ios-star'
        },
        {
          title: 'Upload 上传',
          name: 'Upload',
          icon: 'ios-cloud-upload-outline'
        },
        {
          title: 'ColorPicker 颜色选择器',
          name: 'ColorPicker',
          icon: 'android-color-palette'
        },
        {
          title: 'Form 表单',
          name: 'Form',
          icon: 'ios-list-outline'
        },
        {
          title: 'FormItem 表单域',
          name: 'FormItem',
          icon: 'ios-list-outline'
        }
      ]
    },
    {
      type: 'View',
      title: '视图',
      children: [
        {
          title: 'Alert 警告提示',
          name: 'Alert',
          icon: 'alert'
        },
        {
          title: 'Card 卡片',
          name: 'Card',
          icon: 'ios-browsers-outline'
        },
        {
          title: 'Message 全局提示',
          name: 'Message',
          icon: 'ios-information-outline'
        },
        {
          title: 'Notice 通知提醒',
          name: 'Notice',
          icon: 'ios-bell-outline'
        },
        {
          title: 'Modal 对话框',
          name: 'Modal',
          icon: 'ios-chatbubble-outline'
        },
        {
          title: 'Progress 进度条',
          name: 'Progress',
          icon: 'android-remove'
        },
        {
          title: 'Avatar 头像',
          name: 'Avatar',
          icon: 'person'
        },
        {
          title: 'Badge 徽标数',
          name: 'Badge',
          icon: 'email-unread'
        },
        {
          title: 'Collapse 折叠面板',
          name: 'Collapse',
          icon: 'ios-albums-outline'
        },
        {
          title: 'Panel 面板',
          name: 'Panel',
          icon: 'ios-albums-outline'
        },
        {
          title: 'Timeline 时间轴',
          name: 'Timeline',
          icon: 'android-more-vertical'
        },
        {
          title: 'TimelineItem 时间轴项',
          name: 'TimelineItem',
          icon: 'android-more-vertical'
        },
        {
          title: 'Tag 标签',
          name: 'Tag',
          icon: 'ios-pricetags-outline'
        },
        {
          title: 'Tooltip 文字提示',
          name: 'Tooltip',
          icon: 'chatbox-working'
        },
        {
          title: 'Poptip 气泡提示',
          name: 'Poptip',
          icon: 'chatbubble-working'
        },
        {
          title: 'Carousel 走马灯',
          name: 'Carousel',
          icon: 'ios-film-outline'
        },
        {
          title: 'Tree 树形控件',
          name: 'Tree',
          icon: 'network'
        }
      ]
    },
    {
      type: 'Navigation',
      title: '导航',
      children: [
        {
          title: 'Menu 导航菜单',
          name: 'Menu',
          icon: 'navicon-round'
        },
        {
          title: 'Submenu 子菜单',
          name: 'Submenu',
          icon: 'navicon-round'
        },
        {
          title: 'Tabs 标签页',
          name: 'Tabs',
          icon: 'social-windows-outline'
        },
        {
          title: 'Tabs 标签页面板',
          name: 'TabPane',
          icon: 'social-windows-outline'
        },
        {
          title: 'Dropdown 下拉菜单',
          name: 'Dropdown',
          icon: 'arrow-down-b'
        },
        {
          title: 'DropdownMenu 下拉菜单容器',
          name: 'DropdownMenu',
          icon: 'arrow-down-b'
        },
        {
          title: 'DropdownItem 下拉菜单项',
          name: 'DropdownItem',
          icon: 'arrow-down-b'
        },
        {
          title: 'Page 分页',
          name: 'Page',
          icon: 'ios-book-outline'
        },
        {
          title: 'Breadcrumb 面包屑',
          name: 'Breadcrumb',
          icon: 'ios-arrow-right'
        },
        {
          title: 'BreadcrumbItem 面包屑项',
          name: 'BreadcrumbItem',
          icon: 'ios-arrow-right'
        },
        {
          title: 'Steps 步骤条',
          name: 'Steps',
          icon: 'ios-checkmark-outline'
        },
        {
          title: 'Step 步骤条项',
          name: 'Step',
          icon: 'ios-checkmark-outline'
        },
        {
          title: 'LoadingBar 加载进度条',
          name: 'LoadingBar',
          icon: 'ios-minus-empty'
        }
      ]
    },
    {
      type: 'Chart',
      title: '图表',
      children: [
        {
          title: 'Circle 进度环',
          name: 'Circle',
          icon: 'ios-circle-outline'
        }
      ]
    },
    {
      type: 'Other',
      title: '其它',
      children: [
        {
          title: 'Affix 图钉',
          name: 'Affix',
          icon: 'pin'
        },
        {
          title: 'BackTop 返回顶部',
          name: 'BackTop',
          icon: 'ios-arrow-up'
        },
        {
          title: 'Spin 加载中',
          name: 'Spin',
          icon: 'load-d'
        },
        {
          title: 'Scroll 无限滚动',
          name: 'Scroll',
          icon: 'ios-more'
        }
      ]
    }
  ]
}

export default list
