import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './SlideDown.css';

const SlideDown = ({ animateIn, startMounted, children }) => {
    
    //react-transition-group.CSSTransition "unmountOnExit" forces the element to only be mounted after the animation starts (and before it ends):
    const conditionalProps = startMounted ? { } : { unmountOnExit: true } 
    
    return (
        <CSSTransition
            timeout={1000}
            in={animateIn}
            {...conditionalProps}
            classNames="interval-slide-down">
            
            {children}

        </CSSTransition>
    )
}

SlideDown.propTypes = {
    animateIn: PropTypes.bool.isRequired,
    startMounted: PropTypes.bool,
    children: PropTypes.element.isRequired
}

export default SlideDown;