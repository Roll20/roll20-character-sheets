<!-- sheetworker scripts start -->
<script type="text/worker">
on("sheet:opened", function() {
		migrationCheck();
		safeSetAttrs({ "safe-sheet-open": Date.now() });
});

