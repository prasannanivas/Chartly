import React, { Component } from 'react';
import {Route,Switch,NavLink} from 'react-router-dom';
import './App.css';
import Bar from './Components/Bar';
import Line from './Components/Line';
import Pie from './Components/Pie';


class app extends Component{
  constructor(props){
    super(props);
    this.state = {
      isTitleadded : false,
      titletext : '',
      Labelvalue :'',
      Numbervalue:'',
      chartData:{
          labels:[],
          datasets:[{
              label : '',
              data :[],
              backgroundColor:[],
          }],
      }
    }
    this.LabelchangeHandler = this.LabelchangeHandler.bind(this);
    this.NumberchangeHandler = this.NumberchangeHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  LabelchangeHandler(evt){ 
    this.setState({
      Labelvalue: evt.target.value,
    });
  }
  NumberchangeHandler(evt){
    this.setState({
      Numbervalue: evt.target.value,
    });
  }
  saveHandler(e){
    e.preventDefault();
    let Labelarr = [...this.state.chartData.labels];
    console.log(this.state.Labelvalue);
    Labelarr.push(this.state.Labelvalue);
    console.log(Labelarr);
    let Numberarr = [...this.state.chartData.labels];
    Numberarr.push(this.state.Numbervalue);
    let dupeNumberdata = this.state.chartData.datasets[0].data;
    let dupebg = this.state.chartData.datasets[0].backgroundColor;
    dupeNumberdata.push(this.state.Numbervalue);
    dupebg.push('rgb('+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+')');
    let dupeDataset = [{...this.state.chartData.datasets[0],data:dupeNumberdata, backgroundColor:dupebg}];
    let dupeChartdata = {...this.state.chartData,labels:Labelarr,datasets:dupeDataset};
    this.setState({
      chartData: dupeChartdata,
      Numbervalue:'',
      Labelvalue:'',
    })
  }
  submitHandler(event){
    event.preventDefault();
    this.setState((prev)=>({
      isTitleadded: true,
      titletext: prev.titletext,
    }));
  }
  titleChangeHandler(evt){
    console.log(evt.target.value);
    this.setState({
      titletext: evt.target.value
    })
  }
  render(){
    return(
      <div className = "App">
        {!this.state.isTitleadded? 
        <form onSubmit = {this.submitHandler}>
          <input type = 'text' placeholder = 'title' value = {this.state.titleValue} onChange = {this.titleChangeHandler} ></input>
          <input className = "btn" style = {{backgroundColor : 'green',color : "white"}} type = "submit"/>
        </form>:
        <form>
          <input type = 'text' placeholder = 'Label' value = {this.state.Labelvalue} onChange = {this.LabelchangeHandler}></input>
          <input type = 'number' placeholder = 'value' value = {this.state.Numbervalue} onChange = {this.NumberchangeHandler}/>
          <button className="btn bg-blue-200" style={{backgroundColor:"aqua"}} onClick = {this.saveHandler}>Save</button>
        </form>}
        <div>
          <NavLink to='/bar'><button className = "btn">bar</button></NavLink>
          <NavLink to='/pie'><button className = "btn">pie</button></NavLink>
          <NavLink to='/line'><button className = "btn">line</button></NavLink>
          <switch>
              <Route exact path = '/bar' render = {() => <Bar data = {this.state.chartData} text = {this.state.titletext}/>}/>
              <Route exact path = '/line' render = {() => <Line data = {this.state.chartData} text = {this.state.titletext}/>}/>  
              <Route exact path = '/pie' render = {() => <Pie data = {this.state.chartData} text = {this.state.titletext}/>}/>  
          </switch>
      </div>
      </div>   
    )
  }
}
export default app;