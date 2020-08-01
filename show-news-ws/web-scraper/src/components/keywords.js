import React, { Component } from 'react';

import axios from 'axios';

class Keywords extends Component {
    state = { 
        newsheadlines: [], 
        Keywords: [],
        time_date: "" 
    }
    componentDidMount() {
        axios.get("http://localhost:3030").then(resp => {
        var currentDate = new Date();
        console.log(currentDate.getTime());
        console.log(currentDate.getDate());
        console.log(currentDate.getFullYear());
        console.log(currentDate.getMonth());
        console.log(currentDate.getHours());
        console.log(currentDate.getMinutes());
        console.log(currentDate.getDay());
        let time_date = currentDate.getMonth() + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " @"+ currentDate.getHours() + ":" + currentDate.getMinutes();
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        console.log(time_date);
        var data = resp.data;
        var arr = [];
        for(var i=0; i<data.length; i++) {
            if(data[i]['timeAndDate'].toLowerCase().includes(days[currentDate.getDay()].toLowerCase()) && 
               data[i]['timeAndDate'].toLowerCase().includes(months[currentDate.getMonth()].toLowerCase()) &&
               data[i]['timeAndDate'].toLowerCase().includes("2020")) {
                arr.push([data[i]['id'],data[i]['title'],data[i]['link'],data[i]['source'], data[i]['timeAndDate']]);
            }
        }
        let exclude_kws = ['a', 'an', 'is', 'the', 'this', 'that']
        let headlines_kws = []
        for(var j=0; j<arr.length; j++) {
            var line = arr[j][1].toLowerCase();
            var tokens = line.split(" ");
            for (var t=0; t<tokens.length; t++) {
                var isForExclusion = false
                for(var k=0; k<exclude_kws.length; k++){
                    if(tokens[t].toLowerCase() === exclude_kws[k].toLowerCase()) {
                        isForExclusion = true;
                    }
                }
                if(!isForExclusion) {
                    headlines_kws.push(tokens[t]);
                }
            }
            console.log(arr[j][1].toLowerCase());
        }
        console.log(headlines_kws);
        this.setState({newsheadlines: arr, time_date});
        console.log(arr);
        console.log(resp.data);

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
            
            <h1>Keywords of The Day </h1>
            <h2>
                <span style={{color:"purple", fontSize: "22px", paddingLeft:"4px"}}>{time_date}</span>
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

export default Keywords;