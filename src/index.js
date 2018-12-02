import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {WaterpH,WaterLevel,SoilpH,Temperature,ClockDisplay,Humidity,Motor,Light,CountDown1,CountDown2} from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<WaterpH />, document.getElementById('root'));
registerServiceWorker();

ReactDOM.render(<WaterLevel />, document.getElementById('root1'));
registerServiceWorker();

ReactDOM.render(<Temperature />, document.getElementById('root2'));
registerServiceWorker();

ReactDOM.render(<SoilpH />, document.getElementById('root3'));
registerServiceWorker();

ReactDOM.render(<ClockDisplay />, document.getElementById('root4'));
registerServiceWorker();

ReactDOM.render(<Humidity />, document.getElementById('root5'));
registerServiceWorker();

ReactDOM.render(<Motor />, document.getElementById('root6'));
registerServiceWorker();

ReactDOM.render(<Light />, document.getElementById('root7'));
registerServiceWorker();

ReactDOM.render(<CountDown1 />, document.getElementById('root8'));
registerServiceWorker();

ReactDOM.render(<CountDown2 />, document.getElementById('root9'));
registerServiceWorker();
