$(document).ready(function() {

	loadData();

	function loadData () {

		$.getJSON('./data.json', function(data) {
		
			renderCatgories(data);// Render categories with data.json				
		
		});						

		function renderCatgories(data){

			var div 		= $('<div/>',{class:'keyword-item'});
			var u 	 		= $('<u/>',{class:'pull-right'});
			var button 	= $('<button/>',{class:'btn btn-defualt btn-xs'})
			var span 		= $('<span/>',{class:'glyphicon glyphicon-chevron-left'})
		 

			var cats = data.categories;

			for (var i = 0; i < cats.length; i++) {				 
			
				var clnBtn 	= button.clone();
				var clnDiv		= div.clone();

				clnDiv.data('id', cats[i].id)
				clnDiv.text(cats[i].name)
				span.clone().appendTo(clnBtn);
 				span.clone().appendTo(clnBtn);

 				u.clone().appendTo(clnDiv);
 				clnBtn.appendTo(clnDiv);

 				clnDiv.appendTo('#keyword-wrap');

			};	
		}
	}
});