import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AddBoard from "./AddBoard"
import fetchBoards from "../../actions/FetchBoards"

const BoardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    height: 100%;
    align-content: start;
`

const BoardContainer = styled.a`
    display: flex;
    border: 1px solid #ddd;
    min-width: 200px;
    height: 80px;
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
`


const Board = ({ title, id }) => {
    const path = "boards/" + id

    return <BoardContainer href={path}>
        <div>{title}</div>
    </BoardContainer>
}


class Boards extends Component {
    componentDidMount() {
        this.props.fetchBoards()
    }

    render() {
        const { boards } = this.props;
        return <BoardsContainer>
            <AddBoard />

            {Object.keys(boards).map(id => {
                const board = boards[id]
                return <Board key={board.id} title={board.title} id={board.id} />
            })}
        </BoardsContainer>
    }
}

export default connect(({ boards }) => ({ boards }), {fetchBoards:fetchBoards})(Boards)