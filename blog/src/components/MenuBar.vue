<template>
    <!--pc端菜单-->
    <el-menu
            class="el-menu-blog-pc"
            :ellipsis="false"
            mode="horizontal"
            background-color="rgba(0, 0, 0, 0)"
            text-color="white"
            :router="true"
    >
        <el-menu-item/>
        <el-menu-item index="/" class="menu-item"><el-icon><Avatar/></el-icon>时光</el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item class="menu-item" @click="dialogVisible = true">
            <el-icon><Search/></el-icon>搜索
        </el-menu-item>
        <MenuList/>
    </el-menu>
    
    <!--弹出的搜索框-->
    <el-dialog
        v-model="dialogVisible"
        title="搜索标题"
        width="30%"
        @keyup.enter="searchKeyWord(keyWord);
                        dialogVisible = false;
                        searchVisible = true"
    >
        <el-input v-model="keyWord"/>
        <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary"
                           @click="searchKeyWord(keyWord);
                                    dialogVisible = false;
                                    searchVisible = true">
                  确认
                </el-button>
              </span>
        </template>
    </el-dialog>

    <!--ES搜索结果框-->
    <!--TODO:移动端的搜索框-->
    <el-dialog
            v-model="searchVisible"
            title="搜索的结果为："
            width="60%"
    >
        <el-table
                :data="searchArticleList.value"
                border
                style="width: 100%"
        >
            <el-table-column prop="articleTitle" label="文章标题"/>
            <el-table-column prop="categoryName" label="文章类型"/>
            <el-table-column prop="creationDate" label="创建日期"/>
            <el-table-column label="操作" fixed="right">
                <template #default="scope">
                    <el-button @click="queryArticleDetail(scope.row.articleId)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>

    <!--移动端菜单-->
    <el-menu
            class="el-menu-blog-mobile"
            :ellipsis="false"
            mode="horizontal"
            background-color="rgba(0, 0, 0, 0)"
            text-color="white"
            :router="true"
    >
        <el-menu-item/>
        <el-menu-item index="/" class="menu-item"><el-icon><Avatar/></el-icon>时光</el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item class="menu-item" @click="dialogVisible = true">
            <el-icon><Search/></el-icon>搜索
        </el-menu-item>
        <el-menu-item class="menu-item" @click="drawer = true">
            <el-icon><Menu/></el-icon>菜单
        </el-menu-item>
    </el-menu>

    <!--移动端的菜单抽屉-->
    <el-drawer v-model="drawer" title="菜单" :with-header="true" size="60%">
        <el-menu
            :router="true"
        >
            <MenuList/>
        </el-menu>
    </el-drawer>
</template>

<script setup>
import {
    Avatar,
    Menu,
    Search
} from "@element-plus/icons-vue";
import {ref} from "vue";
import MenuList from "@/components/MenuList.vue";
import {queryArticleDetail, searchArticleList, searchKeyWord} from "@/store";

//搜索框
const dialogVisible = ref(false)
const searchVisible = ref(false)
const keyWord = ref('')
const drawer = ref(false)

</script>

<style scoped>
@media screen and (min-device-width: 768px) {
    .el-menu-blog-mobile {
        display: none;
    }

    .el-menu-blog-pc {
        opacity: 1;
        filter: none;
        border-bottom: 0;
        margin-top: 5px;
    }
}

@media screen and (max-device-width: 768px) {
    .el-menu-blog-pc {
        display: none;
    }

    .el-menu-blog-mobile {
        opacity: 1;
        filter: none;
        border-bottom: 0;
        margin-top: 5px;
    }
}

.menu-item {
    font-size: 1rem;
    font-weight: bolder;
    line-height: 3rem;
}

.flex-grow {
    flex-grow: 1;
}

</style>