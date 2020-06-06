import React ,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import FormControl from '@material-ui/core/FormControl'
import { InputLabel, Input, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import './search.css'
import Search from './Search'


class App extends Component {
  render(){
  return (
    <div>
       <Search />
    </div>
   
  );
  }
}

export default App;
