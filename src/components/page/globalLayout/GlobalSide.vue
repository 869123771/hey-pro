<template>
    <div class="app-menu">
        <logo></logo>
        <Menu
                ref='menu'
                :datas="permissionList"
                :inlineCollapsed="layoutConfig.sideCollapsed"
                :className="`h-menu-${theme}`"
                :option="{titleName:'title',keyName : 'id'}"
                @click="trigger"
        >
        </Menu>
        <div class="app-menu-mask" @click="hideMenu"></div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Logo from './globalSide/Logo'

    export default {
        name: "GlobalSide",
        components: {
            Logo
        },
        props: {
            theme: String
        },
        data() {
            return {}
        },
        computed: {
            ...mapState({
                layoutConfig: ({app}) => app.layoutConfig,
                permissionList: ({user}) => user.permissionList
            })
        },
        watch: {
            $route: {
                handler: 'menuSelect',
                immediate: true
            }
        },
        methods: {
            menuSelect() {
                let {meta:{id}} = this.$route
                if (id) {
                    this.$nextTick(() => {
                        this.$refs.menu.select(id);
                    })
                }
            },
            trigger(data) {
                if (data.children.length) return;
                this.$router.push({path: `/${data.value.fullUrl}`});
            },
            hideMenu() {
                this.$store.commit('updateSiderCollapse', true);
            }
        }
    }
</script>

<style scoped lang="less">
    .app-menu {
        /deep/ .h-menu {
            font-size: 14px;

            .h-menu-li-selected {
                .h-menu-show:after {
                    width: 4px;
                }
            }

            > li > .h-menu-show {
                font-size: 15px;

                .h-menu-show-icon {
                    font-size: 20px;
                }

                .h-menu-show-desc {
                    transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
            }
        }

        /deep/ .h-menu.h-menu-size-collapse > .h-menu-li > .h-menu-show {
            padding-left: 24px;

            .h-menu-show-icon {
                font-size: 20px;
            }
        }

        /deep/ .h-menu.h-menu-white {
            color: rgb(49, 58, 70);
        }

    }
</style>