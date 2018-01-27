import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from '../ItemTypes'

const style = {
    position: 'absolute',
    border: '1px dashed',
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    cursor: 'move',
};

const roleSource = {
    beginDrag(props) {
        const { id, left, top } = props
        return { id, left, top }
    },
};

class Role extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        left: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
        hideSourceOnDrag: PropTypes.bool.isRequired,
        children: PropTypes.node,
    };

    render() {
        const {
            hideSourceOnDrag,
            left,
            top,
            connectDragSource,
            isDragging,
            children,
        } = this.props;
        if (isDragging && hideSourceOnDrag) {
            return null
        }

        return connectDragSource(
            <div style={{ ...style, left, top }}>{children}</div>,
        )
    }
}

export default DragSource(ItemTypes.ROLE, roleSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(Role);
