Page({
    
    onload(){
      
    },
    data:{

      ip:'1.1.1.1'
    }
     ,
    onShow() {
        /*
        每个页面的tab栏实例是不一样的
        在切换到的页面里还需要设置那个页面的tab实例的选中项目。
        */
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      };
      const that = this;

      wx.request({
        url : "https://api64.ipify.org/?format=json",
        success:function(e){
          console.log(e.data.ip);
          that.setData({ip:e.data.ip});
          console.log(that.data.ip);
        },

   })
    }
  }
)
