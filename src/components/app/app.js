import React from 'react';
import AppHeader from '../app header/app-header';
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px; 
`

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.maxId = 4
    }

    state = {
        data: [
            { label: 'Today was very cold. I think it was better stay at home.', important: true, id: '1', like: false },
            { label: 'I need to take a break from school, it takes too much time.', important: false, id: '2', like: true },
            { label: 'React is one of the most usefull UI library.', important: true, id: '3', like: false }
        ],
        term: '',
        filter: 'all'
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr,
            }

        });
    }

    addItem = (body) => {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }

        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr,
            }
        })

    }

    onToggleImportant = (id) => {

        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = { ...old, important: !old.important };
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })

    }


    onToggleLiked = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = { ...old, like: !old.like }
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }

        })
    }

    searchPost = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        })
    }

    filterPosts = (items, filter) => {
        if (filter === 'like') {
            return items.filter((item) => item.like)
        } else {
            return items
        }
    }

    onUpdateSearch = (term) => {
        this.setState({
            term
        })
    }

    onFilterSelect = (filter) => {
        this.setState({ filter })
    }

    render() {
        const { data, term, filter } = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPosts(this.searchPost(data, term), filter);



        return (
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}

                    />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm
                    onAdd={this.addItem}

                />
            </AppBlock>
        )
    }
}
