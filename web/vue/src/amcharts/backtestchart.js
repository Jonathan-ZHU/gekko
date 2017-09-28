export default function(_data, _trades, _height) {

    // console.log("_data");
    // console.log(_data);
    // console.log("_trades");
    // console.log(_trades);
    // console.log("_height");
    // console.log(_height);

    const trades = _trades.map(t => {
        return {
            price: t.price,
            date: new Date(t.date),
            action: t.action
        }
    });

    const data = _data.map(c => {
        return {
            price: c.close,
            date: new Date(c.start)
        }
    });

    var dates = data.map(c => +c.date);
    var prices = data.map(c => +c.price)

    // console.log(dates);
    // console.log(prices);

    var chartData = [];
    generateChartData();

    function generateChartData() {
        // var firstDate = new Date(2012, 0, 1);
        // firstDate.setDate(firstDate.getDate() - 500);
        // firstDate.setHours(0, 0, 0, 0);

        for (var i = 0; i < dates.length; i++) {
            var newDate = new Date(dates[i]);
            //newDate.setDate(newDate.getDate() + i);

            //var a = Math.round(Math.random() * (40 + i)) + 100 + i;
            var b = Math.round(Math.random() * 100000000);

            chartData.push({
                date: newDate,
                value: prices[i],
                volume: dates[i],
            });
        }
    }

    var events = [];
    for (var i = 0; i < trades.length; i++) {
        var newDate = new Date(trades[i].date);
        var sell = (trades[i].action=='sell') ? true : false;
        var type = (sell) ? "text" : "arrowDown";
        var bcolor = (sell) ? "#e06c75" : "#98c379" ;


        // var bgc = (trades[i].action=='sell') ? "#e06c75" : "#98c379" ;
        var txt2 = (sell) ? "卖出" : "买进" ;
        // var type = (trades[i].action=='sell') ? "arrowUp" : "arrowDown" ;
        var des = newDate + "\n以" + trades[i].price + "的价格" + txt2 ;
        var txt = ""
        if(trades[i].action=='sell' && i>=1 ) {
          var profit = (trades[i].price - trades[i-1].price) / trades[i].price * 100 ;
          profit *= 1;
          profit = parseFloat(profit.toFixed(2));
          if(profit>0) {
            profit = "+" + profit;
            bcolor = "#98c379"
          }
          des += "\n 本次买卖收益为" + profit + "%";
          txt = profit + "%";
        }
        events.push({
            date: newDate,
            type: type,
            backgroundColor: bcolor ,
            graph: "g1",
            text: txt ,
            description: des
        });
    }

    console.log(trades[0]);
    console.log(dates[0]);
    console.log(events[0]);
    console.log(chartData[0]);

    window.AmCharts.makeChart("chartdiv", {
        type: "stock",
        categoryAxesSettings: {
          minPeriod: "mm",
          dashLength: 1
        },
        dataSets: [{
            color: "#61afef",
            fieldMappings: [{
                fromField: "value",
                toField: "value"
            }, {
                fromField: "volume",
                toField: "volume"
            }],
            dataProvider: chartData,
            categoryField: "date",
            // EVENTS
            stockEvents : events,
        //     stockEvents: [{
        //         date: new Date(2010, 8, 19),
        //         type: "sign",
        //         backgroundColor: "#85CDE6",
        //         graph: "g1",
        //         text: "S",
        //         description: "This is description of an event"
        //     }, {
        //         date: new Date(2010, 10, 19),
        //         type: "flag",
        //         backgroundColor: "#FFFFFF",
        //         backgroundAlpha: 0.5,
        //         graph: "g1",
        //         text: "F",
        //         description: "Some longer\ntext can also\n be added"
        //     }, {
        //         date: new Date(2010, 11, 10),
        //         showOnAxis: true,
        //         backgroundColor: "#85CDE6",
        //         type: "pin",
        //         text: "X",
        //         graph: "g1",
        //         description: "This is description of an event"
        //     }, {
        //         date: new Date(2010, 11, 26),
        //         showOnAxis: true,
        //         backgroundColor: "#85CDE6",
        //         type: "pin",
        //         text: "Z",
        //         graph: "g1",
        //         description: "This is description of an event"
        //     }, {
        //         date: new Date(2011, 0, 3),
        //         type: "sign",
        //         backgroundColor: "#85CDE6",
        //         graph: "g1",
        //         text: "U",
        //         description: "This is description of an event"
        //     }, {
        //         date: new Date(2011, 1, 6),
        //         type: "sign",
        //         graph: "g1",
        //         text: "D",
        //         description: "This is description of an event"
        //     }, {
        //         date: new Date(2011, 3, 5),
        //         type: "sign",
        //         graph: "g1",
        //         text: "L",
        //         description: "This is description of an event"
        //     }, {
        //         date: new Date(2011, 3, 5),
        //         type: "sign",
        //         graph: "g1",
        //         text: "R",
        //         description: "This is description of an event"
        //     }, {
        //         date: new Date(2011, 5, 15),
        //         type: "arrowUp",
        //         backgroundColor: "#00CC00",
        //         graph: "g1",
        //         description: "This is description of an event"
        //     }, {
        //         date: new Date(2011, 6, 25),
        //         type: "arrowDown",
        //         backgroundColor: "#CC0000",
        //         graph: "g1",
        //         description: "This is description of an event"
        //     }, {
        //         date: new Date(2011, 8, 1),
        //         type: "text",
        //         graph: "g1",
        //         text: "Longer text can\nalso be displayed",
        //         description: "This is description of an event"
        //     }]
        }],


        panels: [{
            title: "Value",
            percentHeight: 70,

            stockGraphs: [{
                id: "g1",
                valueField: "value"
            }],

            stockLegend: {
                valueTextRegular: " ",
                markerType: "none"
            }
        }],

        chartScrollbarSettings: {
            graph: "g1",
            updateOnReleaseOnly: false
        },

        chartCursorSettings: {
            valueBalloonsEnabled: true,
            graphBulletSize: 1,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true
        },


        panelsSettings: {
            mouseWheelZoomEnabled: true,
            usePrefixes: true,
            accessible: true
        }
    });
}
