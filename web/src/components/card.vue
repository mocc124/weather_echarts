<template>
  <div class="card">
    <header>
        <slot name="header">xx 地区</slot>
    </header>
    <main>
        <slot name="message">
            今天大部分地区 ss ,室外最高气温 n ℃
        </slot>
    </main>
    <footer>
        <slot name="footer">
            <span class="wind">风速: nnm/h</span>
            <span class="cloud">云量: n%</span>
            <span class="cloud">大云量: n%</span>
            <span class="cloud">超大大大云量: n%</span>
        </slot>
    </footer>
  </div>
</template>

<script lang='ts' setup>
import { ref,reactive } from 'vue'

let props = defineProps<{data:object}>()

</script>

<style scoped lang="less">
.card {
    background-color: aliceblue;
    margin: 10px 5px;
    border-radius: 5px;
    color: #181818;
    padding: 5px 8px;
    -webkit-box-shadow:2px 0px 28px 1px rgba(134,138,138,0.12);
    -moz-box-shadow: 2px 0px 28px 1px rgba(134,138,138,0.12);
    box-shadow: 2px 0px 28px 1px rgba(134,138,138,0.12);
    header {
        font-size: 20px;
        padding-bottom: 2px;
        margin-bottom: 3px;
        border-bottom: 1px solid #ccc;
    }
    main {
        margin: 10px 0 ;
    }
    footer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        span {
            background-color: tomato;
            margin: 5px;
            padding: 1px 3px;
            border-radius: 3px;
        }
    }
}
</style>