<template>
    <el-container direction="vertical" class="base-container">
        <HeaderBar/>
        <el-container class="main-container">
            <div class="menu-friend">
                <SideMenuBar/>
            </div>
            <div class="main-friend">
                <div class="friend-btn">
                    <el-button type="primary" @click="handleAdd(friendLink)">
                        <el-icon><Plus/></el-icon>新增
                    </el-button>
                </div>
                <el-table :data="friendLinkList.value"
                          border
                          style="width: 100%">
                    <el-table-column prop="linkId" label="ID" width="100"/>
                    <el-table-column label="头像" width="200">
                        <template #default="scope">
                            <el-avatar v-show="!scope.row.isEdit" :src="scope.row.avatar"></el-avatar>
                            <el-input v-show="scope.row.isEdit" v-model="scope.row.avatar"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="友链地址" width="300">
                        <template #default="scope">
                            <span v-show="!scope.row.isEdit">{{ scope.row.linkUrl }}</span>
                            <el-input v-show="scope.row.isEdit" v-model="scope.row.linkUrl"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="友链名称" width="200">
                        <template #default="scope">
                            <span v-show="!scope.row.isEdit">{{ scope.row.linkName }}</span>
                            <el-input v-show="scope.row.isEdit" v-model="scope.row.linkName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="creationDate" label="友链添加时间" width="180"/>
                    <el-table-column label="操作" fixed="right">
                        <template #default="scope">
                            <div v-show="!scope.row.isEdit">
                                <el-button @click="handleEdit(scope.row)">编辑</el-button>
                            </div>
                            <div v-show="scope.row.isEdit">
                                <el-button @click="addFriendLink(scope.row)" type="primary">保存</el-button>
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

import SideMenuBar from "@/components/SideMenuBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import {addFriendLink, friendLink, friendLinkList, selectFriendLink} from "@/store";
import {Plus} from "@element-plus/icons-vue";
import {onMounted} from "vue";

onMounted(() => {
    selectFriendLink()
})

const handleEdit = (row) => {
    row.isEdit = true
}

const handleCancel = (row) => {
    row.isEdit = false
    if (row.linkId === null || row.linkId === undefined) {
        friendLinkList.value.shift()
    }
}

const handleAdd = (row) => {
    row.isEdit = true
    friendLinkList.value.unshift(row)
}
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

.main-friend {
    margin-left: 2vw;
    margin-top: 5vh;
    width: 85vw;
    margin-bottom: 5vh;
    text-align: right;
}

.friend-btn {
    margin-bottom: 20px;
}
</style>