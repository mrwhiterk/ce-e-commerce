$('#searchInput').on('keyup', async function({ target: { value } }) {
  const $productSearchResults = $('#productSearchResults')

  const response = await fetch(
    `/products/searchByAjax?query=${value}`
  )
  const { products } = await response.json()

  $productSearchResults.empty()

  if (!products.length) {
    $productSearchResults.html('No results')
  }

  products.forEach(product => {
    $productSearchResults.append(`<div class="col"><div class="card">
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
              <a href="/products/${product._id}" class="btn btn-primary">
                Shop
              </a>
            </div>
          </div>
        </div>`)
  })
})
