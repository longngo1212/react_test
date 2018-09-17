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
        this.onClick = this.onClick.bind(this);
    }


    onDishChange = name => event => {
        console.log("Page change is onDishChange" + event );

        // let result = Object.entries(event);
        // result.map((item, index)=>{
        //     console.log('key is:- ', item[0], ' and value is:- ', item[1]);
        // });
        this.props.onDishChange(event.value, name);
    };

    onDishCountChange (selectedOption){
        this.props.onDishCountChange(selectedOption.target.value, selectedOption.target.name);
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
        );
        return listRes;
    }


    createTable = () => {
        let table = [];

        // Outer loop to create parent
        for (let i = 0; i < this.props.selectedDishes.length; i++) {
            let children = [];
            children.push(<Select
                className="col-sm"
                name  = {i}
                key  = {"Select" + i}
                onChange={this.onDishChange(i)}
                options={this.options}
                defaultValue={  { value: this.props.selectedDishes[i].name, label: this.props.selectedDishes[i].name }}
            />);
            children.push(<input
                type="number"
                name  = {i}
                key  = {"input" + i }
                min={1} max={10}
                value={this.props.selectedDishes[i].count}
                onChange={this.onDishCountChange}/>);

            table.push(<div className="row" key  = {"div" + i}>{children}</div>)
        }
        return table
    };

    onClick() {
        this.props.addDish();
    }

    render(){
        return (
            <div style={{ width: 1000, height: 500}}>
                {this.createTable()}
                <button onClick={this.onClick}>
                    Add Dish
                </button>
            </div>
        );
    }
}

export default ScreenThree;