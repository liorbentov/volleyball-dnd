import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from '../ItemTypes';
import Role from '../Role/Role';
import flow from 'lodash.flow';

const width = 540;
const frontRowHeight = width / 3;
const borderWidth = '3px';

const courtStyles = {
	width: `${width}px`,
	height: `${width}px`,
	border: `${borderWidth} solid green`,
	position: 'absolute',
	top: 0,
	left: 0
};

const frontRowStyles = {
	backgroundColor: 'yellow',
	width: `${width}px`,
	height: `${frontRowHeight}px`,
	border: '3px solid green',
	position: 'absolute',
	top: `-${borderWidth}`,
	left: `-${borderWidth}`
};

const roleTarget = {
	drop(props, monitor, component) {
		const item = monitor.getItem();
		const delta = monitor.getDifferenceFromInitialOffset();
		const left = Math.round(item.left + delta.x);
		const top = Math.round(item.top + delta.y);

		component.moveRole(item.id, left, top);
	}
};

const startingLeft = width + 70;
const initialRoles = {
    S: { top: 0, left: startingLeft, title: 'S' },
    OS: { top: 50, left: startingLeft, title: 'OS' },
    A1: { top: 100, left: startingLeft, title: 'A1' },
    A2: { top: 150, left: startingLeft, title: 'A2' },
    C1: { top: 200, left: startingLeft, title: 'C1' },
    C2: { top: 250, left: startingLeft, title: 'C2' }
};

class Court extends Component {
	static propTypes = {
		hideSourceOnDrag: PropTypes.bool,
		connectDropTarget: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			roles: initialRoles
		};

		this.moveRole = this.moveRole.bind(this);
	}

	moveRole(id, left, top) {
		this.setState(
			update(this.state, {
				roles: {
					[id]: {
						$merge: { left, top }
					}
				}
			})
		);
	}

	mapRoles() {
        const { roles } = this.state;
        return Object.keys(roles).map(key => {
            const { left, top, title } = roles[key];
            const { left: initialLeft, top: initialTop } = initialRoles[key];
            const canReset = left !== initialLeft || top !== initialTop;

            const resetPosition = () => this.moveRole(key, initialLeft, initialTop);

            return (
				<Role key={key} id={key} left={left} top={top} hideSourceOnDrag={true} canReset={canReset} resetPosition={resetPosition}>
                    {title}
				</Role>
            );
        });
	}

	render() {
		const { connectDropTarget } = this.props;

		return connectDropTarget(
			<div style={courtStyles}>
				<div style={frontRowStyles} />
				{ this.mapRoles() }
			</div>
		);
	}
}

export default flow(
	DropTarget(ItemTypes.ROLE, roleTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragDropContext(HTML5Backend)
)(Court);
