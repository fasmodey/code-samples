const find = document.querySelector('#find-gifs');
const giphyCategory = document.querySelector('#giphy-category');
const gifImg = document.querySelector('.gif-img');
const apiKey = 'BaLjHvygJkENnTTiOZvjvNywdlvxuIZV';
let url = 'http://api.giphy.com/v1/gifs/';

find.addEventListener('click', (event) => {
    const data = giphyCategory.value;
    const gifsLimit = document.querySelector('#giphy-range').value || 30;
    const fetchUrl = `${url}search?q=${data}&api_key=${apiKey}&limit=${gifsLimit}&lang=ru`;

    

    if (data) {
        event.preventDefault();
    }

    if (giphyCategory.value) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(response => {
            let gifsArray = [];

            dropImg();

            if (response.data.length) {

                if (document.querySelector('.gifs-not-found')) {
                    document.querySelector('.gifs-not-found').remove();
                } else if (document.querySelector('.gifs-count')) {
                    document.querySelector('.gifs-count').remove();
                }

                const stringFormatter = response.data.length === 1 ? 'изображение' :
                                        response.data.length < 5 ? 'изображения' : 'изображений';

                response.data.forEach((item) => {
                    gifsArray.push(item.images['fixed_height'].url);
                });
                
                createImgElement(gifsArray);

                const gifsCount = document.createElement('h2');
                gifsCount.classList.add('gifs-count');

                gifsCount.textContent = `По вашему запросу найдено ${response.data.length} ${stringFormatter}`;

                document.querySelector('.header').appendChild(gifsCount);
            } else {
                const gifsNotFound = document.createElement('h2');

                gifsNotFound.classList.add('gifs-not-found');
                gifsNotFound.textContent = 'По вашему запросу ничего не найдено. Надеемся, что в скором времени появятся гифки';

                document.querySelector('.header').appendChild(gifsNotFound);
            }
        });
    }
});

const createImgElement = (data) => {
    const container = document.querySelector('.gif-container');

    data.forEach((item) => {
        const img = document.createElement('img');

        img.setAttribute('src', item);
        img.setAttribute('alt', 'Loading');
        img.classList.add('gif-container__image');

        container.appendChild(img);
    });
}

const dropImg = () => {
    const img = document.querySelectorAll('.gif-container__image');

    img.forEach((elem) => {
        elem.parentElement.removeChild(elem);
    })
}