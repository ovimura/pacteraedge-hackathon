import React, { Component } from 'react';

import axios from 'axios';

class Scramble extends Component {
    state = { 
        newsheadlines: [], 
        hl_kws: [],
        time_date: "" 
    }

    shuffle(s) {
        /*eslint no-extend-native: ["error", { "exceptions": ["String"] }]*/
        String.prototype.shuffle = function () {
            var a = this.split(""),
                n = a.length;
        
            for(var i = n - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = a[i];
                a[i] = a[j];
                a[j] = tmp;
            }
            return a.join("");
        }
        var result = s.shuffle();        
        return result;
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
        this.setState({newsheadlines: arr, hl_kws: [], time_date});
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

    selectFirstWord(hl) {
        var w = "";
        for(var i=0; i<hl.length; i++) {
            var ln = hl[i][1].toLowerCase().split(" ");
            for(var j=0; j<ln.length; j++) {
                w = ln[j];
                if(w.length > 5) {
                    return w;
                }
            }
        }
        if (w === "") {
            return "firstwordnotfound";
        }
    }

    selectSecondWord(hl) {
        var w = "";
        for(var i=hl.length-1; i>0; i--) {
            var ln = hl[i][1].toLowerCase().split(" ");
            for(var j=0; j<ln.length; j++) {
                w = ln[j];
                if(w.length > 5) {
                    return w;
                }
            }
        }
        if (w === "") {
            return "secondwordnotfound";
        }
    }

    render() { 
        let {time_date} = this.state;
        let {newsheadlines} = this.state;
        let n_newsheadlines = newsheadlines.length;
        let first_word = this.selectFirstWord(newsheadlines)
        let second_word = this.selectSecondWord(newsheadlines)
        return (
            <div  className="canv container-fluid">
            <div role="main">
            
        <h1>Scrable for the day</h1>
        <span>{n_newsheadlines} articles found</span>
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
                                    {/* {this.renderNews()} */}
                                    <tr><td>First Selected Word: <span style={{color: "green", fontSize: "22px", fontWeight:"500"}}>{first_word}</span></td></tr>
                                    <tr><td>Scrabled First Word: <span style={{color: "green", fontSize: "22px", fontWeight:"500"}}>{this.shuffle(first_word)}</span></td></tr>
                                    <tr><td>First Selected Word: <span style={{color: "blue", fontSize: "22px", fontWeight:"500"}}>{second_word}</span></td></tr>
                                    <tr><td>Scrabled First Word: <span style={{color: "blue", fontSize: "22px", fontWeight:"500"}}>{this.shuffle(second_word)}</span></td></tr>
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

export default Scramble;