import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import signOut from "./actions/SignOut"
import styled from 'styled-components'

const AlertC = styled.div`
font-size: 12px;
text-align: center;
font-weight: bold;
background: #f44336;
padding: 9px;
color: #eee;
`

class Alert extends React.Component {
    render() {
        const {logInFailure} = this.props
        const display = logInFailure ? 'block' : 'none'
        return <AlertC style={{ display }}>
            {logInFailure}
        </AlertC>
    }
}

export default connect(({ auth }) => ({ logInFailure: auth.logInFailure }))(Alert)