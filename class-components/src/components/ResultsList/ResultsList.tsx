import { Component } from "react";
import styles from "./ResultsList.module.css";

interface Result {
  id: number;
  name: string;
  description: string;
}

interface ResultsListProps {}

interface ResultsListState {
  results: Result[];
}

class ResultsList extends Component<ResultsListProps, ResultsListState> {
  constructor(props: ResultsListProps) {
    super(props);
    this.state = {
      results: [
        { id: 1, name: "Item 1", description: "Description for item 1" },
        { id: 2, name: "Item 2", description: "Description for item 2" },
        { id: 3, name: "Item 3", description: "Description for item 3" },
      ],
    };
  }

  render() {
    const { results } = this.state;

    return (
      <div className={styles.resultsList}>
        {results.map((result) => (
          <div key={result.id} className={styles.resultItem}>
            <h3>{result.name}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultsList;
