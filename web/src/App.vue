<template>
  <div class="box" :style="{background:`url(${bg})`,backgroundSize:'100%',backgroundRepeat: 'no-repeat'}">
    <div class="box-left">
      <!-- 基本信息 -->
      <cardVue :data="showItem">
        <template v-slot:header>{{ showItem.name }}</template>
        <template v-slot:message>{{ `今天大部分地区${showItem.weather} ,室外最高气温 ${showItem.value} ℃` }}</template>
        <template v-slot:footer>
            <div class="wind">风速: {{showItem.wind}}</div>
            <div class="cloud">云量: {{showItem.cloud}}%</div>
        </template>
      </cardVue>
      <!-- 饼图 -->
      <cardVue :data="{}">
        <template v-slot:header><div>统计图1</div></template>
        <template v-slot:message>
          <div id="pia"></div>
        </template>
        <template v-slot:footer><div></div></template>
      </cardVue>
      <!-- 折线图 -->
      <cardVue :data="{}">
        <template v-slot:header><div>统计图2</div></template>
        <template v-slot:message>
          <div id="line"></div>
        </template>
      </cardVue>
    </div>
    <div class="box-center">
      <mapVue @on-click="getCode"></mapVue>
    </div>
  </div>
</template>

<script lang='ts' setup>
import bg from "./assets/img/bgc7680x4320.jpg";
import { ref,reactive,onMounted,toRaw } from 'vue'
import { useCounterStore } from "./stores/counter";
import mapVue from "./components/map.vue";
import cardVue from "./components/card.vue";
import * as echarts from "echarts";

const store = useCounterStore()
let showItem = ref({
  name:"香港",
  wind:"西北风 微风",
  cloud:"14",
  weather:"晴朗",
  value:10
})
type Item = {name:string,wind:string,cloud:string,weather:string,value:number}

onMounted(async ()=>{
  await store.getList()
  initLine()
  initPia()
})

const getCode = (...data:object[])=>{
  let obj = data[0]
  showItem.value = obj as Item
}
const initPia = ()=>{
  const charts = echarts.init(document.querySelector("#pia") as HTMLElement)
  // const data = store.getTop
  const data = store.getRandom
  const option = {
    title: {
      text: '高温统计图',
      subtext: '单位 ℃',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left'
    // },
    series: [
      {
        name: '当前温度',
        type: 'pie',
        radius: '50%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  charts.setOption(option)
}
const initLine = ()=>{
  const chart = echarts.init(document.querySelector('#line') as HTMLElement)
  const data =  store.getRandom.map((i:Obj)=>i.value)
  const name =  store.getRandom.map((i:Obj)=>i.name)
  // const data =  store.getRandom
  type Obj = {
    name:string,
    value:number    
  }
  
  const option = {
    xAxis: {
      type: 'category',
      data: name
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data,
        type: 'line',
        smooth: true
      }
    ]
  }

  chart.setOption(option)
}
</script>

<style scoped lang="less">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: stretch;
  flex-wrap: nowrap;
  &-left {
    min-width: 20vw;
    max-width: 40vw;
    overflow: auto;
    margin-left: 10px;
    #pia,#line {
      min-height: 15vw;
      max-height: 20vw;
      width: 100%;
    }
  }
  &-center {
    width: 100%;
    padding: 10px 1vw 2vh;
  }
}
</style>