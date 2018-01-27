import React, { Component } from 'react';
import Court from './Components/Court/Court'
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Court hideSourceOnDrag={true} />
			</div>
		);
	}
}

export default App;
