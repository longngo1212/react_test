import {Component} from "react";
import React from "react";
import './ScreenThree.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css'
import Select from 'react-select';

class ScreenThree extends Component {

    constructor(props){
        super(props);
        this.onDishChange = this.onDishChange.bind(this);
        this.onDishCountChange = this.onDishCountChange.bind(this);
        this.getListFromData = this.getListFromData.bind(this);
        this.state = {
            selectedDishes:[
                {
                    name: "",
                    count: 0
                }
            ]
        };
    }


    onDishChange = name => event => {
        console.log("Page change is onDishChange" + event );

        let result = Object.entries(event);
        result.map((item, index)=>{
            console.log('key is:- ', item[0], ' and value is:- ', item[1]);
        });
        this.props.onDishChange(event.value);
    };

    onDishCountChange (selectedOption){
        console.log("Page change is onDishCountChange " + selectedOption.target.name);
        this.setState({ value: selectedOption.target.value  });
        // this.props.onDishChange(selectedOption.target.value);
    }

    options = this.getListFromData(this.props.restaurantDishes);

    getListFromData(listData){
        let listRes = [];
        for (let i = 0; i < listData.length; i++) {
            listRes.push({"value" : listData[i].name, "label": listData[i].name});
        }

        listRes = listRes.filter((listRes, index, self) =>
            index === self.findIndex((t) => (
                t.value === listRes.value && t.label === listRes.label
            ))
        )
        return listRes;
    }


    createTable = () => {
        let table = []

        // Outer loop to create parent
        for (let i = 0; i < 3; i++) {
            let children = []
            children.push(<Select
                className="col-sm"
                name  = {"Select" + i}
                key  = {"Select" + i}
                onChange={this.onDishChange(i)}
                options={this.options}
            />)
            children.push(<input
                type="number"
                name  = {"input" + i }
                key  = {"input" + i }
                min={1} max={10}
                value={this.state.selectedDishes[0].count}
                onChange={this.onDishCountChange}/>)

            table.push(<div className="row" key  = {"div" + i}>{children}</div>)
        }
        return table
    }

    render(){
        return (
            <div style={{ width: 1000, height: 200}}>
                {this.createTable()}
            </div>
        );
    }
}

export default ScreenThree;