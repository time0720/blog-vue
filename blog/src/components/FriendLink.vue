<template>
    <el-container direction="vertical">
        <div class="friend-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
            <!--背景图片和字体-->
            <div class="friend-bg">
                <h1>友链</h1>
            </div>
        </div>
        <el-container class="friend-main">
            <div class="friend-content">
                <el-card>
                    <el-row gutter="20">
                        <el-col :span="8"
                                class="friend-col"
                                v-for="friend in friendLinkList.value"
                        >
                            <el-card>
                                <el-row>
                                    <el-col :span="8">
                                        <el-avatar
                                                size="large"
                                                class="friend-link"
                                                :src="friend.avatar"
                                                @click="gotoFriend(friend.linkUrl)"
                                        />
                                    </el-col>
                                    <el-col :span="16"
                                            class="friend-link"
                                            @click="gotoFriend(friend.linkUrl)"
                                    >
                                        {{friend.linkName}}
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>

            </div>
            <div id="friend-card">
                <AsideBar/>
            </div>
        </el-container>
    </el-container>
</template>

<script setup>

import MenuBar from "@/components/menu/MenuBar.vue";
import AsideBar from "@/components/AsideBar.vue";
import {onMounted} from "vue";
import {friendLinkList, selectFriendLink} from "@/store";
import {ElMessage} from "element-plus";


onMounted(() => {
    selectFriendLink()
    openHTML()
})

const openHTML = () => {
    ElMessage({
        dangerouslyUseHTMLString: true,
        message: '<h2>友链添加请留言：</h2>' +
            '<p>1.头像url; 2.友链地址; 3.友链名称</p>',
        type: "info",
        duration: 10000,
        showClose: true,
        offset: 300
    })
}

const gotoFriend = (linkUrl) => {
    window.open(linkUrl)
}
</script>

<style scoped>
@media screen and (min-device-width: 768px) {
    .friend-main {
        background-image: url("https://time7.top:9000/blog/white_snow.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }

    .friend-header {
        background-image: url("https://time7.top:9000/blog/animal.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 45vh;
    }

    #friend-card {
        width: 20%;
        margin-bottom: 20px;
        margin-right: 8vw;
    }

    .friend-content {
        width: 70%;
        margin-top: 20px;
        margin-left: 8vw;
        margin-right: 10px;
    }

}

@media screen and (max-device-width: 768px) {
    .friend-main {
        background-image: url("https://time7.top:9000/blog/white_snow.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
    }

    .friend-header {
        background-image: url("https://time7.top:9000/blog/animal.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 30vh;
    }

    .friend-content {
        width: 100vw;
    }
}

.friend-bg {
    color: white;
    text-align: center;
    margin-top: 5%;
    font-size: 30px;
}

.friend-col {
    margin-bottom: 20px;
}

.friend-link {
    display: flex;
    align-self: center;
    font-size: 1.2rem;
    cursor: pointer;
}

.friend-link:hover {
    color: #409EFF;
}
</style>