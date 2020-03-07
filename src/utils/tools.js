import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import weekday from 'dayjs/plugin/weekday'
import calendar from 'dayjs/plugin/calendar'
import zh_cn from 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.extend(weekday)
dayjs.extend(calendar)
dayjs.locale(zh_cn)

let tools = {
    /**
     * 格式化相对时间
     * @returns {string}
     * @param value
     * @param now
     */
    relativelyTime : (value, now) => {
        if (!now) {
            now = dayjs();
        }
        const diff = dayjs(now).diff(dayjs(value), 'hours');
        if (diff <= 1) {
            return dayjs(value).fromNow();
        }
        const today = dayjs(now).get('date');
        const current = dayjs(value).get('date');
        if (current < today - 1) {
            // return moment(value).format('M月D日 H:mm');
        }
        let detailTime = dayjs(value).format('H:mm');
        const currentDate = dayjs(value).format('YYYY-MM-DD');
        const currentMonday = dayjs().weekday(0).format('YYYY-MM-DD');
        const currentSunday = dayjs().weekday(6).format('YYYY-MM-DD');
        let weekDate = '';
        if (currentDate < currentMonday) {
            weekDate = '[上周]dd ' + detailTime;
        } else if (currentDate > currentSunday) {
            weekDate = '[下周]dd ' + detailTime;
        } else {
            weekDate = '[周]dd ' + detailTime;
        }
        return dayjs(value).calendar(null, {
            sameDay: '[今天 ]' + dayjs(value).format('H:mm'),
            nextDay: '[明天 ]' + detailTime,
            nextWeek: weekDate,
            lastDay: '[昨天 ]' + detailTime,
            lastWeek: weekDate,
            sameElse: 'M月D日 H:mm'
        });
    },
    /**
     *
     * @param value 日期
     * @param showDetailTime 是否显示具体时间
     * @returns {string}
     */
    relativelyTaskTime : (value, showDetailTime = false) => {
        let detailTime = dayjs(value).format('H:mm');
        if (!showDetailTime) {
            detailTime = '';
        }
        const currentDate = dayjs(value).format('YYYY-MM-DD');
        const currentMonday = dayjs().weekday(0).format('YYYY-MM-DD');
        const currentSunday = dayjs().weekday(6).format('YYYY-MM-DD');
        let weekDate = '';
        if (currentDate < currentMonday) {
            weekDate = '[上周]dd ' + detailTime;
        } else if (currentDate > currentSunday) {
            weekDate = '[下周]dd ' + detailTime;
        } else {
            weekDate = '[周]dd ' + detailTime;
        }
        return dayjs(value).calendar(null, {
            sameDay: '[今天 ]' + dayjs(value).format('H:mm'),
            nextDay: '[明天 ]' + detailTime,
            nextWeek: weekDate,
            lastDay: '[昨天 ]' + detailTime,
            lastWeek: weekDate,
            sameElse: 'M月D日 H:mm'
        });
    },
    formatTaskTime : (begin, end) => {
        debugger;
        //如果不是今天则不显示具体时间
        if (!end && begin) {
            return tools.relativelyTaskTime(begin) + ' 开始';
        }
        if (!begin) {
            return tools.relativelyTaskTime(end) + ' 截止';
        }
        return tools.relativelyTaskTime(begin) + ' - ' + tools.relativelyTaskTime(end);
    }
}

export default tools