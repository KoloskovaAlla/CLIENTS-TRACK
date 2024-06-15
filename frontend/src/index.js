// import './scss/index.scss';
import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';

// import { store } from './store';
import { App } from './App';

const $root = document.querySelector('#root');
const root = createRoot($root);

root.render(
  // <Provider store={store}>
    // <BrowserRouter>
      <App />
    // </BrowserRouter>
  // </Provider>
);
