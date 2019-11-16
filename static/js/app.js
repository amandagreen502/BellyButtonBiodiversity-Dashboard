
// Drop Down Menu Code
var dropdown_menu = d3.select("#selDataset");

data.names.forEach(function (name) {
  dropdown_menu.append("option").text(name);
});

function optionChanged(selected_id) {
 
  requiredData = data.samples.filter(i => i.id === selected_id)[0];

  barChart(requiredData);
  bubbleChart(requiredData); 

  let GaugerequiredData = data.metadata.filter(i => i.id == selected_id);

  gaugeChart(GaugerequiredData[0])

  // Demographics: 
  var ver=  GaugerequiredData[0];
  document.getElementById("sample-metadata").innerHTML = "";
  Object.keys(ver).forEach((key) => {
    document.getElementById("sample-metadata").innerHTML += key + ": " + ver[key] + "<br>";
  });
  console.log('ver');
  console.log(ver);

};


// Bar Chart :
function barChart(requiredData) {
  var labels = String(requiredData.otu_ids.slice(0, 10));
  var hovertext = requiredData.otu_labels.slice(0, 10);
  var values = requiredData.sample_values.slice(0, 10);
  
  var trace1 = {
    x: values,
    y: labels,
    text:hovertext,
    type:"bar",
    orientation:"h",};

var data = [trace1];

var layout = {

    yaxis: {
      tickmode: "array", 
      tickvals: [0,1,2,3,4,5,6,7,8,9],
      ticktext: requiredData.otu_ids.slice(0, 10),
      autorange: "reversed", 
    }};
console.log("labels")  
console.log(labels)
// console.log("hovertext")  
// console.log(hovertext)
// console.log("values")  
// console.log(values)
 Plotly.newPlot('bar', data, layout);
};


// Bubble Chart:

function bubbleChart(requiredData) {
  let x = requiredData.otu_ids;;
  let y = requiredData.sample_values;
  let markersize = requiredData.sample_values;
  let markercolors = requiredData.otu_ids;
  let textvalues = requiredData.otu_labels;
  let trace = [{
    x: x,
    y: y,
    mode: 'markers',
    marker: {
      size: markersize,
      color: markercolors,
    },
    text: textvalues
  }];
  let layout = {
    title: "<b> Belly Button Bubble Chart </b>",
    xaxis: {
      title: 'OTU ID',
    },
    yaxis: {
      title: 'Sample Value'
    },
    width: 1100,
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
  };
  Plotly.newPlot('bubble', trace, layout, { responsive: true });}

// Gauge Chart: 

function gaugeChart(GaugerequiredData){

var data = [{domain: {x: [0, 1], y: [0, 1]}, value: GaugerequiredData.wfreq,
title: {text: "Belly Button Washing Frequency Scrubs Per Week", font: {size: 14}},
type: "indicator", mode: "gauge+number+delta",
delta: {reference: 9, increasing: {color: "green"}},
gauge:
  {axis: {range: [0, 10]}, steps: [{range: [0, 5], color: "lightgray"},
  {range: [5, 8], color: "gray"}], threshold: {line: {color: "red", width: 4},
  thickness: 0.75, value: 9}}}];

var gaugeLayout = {width: 400, height: 500, margin: {t: 0, b: 0}};
Plotly.newPlot("gauge", data, gaugeLayout);
};
