const { FirstDayInThisWeek } = require("../../utils/util");

var cl = getApp().globaldata.bkgcolor;
var im = getApp().globaldata.bkgimage;
var _app = getApp();
var trienode = class{
  /**The component of a trie leaf */
   constructor(){
        this.map = new Map();
        this.end = false;
        this.id = [];
        
   }
   getneighbor(){
        return this.map;
   }
};
Page({
    data:{
      country:"...定位中",
      city:"...定位中",
      hour:8,
      motto : ["不自由毋宁死","今日事今日毕","内卷是社会的毒瘤，我们要坚决反对"],
      curstr:"",
      openid:"",
      display:[],
      content:""
   
     
    },
   
    trie :class{
      constructor(){
            this.root = new trienode();
      }
      insert(desc,task_id){
        let cur = this.root;
        for (let i=0;i<desc.length;i++){
            var curchar = desc[i];
            if(cur.map[curchar]!=null){
              cur = cur.map[curchar];
              cur.id.push(task_id);
            }
            else{
              cur.map[curchar] = new trienode();
              cur = cur.map[curchar];
              cur.id.push(task_id);
            }
        }
      }
      search(str){
           let cur  = this.root;
           for(let i=0;i<str.length;i++){
                if(cur == null){
                  return [];
                }
                else{
                  cur = cur.map[str[i]];
                }
           }
           return cur.id;
      }
    },
    
    onShow() {
      this.getmotto();
      this.count_complete_();
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
    },
    getmotto(){
      var  len = this.data.motto.length;
      var idx = this.randomNum(-1,len-1);
      this.setData({curstr:this.data.motto[idx]})
    },
    permission(e){
        wx.requestSubscribeMessage({
          tmplIds: ['EbuL48StwQeStSF4EYlVd9AMJccDEbIiu7UHQF_VWTc'], //这里填入我们生成的模板id
          success(res) {
            console.log('授权成功', res)
          },
          fail(res) {
            console.log('授权失败', res)
          }
        })
        this.getopenid();
    
    },
    

    getopenid(){
      wx.cloud.callFunction({
        name: "getopenid"
      }).then(res => {
        let openid = res.result.openid
        this.setData({"openid":openid});
        
      }).catch(res => {
        console.log("获取openid失败", res)
        this.getopenid();
      })
    },
    sendmessage(e){
      this.getopenid();
      wx.cloud.callFunction({name:"sendmsg"}).then(res=>{
        console.log(res);
      }).catch(res=>{console.log("发送失败",res)});
      },
      randomNum(minNum,maxNum){ 
      switch(arguments.length){ 
          case 1: 
              return parseInt(Math.random()*minNum+1,10); 
          break; 
          case 2: 
              return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
          break; 
              default: 
                  return 0; 
              break; 
      } 
  },
  
   count_complete_(){
        var copy =  _app.tasklist.get_tasks_copy();
        let cmp = 0;let tocmp = 0;
        for(var i=0;i<copy.length;i++){
              if(copy[i].complete){cmp++;}
              else{tocmp ++;}
        }
        this.setData({cmp:cmp,tocmp:tocmp});
   },
   search_func(){
     this.setData({display:[]})
     console.log(this.data.content);
     var t = new this.trie();
     var copy =  _app.tasklist.get_tasks_copy();
     for(let i=0;i<copy.length;i++){
          t.insert(copy[i].desc,i);
          console.log(t.root.map);
     }
     const res = t.search(this.data.content);
     
     let dis= [];
     for(let i=0;i<res.length;i++){
              dis.push(copy[i].desc);
     }
     console.log(dis);
     this.setData({display:dis});
      

   }
  
  
  
  }


  

)
