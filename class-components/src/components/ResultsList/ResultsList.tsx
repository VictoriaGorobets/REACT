import React, { Component } from 'react';
import styles from './ResultsList.module.css';

export default class ResultsList extends Component {
	render() {
		const results = [
			{ name: 'Item 1', description: 'Description for item 1' },
			{ name: 'Item 2', description: 'Description for item 2' },
			{ name: 'Item 3', description: 'Description for item 3' },
		];

		return (
			<div className={styles.resultsList}>
				{results.map((result, index) => (
					<div key={index} className={styles.resultItem}>
						<h3>{result.name}</h3>
						<p>{result.description}</p>
					</div>
				))}
			</div>
		);
	}
}

