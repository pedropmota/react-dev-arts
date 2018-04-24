import React from 'react';
import PropTypes from 'prop-types';

import ArtItem from './ArtItem';
import TimedRenderer from './effects/TimedRenderer';
import SlideDown from './effects/SlideDown';


const animationInterval = 75;

const FlexWrapper = ({ children }) =>
    <div className="flex-list-container" style={{ display: 'flex', flexWrap: 'wrap', padding: '0 10px' }}>
        {children}
    </div>


const ArtList = ({ devArts, isSaved, startAnimationAtIndex = 0, onSaveItem, onRemoveItem }) => {

    return (
        <FlexWrapper>

            <TimedRenderer
                data={devArts} 
                interval={animationInterval}
                startAtIndex={startAnimationAtIndex} 
                renderOnStart={true} 
                renderItem={({ item, timeoutCompleted }) => {
                    return(
                        <SlideDown  
                            key={item.devArtId}
                            animateIn={timeoutCompleted}
                            startMounted={true}>

                                <ArtItem 
                                    key={item.devArtId}
                                    devArtItem={item}  
                                    onSaveItem={onSaveItem}
                                    onRemoveItem={onRemoveItem}
                                    isSaved={typeof isSaved === 'function' ? isSaved(item) : isSaved} 
                                    className="flex-list-item"
                                    style={(timeoutCompleted ? { } : { visibility: 'hidden' })} />

                        </SlideDown>
                    )

                }}

            />
        </FlexWrapper>
    )
}

ArtList.propTypes = {
    devArts: PropTypes.array.isRequired,
    onSaveItem: PropTypes.func,
    onRemoveItem: PropTypes.func,
    startAnimationAtIndex: PropTypes.number,
    isSaved: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.bool
    ]).isRequired,
}


export default ArtList;
    
