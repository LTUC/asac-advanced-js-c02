import LoginContext from './components/auth/context.js';
import SettingsContext from './context/settings.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import ToDo from './components/todo/todo.js';

function App() {
  return (
    <div className="App">
      <SettingsContext>
        <LoginContext>
          <ToDo />
        </LoginContext>
      </SettingsContext>
    </div>
  );
}

export default App;
