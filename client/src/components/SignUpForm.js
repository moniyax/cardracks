import React from 'react';
import { reduxForm, Field } from "redux-form"

let SignUpForm = props => {
    const { handleSubmit } = props
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
                <div>Name:</div>
                <Field name="name" component="input" type="text" />
            </div>
            <div className="field">
                <div>Email:</div>
                <Field name="email" component="input" type="email" />
            </div>
            <div className="field">
                <div>Password:</div>
                <Field name="password" component="input" type="password" />
            </div>
            <input type="submit" value="Sign Up"></input>
        </form>
    )
}

export default reduxForm({ form: 'signUp' })(SignUpForm)
