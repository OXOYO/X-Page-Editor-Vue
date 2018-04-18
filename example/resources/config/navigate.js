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
          icon: 'ios-grid-view-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Grid 栅格 Col',
          name: 'Col',
          icon: 'ios-grid-view-outline',
          nest: {
            enable: true,
            parent: {
              allow: ['Row'],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Button 按钮',
          name: 'Button',
          icon: 'social-youtube-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Icon 图标',
          name: 'Icon',
          icon: 'ios-heart-outline',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
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
          icon: 'ios-compose-outline',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Radio 单选框',
          name: 'Radio',
          icon: 'ios-circle-filled',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'RadioGroup 单选框组',
          name: 'RadioGroup',
          icon: 'ios-circle-filled',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: ['Radio'],
              deny: []
            }
          }
        },
        {
          title: 'Checkbox 多选框',
          name: 'Checkbox',
          icon: 'android-checkbox-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'CheckboxGroup 多选框组',
          name: 'CheckboxGroup',
          icon: 'android-checkbox-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: ['Checkbox'],
              deny: []
            }
          }
        },
        {
          title: 'Switch 开关',
          name: 'Switch',
          icon: 'toggle',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Table 表格',
          name: 'Table',
          icon: 'ios-grid-view',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Select 选择器',
          name: 'Select',
          icon: 'ios-arrow-down',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: ['Option', 'OptionGroup'],
              deny: []
            }
          }
        },
        {
          title: 'Option 选择器选项',
          name: 'Option',
          icon: 'ios-arrow-down',
          nest: {
            enable: false,
            parent: {
              allow: ['Select', 'OptionGroup'],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'OptionGroup 选择器选项组',
          name: 'OptionGroup',
          icon: 'ios-arrow-down',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: ['Option'],
              deny: []
            }
          }
        },
        {
          title: 'AutoComplete 自动完成',
          name: 'AutoComplete',
          icon: 'ios-list-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Slider 滑块',
          name: 'Slider',
          icon: 'minus-round',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'DatePicker 日期选择器',
          name: 'DatePicker',
          icon: 'ios-calendar-outline',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'TimePicker 时间选择器',
          name: 'TimePicker',
          icon: 'ios-clock-outline',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Cascader 级联选择',
          name: 'Cascader',
          icon: 'ios-more-outline',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Transfer 穿梭框',
          name: 'Transfer',
          icon: 'ios-pause-outline',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'InputNumber 数字输入框',
          name: 'InputNumber',
          icon: 'ios-calculator',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Rate 评分',
          name: 'Rate',
          icon: 'ios-star',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Upload 上传',
          name: 'Upload',
          icon: 'ios-cloud-upload-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'ColorPicker 颜色选择器',
          name: 'ColorPicker',
          icon: 'android-color-palette',
          nest: {
            enable: false,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Form 表单',
          name: 'Form',
          icon: 'ios-list-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'FormItem 表单域',
          name: 'FormItem',
          icon: 'ios-list-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
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
          icon: 'alert',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Card 卡片',
          name: 'Card',
          icon: 'ios-browsers-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Message 全局提示',
          name: 'Message',
          icon: 'ios-information-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Notice 通知提醒',
          name: 'Notice',
          icon: 'ios-bell-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Modal 对话框',
          name: 'Modal',
          icon: 'ios-chatbubble-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Progress 进度条',
          name: 'Progress',
          icon: 'android-remove',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Avatar 头像',
          name: 'Avatar',
          icon: 'person',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Badge 徽标数',
          name: 'Badge',
          icon: 'email-unread',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Collapse 折叠面板',
          name: 'Collapse',
          icon: 'ios-albums-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Panel 面板',
          name: 'Panel',
          icon: 'ios-albums-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Timeline 时间轴',
          name: 'Timeline',
          icon: 'android-more-vertical',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'TimelineItem 时间轴项',
          name: 'TimelineItem',
          icon: 'android-more-vertical',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Tag 标签',
          name: 'Tag',
          icon: 'ios-pricetags-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Tooltip 文字提示',
          name: 'Tooltip',
          icon: 'chatbox-working',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Poptip 气泡提示',
          name: 'Poptip',
          icon: 'chatbubble-working',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Carousel 走马灯',
          name: 'Carousel',
          icon: 'ios-film-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Tree 树形控件',
          name: 'Tree',
          icon: 'network',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
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
          icon: 'navicon-round',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Submenu 子菜单',
          name: 'Submenu',
          icon: 'navicon-round',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Tabs 标签页',
          name: 'Tabs',
          icon: 'social-windows-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Tabs 标签页面板',
          name: 'TabPane',
          icon: 'social-windows-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Dropdown 下拉菜单',
          name: 'Dropdown',
          icon: 'arrow-down-b',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'DropdownMenu 下拉菜单容器',
          name: 'DropdownMenu',
          icon: 'arrow-down-b',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'DropdownItem 下拉菜单项',
          name: 'DropdownItem',
          icon: 'arrow-down-b',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Page 分页',
          name: 'Page',
          icon: 'ios-book-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Breadcrumb 面包屑',
          name: 'Breadcrumb',
          icon: 'ios-arrow-right',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'BreadcrumbItem 面包屑项',
          name: 'BreadcrumbItem',
          icon: 'ios-arrow-right',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Steps 步骤条',
          name: 'Steps',
          icon: 'ios-checkmark-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Step 步骤条项',
          name: 'Step',
          icon: 'ios-checkmark-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'LoadingBar 加载进度条',
          name: 'LoadingBar',
          icon: 'ios-minus-empty',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
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
          icon: 'ios-circle-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
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
          icon: 'pin',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'BackTop 返回顶部',
          name: 'BackTop',
          icon: 'ios-arrow-up',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Spin 加载中',
          name: 'Spin',
          icon: 'load-d',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        },
        {
          title: 'Scroll 无限滚动',
          name: 'Scroll',
          icon: 'ios-more',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        }
      ]
    }
  ]
}

export default list
