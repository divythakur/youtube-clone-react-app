import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl'
import { InputLabel, Input, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import './search.css'
import YouTube from 'react-youtube'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
        overflow:"Hidden"
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});



class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchitem: "",
            basicUrl: "https://www.youtube.com/embed",
            videoId: "",
            details: [],
            success: "false"



        }

    }
    searchChangeHandler = (e) => {
        this.setState({ searchitem: e.target.value })
    }
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    testHandler = () => {
        var xhr = new XMLHttpRequest();

        var u1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q="
        var u2 = this.state.searchitem;
        var u3 = "&type=video&videoDefinition=high&key=AIzaSyCW87H7AN_LIo5agdX_0l4i59ANxQAKdwk";
        xhr.open('Get', u1 + u2 + u3);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send();
        let that = this;
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                that.setState({ details: JSON.parse(this.responseText).items });
                that.setState({ success: "true" });
                var temp = that.state.details;
                console.log(temp);
                console.log(temp['0']['snippet']['thumbnails']['high']['url']);
                console.log(temp["0"]['channelTitle']);


            }

        }
    }
    colorChangeHandler = () => {
        document.getElementById("heart").style.color = "red";
    }

    hey() {
        alert("sx");
    }
    render() {
        const { classes } = this.props;




        return (
            <div>
                <form className="searchbox">
                    <Input type="text" placeholder="enter here" style={{ height: "45px", width: "80%" }} onChange={this.searchChangeHandler}></Input>
                    <Button variant="contained" color="primary" onClick={this.testHandler}> Search</Button>
                </form>
                {this.state.success === "true" &&
                    <div style={{width:"790px"}}>
                        <iframe width="790" height="450" src={this.state.basicUrl + "/" + this.state.details[0]["id"]["videoId"]} style={{ margin: "28px", marginLeft: "40px" }}>
                        </iframe>
                        <div className="title">
                            <h2 style={{ float: "left", width: "90%" }}>{this.state.details[0]["snippet"]['title']}</h2>
                            <p style={{ float: "right" }}  ><i id="heart" className="fas fa-heart" onClick={this.colorChangeHandler}></i></p>
                        </div>


                    </div>
                }

                {/* {this.state.success === "false" && this.state.details &&
                   
            
                    <iframe width="790" height="450" src={this.state.basicUrl + "/" + this.state.details[0]["id"]["videoId"]} style={{ margin: "28px", marginLeft: "40px" }}>
                    </iframe>
                    
                    
                } */}
                { this.state.success === "true" &&
                // <div className={classes.root}>
                //     <GridList  id="grid" cellHeight={140} cols={1} spacing={15} className={classes.gridList}>
                //         <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                //         </GridListTile>
                //         {this.state.details.map((tile) => (
                //             <div>
                //             <GridListTile>
                                
                //                 <img src={tile.snippet.thumbnails.high.url} />

                                
                //             </GridListTile>
                //             </div>

                //         ))}
                //     </GridList>
                // </div>
                <section id="grid">
                     {this.state.details.map((tile) => (
                            <div >
                                 <section style={{position:"relative",top:"0px"}}>
                     <p  style={{width:"242px",position:"absolute",left:"231px",marginTop:"39px"}}> <span style={{position:"absolute",marginLeft:"17px",fontWeight:"bolder"}}>{tile.snippet.title}<span style={{fontWeight:"lighter",color:"grey"}}><br/><br/>{tile.snippet.channelTitle}</span></span></p>
                            
                                 
                                 <br /><br />
                                 </section>
                                 <img src={tile.snippet.thumbnails.high.url} style={{height:"177px"}} />
                                
                            </div>
                     ))}

                 </section>
    }

            </div>

        );
    }
}

export default withStyles(styles)(Search);
