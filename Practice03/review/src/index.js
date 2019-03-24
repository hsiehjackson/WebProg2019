import React from 'react';
import ReactDOM from 'react-dom';
import {Header, MainSlider, StoryArea, BestSeller, Menu, Footer} from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div>
        <Header />
        <MainSlider />
        <StoryArea />
        <BestSeller />
        <Menu />
        <Footer />
    </div>,
    document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
