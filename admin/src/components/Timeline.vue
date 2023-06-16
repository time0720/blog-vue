<template>
    <!--后台首页-->
    <el-container direction="vertical" class="base-container">
        <HeaderBar/>
        <el-container class="main-container">
            <div>
                <SideMenuBar/>
            </div>
            <div class="timeline-container">
                <!--评论列表-->
                <div class="timeline-btn">
                    <el-button type="primary" @click="handleAdd(activity)">
                        <el-icon><Plus/></el-icon>新增
                    </el-button>
                </div>
                <el-table :data="activityList.value"
                          border
                          style="width: 100%">
                    <el-table-column prop="activityId" label="时间线ID" width="100"/>
                    <el-table-column label="内容" width="450">
                        <template #default="scope">
                            <span v-show="!scope.row.isEdit">{{ scope.row.content }}</span>
                            <el-input v-show="scope.row.isEdit" v-model="scope.row.content"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间戳" width="180">
                        <template #default="scope">
                            <span v-show="!scope.row.isEdit">{{ scope.row.timestamp }}</span>
                            <div v-show="scope.row.isEdit">
                                <el-date-picker
                                        v-model="scope.row.timestamp"
                                        type="date"
                                        :size="'default'"
                                        format="YYYY/MM/DD"
                                        value-format="YYYY-MM-DD"
                                        style="width: 160px"
                                />
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="size" label="尺寸" width="70"/>
                    <el-table-column label="颜色" width="100">
                        <template #default="scope">
                            <span v-show="!scope.row.isEdit">{{ scope.row.color }}</span>
                            <div v-show="scope.row.isEdit">
                                <el-color-picker v-model="scope.row.color" :predefine="predefineColors"/>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="百分比" width="70">
                        <template #default="scope">
                            <span v-show="!scope.row.isEdit">{{ scope.row.percentage }}</span>
                            <el-input v-show="scope.row.isEdit" v-model="scope.row.percentage"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template #default="scope">
                            <div v-show="!scope.row.isEdit">
                                <el-button @click="handleEdit(scope.row)">编辑</el-button>
                            </div>
                            <div v-show="scope.row.isEdit">
                                <el-button @click="saveArticle(scope.row)" type="primary">保存</el-button>
                                <el-button @click="handleCancel(scope.row)">取消</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-container>
    </el-container>
</template>

<script setup>

import HeaderBar from "@/components/HeaderBar.vue";
import SideMenuBar from "@/components/SideMenuBar.vue";
import {onMounted, ref} from "vue";
import {activity, activityList, saveArticle, selectAllActivities} from "@/store";
import {Plus} from "@element-plus/icons-vue";

onMounted(() => {
    selectAllActivities()
})

const handleEdit = (row) => {
    row.isEdit = true
}

const handleCancel = (row) => {
    row.isEdit = false
}

const handleAdd = (row) => {
    row.isEdit = true
    activityList.value.unshift(row)
}

const predefineColors = ref([
    '#909399',
    '#e6a23c',
    '#0bbd87'
])
</script>

<style scoped>
.base-container {
    background-color: #FFFFFF;
    min-width: 100vw;
    min-height: 100vh;
}

.main-container {
    width: 95vw;
}

.timeline-container {
    margin-left: 2vw;
    margin-top: 10vh;
    width: 85vw;
    margin-bottom: 5vh;
    text-align: right;
}

.timeline-btn {
    margin-bottom: 20px;
}

</style>