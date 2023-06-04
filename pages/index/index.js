Page({
    data:{
      country:"China",
      city:"Beijing",
  
    },
    onShow() {
        /*
        每个页面的tab栏实例是不一样的
        在切换到的页面里还需要设置那个页面的tab实例的选中项目。
        */
       const that = this;
       wx.request(
        {
            url:"http://ip-api.com/json",
            success(e){
                that.setData({city:e.data.city});
                that.setData({country:e.data.country})
             }
          }

       )
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
)
