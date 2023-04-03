import React, {useEffect} from "react";
import * as echarts from "echarts";
import axios from "../utils/axios";

export default function Brain() {
    const initChart = () => {
        let dom = document.getElementById('brainContainer');
        let myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        let option;

        myChart.showLoading();

        axios.get('/block')
            .then(res => {
                let graph = res.data.data
                myChart.hideLoading();
                graph.blocks.forEach(function (node) {
                    node.symbolSize = node.value
                })
                option = {
                    title: {
                        text: "Neo's Brains",
                        subtext: 'Default layout',
                        top: 'bottom',
                        left: 'right'
                    },
                    tooltip: {
                        formatter: (params) => {
                            // 可以使用html语言定义tooltip
                            // return `<h2>asdfasdf</h2><h1>asdfasdf</h1>`
                            return params.data.label
                        }
                    },
                    series: [
                        {
                            draggable: true,
                            type: 'graph',
                            layout: 'force',
                            data: graph.blocks,
                            links: graph.relations,
                            roam: true,
                            label: {
                                show: true,
                                position: 'right',
                                formatter: (params) => {
                                    return params.data.label
                                }
                            },
                            force: {
                                repulsion: 100
                            },
                            lineStyle: {
                                color: 'source',
                                curveness: 0.3
                            }
                        }
                    ]
                };
                myChart.setOption(option)
            }).catch(e => {
            console.log(e)
        })
    }
    useEffect(() => {
        initChart()
    }, [])

    return (
        <div id='brainContainer' style={{width: '80%', margin: '0 auto', height: '600px'}}>

        </div>
    )
}