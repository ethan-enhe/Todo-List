// app.js
const {
    deepcopy,
    task
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
        filter_task(l, r) { //筛选出与l，r，时间有交集的事件
            var tmp = this.get_tasks_copy();
            var res = new Array();
            for (var i = 0; i < tmp.length; i++) {
                if (typeof (tmp[i].duration) == "number") {
                    var end = new Date(tmp[i].start_time);
                    end.setMinutes(end.getMinutes() + tmp[i].duration)
                    if (end > l && tmp[i].start_time < r)
                        samedaytasks.push({
                            start_time: tmp[i].start_time,
                            end_time: end
                        });
                }
            }
            res.sort(function (a, b) {
                return utils.cmp_date(b.start_time, a.start_time);
            })
            return res;
        },

        get_available_time(samedaytasks,l,r) { //传入Date对象，得到当天内的空余时间（一个数组，每项为{start_ava,end_ava}）
            var ge5min = function (a, b) { //取出所有时长大于5分钟的时间段
                return utils.cmp_date(a, b) >= 5 * 60 * 1000
            }
            var ava = new Array();
            for (var i = 0; i < samedaytasks.length; i++) {
                if (ge5min(l, samedaytasks[i].start_time)) {
                    ava.push({
                        start_ava: new Date(l),
                        end_ava: new Date(samedaytasks[i].start_time)
                    })
                }
                if (samedaytasks[i].end_time > l)
                    l = samedaytasks[i].end_time;
            }
            if (ge5min(d, nxday))
                ava.push({
                    start_ava: new Date(d),
                    end_ava: nxday
                })
            console.log(utils.getYearMonthDay(d), "空闲时间：", ava);
            return ava;
        },
        try_insert(tasks, ava_time) { //尝试把这些任务插进ava_time里
            function get_minute(a, b) {
                return (Date.parse(b) - Date.parse(a)) / 1000 / 60;
            }
            tasks.sort(function (a, b) {
                return Date.parse(b.due_time) - Date.parse(a.due_time);
            })
            var satisfied = 0;
            for (var i = 0; i < task.length; i++) {
                var cnt = 0;
                for (var j = 0; j < ava_time.length; j++)
                    if (Math.min(get_minute(ava_time[i].start_ava, task[i].due_time),
                            get_minute(ava_time[i].start_ava, ava_time)) > task[i].duration + 2)
                        ++cnt;
                var choose = Math.ceil(Math.random() * cnt);
                for (var j = 0; j < ava_time.length; j++) {
                    if (Math.min(get_minute(ava_time[i].start_ava, task[i].due_time),
                            get_minute(ava_time[i].start_ava, ava_time)) > task[i].duration + 2) {
                        if (cnt == choose) {
                            task[i].start_time = ava_time[i].start_ava;
                            ava_time[i].start_ava.setMinutes(ava_time[i].start_ava.getMinutes() + task[i].duration);
                            ++satisfied;
                            break;
                        }
                        ++cnt;
                    }
                }
                console.log("安排上了", satisfied, "个任务");
            }
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