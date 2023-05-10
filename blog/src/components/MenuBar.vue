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
        <el-menu-item index="#" class="menu-item" @click="dialogVisible = true">
            <el-icon><Search/></el-icon>搜索
        </el-menu-item>
        <MenuList/>
    </el-menu>
    <el-dialog
        v-model="dialogVisible"
        title="搜索标题"
        width="30%"
    >
        <el-input v-model="keyWord"/>
        <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="searchKeyWord">
                  确认
                </el-button>
              </span>
        </template>
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
        <el-menu-item index="#" class="menu-item" @click="dialogVisible = true">
            <el-icon><Search/></el-icon>搜索
        </el-menu-item>
        <el-menu-item class="menu-item" @click="drawer = true">
            <el-icon><Menu/></el-icon>菜单
        </el-menu-item>
    </el-menu>

    <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="60%">
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

//搜索框
const dialogVisible = ref(false)
const keyWord = ref('')
const searchKeyWord = () => {
    console.log(keyWord.value)
}

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