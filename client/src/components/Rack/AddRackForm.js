import React  from 'react'
import styled from 'styled-components'
import { reduxForm , Field} from "redux-form"
import './AddRackForm.css'

const AddRackButtons = styled.div`
    margin-top: 15px;
    flex-grow: 1;
    display: flex;
    align-items: center;
`

const AddRackCreateButton = styled.button`
    flex-grow: 1;
    height: 100%;
    background: #fff;
    border-radius: 5px;
`

const AddRackCancelButton = styled.a`
    flex-grow: 1;
`

const AddRackForm = props => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field className="rackNameInput" name="rackName" component="input" type="text" placeholder="Enter the rack name"/>

            <AddRackButtons >
                <AddRackCancelButton >
                    Cancel
            </AddRackCancelButton>
            <AddRackCreateButton >
                    Create
            </AddRackCreateButton>
            </AddRackButtons>
        </form>
    )
}

export default reduxForm({ form: 'addRack' })(AddRackForm)
