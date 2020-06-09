import data from './data.json'
import React, { Component } from 'react'
const socialMediaList = data.items;


class Fetch extends Component {
    render() {
        console.log(socialMediaList);
       return(
           <div>

           {socialMediaList.map((ele)=>(
               <div>
                   {ele.snippet.title}
                </div>
               

           ))}
           </div>

       );

        
}

}
export default Fetch;