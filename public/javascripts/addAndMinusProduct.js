const plusBtn = document.querySelector('#plus')
const minusBtn = document.querySelector('#minus')
const counter = document.querySelector('#total')
const priceValue = document.querySelector('#priceValue')
const initialPrice = +priceValue.value

plusBtn.addEventListener('click', () => {
  counter.textContent = +counter.textContent + 1
  priceValue.value = Number(initialPrice * +counter.textContent).toFixed(2)
})

minusBtn.addEventListener('click', () => {
  const num = +counter.textContent
  if (num > 1) counter.textContent = num - 1
  priceValue.value = Number(initialPrice * +counter.textContent).toFixed(2)
})
