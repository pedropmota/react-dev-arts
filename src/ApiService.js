import axios from 'axios';

const apiUrl = 'https://3l0na4nb4k.execute-api.us-east-1.amazonaws.com/PRD';

/**
 * Service that handles the API requests.
 * The current REST API is hosted in AWS, and wraps the calls to the DeviantArt API.
 */
class ApiService {

    static browsePopular (query = '', offset = 0) {

        return axios.get(apiUrl, {
            params: {
                query: encodeURI(query),
                offset: offset
            }
        }).then(response => {
            if (response.data.status !== 200) {
                //(If the deviantArt api returns an error, we simply display the result as an error page:)
                document.body.innerHTML = response.data.body;
                throw new Error('Error on external API');
            }

            var data = JSON.parse(response.data.body);

            //Filtering to use only the ones that have content to display. A few items sometimes come from the API with blank content.
            data.results = data.results.filter(item => item.preview && item.content);

            return this.preloadPreviews(data.results).then(_ => data);
        })
    }

    /**
     * Preloads all image previews that come from the api, but only waits until a certain limit of time.
     * @param {array of "art item result"} resultList 
     */
    static preloadPreviews (resultList) {

        const waitingLimit = 5000;

        const imageLoadPromises = resultList
            .filter(item => item.preview)
            .map(item => new Promise((resolve, reject) => {

                let image = new Image();
                image.src = item.preview.src;

                const timeoutKey = setTimeout(() => {
                    resolve();
                }, waitingLimit);

                image.onload = () => {
                    clearTimeout(timeoutKey);
                    resolve();
                }
            }));

        return Promise.all(imageLoadPromises);
    }
}

export default ApiService;