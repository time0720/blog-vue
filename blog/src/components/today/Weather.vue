<template>
    <el-row>
        <el-card style="width: 100vw">
            <el-row>
                <h1>{{weatherCurrent.province}}-{{weatherCurrent.city}} | 测量时间：{{weatherCurrent.reporttime}}</h1>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <el-image
                            :src="weatherCurrent.iconAddress"
                            style="height: 100%"
                    ></el-image>
                </el-col>
                <el-col :span="2" class="today-weather-info">
                    <p style="font-size: 2.3rem">{{weatherCurrent.weather}}</p>
                </el-col>
                <el-col :span="2" class="today-weather-info">
                    <p style="font-size: 2.3rem">{{weatherCurrent.temperature}}℃</p>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="4" class="today-weather-info">
                    <el-card>
                        <el-col>当前风力：{{weatherCurrent.windpower}}</el-col>
                        <el-col>当前风向：{{weatherCurrent.winddirection}}</el-col>
                        <el-col>空气湿度：{{weatherCurrent.humidity}}</el-col>
                    </el-card>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="4" class="today-weather-info">
                    <p style="font-size: 1.1rem">最高温：{{weatherMoreInfo.daytemp}}℃</p>
                    <p style="font-size: 1.1rem">最低温：{{weatherMoreInfo.nighttemp}}℃</p>
                </el-col>
                <el-col :span="4" class="today-weather-info">
                    <el-card>
                        <el-col>白天天气：{{weatherMoreInfo.dayweather}}</el-col>
                        <el-col>夜间天气：{{weatherMoreInfo.nightweather}}</el-col>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </el-row>
    <el-row>
        <el-col v-for="daily in foreWeather" :span="8">
            <el-card>
                {{daily.date}}
                <el-row>
                    <el-col :span="8">
                        <el-image
                                :src="daily.iconAddress"
                                style="height: 100%"
                        ></el-image>
                    </el-col>
                    <el-col :span="8" class="today-weather-info">
                        <p style="font-size: 1rem">{{daily.dayweather}}</p>
                    </el-col>
                    <el-col :span="8" class="today-weather-info">
                        <p style="font-size: 1rem">{{daily.nighttemp}}℃ ~ {{daily.daytemp}}℃</p>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import {getWeather, weatherCurrentInfo, weatherForecastInfo} from "@/store";
import {onMounted, ref} from "vue";

let weatherCurrent = ref({
    province: null,
    city: null,
    adcode: null,
    weather: null,
    temperature: null,
    winddirection: null,
    windpower: null,
    humidity: null,
    reporttime: null,
    temperature_float: null,
    humidity_float: null,
    iconAddress: null
})
let weatherMoreInfo = ref({
    date: null,
    week: null,
    dayweather: null,
    nightweather: null,
    daytemp: null,
    nighttemp: null,
    daywind: null,
    nightwind: null,
    daypower: null,
    nightpower: null,
    daytemp_float: null,
    nighttemp_float: null,
})

let weatherForecasts = ref([])
let foreWeather = ref([])
onMounted(async () => {
    await initWeather()
    await getWeather()
    //查询当天的实时天气信息
    weatherCurrent.value = JSON.parse(JSON.stringify(weatherCurrentInfo.value)).lives[0]
    weatherIcon.value.forEach(item => {
        let w = weatherCurrent.value.weather.toString()
        if (w.indexOf(item.weather) !== -1) {
            weatherCurrent.value.iconAddress = item.iconAddress
        }
    })
    // TODO：维护所有的天气图标
    if (weatherCurrent.value.iconAddress === undefined) {
        weatherCurrent.value.iconAddress = 'https://time7.top:9000/blog/unknownweather.png'
    }


    //查询预测天气信息
    const forecastWeather = JSON.parse(JSON.stringify(weatherForecastInfo.value))

    weatherForecasts.value = forecastWeather.forecasts[0].casts
    //查询当天的详细信息
    weatherMoreInfo.value = forecastWeather.forecasts[0].casts[0]

    //去除当天的预报，保留后三天的天气预测
    foreWeather.value.push(forecastWeather.forecasts[0].casts[1])
    foreWeather.value.push(forecastWeather.forecasts[0].casts[2])
    foreWeather.value.push(forecastWeather.forecasts[0].casts[3])

    foreWeather.value.forEach(weather => {
        weatherIcon.value.forEach(item => {
            let w = weather.dayweather.toString()
            if (w.indexOf(item.weather) !== -1) {
                weather.iconAddress = item.iconAddress
            }
        })
    })

})


let weatherIcon = ref([])
const initWeather = async () => {
    //设置天气图标
    weatherIcon.value.push({weather: '晴', iconAddress: 'https://worldweather.wmo.int/images/24a.png'})
    weatherIcon.value.push({weather: '云', iconAddress: 'https://worldweather.wmo.int/images/23a.png'})
    weatherIcon.value.push({weather: '雨', iconAddress: 'https://worldweather.wmo.int/images/14.png'})
    weatherIcon.value.push({weather: '雾', iconAddress: 'https://worldweather.wmo.int/images/16.png'})
    weatherIcon.value.push({weather: '阴', iconAddress: 'https://worldweather.wmo.int/images/20.png'})
    weatherIcon.value.push({weather: '风', iconAddress: 'https://worldweather.wmo.int/images/25.png'})
    weatherIcon.value.push({weather: '雷', iconAddress: 'https://worldweather.wmo.int/images/2.png'})
    weatherIcon.value.push({weather: '雪', iconAddress: 'https://worldweather.wmo.int/images/5.png'})
}
</script>

<style scoped>
.today-weather-info {
    justify-content: center;
    align-self: center;
}
</style>