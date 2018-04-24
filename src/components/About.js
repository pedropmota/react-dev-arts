import React from 'react';

export default function About() {
    return (
        <div>
            <h2>About this app</h2>
            <p>
                This app was created with <a href="https://reactjs.org/">React</a>, a really fun, powerful and versatile Javascript library. 
                The images (and all data) used by this app are fetched from the DeviantArt's REST APIs.
            </p>
            <p>
                <a href="https://github.com/pedropmota/react-devart">Project on Github</a>
            </p>

            <h2 style={{ marginTop: '60px' }}>About DeviantArt</h2>
            <p>
                A lively and inspiring community of artists that's been around for a while now, DeviantArt is a great place to share and appreciate art of many different styles.
            </p>
            <p>
                <a href="https://www.deviantart.com">deviantart.com</a>
            </p>
        </div>
    )
}