/*jshint esversion: 11, laxcomma:true, eqeqeq:true*/
/*jshint -W014,-W084,-W030,-W033*/
/*
Cascade Expansion functions
*/
//Expands the repeating section templates in cascades to reflect the rows actually available
const expandCascade = function(cascade,sections,attributes){
  return _.keys(cascade).reduce((memo,key)=>{//iterate through cascades and replace references to repeating attributes with correct row ids.
    if(/^(?:act|attr)_repeating_/.test(key)){//If the attribute is a repeating attribute, do special logic
      expandRepeating(memo,key,cascade,sections,attributes);
    }else if(key){//for non repeating attributes do this logic
      expandNormal(memo,key,cascade,sections);
    }
    return memo;
  },{});
};

const expandRepeating = function(memo,key,cascade,sections,attributes){
  key.replace(/((?:attr|act)_)(repeating_[^_]+)_[^_]+?_(.+)/,(match,type,section,field)=>{
    (sections[section]||[]).forEach((id)=>{
      memo[`${type}${section}_${id}_${field}`]=_.clone(cascade[key]);//clone the details so that each row's attributes have correct ids
      memo[`${type}${section}_${id}_${field}`].name = `${section}_${id}_${field}`;
      if(key.startsWith('attr_')){
        memo[`${type}${section}_${id}_${field}`].affects = memo[`${type}${section}_${id}_${field}`].affects.reduce((m,affected)=>{
          if(section === affected){//otherwise if the affected attribute is in the same section, simply set the affected attribute to have the same row id.
            m.push(applyID(affected,id));
          }else if(/repeating/.test(affected)){//If the affected attribute isn't in the same repeating section but is still a repeating attribute, add all the rows of that section
            addAllRows(affected,m,sections);
          }else{//otherwise the affected attribute is a non repeating attribute. Simply add it to the computed affected array
            m.push(affected);
          }
          return m;
        },[]);
      }
    });
  });
};

const applyID = function(affected,id){
  return affected.replace(/(repeating_[^_]+_)[^_]+(.+)/,`$1${id}$2`);
};

const expandNormal = function(memo,key,cascade,sections){
  memo[key] = _.clone(cascade[key]);
  if(key.startsWith('attr_')){
    memo[key].affects = memo[key].affects || [];
    memo[key].affects = memo[key].affects.reduce((m,a)=>{
      if(/^repeating/.test(a)){
        addAllRows(a,m,sections);
      }else{
        m.push(a);
      }
      return m;
    },[]);
  }
};

const addAllRows = function(affected,memo,sections){
  affected.replace(/(repeating_[^_]+?)_[^_]+?_(.+)/,(match,section,field)=>{
    sections[section].forEach(id=>memo.push(`${section}_${id}_${field}`));
  });
};