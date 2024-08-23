import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import logo from "./logo.svg";
import { Tasks } from "./modules/tasks/tasks";
import { queryClient } from "./queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Tasks />
      </div>
    </QueryClientProvider>
  );
  return <Tasks />;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
