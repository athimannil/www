$(document).ready(function() {

	loadData();

	function loadData () {


		//Hide category panel
		$('.btn-hide').click(function(ev) {

		});

		$.getJSON('./data.json', function(data) {
		
			renderCatgories(data);// Render categories with data.json		
		});

		function renderCatgories(data)
		{

			var div 		= $('<div/>',{class:'keyword-item'});
			var u 	 		= $('<u/>',{class:'pull-right',text:'keywords'});
			var button 		= $('<button/>',{class:'btn btn-default btn-xss btn-arrow pull-left btn-left'});
			var span		= $('<span/>',{class:'keyword'});
			var spanLeft	= $('<span/>',{class:'glyphicon glyphicon-left-arrows'});
			var p 			= $('<p/>');
		 
			var cats = data.categories;

			for (var i = 0; i < cats.length; i++) {				 
			
				var clnBtn 	= button.clone();
				var clnDiv	= div.clone();
				var clnP	= p.clone();

				clnBtn.data('id', cats[i].id);
				clnBtn.data('name', cats[i].name);
				
				spanLeft.clone().appendTo(clnBtn);

				clnBtn.appendTo(clnP);
				span.clone().text(cats[i].name).appendTo(clnP);

 				u.clone().appendTo(clnDiv);
 				clnP.appendTo(clnDiv);
 			
 				clnDiv.appendTo('#keyword-sel');
			}
		}
		

		//Add category 

		$('#keyword-sel').on('click','.btn-left',(function(ev) {
			var dataId 		= $(this).data('id');
			var dataName	= $(this).data('name');
			

			//add to left					
			$('#keyword-wrap').append(addCategory(dataId,dataName));

			//Disable Item to avoid duplicate entry  

			$(this).addClass('disabled');

		}));

		function addCategory(id,name)
		{
			var div 	= $('<div/>',{class:'keyword-item'});
			var u 		= $('<u/>',{class:'pull-right',text:'keywords'});
			var label	= $('<label/>').html('<input class="btn-select" type="checkbox">');
			var span 	= $('<span/>',{class:'glyphicon',text:name});

			div.data('id', id);
			div.data('name', name);

			u.appendTo(div);
			span.appendTo(label);
			label.appendTo(div);

			return div;			
		}


		//Checkbox checked

		$('#keyword-wrap').on('click','.btn-select',function(ev){
			$(this).parents('.keyword-item').data('selected',$(this).is(':checked'));
		});

	}
});