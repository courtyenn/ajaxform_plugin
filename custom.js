$(document).on('ready', function(){
	
	$('#signup-form').ajaxform({method:'POST'});
});

; //create closure
(function($){
	//plugin definition
	$.fn.ajaxform = function(options){
		var $form = $(this);
		$.fn.ajaxform.defaults = 
		{
			action: $form.attr('action') || document.URL,
			method: $form.attr('method') || "GET",
			success: function(data){console.log('complete'); console.log(data);},
			data: []
		};
		var settings = $.extend({}, $.fn.ajaxform.defaults, options);
		
		$form.on('submit', function(event){
			$form.children().each(function(index){

				var $child = $(this);
				var name = $child.attr('name');
				if(!$child.is('input[type="submit"],input[type="button"]') && name == undefined || settings.data == []){
					settings.data[name] = $child.val();
				}
			});

			$.ajax({url:settings.action, type: settings.method,success:settings.success, data:settings.data });
			event.preventDefault();
		});			
	};
	//end closure
})(jQuery);