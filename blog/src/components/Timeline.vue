<template>
    <el-container direction="vertical">
        <div class="timeline-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
        </div>
        <el-container class="timeline-main" direction="vertical">
            <div class="timeline-card">
                <h1>今年已完成的小目标：</h1>
                <br>
                <el-timeline>
                    <el-timeline-item
                            v-for="(activity, index) in activities"
                            :key="index"
                            :icon="activity.icon"
                            :type="activity.type"
                            :color="activity.color"
                            :size="activity.size"
                            :hollow="activity.hollow"
                            :timestamp="activity.timestamp"
                    >
                        {{ activity.content }}
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-container>
    </el-container>
</template>

<script setup>
import {MoreFilled, SuccessFilled} from '@element-plus/icons-vue'
import MenuBar from "@/components/MenuBar.vue";

const activities = [
    {
        content: '添加了时间线，对，就是这个页面',
        timestamp: '2023-06-06',
        size: 'large',
        icon: SuccessFilled,
        color: '#0bbd87'
    },
    {
        content: '添加了天气信息-闲的没事自己看看',
        timestamp: '2023-06-05',
        size: 'large',
        icon: SuccessFilled,
        color: '#0bbd87'
    },
    {
        content: '新增转盘功能-决定吃什么，这个很好，解决了世纪难题',
        timestamp: '2023-05-19',
        size: 'large',
        icon: SuccessFilled,
        color: '#0bbd87',
    },
    {
        content: '添加了搜索接口-part1',
        timestamp: '2023-05-16',
        size: 'large',
        icon: MoreFilled,
        color: '#0bbd87'
    },
    {
        content: '新增评论区功能-part1',
        timestamp: '2023-05-08',
        size: 'large',
        icon: MoreFilled,
        color: '#0bbd87'
    },
    {
        content: '网站正式上线',
        timestamp: '2023-05-08',
        size: 'large',
        icon: SuccessFilled,
        color: '#0bbd87'
    },
]

</script>

<style scoped>
@media screen and (min-device-width: 768px) {

    .timeline-header {
        background-image: url("https://time7.top:9000/blog/timeline.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 40vh;
    }
}

@media screen and (max-device-width: 768px) {

    .timeline-header {
        background-image: url("https://time7.top:9000/blog/timeline.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 30vh;
    }
}

.timeline-card {
    justify-content: center;
    width: 60vw;
    align-self: center;
    margin-top: 5vh;
}
</style>