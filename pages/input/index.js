// pages/input/index.js
var utils = require('../../utils/util.js');
var app = getApp();
//console.log(app)
Page({
    onload: function () {},
    onShow: function (options) {
        var pos = app.tasklist.get_pos(app.taskid);
        var list = app.tasklist.get_tasks();
        console.log(pos);
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage,
            pos: pos,
            desc: list[pos].desc,
            duration: list[pos].duration,
            importance: list[pos].importance,
            complete: list[pos].complete,
        })
        if (list[pos].start_time == null)
            this.setData({
                start_date: null, 
                start_time: null,
            })
        else
            this.setData({
                start_date: list[pos].start_time.toLocaleDateString(), //xxxx/xx/xx
                start_time: list[pos].start_time.getHours() + ":" + list[pos].start_time.getMinutes(), //xx:xx
            })
        if (list[pos].due_time == null)
            this.setData({
                due_date: null,
                due_time: null,
            })
        else
            this.setData({
                due_date: list[pos].due_time.toLocaleDateString(),
                due_time: list[pos].due_time.getHours() + ":" + list[pos].due_time.getMinutes(),
            })
    },
    newtask() {
        var pos = app.tasklist.get_pos(app.taskid);
        app.tasklist.list[pos].desc = this.data.desc;
        app.tasklist.list[pos].duration = this.data.duration;
        app.tasklist.list[pos].importance = this.data.importance;
        app.tasklist.list[pos].start_date = new Date(this.data.start_date + " " + this.data.start_time);
        app.tasklist.list[pos].due_date = new Date(this.data.due_date + " " + this.data.due_time);
        app.tasklist.list[pos].complete = this.data.complete;
        wx.navigateBack();
    }
})