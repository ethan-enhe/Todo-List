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
    if (d == null) return "Nan 年 Nan 月"
    return d.getFullYear().toString() + " 年 " + (d.getMonth() + 1).toString() + " 月";
}

function getYearMonthDay(d) {
    if (d == null) return "Nan 年 Nan 月 Nan 日"
    return d.getFullYear().toString() + " 年 " + (d.getMonth() + 1).toString() + " 月" + (d.getDate() + 1).toString() + " 日";
}

function fix_task(x) { //把变成字符串的日期救回来
    if (typeof (x.start_time) == "string") x.start_time = new Date(x.start_time);
    if (typeof (x.due_time) == "string") x.due_time = new Date(x.due_time);
    if (typeof (x.duration) == "string") x.duration = new Number(x.duration);
    return x;
}

function cmp_date(a, b) { //比较两个date对象，放回时间差（毫秒）（把有null的放在后面）
    var inf = 1e10;
    var a_brok = a == null || a == undefined;
    var b_brok = b == null || b == undefined;
    if (a_brok && b_brok) return 0;
    if (a_brok) return -inf;
    if (b_brok) return inf;
    return (Date.parse(b) - Date.parse(a));
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
    getYearMonthDay: getYearMonthDay,
    task: task,
    fix_task: fix_task,
    cmp_date: cmp_date,

}