<template>
    <div class="analysis">
        <div class="title">数据分析</div>
        <div class="data_top">
            <div class="data_top_left" id="piebox"></div>
            <div class="data_top_right" id="barbox"></div>
        </div>
        <div class="data_bottom" id="linebox"></div>
        <div class="tab">
            <div class="tab_item"
             v-for="(item,index) in list"
             :key="index"
             :class="[itemIndex===index?'changeColor':'']"
             @click="changeColor(item,index)" 
            >{{item}}</div>
            
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import {Analysis,switchCate} from '../../api/user'
    export default {
        data(){
            return{
                list:["素菜类","荤菜类","酒水类","龙虾"],
                itemIndex:0
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            async getData(){
                let {data} = await Analysis()
                console.log(data);
                // 调用饼图
                this.pieData(data)
                // 调用柱状图
                this.barData(data)
                // 调用折线图
                this.lineData(data[2])
            },
            pieData(data){
                var chartDom=document.querySelector('#piebox')
                var myChart=echarts.init(chartDom)
                var option={
                    title: {
                        text: '菜品销量排行榜',
                        left: '10'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        right:10,
                        bottom:50
                    },
                    series: [
                        {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: data[0],
                        emphasis: {
                            itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                        }
                    ]
                }

                option && myChart.setOption(option)
            },
            // 柱状图
            barData(data){
                var xList=[]
                var yList=[]
                data[1].forEach(item => {
                    xList.push(item.age)
                    yList.push(item['sales-volume'])
                });
                var chartDom=document.querySelector('#barbox')
                var myChart=echarts.init(chartDom)
                var option = {
                    title:{
                        text:"客户年龄分布",
                        left:10
                    },
                    xAxis: {
                        type: 'category',
                        data:xList
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                        data:yList,
                        label:{
                            show:true,
                            position:"inside"
                        },
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                        }
                    ]
                    };

                option && myChart.setOption(option)
              
            },
            // 折线图
            lineData(data){
                var xList=[]
                var yList=[]
                data.forEach(item => {
                    xList.push(item.month)
                    yList.push(item['sales-volume'])
                });
                var chartDom=document.querySelector('#linebox')
                var myChart=echarts.init(chartDom)
                var option = {
                        title:{
                            text:"菜品分类销售趋势",
                            left:10
                        },
                        xAxis: {
                            type: 'category',
                            data: xList
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                            data: yList,
                            type: 'line',
                            label:{
                                show:true,
                                position:"top"
                            }
                            }
                        ]
                    };

                option && myChart.setOption(option)
              
            },
            // 切换分类
            async changeColor(item,index){
                this.itemIndex=index
                let res = await switchCate(item);
                console.log(res,1)
                let {data}= res
                this.lineData(data)
            }

                
        }
    }
</script>

<style lang="scss" scoped>
.analysis {
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .data_top {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    .data_top_left {
      width: 49%;
      height: 400px;
      padding: 20px;
      box-sizing: border-box;
      background-color: #fff;
    }
    .data_top_right {
      width: 49%;
      height: 400px;
      padding: 20px;
      box-sizing: border-box;
      background-color: #fff;
    }
  }
  .data_bottom {
    width: 100%;
    height: 500px;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 16px;
  }
  .tab {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 400px;
    .tab_item {
      border: 2px solid #ccc;
      width: 90px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      border-left: 0;
    }
    .tab_item:first-child {
      border-left: 2px solid #ccc;
    }
    .changeColor {
      background-color: #5a99f6;
      color: #fff;
    }
  }
}
</style>