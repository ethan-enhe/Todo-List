// pages/tasklist/index.js
var utils = require('../../utils/util.js')
var app = getApp();
Page({

    task: class {
        constructor(desc, duration, importance, start_time, due_time, complete) {
            this.desc = desc; //任务名称
            this.duration = duration; //任务持续时间，单位分钟，Number类型
            this.importance = importance; //任务重要性，重要为1，否则为0
            this.start_time = start_time; //如果已经确定，则为一个Date对象，否则为null
            this.due_time = due_time; //任务截止时间，果已经确定，则为一个Date对象，否则为null
            this.id = Math.ceil(Math.random() * 1145141919); //任务分配的id，直接随机值，冲突概率很小
            this.complete = complete;
        }
    },

    data: {
        tasklist: [],
        dateactive: [],
        importanceshow:0,
        importancetoast:["只显示重要事件","所有事件均显示"],
        /**时间组件 */
        dateList: [], // 日历数据数组
        swiperCurrent: 0, // 日历轮播正处在哪个索引位置
        dateCurrent: new Date(), // 正选择的当前日期
        dateCurrentStr: '', // 正选择日期的 id
        dateMonth: '...加载中', // 正显示的月份
        dateListArray: ['日', '一', '二', '三', '四', '五', '六'],
        hashmap: {},
        cnttask: new Map(),
        showvis: true,
        importance:false 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // this.loading();
        this.initDate(); // 日历组件程序
        //app.tasklist.load_tasks();
        this.load_data();
        this.setData({
            dateCurrentStr: this.parse_date(new Date())
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */


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
    importance_reminder(){
        
        wx.showToast({
            title:this.data.importancetoast[this.data.importanceshow],
            icon: 'success',
            duration: 2000
          })
          this.data.importanceshow ^= 1;
          this.setData({importanceshow:this.data.importanceshow});


    },
    /**时间选择组件 */
    initDate() {

        var d = new Date();
        var month = utils.addZero(d.getMonth() + 1),
            day = utils.addZero(d.getDate());
        for (var i = 0; i <= 20; i++) {
            this.updateDate(utils.DateAddDay(d, i * 7)); //多少天之后的
        }
        this.setData({
            swiperCurrent: 0,
            dateCurrent: d,
            dateCurrentStr: d.getFullYear() + '-' + month + '-' + day,
            dateMonth: (d.getMonth() + 1) + '月',
        });
    },
    // 获取这周从周日到周六的日期
    calculateDate(_date) {
        var first = utils.FirstDayInThisWeek(_date);
        var d = {
            'month': first.getMonth() + 1,
            'days': [],
        };
        for (var i = 0; i < 7; i++) {
            var dd = utils.DateAddDay(first, i);
            var day = utils.addZero(dd.getDate()),
                month = utils.addZero(dd.getMonth() + 1);
            d.days.push({
                'day': day,
                'id': dd.getFullYear() + '-' + month + '-' + day,
                'active': false
            });
        }
        return d;
    },
    add() {
        wx.navigateTo({
            url: '../input/index?id=-1',
        })
    },

    modify(e) {
        // app.taskid = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../input/index?id=' + e.currentTarget.dataset.id,
        })

    },

    // 更新日期数组数据
    updateDate(_date, atBefore) {
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
    dateSwiperChange(e) {
        var index = e.detail.current;
        var d = this.data.dateList[index];
        this.setData({
            swiperCurrent: index,
            dateMonth: d.month + '月',
        });
    },
    // 获得日期字符串
    getDateStr: function (arg) {
        if (utils.type(arg) == 'array') {
            return arr[0] + '-' + arr[1] + '-' + arr[2] + ' 00:00:00';
        } else if (utils.type(arg) == 'date') {
            return arg.getFullYear() + '-' + (arg.getMonth() + 1) + '-' + arg.getDate() + ' 00:00:00';
        } else if (utils.type(arg) == 'object') {
            return arg.year + '-' + arg.month + '-' + arg.day + ' 00:00:00';
        }
    },
    addleadzero(s) {
        if (s.length === 2) {
            return s
        } else {
            return "0" + s
        }
    },

    parse_date(s) {
        return s.getFullYear().toString() + "-" + this.addleadzero((s.getMonth() + 1).toString()) + "-" + this.addleadzero(s.getDate().toString());
    },



    load_data() {
        var map = {};
        var li = [];
        var task_copy = app.tasklist.get_tasks_copy();
        for (let i = 0; i < task_copy.length; i++) {
            var task = task_copy[i];
            if (task.complete) {
                continue;
            }
            if(task.start_time === null || task.due_time === null)
            {
                continue;
            }
            li.push(this.parse_date(task.start_time))
            if (!Object.keys(map).includes((this.parse_date(task.start_time)))) {

                map[this.parse_date(task.start_time)] = [];
                map[this.parse_date(task.start_time)].push(this.encodetask(task));
            } else {
                if (!map[this.parse_date(task.start_time)].includes(this.encodetask(task))) {
                    map[this.parse_date(task.start_time)].push(this.encodetask(task));
                }
            }
        };
        if (Object.keys(this.data.hashmap).includes(this.data.dateCurrentStr)) {
            let s = this.data.hashmap[this.data.dateCurrentStr];
            let tl = [];
            for (var i = 0; i < s.length; i++) {
                let curtask = this.decodetask(s[i]);
                if(curtask.complete === true){continue;}
                tl.push(this.decodetask(s[i]));
            }
            this.setData({
                tasklist: tl
            });
        } else {
            this.setData({
                tasklist: []
            });
        }
        var cnttsk = {};
        var l = map;
        for (var k = 0; k < Object.keys(l).length; k++) {
            cnttsk[Object.keys(l)[k]] = l[Object.keys(l)[k]].length;
        }
        this.setData({
            cnttask: cnttsk
        })
        this.setData({
            hashmap: map
        });
        this.setData({
            dateactive: li
        });
       
    },
    init_task() {

    },
    complete:function(e){
        let did = e.currentTarget.dataset.id;
        let taslistpos = app.tasklist.get_pos(did);
        app.tasklist.get_tasks()[taslistpos].complete = true;
        this.load_data();
        this.load_data();
    }
,
    long_press: function (e) {
       
        let did = e.currentTarget.dataset.id;
        wx.showModal({
            title: '确定删除吗',
            content: '',
            complete: (res) => {
                if (res.cancel) {}
                if (res.confirm) {
                    app.tasklist.delete_task(did);
                    this.load_data();
                    let arr = this.data.tasklist;
                    arr.map((val, i) => {
                        if (val.id === did) {
                            arr.splice(i, 1);
                        }
                    });
                    this.setData({
                        tasklist: arr
                    });
                }
            }
        })
    },

    encodetask(s) {
        return encodeURIComponent(JSON.stringify(s))

    },

    decodetask(s) {
        return JSON.parse(decodeURIComponent(s))
    },
    // 点击日历某日
    chooseDate(e) {

        var str = e.currentTarget.dataset.id;
        this.setData({
            dateCurrentStr: str
        });

        if (Object.keys(this.data.hashmap).includes(this.data.dateCurrentStr)) {
            let s = this.data.hashmap[this.data.dateCurrentStr];
            let tl = [];
            for (var i = 0; i < s.length; i++) {
                tl.push(this.decodetask(s[i]));
            }
            this.setData({
                tasklist: tl
            });
        } else {
            this.setData({
                tasklist: []
            });
        }
    },
    hide() {
        this.setData({
            showvis: !this.data.showvis
        });
    },
    onShow() {
        const that = this;
        wx.onAppRoute(function (res) {
            that.load_data();
            that.setData({
                tasklist: that.data.tasklist
            });
            that.load_data();
        })
        that.setData({
            cl: getApp().globaldata.bkgcolor,
            im: getApp().globaldata.bkgimage,
        })


        //每个页面的tab栏实例是不一样的
        //在切换到的页面里还需要设置那个页面的tab实例的选中项目。
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            })
        }
    },
     // ListTouch触摸开始
     ListTouchStart(e) {
        this.setData({
          ListTouchStart: e.touches[0].pageX
        })
      },
    
      // ListTouch计算方向
      ListTouchMove(e) {
        this.setData({
          ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
        })
      },
    
      // ListTouch计算滚动
      ListTouchEnd(e) {
        if (this.data.ListTouchDirection =='left'){
          this.setData({
            modalName: e.currentTarget.dataset.target
          })
        } else {
          this.setData({
            modalName: null
          })
        }
        this.setData({
          ListTouchDirection: null
        })
      },


})



/*加上有bug，不加tabbar有问题
Component({
  pageLifetimes: {
    show() {
        //每个页面的tab栏实例是不一样的
        //在切换到的页面里还需要设置那个页面的tab实例的选中项目。
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})
*/