
Template.statistic.helpers({
    buy: function(){
      var val = Add_invoice.find().fetch();
      var addIna = _.pluck(val, 'cost_ua');
      return addIna;
 }
});



function drawChart(){
  var lineChartData = {
      labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь","Октябрь","Ноябрь", "Декабрь"],
      
      datasets: [{
          fillColor: "rgba(220,220,220,0)",
          strokeColor: "rgba(220,180,0,1)",
          pointColor: "rgba(220,180,0,1)",
          data: [1,525,1100,2000]
      }, {
          fillColor: "rgba(151,187,205,0)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          data: [500,300,1100,100,400,500,300,100,400,100,20,500]
      }]

  }

  Chart.defaults.global.animationSteps = 50;
  Chart.defaults.global.tooltipYPadding = 16;
  Chart.defaults.global.tooltipCornerRadius = 0;
  Chart.defaults.global.tooltipTitleFontStyle = "normal";
  Chart.defaults.global.tooltipFillColor = "rgba(0,160,0,0.8)";
  Chart.defaults.global.animationEasing = "easeOutBounce";
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.scaleLineColor = "black";
  Chart.defaults.global.scaleFontSize = 16;

  var ctx = document.getElementById("canvas").getContext("2d");
  var LineChartDemo = new Chart(ctx).Line(lineChartData, {
      pointDotRadius: 10,
      bezierCurve: false,
      scaleShowVerticalLines: false,
      scaleGridLineColor: "gray"
  });
}

Template.statistic.rendered = function(){
  drawChart();
}
