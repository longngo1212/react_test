import React, { Component } from 'react';
import './App.css';
import data from './dishes'
import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';
import ScreenThree from './ScreenThree';
import ScreenFour from './ScreenFour';

class App extends Component {

    dishes = data.dishes;


    constructor(props) {
        super(props);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this.onMealTypeChange = this.onMealTypeChange.bind(this);
        this.onPeopleChange = this.onPeopleChange.bind(this);
        this.onRestaurantChange = this.onRestaurantChange.bind(this);
        this.onDishChange = this.onDishChange.bind(this);
        this.state = {
            pageNumber: 1,
            numPeople: 1,
            mealType: "breakfast",
            restaurantName: null,
            selectedDishes:[
                {
                    name: "",
                    count: 0
                }
            ]
        };
    }

    handleNextClick() {
        const num = this.state.pageNumber;
        if(num === 4){
        }else {
            this.setState({ pageNumber: this.state.pageNumber + 1});
        }
    }

    handlePreviousClick() {
        const num = this.state.pageNumber;
        if(num === 1){
        }else {
            this.setState({ pageNumber: this.state.pageNumber - 1});
        }
    }

    onMealTypeChange (selectedOption) {
        this.setState({ mealType: selectedOption });
    }

    onPeopleChange(selectedOption) {
        this.setState({ numPeople: selectedOption });
    }

    onRestaurantChange(selectedOption){
        this.setState({ restaurantName: selectedOption });
    }

    onDishChange(selectedOption){
        this.setState({
            selectedDishes: [...this.state.selectedDishes, selectedOption]
        });
    }

    render() {
        const pageNumber = this.state.pageNumber;
        let nextButton, preButton;
        nextButton = <NextButton onClick={this.handleNextClick} />;
        preButton = <PreviousButton onClick={this.handlePreviousClick} />;

        return (
            <div>
                <PageNavigator pageNumber={pageNumber} />
                <PageContainer pageNumber={pageNumber}
                               onMealTypeChange = {this.onMealTypeChange}
                               onPeopleChange = {this.onPeopleChange}
                               onRestaurantChange = {this.onRestaurantChange}
                               onDishChange = {this.onDishChange}
                               numPeople = {this.state.numPeople}
                               mealType = {this.state.mealType}
                               dishes = {this.dishes}
                               selectedDishes = {this.selectedDishes}
                               restaurantName = {this.state.restaurantName}/>
                {preButton}{nextButton}
            </div>
        );
    }
}

class PageNavigator extends Component {

    renderSquare(string, screenId, currentId) {
        return <Square value={string} screenId={screenId} currentId = {currentId}/>;
    }

    render(){

        const screenId = this.props.pageNumber;

        return (
            <div className="board-row">
                {this.renderSquare("Step 1", 1, screenId)}
                {this.renderSquare("Step 2", 2, screenId)}
                {this.renderSquare("Step 3", 3, screenId)}
                {this.renderSquare("Review", 4, screenId)}
            </div>
        );
    }
}

class PageContainer extends Component {

    filterDishesByMeal(listDishes, mealType){
        const result = listDishes.filter(dish => dish.availableMeals.includes(mealType));
        return result;
    }

    filterDishesByRestaurant(listDishes, restaurant){
        const result = listDishes.filter(dish => dish.restaurant === restaurant);
        return result;
    }

    render(){
        const screenId = this.props.pageNumber;

        switch (screenId) {
            case 1:
                return <ScreenOne onMealTypeChange = {this.props.onMealTypeChange}
                                  onPeopleChange = {this.props.onPeopleChange}
                                  numPeople = {this.props.numPeople}
                                  mealType = {this.props.mealType}/>;
            case 2:
                const selectedDishes = this.filterDishesByMeal(this.props.dishes,this.props.mealType);
                return <ScreenTwo selectedDishes = {selectedDishes}
                                  onRestaurantChange = {this.props.onRestaurantChange}
                                  restaurantName = {this.props.restaurantName}/>;
            case 3:

                const dishes = this.filterDishesByMeal(this.props.dishes,this.props.mealType);
                const restaurantDishes = this.filterDishesByRestaurant(dishes,this.props.restaurantName);

                return <ScreenThree restaurantDishes = {restaurantDishes}
                                    onDishChange = {this.props.onDishChange}
                                    selectedDishes = {this.props.selectedDishes}/>;
            case 4:
                return <ScreenFour/>;
            default:
                return <ScreenFour/>;
        }
    }
}

function NextButton(props) {
    return (
        <button className="buttonRight"   onClick={props.onClick}>
            Next
        </button>
    );
}

function PreviousButton(props) {
    return (
        <button className="buttonLeft"  onClick={props.onClick}>
            Previous
        </button>
    );
}

class Square extends React.Component {


    render() {

        if (this.props.screenId === this.props.currentId) {
            return (
                <button className="square">
                    Active
                </button>
            );
        }else{
            return (
                <button className="square">
                    {this.props.value}
                </button>
            );
        }
    }
}

export default App;
