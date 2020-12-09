const imageContainer = document.getElementById('image-container'); 
const loader = document.getElementById('loader');
let photosArray = [];
// constants for API 
const countPhotos = 5;
const apiKEY  = 'xYUWtVaNcw5KT-FpPnBsJGRB4medXk4nXS3iT24-7C0';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${countPhotos}`
//error counter
let errorCount = 0;

function displayError(){
    const showAlert = document.createElement('h1');
    showAlert.textContent = "Rate limit reached, try again soon...";
    setAttributes(showAlert, {
        class: "error"
    })
}
//helper function to set attributes

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// create elements for links, photos
function displayPhotos(){
    photosArray.forEach((photo)=>{
        
        const link = document.createElement('a');
        setAttributes(link, {
            href: photo.links.html,
            target: '_blank',
            class: 'link',
        })
        
        const image = document.createElement('img');
        setAttributes(image,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        // 
        link.appendChild(image);
        imageContainer.appendChild(link)
    })
}

// get photos from API 
async function getPictures(){
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        console.log(photosArray)
        displayPhotos();
    }catch (error){
        console.log(error);
        errorCount++
        console.log(errorCount)
        if(errorCount < 10){
            getPictures();
        }else{

        }
    }
}

getPictures();