export default class Countdown {
    constructor ({
        // 倒计时每天都计算
        everyday = false,
        // 每天目标时间的 时，分，秒，如： '[08,30,10]'
        everyTimeArr = [],
        // 目标时间 如 '2020/09/12 08:30:10'（everyday为flase时用）
        lastTime = '',
        // 倒计时间隔时间
        intervalTime = 1000
    }) {
        this.everyday = everyday
        this.everdayLastTime = 0
        if (everyTimeArr.length === 3) {
            this.everdayLastTime = new Date().setHours(everyTimeArr[0], everyTimeArr[1], everyTimeArr[2])
        } else {
            this.everdayLastTime = 0
        }
        this.timeFun = null
        // 剩余时间
        this.remainingTime = 0
        // 回调函数
        this.callBack = function () {}
        // 间隔时间
        this.intervalTime = intervalTime
        // 一天的毫秒数
        this.oneDayTime = 1000 * 60 * 60 * 24
        // 今天0时
        this.todayZero = new Date().setHours(0, 0, 0, 0)
        // 当前时间的毫数据
        let todayNow = Date.now()
        // 计算剩余时间
        // 每天都有的倒计时
        if (everyday) {
            this.remainingTime = (todayNow >= this.everdayLastTime) ? this.oneDayTime + this.everdayLastTime - todayNow : this.everdayLastTime - todayNow
            // 开始倒计时
            this.star()
        } else if (lastTime) {
            this.remainingTime = new Date(lastTime) * 1 - todayNow
            // 开始倒计时
            this.star()
        } else {
            throw new Error('传数错误')
        }
    }
    /**
     * 补零
     * @param {Number} timeNumber 时、分、秒、等数
     */
    checkTime (timeNumber) {
        if (timeNumber < 10) {
            return '0' + timeNumber
        }
        return timeNumber
    }
    /**
     * 返回结果
     * @param {Number} time 乘余毫秒数
     */
    result () {
        // 计算剩余的天数
        let day = parseInt(this.remainingTime / 1000 / 60 / 60 / 24, 10)
        // 计算剩余的小时
        let hours = parseInt(this.remainingTime / 1000 / 60 / 60 % 24, 10)
        // 计算剩余的分钟
        let minutes = parseInt(this.remainingTime / 1000 / 60 % 60, 10)
        // 计算剩余的秒数
        let seconds = parseInt(this.remainingTime / 1000 % 60, 10)
        return {
            day: this.checkTime(day),
            hours: this.checkTime(hours),
            minutes: this.checkTime(minutes),
            seconds: this.checkTime(seconds)
        }
    }
    star () {
        this.timeFun = setTimeout(() => {
            clearTimeout(this.timeFun)
            this.remainingTime -= this.intervalTime
            if (this.remainingTime < 0) {
                if (this.everyday) {
                    this.remainingTime = this.oneDayTime + this.everdayLastTime - Date.now()
                    this.star()
                }
            } else {
                this.star()
            }
            // 返回结果
            this.callBack(this.result())
        }, this.intervalTime)
    }
}
