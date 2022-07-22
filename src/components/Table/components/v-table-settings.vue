<template>
    <el-dialog v-model="isShowSearch" width="300px" destroy-on-close :modal="false" fullscreen :show-close="false">
        <div class="setting">
            <el-table style="width: 100%;" height="400Px" border :data="dialogTableData"  :highlight-current-row='true' ref="multipleTable"
            @row-click='clickRow' @select="handleSelect" @select-all="handleSelectAll">
                <el-table-column
                    type="selection"
                    width="55"
                    :selectable="checkboxT"
                    align="center"
                    >
                </el-table-column>
                <template v-for="(item,index) in dialogTableHeader">
                    <el-table-column :prop="item.column_name" align="center" :label="item.column_comment" :key="index" v-if="item.column_name === 'column_name'">
                    </el-table-column>
                    <el-table-column :prop="item.column_name" align="center" :label="item.column_comment" :key="index" v-else-if="item.column_name === 'columnWidth'">
                        <template #default="props">
                            <el-input v-model.trim="props.row.columnWidth" size="mini" placeholder="建议列宽120-140"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :prop="item.column_name" align="center" :label="item.column_comment" :key="index" v-else>
                    </el-table-column>
                </template>
            </el-table>
            <div class="setting-btn">
                <el-row>
                    <el-button  size="mini" @click="upload()" >
                        <svg-icon class-name="international-icon" icon-class="topTab" />
                        上移
                    </el-button>
                </el-row>
                <el-row>
                    <el-button   size="mini"  @click="download()">
                        <svg-icon class-name="international-icon" icon-class="bottomTab" />
                        下移
                    </el-button>
                </el-row>
                <el-row>
                    <el-button  size="mini"  @click="placeTop()">
                        <svg-icon class-name="international-icon" icon-class="upload2" />
                        置顶
                    </el-button>
                </el-row>
            </div>
        </div>
        <template #footer class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="updatePageSet" size="small" :loading="loadingBtn">确 定</el-button>
        </template>
    </el-dialog>
</template>