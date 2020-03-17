<template>
    <div class="project-list m-3 p-6 bg-white">
        <Row>
            <Loading :loading="project.loading"></Loading>
            <template v-for="(item,index) in project.list">
                <Row class="project-list-item" type="flex" align="middle" justify="space-between">
                    <Cell :width="12">
                        <Avatar :src="item.cover" shape="square" :width="40">
                            <div class="text-blue-500"><a>{{item.name}}</a></div>
                            <div class="text-gray-500">{{item.description}}</div>
                        </Avatar>
                    </Cell>
                    <Cell :width="12" class = "flex justify-end items-center pr-12">
                        <div class = "pr-12">
                            <div class = "text-gray-500">移动日期</div>
                            <div class = "text-gray-500">{{formatDate(item.create_time)}}</div>
                        </div>
                        <div>
                            <Poptip content="确定将此项目恢复？" @confirm="recover(item.project_code)">
                                <span v-tooltip = "true" content="恢复项目" class = "fas fa-recycle cursor-pointer text-blue-500 pr-2"></span>
                            </Poptip>
                        </div>
                    </Cell>
                </Row>
            </template>
        </Row>
        <Row class="mt-3">
            <Pagination v-model="pagination" align="right" @change="currentChange"></Pagination>
        </Row>
    </div>
</template>

<script>
    import {http, apiList, constant} from '@/utils'
    import dayjs from 'dayjs'

    export default {
        name: "recycle",
        data() {
            return {
                project: {
                    list: [],
                    total: 0,
                    loading: false
                },
                pagination: {
                    page: 1,
                    size: 10,
                    total: 0
                },
            }
        },
        methods: {
            formatDate(time) {
                return dayjs(time).format('YYYY-MM-DD')
            },
            currentChange({page, size}) {
                this.pagination = {
                    ...this.pagination,
                    page, size
                }
                this.getProjectList()
            },
            async recover(projectCode){
                let {code, msg} = await http.post(apiList.project_mgr_my_project_recovery, {projectCode},constant.FORM_DATA)
                if (code === constant.SUCCESS) {
                    this.$Message({
                        type : 'success',
                        text : msg ? msg : '恢复成功'
                    })
                    this.getProjectList()
                }
            },
            async getProjectList() {
                this.project = {
                    ...this.project,
                    loading: true
                }
                let {page, size: pageSize} = this.pagination
                let params = {
                    page,
                    pageSize,
                    recycle: 1,
                    type: 'other'
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
            .h-avatar {
                .h-avatar-info {
                    padding-left: 52px !important;
                }
            }
        }
    }
</style>