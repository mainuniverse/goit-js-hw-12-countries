//import './sass/main.scss';
import fetchCountry from './js/fetchCountries';
//import refs from './js/getRefs';
import countryCard from './js/templates/countryAll.hbs';
import countriesList from './js/templates/country-list.hbs';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const refs = {
    search: document.querySelector('.search-form'),
    country: document.querySelector('.countries-list'),
    outputBox: document.querySelector('.country-info'),
};
//let searchQuery = '';
refs.search.addEventListener('input', debounce(searchCountry, 500));
//inputRef.addEventListener('input', debounce(onInput, 500));
// const inputRef = document.querySelector('.js_input');
// const listRef = document.querySelector('.js_list');
// const markup = document.querySelector('.js_markup');

function searchCountry(e) {
  const userCountry = e.target.value;
  if (userCountry) {
    refs.country.innerHTML = '';
    refs.outputBox.innerHTML = '';  
  }
   fetchCountry(userCountry)
   .then(displayInfo)
    .catch(fetchError);
};


function displayInfo(data) {
   if (data.length === 1) {
        return (refs.outputBox.innerHTML = countryCard (data[0]));
      }

      if (data.length > 2 && data.length < 10) {
        return (refs.country.innerHTML = countriesList(data));
      }
      if (data.length > 10) {
         fetchError(error,
            'To many matches found. Please enter more specific query!');
         return;
      }
      else {
         fetchError(error,
            'Not found!');
       }
      }
function fetchError(Error) {
    Error;
}

// inputRef.addEventListener('input', debounce(onInput, 500));

// function searchCountry(e) {
//   const itemCountry = e.target.value;
//   if (itemCountry) {
//     country.innerHTML = '';
//     refs.outputBox.innerHTML = '';  
//   }
//    fetchCountry(valueCountry)
//    .then(renderSearchCountries)
//     .catch(fetchError);
// };


// function renderSearchCountries(countries) {
//     if (countries.length > 10) {
//         return error({ text: "Too many matches found. Please enter a more specific query!" });
//     }

//     if (countries.length >= 2 && countries.length <= 10) {
//         markupCountryList(countries);
//         return;
//     }

//     markupCountryInfo(countries);
// }

// function markupCountryList(countries) {
//     const markupCountryList = countriesList(countries);
//         refs.country.insertAdjacentHTML('beforeend', markupCountryList); 
// }

// function markupCountryInfo(countries) {
//     const markup = countryCard(countries);
//     refs.country.insertAdjacentHTML('beforeend', markup);
// }

// function searchCountry() {
//     refs.country.innerHTML = '';
//     searchQuery = refs.search.value; 
//     fetchCountry(searchQuery)
//         .then(renderSearchCountries)
//         .catch(error => console.log(error))
// }



// function searchCountry() {
//   onInputClear();
//   const searchQuery = refs.input.value.trim();
//   fetchCountry(searchQuery)
//     .then(country => {
//       if (country.length > 10) {
//         error({
//           text: 'Too many matches found. Please enter a more specific query!',
//         });
//       } else if (country.status === 404) {
//         error({
//           text: 'No country has been found. Please enter a more specific query!',
//         });
//       } else if (country.length === 1) {
//         onRenderCountryCard(country);
//       } else if (country.length <= 10) {
//         onRenderListCountries(country);
//       }
//     })
//     .catch(onFetchError);
// }


// function onRenderCountryCard(country) {
//     const markup = countryCard(country);
//     refs.outputBox.innerHTML = markup;
// }

// function onRenderListCountries(country) {
//     const listMarkup = countriesList(country);
//     refs.countries.insertAdjacentHTML('beforeend', listMarkup);
// }

// // function onInputClear() {
// //     refs.outputBox.innerHTML = '';
// //     refs.countries.innerHTML = '';
// // }

// function onFetchError(Error) {
//     Error;
// }
// alert({
//   text: 'Too many marches found. Please enter a more specific query!',
// });


// const inputRef = document.querySelector('.js_input');
// const listRef = document.querySelector('.js_list');
// const markup = document.querySelector('.js_markup');

