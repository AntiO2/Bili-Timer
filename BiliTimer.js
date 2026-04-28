// ==UserScript==
// @name         Bili-Timer
// @namespace    AntiO2
// @version      1.1.0
// @description  统计视频剩余时间
// @author       AntiO2
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/play/*
// @match        https://www.bilibili.com/cheese/play/*
// @icon         https://img.moegirl.org.cn/common/f/f5/Bilibili_Icon.svg
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      api.bilibili.com
// @require      https://code.jquery.com/jquery-3.6.1.min.js
// @require      https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js
// @run-at       document-end
// @homepage     https://github.com/AntiO2/Bili-Timer
// @supportURL   https://github.com/AntiO2/Bili-Timer/issues

// ==/UserScript==

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('Bili', {
        "color": [
            "rgb(242,93,142)",
            "rgb(0,174,236)",
            "#626c91",
            "#a0a7e6",
            "#c4ebad",
            "rgb(0,174,236)"
        ],
        "backgroundColor": "rgba(255,255,255,0)",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#666666"
            },
            "subtextStyle": {
                "color": "#999999"
            }
        },
        "line": {
            "itemStyle": {
                "borderWidth": "2"
            },
            "lineStyle": {
                "width": "3"
            },
            "symbolSize": "8",
            "symbol": "emptyCircle",
            "smooth": false
        },
        "radar": {
            "itemStyle": {
                "borderWidth": "2"
            },
            "lineStyle": {
                "width": "3"
            },
            "symbolSize": "8",
            "symbol": "emptyCircle",
            "smooth": false
        },
        "bar": {
            "itemStyle": {
                "barBorderWidth": "0",
                "barBorderColor": "#ccc"
            }
        },
        "pie": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#ccc"
            }
        },
        "scatter": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#ccc"
            }
        },
        "boxplot": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#ccc"
            }
        },
        "parallel": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#ccc"
            }
        },
        "sankey": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#ccc"
            }
        },
        "funnel": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#ccc"
            }
        },
        "gauge": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#ccc"
            }
        },
        "candlestick": {
            "itemStyle": {
                "color": "#e6a0d2",
                "color0": "transparent",
                "borderColor": "#e6a0d2",
                "borderColor0": "#3fb1e3",
                "borderWidth": "2"
            }
        },
        "graph": {
            "itemStyle": {
                "borderWidth": "0",
                "borderColor": "#ccc"
            },
            "lineStyle": {
                "width": "1",
                "color": "#cccccc"
            },
            "symbolSize": "8",
            "symbol": "emptyCircle",
            "smooth": false,
            "color": [
                "rgb(242,93,142)",
                "rgb(0,174,236)",
                "#626c91",
                "#a0a7e6",
                "#c4ebad",
                "rgb(0,174,236)"
            ],
            "label": {
                "color": "#ffffff"
            }
        },
        "map": {
            "itemStyle": {
                "areaColor": "#eeeeee",
                "borderColor": "#aaaaaa",
                "borderWidth": 0.5
            },
            "label": {
                "color": "#ffffff"
            },
            "emphasis": {
                "itemStyle": {
                    "areaColor": "rgba(63,177,227,0.25)",
                    "borderColor": "#3fb1e3",
                    "borderWidth": 1
                },
                "label": {
                    "color": "#3fb1e3"
                }
            }
        },
        "geo": {
            "itemStyle": {
                "areaColor": "#eeeeee",
                "borderColor": "#aaaaaa",
                "borderWidth": 0.5
            },
            "label": {
                "color": "#ffffff"
            },
            "emphasis": {
                "itemStyle": {
                    "areaColor": "rgba(63,177,227,0.25)",
                    "borderColor": "#3fb1e3",
                    "borderWidth": 1
                },
                "label": {
                    "color": "#3fb1e3"
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "color": "#999999"
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "color": "#999999"
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "color": "#999999"
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#cccccc"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "color": "#999999"
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "borderColor": "#999999"
            },
            "emphasis": {
                "iconStyle": {
                    "borderColor": "#666666"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "#999999"
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#cccccc",
                    "width": "0"
                },
                "crossStyle": {
                    "color": "#cccccc",
                    "width": "0"
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#626c91",
                "width": 1
            },
            "itemStyle": {
                "color": "#626c91",
                "borderWidth": 1
            },
            "controlStyle": {
                "color": "#626c91",
                "borderColor": "#626c91",
                "borderWidth": 0.5
            },
            "checkpointStyle": {
                "color": "#3fb1e3",
                "borderColor": "#3fb1e3"
            },
            "label": {
                "color": "#626c91"
            },
            "emphasis": {
                "itemStyle": {
                    "color": "#626c91"
                },
                "controlStyle": {
                    "color": "#626c91",
                    "borderColor": "#626c91",
                    "borderWidth": 0.5
                },
                "label": {
                    "color": "#626c91"
                }
            }
        },
        "visualMap": {
            "color": [
                "#2a99c9",
                "#afe8ff"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(255,255,255,0)",
            "dataBackgroundColor": "rgba(222,222,222,1)",
            "fillerColor": "rgba(114,230,212,0.25)",
            "handleColor": "#cccccc",
            "handleSize": "100%",
            "textStyle": {
                "color": "#999999"
            }
        },
        "markPoint": {
            "label": {
                "color": "#ffffff"
            },
            "emphasis": {
                "label": {
                    "color": "#ffffff"
                }
            }
        }
    });
}));

(function () {

    'use strict';
    /**
     * 图表主题
     */



    /**
     * 结束图表
     */
    $(function () {
        var BiliTimer = {};// 脚本对象
        BiliTimer.setHTML = function () {
            //var vc = document.getElementsByClassName('.video-container-v1');
            var timer = $("<div class='bili-timer'>\
            <div id='bili-timer-box'>\
            <div id='bili-timer-chart-box'>\
            <div id='bili-timer-total-bar'>\
            <div id='bili-timer-total-bar-tooltip'>\
            <span id='bili-timer-total-bar-tooltip-watched'></span>\
            <span id='bili-timer-total-bar-tooltip-remain'></span>\
            </div>\
            <div id='bili-timer-total-bar-track'>\
            <div id='bili-timer-total-bar-fill'></div>\
            </div>\
            <div id='bili-timer-total-bar-label'>总合集进度 0%</div>\
            </div>\
            </div>\
            <div id='bili-timer-text'>视频<br>进度</div>\
            <div id=\"bili-timer-icon\"><svg 'xmlns =\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" fill=\"rgb(255,255,255)\" class=\"bi bi-clock-history\" viewBox=\"0 0 40 40\">\
            <path d=\"M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z\"/>\
            <path d=\"M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z\"/>\
            <path d=\"M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z\"/>\
            </svg ></div>\
            </div ></div > ");
            $('body').append(timer);

        };
        BiliTimer.setCSS = function () {
            // var timerCSS = "<style>.bili-timer{position:'fixed',left:'6px',bottom:'300px',zIndex:'100'}</style>";
            // $('header').after(timerCSS);

            $('.bili-timer').css({
                position: 'fixed',
                right: '0.6vw',
                top: '42%',
                bottom: 'auto',
                transform: 'translateY(-50%)',
                zIndex: '999999'
            });


            $('#bili-timer-box').css({
                border: '1px solid #F1F2F3',
                boxSizing: 'border-box',
                borderRadius: '6px',
                width: '48px',
                height: '48px',
                marginBottom: '12px',
                cursor: 'pointer',
                color: 'var(--text1)',
                fill: 'var(--text1)',
                textAlign: 'center',
                backgroundColor: 'rgb(255,255,255)',
                padding: '9px 5px 5px',
                lineHeight: '16px',
                position: 'relative',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible'
            });
            $('#bili-timer-text').css({
                display: 'inline-block',
                width: 'auto',
                maxWidth: '100%',
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                writingMode: 'horizontal-tb',
                lineHeight: '16px',
                textOrientation: 'mixed',
                fontSize: '14px',
                letterSpacing: '0',
                transform: 'none',
                textAlign: 'center'
            });
            $('#bili-timer-chart-box').css({
                height: '300px',
                width: '400px',
                backgroundColor: '#f0f8ff',
                position: 'absolute',
                right: '40px',
                top: '0px',
                borderRadius: '10px',
                display: 'none',
                opacity: '0.95'
            });
            $('#bili-timer-total-bar').css({
                position: 'absolute',
                bottom: '12px',
                left: '10%',
                width: '80%',
                zIndex: '3',
                textAlign: 'center'
            });
            $('#bili-timer-total-bar-track').css({
                width: '100%',
                height: '4px',
                backgroundColor: 'rgb(0,174,236)',
                borderRadius: '2px',
                overflow: 'hidden'
            });
            $('#bili-timer-total-bar-fill').css({
                height: '100%',
                width: '0%',
                backgroundColor: 'rgb(242,93,142)',
                borderRadius: '2px',
                transition: 'width 0.5s ease'
            });
            $('#bili-timer-total-bar-label').css({
                fontSize: '11px',
                color: '#b0b0b0',
                textAlign: 'center',
                letterSpacing: '0.5px',
                marginTop: '6px',
                cursor: 'default'
            });
            $('#bili-timer-total-bar-tooltip').css({
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: '6px',
                padding: '4px 10px',
                backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: '4px',
                fontSize: '11px',
                color: '#fff',
                whiteSpace: 'nowrap',
                display: 'none',
                pointerEvents: 'none'
            });
            $('#bili-timer-total-bar-tooltip-watched').css({
                color: 'rgb(242,93,142)'
            });
            $('#bili-timer-total-bar-tooltip-remain').css({
                color: 'rgb(0,174,236)'
            });
            $('#bili-timer-icon').css({
                position: 'absolute',
                display: 'none',
                cursor: 'pointer',
                width: '100 %',
                height: '100 %',
                left: '10px',
                top: '10px'

            });

        };

        /**
         * 获取时间字符串
         * @param {*} sec 
         * @returns 
         */
        BiliTimer.getFormat = function (sec) {

            var h = parseInt(sec / 3600);
            var m = parseInt((sec % 3600) / 60);
            var s = sec % 60;
            if (h == 0)
                return m + "分" + s + "秒";
            else
                return h + "时" + m + "分" + s + "秒";
        }

        var BiliChart;
        var isEstimated = false;
        var collectionIsNested = false;
        var collectionTotalPrev = 0;
        var collectionTotalRemain = 0;
        /**
         * 设置图标数据
         * @param {*} prev 已观看时长
         * @param {*} remain  剩余时长
         */
        BiliTimer.setChart = function (prev, remain) {
            var estimatedSuffix = isEstimated ? '(预估)' : '';
            var option = {
                tooltip: {
                    trigger: 'item',
                    //设置图表显示字体
                    formatter: function (sec) {
                        return sec.data.name + "<br>" + BiliTimer.getFormat(sec.data.value);
                    }
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '观看进度',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: true,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 3
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: '28',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: prev, name: '已观看' + estimatedSuffix },
                            { value: remain, name: '剩余时长' + estimatedSuffix },
                        ]
                    }
                ]
            };
            BiliChart.setOption(option);
        }
        /**
         * 初始化图表
         */
        BiliTimer.initChart = function () {
            var chart = $("<div id=\"bili-timer-chart\"></div>");
            var num = $("<div id=\"bili-timer-num\"></div>");
            chart.css({ position: 'absolute', margin: '0', width: '400px', height: '300px', opacity: '1' });
            num.css({ textAlign: 'center', position: 'relative', margin: 'auto', width: '150px', height: '100px', top: '100px', textAlign: 'center' });
            num.html('<span>观看总进度</span><br><span>0%</span>');
            num.children().first().addClass("tip").css({ position: 'relative', top: '10%', fontSize: '18px', color: 'rgb(114,100,103)' });
            num.children().last().addClass("percentage").css({ position: 'relative', top: '25%', fontSize: '36px', fontWeight: '' });

            $('#bili-timer-chart-box').append(chart);
            $('#bili-timer-chart-box').append(num);

            $('#bili-timer-total-bar').hide();
            var option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '观看进度',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: true,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 3
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: '28',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 0, name: '已观看' },
                            { value: 1, name: '剩余时长' },
                        ]
                    }
                ]
            };
            BiliChart = echarts.init(document.getElementById('bili-timer-chart'), 'Bili');
            BiliTimer.setChart(0, 1);
        }
        BiliTimer.setMouseFn = function () {
            BiliTimer.setMouseEnter = (function () {
                $('#bili-timer-box').on('mouseenter', function () {
                    $(this).css({ 'background-color': 'rgb(0,174,236)' });
                    $('#bili-timer-text').stop().fadeOut(300);
                    $('#bili-timer-icon').stop().fadeIn(300);
                    $('#bili-timer-chart-box').stop().fadeIn(300);
                });
            })();
            BiliTimer.setMouseOut = (function () {
                $('#bili-timer-box').on('mouseleave', function () {
                    $('#bili-timer-box').css({ 'background-color': 'rgb(255,255,255)' });
                    $('#bili-timer-text').stop().fadeIn(300);
                    $('#bili-timer-icon').stop().fadeOut(300);
                    $('#bili-timer-chart-box').stop().fadeOut(300);
                });
            })();
            // Total bar tooltip hover (event delegation — bar may not exist yet)
            $('#bili-timer-chart-box').on('mouseenter', '#bili-timer-total-bar', function () {
                $('#bili-timer-total-bar-tooltip').stop().fadeIn(150);
            });
            $('#bili-timer-chart-box').on('mouseleave', '#bili-timer-total-bar', function () {
                $('#bili-timer-total-bar-tooltip').stop().fadeOut(100);
            });
        }
        /**
         * 
         * @returns type 视频的类型
         */
        BiliTimer.checkType = function () {
            var path = window.location.pathname;
            if (path.indexOf('/bangumi/play/') === 0) {
                return 'bangumi';
            }
            if (path.indexOf('/cheese/play/') === 0) {
                return 'cheese';
            }
            if ($('.video-pod__list').length == 1) {
                return 'collection';
            }
            if ($('.cur-list').length == 1) {
                return 'multi';
            }
            return 'single';
        }

        /**
         * 
         * @param {string} 时间字符串 MM:SS 或者HH:MM:SS
         * @returns 时间 单位：sec
         */
        BiliTimer.getSec = function (str) {
            if (!str) {
                return NaN;
            }
            str = (str + '').replace(/\s+/g, '');
            var chinese = str.match(/(?:(\d+)时)?(?:(\d+)分)?(?:(\d+)秒)?/);
            if (chinese && chinese[0] && chinese[0].length === str.length && /时|分|秒/.test(str)) {
                return (parseInt(chinese[1] || 0) * 3600) + (parseInt(chinese[2] || 0) * 60) + parseInt(chinese[3] || 0);
            }
            var time = str.split(':');
            var rem = 0;
            if (time.length == 2)
                rem += parseInt(time[0]) * 60 + parseInt(time[1]);
            else
                rem += parseInt(time[0]) * 3600 + parseInt(time[1]) * 60 + parseInt(time[2]);
            return rem;
        }

        BiliTimer.getDurationSec = function (value) {
            if (typeof value === 'number') {
                return value > 100000 ? parseInt(value / 1000) : parseInt(value);
            }
            return BiliTimer.getSec(value);
        }

        BiliTimer.waitForPlayer = function (callback) {
            var wait = setInterval(function () {
                if (BiliTimer.getPlayerTime().ready) {
                    clearInterval(wait);
                    callback();
                }
            }, 1000);
        }

        BiliTimer.getPlayerTime = function () {
            var label = $('.bpx-player-ctrl-time-label').first();
            if (label.length == 1 && label.children().length >= 2) {
                return {
                    ready: true,
                    current: BiliTimer.getSec(label.children(':first').text()),
                    total: BiliTimer.getSec(label.children().last().text())
                };
            }

            var current = $('.squirtle-video-time-now,.edu-player-video-time-current,.current-time').first();
            var total = $('.squirtle-video-time-total,.edu-player-video-time-total,.total-time').first();
            if (current.length == 1 && total.length == 1) {
                return {
                    ready: true,
                    current: BiliTimer.getSec(current.text()),
                    total: BiliTimer.getSec(total.text())
                };
            }

            var textNodes = $('p,span,div').filter(function () {
                var text = $.trim($(this).text());
                return /^(\d+:){1,2}\d+$/.test(text);
            });
            if (textNodes.length >= 2) {
                var currentText = $.trim($(textNodes[0]).text());
                var totalText = $.trim($(textNodes[1]).text());
                return {
                    ready: true,
                    current: BiliTimer.getSec(currentText),
                    total: BiliTimer.getSec(totalText)
                };
            }

            return {
                ready: false,
                current: 0,
                total: 0
            };
        }

        BiliTimer.requestJSON = function (url) {
            return new Promise(function (resolve, reject) {
                if (typeof GM_xmlhttpRequest !== 'function') {
                    reject(new Error('GM_xmlhttpRequest is unavailable'));
                    return;
                }
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    headers: {
                        Referer: window.location.href
                    },
                    onload: function (response) {
                        try {
                            var result = JSON.parse(response.responseText);
                            if (result.code !== 0) {
                                reject(new Error(result.message || 'Request failed'));
                                return;
                            }
                            resolve(result.result || result.data || result);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    onerror: function (error) {
                        reject(error);
                    }
                });
            });
        }

        BiliTimer.parseCheeseState = function () {
            try {
                var raw = unsafeWindow.__EduPlayPiniaState__;
                if (!raw) {
                    return null;
                }
                return typeof raw === 'string' ? JSON.parse(raw) : raw;
            } catch (error) {
                return null;
            }
        }

        BiliTimer.getCurrentIdFromPath = function () {
            var match = window.location.pathname.match(/\/ep(\d+)/);
            return match ? parseInt(match[1]) : null;
        }

        BiliTimer.getBangumiSeasonId = function () {
            var seasonMatch = window.location.pathname.match(/\/ss(\d+)/);
            if (seasonMatch) {
                return parseInt(seasonMatch[1]);
            }
            try {
                var nextData = unsafeWindow.__NEXT_DATA__;
                var query = nextData && nextData.query;
                if (query && query.videoId) {
                    var queryMatch = (query.videoId + '').match(/ss(\d+)/);
                    if (queryMatch) {
                        return parseInt(queryMatch[1]);
                    }
                }
            } catch (error) {
                log(error);
            }
            return null;
        }

        BiliTimer.findCurrentIdFromDom = function (type) {
            var selectors = type === 'bangumi'
                ? [
                    '.numberListItem_select__WgCVr a[href*="/bangumi/play/ep"]',
                    '[class*="numberListItem_select__"] a[href*="/bangumi/play/ep"]',
                    '[aria-current="page"] a[href*="/bangumi/play/ep"]',
                    '[aria-selected="true"] a[href*="/bangumi/play/ep"]',
                    'a[aria-current="page"][href*="/bangumi/play/ep"]',
                    'a[aria-selected="true"][href*="/bangumi/play/ep"]',
                    '[class*="current"] a[href*="/bangumi/play/ep"]',
                    '[class*="active"] a[href*="/bangumi/play/ep"]',
                    '[class*="selected"] a[href*="/bangumi/play/ep"]'
                ]
                : [
                    '[aria-current="page"] a[href*="/cheese/play/ep"]',
                    '[aria-selected="true"] a[href*="/cheese/play/ep"]',
                    'a[aria-current="page"][href*="/cheese/play/ep"]',
                    'a[aria-selected="true"][href*="/cheese/play/ep"]',
                    '[class*="current"] a[href*="/cheese/play/ep"]',
                    '[class*="active"] a[href*="/cheese/play/ep"]',
                    '[class*="selected"] a[href*="/cheese/play/ep"]',
                    '[class*="select"] a[href*="/cheese/play/ep"]'
                ];

            for (var i = 0; i < selectors.length; i++) {
                var currentNode = $(selectors[i]).first();
                if (!currentNode.length) {
                    continue;
                }
                var currentHref = currentNode.attr('href') || '';
                var currentMatch = currentHref.match(/\/ep(\d+)/);
                if (currentMatch) {
                    return parseInt(currentMatch[1]);
                }
            }

            var hrefSelector = type === 'bangumi' ? 'a[href*="/bangumi/play/ep"]' : 'a[href*="/cheese/play/ep"]';
            var currentId = null;
            $(hrefSelector).each(function () {
                if (currentId) {
                    return false;
                }
                var node = $(this);
                var holder = node.closest('[class],[aria-current],[aria-selected]');
                var className = ((node.attr('class') || '') + ' ' + (holder.attr('class') || '')).toLowerCase();
                var isCurrent = /active|current|selected|select|playing/.test(className)
                    || node.attr('aria-current') === 'page'
                    || node.attr('aria-selected') === 'true'
                    || holder.attr('aria-current') === 'page'
                    || holder.attr('aria-selected') === 'true';
                if (!isCurrent) {
                    return;
                }
                var href = node.attr('href') || '';
                var match = href.match(/\/ep(\d+)/);
                if (match) {
                    currentId = parseInt(match[1]);
                }
            });
            return currentId;
        }

        BiliTimer.findCurrentIdFromPlayInfo = function (items) {
            var playInfo = unsafeWindow.__playinfo__ || {};
            var cid = playInfo.cid || (playInfo.data && playInfo.data.cid) || (playInfo.result && playInfo.result.cid);
            var aid = playInfo.aid || (playInfo.data && playInfo.data.aid) || (playInfo.result && playInfo.result.aid);
            for (var i = 0; i < items.length; i++) {
                if ((cid && items[i].cid == cid) || (aid && items[i].aid == aid)) {
                    return items[i].id;
                }
            }
            return null;
        }

        BiliTimer.getCurrentRemoteId = function (type, items, state) {
            var pathId = BiliTimer.getCurrentIdFromPath();
            if (pathId) {
                return pathId;
            }
            if (type === 'cheese' && state && state.index && state.index.currentEp && state.index.currentEp.id) {
                return state.index.currentEp.id;
            }
            var domId = BiliTimer.findCurrentIdFromDom(type);
            if (domId) {
                return domId;
            }
            var playInfoId = BiliTimer.findCurrentIdFromPlayInfo(items);
            if (playInfoId) {
                return playInfoId;
            }
            return items.length ? items[0].id : null;
        }

        BiliTimer.buildRemoteTime = function (items, currentId) {
            var prev = 0;
            var remain = 0;
            var currentIndex = -1;

            for (var i = 0; i < items.length; i++) {
                if (items[i].id == currentId) {
                    currentIndex = i;
                    break;
                }
            }
            if (currentIndex < 0) {
                currentIndex = 0;
            }

            for (var j = 0; j < items.length; j++) {
                if (j < currentIndex) {
                    prev += items[j].duration;
                } else if (j > currentIndex) {
                    remain += items[j].duration;
                }
            }

            return {
                prev: prev,
                remain: remain
            };
        }

        BiliTimer.getBangumiEpisodeEstimate = function (currentDuration) {
            var selectedItem = $('.numberListItem_select__WgCVr,[class*="numberListItem_select__"]').first();
            if (!selectedItem.length) {
                selectedItem = $('[aria-current="page"],[aria-selected="true"]').first();
            }
            if (!selectedItem.length) {
                return null;
            }

            var currentText = $.trim(selectedItem.attr('title') || selectedItem.find('.numberListItem_title__LNXrS').first().text());
            var currentIndex = parseInt(currentText, 10);
            if (isNaN(currentIndex) || currentIndex <= 0) {
                return null;
            }

            var list = selectedItem.closest('.numberList_wrapper___SI4W,[class*="numberList_wrapper__"]');
            if (!list.length) {
                return null;
            }

            var totalCount = list.children().length;
            if (!totalCount || currentIndex > totalCount || !currentDuration) {
                return null;
            }

            return {
                prev: (currentIndex - 1) * currentDuration,
                remain: (totalCount - currentIndex) * currentDuration
            };
        }

        BiliTimer.getCheeseDomTime = function () {
            var items = $('.section-card-list').find('.section-item,.section-season');
            if (!items.length) {
                return null;
            }

            var prev = 0;
            var remain = 0;
            var activeIndex = -1;
            var durations = [];

            items.each(function (index, item) {
                var durationText = $.trim($(item).find('.subtitle p').last().text());
                var duration = BiliTimer.getSec(durationText);
                if (isNaN(duration)) {
                    duration = 0;
                }
                durations.push(duration);
                if (
                    $(item).hasClass('active')
                    || $(item).find('.season-title-active,.season-title-ellipsis-active,.season-info-active').length
                ) {
                    activeIndex = index;
                }
            });

            if (activeIndex < 0) {
                return null;
            }

            for (var i = 0; i < durations.length; i++) {
                if (i < activeIndex) {
                    prev += durations[i];
                } else if (i > activeIndex) {
                    remain += durations[i];
                }
            }

            return {
                prev: prev,
                remain: remain
            };
        }

        BiliTimer.getCheeseCurrentDurationFromDom = function () {
            var activeItem = $('.section-card-list').find('.section-item.active,.section-season.active').first();
            if (!activeItem.length) {
                activeItem = $('.section-card-list').find('.season-title-active,.season-title-ellipsis-active,.season-info-active').first().closest('.section-item,.section-season');
            }
            if (!activeItem.length) {
                return 0;
            }
            var durationText = $.trim(activeItem.find('.subtitle p').last().text());
            var duration = BiliTimer.getSec(durationText);
            return isNaN(duration) ? 0 : duration;
        }

        BiliTimer.getCollectionDomTime = function () {
            var list = $(".right-container-inner").find('.video-pod__list').first();
            if (!list.length) {
                return null;
            }

            var pods = [];
            var activePodIndex = -1;
            var activeEntryIndex = -1;

            // Handle .pod-item (nested sub-collection structure) or
            // .video-pod__item (flat item list structure).
            var podChildren = list.children('.pod-item');
            var isFlatItems = false;

            if (!podChildren.length) {
                podChildren = list.children('.video-pod__item');
                isFlatItems = true;
            }

            if (isFlatItems) {
                // Flat list: each .video-pod__item is a single video entry.
                // Group all into one pod.
                var flatEntries = [];
                podChildren.each(function () {
                    var item = $(this);
                    var duration = BiliTimer.getSec($.trim(item.find('.duration').text()));
                    duration = isNaN(duration) ? 0 : duration;
                    flatEntries.push({
                        duration: duration,
                        active: item.is('[data-scrolled]') || item.hasClass('active') || item.find('.playing-gif:visible').length > 0
                    });
                });
                if (flatEntries.length) {
                    pods.push({ entries: flatEntries });
                }
            } else {
                podChildren.each(function () {
                    var pod = $(this);
                    var podEntries = [];

                    var pageItems = pod.find('.page-list').first().children('.page-item');
                    if (pageItems.length) {
                        pageItems.each(function () {
                            var item = $(this);
                            var duration = BiliTimer.getSec($.trim(item.find('.duration').text()));
                            duration = isNaN(duration) ? 0 : duration;
                            podEntries.push({
                                duration: duration,
                                active: item.hasClass('active') || item.find('.playing-gif:visible').length > 0
                            });
                        });
                    } else {
                        var singleItem = pod.find('.single-p .simple-base-item').first();
                        if (singleItem.length) {
                            var singleDuration = BiliTimer.getSec($.trim(singleItem.find('.duration').text()));
                            singleDuration = isNaN(singleDuration) ? 0 : singleDuration;
                            podEntries.push({
                                duration: singleDuration,
                                active: pod.attr('data-scrolled') === 'true' || singleItem.hasClass('active') || singleItem.find('.playing-gif:visible').length > 0
                            });
                        }
                    }

                    if (podEntries.length) {
                        pods.push({ entries: podEntries });
                    }
                });
            }

            // Find active entry across all pods
            for (var p = 0; p < pods.length; p++) {
                for (var e = 0; e < pods[p].entries.length; e++) {
                    if (pods[p].entries[e].active) {
                        activePodIndex = p;
                        activeEntryIndex = e;
                        break;
                    }
                }
                if (activePodIndex >= 0) break;
            }

            if (activePodIndex < 0 || !pods.length) {
                return null;
            }

            // Nested: 2+ pods exist AND at least one pod is a sub-collection (3+ entries),
            // not just individual multi-part videos.
            var isNested = pods.length > 1 && pods.some(function (p) {
                return p.entries.length >= 3;
            });

            // Sub-collection (current pod) times — for ring chart
            var subPrev = 0;
            var subRemain = 0;
            var activePod = pods[activePodIndex];
            for (var j = 0; j < activePod.entries.length; j++) {
                if (j < activeEntryIndex) {
                    subPrev += activePod.entries[j].duration;
                } else if (j > activeEntryIndex) {
                    subRemain += activePod.entries[j].duration;
                }
            }

            // Total collection times — for progress bar
            var totalPrev = 0;
            var totalRemain = 0;
            var globalActiveFound = false;
            for (var k = 0; k < pods.length; k++) {
                for (var m = 0; m < pods[k].entries.length; m++) {
                    if (k === activePodIndex && m === activeEntryIndex) {
                        globalActiveFound = true;
                        continue;
                    }
                    if (!globalActiveFound) {
                        totalPrev += pods[k].entries[m].duration;
                    } else {
                        totalRemain += pods[k].entries[m].duration;
                    }
                }
            }

            if (!isNested) {
                subPrev = totalPrev;
                subRemain = totalRemain;
            }

            return {
                prev: subPrev,
                remain: subRemain,
                isNested: isNested,
                totalPrev: totalPrev,
                totalRemain: totalRemain
            };
        }

        BiliTimer.getVideoTime = function (type) {
            var timeobj = {
                prev: 0,
                remain: 0
            };
            var re = 0, pr = 0;

            if (type == 'single') {
                return timeobj;
            }
            if (type == 'multi') {
                var multiFlag = 1;
                $(".right-container-inner").find('.list-box').children().each(function (index, now) {
                    var time_now = BiliTimer.getSec($(now).find('.duration').text());
                    if (multiFlag == 1 && now.className.length != 0) {
                        multiFlag = 0;
                    }
                    else {
                        if (multiFlag == 1) {
                            pr += time_now;
                        }
                        else {
                            re += time_now;
                        }
                    }
                });
            }
            if (type == 'collection') {
                var collectionTime = BiliTimer.getCollectionDomTime();
                if (collectionTime) {
                    timeobj.prev = collectionTime.prev;
                    timeobj.remain = collectionTime.remain;
                    collectionIsNested = collectionTime.isNested || false;
                    collectionTotalPrev = collectionTime.totalPrev || 0;
                    collectionTotalRemain = collectionTime.totalRemain || 0;
                    return timeobj;
                }
            }
            timeobj.prev = pr;
            timeobj.remain = re;
            return timeobj;
        }

        BiliTimer.observeVideoList = function (type, callback) {
            var selector = type == 'multi' ? '.list-box' : '.video-pod__list';
            var target = $(".right-container-inner").find(selector)[0];
            if (!target) {
                return;
            }
            var observer = new MutationObserver(callback);
            observer.observe(target, { attributes: true, childList: true, subtree: true });
        }

        BiliTimer.getBangumiEpisodes = async function () {
            var seasonId = BiliTimer.getBangumiSeasonId();
            if (!seasonId) {
                return [];
            }
            var data = await BiliTimer.requestJSON('https://api.bilibili.com/pgc/view/web/season?season_id=' + seasonId);
            return (data.episodes || []).map(function (item) {
                return {
                    id: item.ep_id || item.id,
                    aid: item.aid,
                    cid: item.cid,
                    duration: BiliTimer.getDurationSec(item.duration)
                };
            });
        }

        BiliTimer.getCheeseEpisodes = async function () {
            var state = BiliTimer.parseCheeseState();
            var source = state && state.index && state.index.viewInfo;
            var episodes = [];

            if (source && Array.isArray(source.episodes) && source.episodes.length) {
                episodes = source.episodes;
            } else if (source && Array.isArray(source.sections) && source.sections.length) {
                source.sections.forEach(function (section) {
                    episodes = episodes.concat(section.episodes || []);
                });
            } else {
                var seasonMatch = window.location.pathname.match(/\/ss(\d+)/);
                var seasonId = seasonMatch ? parseInt(seasonMatch[1]) : null;
                if (!seasonId) {
                    return {
                        items: [],
                        state: state
                    };
                }
                var data = await BiliTimer.requestJSON('https://api.bilibili.com/pugv/view/web/season?season_id=' + seasonId);
                episodes = data.episodes || [];
            }

            return {
                items: episodes.map(function (item) {
                    return {
                        id: item.id,
                        aid: item.aid,
                        cid: item.cid,
                        duration: BiliTimer.getDurationSec(item.duration)
                    };
                }),
                state: state
            };
        }

        /**
         * 
         * @param {*} type  视频的类型
         * @description 主函数
         */
        BiliTimer.countTime = async function (type) {
            var prevTime = 0;
            var remainTime = 0;
            var remoteItems = [];
            var remoteState = null;
            var currentRemoteId = null;
            var allowRenderWithoutPlayer = false;
            isEstimated = false;

            if (type == 'multi' || type == 'collection' || type == 'single') {
                var videoTime = BiliTimer.getVideoTime(type);
                prevTime = videoTime.prev;
                remainTime = videoTime.remain;

                if (type == 'multi' || type == 'collection') {
                    BiliTimer.observeVideoList(type, function () {
                        var changedTime = BiliTimer.getVideoTime(type);
                        prevTime = changedTime.prev;
                        remainTime = changedTime.remain;
                    });
                }
            } else {
                try {
                    if (type == 'bangumi') {
                        remoteItems = await BiliTimer.getBangumiEpisodes();
                    }
                    if (type == 'cheese') {
                        var cheeseDomTime = BiliTimer.getCheeseDomTime();
                        if (cheeseDomTime) {
                            prevTime = cheeseDomTime.prev;
                            remainTime = cheeseDomTime.remain;
                            allowRenderWithoutPlayer = true;
                        } else {
                            var cheeseData = await BiliTimer.getCheeseEpisodes();
                            remoteItems = cheeseData.items;
                            remoteState = cheeseData.state;
                        }
                    }
                    if (remoteItems.length) {
                        currentRemoteId = BiliTimer.getCurrentRemoteId(type, remoteItems, remoteState);
                        var remoteTime = BiliTimer.buildRemoteTime(remoteItems, currentRemoteId);
                        prevTime = remoteTime.prev;
                        remainTime = remoteTime.remain;
                    }
                } catch (error) {
                    log(error);
                }
            }

            var countPast = function () {
                var playerTime = BiliTimer.getPlayerTime();

                if (type == 'cheese') {
                    var latestCheeseDomTime = BiliTimer.getCheeseDomTime();
                    if (latestCheeseDomTime) {
                        prevTime = latestCheeseDomTime.prev;
                        remainTime = latestCheeseDomTime.remain;
                    } else if (remoteItems.length) {
                        var latestCheeseId = BiliTimer.getCurrentRemoteId(type, remoteItems, remoteState);
                        if (latestCheeseId != currentRemoteId) {
                            currentRemoteId = latestCheeseId;
                            var changedCheeseTime = BiliTimer.buildRemoteTime(remoteItems, currentRemoteId);
                            prevTime = changedCheeseTime.prev;
                            remainTime = changedCheeseTime.remain;
                        }
                    }
                } else if (remoteItems.length) {
                    var latestId = BiliTimer.getCurrentRemoteId(type, remoteItems, remoteState);
                    if (latestId != currentRemoteId) {
                        currentRemoteId = latestId;
                        var changedRemoteTime = BiliTimer.buildRemoteTime(remoteItems, currentRemoteId);
                        prevTime = changedRemoteTime.prev;
                        remainTime = changedRemoteTime.remain;
                    }
                } else if (type == 'bangumi') {
                    var estimatedTime = BiliTimer.getBangumiEpisodeEstimate(playerTime.total);
                    if (estimatedTime) {
                        isEstimated = true;
                        prevTime = estimatedTime.prev;
                        remainTime = estimatedTime.remain;
                    }
                } else {
                    isEstimated = false;
                }

                var pastTime = isNaN(playerTime.current) ? 0 : playerTime.current;
                var nowlength = isNaN(playerTime.total) ? 0 : playerTime.total;
                if (!playerTime.ready && type == 'cheese' && allowRenderWithoutPlayer) {
                    pastTime = 0;
                    nowlength = BiliTimer.getCheeseCurrentDurationFromDom();
                }
                var totremain = nowlength + remainTime - pastTime;
                var totprev = prevTime + pastTime;
                var totTime = totremain + totprev;
                totprev = isNaN(totprev) ? 0 : totprev;
                totTime = isNaN(totTime) || totTime <= 0 ? 1 : totTime;
                totremain = isNaN(totremain) || totremain < 0 ? 0 : totremain;
                BiliTimer.setChart(totprev, totremain);

                var percent;
                if (totprev >= totTime) {
                    percent = 100;
                }
                else if (totprev === 0) {
                    percent = 0;
                }
                else {
                    percent = ((totprev / totTime) * 100).toFixed(2);
                }
                $("#bili-timer-num").find(".percentage").text(percent + '%');

                if (collectionIsNested) {
                    var totalTotPrev = collectionTotalPrev + pastTime;
                    var totalTotRemain = Math.max(0, collectionTotalRemain + nowlength - pastTime);
                    var totalTotTime = totalTotPrev + totalTotRemain;
                    var totalPercent;
                    if (totalTotTime <= 0) {
                        totalPercent = 0;
                    } else if (totalTotPrev >= totalTotTime) {
                        totalPercent = 100;
                    } else {
                        totalPercent = ((totalTotPrev / totalTotTime) * 100).toFixed(2);
                    }
                    $('#bili-timer-num').find('.tip').text('子合集进度');
                    $('#bili-timer-total-bar-fill').css('width', totalPercent + '%');
                    $('#bili-timer-total-bar-label').text('总合集进度 ' + totalPercent + '%');
                    $('#bili-timer-total-bar-tooltip-watched').text('已观看 ' + BiliTimer.getFormat(totalTotPrev));
                    $('#bili-timer-total-bar-tooltip-remain').text('  剩余 ' + BiliTimer.getFormat(totalTotRemain));
                    $('#bili-timer-total-bar').css('display', 'block');
                } else {
                    $('#bili-timer-num').find('.tip').text('观看总进度');
                    $('#bili-timer-total-bar').css('display', 'none');
                }
            }

            if (type == 'cheese' && allowRenderWithoutPlayer) {
                countPast();
                setInterval(countPast, 1000);
                return;
            }

            BiliTimer.waitForPlayer(function () {
                countPast();
                setInterval(countPast, 1000);
            });
        }
        BiliTimer.setHTML();
        BiliTimer.setCSS();
        BiliTimer.initChart();
        BiliTimer.setMouseFn();
        BiliTimer.countTime(BiliTimer.checkType());
    });
})();
