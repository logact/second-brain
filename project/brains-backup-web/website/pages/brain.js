import React, {useEffect} from "react";
import * as echarts from "echarts";
import jquery from "jquery"

export default function Brain() {
    const initChart = () => {
        let dom = document.getElementById('brainContainer');
        let myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        let ROOT_PATH = 'https://echarts.apache.org/examples';
        let option;

        myChart.showLoading();


        jquery.getJSON(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph) {
            myChart.hideLoading();
            option = {
                tooltip: {},
                legend: [
                    {
                        data: graph.categories.map(function (a) {
                            return a.name;
                        })
                    }
                ],
                series: [
                    {
                        name: 'Les Miserables',
                        type: 'graph',
                        layout: 'none',
                        data: graph.nodes,
                        links: graph.links,
                        categories: graph.categories,
                        roam: true,
                        label: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        },
                        labelLayout: {
                            hideOverlap: true
                        },
                        scaleLimit: {
                            min: 0.4,
                            max: 2
                        },
                        lineStyle: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                ]
            };
            myChart.setOption(option);
        });

        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);
    }
    useEffect(() => {
        initChart()
    }, [])

    return (
        <div id='brainContainer' style={{width: '80%', margin: '0 auto', height: '600px'}}>

        </div>
    )
}