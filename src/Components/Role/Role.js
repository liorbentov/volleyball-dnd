import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes';

const style = {
	position: 'absolute',
	border: '1px dashed',
	borderColor: 'gray',
	backgroundColor: 'white',
	// padding: '0.5rem 1rem',
	cursor: 'move',
    height: '50px',
    width: '50px',
    lineHeight: '50px',
};

const resetPositionStyle = {
	padding: 0,
	border: 0,
	boxShadow: 'none',
	background: 'none',
    position: 'absolute',
	top: 0,
	right: '5px',
	color: 'gray',
	cursor: 'pointer',
	fontSize: '14px',
	fontWeight: 600,
};

const roleSource = {
	beginDrag(props) {
		const { id, left, top } = props;
		return { id, left, top };
	}
};

class Role extends Component {
	static propTypes = {
		children: PropTypes.node,
		connectDragSource: PropTypes.func.isRequired,
		hideSourceOnDrag: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		isDragging: PropTypes.bool.isRequired,
		left: PropTypes.number.isRequired,
		top: PropTypes.number.isRequired,
        canReset: PropTypes.bool,
		resetPosition: PropTypes.func.isRequired
	};

	render() {
		const { hideSourceOnDrag, left, top, connectDragSource, isDragging, children, canReset, resetPosition } = this.props;
		if (isDragging && hideSourceOnDrag) {
			return null;
		}

		const component = (
			<div style={{ ...style, left, top }}>
				{ canReset && <button style={resetPositionStyle} onClick={resetPosition}>x</button>}
				{children}
			</div>
		);

		return connectDragSource(component);
	}
}

export default DragSource(ItemTypes.ROLE, roleSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(Role);
