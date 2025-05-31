on('clicked:roll', (event) => {
  	startRoll(event.htmlAttributes.value + "{{fumble=[[1d10!]]}} {{fumble2=[[1d10!]]}}", (results) => {
  	    	var rollComputed = results.results.roll.result;
  	    	var roll2Computed = 0;

  	      if(results.results.roll.dice[0] == 1) // We check if the first die is a fumble.
  	      {
  	        	rollComputed = results.results.roll.result - 1 - results.results.fumble.result;
  	      }

			if(results.results.roll2 != null) {
				roll2Computed = results.results.roll2.result;
			 	if( results.results.roll2.dice[0] == 1) // We check if the first die is a fumble.
  	      	{
  	        		roll2Computed = results.results.roll2.result - 1 - results.results.fumble2.result;
  	      	}
			 }

  	      finishRoll(
  	          results.rollId,
  	          {
  	              roll: rollComputed,
  	              roll2: roll2Computed

  	          }
  	      );
  	  });
});

on('clicked:repeating_finearts:roll clicked:repeating_npcskill:roll', (event) => {

	// prefix gets an empty string for normal attributes, and repeating_section_ID_ for repeating attributes
	var trigger = event.triggerName.slice(8); // this always starts with 'clicked:'
	var prefix = trigger.split('_').slice(0,3).join('_') + '_';

	let rollPart = event.htmlAttributes.value.replaceAll('prefix-', `${prefix}`);
	console.log(rollPart);

  	startRoll(rollPart + "{{fumble=[[1d10!]]}}", (results) => {
        var rollComputed = results.results.roll.result;

        if(results.results.roll.dice[0] == 1) // We check if the first die is a fumble.
        {
            rollComputed = results.results.roll.result - 1 - results.results.fumble.result;
        }

        finishRoll(
        results.rollId,
        {
            roll: rollComputed,
        }
        );
  	  });
});