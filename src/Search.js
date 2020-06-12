import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data.json'
import FormControl from '@material-ui/core/FormControl'
import { InputLabel, Input, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './search.css'

const trending = data.items;
var count =0;
var incre=0;
class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchitem: "",
            basicUrl: "https://www.youtube.com/embed",
            videoId: "",
            details: [],
            success: "false",
            trendingvideoId: "nqzIQh2D_Es",
            title: "",
            searchpress: "false",
            name: "",
            comment: "",
            submitpresses: "false",
            trendingtitle: "Trending Nakhra (Full Video) | Amrit Maan ft. Ginni Kapoor | Intense || Latest Songs 2018",
    
         }
      }
    searchChangeHandler = (e) => {
        this.setState({ searchitem: e.target.value })
    }

    testHandler = () => {
        incre=0;
        var xhr = new XMLHttpRequest();

        var u1 = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q="
        var u2 = this.state.searchitem;
        var u3 = "&type=video&videoDefinition=high&key=AIzaSyCZmSRawoZR94g5_-mr3UNY7PS4d33hPro";
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
               // console.log(this.state.jk);

                if (temp.length === 0) {
                    that.setState({ searchpress: "false" });
                }
                else {
                    var temp = that.state.details;
                    that.setState({ videoId: temp["0"]["id"]["videoId"] })
                    that.setState({ searchpress: "true" })
                    that.setState({title:temp["0"]["snippet"]["title"]})
                }
            }

        }

    }
    colorChangeHandler = () => {
        document.getElementById("heart").style.color = "red";
    }
    videoChange = (id, t) => {
        console.log(t);
        this.setState({ videoId: id });
        this.setState({ title: t });
       // document.getElementById('contents').innerHTML="";
        //document.getElementById('jj').innerHTML="";
        for(var i=0;i<count;i++)
        {
             var df=document.getElementsByClassName("secondarycomments")[0];
             df.remove();
        }
             
       count=0;
        this.setState({submitpresses:"false"});
    }
    videoChange2=(id,t)=>{
        
        this.setState({ trendingvideoId: id });
        this.setState({ trendingtitle: t });
       // document.getElementById('contents').innerHTML="";
        //document.getElementById('jj').innerHTML="";
        console.log(count);
        

        for(var i=0;i<count;i++)
        {
             var df=document.getElementsByClassName("secondarycomments")[0];
             df.remove();
        }
               

        

        this.setState({submitpresses:"false"});
        count=0;
        



    }
    onCommentHandler = (e) => {
        console.log(e);
        var f = e;
        count=count+1;
       var y="";

        var t = document.getElementById("inputboxname");
        t.value = t.defaultValue;
        var h = document.getElementById("inputboxcomment");
        h.value = h.defaultValue;


        var namedummy = this.state.name;
        var commentdummy = this.state.comment;
           if(this.state.name != "")
           { var ele='<div class="secondarycomments">'+
            '<div id="hey">'+
             '<div class="comment-box">'+
              '  <i class="fa fa-user" aria-hidden="true" id="logo"></i>' +
              '  <div id="inner" >' +

                   ' <span  > <h3 id="contents">'+namedummy+'</h3>'+
                        '<p id="jj">'+commentdummy+'</p>'+
                   ' </span>'+
                '</div>'+

            '</div>'+
        '</div><br/>'+
        '</div>'
        document.getElementsByName(f)[0].innerHTML= document.getElementsByName(f)[0].innerHTML+ele;
}            
        this.setState({name:y});


        
      

    }

    onnameChangeHandler = (e) => {
        this.setState({ name: e.target.value });

    }

    oncommentChangeHandler = (e) => {
        this.setState({ comment: e.target.value });
    }
    onCancelHandler=()=>{
        var t = document.getElementById("inputboxname");
        t.value = t.defaultValue;
        var h = document.getElementById("inputboxcomment");
        h.value = h.defaultValue;

    }
    componentDidMount() {
        this.setState({ submitpresses: "false" });
        console.log("i am called");
    }
    componentWillMount(){
        console.log("will is called")
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <form className="searchbox">
                    <Input type="text" placeholder="enter here" style={{ height: "45px", width: "80%" }} onChange={this.searchChangeHandler}></Input>
                    <Button variant="contained" color="primary" onClick={this.testHandler}> Search</Button>
                </form>
                {this.state.success === "true" && this.state.searchpress === "true" &&
                    <div style={{ width: "790px" }}>
                        <iframe width="790" height="450" src={this.state.basicUrl + "/" + this.state.videoId} style={{ margin: "28px", marginLeft: "40px" }}>
                        </iframe>
                        <div className="title">
                            <h2 style={{ float: "left", width: "90%" }}>{this.state.title}</h2>
                            <p style={{ float: "right" }}  ><i id="heart" className="fas fa-heart" onClick={this.colorChangeHandler}></i></p>
                            <h3>Comments</h3>


                        </div>
                        <form>
                            <InputLabel htmlFor="name" style={{ marginLeft: "25px",marginTop: "41px;" }}>NAME</InputLabel>
                            <Input type="text" id="inputboxname" style={{ marginLeft: "25px" }} onChange={this.onnameChangeHandler} />
                            <div className="comment">
                                <InputLabel htmlFor="comment">Comment here</InputLabel>
                                <Input type="text" id="inputboxcomment" onChange={this.oncommentChangeHandler} />

                            </div>
                            <div className="sub">
                                <Button variant="outlined" color="primary" onClick={this.onCommentHandler.bind(this, this.state.videoId)}>Comment</Button>
                                <Button variant="outlined" color="primary" style={{ marginLeft: "61px" }} onClick={this.onCancelHandler}>Cancel</Button>
                            </div>


                        </form>
                        <br/><br/>
                        <div  name={this.state.videoId} id="outer">
                            {/* <div id="hey">


                                <div className="comment-box">
                                    <i className="fa fa-user" aria-hidden="true" style={{fontSize:"xx-large"}}></i>
                                    <div id="inner" >

                                        <span  > <h3 id="contents"></h3>
                                            <p id="jj"></p>
                                        </span>
                                    </div>

                                </div>
                            </div> */}


                        </div>


                    </div>
                }
                {this.state.success === "true" && this.state.searchpress === "true" &&

                    <section id="grid">
                        
                        {this.state.details.filter(til=> til.id.videoId != this.state.videoId).map((tile) =>{ 
                            incre=incre+1;
                            {console.log("out"+incre)}
                            return(
                            <div className={"inner" + incre}>
                           {  console.log("inner"+incre)}                 
               <section style={{ position: "relative", top: "0px" }}>
                                    <p style={{ width: "242px", position: "absolute", left: "231px", marginTop: "39px" }}> <span style={{ position: "absolute", marginLeft: "17px", fontWeight: "bolder" }}>{tile.snippet.title}<span style={{ fontWeight: "lighter", color: "grey" }}><br /><br />{tile.snippet.channelTitle}</span></span></p>


                                    <br /><br />
                                </section>
                                <img id={tile.id.videoId} src={tile.snippet.thumbnails.high.url} style={{ height: "177px" }} onClick={this.videoChange.bind(this, tile.id.videoId, tile.snippet.title,incre)} />
                                

                            </div>
                        )}
                        
                        )}

                    </section>
                }
                {this.state.success === "true" && this.state.searchpress === "false" &&
                    <h1 style={{ textAlign: "center", marginTop: "25%" }}>No videos found</h1>


                }
                {this.state.success === "false" &&
                    <div style={{ width: "790px" }}>
                        <iframe width="790" height="450" src={this.state.basicUrl + "/" + this.state.trendingvideoId} style={{ margin: "28px", marginLeft: "40px" }}>
                        </iframe>
                        <div className="title">
                            <h2 style={{ float: "left", width: "90%" }}>{this.state.trendingtitle}</h2>
                            <p style={{ float: "right" }}  ><i id="heart" className="fas fa-heart" onClick={this.colorChangeHandler}></i></p>
                            <h3>Comments</h3>

                        </div>
                        <form>
                            <InputLabel htmlFor="name" style={{ marginLeft: "25px" }}>NAME</InputLabel>
                            <Input type="text" id="inputboxname" style={{ marginLeft: "25px" }} onChange={this.onnameChangeHandler} />
                            <div className="comment1">
                                <InputLabel htmlFor="comment">Comment here</InputLabel>
                                <Input type="text" id="inputboxcomment" onChange={this.oncommentChangeHandler} />

                            </div>
                            <div className="sub">
                                <Button variant="outlined" color="primary" onClick={this.onCommentHandler.bind(this, this.state.videoId)}>Comment</Button>
                                <Button variant="outlined" color="primary" style={{ marginLeft: "61px" }} onClick={this.onCancelHandler}>Cancel</Button>
                            </div>

                        </form>
                        <br/><br/>
                        <div  name={this.state.videoId} id="outer">
                            {/* <div id="hey">


                                <div className="comment-box">
                                    <i className="fa fa-user" aria-hidden="true" style={{fontSize:"xx-large"}}></i>
                                    <div id="inner" >

                                        <span  > <h3 id="contents"></h3>
                                            <p id="jj"></p>
                                        </span>
                                    </div>

                                </div>
                            </div> */}


                        </div>


                    </div>
                }
                {this.state.success === "false" &&

                    <section id="grid">
                        {trending.filter(til => til.id.videoId != this.state.trendingvideoId ).map((tile) => (
                            <div >
                                <section style={{ position: "relative", top: "0px" }}>
                                    <p style={{ width: "242px", position: "absolute", left: "231px", marginTop: "39px" }}> <span style={{ position: "absolute", marginLeft: "17px", fontWeight: "bolder" }}>{tile.snippet.title}<span style={{ fontWeight: "lighter", color: "grey" }}><br /><br />{tile.snippet.channelTitle}</span></span></p>
                                      <br /><br />
                                </section>
                                <img src={tile.snippet.thumbnails.high.url} style={{ height: "177px" }} onClick={this.videoChange2.bind(this, tile.id.videoId, tile.snippet.title)}/>

                            </div>
                        ))}

                    </section>
                }




            </div>

        );
    }
}

export default Search;
