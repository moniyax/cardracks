import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import signOut from "./actions/SignOut";

class Header extends React.Component {
    render() {
        const {signOut, auth} = this.props;
        const {user } = auth;

        return <ul className='header'>
            <li className='left'></li>
            <li className='title'> <Link to='/' className='title'>CardRacks</Link></li>
            <li className='right'> {user ? "Hi " + user['name'] : ''}
                <ul className='nav'>
                    <li className="row">
                        <a href="#" onClick={signOut}>Sign Out</a>
                    </li>
                </ul>
            </li>
        </ul>
    }
}

export default connect(
    ({ auth }) => ({ auth }),
    { signOut }
)(Header)
