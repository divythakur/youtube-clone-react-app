import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FormControl from '@material-ui/core/FormControl'
import { InputLabel, Input, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import './search.css'
import YouTube from 'react-youtube'




class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchitem: "",
            basicUrl: "https://www.youtube.com/embed",
            videoId: "",
            details:{},
            success:"false"



        }

    }
    searchChangeHandler = (e) => {
        this.setState({ searchitem: e.target.value })
    }
    testHandler = () => {
        var xhr = new XMLHttpRequest();

        var u1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q="
        var u2 = this.state.searchitem;
        var u3 = "&type=video&videoDefinition=high&key=AIzaSyBSNA2ReHg-XE3KsGcsZVkbDPYmyFb6leA";
        xhr.open('Get', u1 + u2 + u3);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send();
        let that=this;
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                that.setState({details:JSON.parse(this.responseText).items});
                that.setState({success:"true"});
                var temp=that.state.details;
                console.log(temp[0]["id"]["videoId"]);

                
            }

        }
    }
    render() {
        return (
            <div>
                <form className="searchbox">
                    <Input type="text" placeholder="enter here" style={{ height: "45px", width: "80%" }} onChange={this.searchChangeHandler}></Input>
                    <Button variant="contained" color="primary" onClick={this.testHandler}> Search</Button>
                </form>
                { this.state.success=== "true" &&
                <iframe width="790" height="450" src={this.state.basicUrl + "/" +  this.state.details[0]["id"]["videoId"]} style={{ margin: "28px", marginLeft: "40px" }}>
                </iframe>
                 }
                 { this.state.success=== "false" &&
                <iframe width="790" height="450" src="https://www.youtube.com/embed/fkm3-Mm0xqE" style={{ margin: "28px", marginLeft: "40px" }}>
                </iframe>
                
                 }
                 <p>hey</p>

            </div>

        );
    }
}

export default Search;