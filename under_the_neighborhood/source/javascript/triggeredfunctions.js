/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
const navigateSheet = function({trigger,attributes}){
	k.debug('navigating sheet');
	let triggerName = trigger ?
		trigger.name :
		attributes.sheet_state;
	let target = triggerName.replace(/clicked:|nav-/g,'');
	k.debug({target});
	$20('.navigable-section,.sheet-nav__tab').removeClass('active');
	$20(`.sheet-nav__tab.${target},.navigable-section--${target}`).addClass('active');
	attributes.sheet_state = target;
};
k.registerFuncs({navigateSheet},{type:['opener']});

const characterDisplay = function({attributes}){
  $20('.character-type').addClass('character-type--inactive');
  k.debug({sheet_type:attributes.sheet_type})
  const target = `.character-type--${attributes.sheet_type}`;
  k.debug({target});
  $20(target).removeClass('character-type--inactive');
}
k.registerFuncs({characterDisplay},{type:['opener']})

const sectionDisplay = function({trigger,attributes}){
  const fieldSwitch = {
    is_weird:'weird',
    mon_trainer:'mon',
    use_initiative:'initiative',
    has_arc:'arc'
  };
  k.debug({trigger});
  let fields;
  if(trigger){
    let[,,attr] = k.parseTriggerName(trigger.name);
    fields = [attr];
  }else{
    fields = Object.keys(fieldSwitch);
  }
  fields.forEach((field)=>{
    const action = attributes[field] ?
      'remove' :
      'add';
    $20(`.${fieldSwitch[field]}`)[`${action}Class`]('inactive');
  });
}
k.registerFuncs({sectionDisplay},{type:['opener']});

const modifierDisplay = function({attributes}){
  if(attributes.use_roll_modifiers){
    $20('#modifiers').removeClass('inactive');
    $20('.roll-options').addClass('inactive');
    attributes.advantage = '2d6';
    attributes.double = 0;
  }else{
    $20('#modifiers').addClass('inactive');
    $20('.roll-options').removeClass('inactive');
  }
};
k.registerFuncs({modifierDisplay},{type:['opener']})