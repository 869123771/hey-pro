<template>
    <div class = "">
        <Form
                ref="form"
                :rules="rules"
                :model="form"
        >
            <FormItem :showLabel = "false">
                <input type="text" v-model="form.name" placeholder="创建项目名称 (必填)">
            </FormItem>
            <FormItem :showLabel = "false">
                <Select v-model="form.template"
                        class = "w-full"
                        :datas = "select.template"
                        placeholder="项目模版"
                        keyName = "id"
                        titleName = "name"
                ></Select>
            </FormItem>
            <FormItem :showLabel = "false">
                <textarea rows="3" v-model = "form.text" placeholder="项目简介"/>
            </FormItem>
            <FormItem :showLabel = "false">
                <Button color = "blue" :block = "true">创建项目</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {http, apiList, constant} from '@/utils'
    let {config:{_select}} = constant
    export default {
        name: "AddProject",
        data(){
            return {
                form : {

                },
                select : {
                    template : []
                },
                rules : {

                }
            }
        },
        methods : {
            async getTemplateData(){
                let params = {
                    pageSize: 100,
                    viewType: -1
                }
                let {code,data} = await http.post(apiList.project_mgr_my_project_template_query,params)
                if (code === constant.SUCCESS) {
                    let {total, list} = data
                    this.select = {
                        ...this.select,
                        template : list,
                    }
                }
            }
        },
        mounted() {
            this.getTemplateData()
        }
    }
</script>

<style scoped lang = "less">
    textarea{
        padding: 4px 8px;
    }
</style>