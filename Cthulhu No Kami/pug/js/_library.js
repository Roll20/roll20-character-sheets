const etats = ['affaibli', 'aveugle', 'etourdi', 'immobilise', 'paralyse', 'ralenti', 'renverse', 'surpris'];

//DICE TYPES
//0 = D20
//-1 = D12
const diceType = {
    '0':'D20',
    '-1':'D12'
};

const dataEtats = {
    'affaibli':{
        'dice':-1,
        'initiative':0,
        'defense':0,
        'contact':0,
        'distance':0,
        'magique':0,
    },
    'aveugle':{
        'dice':0,
        'initiative':-5,
        'defense':-5,
        'contact':-5,
        'distance':-10,
        'magique':0,
    },
    'etourdi':{
        'dice':0,
        'initiative':0,
        'defense':-5,
        'contact':0,
        'distance':0,
        'magique':0,
    },
    'immobilise':{
        'dice':-1,
        'initiative':0,
        'defense':0,
        'contact':0,
        'distance':0,
        'magique':0,
    },
    'paralyse':{
        'dice':0,
        'initiative':0,
        'defense':0,
        'contact':0,
        'distance':0,
        'magique':0,
    },
    'ralenti':{
        'dice':0,
        'initiative':0,
        'defense':0,
        'contact':0,
        'distance':0,
        'magique':0,
    },
    'renverse':{
        'dice':0,
        'initiative':0,
        'defense':-5,
        'contact':-5,
        'distance':-5,
        'magique':-5,
    },
    'surpris':{
        'dice':0,
        'initiative':0,
        'defense':-5,
        'contact':0,
        'distance':0,
        'magique':0,
    }
};


function setActiveCharacterId(charId){
    var oldAcid=getActiveCharacterId();
    var ev = new CustomEvent("message");
    ev.data={"id":"0", "type":"setActiveCharacter", "data":charId};
    self.dispatchEvent(ev);
    return oldAcid;
}

var _sIn=setInterval;
setInterval=function(callback, timeout){
    var acid=getActiveCharacterId();
    _sIn(
        function(){
            var prevAcid=setActiveCharacterId(acid);
            callback();
            setActiveCharacterId(prevAcid);
        }
    ,timeout);
}

var _sto=setTimeout
setTimeout=function(callback, timeout){
    var acid=getActiveCharacterId();
    _sto(
        function(){
            var prevAcid=setActiveCharacterId(acid);
            callback();
            setActiveCharacterId(prevAcid);
        }
    ,timeout);
}

function getAttrsAsync(props){
    var acid=getActiveCharacterId(); //save the current activeCharacterID in case it has changed when the promise runs
    var prevAcid=null;               //local variable defined here, because it needs to be shared across the promise callbacks defined below
    return new Promise((resolve,reject)=>{
            prevAcid=setActiveCharacterId(acid);  //in case the activeCharacterId has changed, restore it to what we were expecting and save the current value to restore later
            try{
                getAttrs(props,(values)=>{  resolve(values); });
            }
            catch{ reject(); }
    }).finally(()=>{
        setActiveCharacterId(prevAcid); //restore activeCharcterId to what it was when the promise first ran
    });
}

//use the same pattern for each of the following...
function setAttrsAsync(propObj, options){
    var acid=getActiveCharacterId();
    var prevAcid=null;
    return new Promise((resolve,reject)=>{
            prevAcid=setActiveCharacterId(acid);
            try{
                setAttrs(propObj,options,(values)=>{ resolve(values); });
            }
            catch{ reject(); }
    }).finally(()=>{
        setActiveCharacterId(prevAcid);
    });
}

function getDice(dice) {
    let result;
    switch(dice) {
        case -1:
            result = 'D12';
            break;

        default:
            result = 'D20';
            break;
    }

    return result;
}

function getFinalMod(data, clicked, isActive) {
    let dice = 0;
    let initiative = 0;
    let defense = 0;
    let contact = 0;
    let distance = 0;
    let magique = 0;

    for (let etat of etats) {
        let active = parseInt(data[etat]);
        let d = dataEtats[etat];

        if((active === 1 && etat !== clicked) || (etat === clicked && isActive === 1)) {
            let nDice = d.dice;
            let nInit = d.initiative;
            let nDef = d.defense;
            let nCon = d.contact;
            let nDis = d.distance;
            let nMag = d.magique;

            dice = nDice < dice ? nDice : dice;
            initiative += nInit;
            defense += nDef;
            contact += nCon;
            distance += nDis;
            magique += nMag;
        }
    }

    return {
        dice:dice,
        init:initiative,
        def:defense,
        con:contact,
        dis:distance,
        mag:magique,
    }
}

function getDistanceMod(luminosite, portee) {
    let result = {
        'luminosite':{
            'text':'',
            'mod':0
        },
        'portee':{
            'text':'',
            'mod':0
        }
    };

    switch(luminosite) {
        case 'std':
            result.luminosite = {
                'text':'',
                'mod':0
            }
            break;
        case 'pnbr':
            result.luminosite = {
                'text':'{{luminosite=^{penombre} (-5)}}',
                'mod':-5
            }
            break;
        case 'noir':
            result.luminosite = {
                'text':'{{luminosite=^{noir} (-10)}}',
                'mod':-10
            }
            break;
    }

    switch(portee) {
        case 'std':
            result.portee = {
                'text':'',
                'mod':0
            }
            break;
        case 'dbl':
            result.portee = {
                'text':'{{portee=^{portee-double} (-5)}}',
                'mod':-5
            }
            break;
        case 'trp':
            result.portee = {
                'text':'{{portee=^{portee-triple} (-10)}}',
                'mod':-10
            }
            break;
    }

    return result;
}