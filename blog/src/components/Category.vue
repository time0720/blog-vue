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

<script>
import MenuBar from "@/components/MenuBar.vue";
import AsideBar from "@/components/AsideBar.vue";
import axios from "axios";
import * as echarts from 'echarts';
import {inject, onMounted, ref} from "vue";

export default {
    name: "Category",
    components: {AsideBar, MenuBar},
    setup() {
        const baseUrl = inject('baseUrl')

        onMounted(() => {
            drawChart()
        })

        //echarts图标
        const drawChart = async () => {
            let myChart = echarts.init(document.getElementById('main-category'));
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

    }
}
</script>

<style scoped>
.category-header {
    background-image: url("https://time7.top:9000/blog/category.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    width: 100vw;
    height: 50vh;
}

.category-main {
    background-image: url("https://time7.top:9000/blog/white_snow.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.category-bg {
    color: white;
    text-align: center;
    margin-top: 10%;
    font-size: 30px;
}

#main-blog {
    width: 70%;
    margin-top: 20px;
    margin-left: 8vw;
    margin-right: 10px;
}


#category-card {
    width: 20%;
    margin-bottom: 20px;
    margin-right: 8vw;
}

#main-category {
    width: 100%;
    height: 70%;
}

</style>