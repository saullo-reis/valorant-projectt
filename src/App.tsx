import {Header} from './components/header/header'
import './styles/styles-global.sass'
import { Pages } from './components/main/pages';
import { Footer } from './components/footer/footer';
import { Provider } from 'react-redux';
import store from './components/store';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Pages />
      <Footer />
    </Provider>
  );
}

export default App;
