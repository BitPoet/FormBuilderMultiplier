
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
	 * Attach click listener Buttons
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
		$inner.children('div.fb-multiplier-orig-field.label, div.Inputfield:has(input.fb-multiplier-orig-field), div.Inputfield:has(select.fb-multiplier-orig-field), div.Inputfield:has(textarea.fb-multiplier-orig-field)').clone().each(function(ind, fld) {
			$(fld).find('input, select, textarea').removeClass('fb-multiplier-orig-field');
			$tpl.append(fld);
		});

		var rowTpl = $tpl.html();

		var $counter = $('#' + mname + '__multiplier_rows').first();
		
		/**
		 * Attach the handler
		 */
		$(el).click(function(evt) {
			evt.preventDefault();
			
			var curCnt = parseInt($counter.val());

			var curTpl = '' + '<div class="multiplier_clone InputfieldContent uk-form-controls" data-count-' + parseInt(curCnt + 1) +'>' + rowTpl + '</div>';

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

			// Empty created fields
			$($new).find('input, select, textarea').val('');
			
			// Clear possible errors on fields
			$($new).find('p.uk-text-danger').remove();
			
			$new.insertBefore($(el).closest('.Inputfield'));
			
			$counter.val(1 + curCnt);

			if(rowLimit != 0 && curCnt == rowLimit - 1) {
				$(el).addClass('uk-button-danger');
			}
			$(el).closest('.Inputfields').find('button.fb-multiplier-remove-row').prop('disabled',false);

			$(window).trigger("resize");
		});

		/**
		 * Attach click listener to all "Remove row" buttons
		 */
		$('button.fb-multiplier-remove-row').each(function(idx, el) {

			var curCnt = parseInt($counter.val());
			if(curCnt < 2) { $(el).prop('disabled', true);};

			$(el).click(function(evt) {
				evt.preventDefault();
				var curCnt = parseInt($counter.val());
				if(curCnt===1) {
					return false;
				}
				if(curCnt===2) {
					$(el).prop('disabled',true)
				};
				// Remove fields dynamicly created
				$('.multiplier_clone').last().remove();
				// Remove fiedls created via PHP
				$('.fb-multiplier-cloned-field-'+curCnt).remove();
				$counter.val(curCnt - 1);
				$(window).trigger("resize");
			});
		});
	});
});