const axios = require('axios').default;


const searchForm = document.querySelector('.search-form')
const galleryList = document.querySelector('.gallery')


searchForm.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.nodeName !== 'BUTTON') {
        return
    }
    
    searchPhotos().then(photo => renderPhotoCardsMarkup(photo.data.hits))
})

const renderPhotoCardsMarkup = (responsePhotosArr) => {
    galleryList.textContent = '';
    
    const renderMarkup = responsePhotosArr.map(photo => {
        return `<div class="photo-card">
            <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy"" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${photo.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${photo.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${photo.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${photo.downloads}
                    
                </p>
            </div>
        </div>`
    }).join('')
    
    galleryList.insertAdjacentHTML('afterbegin',renderMarkup )
}


const searchPhotos = async () => {

    const axiosGetPictures = await axios({
        method: 'get',
        url: 'https://pixabay.com/api/',
        params: {
            key: '32278490-2dbba53cd6748a66599a7e56e',
            q: searchForm.elements.searchQuery.value,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        },
    });
    
    return axiosGetPictures;
}