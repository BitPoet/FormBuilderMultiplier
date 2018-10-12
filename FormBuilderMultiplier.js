
/**
 * Activate "add row" buttons for multiplier
 */
$(document).ready(function() {

	/**
	 * Helper function for formatting string, takes placeholders in
	 * the form {0}, {1} ... {n}.
	 */	
	var formatString = function(str) {
		var args = [];
		for(var i = 1; i < arguments.length; i++) {
			args[i - 1] = arguments[i];
		}
		
		if(typeof str !== 'string') return str;

		return str.replace(/\{(\d+)\}/g, function(match, p1) {
			var num = parseInt(p1);
			return (num >= args.length) ? p1 : args[num];
		});
	}
	
	/**
	 * Attach click listener to all "Add row" buttons
	 */
	$('button.fb-multiplier-add-row').each(function(idx, el) {
		var mname = $(el).data('multiply');
		var $multiplier = $('#Inputfield_' + mname);
		var $inner = $multiplier.find('div.Inputfields').first();
		
		/**
		 * Clone our original set of fields in the fieldset. On submission errors,
		 * we might have a few sets already, so only use those with the correct
		 * CSS class.
		 */
		var $tpl = $('<div/>');
		$inner.children('div.Inputfield:has(input.fb-multiplier-orig-field)').clone().each(function(ind, fld) {
			$(fld).find('input').removeClass('fb-multiplier-orig-field');
			$tpl.append(fld);
		});
		var rowTpl = $tpl.html();

		var $counter = $('#' + mname + '__multiplier_rows').first();
		
		/**
		 * Attach the handler
		 */
		$(el).click(function(evt) {
			evt.preventDefault();
			
			var curTpl = '' + rowTpl;
			
			var curCnt = parseInt($counter.val());

			var rowLimit = parseInt($(el).data('multiply-limit'));
			if(isNaN(rowLimit)) rowLimit = 0;
			
			if(rowLimit != 0 && curCnt >= rowLimit) {
				alert(formatString(FBMultiplier.config.messages.rowlimit, rowLimit));
				$(el).prop('disabled', true);
				return;
			}

			var flds = ['id', 'name', 'for'];
			
			// Increment row index number in id, name and for attributes
			$.each(flds, function(idxF, fld) {
				curTpl = curTpl.replace(new RegExp('(' + fld + '=")([^"]+)_(\\d+)"', 'mg'), function(m, m1, m2, m3) {
					return '' + m1 + m2 + '_' + (parseInt(m3) + curCnt) + '"';
				});
			});
			
			// Increment row index number in class, this one doesn't have trailing quotes
			curTpl = curTpl.replace(/(class="[^"]+_)(\d+)(\s|")/mg, function(m, m1, m2, m3) {
				return '' + m1 + (parseInt(m2) + curCnt) + m3;
			});
			
			// Increment row index number in the field label
			curTpl = curTpl.replace(new RegExp('(<label[^>]+>[^<]+ \\[#)(\\d+)(\\]<)', 'mg'), function(m, m1, m2, m3) {
				return '' + m1 + (parseInt(m2) + curCnt) + m3;
			});

			var $new = $(curTpl);
			
			$new.insertBefore($(el));
			
			$counter.val(1 + curCnt);

			if(rowLimit != 0 && curCnt == rowLimit - 1) {
				$(el).addClass('uk-button-danger');
			}

			$(window).trigger("resize");
		});
	});
	
});

