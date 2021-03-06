import React, { Component } from 'react';

import axios from 'axios';

class Keywords extends Component {
    state = { 
        newsheadlines: [], 
        hl_kws: [],
        time_date: "" 
    }
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
        let exclude_kws = ['a', 'an', 'is', 'the', 'this', 'that', 'sc', 'no', 'yes', '-', 'post', 'for', 'while', 'of',
    'but', 'are', 'to', 'us', 'with', 'as', 'in', 'out', 'and', 'who', 'be', 'set', 'over', '9', '14', 'it', 'its', 'at', 'she']
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
        }
        arr = [];
        for(var f=0; f<data.length; f++) {
            if(!(data[f]['timeAndDate'].toLowerCase().includes(days[currentDate.getDay()].toLowerCase()) && 
                 data[f]['timeAndDate'].toLowerCase().includes(months[currentDate.getMonth()].toLowerCase()) &&
                 data[f]['timeAndDate'].toLowerCase().includes("2020"))) {
                var doIIncludeTheHeadline = false;
                for(var h=0; h<headlines_kws.length; h++){
                    if(data[f]['title'].toLowerCase().includes(headlines_kws[h].toLowerCase()))
                        doIIncludeTheHeadline = true;
                }
                if(doIIncludeTheHeadline) {
                    arr.push([data[f]['id'],data[f]['title'],data[f]['link'],data[f]['source'], data[f]['timeAndDate']]);
                }
            }
        }

        this.setState({newsheadlines: arr, hl_kws: headlines_kws, time_date});
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
        let {hl_kws} = this.state;
        let {newsheadlines} = this.state;
        let n_newsheadlines = newsheadlines.length;
        let n_hl_kws = hl_kws.length;
        return (
            <div  className="canv container-fluid">
            <div role="main">
            
        <h1>Keywords for the day</h1>
        <span>{n_newsheadlines} articles found, {n_hl_kws} keywords of the day found</span>
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

export default Keywords;