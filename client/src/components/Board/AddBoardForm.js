import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { reduxForm , Field} from "redux-form"
import './AddBoardForm.css'

const AddBoardButtons = styled.div`
    margin-top: 15px;
    flex-grow: 1;
    display: flex;
    align-items: center;
`

const AddBoardCreateButton = styled.button`
    flex-grow: 1;
    height: 100%;
    background: #fff;
    border-radius: 5px;
`

const AddBoardCancelButton = styled.a`
    flex-grow: 1;
`

const AddBoardForm = props => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field className="boardNameInput" name="boardName" component="input" type="text" placeholder="board name goes here"/>

            <AddBoardButtons >
                <AddBoardCancelButton >
                    Cancel
            </AddBoardCancelButton>
            <AddBoardCreateButton >
                    Create
            </AddBoardCreateButton>
            </AddBoardButtons>
        </form>
    )
}

export default reduxForm({ form: 'addBoard' })(AddBoardForm)
