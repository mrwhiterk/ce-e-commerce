console.log('hey')

console.log($('#searchInput'))
let $searchInput = $('#searchInput')

$searchInput.on('keyup', function(e) {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', `products/searchByJQuery?query=${e.target.value}`, true)
  xhr.responseType = 'json'
  xhr.onload = function() {
    if (this.status === 200) {
      let data = xhr.response

      $('#productSearchResults').empty()
      const { products } = data;

      products.forEach(product => {
        $('#productSearchResults').append(`<div class="col"><div class="card">
            <a href="/products/${product.id}">
              <img
                class="card-img-top"
                src="${product.image}"
                alt="Card image cap"
              />
            </a>
            <div class="card-body">
              <h5 class="card-title">Name: ${product.name}</h5>
              <p class="card-text">Category: ${product.category.name}</p>
              <p class="card-text">$ ${product.price.toFixed(2)}</p>
              <a href="/products/${product.id}" class="btn btn-primary">
                Shop
              </a>
            </div>
          </div>
        </div>`)
      })
    }
  }

  xhr.send()
})
