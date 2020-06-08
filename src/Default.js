import React,{Component} from 'react';


class Default extends Component {
    constructor(){
        super();
        this.state={
            first="";
        }
    }

    render(){
        console.log(this.state.first);
        return(
            <div></div>
             

        );

    }
}
export default Default;