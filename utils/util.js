// 时间格式转换 yyyy/mm/dd
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date, split) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(formatNumber).join(split || '')
}


// 两位数以内的数字自动补零
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}


// 计算变化多少天后的日期
function DateAddDay(d, days) {
    var d = new Date(d);
    return new Date(d.setDate(d.getDate() + days));
}
// 获得本周周日的日期
function FirstDayInThisWeek(d) {
    var d = new Date(d);
    //console.log(formatTime(DateAddDay(d, 0 - d.getDay())));
    return DateAddDay(d, 0 - d.getDay());
}

// 判断类型
function Type(obj) {
    var typeStr = Object.prototype.toString.call(obj).split(" ")[1];
    return typeStr.substr(0, typeStr.length - 1).toLowerCase();
}

//深拷贝
function copyObj(obj) {
    return JSON.parse(JSON.stringify(obj))
}

var task = class {
    constructor(desc, duration, importance, start_time, due_time, complete) {
        this.desc = desc; //任务名称
        this.duration = duration; //任务持续时间，单位分钟，Number类型
        this.importance = importance; //任务重要性，重要为true，否则为false
        this.start_time = start_time; //如果已经确定，则为一个Date对象，否则为null
        this.due_time = due_time; //任务截止时间，果已经确定，则为一个Date对象，否则为null
        this.complete = complete;
        this.id = Math.ceil(Math.random() * 1145141919); //任务分配的id，直接随机值，冲突概率很小
    }
}


function getYearMonth(d) {
    return d.getFullYear().toString() + " 年 " + (d.getMonth() + 1).toString() + " 月";
}


module.exports = {
    formatTime: formatTime,
    formatDate: formatDate,
    DateAddDay: DateAddDay,
    getYearMonth: getYearMonth,
    FirstDayInThisWeek: FirstDayInThisWeek,
    type: Type,
    addZero: formatNumber,
    deepcopy: copyObj,
    task: task,
}