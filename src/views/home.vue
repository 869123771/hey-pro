<template>
    <div class="work-space">
        <Row>
            <div class="h-panel h-panel-no-border">
                <div class="h-panel-body">
                    <Row>
                        <span class="text-gray-600">『 {{ motto.hitokoto }}』 —— 《{{ motto.from }}》
                            <a @click="getNewMotto">
                                <i class="h-icon-refresh"></i>
                            </a>
                        </span>
                    </Row>
                    <Row class="pt-3" type="flex">
                        <Cell :xs = "24" :sm = "24" :md = "12" :lg = "12" :xl = "12" class = "motto-cell">
                            <Avatar :src="userInfo.avatar" class = "h-full">
                                <div class="text-xl">{{helloTime()}}{{ userInfo.name }}，祝你开心每一天！</div>
                                <div class="text-gray-600 pt-2">{{userInfo.position}}</div>
                            </Avatar>
                        </Cell>
                        <Cell :xs = "24" :sm = "24" :md = "12" :lg = "12" :xl = "12" class = "statistic-cell">
                            <div class="task-num h-full inline-block">
                                <div class="text-gray-600">任务数</div>
                                <div class="text-3xl">{{statistic.taskNum}}</div>
                            </div>
                            <div class="rank h-full inline-block">
                                <div class="text-gray-600">团队内排名</div>
                                <div>
                                    <span class="text-3xl h-full inline-block">{{statistic.rank}}</span>
                                    <span class="text-gray-600 text-lg pl-2">/ 8</span>
                                </div>
                            </div>
                            <div class="total pl-8 h-full inline-block">
                                <div class="text-gray-600">项目总数</div>
                                <div class="text-3xl">{{statistic.projectNum}}</div>
                            </div>
                        </Cell>
                    </Row>
                </div>
            </div>
        </Row>
        <Row class="m-5">
            <Cell :xs = "24" :sm = "24" :md = "24" :lg = "16" :xl = "16">
               <Row>
                   <div class="h-panel h-panel-no-border">
                       <div class="h-panel-bar">
                           <span class="h-panel-title">进行中的项目</span>
                           <span class="h-panel-right text-blue-500"><a>全部项目</a></span>
                       </div>
                       <div class="h-panel-body p-0">
                           <Row>
                               <template v-for = "{cover,name,description,schedule,owner_name,create_time} in statistic.projectList">
                                   <Cell :xs = "24" :sm = "24" :md = "16" :lg = "8" :xl = "8">
                                       <div class="h-panel border-0 rounded-none project-item">
                                           <div class="h-panel-body">
                                               <div class = "flex items-center">
                                                   <Avatar :src = "cover" :width = "25" class = "w-8"></Avatar>
                                                   <div class = "z-10 text-black-500"><a>{{name}}</a></div>
                                               </div>
                                               <div class = "truncate py-2 text-gray-500" v-height = "36">
                                                   <span v-tooltip="true" :content="description" class = "cursor-text">{{description}}</span>
                                               </div>
                                               <div>
                                                   <Progress
                                                           v-tooltip="true"
                                                           placement = "right"
                                                           :content="`当前进度：${schedule}%`"
                                                           :percent="schedule"
                                                           :stroke-width="4"></Progress>
                                               </div>
                                               <div class = "flex justify-between pt-3 text-gray-500">
                                                   <div>{{owner_name}}</div>
                                                   <div>{{create_time}}</div>
                                               </div>
                                           </div>
                                       </div>
                                   </Cell>
                               </template>
                           </Row>
                       </div>
                   </div>
               </Row>
                <Row class = "mt-5">
                    <div class="h-panel h-panel-no-border">
                        <div class="h-panel-bar">
                            <span class="h-panel-title">动态</span>
                        </div>
                        <div class="h-panel-body p-0 self-event">
                            <template v-for = "(item,index) in statistic.selfEventsList">
                                <Cell :xs = "24" :sm = "24" :md = "24" :lg = "24" :xl = "24">
                                    <div class="h-panel" :class = "{'task-item' : index !== statistic.selfEventsList.length - 1}">
                                        <div class="h-panel-body py-4 flex justify-between">
                                            <Avatar :src = "item.member_avatar" :width = "40">
                                                <div>{{ item.member_name + item.remark}}</div>
                                                <div class = "text-gray-500">{{item.create_time + ' - ' + item.project_name}}</div>
                                            </Avatar>
                                            <div class = "text-blue-500"><a>「 {{item.task_name}} 」 </a></div>
                                        </div>
                                    </div>
                                </Cell>
                            </template>
                        </div>
                    </div>
                </Row>
            </Cell>
            <div class = "pl-5">
                <Cell :xs = "24" :sm = "24" :md = "8" :lg = "8" :xl = "8" class = "pl-5">
                    <Row>
                        <div class="h-panel h-panel-no-border">
                            <div class="h-panel-bar">
                                <span class="h-panel-title">{{`我的任务(${statistic.taskList.length})`}}</span>
                            </div>
                            <div class="h-panel-body p-0">
                                <Row :space = "8">
                                    <template v-for = "(item,index) in statistic.taskList">
                                        <Cell :xs = "24" :sm = "24" :md = "24" :lg = "24" :xl = "24">
                                            <div class="h-panel" :class = "{'task-item' : index !== statistic.taskList.length - 1}">
                                                <div class="h-panel-body py-4">
                                                    <div class = "text-blue-500 cursor-pointer">{{item.name}}</div>
                                                    <div class = "text-gray-500 text-base mt-2"><a>{{item.projectInfo.name}}</a></div>
                                                </div>
                                            </div>
                                        </Cell>
                                    </template>
                                </Row>
                            </div>
                        </div>
                    </Row>
                    <Row class = "mt-5">
                        <div class="h-panel h-panel-no-border member-item">
                            <div class="h-panel-bar">
                                <span class="h-panel-title">团队</span>
                            </div>
                            <div class="h-panel-body inline-block">
                                <Row>
                                    <template v-for = "(item,index) in statistic.memberAccountList">
                                        <Cell :xs = "24" :sm = "24" :md = "12" :lg = "12" :xl = "12">
                                            <div class = "flex items-center pb-3">
                                                <span><Avatar :src = "item.avatar" :width = "25"></Avatar></span>
                                                <span>{{item.name}}</span>
                                            </div>
                                        </Cell>
                                    </template>
                                </Row>
                            </div>
                        </div>
                    </Row>
                </Cell>
            </div>
        </Row>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {http, apiList, constant} from '@/utils'

    export default {
        name: "home",
        data() {
            return {
                motto: {},
                statistic: {
                    taskNum: 0,
                    rank: 2,
                    projectNum: 0,
                    projectList : [],
                    taskList : [],
                    selfEventsList : [],
                    memberAccountList : []
                }
            }
        },
        computed: {
            ...mapState({
                userInfo: ({user}) => user.userInfo
            })
        },
        methods: {
            helloTime(time) {
                let time_format = '';
                if (time == undefined) {
                    time = new Date();
                }
                let hr = time.getHours();
                if ((hr >= 0) && (hr <= 4))
                    time_format = "深夜了，注意身体，";
                if ((hr >= 4) && (hr < 7))
                    time_format = "清晨好， ";
                if ((hr >= 7) && (hr < 12))
                    time_format = "早安，";
                if ((hr >= 12) && (hr <= 13))
                    time_format = "午饭时间到了，";
                if ((hr >= 13) && (hr <= 17))
                    time_format = "下午好，";
                if ((hr >= 17) && (hr <= 18))
                    time_format = "进入傍晚了，";
                if ((hr >= 18) && (hr <= 20))
                    time_format = "吃过晚饭了吗，";
                if ((hr >= 20) && (hr <= 24))
                    time_format = "在加班吗？辛苦了，";
                return time_format
            },
            getNewMotto() {
                this.getMotto()
            },
            async getMotto() {
                let {status, data} = await http.ajax('get', apiList.index_motto)
                if (status === constant.SUCCESS) {
                    this.motto = {
                        ...data
                    }
                }
            },
            async getProjectList() {
                let params = {
                    page: 1,
                    pageSize: 9
                }
                let {code, data} = await http.post(apiList.index_project_num, params, constant.FORM_DATA)
                if (code === constant.SUCCESS) {
                    let {list, total} = data
                    this.statistic = {
                        ...this.statistic,
                        projectNum: total,
                        projectList : list
                    }
                }
            },
            async getTaskList() {
                let params = {
                    page: 1,
                    pageSize: 10
                }
                let {code, data} = await http.post(apiList.index_task_num, params, constant.FORM_DATA)
                if (code === constant.SUCCESS) {
                    let {list, total} = data
                    this.statistic = {
                        ...this.statistic,
                        taskNum: total,
                        taskList : list
                    }
                }
            },
            async getSelfEvents(){
                let {code, data} = await http.post(apiList.index_self_event)
                if (code === constant.SUCCESS) {
                    this.statistic = {
                        ...this.statistic,
                        selfEventsList : data
                    }
                }
            },
            async getMemberAccount(){
                let {code, data} = await http.post(apiList.index_member_account)
                if (code === constant.SUCCESS) {
                    let {total,page,list,authList} = data
                    this.statistic = {
                        ...this.statistic,
                        memberAccountList : list
                    }
                }
            },
        },
        mounted() {
            this.getMotto()
            this.getProjectList()
            this.getTaskList()
            this.getSelfEvents()
            this.getMemberAccount()
        }
    }
</script>

<style scoped lang="less">
    .work-space {
        .motto-cell{
            .h-avatar{
                align-items: center;
                display: flex;
            }
            height: 80px;
        }
        .statistic-cell{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            >div{
                height : 80px;
            }
        }
        .task-num, .rank {
            position: relative;
            padding: 0 32px;

            &:after {
                background-color: #e8e8e8;
                position: absolute;
                top: 8px;
                right: 0;
                width: 1px;
                height: 40px;
                content: "";
            }
        }
        .project-item{
            box-shadow: 1px 0 0 0 #e8e8e8, 0 1px 0 0 #e8e8e8, 1px 1px 0 0 #e8e8e8, inset 1px 0 0 0 #e8e8e8, inset 0 1px 0 0 #e8e8e8;;
            &:hover{
                position: relative;
                z-index: 1;
                box-shadow: 0 2px 8px rgba(0,0,0,.15)
            }
        }
        .self-event,.member-item{
            .h-avatar{
                width : initial;
            }
        }
        .task-item{
            border-bottom: 1px solid #edf2f7;
            border-radius: 0;
        }

    }
</style>