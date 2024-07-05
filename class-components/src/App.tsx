import { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ResultsList from "./components/ResultsList/ResultsList";
import "./index.css";

interface AppProps {}

interface AppState {
  hasState: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hasState: false, // Инициализируем состояние
    };
  }

  toggleState = () => {
    this.setState((prevState) => ({ hasState: !prevState.hasState }));
  };

  render() {
    const { hasState } = this.state; // Деструктуризация состояния

    return (
      <div className="app">
        <SearchBar />
        <ResultsList />
        <button type="button" onClick={this.toggleState}>
          Toggle State
        </button>
        {hasState && <p>State is true</p>}
      </div>
    );
  }
}

export default App;
