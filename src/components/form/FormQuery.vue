<template>
    <div>
        <slot name = "show"></slot>
        <div v-show = "show.collapse">
            <slot name = "hide"></slot>
        </div>
        <div class = "inline-block pl-4 mb-3">
            <button class = "h-btn h-btn-primary h-icon-search" @click="$emit('search')">查询</button>
            <button class = "h-btn h-icon-refresh" @click="$emit('reset')">重置</button>
            <span class="cursor-pointer inline-block text-blue-500 pl-2" @click="arrowClick">
                <span v-if="!show.collapse">
                    <span>展开</span>
                    <i class="h-icon-down pl-1"></i>
                </span>
                <span v-else>
                    <span>收起</span>
                    <i class="h-icon-top pl-1"></i>
                </span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormQuery",
        data() {
            return {
                show: {
                    collapse: false
                }
            }
        },
        props: {
            queryPad: {
                default: '40px'
            }
        },
        methods: {
            arrowClick() {
                let {collapse} = this.show
                this.show = {
                    ...this.show,
                    collapse: !collapse
                }
            },
        }
    }
</script>

<style scoped>

</style>