import React, {Component} from 'react';

import axios from 'axios';

class home extends Component {
    state = { newsheadlines: [] }

    componentDidMount() {
        axios.get("http://localhost:3030").then(resp => {


        var data = resp.data;
        var arr = [];
        for(var i=0; i<data.length; i++) {
            arr.push([data[i]['id'],data[i]['title'],data[i]['link'],data[i]['source'], data[i]['timeAndDate']]);
        }
        this.setState({newsheadlines: arr});
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
        return (
            <div  className="canv container-fluid">
            <div role="main">
            <h1>News</h1>
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