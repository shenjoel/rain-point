/**
 * 倒计时插件
 */

var _this = {}, // 方法集合
    arrTime = {}; // 时间具柄

_this.method = {
    // 检查时间位数
    checkTime: function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i + '';
    },
    // 格式化
    formatTime: function (time) {
        var param = {
            ts: time * 1,
            dd: null,
            hh: null,
            mm: null,
            ss: null
        }

        param.dd = parseInt(param.ts / 1000 / 60 / 60 / 24, 10); // 计算剩余的天数
        param.hh = parseInt(param.ts / 1000 / 60 / 60 % 24, 10); // 计算剩余的小时数
        param.mm = parseInt(param.ts / 1000 / 60 % 60, 10); // 计算剩余的分钟数
        param.ss = parseInt(param.ts / 1000 % 60, 10); // 计算剩余的秒数

        // 检查位数
        param.hh = _this.method.checkTime(param.hh);
        param.mm = _this.method.checkTime(param.mm);
        param.ss = _this.method.checkTime(param.ss);

        return param;
    }
}

/**
 * 创建定时器
 * @param {Object} param [参数]
 * @param {Number} remainTime [剩余时间]
 * @param {Number} delay [延时]
 * @param {String} label [标签]
 * @param {Funtion} successFn [每次延时完成的回调方法]
 * @param {timeoutFn} timeoutFn [时间结束的回调方法]
 * @param {self} timeoutFn [自定义回传的对象]
 */
_this.creatTimer = function (param) {
    // 初始化参数
    var opt = {
        'remainTime': param.remainTime || '',
        'delay': param.delay || 1000,
        'label': String(param.label) || null,
        'successFn': param.successFn || function () { },
        'timeoutFn': param.timeoutFn || function () { },
        'self': param.self || {}
    }

    if (opt.remainTime < 0) return;

    // 时间参数
    var param = {
        dd: null,
        hh: null,
        mm: null,
        ss: null
    }

    if (!opt.label || typeof opt.label != 'string') {
        console.log('Missing \"label\" or Type is not a string');
        return;
    }


    // 记录当前标签下的定时器与参数
    arrTime[opt.label] = {
        opt: opt,
        timer: null
    }

    var endPoint = opt.remainTime * 1;
    var countdown = function () {
        // var ts = endPoint - new Date().getTime();
        param = _this.method.formatTime(endPoint);
        // 时效判断
        if (endPoint <= 0) {
            clearTimeout(arrTime[opt.label].timer);
            if (typeof arrTime[opt.label].opt.timeoutFn == 'function') {
                arrTime[opt.label].opt.successFn(param, arrTime[opt.label].opt.self);
                arrTime[opt.label].opt.timeoutFn(arrTime[opt.label].opt.self);
            }
            return;
        } else {
            if (typeof arrTime[opt.label].opt.successFn == 'function') {
                arrTime[opt.label].opt.successFn(param, arrTime[opt.label].opt.self);
                endPoint -= opt.delay;
            } else {
                console.log('timer successFn undefined');
            }
        }
    }
    countdown();
    arrTime[opt.label].timer = setInterval(countdown, opt.delay * 1);
}

/**
 * 清除标签定时器
 * @param  {Array or String} tagName [标签名]
 */
_this.clearAssignTimer = function (tagName) {
    var arrtag = [].concat(tagName);
    for (var i = 0, len = arrtag.length; i < len; i++) {
        if (arrTime[arrtag[i]]) {
            clearInterval(arrTime[arrtag[i]].timer);
        }
    }
}

/**
 * 除开指定定时器，其它全部清除，否则清除所有定时器
 * @param  {Array or String} tagName [标签名数组]
 */
_this.clearAllTimer = function (tagName) {
    var arrtag = [].concat(tagName);
    for (key in arrTime) {
        var bool = true;
        for (var i = arrtag.length - 1; i >= 0; i--) {
            if (arrTime[key].opt.label == arrtag[i]) {
                bool = false;
            }
        }
        // 非指定才清除定时器
        if (bool) {
            clearInterval(arrTime[key].timer);
        }
    }
}

export default _this;