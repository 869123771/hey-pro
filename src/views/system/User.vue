<template>
    <div class = "p-3 m-3 bg-white">
        <Row>
            <Form ref="form" :model="form" :label-width="80">
                <form-query @search="search" @reset="reset">
                    <template slot = "show">
                        <Cell width = "6">
                            <FormItem label = "账号" prop = "userName">
                                <input type="text" v-model = "form.userName"/>
                            </FormItem>
                        </Cell>
                        <Cell width = "6">
                            <FormItem label = "工号" prop = "workNo">
                                <input type="text" v-model = "form.workNo"/>
                            </FormItem>
                        </Cell>
                        <Cell width = "6">
                            <FormItem label = "工号" prop = "workNo">
                                <Select v-model = "form.sex" :datas = "select.sex"/>
                            </FormItem>
                        </Cell>

                    </template>
                </form-query>
            </Form>
        </Row>
    </div>
</template>

<script>
    import FormQuery from '@/components/form/FormQuery'
    export default {
        name: "User",
        components : {
            FormQuery
        },
        data(){
            return {
                form : {

                },
                select : {
                    sex : [
                        {title : '男',key:0},
                        {title : '女',key:1},
                    ]
                }
            }
        },
        methods : {
            search(){

            },
            reset(){

            }
        }
    }
</script>

<style scoped>

</style>