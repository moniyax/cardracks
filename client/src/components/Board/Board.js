import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AddRack from '../Rack/AddRack'
import Rack from '../Rack/Rack'
import { DragDropContext, Droppable,  } from 'react-beautiful-dnd'
import moveItem from "../../actions/MoveItem"

const BoardC = styled.div`
    display: flex;
    flex-direction: column;
    background: #00aecc;
    height:100%;
    padding: 0 10px;
`

const BoardHeader = styled.div`
display: flex;
flex: 0 0 auto; 
height: 40px;
`

const BoardName = styled.div`
font-size: 20px;
font-weight: bold;
color:#fff;
padding-left:15px;
margin-bottom: 10px;
`

const Racks = styled.div`
display: flex;
padding-right: 50px;
align-items: start;
flex-grow: 1;
position: relative;
height: 100%;
overflow-x: auto;


`
class Board extends Component {
    onDragEnd (data) {
        this.props.moveItem(data.type,data.source, data.destination)
    }

    render() {
        const { boards, match, racks } = this.props
        const board = boards[match.params.id]
        const { title, rackIds } = board

        return  <BoardC >
            <BoardHeader>
                <BoardName>{title}</BoardName>
            </BoardHeader>
            <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                <Droppable
                    droppableId={board.id}
                    direction="horizontal"
                    type="rack">
                    {provided => (
                        <Racks {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {rackIds.map((id,index) => {
                                const rack = racks[id]
                                return  <Rack  
                                    key={rack.id}
                                    title={rack.title}
                                    id={rack.id}
                                    cardIds={rack.cardIds}
                                    index={index} />
                            
                            })}
                            <AddRack boardId={board.id} />
                            {provided.placeholder}

                        </Racks>)}
                </Droppable>
            </DragDropContext>
        </BoardC>
    }
}

const mapStateToProps = ({ boards, racks }) => ({ boards, racks })

export default connect(mapStateToProps, {moveItem: moveItem})(Board)