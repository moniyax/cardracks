import React, { Component } from 'react';
import "./SignIn.css";
import { reduxForm, Field } from "redux-form"



let SignInForm = props => {
    const { handleSubmit } = props
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
                <div>Email:</div>
                <Field name="email" component="input" type="email" />
            </div>
            <div className="field">
                <div>Password:</div>
                <Field name="password" component="input" type="password" />
            </div>
            <input type="submit" value="Log in"></input>
        </form>
    )
}

export default reduxForm({ form: 'signIn' })(SignInForm)
