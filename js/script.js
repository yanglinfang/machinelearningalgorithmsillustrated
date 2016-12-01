$(function () {

  // $.ajax();  <<< CORE METHOD
  // $('').load();
  // $.get();
  // $.post();
  // $.getScript();
  // $.getJSON();
  callPage('#home')

  $(document.body).on('click', '.page', function (e) {
    e.preventDefault();
    var pageRef = $(this).find('a').attr('href');
    callPage(pageRef)

  });

  var scatterLR = [
    { x1: 98, x2: 5.5, y: 0 },
    { x1: 120, x2: 5.8, y: 0 },
    { x1: 168, x2: 6.2, y: 0 },
    { x1: 200, x2: 5.5, y: 1 },
    { x1: 210, x2: 5, y: 1 },
    { x1: 168, x2: 5, y: 1 }
  ]
  var scatterNN = [
    { x1: 98, x2: 5.5, y: 0 },
    { x1: 155, x2: 5.2, y: 0 },
    { x1: 120, x2: 5.7, y: 0 },
    { x1: 168, x2: 6.2, y: 0 },
    { x1: 200, x2: 5.5, y: 1 },
    { x1: 210, x2: 5, y: 1 },
    { x1: 168, x2: 5, y: 1 },
    { x1: 110, x2: 6.0, y: 1 },
    { x1: 125, x2: 5.8, y: 1 }
  ]

  function setupClickPlay(elem) {
    $(document.body).on('click', "#play" + elem, function (e) {
      //user clicked play
      //first step is normalize data
      switch (elem) {
        case "LR":
          scatter('ScatterLR', normalizeData(scatterLR));
          break;
        case "NN":
          scatter('ScatterNN', normalizeData(scatterNN));
          break;
      }
    })

    $(document.body).on('click', "#back" + elem, function (e) {
      //user clicked back
      //setback data
      switch (elem) {
        case "LR":
          scatter('ScatterLR', scatterLR);
          break;
        case "NN":
          scatter('ScatterNN', scatterNN);
          break;
      }
    })
  }

  function callPage(pageRefInput) {
    var pageName = pageRefInput.split("#");
    pageName = pageName[1] + ".html";

    $.ajax({

      url: pageName,
      type: "GET",
      dataType: 'text',
      success: function (response) {
        $('#content').html(response);
        scatter('ScatterLR', scatterLR);
        scatter('ScatterNN', scatterNN);
        draw('LR', [2, 1]);
        draw('NN', [2, 3, 1]);
        drawLossChart('LR');
        drawLossChart('NN');

        drawMatrix('LRweights');
        
        setupClickPlay('LR');
        setupClickPlay('NN');
        
        //drawDecisionBoundary('LR');
        //drawDecisionBoundary('NN');

        setTimeout(function () {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }, 1);
      },
      error: function (error) {
        console.log('Error loading page', error);
      },
      complete: function (xhr, status) {
        console.log("Request complete");
      }
    });
  }



});