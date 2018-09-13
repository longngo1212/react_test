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
        this.getListFromData = this.getListFromData.bind(this);
    }


    onDishChange (selectedOption){
        this.props.onDishChange(selectedOption.value);
    }

    onDishCountChange (selectedOption){
        this.props.onDishChange(selectedOption.value);
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

    render(){
        return (
            <div style={{ width: 1000, height: 200}}>
                <div className="row">
                    <Select
                        className="col-sm"
                        onChange={this.onDishChange}
                        options={this.options}
                    />
                    <input type="number" min={1} max={10} value={this.props.selectedDishes.count} onChange={this.onPeopleChange}/>
                </div>

            </div>
        );
    }
}

export default ScreenThree;