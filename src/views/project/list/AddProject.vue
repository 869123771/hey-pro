<template>
    <div class = "">
        <Form
                ref="form"
                :rules="rules"
                :model="form"
                :showErrorTip = "false"
        >
            <FormItem label = "创建项目名称" :showLabel = "false" prop = "name">
                <input type="text" v-model="form.name" placeholder="创建项目名称 (必填)">
            </FormItem>
            <FormItem label = "项目模版" :showLabel = "false">
                <Select v-model="form.templateCode"
                        class = "w-full"
                        :datas = "select.template"
                        placeholder="项目模版"
                        keyName = "id"
                        titleName = "name"
                ></Select>
            </FormItem>
            <FormItem label = "项目简介" :showLabel = "false">
                <textarea rows="3" v-model = "form.description" placeholder="项目简介"/>
            </FormItem>
            <FormItem :showLabel = "false">
                <Button color = "blue" :block = "true" :loading = "loading" @click = "create">创建项目</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {http, apiList, constant} from '@/utils'
    import {isEmpty} from '30-seconds-of-code'
    export default {
        name: "AddProject",
        props : {
            data : {
                type : Object
            }
        },
        data(){
            return {
                form : {
                    name : '',
                    templateCode : '',
                    description : '',
                },
                loading : false,
                select : {
                    template : []
                },
                rules : {
                    required : ['name'],
                }
            }
        },
        methods : {
            create(){
                let {result} = this.$refs.form.valid()
                if (result) {
                    this.saveData();
                }
            },
            async saveData(){
                this.loading = true;
                let params = {
                    ...this.form,
                }
                let {code,data,msg} = await http.post(apiList.project_mgr_my_project_save,params)
                if (code === constant.SUCCESS) {
                    this.loading = false
                    this.$Message({
                        type : 'success',
                        text: msg || '操作成功'
                    });
                    this.$emit('handleSuccess')
                }else{
                    this.loading = false
                }
            },
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