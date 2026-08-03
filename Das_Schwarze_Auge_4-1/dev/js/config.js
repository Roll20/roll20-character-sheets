/* config start */
/*
	Action Listener for the Detect Gametype Button
*/
on(
	"clicked:detectgametype",
	async(info) =>
	{
		const caller = "Action Listener for detectGameType button";
		debugLog(caller, "Running function prone to crashes.");

		// Check Game Type
		const gameType = detectGameType();
		gameType.then(
			(value) => { console.log("value", value); safeSetAttrs(value); }
		);
});
/* config end */
