'use strict';

var body = document.querySelector('body');
var buttonSearch = document.querySelector('.buttonSearch');
var searchHolder = document.getElementById('buscador');
var element;
var list = document.createElement('ul');


function favorites(event) {
  var targetElement = event.currentTarget;
  if (targetElement.classList.contains('list2')) {
    targetElement.classList.remove('list2');
  }else {
    targetElement.classList.add('list2');
  }
}
function searchShow() {
  list.innerHTML = ''; // reseteo la busqueda
  var search = searchHolder.value;
  list = document.createElement('ul');

  body.appendChild(list);

  fetch('http://api.tvmaze.com/search/shows?q=' + search)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      var result = json;

      for (var i = 0; i < result.length; i++) {
        element = document.createElement('li');
        element.classList.add('list');
        element.addEventListener('click', favorites);

        var img = document.createElement('img');
        var h2 = document.createElement('h2');

        h2.innerHTML = result[i].show.name;

        if (result[i].show.image === null) {
          img.setAttribute('src', 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV');
        } else {
          img.setAttribute('src', result[i].show.image.medium);
        }

        list.appendChild(element);
        list.classList.add ('grid-container-results');
        element.appendChild(img);
        element.appendChild(h2);


      }
    });
}

buttonSearch.addEventListener('click', searchShow);
