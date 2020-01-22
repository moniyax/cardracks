import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import uiAddingBoard from "../../actions/UIAddingBoard"
import addBoard from "../../actions/AddBoard"
import AddBoardForm from "./AddBoardForm";

const AddBoardContainer = styled.div`
    border: 1px solid #ddd;
    min-width: 100px;
    height: 80px;
    margin: 20px;
    padding: 20px;
    border-radius: 3px;
    background: blue;
    color: #eee;
`

const AddBoardEditWrapper = styled.div`
    border: 1px solid #ddd;
    min-width: 250px;
    height: 80px;
    margin: 20px;
    padding: 20px;
    border-radius: 13px;
    background: #9a9a9a;
    color: #eee;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
`

const AddBoardDefault = ({ uiAddingBoard }) => (
    <a href="#" onClick={(e) => { uiAddingBoard(); e.preventDefault(); }} >
        <AddBoardContainer>
            New Board
        </AddBoardContainer>
    </a>
)

const AddBoardEdit = ({addBoard}) => <AddBoardEditWrapper>
    <AddBoardForm onSubmit={({boardName}) => {addBoard(boardName)}}/>
</AddBoardEditWrapper>

const AddBoard = ({ isAddingBoard, uiAddingBoard, addBoard }) => 
    isAddingBoard ? 
        <AddBoardEdit addBoard={addBoard}/> :
        <AddBoardDefault uiAddingBoard={uiAddingBoard} />

const mapStateToProps = ({ ui }) => ({ isAddingBoard: ui.isAddingBoard })
const mapDispatchToProps = { uiAddingBoard, addBoard }

export default connect(mapStateToProps, mapDispatchToProps)(AddBoard)