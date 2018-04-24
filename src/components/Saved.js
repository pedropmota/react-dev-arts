import React from 'react';

import DevArtsDb from '../DevArtsDbFake';
import ArtList from './ArtList';

class Saved extends React.Component  {

    state = {
        devArts: []
    };

    componentDidMount() {
        DevArtsDb.getSavedItems().then(savedItems => 
            this.setState({
                devArts: savedItems
            }));
    }

    removeItem(item) {
        DevArtsDb.removeItem(item).then(savedItems => 
            this.setState({
                devArts: savedItems
            }));
    }

    render() {
        const { devArts } = this.state;

        return (
            <div>
                <p>
                    My saved items are kept in my web browser's data. No account creation necessary! Maybe in the future :)
                </p>

                <ArtList
                    devArts={devArts} 
                    isSaved={true}
                    onRemoveItem={(item) => this.removeItem(item)} />

            </div>    
        );
    }
}

Saved.propTypes = { }

export default Saved;