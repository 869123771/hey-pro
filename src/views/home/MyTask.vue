<template>
    <Row class="mt-1 tabs-part">
        <template v-for="(item,index) in data">
            <Cell :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="h-panel"
                     :class="{'task-item' : index !== data.length - 1}">
                    <div class="h-panel-body py-4 flex justify-between">
                        <div class = "flex truncate">
                            <span class="cursor-pointer tag" :class = "showTagType(item.pri)" v-tooltip="true" content="优先级">{{item.priText}}</span>
                            <span class="text-blue-500 pl-2 truncate" v-tooltip="true" :content="item.name"><a>{{item.name}}</a></span>
                        </div>
                        <div class = "flex pl-3 truncate">
                            <span
                                    v-tooltip = "true"
                                    :content = "showTaskTime(item.begin_time, item.end_time)"
                                    class="label"
                                    :class="showTimeLabel(item.end_time)"
                                    v-if="item.end_time">{{showTaskTime(item.begin_time, item.end_time)}}</span>
                            <span class="text-gray-500" v-tooltip="true" content="所属项目"><a>{{item.projectInfo.name}}</a></span>
                        </div>
                    </div>
                </div>
            </Cell>
        </template>
    </Row>
</template>

<script>
    import {tools} from '@/utils'
    import dayjs from 'dayjs'

    export default {
        name: "MyTask",
        props: {
            data: {
                type: Array
            }
        },
        methods: {
            showTaskTime(time, timeEnd) {
                return tools.formatTaskTime(time, timeEnd);
            },
            showTagType(priority){
                let str = 'tag-primary';
                if (priority == null) {
                    return str;
                }
                switch (priority) {
                    case 0 : str = 'tag-green' ;break;
                    case 1 : str = 'tag-yellow' ;break;
                    case 2 : str = 'tag-red' ;break;
                }
                return str;
            },
            showTimeLabel(time) {
                let str = 'label-primary';
                if (time == null) {
                    return str;
                }
                let cha = dayjs(dayjs(time).format("YYYY-MM-DD")).diff(dayjs().format("YYYY-MM-DD"), 'days');
                if (cha < 0) {
                    str = 'label-danger';
                } else if (cha == 0) {
                    str = 'label-warning';
                } else if (cha > 7) {
                    str = 'label-normal'
                }
                return str;
            },
        }
    }
</script>

<style scoped lang="less">
    .tabs-part {
        .tag{
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin: 0;
            font-variant: tabular-nums;
            line-height: 24px;
            list-style: none;
            -webkit-font-feature-settings: "tnum";
            font-feature-settings: "tnum";
            display: inline-block;
            height: 24px;
            padding: 0 7px;
            font-size: 12px;
            white-space: nowrap;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            cursor: pointer;
            opacity: 1;
            -webkit-transition: all .3s cubic-bezier(.215,.61,.355,1);
            transition: all .3s cubic-bezier(.215,.61,.355,1);
            &-green{
                color: #52c41a;
                background: #f6ffed;
                border-color: #b7eb8f
            }
            &-yellow{
                background-color: #faad14;
                color: #fff;
                border-color: transparent;
            }
            &-red{
                background-color: rgb(237, 63, 20);
                color: #fff;
                border-color: transparent;
            }
        }
        .label {
            margin-right: 8px;
            display: inline-block;
            padding: .5em .8em;
            font-size: 75%;
            line-height: 1;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: .25em;
            background-color: #d1dade;
            text-shadow: none;
            &-warning{
                background-color: #faad14;
            }
            &-danger{
                background-color: rgb(237, 63, 20)
            }
            &-primary{
                background-color: #52c41a;
            }
            &-normal{
                color: grey;
                background-color: #d9d9d9;
            }
        }
    }
</style>