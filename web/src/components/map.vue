<template>
  <div id="china"></div>
</template>

<script lang='ts' setup>
import { ref,reactive,onMounted,toRaw } from 'vue'
import { useCounterStore } from "../stores/counter";
import * as echarts from "echarts"; // echarts 5
import "../assets/china.js";

const store = useCounterStore()
const emits = defineEmits(["on-click"]);

let dataList = [
  { name: '澳门', provincialCapital: "澳门", value: 18 },
  { name: '香港', provincialCapital: "香港", value: 273 },
  { name: '台湾', provincialCapital: "台湾", value: 153 },
  { name: '新疆', provincialCapital: "乌鲁木齐", value: 76 },
  { name: '宁夏', provincialCapital: "银川", value: 75 },
  { name: '青海', provincialCapital: "西宁", value: 18 },
  { name: '甘肃', provincialCapital: "兰州", value: 134 },
  { name: '陕西', provincialCapital: "西安", value: 248 },
  { name: '西藏', provincialCapital: "拉萨", value: 1 },
  { name: '云南', provincialCapital: "昆明", value: 176 },
  { name: '贵州', provincialCapital: "贵阳", value: 146 },
  { name: '四川', provincialCapital: "成都", value: 543 },
  { name: '重庆', provincialCapital: "重庆", value: 576 },
  { name: '海南', provincialCapital: "海口", value: 168 },
  { name: '广西', provincialCapital: "南宁", value: 254 },
  { name: '广东', provincialCapital: "广州", value: 1407 },
  { name: '湖南', provincialCapital: "长沙", value: 1018 },
  { name: '湖北', provincialCapital: "武汉", value: 67800 },
  { name: '河南', provincialCapital: "郑州", value: 1273 },
  { name: '山东', provincialCapital: "济南", value: 765 },
  { name: '江西', provincialCapital: "南昌", value: 936 },
  { name: '福建', provincialCapital: "福州", value: 307 },
  { name: '安徽', provincialCapital: "合肥", value: 990 },
  { name: '浙江', provincialCapital: "杭州", value: 1237 },
  { name: '江苏', provincialCapital: "南京", value: 633 },
  { name: '上海', provincialCapital: "上海", value: 394 },
  { name: '黑龙江', provincialCapital: "哈尔滨", value: 484 },
  { name: '吉林', provincialCapital: "长春", value: 93 },
  { name: '辽宁', provincialCapital: "沈阳", value: 126 },
  { name: '内蒙古', provincialCapital: "呼和浩特", value: 75 },
  { name: '山西', provincialCapital: "太原", value: 133 },
  { name: '河北', provincialCapital: "石家庄", value: 319 },
  { name: '天津', provincialCapital: "天津", value: 137 },
  { name: '北京', provincialCapital: "北京", value: 512 }
];

onMounted(async ()=>{
  await store.getList()
  initEchart()
})

const initEchart = ()=>{
  // 处理数据
  dataList = store.list.data.city.filter(element=>{
    return dataList.map(item=>item.provincialCapital).includes(element[1])
  }).map(item =>({
    provincialCapital: item[1],// 省会城市
    value: item[11],// 最高温
    wind: `${item[9]} ${item[10]}`,//风向
    cloud:item[6],//云量
    weather: item[12],//天气
    code: item[17],//区划代码
    name: dataList.filter(city=>city.provincialCapital === item[1])[0].name,//省份
  }))
  
  // 初始化 chart 容器
  let charts = echarts.init(document.querySelector("#china") as HTMLElement)
  charts.setOption({
    tooltip: {
        triggerOn: "click",
        formatter: function(e:any, t:any, n:any) {
            return '.5' == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + ":" + e.value
        }
    }, 
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    }, 
    visualMap: {
        min: -50,
        max: 100000,
        left: 26,
        bottom: 40,
        showLabel: !0,
        text: ["高", "低"],
        pieces: [{
            gt: 24,
            label: "> 24℃",
            color: "rgb(238, 124, 58)"
        }, {
            gte: 16,
            lte: 24,
            label: "24℃ < 16℃",
            color: "rgb(245, 192, 78)"
        }, {
            gte: 8,
            lt: 16,
            label: "16℃ < 8℃",
            color: "rgb(227, 243, 107)"
        }, {
            gt: 0,
            lt: 8,
            label: "8℃ < 0℃",
            color: "rgb(155, 216, 114)"
        }, {
            gt: -8,
            lt: 0,
            label: "0℃ < -8℃",
            color: "rgb(133, 201, 216)"
        },{
            gt: -20,
            lt: -8,
            label: "-8℃ < -20℃",
            color: "rgb(63, 125, 205)"
        }],
        show: !0
    },
    geo: {
        map: "china",
        roam: !1,
        scaleLimit: {
            min: 1,
            max: 2
        },
        zoom: 1.23,
        top: 120,
        label: {
            show: !0,
            fontSize: "14",
            color: "rgba(0,0,0,0.7)"
        },
        itemStyle: {
            shadowBlur: 50,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            borderColor: "rgba(0, 0, 0, 0.2)",        
        },
        emphasis: {
            areaColor: "#f2d5ad",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            borderWidth: 0
        }
    },
    series: [{
        name: "最高温度",
        type: "map",
        geoIndex: 0,
        data: dataList,
    }]
  })

  // 监听事件,传递给父组件
  charts.on('click',function({data}){
    emits('on-click',data)
  })
}
</script>

<style scoped>
#china {
  width: 100%;
  height: 100%;
  background-color: rgba(134,138,138,0.5);
  border-radius: 20px;
}
</style>