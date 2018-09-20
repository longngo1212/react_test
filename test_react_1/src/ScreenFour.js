import {Component} from "react";
import React from "react";
import './ScreenFour.css';

class ScreenFour extends Component {

    createTable = () => {
        let table = [];

        // Outer loop to create parent
        for (let i = 0; i < this.props.selectedDishes.length; i++) {
            let children = [];
            children.push(<h1 className="col-sm" style={{ fontSize: 15 }}>{this.props.selectedDishes[i].name}</h1>);
            children.push(<h1 className="col-sm" style={{ fontSize: 15 }}>{this.props.selectedDishes[i].count}</h1>);
            table.push(<div className="row" key  = {"div" + i}>{children}</div>)
        }
        return table
    };

    render(){
        return <div  style={{ width: 1000, height: 500 }}>
            <div  style={{ width: 500, height: 500 }} className="row" >
                <div className="col-sm" style={ { fontSize: 15 }}>
                    <h1 style={{ fontSize: 15 }}>Meal</h1>
                    <h1 style={{ fontSize: 15 }}>Number of people</h1>
                    <h1 style={{ fontSize: 15 }}>Restaurant</h1>
                    <h1 style={{ fontSize: 15 }}>Dishes</h1>
                </div>
                <div className="col-sm" style={{ fontSize: 15 }}>
                    <h1 style={{ fontSize: 15 }}>{this.props.mealType}</h1>
                    <h1 style={{ fontSize: 15 }}>{this.props.numPeople}</h1>
                    <h1 style={{ fontSize: 15 }}>{this.props.restaurantName}</h1>
                    <div className="row"  style={{  border:'2px solid #000000' }}> {this.createTable()}</div>
                </div>
            </div>
        </div>;
    }
}
export default ScreenFour;
