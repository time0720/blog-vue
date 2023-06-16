<template>
    <el-container direction="vertical">
        <div class="timeline-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
        </div>
        <el-container class="timeline-main" direction="vertical">
            <div class="timeline-card">
                <h1>已完成的小目标：</h1>
                <br>
                <el-timeline>
                    <el-timeline-item
                            v-for="(activity, index) in activityList.value"
                            :key="index"
                            :icon="activity.icon"
                            :type="activity.type"
                            :color="activity.color"
                            :size="activity.size"
                            :hollow="activity.hollow"
                            :timestamp="activity.timestamp"
                            :placement="'top'"
                    >
                        <el-progress
                                :text-inside="true"
                                :stroke-width="16"
                                :percentage="activity.percentage"
                                :color="customPercentageColor(activity.percentage)"
                        />
                        <el-card>
                            {{ activity.content }}
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-container>
    </el-container>
</template>

<script setup>
import MenuBar from "@/components/menu/MenuBar.vue";
import {activitieList, activityList, selectAllActivities} from "@/store";
import {onMounted} from "vue";

onMounted(() => {
    selectAllActivities()
})

const customPercentageColor = (percentage) => {
    if (percentage < 30) {
        return '#909399'
    }
    if (percentage < 70) {
        return '#e6a23c'
    }
    return '#0bbd87'
}


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