import React, { Component } from 'react';
import { Polar} from 'react-chartjs-2';

class Chart extends Component{
    constructor(props){
        super(props);
}
static defaultProps = {
    displayTitle : true,
    displayLegend: true,
    legendPosition : 'bottom'
}
    render(){
        return(
            <div className = "chart">
                <Polar
                    data = {this.props.data}
                    width = {100}
                    height = {25}
                    options = {{
                        maintainAspectRatio: true,
                        title:{
                            display:true,
                            text: this.props.text,
                            fontSize:50,
                        },
                        legend:{
                            display:true,
                            position:'bottom',

                        }
                    }}/>

            </div>
        )
    }
}
export default Chart;