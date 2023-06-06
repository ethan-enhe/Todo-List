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
            for (var i = 0; i < this.list.length; i++)
                if (this.list[i].id == task_id) return i;
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
        },
        get_available_time(d) { //传入日期，得到当天内的空余时间（一个数组，每项为{start_ava,end_ava}）
            var tmp = this.get_tasks_copy();

        }
    },
    onLaunch() {
        this.tasklist.load_tasks();
        var res = wx.getStorageSync("setting");
        if (res != "")
            this.globaldata = res;
    },
    onHide() {
        this.tasklist.save_tasks();
        wx.setStorageSync("setting", this.globaldata);
    },
})