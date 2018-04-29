import React from 'react';

import ApiService from '../ApiService';
import DevArtsDb from '../DevArtsDbFake';
import SearchInput from './SearchInput';
import ArtList from './ArtList';
import WindowScrollChecker from './effects/WindowScrollChecker';


class Browse extends React.Component   {

    constructor(props) {
        super(props);

        this.state = {
            devArts: [],
            savedItems: [],
            browsedAt: null,
            previouslyRenderedCount: 0,
            nextOffset: 0,
            hasMore: false,
            searchTerm: null,
            isBrowsing: false,
            isLoadingMore: false
        };
    }

    componentDidMount() {
        
        DevArtsDb.getSavedItems().then(savedItems => {

            this.setState({
                savedItems: savedItems
            });
            
        });
    }
   
    onBrowse(searchTerm) {
        this.setState({ isBrowsing: true });

        ApiService.browsePopular(searchTerm).then(result => {
        
            this.setState({
                devArts: result.results,
                browsedAt: new Date(),
                previouslyRenderedCount: 0,
                nextOffset: result.nextOffset,
                hasMore: result.hasMore,
                searchTerm: searchTerm,
                isBrowsing: false
            });

            
        });
    }

    loadMore() {
        
        this.setState({
            isLoadingMore: true
        })

        ApiService.browsePopular(this.state.searchTerm, this.state.nextOffset).then(result => {

            this.setState({
                devArts: this.state.devArts.concat(result.results),
                previouslyRenderedCount: this.state.devArts.length,
                nextOffset: result.nextOffset,
                hasMore: result.hasMore,
                isLoadingMore: false
            })
        });
    }

    
    saveItem(item) {
        DevArtsDb.addItem(item);
    }

    removeItem(item) {
        DevArtsDb.removeItem(item);
    }

    render() {
        const { devArts, savedItems, previouslyRenderedCount, isBrowsing, browsedAt, isLoadingMore, hasMore } = this.state;
        
        const noResults = browsedAt && !devArts.length;

        return (
            <div>
                <p style={{ margin: '10px 0' }}>
                    Browse artworks and photos from <a href="https://deviantart.com" target="_blank" rel="noopener noreferrer">DeviantArt</a>, 
                    a community network that's widely used by professional and independent artists:
                </p>
                
                <SearchInput isLoading={isBrowsing} onSearch={(term) => this.onBrowse(term)} /> 
                
                {noResults ?
                    <p style={{ margin: '12px' }}>Sorry, no pieces found. Try searching for something different. :)</p> 
                : null}

                <ArtList
                    key={browsedAt}
                    devArts={devArts} 
                    isSaved={(item) => savedItems.some(i => i.devArtId === item.devArtId)} 
                    startAnimationAtIndex={previouslyRenderedCount} 
                    onSaveItem={(item) => this.saveItem(item)}
                    onRemoveItem={(item) => this.removeItem(item)} />

                {isLoadingMore ? (
                    <div style={{ clear: 'both', margin: '20px', fontSize: '18px' }}>
                        <span>Loading More...</span>
                    </div>
                ) : null}
        
                <WindowScrollChecker 
                    active={hasMore}
                    offset={200}
                    mainContainerId='root'
                    isHandlingScroll={isLoadingMore}
                    handleScroll={() => this.loadMore()}/>

            </div>    
        );
    }
}

Browse.propTypes = { }

export default Browse;