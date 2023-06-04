// app.js
const {
    deepcopy
} = require('./utils/util.js');
var utils = require('./utils/util.js')

App({
    globaldata: {
        bkgcolor: "blue",
        bkgimage: "none",
    },
    tasklist: {
        insert_task: function (task_data) { //传入类型为task的任务，加入人物列表
            this.list.push(task_data);
        },
        get_pos(task_id) { //通过id查找事件在列表中的位置
            var res = utils.deepcopy(this.list);
            for (var i = 0; i < res.length; i++)
                if (res[i].id == task_id) return i;
        },
        delete_task(task_id) { //传入taskid，删除对应任务。
            var index = this.list.findIndex(function (x) {
                return x.id == task_id;
            })
            console.log("已经删除")
            if (index != -1) this.list.splice(index, 1);
        },
        get_tasks() { //返回列表本身，不要直接做修改！！
            return this.list;
        },
        get_tasks_copy() { //返回列表的深拷贝，可以随意修改
            // console.log(utils.deepcopy(this.list));
            var res = utils.deepcopy(this.list);
            for (var i = 0; i < res.length; i++)
                res[i] = utils.fix_task(res[i]);
            return res;
        },
        save_tasks() {
            wx.setStorageSync("tasklist", this.list);
            console.log("缓存记录条数 " + this.list.length);
        },
        load_tasks() {
            //this.list;
            const that = this;
            this.list = wx.getStorageSync('tasklist')
            if (this.list == "")
                this.list = new Array();
            for (var i = 0; i < this.list.length; i++)
                this.list[i] = utils.fix_task(this.list[i]);
        }
    },
    onLaunch() {
        this.tasklist.load_tasks();
        var res = wx.getStorageSync("setting");
        if (res != "")
            this.globaldata = res;
        this.tasklist.insert_task(new utils.task("淑芬作业1", 123, true, new Date("2023-1-4"), null, false));
        this.tasklist.insert_task(new utils.task("淑芬作业2", 123, true, new Date("2023-6-12"), new Date("2023-6-23"), false));
        this.tasklist.insert_task(new utils.task("线代作业1", 123, false, new Date("2023-6-14"), null, true));
        this.tasklist.insert_task(new utils.task("线代作业2", 123, false, new Date("2023-7-13"), new Date("2023-7-23"), true));
        this.tasklist.insert_task(new utils.task("线代作业3", 123, true, new Date("2022-12-14"), null, true));
        this.tasklist.insert_task(new utils.task("线代作业4", 123, true, new Date("2023-7-13"), null, true))
    },
    onHide() {
        this.tasklist.save_tasks();
        wx.setStorageSync("setting", this.globaldata);
    },
})