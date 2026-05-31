import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0f1117;
      --surface: #161b27;
      --border: #1e2637;
      --text: #e8eaf0;
      --text-muted: #6b7a99;
      --accent: #4d96ff;
      --accent-subtle: #4d96ff18;
      --error: #ff5263;
      --success: #6bcb77;
      --warning: #ffd93d;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', -apple-system, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    button { font-family: inherit; }

    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

    a:hover > div { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  `}</style>
);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <main>
        <AppRoutes />
      </main>
    </BrowserRouter>
  </Provider>
);

export default App;
