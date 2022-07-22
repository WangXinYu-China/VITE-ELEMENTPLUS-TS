<template>
    <div class="v-header-search">
        <div class="search-input" v-if="headerType==='input'">
            <el-input v-model.trim="value" size="default" placeholder="输入关键字"></el-input>
        </div>
        <div class="search-input" v-if="headerType==='select'">
            <el-select v-model="value" placeholder="请选择" clearable size="default">
                <el-option
                    v-for="(item,index) in 4"
                    :key="index"
                    :label="item"
                    :value="index">
                </el-option>
            </el-select>
        </div>
    </div>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue'
export default {
    name: 'v-header-search',
    props: {
        /** 表头类型 */
        headerType: {
            type: String,
            default: ''
        },
        /** 表头数据 */
        headerData: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    setup() {
        const state:any = reactive({
            /** 表头输入框or选择框绑定的value值 */
            value: ''
        })
        return {
            ...toRefs(state)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
