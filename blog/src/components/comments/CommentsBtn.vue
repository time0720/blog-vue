<template>
    <div class="comments-bg">
        <el-button @click="dialogVisible = true">
            来都来了，留个言吧～
        </el-button>
    </div>
    <!--弹出框-->
    <el-dialog
            v-model="dialogVisible"
            title="我来留言啦~"
            :width="dialogWidth"
            :before-close="handleClose"
    >
        我的名字：<el-input style="width: 25%" v-model="commentsInfo.commentsName"></el-input>
        &nbsp;&nbsp;
        <el-popover trigger="click" :width="400" placement="right">
            <template #reference >
                <el-button style="font-size: 1.5rem">😀</el-button>
            </template>
            <el-row>
                <el-col
                        v-for="(emoji, index) of emojis"
                        :key="index"
                        @click="handleEmoji(emoji)"
                        :span="3"
                >
                    <el-text style="font-size: 2rem">{{emoji}}</el-text>
                </el-col>
            </el-row>
        </el-popover>
        <el-input
                type="textarea"
                class="comments-text"
                :rows="4"
                v-model="commentsInfo.content"
        >
        </el-input>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveComments">确定</el-button>
          </span>
        </template>
    </el-dialog>
</template>

<script setup>

import {commentsInfo, saveComments} from "@/store";
import {ref} from "vue";
import {ElMessageBox} from "element-plus";
import {emojis} from "@/components/EmojiExtension/data";

let dialogVisible = ref(false)

const handleClose = (done) => {
    ElMessageBox.confirm('确定要退出吗？',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        done()
    })
}

const handleEmoji = (emoji) => {
    if (commentsInfo.content === null) {
        commentsInfo.content = '' + emoji
    } else {
        commentsInfo.content += emoji
    }
}

let dialogWidth
if (screen.width >= 768) {
    dialogWidth = '40%'
} else {
    dialogWidth = '90%'
}
</script>

<style scoped>
.comments-bg {
    color: white;
    text-align: center;
    font-size: 2rem;
}

.comments-text {
    font-size: 1.5rem;
}
</style>