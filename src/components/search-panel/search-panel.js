import React from 'react';
import './search-panel.css'

export default class SearchPanel extends React.Component {

    state = {
        term: ''
    }

    onUpdateSearch = (e) => {
        e.preventDefault();

        const term = e.target.value;
        this.setState({
            term
        })
        this.props.onUpdateSearch(term);
    }

    render() {
        return (
            <input
                className="form-control search-input"
                type="text"
                placeholder="search posts"
                onChange={this.onUpdateSearch}
            />
        )
    }
}
