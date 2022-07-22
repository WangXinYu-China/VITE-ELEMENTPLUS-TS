<template>
    <div class="tableView">
        <el-table ref="Vtable" v-bind="$attrs" :data="tableData" border element-loading-text="拼命加载中...">
            <!-- 复选框 -->
            <el-table-column type="selection" width="55" v-if="multiple" align="center" :selectable="tableSelect"></el-table-column>
            <!-- 表体-非选择框、序号、操作列 -->
            <template v-for="(item,index) in tableHeader" :key="index">
                <el-table-column :label="item.columnName" show-overflow-tooltip>
                    <!-- 表头处理 -->
                    <template #header v-if="item.headerType!=='default'">
                        <div>{{ item.columnName }}</div>
                        <VHeaderSearch :headerData="item" :headerType="item.headerType"></VHeaderSearch>
                    </template>
                    <!-- 如需特殊处理，可通过插槽实现 -->
                    <template #default="props">
                        <slot :name="item.columnValue" :rowData="props.row" :rowIndex="props.$index">
                            {{ props.row[item.columnValue] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
            <!-- 设置 -->
            <el-table-column label="操作" align="center" fixed="right">
                <template #header>
                    <el-icon @click="toSettings"><Setting /></el-icon>
                </template>
                <!-- 如需特殊处理，可通过插槽实现 -->
                <template #default="props">
                    <slot name="opreate" :rowData="props.row" :rowIndex="props.$index"></slot>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import { getCurrentInstance, onMounted, reactive, toRefs, watch, nextTick } from 'vue'
import VHeaderSearch  from './components/v-header-search.vue'
export default {
    name: 'v-table',
    components: {
        VHeaderSearch
    },
    props: {
        /** 接口获取表格数据 */
        tablePropData: {
            type: Array,
            default: () => {
                return []
            }
        },
        /** 本地配置的表头信息 */
        tableHeader: {
            type: Array,
            default: () => {
                return []
            }
        },
        /** 表格拖拽功能是否启用 */
        setDraggableStart: {
            type: Boolean,
            default: false
        },
        /** 校验每行数据的选择可操作性 */
        disabledChecked: {
            type: Function,
            default: null
        },
        /** 复选功能是否开启 */
        multiple: {
            type: Boolean,
            default: false
        }
    },
    /** 需要调用父组件的方法注册 */
    emits: [ 'getNewDragTable' ],
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance() as any;
        /** reactive 数据需要在定义时明确 any 类型  */
        const state: any = reactive({
            tableData: []
        })
        onMounted(() => {
            if(props.setDraggableStart) {
                proxy.setDraggable();
            }
        })
        /** 
         * 符合BaseCase情景三 
         *      监听reactive定义的一个响应式数据
		 *		1.此处无法正确获取oldVal
		 *		2.强制开启深度监测（deep配置无效）
         */
        watch(() => props.tablePropData,(newVal) => {
            state.tableData = newVal;
        },{immediate:true})
        /*设置可拖拽*/
        const setDraggable = (value:any) => {
            const table = proxy.$refs.Vtable;
            let $data = proxy.tableData;
            const tbody = table.$el.querySelector('.el-table__body-wrapper tbody')
            const trArr = tbody.querySelectorAll('tr')
            let dragStartY = 0
            /*表格的每一行增加了拖拽属性,第几行*/
            if (trArr) {
                trArr.forEach((item:any, index:any) => {
                    item.setAttribute('draggable',value==='cancleDraggable'?false:true)
                    item.setAttribute('data-index', index)
                })
            }
            /*开始拖拽*/
            function dragstart(e:any) {
                proxy.debounce(() => {
                    dragStartY = e.screenY;
                }, 50)
            }
            /*结束拖拽*/
            function dragend(e:any) {
                /*结束拖拽的位置没有值*/
                if (!e.target) return
                const index = Number(e.target.dataset.index);
                const trHeight = e.target.offsetHeight || 33;
                proxy.debounce(() => {
                    const dVal = e.screenY - dragStartY;
                    const absVal = Math.abs(dVal);
                    let step = 0
                    /*拖拽高度大于行高*/
                    if (absVal >= trHeight) {
                        if (dVal > 0) {
                            /*向下进行拖拽*/
                            step = Math.floor(dVal / trHeight);
                            if (step >= $data.length - index) {
                                step = $data.length - index - 1
                            }
                        } else {
                            /*向上拖拽*/
                            step = Math.ceil(dVal / trHeight)
                            if (Math.abs(step) > index) {
                                step = index * -1
                            }
                        }
                        if (index === 0 && step <= 0) {
                            return
                        }
                        if (index === $data.length - 1 && step >= 0) {
                            return
                        }
                        /*向上移动step为负数，向下移动step为正数*/
                        /*调整表格的顺序tableData*/
                        if(step as any !==''){
                            /*行进行了移动*/
                            let newObj=$data[index];
                            let newTableData: any=[];
                            $data.map((item:any,subIndex:any)=>{
                                if(step>0){
                                    /*为正数，向下移动*/
                                    let newIndex=Number(index + Math.abs(step));//新移动到的index值 end
                                    if(subIndex===index){
                                        /*循环到拖拽开始值，此时循环的数据不存入*/
                                    }else if(subIndex===newIndex){
                                        /*当循环到结束拖拽的index时，此时存入要操作的数据*/
                                        newTableData.push(item)
                                        newTableData.push(newObj);
                                    }else{
                                        newTableData.push(item)
                                    }
                                }else if(step<0){
                                    /*为负数，向上移动*/
                                    let newIndex=Number(index - Math.abs(step));//新移动到的index值
                                    if(subIndex===newIndex){
                                        newTableData.push(newObj);//将要移入数据放到新数组中
                                        newTableData.push(item);//以前在新index上的数据，依次下移
                                    }else if(subIndex===index){
                                        /*当循环到移动初始索引值时，此时不向新数据存入数据*/
                                    }else{
                                        newTableData.push(item)
                                    }
                                }
                            });
                            proxy.tableData=JSON.parse(JSON.stringify(newTableData));
                            $data=JSON.parse(JSON.stringify(newTableData));
                            emit('getNewDragTable',newTableData);
                        }
                    }
                }, 50)
            }
            tbody.addEventListener('dragstart', dragstart)
            tbody.addEventListener('dragend', dragend);
        }
        /** 防抖函数   需剥离到公共工具类内 暂时放在此处 */
        const debounce = (fn:any, delay:any) => {
            clearTimeout(proxy.timer)
            proxy.timer = setTimeout(function() {
                fn()
            }, delay)
        }
        /** 表格设置复选框是否可以勾选---是否禁用 */
        const tableSelect = (row: any,index: any) => {
            if(proxy.disabledChecked){
                return proxy.disabledChecked(row,index)
            }else{
                return true;
            }
        }
        /** 重新生成table布局 */
        const dolayout = () => {
            nextTick(()=>{
                proxy.$refs.Vtable.doLayout();
            })
        }
        /** 清空表格选择项 */
        const clearSelected = () => {
            nextTick(()=>{
                proxy.$refs.Vtable.clearSelection();
            })
        }
        /** 点击表格设置 */
        const toSettings = () => {
            console.log("点击表格设置")
        }
        return {
            ...toRefs(state),
            tableSelect,
            debounce,
            setDraggable,
            dolayout,
            clearSelected,
            toSettings
        }
    }
}
</script>
<style lang="scss" scoped></style>