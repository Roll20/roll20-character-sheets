/* debug mode begin */
on(
	"change:stand",
	function() {
		safeGetAttrs(
			['stand', 'show-developer'],
			function(v) {
				var results = {};
				if (v['stand'] === 'Entwickler-Isu')
				{
					results['show-developer'] = "1";
				} else {
					results['show-developer'] = "0";
				}
				safeSetAttrs(results);
			}
		);
	}
);
/* debug mode end */
