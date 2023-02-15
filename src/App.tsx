import React from 'react';
import {Header} from './components/header/header'
import './styles/stylesGlobal.sass'
import { Pages } from './components/main/pages';
import { Footer } from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Pages/>
      <Footer/>
    </div>
  );
}

export default App;
