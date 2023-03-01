
//所有地点坐标
var geoCoordMap = {
    江苏: [118.8062, 31.9208],
    黑龙江: [127.9688, 45.368],
    内蒙古: [110.3467, 41.4899],
    吉林: [125.8154, 44.2584],
    北京市: [116.4551, 40.2539],
    辽宁: [123.1238, 42.1216],
    河北: [114.4995, 38.1006],
    天津: [117.4219, 39.4189],
    山西: [112.3352, 37.9413],
    陕西: [109.1162, 34.2004],
    甘肃: [103.5901, 36.3043],
    宁夏: [106.3586, 38.1775],
    青海: [101.4038, 36.8207],
    新疆: [87.9236, 43.5883],
    四川: [103.9526, 30.7617],
    重庆: [108.384366, 30.439702],
    山东: [117.1582, 36.8701],
    河南: [113.4668, 34.6234],
    安徽: [117.29, 32.0581],
    湖北: [114.3896, 30.6628],
    浙江: [119.5313, 29.8773],
    福建: [119.4543, 25.9222],
    江西: [116.0046, 28.6633],
    湖南: [113.0823, 28.2568],
    贵州: [106.6992, 26.7682],
    云南: [102.9199, 25.4663],
    广东: [113.12244, 23.009505],
    广西: [108.479, 23.1152],
    海南: [110.3893, 19.8516],
    上海: [121.4648, 31.2891],
    西藏: [91.11, 29.97],
};

// 数据
const dataList = [
    {name: '澳门', value: 18},
    {name: '香港', value: 273},
    {name: '台湾', value: 153},
    {name: '新疆', value: 76},
    {name: '宁夏', value: 75},
    {name: '青海', value: 18},
    {name: '甘肃', value: 134},
    {name: '陕西', value: 248},
    {name: '西藏', value: 1},
    {name: '云南', value: 176},
    {name: '贵州', value: 146},
    {name: '四川', value: 543},
    {name: '重庆', value: 576},
    {name: '海南', value: 168},
    {name: '广西', value: 254},
    {name: '广东', value: 1407},
    {name: '湖南', value: 1018},
    {name: '湖北', value: 67800},
    {name: '河南', value: 1273},
    {name: '山东', value: 765},
    {name: '江西', value: 936},
    {name: '福建', value: 307},
    {name: '安徽', value: 990},
    {name: '浙江', value: 1237},
    {name: '江苏', value: 633},
    {name: '上海', value: 394},
    {name: '黑龙江', value: 484},
    {name: '吉林', value: 93},
    {name: '辽宁', value: 126},
    {name: '内蒙古', value: 75},
    {name: '山西', value: 133},
    {name: '河北', value: 319},
    {name: '天津', value: 137},
    {name: '北京', value: 512}
];

const option = {
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
}, // 提供下载工具
visualMap: {
    min: 0,
    max: 100000,
    left: 26,
    bottom: 40,
    showLabel: !0,
    text: ["高", "低"],
    pieces: [{
        gt: 10000,
        label: "> 10000人",
        color: "#7f1100"
    }, {
        gte: 1000,
        lte: 10000,
        label: "1000 - 10000人",
        color: "#ff5428"
    }, {
        gte: 100,
        lt: 1000,
        label: "100 - 1000人",
        color: "#ff8c71"
    }, {
        gt: 10,
        lt: 100,
        label: "10 - 100人",
        color: "#ffd768"
    }, {
        gt: 1,
        lt: 10,
        label: "1 - 10人",
        color: "#ffffff"
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
        name: "确证病例",
        type: "map",
        geoIndex: 0,
        data: dataList,
    }]
}

export default { dataList, geoCoordMap, option }