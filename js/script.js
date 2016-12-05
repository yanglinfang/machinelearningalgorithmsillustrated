$(function () {

  // $.ajax();  <<< CORE METHOD
  // $('').load();
  // $.get();
  // $.post();
  // $.getScript();
  // $.getJSON();
  $('header').hide(); // hide the header on page load so users click the button - forced to go to learn view
  callPage('#home')

  $(document.body).on('click', '.page', function (e) {
    e.preventDefault();

    $('header').show(); // always show the header thereafter.

    $('.page').removeClass('active');

    var pageRef = $(this).find('a').attr('href');

    console.log('page',pageRef)
    $('.nav li a[href="'+pageRef+'"]').parent('li').addClass('active')

    callPage(pageRef)
    $(document.body).scrollTop( 0 );


  });

  

  $(document.body).on('click', "#playLR", function (e) {
       // $("#LRdata").text("Linearly separable case normalized data");
       var that = $(this).find('i')
           that.text('hourglass_empty')

        lrMatrixModule.update();
  })

  $(document.body).on('click', "#playNN", function (e) {
        //$("#NNdata").text("Non linearly separable case normalized data");
        var that = $(this).find('i')
            that.text('hourglass_empty')

        nnMatrixModule.update();
  })

  function callPage(pageRefInput) {
    var pageName = pageRefInput.split("#");
    pageName = pageName[1] + ".html";

    $.ajax({

      url: pageName,
      type: "GET",
      dataType: 'text',
      success: function (response) {
        $('#content').html(response);

        // prevent everythign running in duplicate on all the pages
        // it's not beautiful but it works.
        if(pageName == "learn.html"){

          draw('LR', [2, 1]);
          draw('NN', [2, 3, 1]);
          drawLossChart('LR');
          drawLossChart('NN');


          nnMatrixModule.start('NNweights')
          lrMatrixModule.start('LRweights')
          
          drawDecisionBoundary('LR');
          drawDecisionBoundary('NN');

        }
        
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