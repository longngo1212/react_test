import React, {Component} from "react";
import Select from 'react-select';


class ScreenTwo extends Component {

    constructor(props){
        super(props);
        this.onRestaurantChange = this.onRestaurantChange.bind(this);
        this.getListFromData = this.getListFromData.bind(this);
    }

    onRestaurantChange (selectedOption){
        this.props.onRestaurantChange(selectedOption.value);
    }

    getListFromData(listData){
        let listRes = [];
        for (let i = 0; i < listData.length; i++) {
            listRes.push({"value" : listData[i].restaurant, "label": listData[i].restaurant});
        }

        listRes = listRes.filter((listRes, index, self) =>
            index === self.findIndex((t) => (
                t.value === listRes.value && t.label === listRes.label
            ))
        )
        return listRes;
    }

    options = this.getListFromData(this.props.selectedDishes);

    render(){
        return (
            <div style={{ width: 1000, height: 200}}>
                <h1 style={{ width: 300, height: 20, fontSize: 15 }}>Please select a Restaurant</h1>
                <Select
                    onChange={this.onRestaurantChange}
                    options={this.options}
                    defaultValue={  { value: this.props.restaurantName, label: this.props.restaurantName }}
                />
            </div>
        );
    }
}


export default ScreenTwo;