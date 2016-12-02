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

  
  
  console.log('LRnorm',LRNorm)
  console.log('NNnorm',NNNorm)

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

        drawLRMatrix('LRweights');
        drawNNMatrix('NNweights');
        
        setupClickPlay('LR');
        setupClickPlay('NN');
        
        drawDecisionBoundary('LR');
        drawDecisionBoundary('NN');

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