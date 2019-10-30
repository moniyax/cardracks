import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AddCardForm from "./AddCardForm";
import addCard from "../../actions/AddCard";
import { Droppable, Draggable } from "react-beautiful-dnd";

const CardsContainer = styled.div`
padding: 7px;
flex: 1 1 auto;
overflow-y: auto;
min-height: 10px;
`

const Card = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    cursor: pointer;
    margin-bottom: 8px;
    min-height: 25px;
    padding: 10px;
    position: relative;
    text-decoration: none;
    z-index: 0;
`

class Cards extends Component {
    onSubmit = (data) => {
        const rackId = this.props.rackId
        const cardTitle = data[rackId]
        const addCard = this.props.addCard
        addCard(cardTitle, rackId)
    }

    render() {
        const { cards, rackId } = this.props
        return <Droppable droppableId={rackId} type="card">
            {(provided) =>
                <CardsContainer {...provided.droppableProps} ref={provided.innerRef} >
                    {cards.map((c, index) =>
                        <Draggable draggableId={c.id} index={index}
                        key={c.id} >
                            {(provided) =>
                                <Card
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}>
                                    {c.title}
                                </Card>
                            }
                        </Draggable>
                    )}
                    {provided.placeholder}

                    <AddCardForm rackId={rackId} onSubmit={this.onSubmit} />
                </CardsContainer>

            }
        </Droppable>

    }
}


export default connect(undefined, { addCard: addCard })(Cards)
