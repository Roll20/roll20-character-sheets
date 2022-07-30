/* ---- Attributes tables start ---- */
const strengthTable = {};
strengthTable['strengthhit'] = ['Error','-5','-3','-3','-2','-2','-1','-1','0','0','0','0','0','0','0','0','0','+1','+1','+3','+3','+4','+4','+5','+6','+7'];
strengthTable['strengthhit']['18[01-50]'] = '+1';
strengthTable['strengthhit']['18[51-75]'] = '+2';
strengthTable['strengthhit']['18[76-90]'] = '+2';
strengthTable['strengthhit']['18[91-99]'] = '+2';
strengthTable['strengthhit']['18[00]']    = '+3';

strengthTable['strengthdmg'] = ['Error','-4','-2','-1','-1','-1','0','0','0','0','0','0','0','0','0','0','+1','+1','+2','+7','+8','+9','+10','+11','+12','+14'];
strengthTable['strengthdmg']['18[01-50]'] = '+3';
strengthTable['strengthdmg']['18[51-75]'] = '+3';
strengthTable['strengthdmg']['18[76-90]'] = '+4';
strengthTable['strengthdmg']['18[91-99]'] = '+5';
strengthTable['strengthdmg']['18[00]']    = '+6';

strengthTable['carryweight'] = ['Error','1','1','5','10','10','20','20','35','35','40','40','45','45','55','55','70','85','110','485','535','635','785','935','1235','1535'];
strengthTable['carryweight']['18[01-50]'] = '135';
strengthTable['carryweight']['18[51-75]'] = '160';
strengthTable['carryweight']['18[76-90]'] = '185';
strengthTable['carryweight']['18[91-99]'] = '235';
strengthTable['carryweight']['18[00]']    = '335';

strengthTable['maxpress'] = ['Error','3','5','10','25','25','55','55','90','90','115','115','140','140','170','170','195','220','255','640','700','810','970','1130','1440','1750'];
strengthTable['maxpress']['18[01-50]'] = '280';
strengthTable['maxpress']['18[51-75]'] = '305';
strengthTable['maxpress']['18[76-90]'] = '330';
strengthTable['maxpress']['18[91-99]'] = '380';
strengthTable['maxpress']['18[00]']    = '480';

strengthTable['opendoor'] = ['Error','1','1','2','3','3','4','4','5','5','6','6','7','7','8','8','9','10','11','16(8)','17(10)','17(12)','18(14)','18(16)','19(17)','19(18)'];
strengthTable['opendoor']['18[01-50]'] = '12';
strengthTable['opendoor']['18[51-75]'] = '13';
strengthTable['opendoor']['18[76-90]'] = '14';
strengthTable['opendoor']['18[91-99]'] = '15(3)';
strengthTable['opendoor']['18[00]']    = '16(6)';

strengthTable['bendbar'] = ['Error','0','0','0','0','0','0','0','1','1','2','2','4','4','7','7','10','13','16','50','60','70','80','90','95','99'];
strengthTable['bendbar']['18[01-50]'] = '20';
strengthTable['bendbar']['18[51-75]'] = '25';
strengthTable['bendbar']['18[76-90]'] = '30';
strengthTable['bendbar']['18[91-99]'] = '35';
strengthTable['bendbar']['18[00]']    = '40';

strengthTable['strnotes'] = ['INVALID STRENGTH','','','','','','','','','','','','','','','','','','','Hill Giant','Stone Giant','Frost Giant','Fire Giant','Cloud Giant','Storm Giant','Titan Giant'];
strengthTable['strnotes']['18[01-50]'] = '';
strengthTable['strnotes']['18[51-75]'] = '';
strengthTable['strnotes']['18[76-90]'] = '';
strengthTable['strnotes']['18[91-99]'] = '';
strengthTable['strnotes']['18[00]']    = '';

strengthTable['str2notes'] = ['INVALID STRENGTH','','','','','','','','','','','','','','','','','','','(8) Locked, barred, or magically held door. Only one attempt','(10) Locked, barred, or magically held door. Only one attempt','(12) Locked, barred, or magically held door. Only one attempt','(14) Locked, barred, or magically held door. Only one attempt','(16) Locked, barred, or magically held door. Only one attempt','(17) Locked, barred, or magically held door. Only one attempt','(18) Locked, barred, or magically held door. Only one attempt'];
strengthTable['str2notes']['18[01-50]'] = '';
strengthTable['str2notes']['18[51-75]'] = '';
strengthTable['str2notes']['18[76-90]'] = '';
strengthTable['str2notes']['18[91-99]'] = '(3) Locked, barred, or magically held door. Only one attempt';
strengthTable['str2notes']['18[00]']    = '(6) Locked, barred, or magically held door. Only one attempt';

const dexterityTable = {};
dexterityTable['dexreact'] = ['Error','-6','-4','-3','-2','-1','0','0','0','0','0','0','0','0','0','0','+1','+2','+2','+3','+3','+4','+4','+4','+5','+5'];
dexterityTable['dexmissile'] = ['Error','-6','-4','-3','-2','-1','0','0','0','0','0','0','0','0','0','0','+1','+2','+2','+3','+3','+4','+4','+4','+5','+5'];
dexterityTable['dexdefense'] = ['Error','+5','+5','+4','+3','+2','+1','0','0','0','0','0','0','0','0','-1','-2','-3','-4','-4','-4','-5','-5','-5','-6','-6'];

dexterityTable['dex-pickpocket'] = ['0','0','0','0','0','0','0','0','0','-15','-10','-5','0','0','0','0','0','+5','+10','+15','+20','+25','+30','+30','+30','+30'];
dexterityTable['dex-openlocks'] = ['0','0','0','0','0','0','0','0','0','-10','-5','0','0','0','0','0','+5','+10','+15','+20','+25','+30','+35','+35','+35','+35'];
dexterityTable['dex-findtraps'] = ['0','0','0','0','0','0','0','0','0','-10','-10','-5','0','0','0','0','0','0','+5','+10','+15','+20','+25','+25','+25','+25'];
dexterityTable['dex-movesilently'] = ['0','0','0','0','0','0','0','0','0','-20','-15','-10','-5','0','0','0','0','+5','+10','+15','+20','+25','+30','+30','+30','+30'];
dexterityTable['dex-hideinshadows'] = ['0','0','0','0','0','0','0','0','0','-10','-5','0','0','0','0','0','0','+5','+10','+15','+20','+25','+30','+30','+30','+30'];
dexterityTable['dex-climbwalls'] = ['0','0','0','0','0','0','0','0','0','-10','-10','-5','0','0','0','0','0','0','+5','+10','+15','+20','+25','+25','+25','+25'];
dexterityTable['dex-tunneling'] = ['0','0','0','0','0','0','0','0','0','-10','-5','-0','0','0','0','0','0','0','+5','+10','+15','+20','+30','+30','+30','+30'];
dexterityTable['dex-escapebonds'] = ['0','0','0','0','0','0','0','0','0','-15','-10','-5','0','0','0','0','0','+5','+10','+15','+20','+25','+30','+30','+30','+30'];

dexterityTable['aim-pickpocket'] = ['0','0','0','-30','-25','-25','-20','-20','-15','-15','-10','-5','0','0','0','0','0','+5','+10','+15','+20','+20','+25','+25','+30','+30'];
dexterityTable['aim-openlocks'] = ['0','0','0','-30','-25','-20','-20','-15','-15','-10','-5','0','0','0','0','0','+5','+10','+15','+20','+20','+25','+25','+30','+30','+35'];

dexterityTable['balance-movesilently'] = ['0','0','0','-30','-30','-30','-25','-25','-20','-20','-15','-10','-5','0','0','0','0','+5','+10','+15','+15','+20','+20','+25','+25','+30'];
dexterityTable['balance-climbwalls'] = ['0','0','0','-30','-25','-20','-20','-15','-15','-10','-5','0','0','0','0','0','0','+5','+10','+15','+20','+20','+25','+25','+30','+30'];

dexterityTable['dexnotes'] = ['INVALID DEXTERITY','','','','','','','','','','','','','','','','','','','','','','','','','',''];

const constitutionTable = {};
constitutionTable['conadj'] = ['Error','-3','-2','-2','-1','-1','-1','0','0','0','0','0','0','0','0','+1','+2','+2(+3)','+2(+4)','+2(+5)','+2(+5)','+2(+6)','+2(+6)','+2(+6)','+2(+7)','+2(+7)'];
constitutionTable['conshock'] = ['Error','25','30','35','40','45','50','55','60','65','70','75','80','85','88','90','95','97','99','99','99','99','99','99','99','100'];
constitutionTable['conres'] = ['Error','30','35','40','45','50','55','60','65','70','75','80','85','90','92','94','96','98','100','100','100','100','100','100','100','100'];
constitutionTable['conpoisonsave'] = ['Error','-2','-1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','+1','+1','+2','+2','+3','+3','+4'];
constitutionTable['conregen'] = ['Error','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1/6','1/5','1/4','1/3','1/2','1/1'];
constitutionTable['connotes'] = ['INVALID CONSTITUTION','','','','','','','','','','','','','','','','','','','','1 hp/6 turns - not acid/fire','1 hp/5 turns - not acid/fire','1 hp/4 turns - not acid/fire','1 hp/3 turns - not acid/fire','1 hp/2 turns - not acid/fire','1 hp/turn - not acid/fire'];
constitutionTable['con2notes'] = ['INVALID CONSTITUTION','','','','','','','','','','','','','','','','','(+3) Warriors only','(+4) Warriors only','(+5) Warriors only','(+5) Warriors only','(+6) Warriors only','(+6) Warriors only','(+6) Warriors only','(+7) Warriors only','(+7) Warriors only'];

const intelligenceTable = {};
intelligenceTable['intlang'] = ['Error','0','1','1','1','1','1','1','1','2','2','2','3','3','4','4','5','6','7','8','9','10','11','12','15','20'];
intelligenceTable['intlvl'] = ['Error','—','—','—','—','—','—','—','—','4th','5th','5th','6th','6th','7th','7th','8th','8th','9th','9th','9th','9th','9th','9th','9th','9th'];
intelligenceTable['intchance'] = ['Error','0','0','0','0','0','0','0','0','35','40','45','50','55','60','65','70','75','85','95','96','97','98','99','100','100'];
intelligenceTable['intmax'] = ['Error','—','—','—','—','—','—','—','—','6','7','7','7','9','9','11','11','14','18','All','All','All','All','All','All','All'];
intelligenceTable['intimm1st'] = ['Error','','','','','','','','','','','','','','','','','','','1st-level','1st-level','1st-level','1st-level','1st-level','1st-level','1st-level'];
intelligenceTable['intimm2nd'] = ['Error','','','','','','','','','','','','','','','','','','','','2nd-level','2nd-level','2nd-level','2nd-level','2nd-level','2nd-level'];
intelligenceTable['intimm3rd'] = ['Error','','','','','','','','','','','','','','','','','','','','','3rd-level','3rd-level','3rd-level','3rd-level','3rd-level'];
intelligenceTable['intimm4th'] = ['Error','','','','','','','','','','','','','','','','','','','','','','4th-level','4th-level','4th-level','4th-level'];
intelligenceTable['intimm5th'] = ['Error','','','','','','','','','','','','','','','','','','','','','','','5th-level','5th-level','5th-level'];
intelligenceTable['intimm6th'] = ['Error','','','','','','','','','','','','','','','','','','','','','','','','6th-level','6th-level'];
intelligenceTable['intimm7th'] = ['Error','','','','','','','','','','','','','','','','','','','','','','','','','7th-level'];
intelligenceTable['intnotes'] = ['INVALID INTELLIGENCE','Communicate by Grunts & Gestures','','','','','','','','','','','','','','','','','','','','','','','','',''];

const wisdomTable = {};
wisdomTable['wisdef'] = ['Error','-6','-4','-3','-2','-1','-1','-1','0','0','0','0','0','0','0','+1','+2','+3','+4','+4','+4','+4','+4','+4','+4','+4'];
wisdomTable['wisbonus'] = ['Error','—','—','—','—','—','—','—','—','0','0','0','0','1st','1st','2nd','2nd','3rd','4th','1st,3rd','2nd,4th','3rd,5th','4th,5th','1st,6th','5th,6th','6th,7th'];
wisdomTable['wisbonus-prime'] = ['Error','','','','','','','','','','','','','1st','2x1st','2x1st, 2nd','2x1st, 2x2nd','2x1st, 2x2nd, 3rd','2x1st, 2x2nd, 3rd, 4th','3x1st, 2x2nd, 2x3rd, 4th','3x1st, 3x2nd, 2x3rd, 2x4th','3x1st, 3x2nd, 3x3rd, 2x4th','3x1st, 3x2nd, 3x3rd, 3x4th','4x1st, 3x2nd, 3x3rd, 3x4th','4x1st, 3x2nd, 3x3rd, 3x4th','4x1st, 3x2nd, 3x3rd, 3x4th'];
wisdomTable['wisbonus-extra'] = ['Error','','','','','','','','','','','','','','','','','','','','','5th','2x5th','2x5th, 6th','3x5th, 2x6th','3x5th, 3x6th, 7th'];
wisdomTable['wisfail'] = ['Error','80','60','50','45','40','35','30','25','20','15','10','5','0','0','0','0','0','0','0','0','0','0','0','0','0'];
wisdomTable['wisimmune'] = ['Error','','','','','','','','','','','','','','','','','','','cause fear, charm person, command, friends, hypnotism','forget, hold person, ray of enfeeblement, scare','fear','charm monster, confusion, emotion, fumble, suggestion','chaos, feeblemind, hold monster, magic jar, quest','geas, mass suggestion, rod of rulership','antipathy/sympathy, death spell, mass charm'];
wisdomTable['wisnotes'] = ['INVALID WISDOM','','','','','','','','','','','','','','','','','','','','','','','','','',''];

const charismaTable = {};
charismaTable['chamax'] = ['Error','0','1','1','1','2','2','3','3','4','4','4','5','5','6','7','8','10','15','20','25','30','35','40','45','50'];
charismaTable['chaloy'] = ['Error','-8','-7','-6','-5','-4','-3','-2','-1','0','0','0','0','0','+1','+3','+4','+6','+8','+10','+12','+14','+16','+18','+20','+20'];
charismaTable['chareact'] = ['Error','-7','-6','-5','-4','-3','-2','-1','0','0','0','0','0','+1','+2','+3','+5','+6','+7','+8','+9','+10','+11','+12','+13','+14'];
charismaTable['chanotes'] = ['INVALID CHARISMA','','','','','','','','','','','','','','','','','','','','','','','','','',''];

const ABILITY_MODIFIERS = [0,0,0,-5,-4,-3,-2,-1,0,0,0,0,0,0,1,2,3,4,5,5,5,5,5,5,5,5];
/* ---- Attributes tables end ---- */