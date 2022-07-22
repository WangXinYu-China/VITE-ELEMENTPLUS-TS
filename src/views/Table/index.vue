<template>
    <div class="table-page">
        <div>
            <el-button size="small" @click="insert">新增</el-button>
            <el-button size="small">编辑</el-button>
            <el-button size="small" @click="deleteTeacher">删除</el-button>
        </div>
        <vTable
            stripe
            border
            element-loading-text="拼命加载中..."
            highlight-current-row
            :tablePropData="tableData"
            :tableHeader="tableHeader"
            :setDraggableStart="true"
            :disabledChecked="disabledChecked"
            :multiple="true"
            @getNewDragTable="getNewDragTable"
        >
            <template v-slot:opreate="{ rowData, rowIndex }">
                <el-button @click="praise(rowData.no)" size="small">好评</el-button>
                <el-button @click="criticize(rowData.no)" size="small">差评</el-button>
                <el-button @click="deleteTeacher(rowData.no)" size="small">删除</el-button>
            </template>
        </vTable>
    </div>
</template> 

<script lang="ts">
import vTable from "@/components/Table/index.vue"; 
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
import * as requestApi from "@/api/test/index.ts"
export default {
    components: {
        vTable
    },
    setup() {
        const { proxy } = getCurrentInstance() as any;
        const state = reactive({
            tableData: [
                
            ],
            tableHeader: [
                {
                    columnValue: "no",columnName:"教师编号",headerType: "default"
                },{
                    columnValue: "name",columnName:"教师姓名",headerType: "default"
                },{
                    columnValue: "sex",columnName:"性别",headerType: "default"
                },{
                    columnValue: "birth",columnName:"生日",headerType: "default"
                },{
                    columnValue: "intro",columnName:"教师简介",headerType: "default"
                },{
                    columnValue: "photo",columnName:"照片",headerType: "default"
                },{
                    columnValue: "goodCount",columnName:"好评数量",headerType: "default"
                },{
                    columnValue: "badCount",columnName:"差评数量",headerType: "default"
                },{
                    columnValue: "subject",columnName:"所属学科",headerType: "default"
                }
            ],
            svgBox: 50
        });
        onMounted(() => {
            getTeacherList();
        })
        /**
         * 表格拖拽结束后执行
         * @params val 拖拽结束后的表格数据
         */
        const getNewDragTable = (val: any) => {
            proxy.tableData=JSON.parse(JSON.stringify(val))
        }
        /**
         * 判断表格各行的选择框是否可用
         * @params row 表格内的每一行
         * @params index 每一行的索引值
         * @returns Boolean true 可进行选择操作 false 选择被禁用
         */
        const disabledChecked = (row: any,index: any) => {
            if(index%2===0) {
                return false;
            }else {
                return true;
            }
        }
        /**
         * 教师列表查询
         */
        const getTeacherList = () => {
            let params = {
                sno: "7"
            };
            requestApi.getTeacherListApi(params).then((res: any) => {
                console.log("获取教师列表-接口返回", res.teacher_list);
                if(res.result === 0) {
                    proxy.tableData = res.teacher_list;
                }
            }).catch((error: any) => {
                console.log("获取教师列表-接口报错", error);
            })
        }
        /**
         * 好评函数
         * @param tno 教师编码
         */
        const praise = (tno: any) => {
            let params = {
                tno: tno
            }
            requestApi.praiseTeacherApi(params).then((res: any) => {
                console.log("好评成功返回",res);
                getTeacherList();
            }).catch(() => {
                console.log("好评失败")
            })
        }
        /**
         * 差评函数
         * @param tno 教师编码
         */
        const criticize = (tno: any) => {
            let params = {
                tno: tno
            }
            requestApi.criticizeTeacherApi(params).then((res: any) => {
                console.log("差评成功返回",res);
                getTeacherList();
            }).catch(() => {
                console.log("差评失败")
            })
        }
        /**
         * 新增教师
         */
        const insert = () => {
            let params = {};
            requestApi.insertTeacherApi(params).then((res: any) => {
                console.log("新增成功");
                getTeacherList();
            }).catch(() => {
                console.log("新增失败");
            })
        }
        /**
         * 删除教师
         */
        const deleteTeacher = (tno: any) => {
            let params = {
                tno: tno
            };
            requestApi.deleteTeacherApi(params).then((res: any) => {
                console.log("删除成功");
                getTeacherList();
            }).catch(() => {
                console.log("删除失败");
            })
        }
        return {
            ...toRefs(state),
            getNewDragTable,
            disabledChecked,
            getTeacherList,
            praise,
            criticize,
            insert,
            deleteTeacher
        }
    }
}
</script>

<style lang="scss" scoped>
.table-page {
    padding: 20px;
    background: white;
    border-radius: 5px;
}
</style>

