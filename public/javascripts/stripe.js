$(document).ready(() => {
  Stripe.setPublishableKey('pk_test_1tPKkYH3EcEh8MLtf3KGD9b300Tcw17YHz')

  const stripeResponseHandler = (status, res) => {
    let $form = $('#payment-form')

    if (res.error) {
      console.log(`Stripe error: ${res.error.message}`)

      $('.payment-errors')
        .parent()
        .parent()
        .show()

      $form.find('.payment-errors').text(res.error.message)
      $('#btnSubmit').attr('disabled', false)
    } else {
      const token = res.id
      $form.append($('<input type="hidden" name="stripeToken" />').val(token))

      $form.get(0).submit()
    }
  }

  $('#payment-form').submit(e => {
    e.preventDefault()

    const cardNumber = $('#card').val()
    const cvc = $('#card-cvc').val()
    const expMonth = $('#card-exp')
      .val()
      .slice(0, 2)
    const expYear = $('#card-exp')
      .val()
      .slice(2, 4)

    $('#btnSubmit').attr('disabled', true)

    Stripe.card.createToken(
      {
        number: cardNumber,
        cvc,
        exp_month: expMonth,
        exp_year: expYear
      },
      stripeResponseHandler
    )
  })
})
