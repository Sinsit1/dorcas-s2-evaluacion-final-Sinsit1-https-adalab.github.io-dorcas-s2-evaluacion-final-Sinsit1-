'use strict';

var buttonSearch = document.querySelector('.buttonSearch');
var searchHolder = document.getElementById('buscador');
var results = document.querySelector('.grid-container-results');

function searchShow() {
  results.innerHTML= ''; // reseteo la busqueda
  var search = searchHolder.value;
  var list = document.createElement('ul');

  results.appendChild(list);

  fetch('http://api.tvmaze.com/search/shows?q=' + search)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      var result = json;

      for (var i = 0; i < result.length; i++) {
        var element = document.createElement('li');
        element.addEventListener('click', favorites);
        var img = document.createElement('img');
        var h2 = document.createElement('h2');

        h2.innerHTML = result[i].show.name;
        list.appendChild(element);
        element.appendChild(img);
        element.appendChild(h2);

        if (result[i].show.image===null){
          img.setAttribute('src', 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV');
        } else {
          img.setAttribute('src', result[i].show.image.medium);
        }
      }
    });
}

function favorites (event) {

console.log('hola que tal');


}

buttonSearch.addEventListener('click', searchShow);
