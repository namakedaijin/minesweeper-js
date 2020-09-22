import React from 'react';

export default class Option extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            radio: [
                {name: "Easy", checked: false},
                {name: "Normal", checked: false},
                {name: "Hard", checked: false}
            ],
            clicked: null};
    }

    documentClickListener = (e) => {
        let form = document.querySelector("#mode_form");
        if(form.contains(e.target)){
            return;
        }
        this.setState({show: false});
        document.removeEventListener('click', this.documentClickListener);
    }

    showOptionPopup = () => {
        let value = this.state.radio.map((item) => {
            return ({
                name: item.name,
                checked: (item.name === this.props.mode)? true: false
            });
        });
        this.setState({
            show: true,
            radio: value,
            clicked: this.props.mode
        });
        document.addEventListener('click', this.documentClickListener);
    }

    hideOptionPopup = () => {
        this.setState({show: false});
    }

    onRadioClick = (e) => {
        let name = e.target.name;
        let value = this.state.radio.map((item) => {
            return ({
                name: item.name,
                checked: (item.name === name)? true: false
            });
        });
        this.setState({
            radio: value,
            clicked: name
        });
    }

    onSubmit = () => {
        this.hideOptionPopup();
        this.props.onChangeMode(this.state.clicked);
    }
    
    getItems = () => {
        let items = this.state.radio.map((radio, index) => {
            return (
                <label key={index} name="items">
                    <input 
                        type="radio"
                        name={radio.name}
                        value={radio.name}
                        checked={radio.checked}
                        onChange={this.onRadioClick} />
                    {radio.name}
                    <br />
                </label>
            );
        });
        return items;
    }

    render(){
        if(this.state.show){
            return (
                <div  id="mode_form">
                    <button className="option_button" onClick={this.hideOptionPopup}/>
                    <form className="form-show">
                        {this.getItems()}
                        <button type="button" className="submit_radio" name="submit_radio" onClick={this.onSubmit} >
                            NEW GAME
                        </button>
                    </form>
                </div>
            );
        }else{
            return (
                <div  id="mode_form">
                    <button className="option_button" onClick={this.showOptionPopup}/>
                    <form className="form-hide">
                        {this.getItems()}
                        <button type="button" className="submit_radio" name="submit_radio" onClick={this.onSubmit} >
                            NEW GAME
                        </button>
                    </form>
                </div>
            );
        }
    }
}