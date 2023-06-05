<template>
    <el-row>
        <el-card style="width: 100vw">
            <el-row  class="countdown">
                <el-col :span="4">
                    <span style="font-size: 1.2rem">还有多久下班：</span>
                </el-col>
                <el-col :span="8">
                    <el-countdown
                            :value="afterWorkTime"
                            v-show="cdVisible === 0"
                    >
                    </el-countdown>
                    <p v-show="cdVisible === 1">啦啦啦，已经下班啦～</p>
                    <p v-show="cdVisible === -1">来的太早啦～还没开始打工呢</p>
                </el-col>
            </el-row>
            <el-row  class="countdown">
                <el-col :span="4">
                    <span style="font-size: 1.2rem">距离周五还有：</span>
                </el-col>
                <el-col :span="8">
                    <span style="font-size: 1.2rem">{{dist5}}</span>
                </el-col>
            </el-row>
        </el-card>
    </el-row>
</template>

<script setup>
import {ref} from "vue";

const startWorkTime = ref(new Date().setHours(0, 0, 0, 0) + 1000 * 60 * 60 * 9)
const afterWorkTime = ref(new Date().setHours(0, 0, 0, 0) + 1000 * 60 * 60 * 19)

let cdVisible
if (startWorkTime.value < Date.now() && Date.now() < afterWorkTime.value) {
    cdVisible = 0
} else if (Date.now() < startWorkTime.value) {
    cdVisible = -1
} else if (Date.now() > afterWorkTime.value) {
    cdVisible = 1
}

let dist5
const todayNum = "7123456".charAt(new Date().getDay());
if (5 >= todayNum) {
    dist5 = (5 - todayNum) + '天'
} else {
    dist5 = '已经放假了，休息一下吧～'
}

</script>

<style scoped>
.countdown {
    display: flex;
    justify-content: center;
    align-self: center;
}

</style>