// pages/input/index.js
var utils = require('../../utils/util.js');
var app = getApp();
//console.log(app)
var pos;
var taskid;
Page({
    onLoad: function (option) {
        taskid = new Number(option.id);
        if (typeof (taskid) == 'undefined') taskid = -1;
        this.setData({
            cl: app.globaldata.bkgcolor,
            im: app.globaldata.bkgimage,
        });
        if (taskid > 0) {
            pos = app.tasklist.get_pos(taskid);
            var list = app.tasklist.get_tasks_copy();
            // console.log(app.tasklist.list);
            // console.log("pos->", pos)
            // console.log(app.tasklist.list[pos]);
            this.setData({
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
        } else {
            this.setData({
                desc: null,
                duration: null,
                importance: false,
                complete: false,
                start_date: null,
                start_time: null,
                due_date: null,
                due_time: null,
            })
        }
    },
    onShow: function () {},
    newtask() {

        if (taskid > 0) {
            app.tasklist.list[pos].desc = this.data.desc;
            app.tasklist.list[pos].duration = this.data.duration;
            app.tasklist.list[pos].importance = this.data.importance;
            app.tasklist.list[pos].start_date = new Date(this.data.start_date + " " + this.data.start_time);
            app.tasklist.list[pos].due_date = new Date(this.data.due_date + " " + this.data.due_time);
            app.tasklist.list[pos].complete = this.data.complete;
        } else {
            var tmp = new utils.task(
                this.data.desc,
                this.data.duration,
                this.data.importance,
                new Date(this.data.start_date + " " + this.data.start_time),
                new Date(this.data.due_date + " " + this.data.due_time),
                this.data.complete,
            )
            app.tasklist.insert_task(new utils.task(
                this.data.desc,
                this.data.duration,
                this.data.importance,
                new Date(this.data.start_date + " " + this.data.start_time),
                new Date(this.data.due_date + " " + this.data.due_time),
                this.data.complete,
            ));
        }
        wx.navigateBack();
    }
})