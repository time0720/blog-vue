<template>
    <el-container direction="vertical">
        <div class="category-header">
            <!--菜单栏nav-->
            <nav><MenuBar/></nav>
            <!--背景图片和字体-->
            <div class="category-bg">
                <h1>分类</h1>
            </div>
        </div>
        <el-container class="category-main">
            <div id="main-blog">
                <el-card id="main-category"
                >
                </el-card>
            </div>
            <div id="category-card">
               <AsideBar/>
            </div>
        </el-container>
    </el-container>
</template>

<script setup>
import MenuBar from "@/components/MenuBar.vue";
import AsideBar from "@/components/AsideBar.vue";
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import axios from "axios";
import {baseUrl} from "@/store";

onMounted(() => {
    drawChart()
})

//echarts图标
const drawChart = async () => {
    let myChart = echarts.init(document.getElementById('main-category'));
    //分类列表
    let categoryList = ref([])
    await axios.get(
        baseUrl + '/category/getCategoryList'
    ).then(
        response => {
            categoryList = response.data.data
        }
    )
    myChart.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: categoryList
            }]
    })
}
</script>

<style scoped>
@media screen and (min-device-width: 768px) {
    .category-main {
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

    #main-category {
        width: 100%;
        height: 70%;
    }

    #category-card {
        width: 20%;
        margin-bottom: 20px;
        margin-right: 8vw;
    }

    .category-header {
        background-image: url("https://time7.top:9000/blog/category.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 50vh;
    }
}

@media screen and (max-device-width: 768px) {
    .category-main {
        background-image: url("https://time7.top:9000/blog/white_snow.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 100vh;
    }

    #main-blog {
        width: 100vw;
        margin-top: 2rem;
        margin-left: 5vw;
        margin-right: 5vw;
    }

    #main-category {
        width: 100%;
        height: 50%;
    }

    .category-header {
        background-image: url("https://time7.top:9000/blog/category.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100vw;
        height: 30vh;
    }
}

.category-bg {
    color: white;
    text-align: center;
    margin-top: 10%;
    font-size: 2rem;
}
</style>