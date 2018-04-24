import React from 'react';
import PropTypes from 'prop-types';

import ArtButtons from './ArtButtons';
import FullScreen from './effects/FullScreen';

import './ArtItem.css';

class ArtItem extends React.PureComponent {
    
    constructor (props) {
        super(props);
        
        this.state = { 
            isFullScreen: false,
            showButtons: false,
            isSaved: props.isSaved //(Comes from props initially, but updates itself afterwards for performance.)
        }
    }

    openArtPage() {
        const url = this.props.devArtItem.url;

        window.open(url, '_blank');
    }

    saveItem() {
        this.props.onSaveItem(this.props.devArtItem);

        this.setState({
            isSaved: true
        })
    }

    removeItem() {
        this.props.onRemoveItem(this.props.devArtItem);

        this.setState({
            isSaved: false
        })
    }

    openFullScreen() {
        this.setState({
            isFullScreen: true
        });
    }

    closeFullScreen() {
        this.setState({
            isFullScreen: false
        });
    }
    
    render() {
        const { devArtItem, className, style } = this.props;
        
        return (
            <div className={"item-container " + className} style={style}>

                <div className="item-container-inner" 
                    onMouseOver={() => { !this.state.showButtons && this.setState({ showButtons: true })}} 
                    onMouseLeave={() => { this.state.showButtons && this.setState({ showButtons: false }) }}>
                    
                    <div className="item-container-img-wrapper">
                        <img src={devArtItem.preview.src} alt={devArtItem.title} />
                    </div>

                    <ArtButtons
                        show={this.state.showButtons} 
                        title={devArtItem.title} 
                        isSaved={this.state.isSaved} 
                        onZoom={() => this.openFullScreen()} 
                        onOpenLink={() => this.openArtPage()}
                        onSaveItem={() => this.saveItem()}
                        onRemoveItem={() => this.removeItem()} />


                </div>

                <FullScreen isFullScreen={this.state.isFullScreen} onClick={() => this.closeFullScreen()}>
                    <img src={devArtItem.content.src} alt={devArtItem.title} className="zoomed-img" />
                </FullScreen>
            
            </div>
        )
    }
}

ArtItem.propTypes = {
    devArtItem: PropTypes.object.isRequired, 
    onSaveItem: PropTypes.func,
    onRemoveItem: PropTypes.func,
    isSaved: PropTypes.bool.isRequired,

    className: PropTypes.string, 
    style: PropTypes.object
};

export default ArtItem;