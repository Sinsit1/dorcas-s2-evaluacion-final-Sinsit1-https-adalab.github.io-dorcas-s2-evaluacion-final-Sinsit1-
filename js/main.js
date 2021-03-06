'use strict';

var buttonSearch = document.querySelector('.buttonSearch');
var container = document.querySelector('.container');
var searchHolder = document.getElementById('buscador');
var list = document.createElement('ul');
var element;
var h2;
var result;
var noResults;

function favorites(event) {
  var targetElement = event.currentTarget;

  if (targetElement.classList.contains('list2')) {
    targetElement.classList.remove('list2');
  } else {
    targetElement.classList.add('list2');
  }
}

function searchShow() {
  list.innerHTML = ''; // reseteo la busqueda
  var search = searchHolder.value;

  fetch('http://api.tvmaze.com/search/people?q=' + search)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      result = json;
      console.log(result);

      //controlo que si no existen resultados me avise
      if (result.length === 0) {
        container.innerHTML = '';
        noResults = document.createElement('h2');
        noResults.innerHTML = 'No existen resultados para su búsqueda';
        container.appendChild(noResults);

      } else { //si hay resultados....
        container.innerHTML = '';
        var numero = document.createElement('p');
        container.appendChild(numero);
        numero.innerHTML= 'Se han encontrado '+result.length+' resultados para la busqueda de '+ searchHolder.value;
        container.appendChild(list);
        for (var i = 0; i < result.length; i++) {
          element = document.createElement('li');
          element.classList.add('list');
          element.addEventListener('click', favorites);

          var img = document.createElement('img');
          h2 = document.createElement('a');
          h2.classList.add('items-title');

          h2.innerHTML = result[i].person.name;
          // h2.setAttribute('src', result[i].show.url);

          if (result[i].person.image === null) {
            img.setAttribute('src', 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV');
          } else {
            img.setAttribute('src', result[i].person.image.medium);
          }

          list.appendChild(element);
          list.classList.add('grid-container-results');
          element.appendChild(img);
          element.appendChild(h2);
        }
      }
    });
}

// código para capturar ENTER
searchHolder.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) {
    searchShow();
  }
});

buttonSearch.addEventListener('click', searchShow);
