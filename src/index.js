const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const searchForm = document.querySelector('.search-form')
const galleryList = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')

let currentPage;

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    loadMoreBtn.classList.add('is-hidden')
    galleryList.textContent = '';

    searchPhotos().then(photo => {

        if (photo.data.hits.length === 0) {
            
            Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            return 
        }

        currentPage = 1;
        
        renderPhotoCardsMarkup(photo.data.hits)
        loadMoreBtn.classList.remove('is-hidden')
    } )

    
})

loadMoreBtn.addEventListener('click', () => {
    
    currentPage +=1;
    searchPhotos().then(photo => {
        
        renderPhotoCardsMarkup(photo.data.hits)
        console.log(galleryList.childElementCount);
        console.log(photo.data.totalHits);

        if (galleryList.childElementCount === photo.data.totalHits) {
            Notify.info("We're sorry, but you've reached the end of search results.")
            loadMoreBtn.classList.add('is-hidden')
        };
        
    })
    
    
})

const renderPhotoCardsMarkup = (responsePhotosArr) => {
    

    const renderMarkup = responsePhotosArr.map(photo => {
        return `<div class="photo-card">
            <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
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
    
    galleryList.insertAdjacentHTML('beforeend',renderMarkup )
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
            page: currentPage,
            per_page: 40,
        },
    });

    return axiosGetPictures;
}