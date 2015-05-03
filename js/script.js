$(document).ready(function() {

	loadData();

	function loadData () {

		$.getJSON('./data.json', function(data) {
		
			renderCatgories(data);// Render categories with data.json		
		});						

		function renderCatgories(data){

			var div 		= $('<div/>',{class:'keyword-item'});
			var u 	 		= $('<u/>',{class:'pull-right',text:'keywords'});
			var button 		= $('<button/>',{class:'btn btn-defualt btn-xss btn-arrow pull-left'});
			var span		= $('<span/>',{class:'keyword'});
			var spanLeft	= $('<span/>',{class:'glyphicon glyphicon-left-arrows'});
			var p 			= $('<p/>');
		 
			var cats = data.categories;

			for (var i = 0; i < cats.length; i++) {				 
			
				var clnBtn 	= button.clone();
				var clnDiv	= div.clone();
				var clnP	= p.clone();

				clnDiv.data('id', cats[i].id)
				
				spanLeft.clone().appendTo(clnBtn);

				clnBtn.appendTo(clnP);
				span.clone().text(cats[i].name).appendTo(clnP);

 				u.clone().appendTo(clnDiv);
 				clnP.appendTo(clnDiv);
 			
 				clnDiv.appendTo('#keyword-sel');
			};	
		}
	}
});