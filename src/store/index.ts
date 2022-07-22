import { createStore } from 'vuex'

const defaultState = {
    count: 0,
    /** 暂不分模块 */
    tagsList: [],
    collapse: false
}

// Create a new store instance.
export default createStore({
    state() {
        return defaultState
    },
    mutations: {
        increment(state: typeof defaultState) {
            state.count++
        },
        /** 暂不分模块 */
        delTagsItem(state: any, data) {
            state.tagsList.splice(data.index, 1);
        },
        setTagsItem(state, data) {
            state.tagsList.push(data)
        },
        clearTags(state) {
            state.tagsList = []
        },
        closeTagsOther(state, data) {
            state.tagsList = data;
        },
        closeCurrentTag(state, data) {
            for (let i = 0, len = state.tagsList.length; i < len; i++) {
                const item = state.tagsList[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        data
                            .$router
                            .push(state.tagsList[i + 1].path);
                    } else if (i > 0) {
                        data
                            .$router
                            .push(state.tagsList[i - 1].path);
                    } else {
                        data
                            .$router
                            .push("/");
                    }
                    state
                        .tagsList
                        .splice(i, 1);
                    break;
                }
            }
        },
        // 侧边栏折叠
        handleCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    },
    getters: {
        double(state: typeof defaultState) {
            return 2 * state.count
        }
    }
})