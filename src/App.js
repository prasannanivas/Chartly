import React, { Component } from 'react';
import {Route,Switch,NavLink} from 'react-router-dom';
import './App.css';
import Bar from './Components/Bar';
import Line from './Components/Line';
import Pie from './Components/Pie';
import Polar from './Components/Polar';
import Doughnut from './Components/Doughnut';



class app extends Component{
  constructor(props){
    super(props);
    this.state = {
      id : 0,
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
    this.setState(prev => ({
      id: prev.id+1,
      chartData: dupeChartdata,
      Numbervalue:'',
      Labelvalue:'',
    }))
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
    const tableviewer = () => {
      console.log(this.state.id)
      for(let i=0;  i <=this.state.chartData.labels[this.state.id - 1];i++){
        return(
          <table>
          <tr>
            <td>{this.state.chartData.labels[i]}</td>
            <td>{this.state.chartData.datasets[0].data[i]}</td>
          </tr>
        }
          </table>
        )
      }}
    return(
      <div className = "App">
        {!this.state.isTitleadded? 
        <form onSubmit = {this.submitHandler}>
          <input required type = 'text' placeholder = 'title' value = {this.state.titleValue} onChange = {this.titleChangeHandler} ></input>
          <input className = "btn" style = {{backgroundColor : 'green',color : "white"}} type = "submit"/>
        </form>:
        <form>
          <input required type = 'text' placeholder = 'Label' value = {this.state.Labelvalue} onChange = {this.LabelchangeHandler}></input>
          <input required type = 'number' placeholder = 'value' value = {this.state.Numbervalue} onChange = {this.NumberchangeHandler}/>
          <button className="btn bg-blue-200" style={{backgroundColor:"aqua"}} onClick = {this.saveHandler}>Save</button>
        </form>}
        <table>
          {tableviewer()}
          </table>
        <div>
          <NavLink exact to='/bar'><button className = "btn">bar</button></NavLink>
          <NavLink exact to='/pie'><button className = "btn">pie</button></NavLink>
          <NavLink exact to='/line'><button className = "btn">line</button></NavLink>
          <NavLink exact to='/polar'><button className = "btn">polar</button></NavLink>
          <NavLink exact to='/doughnut'><button className = "btn">doughnut</button></NavLink>

          <Switch>
              <Route exact path = '/bar' render = {() => <Bar data = {this.state.chartData} text = {this.state.titletext}/>}/>
              <Route exact path = '/line' render = {() => <Line data = {this.state.chartData} text = {this.state.titletext}/>}/>  
              <Route exact path = '/pie' render = {() => <Pie data = {this.state.chartData} text = {this.state.titletext}/>}/>  
              <Route exact path = '/polar' render = {() => <Polar data = {this.state.chartData} text = {this.state.titletext}/>}/>  
              <Route exact path = '/doughnut' render = {() => <Doughnut data = {this.state.chartData} text = {this.state.titletext}/>}/>  
          </Switch>
      </div>
      </div>   
    )
  }
}
export default app;