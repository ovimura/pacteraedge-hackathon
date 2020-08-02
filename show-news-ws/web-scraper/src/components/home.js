import React, {Component} from 'react';

import axios from 'axios';

class home extends Component {
    state = { newsheadlines: [], time_date: "" }

    componentDidMount() {
        axios.get("http://ec2-34-218-133-181.us-west-2.compute.amazonaws.com").then(resp => {
        var currentDate = new Date();
        let time_date = currentDate.getMonth() + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " @"+ currentDate.getHours() + ":" + currentDate.getMinutes();
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var data = resp.data;
        var arr = [];
        for(var i=0; i<data.length; i++) {
            if(data[i]['timeAndDate'].toLowerCase().includes(days[currentDate.getDay()].toLowerCase()) && 
               data[i]['timeAndDate'].toLowerCase().includes(months[currentDate.getMonth()].toLowerCase()) &&
               data[i]['timeAndDate'].toLowerCase().includes("2020")) {
                arr.push([data[i]['id'],data[i]['title'],data[i]['link'],data[i]['source'], data[i]['timeAndDate']]);
            }
        }
        this.setState({newsheadlines: arr, time_date});
        }).catch((error)=>{
              console.log(error)
            });
      }

      renderNews() {
        return this.state.newsheadlines.map((e, idx) => {
            if(idx%2===0)
                return (<tr key={idx} className="trnewss" id={idx.toString(10)}><td className="tdnews source">{e[0]}</td><td className="tdnews">{e[1]}</td><td className="tdnewss dt"><a href={e[2]}>link</a></td><td className="tdnewss dt"><a href={e[3]}>source</a></td><td className="tdnewss dt">{e[4]}</td></tr>)
            else
        return (<tr key={idx} className="trnewss even" id={idx.toString(10)}><td className="tdnews source">{e[0]}</td><td className="tdnews">{e[1]}</td><td className="tdnewss dt"><a href={e[2]}>link</a></td><td className="tdnewss dt"><a href={e[3]}>source</a></td><td className="tdnewss dt">{e[4]}</td></tr>)
        })
      }

    render() { 
        let {time_date} = this.state;
        return (
            <div  className="canv container-fluid">
            <div role="main">
            
            <h1>News of The Day </h1>
            <h2>
                <span style={{color:"purple", fontSize: "22px", paddingLeft:"4px"}}>Today is {time_date}</span>
            </h2>
            <table className="lft">
                <tbody>
                <tr>
                    <td> <div>
                        <article className="scroll tbl" tabIndex="0">
                            <table>
                                <tbody>
                                    {this.renderNews()}
                                </tbody>
                            </table>
                        </article>
                        </div>
                    </td>
                    <td>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
            </div>
        );
    }
}

export default home;