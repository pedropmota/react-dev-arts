import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './FullScreen.css';

const animationTime = 400;


class FullScreen extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isClosing: false
        }
    }

    close() {

        this.setState({
            isClosing: true
        });

        setTimeout(() => {
            if (this.props.onClick)
                this.props.onClick();

            this.setState({
                isClosing: false
            })

        }, animationTime);
    }

    render() {

        const { isFullScreen, children } = this.props;
        const { isClosing } = this.state;

        return (
            <CSSTransition 
                in={(isFullScreen && !isClosing)}
                timeout={animationTime}
                classNames="fullscreen">
                {isFullScreen ?
                    <div>
                        <div className={"fullscreen-overlay"} onClick={() => this.close()} />
                        <div className={"fullscreen-content"} onClick={() => this.close()}>

                            {children}

                        </div>
                    </div>
                : 
                    <div />}
            </CSSTransition>
        )
    }
}


FullScreen.propTypes = {
    isFullScreen: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func
}


export default FullScreen;