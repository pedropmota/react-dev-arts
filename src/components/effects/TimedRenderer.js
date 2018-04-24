import React from 'react';
import PropTypes from 'prop-types';

const TimedRenderer = ({ data, interval = 0, startAtIndex = 0, renderOnStart = false, renderItem }) => {

    const items = Array.isArray(data) ? data : [data];

    return items.map((item, index) => {

        const calculatedInterval = typeof interval === 'function' ? interval(item, index) : interval;

        const timeoutToAnimate = index < startAtIndex ? 0 : ((index - startAtIndex + 1) * calculatedInterval);

        return (
            <TimedRendererItem
                key={index}
                item={item}
                timeoutToAnimate={timeoutToAnimate}
                renderOnStart={renderOnStart}
                renderItem={renderItem} />
        );
    });
}


class TimedRendererItem extends React.Component {
    
    state = {  timeoutCompleted: false, timeoutKey: null }
    
    componentDidMount() {
        const { timeoutToAnimate } = this.props;

        if (timeoutToAnimate === 0) {
            this.setState({ timeoutCompleted: true });            
            return;
        }

        const timeoutKey = setTimeout(() => this.onTimeoutCompleted(), timeoutToAnimate);

        this.setState({ timeoutKey: timeoutKey });
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeoutKey);
    }

    onTimeoutCompleted() {
        this.setState({ 
            timeoutCompleted: true
        });
    }


    render() {
        if (this.state.timeoutCompleted || this.props.renderOnStart) {
            return this.props.renderItem({ 
                item: this.props.item, 
                timeoutCompleted: this.state.timeoutCompleted, 
            })
        }
        else {
            return null;
        }
    }
}

TimedRenderer.propTypes = {
    data: PropTypes.any.isRequired, 
    interval: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.func
    ]).isRequired, 
    startAtIndex: PropTypes.number, 
    renderOnStart: PropTypes.bool,
    renderItem: PropTypes.func.isRequired
}

export default TimedRenderer;