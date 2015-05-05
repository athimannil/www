$(document).ready(function() {

	loadData();

	function loadData () {


		//Hide category panel
		$('.btn-hide').click(function(ev) {

		});

		if(!(localStorage.getItem('selItems') && localStorage.getItem('catItems'))){
			//Load data
			$.getJSON('./data.json', function(data.categories) {		
				renderCatgories(data);// Render categories with data.json		
			});
		}else{
			//Restore saved data 
			$('#keyword-sel').html(localStorage.getItem('catItems'));
			
			var data= JSON.parse(localStorage.getItem('selItems')).categories;
			var selectedItems = $('#keyword-wrap');

			// console.log(data);
			for (var i = 1; i < data.length; i++) {
				selectedItems.append(addCategory(data[i].id,data[i].name,data[i].selected));
			};			
		}

		function renderCatgories(cats)
		{

			var div 		= $('<div/>',{class:'keyword-item'});
			var u 	 		= $('<u/>',{class:'pull-right',text:'keywords'});
			var button 		= $('<button/>',{class:'btn btn-default btn-xss btn-arrow pull-left btn-left'});
			var span		= $('<span/>',{class:'keyword'});
			var spanLeft	= $('<span/>',{class:'glyphicon glyphicon-left-arrows'});
			var p 			= $('<p/>');
		 			

			for (var i = 0; i < cats.length; i++) {				 
			
				var clnBtn 	= button.clone();
				var clnDiv	= div.clone();
				var clnP	= p.clone();

				clnDiv.data('id', cats[i].id);

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
			$(this).parents('.keyword-item').addClass('inactive');

		}));

		function addCategory(id,name,checked)
		{
			var div 		= $('<div/>',{class:'keyword-item'});
			var u 			= $('<u/>',{class:'pull-right',text:'keywords'});
			var span 		= $('<span/>',{class:'glyphicon'});
			var checkbox	= $('<input/>',{class:'btn-select',type:'checkbox'});

			checked = checked || {};
			if(checked === true) 
			{
				checkbox.prop( "checked" ,'checked');
				div.data('selected','true');
			}
			var label		= $('<label/>').append(checkbox);

			div.data('id', id);
			div.data('name', name);
			div.data('selected','false');

			u.appendTo(div);
			span.appendTo(label);
			label.append(name);			
			label.appendTo(div);

			return div;			
		}

		// Checkbox checked
		$('#keyword-wrap').on('click','.btn-select',function(ev){
			
			$(this).parents('.keyword-item').data('selected',$(this).is(':checked'));	
		});

		//Save selection

		$('.btn-save').click(function(ev) {
			var data 	= new Object();
			data.categories=[];

			$('#keyword-wrap > .keyword-item').each(function(index, el) {
				var item 	= new Object();

				item.name 		= $(this).data('name');
				item.id			= $(this).data('id');
				item.selected	= $(this).data('selected');
				data.categories.push(item);
			});			
				
			localStorage.setItem('selItems',JSON.stringify(data));
			localStorage.setItem('catItems',$('#keyword-sel').html());
		});

	}
});