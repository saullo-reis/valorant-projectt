import React from 'react';
import {Header} from './components/header/header'
import './styles/stylesGlobal.sass'
import { Main } from './components/main/main';

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
