import {Component} from "react";
import React from "react";
import Select from 'react-select';

class ScreenOne extends Component {

    constructor(props){
        super(props);
        this.onPeopleChange = this.onPeopleChange.bind(this);
        this.onMealTypeChange = this.onMealTypeChange.bind(this);
    }

    options = [
        { value: 'breakfast', label: 'breakfast' },
        { value: 'lunch', label: 'lunch' },
        { value: 'dinner', label: 'dinner' }
    ];

    onMealTypeChange (selectedOption){
        this.setState({ mealType: selectedOption.value });
        this.props.onMealTypeChange(selectedOption.value);
    }

    onPeopleChange (event) {
        this.setState({ numPeople: event.target.value });
        this.props.onPeopleChange(event.target.value);
    }

    render(){
        return (
            <div style={{ width: 1000, height: 500}}>
                <h1 style={{ width: 300, height: 20, fontSize: 15 }}>Please select a meal</h1>
                <Select
                    onChange={this.onMealTypeChange}
                    options={this.options}
                    defaultValue={  { value: this.props.mealType, label: this.props.mealType }}
                />
                <h1 style={{ width: 300, height: 20, fontSize: 15 }}>Please enter number of People</h1>
                <input type="number" min={1} max={10} value={this.props.numPeople} onChange={this.onPeopleChange}/>
            </div>
        );
    }
}


export default ScreenOne;