$(function(){
	$('#btnReset').hide();
 	$('#search').on('click', function(e){
 		e.preventDefault();
  	var parameters = { city: $('#city').val(), language: $('#language').val() };
  	console.log(parameters)
    $.get( '/searching',parameters, function(data) {
    	$('#btnSearch').hide();
    	$('#btnReset').show();
    	$('#results').html(data);
  	});
 	});
});

