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
                    node.symbolSize = 5;
                });
                option = {
                    title: {
                        text: 'Les Miserables',
                        subtext: 'Default layout',
                        top: 'bottom',
                        left: 'right'
                        //test gitpush script
                    },
                    tooltip: {},
                    series: [
                        {
                            name: 'Les Miserables',
                            type: 'graph',
                            layout: 'force',
                            data: graph.blocks,
                            links: graph.relations,
                            roam: true,
                            label: {
                                position: 'right'
                            },
                            force: {
                                repulsion: 100
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