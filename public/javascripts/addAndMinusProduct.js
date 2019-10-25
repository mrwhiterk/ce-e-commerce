/* eslint-disable no-undef */
const initialPrice = $('#priceValue').val()

$('#plus').click(function (e) {
  $('#total').text(+$('#total').text() + 1)
  $('#quantity').val($('#total').text())
  $('#priceValue').val((initialPrice * $('#total').text()).toFixed(2))
})

$('#minus').click(function (e) {
  if ($('#total').text() == 1) return

  $('#total').text(+$('#total').text() - 1)
  $('#quantity').val($('#total').text())
  $('#priceValue').val((initialPrice * $('#total').text()).toFixed(2))
})
