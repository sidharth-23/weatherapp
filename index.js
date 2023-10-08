//we select the html elements and store them in variables

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


//we add an event listener to the search button
//we call the arrow function when it is clicked

search.addEventListener('click', () => {

    //the api key is stored in the variable named APIKey
    //what we pass in through the input field is stored in the city variable
    const APIKey = "852d2023fe8613e95d88830b3ed12f7e"
    const city = document.querySelector('.search-box input').value

    //here if the city is null we can exit out of the function without checking the rest of the details
    if (city === '')
        return;



    /* This fetch function initiates a request to the OpenWeatherMap API to retrieve weather data for the specified city. The template string includes the city and APIKey as part of the URL. The returned response is converted to JSON format using the .json() method. The subsequent .then() functions handle the asynchronous response.*/  
    
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        if (json.cod === '404') {



           /* This block checks if the cod property in the JSON response is equal to '404', indicating that the city wasn't found. If so, it adjusts styles and displays to show an error message (class .not-found) and hides other weather-related elements.*/


            container.style.height = '400px'
            weatherBox.style.display = 'none'
            weatherDetails.style.display = 'none'
            error404.style.display = 'block'
            error404.classList.add('fadeIn')
            return;
        }
        error404.style.display = 'none'
        error404.classList.remove('fadeIn')





        /*These lines select various elements within the HTML to which weather information will be dynamically added.*/

        const image = document.querySelector('.weather-box img')
        const temperature = document.querySelector('.weather-box .temperature')
        const description = document.querySelector('.weather-box .description')
        const humidity = document.querySelector('.weather-details .humidity span')
        const wind = document.querySelector('.weather-details .wind span')



        /*This switch statement examines the weather condition retrieved from the JSON response and sets the appropriate image source based on the weather condition. Images are associated with different weather conditions.*/

        switch(json.weather[0].main){
            case 'Clear':
                image.src='images/clear.png'
                break;

            case 'Rain':
                image.src='images/rain.png'
                break ;

            case 'Snow':
                image.src='images/snow.png'
                break ;
                
            case 'Clouds':
                image.src='images/clouds.png'
                break;
            
            case 'Haze':
                 image.src='images/haze.png'
                break;

                default:
                    image.src=''
                
                
        }

        /*These lines update the content of various elements with weather-related data obtained from the JSON response, such as temperature, weather description, humidity, and wind speed.*/


        temperature.innerHTML =  `${parseInt(json.main.temp)}<span>°C</span>`
        description.innerHTML= `${json.weather[0].description}`
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`


        /*These lines control the display of weather-related elements. They reset the display style of weatherBox and weatherDetails, add a 'fadeIn' class to them for animation, and adjust the container's height to accommodate the weather information. */
        weatherBox.style.display =''
        weatherDetails.style.display=''
        weatherBox.classList.add('fadeIn')
        weatherDetails.classList.add('fadeIn')
        container.style.height='590px'
    });

});
