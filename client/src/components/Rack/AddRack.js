import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { reduxForm, Field } from "redux-form"
import addRack from "../../actions/AddRack"
import AddRackForm from "./AddRackForm";
import uiAddingRack from "../../actions/UIAddingRack";

const AddRackContainer = styled.div`
    border: 1px solid #ddd;
    min-width: 100px;
    width: 100px;
    height: 80px;
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    background: blue;
    color: #eee;
`

const AddRackEditWrapper = styled.div`
    border: 1px solid #ddd;
    height: 80px;
    padding: 20px;
    border-radius: 10px;
    background: lightGreen;
    color: #ebecf0;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
`


const AddRackDefault = ({ uiAddingRack }) => (
    <a href="#" onClick={(e) => { uiAddingRack(); e.preventDefault(); }} >
        <AddRackContainer>
            Add Rack
        </AddRackContainer>
    </a>
)

const AddRackEdit = ({ addRack, boardId }) => <AddRackEditWrapper>
    <AddRackForm onSubmit={({ rackName }) => { addRack(rackName, boardId) }} />
</AddRackEditWrapper>

const AddRack = ({ isAddIngRack, uiAddingRack, addRack, boardId }) => {
    return isAddIngRack ?
        <AddRackEdit addRack={addRack} boardId={boardId}  /> :
        <AddRackDefault uiAddingRack={uiAddingRack} />
}


const mapStateToProps = ({ ui }) => {
    return ({ isAddIngRack: ui.isAddingRack })
}

const mapDispatchToProps = { uiAddingRack, addRack }

export default connect(mapStateToProps, mapDispatchToProps)(AddRack)
