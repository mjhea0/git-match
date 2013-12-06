$(function(){
  $('#btnAgain').hide();
  $('#btnReset').hide();
 	$('.search').on('click', function(e){
 		e.preventDefault();
  	var parameters = { city: $('#city').val()};
  	console.log(parameters)
    $.get( '/searching',parameters, function(data) {
    	$('input').hide();
    	$('#btnSearch').hide();
    	$('#btnAgain').show();
    	$('#btnReset').show();
    	$('#results').html(data);
  	});
 	});
 	$('#btnReset').on('click', function(e){
 		e.preventDefault();
 		$('input').val('').show();
    $('#btnSearch').show();
    $('#btnAgain').hide();
    $('#btnReset').hide();
    $('#results').html('');
  });
});
