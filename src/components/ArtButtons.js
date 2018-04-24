import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faZoom from '@fortawesome/fontawesome-free-solid/faSearchPlus';
import faLink from '@fortawesome/fontawesome-free-solid/faExternalLinkSquareAlt';
import faSave from '@fortawesome/fontawesome-free-solid/faBookmark';


const ArtButtons = ({ show, title, isSaved, onZoom, onOpenLink, onSaveItem, onRemoveItem }) => 
    
    <div className={`item-buttons ${show ? 'show' : ''}`}>

        <div className="item-title">{title}</div>

        <Popup 
            trigger={
                <button className="button" onClick={onZoom}>
                    <FontAwesomeIcon icon={faZoom} color="white"  size="2x" width="10" height="10"/>
                </button>}
            content="Zoom image" />
        
        <Popup
            trigger={
                <button className="button" onClick={onOpenLink}>
                    <FontAwesomeIcon icon={faLink} color="white" size="2x"/>
                </button>
            }
            content="View art page" />
        
        <Popup
            trigger={
                <button className={`button ${isSaved ? 'saved' : ''}`}   onClick={!isSaved ? onSaveItem : onRemoveItem}>
                    <FontAwesomeIcon icon={faSave} color="white" size="2x"/>
                </button>
            }
            content={(!isSaved ? 'Save to my list' : 'Remove from my list')} />
    </div>


ArtButtons.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string, 
    isSaved: PropTypes.bool.isRequired, 
    onZoom: PropTypes.func, 
    onOpenLink: PropTypes.func, 
    onSaveItem: PropTypes.func, 
    onRemoveItem: PropTypes.func
}

export default ArtButtons;