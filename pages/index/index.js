
var cl = getApp().globaldata.bkgcolor;
var im = getApp().globaldata.bkgimage;
Page({
    data:{
      country:"...定位中",
      city:"...定位中",
      hour:8,
      motto : ["不自由毋宁死","今日事今日毕",""]
     
    },
    onShow() {
      var hournow = new Date().getHours();
         this.setData({
        cl: getApp().globaldata.bkgcolor,
        im: getApp().globaldata.bkgimage,
        hour:hournow
      })

        /*
        每个页面的tab栏实例是不一样的
        在切换到的页面里还需要设置那个页面的tab实例的选中项目。
        */
       const that = this;
       wx.request(
        {
            url:"http://ip-api.com/json/?lang=zh-CN",
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
  },

  getmotto(){




  }

)
