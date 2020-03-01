function buildMetadata(sample, index) {

  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  d3.json("samples.json").then(function(Data) {

    //sample data
    var id = sample.otu_ids[index];
    var otu_ids = sample.otu_ids.slice(0,10);
    var samp_vals = sample.sample_values.slice(0,10);
    var otu_labels = sample.otu_labels.slice(0,10);

    //metadata
    var meta_data = {
      id :Data.metadata[index].id,
      ethnicity :Data.metadata[index].ethnicity,
      gender: Data.metadata[index].gender,
      age :Data.metadata[index].age,
      location :Data.metadata[index].location,
      bbtype :Data.metadata[index].bbtype,
      wfreq :Data.metadata[index].wfreq,
    };

  for (i=0; i< otu_ids.length; i++ ) {
    otu_ids[i] = `OTU ${otu_ids[i]}`
  };
  // console.log(`ID = ${id}`)
  // console.log(otu_ids);
  // console.log(samp_vals);
  // console.log(otu_labels);

  // Use d3 to select the panel with id of `#sample-metadata
  // var arr = [id, ethnicity, gender, age, location, bbtype, wfreq];
  // First, update existing elements

  var sample_metadata = d3.select("#sample-metadata");
  // var li = sample_metadata.append("li"); 
  // li.text("test")
  Object.entries(meta_data).forEach(([key, value]) =>
    sample_metadata.append('li').text([key, value]));
  

  // d3.select("sample-metadata")
  //   .html(`<h2>ID: ${id}</h2>`);

  // Trace1 for the Data
  var trace1 = {
    x: samp_vals,
    y: otu_ids,
    type: "bar",
    orientation: "h"
  };

  // data
  var data = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: `Bellybutton Results for Bacteria ID: ${id}`,
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", data, layout);
});
};

function buildCharts(sample) {

    //sample data
    var otu_ids = sample.otu_ids.slice(0,10);
    var samp_vals = sample.sample_values.slice(0,10);

    var trace2 = {
      x: otu_ids,
      y: samp_vals,
      mode: 'markers',
      marker: {
        size: samp_vals
      }
    };  
    
    var data = [trace2];
    
    var layout = {
      title: `Bubble Chart!`,
      showlegend: false,
      height: 600,
      width: 1200
    };

    Plotly.newPlot('bubble', data, layout);

};
  

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // otu_ids, and labels (10 each).

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then(function(sampleNames) {
    var otu_name = sampleNames.names;
    var firstSample = sampleNames.samples[0];
    otu_name.forEach(function(sample) {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
      
      // const firstSample = sampleNames.metadata[0];
      console.log(`First sample: ${firstSample}`);
    });

    // Use the first sample from the list to build the initial plots

    buildCharts(firstSample);
    buildMetadata(firstSample, 0);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then(function(sampleNames) {
    var otu_name = sampleNames.names;

    var e = document.getElementById("selDataset");
    var newSampleName = e.options[e.selectedIndex].value;

    for (i=0; i< otu_name.length; i++ ) {
      if (otu_name[i] == newSampleName) {
        var index = i;
      }
    };
    console.log(newSampleName);
    console.log(index);
    var newSample = sampleNames.samples[index];

  buildCharts(newSample);
  buildMetadata(newSample, index);
});
};

// // Initialize the dashboard
init();
