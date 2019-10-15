const theWheel = new Winwheel({
    'outerRadius': 146,    // Use these three properties to
    'centerX': 200,    // correctly position the wheel
    'centerY': 201,    // over the background.
    'lineWidth': 2,
    'numSegments': 4,
    'segments': rewards,
    'short_link': '',
    'animation':
    {
        'type': 'spinToStop',
        'duration': 5,
        'spins': 8,
        'callbackFinished': alertPrize
    }
})

function alertPrize(indicatedSegment) {
    $('#result').html('<div class = "alert alert-success text-center"><i class="fas fa-bullhorn"></i> You have won ' + indicatedSegment.text + '</div>')
    console.log(theWheel.short_link)
}

function calculatePrize() {

    $.ajax({
        url: "/claim",
        type: "post",
        dataType: "text",
        data: {
            address: $('#address').val()
        },
        success: function (response) {
            let result = JSON.parse(response)
            if (result.status != 'success')
                $('#result').html('<div class="alert alert-danger text-center">' + result.message + '</div>')
            else {
                console.log(result)
                theWheel.animation.stopAngle = parseInt(result.radius)
                theWheel.short_link = result.resultUrl
                theWheel.startAnimation()
            }
        }
    });
}