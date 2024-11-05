/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
k.version = 0.1;
k.sheetName = 'Under the Neighborhood';
const systemDefaults = {
  'repeating_basic-advancement':[
    {description:'Increase a stat by 1 (max:+3)'},
    {description:'Increase a stat by 1 (max:+3)'},
    {description:'Increase a stat by 1 (max:+3)'},
    {description:'Increase a stat by 1 (max:+3)'},
    {description:'Add Another Skill'},
    {description:'Add Another Signature Item'},
    {description:'Add a Move from your Playbook'},
    {description:'Add a Move from your Playbook'},
    {description:'Add a Move from your Playbook Or a different Playbook'},
    {description:'Add a Move from your Playbook Or a different Playbook'}
  ],
  'repeating_super-advancement':[
    {description:'Upgrade two Playbook Moves to advanced'},
    {description:'Upgrade two Playbook Moves to advanced'},
    {description:'Upgrade one Descriptor to advanced'},
    {description:'Upgrade two Skills into Super Skills'},
    {description:'Add Another Descriptor'},
    {description:'Increase the Maximum number of AP stored between adventures by 1'},
  ],
  'repeating_ultra-advancement':[
    {description:'Increase a stat by 1 (max:+4)'},
    {description:'Increase the Weird stat by 2 (max:+1)'},
    {description:'Upgrade all remaining Playbook Moves to Advanced'},
    {description:'Upgrade all remaining Descriptors to Advanced'},
    {description:'Add Another Skill'}
  ]
}