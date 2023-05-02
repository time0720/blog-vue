<template>
    <!--后台文章编辑器-->
    <el-container direction="vertical" class="base-container">
        <div class="header-blog">
            <h1 class="title-blog">再写一篇吧~</h1>
        </div>
        <el-container class="main-container">
            <!--侧边菜单栏-->
            <div>
                <SideMenuBar/>
            </div>
            <!--md-editor-v3-->
            <div class="article-editor">
                <div class="editor-btn">
                    <el-button type="success" @click="saveArticle">保存</el-button>
                    <el-button type="danger" @click="cancelEdit">取消</el-button>
                </div>
                <el-row style="height: 2rem" class="row-title">
                    <el-col :span="2.5" style="height: 2rem">
                        文章标题：
                    </el-col>
                    <el-col :span="10">
                        <el-input style="width: 500px; height: 2rem; font-size: 1rem" v-model="articleInfo.articleTitle" type="text"/>
                    </el-col>
                </el-row>
                <br>
                <el-row style="height: 2rem" class="row-title">
                    <el-col :span="2.5" style="height: 2rem">
                        文章类型：
                    </el-col>
                    <el-col :span="10">
                        <el-select style="width: 200px; height: 2rem; font-size: 2rem" v-model="articleInfo.categoryName">
                            <el-option v-for="item in categoryList.value"
                                       :value="item.categoryName"
                                       :label="item.categoryName"
                                       :key="item.categoryName"
                            />
                        </el-select>
                    </el-col>
                </el-row>
                <h1>文章封面图片</h1>
                <el-upload
                        class="upload-blog"
                        ref="upload"
                        :limit="1"
                        drag
                        :auto-upload="false"
                        action="#"
                        :on-change="handleChange"
                        v-model="articleInfo.articlePicture"
                >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽到此处或者 <em>点击上传</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip" style="font-size: 15px; color: red">
                            只能上传一个图片且上传的文件不能大于10MB
                        </div>
                    </template>
                </el-upload>
                <h1>文章内容：</h1>
                <MdEditor
                        :toolbarsExclude="toolbarsExclude"
                        v-model="articleInfo.articleContent"
                        @onUploadImg="onUploadImg"
                >
                </MdEditor>
            </div>
        </el-container>
    </el-container>
</template>

<script setup>
import SideMenuBar from "@/components/SideMenuBar.vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {inject, reactive, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {UploadFilled} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
import Cookies from "js-cookie";

const baseUrl = inject('baseUrl')
const editFlag = history.state.hasOwnProperty('article')

// 初始化文章
let articleId, content, title, picture, categoryName, article
if (!editFlag) {
    content = ref('')
    title = ref('')
    articleId = ref(null)
    picture = ref('')
    categoryName = ref('')
} else {
    article = history.state.article
    articleId = ref(article.articleId)
    content = ref(article.articleContent)
    title = ref(article.articleTitle)
    picture = ref(article.articlePicture)
    categoryName = ref(article.categoryName)
}

//保存
let articleInfo = reactive({
    articleId: articleId,
    articleTitle: title.value,
    articleContent: content.value,
    articlePicture: picture.value,
    categoryName: categoryName.value
})

//上传文件功能
let fileUpload = ref()
// 设置请求头
const headers = {
    'Content-Type': 'multipart/form-data'
}
const handleChange = (file) => {
    fileUpload.value = file
}

let categoryList = reactive({
    value: []
})
axios.get(
    baseUrl + '/category/getAllCategory'
).then(
    response => {
        categoryList.value = response.data.data
    }
)

const router = useRouter()
const saveArticle = async () => {
    // 上传图片逻辑：如果fileUpload.value有值，说明新上传/修改了图片，需要上传
    //            如果没值，说明不上传 / 未修改
    if (fileUpload.value !== null && fileUpload.value !== '' && fileUpload.value !== undefined) {
        // 确定上传
        let param = new FormData()
        // 如果是多个文件数组就循环添加一下就ok了
        param.append("file", fileUpload.value.raw)
        // 发个后端
        let fileUrl
        const res = await axios.post(
            baseUrl + '/minio/upload', param
        )
        fileUrl = res.data.data
        if (res.data.status === 200) {
            ElMessage({
                message: '上传成功',
                type: 'success'
            })
        } else {
            ElMessage({
                message: '上传失败',
                type: 'error'
            })
        }
        articleInfo.articlePicture = fileUrl
        console.log(articleInfo)
    }

    ElMessageBox.confirm(
        '确定保存当前的修改吗?',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(async () => {
        // 统一发送到后端，做修改/新增
        let token = Cookies.get('token')
        const res = await axios.post(
            baseUrl + '/admin/saveArticle', articleInfo,
            {
                headers: {
                    'content-type': 'application/json',
                    'token': token
                }
            }
        )
        //跳转回去
        if (res.data.status === 200) {
            ElMessage({
                message: '保存成功！',
                type: 'success'
            })
        } else if (res.data.status === 403) {
            ElMessage({
                type: "error",
                message: res.data.message,
            })
        }
        setTimeout(() => {
            router.push({name: 'article'})
        }, 1000)
    })
    .catch(() => {
        ElMessage({
            type: 'info',
            message: '保存失败',
        })
    })
}

const cancelEdit = () => {
    router.push({name: 'article'})
}


/**
 * MdEditor功能
 * @type {Ref<UnwrapRef<string[]>>}
 */
//忽略的功能
let toolbarsExclude = ref(['link', 'mermaid', 'katex', 'github'])

//TODO: emoji组件

//MdEditor上传图片
const onUploadImg = async (files) => {
    console.log('files', files)
    files.map(async file => {
        const form = new FormData()
        form.append('file', file)
        const res = await axios.post(
            baseUrl + '/minio/upload', form
        )
        let resUrl = res.data.data
        articleInfo.articleContent = articleInfo.articleContent + '![图片](' + resUrl + ')'
    })
}

</script>

<style scoped>
.title-blog {
    color: white;
    text-align: center;
    margin-top: 10%;
    font-size: 30px;
}

.base-container {
    background-image: url("http://119.91.22.108:9000/blog/back_index.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    min-width: 100vw;
    min-height: 100vh;
}

.header-blog {
    background-image: url("http://119.91.22.108:9000/blog/sunset.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    width: 100vw;
    height: 40vh;
}

.main-container {
    width: 88vw;
}

.article-editor {
    margin-left: 2vw;
    width: 80vw;
}

.editor-btn {
    margin-top: 5vh;
    text-align: right;
}

.row-title {
    font-size: 20px;
}

</style>