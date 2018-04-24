import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';

import './SearchInput.css'


class SearchInput extends React.Component  {

    state = {
        searchTerm: ''
    }

    componentDidMount() {
        this.handleInitialLoad();
    }

    handleInitialLoad = () => {
        const previouslySearchedTerm = this.retrieveSearchTerm();

        if (previouslySearchedTerm !== null) {
            this.setState({
                searchTerm: previouslySearchedTerm
            });
            
            this.props.onSearch(previouslySearchedTerm);
        }
    }


    handleInputChange = (event) => {
        const term = event.target.value;

        this.setState({
            searchTerm: term
        });
    }

    handleBrowse = () => {
        const { searchTerm } = this.state;

        this.storeSearchTerm(searchTerm);

        this.props.onSearch(searchTerm)
    }

    storeSearchTerm = (term) => {
        sessionStorage.setItem('search-term', term);
    }

    retrieveSearchTerm = () => {
        return sessionStorage.getItem('search-term');
    }


    render() {
        const { isLoading } = this.props;

        return (
            <div>
                <Input 
                    onChange={this.handleInputChange} 
                    value={this.state.searchTerm} 
                    placeholder="Search..." 
                    className="browse-input"
                    action
                    >
                    
                    <input />
                    
                    <Button 
                        loading={isLoading} 
                        primary 
                        className="browse-button"
                        onClick={this.handleBrowse}>
                            Browse
                    </Button>
                </Input>
            </div>
        );
    }
}

SearchInput.propTypes = {
    isLoading: PropTypes.bool,
    onSearch: PropTypes.func.isRequired
}

export default SearchInput;