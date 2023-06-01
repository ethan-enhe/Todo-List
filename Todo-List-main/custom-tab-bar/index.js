Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/image/index.svg",
      selectedIconPath: "/image/index.svg",
      text: "主页"
    },
    {
      pagePath: "/pages/timeline/index",
      iconPath: "/image/timeline.svg",
      selectedIconPath: "/image/timeline.svg",
      text: "时间轴"
    }, 
     {
      pagePath: "/pages/tasklist/index",
      iconPath: "/image/tasklist.svg",
      selectedIconPath: "/image/tasklist.svg",
      text: "任务列表"
    },
    {
      pagePath: "/pages/settings/index",
      iconPath: "/image/settings.svg",
      selectedIconPath: "/image/settings.svg",
      text: "设置"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
        /*
        每个页面的tab栏实例是不一样的，这里只设置了当前页面的tab栏实例的选中项目。
        在切换到的页面里还需要设置那个页面的tab实例的选中项目。
        */
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})