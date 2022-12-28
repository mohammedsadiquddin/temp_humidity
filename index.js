
function TempHumid(){
  let temp=[];
let hum=[];
let dat=[];
fetch("https://api.thingspeak.com/channels/1929757/feeds.json?timezone=Asia%2FKolkata")
.then((value1)=>{
    // console.log(value1.json());
    return value1.json();
}).then((value2)=>{
    console.log(value2);
    console.log(value2.channel.last_entry_id);
    let lastentry=value2.channel.last_entry_id;
    // console.log(value2);
    // iterating the array of feeds 
    value2.feeds.forEach((element)=>{
        //pushing all the temp entries into the temp array
        temp.push(element.field1);
        // pushing all the humid entries into the humid array 
        hum.push(element.field2);
        //pushing the dat into the dat array
        dat.push(element.created_at);
    })
    // saving the last temperature,humidity 
    let lt=temp[temp.length-1];
    let lh=hum[hum.length-1];
    let ldat=dat[dat.length-1];
    
var data = [{
  type:'scattermapbox',
  lat:['17.437462'],
  lon:['78.448288'],
  mode:'markers',
  marker: {
    color:"red",
    symbol:'marker',
    size:20,
  },
  text:`sadiq temp:${lt}, humid:${lh} with date & time ${ldat} ` 
}]

var layout = {
  // autosize: true,
  hovermode:'closest',
  mapbox: {
    // bearing:0,
    // center indicates it will open the map at specified location 
    center: {
      lat:17.437462,
      lon:78.448288
    },
    // pitch:0,
    zoom:10
  },
}

Plotly.setPlotConfig({
  mapboxAccessToken: "pk.eyJ1Ijoic2FkaXEtdWRkaW4iLCJhIjoiY2xhY245dXMyMGM3YzNvcnR1bTJkb2ZrNyJ9.TlM6Ob6sIY7noOV5ITopLg"
})

Plotly.newPlot('myDiv', data, layout)
})
}

TempHumid();