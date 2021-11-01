//import './sass/main.scss';
import fetchCountry from './js/fetchCountries';
import refs from './js/getRefs';
import countryCard from './js/templates/countryAll.hbs';
import countriesList from './js/templates/country-list.hbs';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
// const debounce = require('lodash.debounce');
// const refs = {
//     search: document.querySelector('.search-form'),
//     country: document.querySelector('.countries-list'),
//     outputBox: document.querySelector('.country-info'),
// };
//let searchQuery = '';
refs.search.addEventListener('input', debounce(searchCountry, 500));

let inputValue = '';

function searchCountry() {
  inputValue = refs.search.value;
  clearMarkup();
  if (refs.search.value === '') { return }
  else {
    fetchCountry(inputValue).then(data => {
      if (data.status && data.status !== 200) {
        error({
          text: 'Not found',
        });
        }
   if (data.length > 2 && data.length < 10) {
        return (refs.country.innerHTML = countriesList(data));
      }
      
      if (data.length > 10) {
        error({
          text: 'To many matches found. Please enter more specific query!',
        });
      }  if (data.length === 1) {
        renderCountrieCard(data[0])
      } else { renderCountriesList(data) }
    }).catch(error => console.log(error))
  }
};

function renderCountrieCard(country) {
  const countrieCardTemplate =countryCard(country);
  refs.country.insertAdjacentHTML('beforeend', countrieCardTemplate)
};

function renderCountriesList(countries) { 
  const countriesNames = countries.map( (сountry) => `<li class="country-item">${сountrie.name}</li>`).join('');
  refs.country.insertAdjacentHTML('beforeend', countriesNames);
};

function clearMarkup() { 
  refs.country.innerHTML = '';
  };


