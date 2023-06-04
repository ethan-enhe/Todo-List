// pages/timeline/index.js
var utils = require('../../utils/util.js')
var app = getApp();
var cl = getApp().globaldata.bkgcolor;
var im = getApp().globaldata.bkgimage;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cl,
        im,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        this.setData({
            cl: getApp().globaldata.bkgcolor,
            im: getApp().globaldata.bkgimage,
        })
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            })
        }

        var taskdata = app.tasklist.get_tasks_copy()
        var sz = taskdata.length;
        // console.log(sz);
        for (var i = 0; i < sz; i++) {
            taskdata[i].ddl = false;
            if(taskdata[i].due_time!=null && !taskdata[i].complete)
            taskdata.push({
                ddl: true,
                desc: taskdata[i].desc,
                start_time: taskdata[i].due_time
            });
        }
        taskdata.sort(function (a, b) {
            return Date.parse(a.start_time) - Date.parse(b.start_time);
        });

        var showdata = new Array();
        var lastmonth = {};
        for (var i = 0; i < taskdata.length; i++) {
            // taskdata[i].desc+= (new Date(taskdata[i].start_time)).getFullYear();
            var time = new Date(taskdata[i].start_time);
            var tmp = utils.getYearMonth(time);
            taskdata[i].day = time.getDate();
            if (tmp != lastmonth.year_month) {
                if (i) showdata.push(lastmonth);
                lastmonth = {
                    year_month: tmp,
                    taskdata: [taskdata[i]]
                };
            } else lastmonth.taskdata.push(taskdata[i]);
        }
        if (lastmonth != {}) showdata.push(lastmonth);
        this.setData({
            showdata: showdata
        })


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

    }
})