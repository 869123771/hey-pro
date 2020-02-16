<template>
    <DropdownCustom
            class="header-message"
            placement="bottom-end"
            className="app-message-dropdown"
            :toggleIcon="false"
            ref="messageDropdown"
    >
        <div class="app-header-icon-item">
            <Badge :count="msgCount">
                <i class="h-icon-bell"></i>
            </Badge>
        </div>
        <div slot="content">
            <div class="h-panel">
                <div class="h-panel-bar h-panel-bar-s">
                    <span class="h-panel-title">消息</span>
                </div>
                <div class="message-list-container common-list-container">
                    <div class="common-list-item" v-for="m of messageList" :key="m.id" @click="goMessageDetail(m)"
                         :class="{readed: m.isReaded, unReaded: !m.isReaded}">
                        <div class="common-list-meta">
                            <p class="title">{{m.title}}</p>
                            <p class="description">{{m.description}}</p>
                        </div>
                    </div>
                </div>
                <div v-if="messageList.length" class="text-center h-panel-bar"><span class="link">查看更多</span></div>
            </div>
        </div>
    </DropdownCustom>
</template>

<script>
    export default {
        name: "Message",
        data() {
            return {
                msgCount: 3,
                messageList: [{
                    'id': 1,
                    'isReaded': false,
                    'title': '任务名称1',
                    'description': '你需要在某年某月完成某某任务'
                }, {
                    'id': 2,
                    'isReaded': false,
                    'title': '任务名称2',
                    'description': '你需要在某年某月完成某某任务'
                }, {
                    'id': 3,
                    'isReaded': true,
                    'title': '任务名称3',
                    'description': '你需要在某年某月完成某某任务'
                }, {
                    'id': 4,
                    'isReaded': true,
                    'title': '任务名称4',
                    'description': '你需要在某年某月完成某某任务'
                }, {
                    'id': 5,
                    'isReaded': true,
                    'title': '任务名称5',
                    'description': '你需要在某年某月完成某某任务'
                }]
            }
        },
        methods: {
            goMessageDetail() {

            }
        }
    }
</script>

<style scoped lang="less">
    .header-message {
        float: left;
        margin-right: 15px;

        /deep/ .h-dropdowncustom-show {
            height: @layout-header-height;

            .app-header-icon-item {
                margin-right: 0;
            }

            &.h-pop-trigger {
                background: @hover-background-color;
            }
        }
    }

    .app-message-dropdown-dropdown-container {
        width: 300px;
        min-height: 300px;

        .message-list-container {
            .common-list-item {
                cursor: pointer;
                padding: 0px 25px;
                border-bottom: 1px solid #eee;
                display: flex;
                &:hover {
                    background: @hover-background-color;
                }

                .description {
                    font-size: 13px;
                    color: @gray-color;
                    margin: 8px 0;
                }

                .title {
                    position: relative;
                    margin: 8px 0;
                }

                &.readed {
                    color: @gray-color;
                }

                &.unReaded .title:before {
                    content: '';
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    background: @red-color;
                    border-radius: 5px;
                    left: -10px;
                    top: 5px;
                }
            }
        }
    }
</style>