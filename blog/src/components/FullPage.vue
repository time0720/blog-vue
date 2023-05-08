<template>
    <div>
        <!--菜单栏nav-->
        <nav><MenuBar/></nav>
        <!--滚动字体-->
        <div class="index-font">
            <h1>时光</h1>
            <div id="keyframes">
                <!--TODO: 一个数组，随机展示-->
                <span>海内存知己，天涯若比邻。</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import MenuBar from "@/components/MenuBar.vue";

</script>

<style scoped>

@media screen and (min-device-width: 768px) {
    .index-font {
        text-align: center;
        margin-top: 15%;
        font-size: 2rem;
    }
}

@media screen and (max-device-width: 768px) {
    .index-font {
        text-align: center;
        margin-top: 55%;
        font-size: 1.6rem;
    }
}



#keyframes {
    margin: 0 auto;
    font-size: 30px;
    width: 0;
    height: 40px;
    border-right: 0 solid darkgray;
    animation: write 3s steps(14) forwards,
    blink 0.5s steps(1) infinite;
    overflow: hidden;
}

@keyframes write {
    0% {
        width: 0;
    }
    100% {
        width: 400px;
    }
}

@keyframes blink {
    50% {
        border-color: transparent; /* #00000000 */
    }
}
</style>