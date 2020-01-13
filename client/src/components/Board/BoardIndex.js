import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import AddBoard from "./AddBoard"
import fetchBoards from "../../actions/FetchBoards"
import webSocketBoardCreated from "../../actions/WebSocketBoardCreated"
import { ActionCable } from 'react-actioncable-provider';
import "./BoardIndex.css";

const BoardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    height: 100%;
    align-content: start;
`


const Board = ({ title, id }) => {
    const path = "/boards/" + id

    return <Link className="tile" to={path}>
        <div>{title}</div>
    </Link>
}



class Boards extends Component {
    componentDidMount() {
        this.props.fetchBoards()
    }

    handleReceived = (arg) => {
        const board = JSON.parse(arg);
        this.props.webSocketBoardCreated(board)
    };

    render() {
        const { boards } = this.props;
        return <BoardsContainer>
            <ActionCable
                channel={{
                    channel: "BoardsChannel",
                    user_id: JSON.parse(localStorage.getItem('user')).id
                }}
                onReceived={this.handleReceived}
            />
            <AddBoard />

            {Object.keys(boards).map(id => {
                const board = boards[id]
                return <Board key={board.id} title={board.title} id={board.id} />
            })}
        </BoardsContainer>
    }
}

export default connect(({ boards }) => ({ boards }), { fetchBoards, webSocketBoardCreated })(Boards)