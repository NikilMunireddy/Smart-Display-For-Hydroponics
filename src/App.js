import React, { Component } from 'react';
import Gauge from 'react-svg-gauge';
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import LiquidFillGauge from 'react-liquid-gauge';
import Thermometer from 'react-thermometer-component'
import Clock from 'react-live-clock';
import './App.css';
import './styles.css';
import sun from './sun.png'
import night from './night.svg'
import CircularProgressbar from 'react-circular-progressbar';
import onbtn from './gears.gif'
import offbtn from './gear.jpg'
import lighton from './LightOn.png'
import lightoff from './LightOff.png'

import ReactCountdownClock from 'react-countdown-clock';

import Websocket from 'react-websocket';
import { isNull } from 'util';


class WaterpH extends Component {
  constructor(){
    super()
    this.state = {
        value :0,
        colorval : '',
        d1:null,
        string:''
    }
    
}

handleData1(data1) {
  let v=data1.split(',')
  this.setState({d1: v[0]});
}

  render() {
 
    setInterval(()=>{
      let c=this.state.d1
      if (c<14)
     {
       
      this.setState({value :c})
      if(c>=0 && c<=1)
      {
        this.setState({colorval :'#FF0000'})
      }
      else if(c>1 && c<=2)
      {
        this.setState({colorval :'#FF1493'})
      }
      else if(c>2 && c<=3)
      {
        this.setState({colorval :'#DB7093'})
      }
      else if(c>3 && c<=4)
      {
        this.setState({colorval :'#FFA07A'})
      }
      else if(c>4 && c<=5)
      {
        this.setState({colorval :'#FF7F50'})
      }
      else if(c>5 && c<=6)
      {
        this.setState({colorval :'#FFA500'})
      }
      
      else if(c>6 && c<=7)
      {
        this.setState({colorval :'#FFD700'})
      }
      else if(c>7 && c<=8)
      {
        this.setState({colorval :'#32CD32'})
      }
      else if(c>8 && c<=9)
      {
        this.setState({colorval :'#66CDAA'})
      }
      else if(c>9 && c<=10)
      {
        this.setState({colorval :'#00BFFF'})
      }
      else if(c>10 && c<=11)
      {
        this.setState({colorval :'#7B68EE'})
      }
      else if(c>11 && c<=12)
      {
        this.setState({colorval :'#0000CD'})
      }
      else if(c>12 && c<=13)
      {
        this.setState({colorval :'#00008B'})
      }
      else
      {
        this.setState({colorval :'#191970'})
      }
      
  }
  else
  { c=14
   this.setState({d1 :c})
    }
  }, 2000)


    return (
        <div>
          <Websocket url='ws://0.0.0.0:6969/'
                onMessage={this.handleData1.bind(this)}/>
            <Gauge value={this.state.d1} width={400} height={320} max={14} color={this.state.colorval} label="Water pH" />
        </div>
    );
  }

  componentWillMount(){
  }
}

class WaterLevel extends Component {
  state = {
      value: 50
  };
  startColor = '#dc143c'; 
  endColor = '#6495ed'; 
constructor(){
  super();
  this.state={
    val:null,
    string:''
  }
}

handleData1(data1) {
  let v=data1.split(',')
  this.setState({value: v[3]});
}

  render() {
      const radius = 200;
      const interpolate = interpolateRgb(this.startColor, this.endColor);
      const fillColor = interpolate(this.state.value / 100);
      const gradientStops = [
          {
              key: '0%',
              stopColor: color(fillColor).darker(0.5).toString(),
              stopOpacity: 1,
              offset: '0%'
          },
          {
              key: '50%',
              stopColor: fillColor,
              stopOpacity: 0.75,
              offset: '50%'
          },
          {
              key: '100%',
              stopColor: color(fillColor).brighter(0.5).toString(),
              stopOpacity: 0.5,
              offset: '100%'
          }
      ];

      return (
          <div>
            <h2>Water level</h2>
              <LiquidFillGauge
                  style={{ margin: '0' }}
                  width={radius }
                  height={radius }
                  value={this.state.value}
                  percent="%"
                  textSize={1}
                  textOffsetX={0}
                  textOffsetY={0}
                  textRenderer={(props) => {
                      const value = Math.round(props.value);
                      const radius = Math.min(props.height / 2, props.width / 2);
                      const textPixels = (props.textSize * radius / 2);
                      const valueStyle = {
                          fontSize: textPixels
                      };
                      const percentStyle = {
                          fontSize: textPixels * 0.6
                      };

                      return (
                          <tspan>
                              <tspan className="value" style={valueStyle}>{value}</tspan>
                              <tspan style={percentStyle}>{props.percent}</tspan>
                          </tspan>
                      );
                  }}
                  riseAnimation
                  waveAnimation
                  waveFrequency={2}
                  waveAmplitude={1}
                  gradient
                  gradientStops={gradientStops}
                  circleStyle={{
                      fill: fillColor
                  }}
                  waveStyle={{
                      fill: fillColor
                  }}
                  textStyle={{
                      fill: color('#444').toString(),
                      fontFamily: 'Arial'
                  }}
                  waveTextStyle={{
                      fill: color('#fff').toString(),
                      fontFamily: 'Arial'
                  }}
                  onClick={() => {
                      this.setState({ value: Math.random() * 100 });
                  }}
              />
              <div
                  style={{
                      margin: '20px auto',
                      width: 120
                  }}
              >
              <Websocket url='ws://0.0.0.0:6969/'
                onMessage={this.handleData1.bind(this)}/>

                 
                     
              </div>
          </div>
      );
  }
}

class Temperature extends Component {
  constructor(){
    super()
    this.state={
      val:null,
      string:''
    }
  }

  handleData1(data1) {
    let v=data1.split(',')

    this.setState({val:v[2]});
  }
  

  render()
  {
  return(
    <div>
      <Websocket url='ws://0.0.0.0:6969/'
                onMessage={this.handleData1.bind(this)}/>
    <Thermometer
      theme="light"
      value={this.state.val}
      max="100"
      steps="3"
      format="°C"
      size="large"
      height="300"
    /></div>
  );
}

  }

  class SoilpH extends Component {
    constructor(){
      super()
      this.state = {
          value :0,
          colorval : '',
          d1:null,
          string:''
      }
      
  }
  
  handleData1(data1) {
  
    let v=data1.split(',')
    this.setState({d1: v[1]});
  }
  
    render() {
   
      setInterval(()=>{
        let c=this.state.d1
        if (c<14)
       {
         
        this.setState({value :c})
        if(c>=0 && c<=1)
        {
          this.setState({colorval :'#FF0000'})
        }
        else if(c>1 && c<=2)
        {
          this.setState({colorval :'#FF1493'})
        }
        else if(c>2 && c<=3)
        {
          this.setState({colorval :'#DB7093'})
        }
        else if(c>3 && c<=4)
        {
          this.setState({colorval :'#FFA07A'})
        }
        else if(c>4 && c<=5)
        {
          this.setState({colorval :'#FF7F50'})
        }
        else if(c>5 && c<=6)
        {
          this.setState({colorval :'#FFA500'})
        }
        
        else if(c>6 && c<=7)
        {
          this.setState({colorval :'#FFD700'})
        }
        else if(c>7 && c<=8)
        {
          this.setState({colorval :'#32CD32'})
        }
        else if(c>8 && c<=9)
        {
          this.setState({colorval :'#66CDAA'})
        }
        else if(c>9 && c<=10)
        {
          this.setState({colorval :'#00BFFF'})
        }
        else if(c>10 && c<=11)
        {
          this.setState({colorval :'#7B68EE'})
        }
        else if(c>11 && c<=12)
        {
          this.setState({colorval :'#0000CD'})
        }
        else if(c>12 && c<=13)
        {
          this.setState({colorval :'#00008B'})
        }
        else
        {
          this.setState({colorval :'#191970'})
        }
        
    }
    else
    { c=14
     this.setState({d1 :c})
      }
    }, 2000)
    
  
      return (
          <div>
            <Websocket url='ws://0.0.0.0:6969/'
                  onMessage={this.handleData1.bind(this)}/>
              <Gauge value={this.state.d1} width={400} height={320} max={14} color={this.state.colorval} label="Water pH" />
          </div>
      );
    }
  
    componentWillMount(){
    }
  }
  
  
class ClockDisplay extends Component {
    state = {
      date: new Date(),
    }
   
    componentDidMount() {
      setInterval(
        () => this.setState({ date: new Date(), hour: new Date().getHours() }),
        1000
      );
    }

   
    render() {
     
      if(this.state.hour>=18)
    {
     return (
        <div>
                  <img src={night} width={60} height={50} alt={"Night"}/>
       
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'GMT+5.30'} />
        
        </div>
      );
    }
      else
    {
      return (
        <div>
                  <img src={sun} width={50} height={50} alt={"Morning"}/>
       
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'GMT+5.30'} />
        
        </div>
      );
    }
    }
  }

  class Humidity extends Component {
   constructor(){
     super();
    this.state={
      val:isNull,
      v:''
    }
   }

   handleData1(data1) {
    let v=data1.split(',')
    this.setState({val: v[4]});
  }

    render()
    {
    return(
      
      <div>
        <h2>Humidity</h2>
        <Websocket url='ws://0.0.0.0:6969/'
                onMessage={this.handleData1.bind(this)}/>
      &nbsp;&nbsp;<CircularProgressbar percentage={this.state.val}  />
      </div>
       
    );
  }
  
}

class Motor extends Component {
  constructor(){
    super()
    this.state = {
        value :0
    }
}
handleData1(data1) {
  let v=data1.split(',')
  this.setState({value:v[6]});
}
  render()
  { 
  
    if(this.state.value==='1' || this.state.value==='0')
  {
  return(
   
    <div>
      <Websocket url='ws://0.0.0.0:6969/'
  onMessage={this.handleData1.bind(this)}/>
      <h3>Water pump is on</h3>
      <img src={onbtn} alt="Motor is on" width={180} />
    </div>
  );
}
  else
 { return(
   
    <div>
      <Websocket url='ws://0.0.0.0:6969/'
  onMessage={this.handleData1.bind(this)}/>
      <h3>Water pump is off</h3>
      <img src={offbtn} alt="Motor is off" width={180}/>
    </div>
  );
}
}

  }

  class Light extends Component {
    constructor(){
      super()
      this.state = {
          value :'1'
          
      } 
  }
  handleData1(data1) {
    let v=data1.split(',')
    this.setState({value: v[5]});
  }
    render()
    { 
      
      if(this.state.value==='1')
    {
    return(
      
      <div>
        <Websocket url='ws://0.0.0.0:6969/'
  onMessage={this.handleData1.bind(this)}/>
        <h3>Light is on</h3>
        <img src={lighton} alt="Light is on" width={150} />
      </div>
    );
  }
    else
   { return(
     
      <div>
        <Websocket url='ws://0.0.0.0:6969/'
  onMessage={this.handleData1.bind(this)}/>
        <h3>Light is off</h3>
        <img src={lightoff} alt="Light is off" width={150} />
      </div>
    );
  }
  }
  
    }
class CountDown1 extends Component{
  constructor(){
    super()
    this.state={
      data:'ok',
      time_out:'',
      color_val:"#2df",
      final_time:''
    }
    this.handlechange=this.handlechange.bind(this)
    this.handleclick=this.handleclick.bind(this)
  }
handlechange(event){
  this.setState({time_out:event.target.t})
}
handleclick(){
  this.setState({final_time:this.state.time_out})
}
  render(){
    return(
      <div className="App">
        <ReactCountdownClock seconds={this.state.final_time}
                     color="#2df"
                     alpha={0.9}
                     size={250}
                     showMilliseconds="true"
                     onComplete={this.complete}
                     />,
        <input type="text" name="time" placeholder="Enter time in seconds" onChange={this.handlechange} />
        <input type="button" value="submit"ref="myinp" onClick={this.handleclick}/>
          
        </div>
    );
  }
}
class CountDown2 extends Component{
  constructor(){
    super()
    this.state={
      data:'ok',
      time_out:'',
      color_val:"#2df",
      final_time:''
    }
    this.handlechange1=this.handlechange1.bind(this)
    this.handleclick=this.handleclick.bind(this)
  }
  handlechange1(event){
    this.setState({time_out:event.target.value})
  }
  handleclick(){
    this.setState({final_time:this.state.time_out})
  }
  
  render(){
    
    return(
      <div>
        <ReactCountdownClock seconds={this.state.final_time}
                     color="#2df"
                     alpha={0.9}
                     size={250}
                     showMilliseconds="true"
                     onComplete={this.complete}
                     />,
                     <input type="text" name="time" placeholder="Enter time in seconds" onChange={this.handlechange1} />
                     <input type="button" value="submit"ref="myinp" onClick={this.handleclick}/>
          
        </div>
        
    );
  }
}


export { WaterpH,WaterLevel,Temperature,SoilpH,ClockDisplay ,Humidity,Motor,Light,CountDown1,CountDown2};

