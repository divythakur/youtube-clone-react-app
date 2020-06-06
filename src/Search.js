import React ,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import FormControl from '@material-ui/core/FormControl'
import { InputLabel, Input, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import './search.css'



class Search extends Component {
    constructor(){
        super();
        this.state={
                searchitem:""
            }
        
    }
    searchChangeHandler=(e)=>{
        this.setState({searchitem:e.target.value})
        console.log(this.state.searchitem)

    }
    testHandler=()=>{
        console.log(this.state.searchitem)
    }
    render(){
    return (
      <div>
        <form className="searchbox">
          <Input  type="text" placeholder="enter here" style={{height:"45px",width:"80%"}} onChange={this.searchChangeHandler}></Input>
          <Button variant="contained" color="primary" onClick={this.testHandler}> Search</Button>
        </form>
      </div>
     
    );
    }
  }
  
  export default Search;