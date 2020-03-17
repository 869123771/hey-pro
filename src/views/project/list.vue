<template>
    <div class="project-list m-3 p-6 bg-white">
        <Row class = "py-3">
            <Button color="blue" icon="h-icon-plus"@click = "createProject">创建新项目</Button>
        </Row>
        <Row>
            <Loading :loading = "project.loading"></Loading>
            <template v-for="(item,index) in project.list">
                <Row class="project-list-item" type = "flex" align = "middle" justify = "space-between">
                    <Cell :width="12">
                        <Avatar :src="item.cover" shape="square" :width="40">
                            <div class = "text-blue-500"><a>{{item.name}}</a></div>
                            <div class = "text-gray-500">{{item.description}}</div>
                        </Avatar>
                    </Cell>
                    <Cell :width="12" class = "flex justify-end items-center">
                        <div class = "pr-12">
                            <div class = "text-gray-500">创建日期</div>
                            <div class = "text-gray-500">{{formatDate(item.create_time)}}</div>
                        </div>
                        <div class = "pr-12">
                            <div class = "text-gray-500">创建人</div>
                            <div class = "text-gray-500">{{item.owner_name}}</div>
                        </div>
                        <div class = "w-4/12">
                            <div class = "text-gray-500">进度</div>
                            <div class = "text-gray-500">
                                <Progress
                                        :percent="item.schedule"
                                        :stroke-width="4">
                                    <span slot="text">{{item.schedule}}%</span>
                                </Progress>
                            </div>
                        </div>
                        <div>
                            <span v-tooltip = "true" content="添加成员" class = "fas fa-user-plus cursor-pointer text-blue-500 pr-2"></span>
                            <Poptip content="确定将此项目移出至回收站？" @confirm="confirmDel(item.project_code)">
                                <span v-tooltip = "true" content="移出至回收站" class = "fas fa-trash cursor-pointer text-blue-500 pr-2"></span>
                            </Poptip>
                            <span v-tooltip = "true" content="项目设置" class = "fas fa-cog cursor-pointer text-blue-500 pr-2"></span>
                            <template v-if = "item.collected">
                                <span v-tooltip = "true" content="取消收藏" class = "fas fa-star cursor-pointer text-blue-500" @click = "collected(item)"></span>
                            </template>
                            <template v-else>
                                <span v-tooltip = "true" content="加入收藏" class = "fas fa-star cursor-pointer text-gray-500"  @click = "collected(item)"></span>
                            </template>
                        </div>
                    </Cell>
                </Row>
            </template>
        </Row>
        <Row class = "mt-3">
            <Pagination v-model="pagination" align="right" @change="currentChange"></Pagination>
        </Row>
        <Modal
                v-model="modal.show"
                :hasDivider =  true
                :closeOnMask = false
                :hasCloseIcon = "true"
        >
            <div slot="header">{{modal.title}}</div>
            <component :is = "component.is" :data = "component.data" @handleSuccess = "handleSuccess"></component>
            <div slot="footer" v-if = "modal.showFooter">
                <button class="h-btn" @click="close">取消</button>
                <button class="h-btn h-btn-primary" @click="confirm">确定</button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {http, apiList, constant} from '@/utils'
    import dayjs from 'dayjs'
    import AddProject from "./list/AddProject";

    export default {
        name: "list",
        components : {

        },
        data() {
            return {
                project: {
                    list: [],
                    total: 0,
                    loading : false
                },
                pagination: {
                    page: 1,
                    size: 10,
                    total: 100
                },
                modal : {
                    show : false,
                    title : '创建项目',
                    showFooter : true,
                },
                component : {
                    is : AddProject,
                    data : {}
                }
            }
        },
        computed : {

        },
        methods: {
            createProject(){
                this.modal = {
                    ...this.modal,
                    show : true,
                    showFooter : false
                }
            },
            handleSuccess(){
                this.modal = {
                    ...this.modal,
                    show : false
                }
                this.getProjectList()
            },
            formatDate(time){
                return dayjs(time).format('YYYY-MM-DD')
            },
            currentChange({page,size}){
                this.pagination = {
                    ...this.pagination,
                    page,size
                }
                this.getProjectList()
            },
            async collected(item){
                let {collected,project_code : projectCode} = item
                let type = collected ? 'cancel' : 'collect'
                let {code, msg} = await http.post(apiList.project_mgr_my_project_collect, {projectCode,type},constant.FORM_DATA)
                if (code === constant.SUCCESS) {
                    this.$Message({
                        type : 'success',
                        text : msg ? msg : '操作成功'
                    })
                    this.getProjectList()
                }
            },
            async confirmDel(projectCode){
                let {code, msg} = await http.post(apiList.project_mgr_my_project_delete, {projectCode},constant.FORM_DATA)
                if (code === constant.SUCCESS) {
                    this.$Message({
                        type : 'success',
                        text : msg ? msg : '删除成功'
                    })
                    this.getProjectList()
                }
            },
            async getProjectList() {
                this.project = {
                    ...this.project,
                    loading: true
                }
                let {page,size:pageSize} = this.pagination
                let params = {
                    page,
                    pageSize,
                    type: 'my'
                }
                let {code, data} = await http.post(apiList.project_mgr_my_project_query_list, params)
                if (code === constant.SUCCESS) {
                    let {total, list} = data
                    this.project = {
                        ...this.project,
                        list,
                    }
                    this.pagination = {
                        ...this.pagination,
                        total
                    }
                    this.project = {
                        ...this.project,
                        loading: false
                    }
                }
            }
        },
        mounted() {
            this.getProjectList()
        }
    }
</script>

<style scoped lang="less">
    .project-list {
        /deep/ &-item {
            border-bottom: 1px solid #e8e8e8;
            padding: 12px 0;
            &-last{

            }
            .h-avatar {
                .h-avatar-info {
                    padding-left: 52px !important;
                }
            }
        }
    }
</style>