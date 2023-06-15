<template>
    <el-container direction="vertical">
        <div class="lucky-wheel-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
            <!--背景图片和字体-->
            <div class="lucky-wheel-bg">
                <h1>吃什么吃什么？？？</h1>
            </div>
        </div>
        <el-container class="lucky-wheel-main">
            <div id="main-blog">
                <el-card id="main-lucky-wheel"
                >
                    <el-row>
                        <el-col :span="leftSpan">
                            <el-row>
                                <el-col :span="18">
                                    <el-input v-model="newFood"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-button @click="addFood(newFood)">添加</el-button>
                                </el-col>
                            </el-row>
                            <br>
                            <el-card style="width: 95%">
                                <el-table :data="prizes">
                                    <el-table-column prop="fonts[0].text" label="好吃的"/>
                                    <el-table-column fixed="right" width="60" label="删除">
                                        <template #default="scope">
                                            <el-button
                                                    link
                                                    type="primary"
                                                    size="small"
                                                    @click.prevent="deleteFood(scope.row)"
                                            >
                                                删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                        <el-col :span="rightSpan" v-show="isMobile">
                            <LuckyWheel
                                    ref="myLucky"
                                    class="lucky-wheel"
                                    :prizes="prizes"
                                    :blocks="blocks"
                                    :buttons="buttons"
                                    @start="startCallback"
                            />
                        </el-col>
                    </el-row>
                </el-card>
            </div>
            <div id="lucky-wheel-card">
                <AsideBar/>
            </div>
        </el-container>
    </el-container>
</template>

<script setup>
import {onMounted, ref} from "vue";
import AsideBar from "@/components/AsideBar.vue";
import MenuBar from "@/components/menu/MenuBar.vue";
import {ElMessage, ElMessageBox} from "element-plus";
const myLucky = ref()

// 定义span的大小
let rightSpan = ref()
let leftSpan = ref()
const isMobile = ref(true)
onMounted(() => {
    rightSpan.value = 16
    leftSpan.value = 24 - rightSpan
})


const blocks = [{ padding: '13px', background: '#617df2' }]

// 初始化转盘的数据
let foods = ['小汉堡', '烤冷面', '麻辣烫', '馄炖', '小碗菜', '泡面']
let prizes = ref([])
if (localStorage.getItem('foods') === undefined || localStorage.getItem('foods') === null) {
    localStorage.setItem('foods', foods)
} else {
    foods = localStorage.getItem('foods').split(',')
}

// 添加食物
let newFood = ref()
const addFood = (newFood) => {
    if (newFood === null || newFood === '' || newFood === undefined) {
        ElMessage.error('不可以什么都不输入哦')
    } else {
        prizes.value.push({ fonts: [{ text: newFood, top: '20%' }], background: backgrounds[prizes.value.length % 2]})
        foods.push(newFood)
        localStorage.setItem('foods', foods)
    }
}


const backgrounds = ['#e9e8fe', '#b8c5f2']
for (let i = 0; i < foods.length; i++) {
    prizes.value.push({ fonts: [{ text: foods[i], top: '20%' }], background: backgrounds[i % 2]})
}

const buttons = [{
    radius: '25%',
    background: '#8a9bf3',
    pointer: true,
    fonts: [{ text: '开始', top: '-10px' }]
}]

let random
const startCallback = () => {
    // 调用抽奖组件的play方法开始游戏
    myLucky.value.play()
    // 模拟调用接口异步抽奖
    setTimeout(() => {
        random = Math.floor(Math.random() * prizes.value.length)
        // 调用stop停止旋转并传递中奖索引
        myLucky.value.stop(random)
    }, 3000)
    setTimeout(() => {
        ElMessageBox.alert(
            '今天就吃[' + prizes.value[random].fonts[0].text + ']吧。'
        )
    }, 5000)
}

const deleteFood = (row) => {
    const removeFood = JSON.parse(JSON.stringify(row)).fonts[0].text
    const index = foods.indexOf(removeFood)
    foods.splice(index, 1)
    prizes.value.splice(index, 1)
    localStorage.setItem('foods', foods)
}


</script>

<style scoped>
@media screen and (min-device-width: 768px) {
    .lucky-wheel-main {
        background-image: url("https://time7.top:9000/blog/white_snow.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }

    #main-blog {
        width: 70%;
        margin-top: 20px;
        margin-left: 8vw;
        margin-right: 10px;
    }

    #main-lucky-wheel {
        width: 100%;
    }

    #lucky-wheel-card {
        width: 20%;
        margin-bottom: 20px;
        margin-right: 8vw;
    }

    .lucky-wheel-header {
        background-image: url("https://time7.top:9000/blog/food.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 50vh;
    }

    .lucky-wheel {
        width: 45vw;
        height: 80vh;
    }

}

@media screen and (max-device-width: 768px) {
    .lucky-wheel-main {
        background-image: url("https://time7.top:9000/blog/white_snow.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
    }

    #main-blog {
        width: 100vw;
        margin-top: 2rem;
        margin-left: 5vw;
        margin-right: 5vw;
    }

    #main-lucky-wheel {
        width: 100%;
    }

    .lucky-wheel-header {
        background-image: url("https://time7.top:9000/blog/food.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 30vh;
    }

    .lucky-wheel {
        width: 100vw;
        height: 40vh;
    }
}

.lucky-wheel-bg {
    color: white;
    text-align: center;
    margin-top: 10%;
    font-size: 2rem;
}
</style>