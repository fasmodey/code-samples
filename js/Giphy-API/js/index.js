const find = document.querySelector('#find-gifs');
const giphyCategory = document.querySelector('#giphy-category');
const gifImg = document.querySelector('.gif-img');
const apiKey = 'BaLjHvygJkENnTTiOZvjvNywdlvxuIZV';
const gifsLimit = 30;
let baseUrl = 'https://api.giphy.com/v1/gifs/';
let offset = 30;

find.addEventListener('click', (event) => {
    const addButton = document.querySelector('#add-gifs');
    offset = 30;
    const data = giphyCategory.value;
    let fetchUrl = `${baseUrl}search?q=${data}&api_key=${apiKey}&limit=${gifsLimit}&lang=ru`;

    if (document.querySelector('.no-more-gifs')) {
        document.querySelector('.no-more-gifs').remove();
    }

    if (addButton.getAttribute('disabled')) {
        addButton.removeAttribute('disabled');
        addButton.classList.remove('disabled');
    }

    if (data) {
        event.preventDefault();
    }

    if (giphyCategory.value) {
        fetch(fetchUrl)
            .then(response => response.json())
            .then(response => {
            let gifsArray = [];

            if (document.querySelector('.gifs-not-found')) {
                document.querySelector('.gifs-not-found').remove();
            } else if (document.querySelector('.gifs-count')) {
                document.querySelector('.gifs-count').remove();
            }

            dropImg();

            if (response.data.length) {
                response.data.forEach((item) => {
                    gifsArray.push(item.images['fixed_height'].url);
                });
                
                createImgElement(gifsArray);

                if (document.querySelector('#add-gifs').classList.contains('hidden')) {
                    document.querySelector('#add-gifs').classList.remove('hidden');
                }

                if (document.querySelector('.up').classList.contains('hidden')) {
                    document.querySelector('.up').classList.remove('hidden');
                }

                const gifsCount = document.createElement('h2');
                gifsCount.classList.add('gifs-count');
                gifsCount.textContent = `По вашему запросу найдено ${response.data.length} изображений`;
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

document.querySelector('#add-gifs').addEventListener('click', () => {

    const data = giphyCategory.value;
    let fetchUrl = `${baseUrl}search?q=${data}&api_key=${apiKey}&limit=${gifsLimit}&lang=ru&offset=${offset}`;
    fetch(fetchUrl)
        .then(response => response.json())
        .then(response => {
        let dataLength = response.data.length;
        let gifsArray = [];

        if (dataLength) {
            response.data.forEach((item) => {
                gifsArray.push(item.images['fixed_height'].url);
            });
            createImgElement(gifsArray);

            if (dataLength < gifsLimit) {
                const gifIsOver = document.createElement('h2');
                gifIsOver.classList.add('no-more-gifs');
                gifIsOver.textContent = 'Вы просмотрели все изображения!';
    
                document.querySelector('.gif-container').after(gifIsOver);
                document.querySelector('#add-gifs').classList.add('disabled');
                document.querySelector('#add-gifs').setAttribute('disabled', true);
            }


            let imgContainerLength = document.querySelectorAll('.gif-container__image').length;
            document.querySelector('.gifs-count').textContent = `По вашему запросу найдено ${imgContainerLength} изображений`;
        }
    });
    offset += gifsLimit;
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
};

const dropImg = () => {
    const img = document.querySelectorAll('.gif-container__image');

    img.forEach((elem) => {
        elem.parentElement.removeChild(elem);
    })
};

const anchorScroll = () => {
    const anchors = document.querySelector('.up');
    anchors.addEventListener('click', function (e) {
        e.preventDefault();
        
        const blockID = anchors.getAttribute('href').substr(1);
        
        document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    });
}

anchorScroll();