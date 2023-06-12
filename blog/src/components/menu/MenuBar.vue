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
        <el-menu-item class="menu-item" @click="loginVisible = true" v-show="!userInfoVisible">
            <el-icon><Avatar/></el-icon>登录
        </el-menu-item>
        <el-menu-item class="menu-item" v-show="userInfoVisible">
            <el-dropdown trigger="click">
                <el-avatar :src="avatar"></el-avatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <el-avatar :src="avatar"></el-avatar>&nbsp;&nbsp;&nbsp;&nbsp;
                            <div>
                                <el-row>
                                    <span style="font-size: 1rem">{{userName}}</span>
                                </el-row>
                                <el-row>
                                    <span style="font-size: 1rem">{{nickName}}</span>
                                </el-row>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item :icon="Message">
                            <span style="font-size: 1rem">{{email}}</span>
                        </el-dropdown-item>
                        <el-dropdown-item :icon="User" @click="userInfo" style="color: darkblue">
                            个人中心
                        </el-dropdown-item>
                        <el-dropdown-item divided :icon="Setting" @click="confirmExit" style="color: red">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item class="menu-item" @click="dialogVisible = true">
            <el-icon><Search/></el-icon>搜索
        </el-menu-item>
        <MenuList/>
    </el-menu>

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
        <el-menu-item class="menu-item" @click="loginVisible = true" v-show="!userInfoVisible">
            <el-icon><Avatar/></el-icon>登录
        </el-menu-item>
        <el-menu-item class="menu-item" v-show="userInfoVisible">
            <el-dropdown trigger="click">
                <el-avatar :src="avatar"></el-avatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <el-avatar :src="avatar"></el-avatar>&nbsp;&nbsp;&nbsp;&nbsp;
                            <div>
                                <el-row>
                                    <span style="font-size: 1rem">{{userName}}</span>
                                </el-row>
                                <el-row>
                                    <span style="font-size: 1rem">{{nickName}}</span>
                                </el-row>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item :icon="Message">
                            <span style="font-size: 1rem">{{email}}</span>
                        </el-dropdown-item>
                        <el-dropdown-item :icon="User" @click="userInfo" style="color: darkblue">
                            个人中心
                        </el-dropdown-item>
                        <el-dropdown-item divided :icon="Setting" @click="confirmExit" style="color: red">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item class="menu-item" @click="dialogVisible = true">
            <el-icon><Search/></el-icon>搜索
        </el-menu-item>
        <el-menu-item class="menu-item" @click="drawer = true">
            <el-icon><Menu/></el-icon>菜单
        </el-menu-item>
    </el-menu>

    <!--弹出的登录框-->
    <el-dialog
            v-model="loginVisible"
            title="登录时光的blog"
            @keyup.enter="submitForm"
            :width="loginDialogWidth"
            center
    >
        <el-divider><el-avatar src="https://time7.top:9000/blog/web_head.jpg"></el-avatar></el-divider>
        <br>
        <el-form :model="userForm" label-position="right" label-width="60px" size="large">
            <el-form-item label="用户名:">
                <el-input v-model="userForm.userName" type="text"/>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input v-model="userForm.password" type="password"/>
            </el-form-item>
        </el-form>
        <div class="dialog-content">
            <p>还没有账号？注册一个吧～</p>
            <el-link type="primary" @click="register;loginVisible = false;registerVisible = true">
                注册新账号
            </el-link>
        </div>
        <template #footer>
              <span class="dialog-footer">
                <el-button @click="loginVisible = false">取消</el-button>
                <el-button type="primary"
                           @click="submitForm">
                  登录
                </el-button>
              </span>
        </template>
    </el-dialog>

    <!--弹出的注册框-->
    <el-dialog
            v-model="registerVisible"
            title="注册"
            @keyup.enter="submitForm"
            :width="loginDialogWidth"
            center
    >
        <el-divider><el-avatar src="https://time7.top:9000/blog/web_head.jpg"></el-avatar></el-divider>
        <br>
        <el-form :model="registerForm" label-position="right" label-width="80px" size="large">
            <el-form-item label="用户名:">
                <el-input v-model="registerForm.userName" type="text"/>
            </el-form-item>
            <el-form-item label="密码:">
                <el-input v-model="registerForm.password" type="password"/>
            </el-form-item>
            <el-form-item label="确认密码:">
                <el-input v-model="registerForm.confirmPassword" type="password"/>
            </el-form-item>
            <el-form-item label="邮箱:">
                <el-row>
                    <el-col :span="20">
                        <el-input v-model="registerForm.email" type="text"/>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="send" :disabled="sendabled">
                            {{sendText}}
                        </el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="验证码:">
                <el-input v-model="inputCode" type="text"/>
            </el-form-item>
        </el-form>
        <template #footer>
              <span class="dialog-footer">
                <el-button @click="registerVisible = false">取消</el-button>
                <el-button type="primary"
                           @click="registerUser(inputCode)">
                  注册
                </el-button>
              </span>
        </template>
    </el-dialog>
    
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
    Menu, Message,
    Search, Setting, User
} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import MenuList from "@/components/menu/MenuList.vue";
import {
    getUserInfo, inputCode, logoutForm,
    queryArticleDetail,
    registerForm,
    registerUser,
    searchArticleList,
    searchKeyWord, sendEmail,
    submitForm, userDetailsDTO,
    userForm, userInfoVisible
} from "@/store";
import {ElMessageBox} from "element-plus";
import router from "@/router";

const sendabled = ref(false)
let sendText = ref('')
let timer = ref(0)
setInterval(() => {
    if (timer.value > 0) {
        sendText.value = timer.value + 's'
        sendabled.value = true
        timer.value--
    } else {
        sendText.value = '发送'
        sendabled.value = false
    }
}, 1000)
const send = async () => {
    let countFlag = ref(false)
    await sendEmail().then(res => countFlag.value = res)
    if (!countFlag) {
        timer.value = 60
    }
}


//登录框
const loginDialogWidth = ref('')
if (document.body.clientWidth > 768) {
    loginDialogWidth.value = '28%'
} else {
    loginDialogWidth.value = '99%'
}

//搜索框
const dialogVisible = ref(false)
const searchVisible = ref(false)
const loginVisible = ref(false)
const registerVisible = ref(false)
const keyWord = ref('')
const drawer = ref(false)

// 用户信息
let avatar = ref('')
let userName = ref('')
let nickName = ref('')
let email = ref('')
onMounted(async () => {
    await getUserInfo()
    if (userDetailsDTO.value !== undefined) {
        let userInfo = userDetailsDTO.value.user
        avatar.value = userInfo.avatar
        userName.value = userInfo.userName
        nickName.value = userInfo.nickName
        email.value = userInfo.email
    }
})

const confirmExit = () => {
    ElMessageBox.confirm(
        '确定退出登录吗？',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        logoutForm()
    })
}

const userInfo = () => {
    router.push({name: 'userInfo'})
}

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

.dialog-content {
    display: flex;
    justify-content: center;
    align-self: center;
}


</style>