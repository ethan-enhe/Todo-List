// pages/tasklist/index.js
export class task{
  constructor(name,id,expired = false,begin_date = none,due_date = none){
       this.name = name;
       this.id = id;
       this.expired = expired;
       this.due_date = due_date;
       this.begin_date = begin_date;
  }
}
var utils = require('../../utils/util.js')
Page({
  current_sort:0,
  sort_banner:"按时间排序",
  /**default sort by time :0  by priority:1*/
  data:{
    tasklist:[
       {
          name:"睡覺",
          start_time:"一萬年以後",
          due_time:"十萬年以後",
          id:0

       },
       {
          name:"写作业",
          start_time:"一萬年以後",
          due_time:"十萬年以後",
          id:1
       }


    ]
    ,
    /**临时数据，演示用 */


    /**时间组件 */
    dateList: [],   // 日历数据数组
    swiperCurrent: 0, // 日历轮播正处在哪个索引位置
    dateCurrent: new Date(),  // 正选择的当前日期
    dateCurrentStr: '', // 正选择日期的 id
    dateMonth: '3月',  // 正显示的月份
    dateListArray: ['日','一','二','三','四','五','六'],

 },
    
 
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      var that = this;
      // this.loading();
      this.initDate(); // 日历组件程序
      this.sort_by_time();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

      /**
     * 页面的初始数据
     */
 
     
         
    show(){
        /*
        每个页面的tab栏实例是不一样的
        在切换到的页面里还需要设置那个页面的tab实例的选中项目。
        */
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    },
    
  
   /**时间选择组件 */ 
  initDate () {
      var d = new Date();
      var month = utils.addZero(d.getMonth()+1),
          day = utils.addZero(d.getDate());
      for(var i=0; i<=10; i++) {
        this.updateDate(utils.DateAddDay(d, i*7));//多少天之后的
      }
      this.setData({
        swiperCurrent: 5,
        dateCurrent: d,
        dateCurrentStr: d.getFullYear() + '-' + month + '-' + day,
        dateMonth: month + '月',
      });
    },
    // 获取这周从周日到周六的日期
    calculateDate (_date) {
      var first = utils.FirstDayInThisWeek(_date);
      var d = {
        'month': first.getMonth() + 1,
        'days': [],
      };
      for(var i=0; i<7; i++) {
        var dd = utils.DateAddDay(first, i);
        var day = utils.addZero(dd.getDate()),
            month = utils.addZero(dd.getMonth()+1);
        d.days.push({
          'day': day,
          'id': dd.getFullYear()+'-'+month+'-'+day,
        });
      }
      return d;
    },
    // 更新日期数组数据
    updateDate (_date, atBefore) {
      var week = this.calculateDate(_date);
      if (atBefore) {
        this.setData({
          dateList: [week].concat(this.data.dateList),
        });
      } else {
        this.setData({
          dateList: this.data.dateList.concat(week),
        });
      }
    },
    // 日历组件轮播切换
    dateSwiperChange (e) {
      var index = e.detail.current;
      var d = this.data.dateList[index];
      this.setData({
        swiperCurrent: index,
        dateMonth: d.month + '月',
      });
    },
    // 获得日期字符串
    getDateStr: function(arg) {
      if (utils.type(arg) == 'array') {
        return arr[0] + '-' + arr[1] + '-' + arr[2] + ' 00:00:00';
      } else if (utils.type(arg) == 'date') {
        return arg.getFullYear() + '-' + (arg.getMonth()+1) + '-' + arg.getDate() + ' 00:00:00';
      } else if (utils.type(arg) == 'object') {
        return arg.year + '-' + arg.month + '-' + arg.day + ' 00:00:00';
      }
    },
    // 点击日历某日
    chooseDate (e) {
     
      var str = e.currentTarget.dataset.id;
      console.log(e.currentTarget.dataset.id);
      this.setData({dateCurrentStr: str});
    },
  

   save_task_data(){
       /**
        * 将任务数据缓存至本地
        */
   },

   read_task_data(){
      /**  读取本地缓存数据 */

   },
    init_task(){

    },
    long_press:function(e){
        wx.showModal({
          title: '确定删除吗',
          content: '',
          complete: (res) => {
            if (res.cancel) {
            }
            if (res.confirm) {
             let arr = this.data.tasklist;
             arr.map((val,i)=>{
                 if(val.id === e.currentTarget.dataset.id){
                     arr.splice(i,1);
                    }
             });
             this.setData({tasklist:arr});
            }
          }
        })
    },
    sort_by_time(){
      this.setData({"sort_banner":"按时间排序"})
        this.data.tasklist.sort(function(a,b){
          if(a.due_time === b.duetime){return 0;}  
          else if(a.due_time < b.due_time){return 1;}
          else{return 0;}
         } );
    },
    sort_by_prior(){
      this.setData({"sort_banner":"按优先级排序"})
      this.data.tasklist.sort(function(a,b){
        if(a.due_time === b.duetime){return 0;}  
        else if(a.due_time < b.due_time){return 1;}
        else{return 0;}
       } );
    },
    change_sort(){
       this.setData({current_sort:this.data.current_sort ^ 1});
      if(this.data.current_sort === 1){
        this.sort_by_prior();
      }
      else{
        this.sort_by_time();
      }

    }
    



  }
)
