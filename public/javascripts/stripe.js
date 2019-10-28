$(() => {
  $('#payment-form').submit((e) => {
    e.preventDefault()

    let cardNumber = $('#card').val()
    let cvc = $('#card-cvc').val()
    let expMonth = $('#card-exp').val().slice(0, 2)
    let expYear = $('#card-exp').val().slice(2, 4)
    // let expYear = $().val()

    console.log(cardNumber)
    console.log(cvc)
    console.log(expMonth)
    console.log(expYear)

    $('#btnSubmit').attr('disabled', true)
  })
})
