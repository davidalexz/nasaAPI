var api_key = 'rjEj04cfDRVlaJi9ScraXTD4I7xvkUPBqAHGDvYv';
var baseUrl = "https://api.nasa.gov/planetary/apod";

var url = new URL(baseUrl);
url.searchParams.set('api_key', api_key);

function getAstronomyPictureOfTheDayPromise(selectedDate) {

    if (selectedDate) {
        url.searchParams.set('date', selectedDate);
    }

    return new Promise(function (resolve, reject) {
        fetch(url.href)
            .then(function (response) {
                if (response.status === 200) {
                    resolve(response)
                } else {
                    response.json().then(function (reason) {
                        reject(reason)
                    });
                }
            })
            .catch(function (error) {
                return new Error("Something went wrong! Please try again!")
            })
    })
}

function displayError(error) {
    var errorContainer = document.getElementById("error");
    errorContainer.innerText = "Error: " + JSON.stringify(error);
}

function displayPicture(pictureUrl) {
    var img = document.getElementById("picture");
    img.src = pictureUrl;
}

function displayTitle(pictureTitle, pictureDate) {
    var title = document.getElementById('title');
    var dateString = pictureDate ? pictureDate + ' picture: ' : 'Today\'s picture: ';
    title.innerText = dateString + pictureTitle;
}

function parseResponse(response) {
    return response.json();
}

function showLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    loader.classList.add("show");
}

function hideLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    loader.classList.remove("show");
}

function getTodaysPicture() {
    showLoader();
    getAstronomyPictureOfTheDayPromise()
        .then(parseResponse)
        .then(
            function (response) {
                displayPicture(response.url);
                displayTitle(response.title);
            }
        )
        .catch(function (error) {
            displayError(error);
        })
        .finally(hideLoader);
        var form = document.getElementById("dateForm");
        form.addEventListener("submit", getImage);
}

function getImage() { 
    event.preventDefault() 
    var getDate = document.getElementsByClassName('picDate')[0].value;
    showLoader();
    getAstronomyPictureOfTheDayPromise(getDate)
        .then(parseResponse)
        .then(
            function (response) {
                displayPicture(response.url);
                displayTitle(response.title);
            }
        )
        .catch(function (error) {
            displayError(error);
        })
        .finally(hideLoader);
}

window.addEventListener('DOMContentLoaded', getTodaysPicture);