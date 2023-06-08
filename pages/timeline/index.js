// pages/timeline/index.js
var utils = require('../../utils/util.js')
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        tabNav: ['事件总览', '重要事务', '其他']
    },

    tabSelect(e) {
        console.log(e);
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
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

        this.edit_task = null;
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
            if (taskdata[i].due_time != null && !taskdata[i].complete) {
                var due = utils.deepcopy(taskdata[i]);
                due.ddl = true, due.start_time = taskdata[i].due_time;
                taskdata.push(due);
            }
        }
        taskdata.sort(function (a, b) {
            return utils.cmp_date(b.start_time, a.start_time);
        });
        console.log(taskdata);


        //全部信息
        var showdata = new Array();
        var lastmonth = {};
        for (var i = 0; i < taskdata.length; i++) {
            var time = taskdata[i].start_time;
            var tmp = utils.getYearMonth(time);
            taskdata[i].day = time == null ? "Nan" : time.getDate();
            if (tmp != lastmonth.year_month) {
                if (lastmonth.year_month) showdata.push(lastmonth);
                lastmonth = {
                    year_month: tmp,
                    taskdata: [taskdata[i]]
                };
            } else lastmonth.taskdata.push(taskdata[i]);
        }
        if (lastmonth.year_month) showdata.push(lastmonth);

        var cur_year_month = utils.getYearMonth(new Date());
        for (var i = 0; i < showdata.length; i++)
            if (i + 1 == showdata.length || showdata[i].year_month >= cur_year_month) {
                showdata[i].current = true;
                break;
            }
        if (showdata.length > 0)
            showdata[showdata.length - 1].unknown = true;


        var showdataimp = new Array();
        var lastmonth = {};
        for (var i = 0; i < taskdata.length; i++) {
            if (taskdata[i].importance) {
                var time = taskdata[i].start_time;
                var tmp = utils.getYearMonth(time);
                taskdata[i].day = time == null ? "Nan" : time.getDate();
                if (tmp != lastmonth.year_month) {
                    if (lastmonth.year_month) showdataimp.push(lastmonth);
                    lastmonth = {
                        year_month: tmp,
                        taskdata: [taskdata[i]]
                    };
                } else lastmonth.taskdata.push(taskdata[i]);
            }
        }
        if (lastmonth.year_month) showdataimp.push(lastmonth);

        var cur_year_month = utils.getYearMonth(new Date());
        for (var i = 0; i < showdataimp.length; i++)
            if (i + 1 == showdataimp.length || showdataimp[i].year_month >= cur_year_month) {
                showdataimp[i].current = true;
                break;
            }
        if (showdataimp.length > 0)
            showdataimp[showdataimp.length - 1].unknown = true;


        //不重要

        var showdataunimp = new Array();
        var lastmonth = {};
        for (var i = 0; i < taskdata.length; i++) {
            if (!taskdata[i].importance) {
                var time = taskdata[i].start_time;
                var tmp = utils.getYearMonth(time);
                taskdata[i].day = time == null ? "Nan" : time.getDate();
                if (tmp != lastmonth.year_month) {
                    if (lastmonth.year_month) showdataunimp.push(lastmonth);
                    lastmonth = {
                        year_month: tmp,
                        taskdata: [taskdata[i]]
                    };
                } else lastmonth.taskdata.push(taskdata[i]);
            }
        }
        if (lastmonth.year_month) showdataunimp.push(lastmonth);

        var cur_year_month = utils.getYearMonth(new Date());
        for (var i = 0; i < showdataunimp.length; i++)
            if (i + 1 == showdataunimp.length || showdataunimp[i].year_month >= cur_year_month) {
                showdataunimp[i].current = true;
                break;
            }
        if (showdataunimp.length > 0)
            showdataunimp[showdataunimp.length - 1].unknown = true;



        this.setData({
            cl: getApp().globaldata.bkgcolor,
            im: getApp().globaldata.bkgimage,
            TabCur: 0,
            showdata: [showdata, showdataimp, showdataunimp]
        }, function () {
            setTimeout(() => {
                this.edit_task = function (d) {
                    console.log(d)
                    console.log(d.target)
                    console.log(d.target.dataset)
                    console.log(d.target.dataset.id)
                    if (typeof (d.target.dataset.id) == "number")
                        wx.navigateTo({
                            url: '../input/index?id=' + d.target.dataset.id,
                        })
                    else
                        console.log("fuck");
                }
            }, 1500);
        })
    },
    scroll_cur_month() {
        wx.pageScrollTo({
            selector: ".cur"
        })
    },
    scroll_unknown() {
        wx.pageScrollTo({
            selector: ".unk"
        })
    },
    add() {
        wx.navigateTo({
            url: '../input/index?id=-1',
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