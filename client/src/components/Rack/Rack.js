import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AddCardForm from '../Card/AddCardForm'
import Cards from "../Card/Cards";
import './Rack.css'
import addCard from '../../actions/AddCard'
import { Droppable, Draggable } from 'react-beautiful-dnd';

const RackWrapper = styled.div`
    height:100%;
`

const RackC = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 240px;
    max-width: 240px;
    margin: 0px 10px 0 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #eee;
    max-height: 100%;
`

const Title = styled.div`
    font-weight: bold;
    color: #172b4d;
    padding: 10px 8px 2px;
    flex: 0 0 auto;
`

class Rack extends Component {
    onSubmit = (data) => {
        const rackId = this.props.id
        const cardTitle = data[rackId]
        const addCard = this.props.addCard
        addCard(cardTitle, rackId)
    }

    render() { 
        const { title, id, cardIds, cards, index } = this.props
        console.log('cardIds', cardIds);

        return <RackWrapper>
            <Draggable
                draggableId={id}
                index={index}>
                {(provided) => (
                    <RackC
                        {...provided.draggableProps}
                        ref={provided.innerRef}>
                        <Title {...provided.dragHandleProps} >{title}</Title>
                        <Cards cards={cardIds.map(id => cards[id])} rackId={id} />
                    </RackC>)}
            </Draggable>
        </RackWrapper>
    }
}


export default connect((({ cards }) => ({ cards })), { addCard })(Rack)