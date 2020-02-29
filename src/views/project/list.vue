<template>
    <div class="project-list m-3 p-3 bg-white">
        <Row class = "py-3">
            <Button color="blue" icon="h-icon-plus"@click = "createProject">创建新项目</Button>
        </Row>
        <Row>
            <template v-for="(item,index) in project.list">
                <Row class="project-list-item" :class = "{'project-list-item-last' : index === project.list.length - 1}" type = "flex" align = "middle">
                    <Cell :width="10">
                        <Avatar :src="item.cover" shape="square" :width="40">
                            <div class = "text-blue-500"><a>{{item.name}}</a></div>
                            <div class = "text-gray-500">{{item.description}}</div>
                        </Avatar>
                    </Cell>
                    <Cell :width="10" class = "flex justify-end">
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
                    </Cell>
                    <Cell :width="4">
                        <span v-tooltip = "true" content="添加成员" class = "fas fa-user-plus cursor-pointer text-blue-500 pr-2"></span>
                        <span v-tooltip = "true" content="移出至回收站" class = "fas fa-trash cursor-pointer text-blue-500 pr-2"></span>
                        <span v-tooltip = "true" content="项目设置" class = "fas fa-cog cursor-pointer text-blue-500 pr-2"></span>
                        <span v-tooltip = "true" content="加入收藏" class = "fas fa-star cursor-pointer text-blue-500"></span>
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
                :closeOnMask = true
                :hasCloseIcon = "true"
        >
            <div slot="header">{{modal.title}}</div>
            <add-project></add-project>
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
            AddProject
        },
        data() {
            return {
                project: {
                    list: [],
                    total: 0
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
            async getProjectList() {
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