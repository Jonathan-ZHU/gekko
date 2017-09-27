export default function(_data, _trades, _height) {

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
  var prices = data.map(c => +c.price);
  var datas = [];
  for (var i = 0 ; i < dates.length ; i++) {
    datas.push([dates[i],prices[i]]);
  }
  console.log(datas);
  console.log(trades);

  $('#container').highcharts({
      chart: {
          zoomType: 'x'
      },
      title: {
          text: '回溯测试图表'
      },
      subtitle: {
          text: document.ontouchstart === undefined ?
          '鼠标拖动可以进行缩放' : '手势操作进行缩放'
      },
      xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%m-%d',
              week: '%m-%d',
              month: '%Y-%m',
              year: '%Y'
          }
      },
      tooltip: {
          dateTimeLabelFormats: {
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%Y-%m-%d',
              week: '%m-%d',
              month: '%Y-%m',
              year: '%Y'
          }
      },
      yAxis: {
          title: {
              text: '价格'
          }
      },
      legend: {
          enabled: false
      },
      plotOptions: {
          area: {
              fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                      [0, Highcharts.getOptions().colors[0]],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
              },
              marker: {
                  radius: 2
              },
              lineWidth: 1,
              states: {
                  hover: {
                      lineWidth: 1
                  }
              },
              threshold: null
          }
      },
      series: [{
          type: 'area',
          name: '价格',
          data: datas
      }]
  });

}
