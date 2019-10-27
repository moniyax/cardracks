import React from 'react'
import styled from 'styled-components'
import { reduxForm , Field} from "redux-form"

const AddCardFormC = styled.form`
    display: flex;
    justify-content: center;
    flex: 0 0 auto;

`


const AddCardForm = props => {
    const { handleSubmit , rackId} = props
    return (
        <AddCardFormC onSubmit={handleSubmit}>
            <Field name={rackId} className="cardInput" component="input" type="text" placeholder="Enter a title for this card"/>

        </AddCardFormC>
    )
}

export default reduxForm({ form: 'addCard' })(AddCardForm)