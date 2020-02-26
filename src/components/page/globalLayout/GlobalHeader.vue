<template>
    <div class="app-header">
        <div class="float-left">
            <Button
                    :icon="layoutConfig.sideCollapsed ? 'fas fa-indent':'fas fa-outdent'"
                    no-border
                    text
                    class="text-xl"
                    @click="layoutConfig.sideCollapsed=!layoutConfig.sideCollapsed">
            </Button>
        </div>
        <div class="float-right app-header-info">
            <AutoComplete
                    :showDropdownWhenNoResult="false"
                    v-model="searchText"
                    placeholder="全局搜索..">
            </AutoComplete>
            <Message></Message>
            <div class="float-left app-header-org">
                <Select
                        v-model="currentOrganization"
                        :datas="organizationList"
                        :no-border="true"
                        :equal-width="false"
                        :null-option="false"
                        keyName="id"
                        titleName="name"
                        type="object"
                        @change="changeOrganization"
                >
                </Select>
            </div>
            <!--<div class="app-header-icon-item" v-tooltip content="GitHub" theme="white">
                <i class="h-icon-github"></i>
            </div>
            <div class="app-header-icon-item" v-tooltip content="教学文档" theme="white">
                <i class="h-icon-help"></i>
            </div>-->
            <DropdownMenu
                    className="app-header-dropdown"
                    trigger="hover"
                    offset="0,5"
                    :width="150"
                    placement="bottom-end"
                    :datas="infoMenu"
                    @onclick="trigger"
            >
                <Avatar :src="userInfo.avatar" :width="30"><span>{{userInfo.name}}</span></Avatar>
            </DropdownMenu>
            <div class="app-header-icon-item" v-tooltip content="系统布局配置" theme="white" @click="showSettingModal">
                <i class="fas fa-ellipsis-v" @click="$emit('showModal')"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex';
    import Message from "./globalHeader/Message";

    export default {
        name: "GlobalHeader",
        components: {
            Message
        },
        props: {
            layoutConfig: {
                type: Object
            }
        },
        data() {
            return {
                searchText: '',
                infoMenu: [
                    {key: 'info', title: '个人信息', icon: 'h-icon-user'},
                    {key: 'logout', title: '退出登录', icon: 'h-icon-outbox'}
                ]
            };
        },
        computed: {
            ...mapState({
                userInfo: ({user}) => user.userInfo,
                currentOrganization: ({user}) => user.currentOrganization,
                organizationList: ({user}) => user.organizationList
            })
        },
        methods: {
            ...mapMutations({
                setCurrentOrganization: 'SET_CURRENT_ORGANIZATION'
            }),
            ...mapActions({
                loginOut: 'LOGIN_OUT'
            }),
            changeOrganization(currentOrganization) {
                this.setCurrentOrganization(currentOrganization)
            },
            listenResize() {
                let {sideCollapsed} = this.layoutConfig
                let windowWidth = window.innerWidth;
                const resizeEvent = window.addEventListener('resize', () => {
                    if (windowWidth == window.innerWidth) {
                        return;
                    }
                    if (sideCollapsed && window.innerWidth > 900) {
                        this.layoutConfig.sideCollapsed = false;
                    } else if (!sideCollapsed && window.innerWidth < 900) {
                        this.layoutConfig.sideCollapsed = true;
                    }
                    windowWidth = window.innerWidth;
                });
                this.$once('hook:beforeDestroy', () => {
                    window.removeEventListener('resize', resizeEvent);
                });
                window.dispatchEvent(new Event('resize'));
            },
            trigger(key) {
                switch (key) {
                    case 'logout' :
                        this.loginOut();
                        break
                }
            },
            showSettingModal() {

            },
        },
        mounted() {
            this.listenResize();
        }
    }
</script>

<style scoped lang="less">
    .app-header {
        color: rgba(49, 58, 70, 0.8);

        /deep/ .h-autocomplete {
            line-height: 1.5;
            float: left;
            margin-top: 15px;
            margin-right: 20px;
            width: 120px;

            &-show, &-show:hover, &-show.focusing {
                outline: none;
                box-shadow: none;
                border-color: transparent;
                border-radius: 0;
            }

            &-show.focusing {
                border-bottom: 1px solid #eee;
            }
        }

        /deep/ &-info &-icon-item {
            cursor: pointer;
            display: inline-block;
            float: left;
            padding: 0 15px;
            height: @layout-header-height;
            line-height: @layout-header-height;
            margin-right: 10px;

            &:hover {
                background: @hover-background-color;
            }

            i {
                font-size: 18px;
            }

            a {
                color: inherit;
            }

            .h-badge {
                margin: 20px 0;
                display: block;
            }
        }

        .h-dropdownmenu {
            float: left;
        }

        /deep/ &-dropdown {
            float: right;
            margin-left: 10px;
            padding: 0 20px 0 15px;

            .h-icon-down {
                right: 20px;
            }

            cursor: pointer;

            &:hover, &.h-pop-trigger {
                background: @hover-background-color;
            }

            &-dropdown {
                padding: 5px 0;

                .h-dropdownmenu-item {
                    padding: 8px 20px;
                }
            }
        }

        /deep/ &-org {
            cursor: pointer;

            div, i {
                cursor: pointer;
            }

            &:hover {
                background: @hover-background-color;
            }
        }

        /deep/ &-menus {
            display: inline-block;
            vertical-align: top;

            > div {
                display: inline-block;
                font-size: 15px;
                padding: 0 25px;
                color: @dark-color;

                &:hover {
                    color: @primary-color;
                }

                + div {
                    margin-left: 5px;
                }

                &.h-tab-selected {
                    color: @white-color;
                    background-color: @primary-color;
                }
            }
        }
    }
</style>