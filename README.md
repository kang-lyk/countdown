| 参数         | 类型    | 默认值 | 备注                                                     |
| ------------ | ------- | ------ | -------------------------------------------------------- |
| everyday     | Boolean | false  | 倒计时每天都计算                                         |
| everyTimeArr | Array   | []     | 每天目标时间的 时，分，秒，如： '[08,30,10]'             |
| lastTime     | String/Number  | ''     | 目标时间 如 '2020/09/12 08:30:10'或者为毫秒数1599870610000（everyday为flase时用） |
| intervalTime | Number  | 1000   | 倒计时间隔时间                                           |

## 例子

### 倒记时为每天早上10点

```
let countdown = new Countdown({
    everyday: true,
    everyTimeArr: [10, 0, 0]
})
countdown.callBack = ({ day, hours, minutes, seconds }) => {
    this.day = day
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
}
```

### 倒记时为指点日期

```
let countdown = new Countdown({
    lastTime: '2020/09/12 08:30:10'
    // 传毫秒数
    //lastTime: 1591926179897
})
countdown.callBack = ({ hours, minutes, seconds }) => {
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
}
```