import React from 'react';
import PropTypes from 'prop-types';

class WindowScrollChecker extends React.Component {

    componentDidMount() {
        window.addEventListener('scroll', this.onScrollEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollEvent);
    }
    
    onScrollEvent = (e) => {
        const customOffset = this.props.offset || 0;

        const mainHeightElement = this.props.mainContainerId ? document.getElementById(this.props.mainContainerId) : document.body;
        const scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop + ((document.documentElement && document.documentElement.scrollTop) || 0);

        if (((window.innerHeight + scrollPosition) >= mainHeightElement.offsetHeight - customOffset)) {

            if (this.props.active && !this.props.isHandlingScroll)
                this.props.handleScroll();
            
        }
    }

    render() {
        return null;
    }

}

WindowScrollChecker.propTypes = {
    active: PropTypes.bool.isRequired,
    isHandlingScroll: PropTypes.bool.isRequired,
    handleScroll: PropTypes.func.isRequired,
    mainContainerId: PropTypes.string,
    offset: PropTypes.number
};

export default WindowScrollChecker;