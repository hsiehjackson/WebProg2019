import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Blog from './containers/Blog/Blog'
import Footer from './components/Footer'
import './App.css';
class App extends Component {
	render() {
		return (
			// <BrowserRouter basename="/my-app">
			<BrowserRouter>
				<Header name='Hsaing' />
				<div className="App">
					<Blog />
				</div>
				<Footer />
			</BrowserRouter>
		)
	}
}

export default App
