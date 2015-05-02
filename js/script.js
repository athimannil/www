$(document).ready(function() {


	loadData();

	function loadData () {
			$.get('./data.json', function(data) {
				

			});						

			function renderCatgories(data){
				
				 var div 		= $('<div/>',{class:'keyword-item'});
				 var u 	 		= $('<u/>',{class:'pull-right'});
				 var button 	= $('<button/>',{class:'btn btn-defualt btn-xs'})
				 var span 		= $('<span/>',{class:'glyphicon glyphicon-chevron-left'})

				 var clnBtn 	= button.clone();
				 var clnDiv		= div.clone();

				 span.clone().appendTo(clnBtn);
 				 span.clone().appendTo(clnBtn);

 				 u.clone().appendTo(div);
 				 clnBtn.appendTo(div);



			}
	}

});