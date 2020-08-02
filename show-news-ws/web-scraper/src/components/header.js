import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="logo">
                    <a href="https://github.com/ovimura/pacteraedge-hackathon" style={{fontSize: "30px", fontWeight: "900", color: "fuchsia"}}>Ovidiu Mura: pacteraedge-hackathon</a>
                </div>
                <nav>
                    <ul>
                        <li className="firstmenu">
                            <Link to="/">Headlines</Link>
                        </li>
                        <li>
                            <Link to="/keywords">Keywords</Link>
                        </li>
                        <li>
                            <Link to="/scramble">Scramble</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;