var myChart = echarts.init(document.getElementById('main'));

myChart.showLoading();

var dataAxis = ['点', '击', '柱', '子', '或', '者', '鼠', '标', '滑', '动', '滚', '轮', '能', '够', '实','现', '自', '动', '缩', '放'];
var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
var yMax = 500;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}

option = {
    title: {
        text: '特性示例：柱状图混合折线 点击或滚动缩放',
        subtext: '来自echarts官网',
        left: 'center'
    },
    legend: {
        top: 'bottom',
        data:  ['柱状图','折线图']
    },
    xAxis: {
        data: dataAxis,
        axisLabel: {
            inside: true,   // x轴刻度标签朝内
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false     // 不显示坐标轴刻度
        },
        axisLine: {
            show: false     // 不显示坐标轴轴线
        },
        z: 10           // 避免被z值更大的图形覆盖
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
        },
        {
            name:'柱状图',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: data
        },
        {
            name:'折线图',
            type: 'line',
            hoverAnimation: true,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'red'},
                            {offset: 0.5, color: 'yellow'},
                            {offset: 1, color: 'blue'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'red'},
                            {offset: 0.7, color: 'yellow'},
                            {offset: 1, color: 'blue'}
                        ]
                    )
                }
            },
            data: data
        }
    ]
};

myChart.setOption(option);
myChart.hideLoading();
// Enable data zoom when user click bar.
var zoomSize = 6;
myChart.on('click', function (params) {
    console.log(params);
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});

// 地图
// option = {
//     title : {
//         text: 'QQ好友管理器',
//         subtext: '性别',
//         left: 'center',
//     },
//     tooltip : {
//         trigger: 'item'
//     },
//     legend: {
//         orient: 'vertical',
//         left: 'left',
//         data:['男','女','未填']
//     },
//     visualMap: {
//         // type:'piecewise',
//         min: 0,
//         max: 500,
//         left: 'left',
//         top: 'bottom',
//         text:['高','低'],           // 文本，默认为数值文本
//         calculable : true
//     },
//     toolbox: {
//         show: true,
//         orient : 'vertical',
//         left: 'right',
//         top: 'center',
//         feature : {
//             mark : {show: true},
//             dataView : {show: true, readOnly: false},
//             restore : {show: true},
//             saveAsImage : {show: true}
//         }
//     },
//     series : [
//         {
//             name: '男',
//             type: 'map',
//             map: 'china',
//             roam: false,
//             label: {
//                 normal: {
//                     show: false
//                 },
//                 emphasis: {
//                     show: true
//                 }
//             },
//             data:[
//                 {name: '北京',value: Math.round(Math.random()*500)},
//                 {name: '天津',value: Math.round(Math.random()*500)},
//                 {name: '上海',value: Math.round(Math.random()*500)},
//                 {name: '重庆',value: Math.round(Math.random()*500)},
//                 {name: '河北',value: Math.round(Math.random()*500)},
//                 {name: '河南',value: Math.round(Math.random()*500)},
//                 {name: '云南',value: Math.round(Math.random()*500)},
//                 {name: '辽宁',value: Math.round(Math.random()*500)},
//                 {name: '黑龙江',value: Math.round(Math.random()*500)},
//                 {name: '湖南',value: Math.round(Math.random()*500)},
//                 {name: '安徽',value: Math.round(Math.random()*500)},
//                 {name: '山东',value: Math.round(Math.random()*500)},
//                 {name: '新疆',value: Math.round(Math.random()*500)},
//                 {name: '江苏',value: Math.round(Math.random()*500)},
//                 {name: '浙江',value: Math.round(Math.random()*500)},
//                 {name: '江西',value: Math.round(Math.random()*500)},
//                 {name: '湖北',value: Math.round(Math.random()*500)},
//                 {name: '广西',value: Math.round(Math.random()*500)},
//                 {name: '甘肃',value: Math.round(Math.random()*500)},
//                 {name: '山西',value: Math.round(Math.random()*500)},
//                 {name: '内蒙古',value: Math.round(Math.random()*500)},
//                 {name: '陕西',value: Math.round(Math.random()*500)},
//                 {name: '吉林',value: Math.round(Math.random()*500)},
//                 {name: '福建',value: Math.round(Math.random()*500)},
//                 {name: '贵州',value: Math.round(Math.random()*500)},
//                 {name: '广东',value: Math.round(Math.random()*500)},
//                 {name: '青海',value: Math.round(Math.random()*500)},
//                 {name: '西藏',value: Math.round(Math.random()*500)},
//                 {name: '四川',value: Math.round(Math.random()*500)},
//                 {name: '宁夏',value: Math.round(Math.random()*500)},
//                 {name: '海南',value: Math.round(Math.random()*500)},
//                 {name: '台湾',value: Math.round(Math.random()*500)},
//                 {name: '香港',value: Math.round(Math.random()*500)},
//                 {name: '澳门',value: Math.round(Math.random()*500)}
//             ]
//         },
//         {
//             name: '女',
//             type: 'map',
//             map: 'china',
//             label: {
//                 normal: {
//                     show: false
//                 },
//                 emphasis: {
//                     show: true
//                 }
//             },
//             data:[
//                 {name: '北京',value: Math.round(Math.random()*500)},
//                 {name: '天津',value: Math.round(Math.random()*500)},
//                 {name: '上海',value: Math.round(Math.random()*500)},
//                 {name: '重庆',value: Math.round(Math.random()*500)},
//                 {name: '河北',value: Math.round(Math.random()*500)},
//                 {name: '安徽',value: Math.round(Math.random()*500)},
//                 {name: '新疆',value: Math.round(Math.random()*500)},
//                 {name: '浙江',value: Math.round(Math.random()*500)},
//                 {name: '江西',value: Math.round(Math.random()*500)},
//                 {name: '山西',value: Math.round(Math.random()*500)},
//                 {name: '内蒙古',value: Math.round(Math.random()*500)},
//                 {name: '吉林',value: Math.round(Math.random()*500)},
//                 {name: '福建',value: Math.round(Math.random()*500)},
//                 {name: '广东',value: Math.round(Math.random()*500)},
//                 {name: '西藏',value: Math.round(Math.random()*500)},
//                 {name: '四川',value: Math.round(Math.random()*500)},
//                 {name: '宁夏',value: Math.round(Math.random()*500)},
//                 {name: '香港',value: Math.round(Math.random()*500)},
//                 {name: '澳门',value: Math.round(Math.random()*500)}
//             ]
//         },
//         {
//             name: '未填',
//             type: 'map',
//             map: 'china',
//             label: {
//                 normal: {
//                     show: false
//                 },
//                 emphasis: {
//                     show: true
//                 }
//             },
//             data:[
//                 {name: '北京',value: Math.round(Math.random()*200)},
//                 {name: '天津',value: Math.round(Math.random()*200)},
//                 {name: '上海',value: Math.round(Math.random()*200)},
//                 {name: '广东',value: Math.round(Math.random()*200)},
//                 {name: '台湾',value: Math.round(Math.random()*200)},
//                 {name: '香港',value: Math.round(Math.random()*200)},
//                 {name: '澳门',value: Math.round(Math.random()*200)}
//             ]
//         }
//     ]
// };

// myCharts.setOption(option);