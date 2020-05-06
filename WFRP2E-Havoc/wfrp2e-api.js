//Properties

var skillBackgroundImage = "http://i.imgur.com/Vqi7PFt.png";
var parryBackgroundImage = "http://i.imgur.com/Vqi7PFt.png";
var magicBackgroundImage = "http://i.imgur.com/Vqi7PFt.png";
var combatBackgroundImage = "http://i.imgur.com/Vqi7PFt.png";
var parryBackgroundImage = "http://i.imgur.com/Vqi7PFt.png";
var initBackgroundImage = "http://i.imgur.com/Vqi7PFt.png";

var skillLineImage = "http://i.imgur.com/M0MBhn2.png";
var parryLineImage = "http://i.imgur.com/M0MBhn2.png";
var magicLineImage = "http://i.imgur.com/M0MBhn2.png";
var combatLineImage = "http://i.imgur.com/M0MBhn2.png";
var parryLineImage = "http://i.imgur.com/M0MBhn2.png";
var initLineImage = "http://i.imgur.com/M0MBhn2.png";

var critSucCombat = 1; //set to 0 to turn off crit success
var critFailCombat = 96; //set to 101 to turn off crit failure

var attackSymbol = "http://i.imgur.com/ncLRrhy.png";
var shootSymbol = "http://i.imgur.com/fhnbmUs.png";
var ulricSymbol = "http://i.imgur.com/Sbr3wLn.png";

var critSucParry = 1; //set to 0 to turn off crit success
var critFailParry = 96; //set to 101 to turn off crit failure
var parrySymbol = "http://i.imgur.com/cdUERe3.png";

var critSucSkill = 1; //set to 0 to turn off crit success
var critFailSkill = 96; //set to 101 to turn off crit failure
var skillSymbol = "http://i.imgur.com/yDOLx2R.png";

var magicSymbol = "http://i.imgur.com/pusXx1U.png";

var initSymbol = "http://i.imgur.com/wQRmIcp.png";

var fortunePointBackground = "http://i.imgur.com/B8isZnB.png";

/// Templates

var warhammerCombatTableTemplate = "<table style='max-width: 250px; background-image:url("+combatBackgroundImage+"); background-size: 100% 100%; background-repeat: no-repeat;font-family: \"Century Gothic\", CenturyGothic, AppleGothic, sans-serif;'>"
            +'<tr><th COLSPAN="2" style="padding-top:15px;">Attack Test<<FORTUNE>></th></tr>'
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+combatLineImage+'" />'
            +'</td>'
            +'</tr>' 
            
            + '<tr>'
            +'<td style="text-align:center; width:25%;padding-left:10px;"><img class="sheet-imghr" style="width:100%;" src="<<ATTACK_SYMBOL>>" /></td>'
            +'<td style="text-align:center; width:75%;padding-right:10px;"><b><<ATTACK_NAME>></b></td>'
            +'</tr>'
            
            
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+combatLineImage+'" />'
            +'</td>'
            +'</tr>'
            +'<tr>' 
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Stat :</b></span> <b><<STAT_NUMBER>> %</b></td>'
            +'</tr>'

            +'<tr>'
            +'<td  COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Attack :</b></span> <span style="color: <<COLOR>>"><b><<ROLL_NUMBER>></b></span></td>'
            +'</tr>'
           
            +'<tr>'
                +'<<ROLL_RESULT>>'
            +'</tr>'
            +'<tr>'
            	+'<<ROLL_DEGREE>>'
			+'</tr>'
        		+'<<IF_HIT>>'
        		+'<<QUALITIES>>'
            +'<tr><td COLSPAN="2" style="padding-top:15px;"></td></tr>'
            
        +'</table>';
var warhammerCombatSuccessTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: green;'><b>Success!</b></td>";
var warhammerCombatCriticalSuccessTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: green;'><b>Critical Success!</b></td>";
var warhammerCombatFailureTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: red;'><b>Failure!</b></td>";
var warhammerCombatCriticalFailureTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: red;'><b>Critical Failure!</b></td>";
var warhammerCombatDoSTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;'><b>Degree of Success:</b> <<DEGREE>></td>";
var warhammerCombatDoFTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;'><b>Degree of Failure:</b> <<DEGREE>></td>";
var warhammerCombatHitTemplate = '<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+combatLineImage+'" />'
            +'</td>'
            +'</tr>'  
                                + '<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Hit Location :</b></span> <b><<HIT_LOCATION>></b> (<<HIT_REVERSE>>)</td>'
			                    +'<tr>'
                                + '<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Damage Modifier :</b></span> <b><<DAMAGE_MOD>></b></td>'
    		                    +'<tr>'
                                + '<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Damage :</b></span> <span style="color: <<DAMAGE_COLOR1>>;"><b><<DAMAGE1_TOTAL>></b> (<<ROLL_DAMAGE1>>)</span></td>'
    		                    +'<tr>'
                                +'<<IMPACT>>'
                                +'<<ULRIC_FURY>>';
var warhammerCombatImpactTemplate = '<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Damage Impact :</b></span> <span style="color: <<DAMAGE_COLOR2>>;"><b><<DAMAGE2_TOTAL>></b> (<<ROLL_DAMAGE2>>)</span></td>'
        	                    +'<tr>';
var warhammerCombatUlricFuryTemplate = '<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+combatLineImage+'" />'
            +'</td>'
            +'</tr>'  
			
            + '<tr>'
    		+'<td style="text-align:center; width:25%;padding-left:10px;"><img class="sheet-imghr" style="width:100%;" src="'+ ulricSymbol +'" /></td>'
			+"<td style='text-align:center;'><span style='font-style:oblique;font-weight:bolder;color: red;'><b>ULRIC'S FURY!</b></td>"
            +'</tr>'
                                + '<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Crit Confirm :</b></span><span style="color: <<CONFIRM_COLOR>>"> <b><<CRIT_CONFIRM>></b></span></td>'
    		                    +'<tr>'
								+'<<CRIT_ROLL_CONFIRMED>>';
var warhammerCombatCriticalDamage =  '<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Crit Damage :</b></span> <b><<CRIT_DAMAGE>></b> <<CRIT_ROLLEDDMG>></td>'
    		                    +'<tr>'
                                + '<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Total Damage :</b></span> <b><<TOTAL_DAMAGE>></b></td>'
    		                    +'<tr>';
var warhammerCombatQualitiesTemplate = '<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+combatLineImage+'" />'
            +'</td>'
            +'</tr>'  
                                + '<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Qualities :</b></span> <b><<QUALITIES>></b></td>'
    		                    +'<tr>';
var warhammerCombatRetryTemplate = "<tr><td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;'><a href='<<RETRY>>' style='background-image:url("+fortunePointBackground+"); border:0px; background-repeat:no-repeat; background-size:100% 100%; background-color:transparent; background-position:center; color:black; padding:10px 20px 10px 30px'>Use Fortune Point!</a></td></tr>";

var warhammerCombatUlricRetryTableTemplate = "<table style='max-width: 250px; background-image:url("+combatBackgroundImage+"); background-size: 100% 100%; background-repeat: no-repeat;font-family: \"Century Gothic\", CenturyGothic, AppleGothic, sans-serif;'>"
            
			
			+"<tr><th COLSPAN='2' style='padding-top:15px;'>Ulric's Fury Fortune Point</th></tr>"
			
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+combatLineImage+'" />'
            +'</td>'
            +'</tr>' 
			
            + '<tr>'
    		+'<td style="text-align:center; width:25%;padding-left:10px;"><img class="sheet-imghr" style="width:100%;" src="<<ATTACK_SYMBOL>>" /></td>'
			+'<td style="text-align:center; width:75%;padding-right:10px;"><b><<ATTACK_NAME>></b></td>'
            +'</tr>'
			
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+combatLineImage+'" />'
            +'</td>'
            +'</tr>' 
			
            +'<tr>' 
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Stat :</b></span> <b><<STAT_NUMBER>> %</b></td>'
            +'</tr>'

            +'<tr>'
            +'<td  COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Crit Confirm :</b></span> <span style="color: <<CONFIRM_COLOR>>"><b><<CRIT_CONFIRM>></b></span></td>'
            +'</tr>'
        		+'<<IF_HIT>>'
            +'<tr><td COLSPAN="2" style="padding-top:15px;"></td></tr>'
            
        +'</table>';


var warhammerParryTableTemplate = "<table style='max-width: 250px; background-image:url("+parryBackgroundImage+"); background-size: 100% 100%; background-repeat: no-repeat;font-family: \"Century Gothic\", CenturyGothic, AppleGothic, sans-serif;'>"
            
			+"<tr><th COLSPAN='2' style='padding-top:15px;'>Parry Test<<FORTUNE>></th></tr>"
			
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+parryLineImage+'" />'
            +'</td>'
            +'</tr>' 
			
            + '<tr>'
    		+'<td style="text-align:center; width:25%;padding-left:10px;"><img class="sheet-imghr" style="width:100%;" src="'+ parrySymbol +'" /></td>'
			+'<td style="text-align:center; width:75%;padding-right:10px;"><b><<ATTACK_NAME>></b></td>'
            +'</tr>'
			
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+parryLineImage+'" />'
            +'</td>'
            +'</tr>'  
            + '<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Stat :</b></span> <b><<STAT_NUMBER>> %</b></td>'
            +'</tr>'

            +'<tr>'
            +'<td  COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Roll :</b></span> <span style="color: <<COLOR>>"><b><<ROLL_NUMBER>></b></span></td>'
            +'</tr>'
           
            +'<tr>'
                +'<<ROLL_RESULT>>'
    		+'<tr>'
            +'<tr>'
				+'<<ROLL_DEGREE>>'
			+'<tr>'
				+'<<ROLL_RETRY>>'
            +'<tr><td COLSPAN="2" style="padding-top:15px;"></td></tr>'
            
        +'</table>';
var warhammerParrySuccessTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: green;'><b>Success!</b></td>";
var warhammerParryCriticalSuccessTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: green;'><b>Critical Success!</b></td>";
var warhammerParryFailureTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: red;'><b>Failure!</b></td>";
var warhammerParryCriticalFailureTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: red;'><b>Critical Failure!</b></td>";
var warhammerParryDoSTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;'><b>Degree of Success:</b> <<DEGREE>></td>";
var warhammerParryDoFTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;'><b>Degree of Failure:</b> <<DEGREE>></td>";
var warhammerParryRetryTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;'><a href='<<RETRY>>' style='background-image:url("+fortunePointBackground+"); border:0px; background-repeat:no-repeat; background-size:100% 100%; background-color:transparent; background-position:center; color:black; padding:10px 20px 10px 30px'>Use Fortune Point!</a></td>";

var warhammerSkillTableTemplate = "<table style='max-width: 250px; background-image:url("+skillBackgroundImage+"); background-size: 100% 100%; background-repeat: no-repeat;font-family: \"Century Gothic\", CenturyGothic, AppleGothic, sans-serif;'>"
            +'<tr><th COLSPAN="2" style="padding-top:15px;">Simple Test<<FORTUNE>></th></tr>'
           +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+skillLineImage+'" />'
            +'</td>'
            +'</tr>' 
            
            + '<tr>'
            +'<td style="text-align:center; width:25%;padding-left:10px;"><img class="sheet-imghr" style="width:100%;" src="' + skillSymbol + '" /></td>'
            +'<td style="text-align:center; width:75%;padding-right:10px;"><b><<SKILL_NAME>></b></td>'
            +'</tr>'
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+skillLineImage+'" />'
            +'</td>'
            +'</tr>'  
            + '<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Stat :</b></span> <b><<STAT_NUMBER>> %</b></td>'
            +'</tr>'

            +'<tr>'
            +'<td  COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Roll :</b></span> <span style="color: <<COLOR>>"><b><<ROLL_NUMBER>></b></span></td>'
            +'</tr>'
           
            +'<tr>'
                +'<<ROLL_RESULT>>'
			+'<tr>'
            +'<tr>'
				+'<<ROLL_DEGREE>>'
			+'<tr>'
				+'<<ROLL_RETRY>>'
            +'<tr><td COLSPAN="2" style="padding-top:15px;"></td></tr>'
            
        +'</table>';
var warhammerSkillSuccessTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: green;'><b>Success!</b></td>";
var warhammerSkillCriticalSuccessTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: green;'><b>Critical Success!</b></td>";
var warhammerSkillFailureTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: red;'><b>Failure!</b></td>";
var warhammerSkillCriticalFailureTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: red;'><b>Critical Failure!</b></td>";
var warhammerSkillDoSTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;'><b>Degree of Success:</b> <<DEGREE>></td>";
var warhammerSkillDoFTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;'><b>Degree of Failure:</b> <<DEGREE>></td>";
var warhammerSkillRetryTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;'><a href='<<RETRY>>' style='background-image:url("+fortunePointBackground+"); border:0px; background-repeat:no-repeat; background-size:100% 100%; background-color:transparent; background-position:center; color:black; padding:10px 20px 10px 30px'>Use Fortune Point!</a></td>";

var warhammerMagicTableTemplate = "<table style='max-width: 250px; background-image:url("+magicBackgroundImage+"); background-size: 100% 100%; background-repeat: no-repeat;font-family: \"Century Gothic\", CenturyGothic, AppleGothic, sans-serif;'>"
            +'<tr><th COLSPAN="2" style="padding-top:25px;padding-left:10px;padding-right:10px;"><b>Casting Roll</b></th></tr>'
             
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+magicLineImage+'" />'
            +'</td>'
            +'</tr>'
           
            + '<tr>'
			+'<td style="text-align:center; width:40%;padding-left:10px;"><img class="sheet-imghr" style="width:100%;" src="<<SPELL_IMAGE>>" /></td>'
			+'<td style="text-align:center; width:60%;padding-right:10px;"><b><<SPELL_NAME>></b></td>'
            +'</tr>'

            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+magicLineImage+'" />'
            +'</td>'
            +'</tr>'  
           
            +'<<INCLUDE_TEXT>>'
			
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Casting Number :</b></span> <b><<CAST_NUMBER>></b></td>'
            +'</tr>' 
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Magic Characteristic :</b></span> <b><<MAGIC_MAX>></b></td>'
            +'</tr>'
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Magic Used :</b></span> <b><<MAGIC_USED>></b></td>'
            +'</tr>'
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Channel Used :</b></span> <b><<CHANNEL>></b></td>'
            +'</tr>'
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Additional Dice :</b></span> <b><<GOOD_DICE>></b></td>'
            +'</tr>'
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Modifier to Total :</b></span> <b><<MODIFIER_TOTAL>></b></td>'
            +'</tr>'
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Modifier to Dice :</b></span> <b><<MODIFIER_DICE>></b></td>'
            +'</tr>'
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Penalty for Armor :</b></span> <b><<MODIFIER_ARMOR>></b></td>'
            +'</tr>'
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Chaos Dice :</b></span> <b><<CHAOS_DICE>></b></td>'
            +'</tr>'
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Using Dhar :</b></span> <b><<DHAR>></b></td>'
            +'</tr>'
			 
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+magicLineImage+'" />'
            +'</td>'
            +'</tr>'
            +'<tr>'
            +"<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: #B31515;padding-left:10px;padding-right:10px;'><b>Roll</b></td>"
            +'</tr>'
			
            +'<tr>'
            +"<td COLSPAN='2' style='text-align:center;padding-left:10px;padding-right:10px;'><<DICE_ROLL>></td>"
            +'</tr>'
			
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+magicLineImage+'" />'
            +'</td>'
            +'</tr>'  
			
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Casting Number :</b></span> <b><<CAST_NUMBER>></b></td>'
            +'</tr>' 
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Total :</b></span> <b><<TOTAL>></b></td>'
            +'</tr>' 			
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>With Component (+<<COMP>>) :</b></span> <b><<TOTALCOMP>></b></td>'
            +'</tr>'
            +'<tr>'
            +'<<RESULT>>'
            +'</tr>' 
			+'<<BAD_STUFF>>'
            +'<tr><td COLSPAN="2" style="padding-top:25px;padding-left:10px;padding-right:10px;"></td></tr>'
            
        +'</table>';
		
var warhammerMagicTextTemplate = '<tr>'
            +"<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;padding-left:10px;padding-right:10px;'><b>Description</b></td>"
            +'</tr>' 			
            +'<tr>'
            +"<td COLSPAN='2' style='text-align:center;padding-left:10px;padding-right:10px;'><<DESCRIPTION>></td>"
            +'</tr>' 
			
            +'<tr>'
            +"<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;padding-left:10px;padding-right:10px;'><b>Ingredients</b></td>"
            +'</tr>' 			
            +'<tr>'
            +"<td COLSPAN='2' style='text-align:center;padding-left:10px;padding-right:10px;'><<INGREDIENTS>></td>"
            +'</tr>' 
            +'<tr>'
			
            +'<tr>'
            +"<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;padding-left:10px;padding-right:10px;'><b>Range</b></td>"
            +'</tr>' 			
            +'<tr>'
            +"<td COLSPAN='2' style='text-align:center;padding-left:10px;padding-right:10px;'><<RANGE>></td>"
            +'</tr>' 
            +'<tr>'
			
            +'<tr>'
            +"<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;padding-left:10px;padding-right:10px;'><b>Casting Time</b></td>"
            +'</tr>' 			
            +'<tr>'
            +"<td COLSPAN='2' style='text-align:center;padding-left:10px;padding-right:10px;'><<CASTING_TIME>></td>"
            +'</tr>' 
            +'<tr>'
			 
			
            +'<tr>'
            +"<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;padding-left:10px;padding-right:10px;'><b>Duration</b></td>"
            +'</tr>' 			
            +'<tr>'
            +"<td COLSPAN='2' style='text-align:center;padding-left:10px;padding-right:10px;'><<DURATION>></td>"
            +'</tr>' 
            +'<tr>'
			
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+magicLineImage+'" />'
            +'</td>'
            +'</tr>';
		
var warhammerMagicSuccessTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: green;'><b>Success!</b></td>";
var warhammerMagicFailureTemplate = "<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: red;'><b>Failure!</b></td>";

var warhammerMagicDiceTemplate = "<span style='white-space:nowrap;color: black; margin:2px; padding:1px'><b><<DICE_TOTAL>></b> (<<DICE_RESULT>>)</span> <<DICE_ROLL>>";
var warhammerChaosDiceTemplate = "<span style='white-space:nowrap;color: red;  margin:2px; padding:1px'><b><<DICE_RESULT>></b></span> <<DICE_ROLL>>";
			
var warhammerMagicBadStuffTemplate = '<tr>'
            +"<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: red;padding-left:10px;padding-right:10px;'>BAD STUFF HAPPENS!<br>TZEENTCH'S CURSE / WRATH OF THE GODS!</td>"
            +'</tr>'
			+'<tr>'
            +'<td COLSPAN="2" style="text-align:center;padding-left:10px;padding-right:10px;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Bad Stuff Roll :</b></span> <span style="color:red"><b><<BAD_ROLL>></b></span></td>'
            +'</tr>'
			+'<<BAD_STUFF>>';
var warhammerMagicBadStuffDoublesTemplate = '<tr>'
            +"<td COLSPAN='2' style='text-align:center;font-style:oblique;font-weight:bolder;color: red;padding-left:10px;padding-right:10px;'>DOUBLES!</td>"
            +'</tr>';


var warhammerInitiativeTableTemplate = "<table style='max-width: 250px; background-image:url("+initBackgroundImage+"); background-size: 100% 100%; background-repeat: no-repeat;font-family: \"Century Gothic\", CenturyGothic, AppleGothic, sans-serif;'>"
            +'<tr><th COLSPAN="2" style="padding-top:15px;">Initiative Roll</th></tr>'
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+initLineImage+'" />'
            +'</td>'
            +'</tr>' 
            
            + '<tr>'
            +'<td style="text-align:center; width:25%;padding-left:10px;"><img class="sheet-imghr" style="width:100%;" src="' + initSymbol + '" /></td>'
            +'<td style="text-align:center; width:75%;padding-right:10px;"><b><<CHAR_NAME>></b></td>'
            +'</tr>'
            
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+initLineImage+'" />'
            +'</td>'            
            +'</tr>' 
			
			+'<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Agility :</b></span> <b><<AGILITY>> %</b></td>'
            +'</tr>'

            +'<tr>' 
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Additional Dice :</b></span> <b><<ADD_ROLL>></b> (<<ADD_DICE>>d10)  </td>'
            +'</tr>'
			
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Modifier :</b></span> <b><<MODIFIER>></b></td>'
            +'</tr>'
			
            +'<tr>' 
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Roll :</b></span> <b><<ROLL>></b></td>'
            +'</tr>'
           
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;">'
                +'<img class="sheet-imghr" style="width:95%;" src="'+initLineImage+'" />'
            +'</td>'			
            +'</tr>' 
			
            +'<tr>'
            +'<td COLSPAN="2" style="text-align:center;"><span style="font-style:oblique;font-weight:bolder;color: #B31515;"><b>Total :</b></span> <b><<TOTAL>></b></td>'
            +'</tr>'
			
            +'<tr><td COLSPAN="2" style="padding-top:15px;"></td></tr>'
            
        +'</table>';

///Functions

function WarhammerCombatDice(char, player, targetnum, mod, moddamage, impact, symbolTest, hidden, title, qualities, whoSent, retried, playerid, lastId)
{
	if (isNaN(symbolTest)) symbolTest = 0;
    var addTitle = false;
    if (title != null)
    {
        if (title != "")
        {
            addTitle = true;
        }
    }
	
	var addQualities = false;
	if (qualities != null)
	{
		if (qualities != "")
		{
			addQualities = true;
		}
	}
	
	
	if (impact != 0 && impact != 1)
	{
		impact = 0;
	}
    var target = Number(targetnum) + Number(mod);
    var targetNumber = Number(target);

    if (targetNumber > 99) targetNumber = 99;
    if (targetNumber < 1) targetNumber = 1;


    var tableCreation = warhammerCombatTableTemplate;
    if (addTitle == true)
    {
        tableCreation = tableCreation.replace("<<ATTACK_NAME>>", title + " ");
    }
    else
    {
        tableCreation = tableCreation.replace("<<ATTACK_NAME>>", "Custom Attack");
    }
	tableCreation = tableCreation.replace("<<STAT_NUMBER>>", targetNumber);
	
	if (symbolTest == 0)
	{
        tableCreation = tableCreation.replace("<<ATTACK_SYMBOL>>", attackSymbol);
	}
	else
	{
        tableCreation = tableCreation.replace("<<ATTACK_SYMBOL>>", shootSymbol);
	}
		
	if (retried == true)
	{
		tableCreation = tableCreation.replace("<<FORTUNE>>", " (Fortune Point)");
	}
	else
	{
		tableCreation = tableCreation.replace("<<FORTUNE>>", "");
	}
	
	var resulttemp = warhammerCombatFailureTemplate;

    var rollOne = randomInteger(10) - 1;
    var rollTwo = randomInteger(10) - 1;

    var sum = (rollOne * 10) + rollTwo;
	if (sum == 0) sum = 100;
    var succ = false;
    var color = "red";
    if (sum <= targetNumber)
    {
        succ = true;
        color = "green";
		resulttemp = warhammerCombatSuccessTemplate;
    }
	if (sum <= critSucCombat)
	{
		resulttemp = warhammerCombatCriticalSuccessTemplate;
	}
	if (sum >= critFailCombat)
	{
		succ = false;
        color = "red";
		resulttemp = warhammerCombatCriticalFailureTemplate;
	}
	
	tableCreation = tableCreation.replace("<<COLOR>>", color);
	tableCreation = tableCreation.replace("<<ROLL_NUMBER>>", sum);

    var MoS = 0;
    if (sum > targetNumber)
    {
        MoS = sum - targetNumber;
    }
    else
    {
        MoS = targetNumber - sum;
    }

	if (succ == true)
    {
		tableCreation = tableCreation.replace("<<ROLL_DEGREE>>", warhammerCombatDoSTemplate);
    }
    else
    {
		tableCreation = tableCreation.replace("<<ROLL_DEGREE>>", warhammerCombatDoFTemplate);
    }
	tableCreation = tableCreation.replace("<<DEGREE>>", Math.floor(MoS/10));

	tableCreation = tableCreation.replace("<<ROLL_RESULT>>", resulttemp);
	
	if (succ == false)
	{
		if (retried == false)
		{
			tableCreation = tableCreation.replace("<<IF_HIT>>", warhammerCombatRetryTemplate);
            if (addQualities == false) qualities = "None";
            if (addTitle == false) title = "Custom Attack";
			tableCreation = tableCreation.replace("<<RETRY>>", "!wardmgrollretryattack ;" + char + ";" + player + ";" + targetnum + ";" + mod + ";" + moddamage + ";" + impact + ";" + symbolTest + ";" + hidden + ";" + title + ";" + qualities + ";" + whoSent + ";" + true + ";" + playerid + ";" + lastId);
		}
		else			
		{
			tableCreation = tableCreation.replace("<<IF_HIT>>", "");
		}
	}
	
	if (succ == true)
	{
		tableCreation = tableCreation.replace("<<IF_HIT>>", warhammerCombatHitTemplate);
		
		var sum2 = (rollTwo * 10) + rollOne;
	if (sum2 == 0) sum2 = 100;
		
		var locationHit = "";
		if (sum2 >= 91)
		{
			locationHit = "Left Leg";
		}
		else if (sum2 >= 81)
		{
			locationHit = "Right Leg";
		}
		else if (sum2 >= 56)
		{
			locationHit = "Body";
		}
		else if (sum2 >= 36)
		{
			locationHit = "Left Arm";
		}
		else if (sum2 >= 16)
		{
			locationHit = "Right Arm";
		}
		else 
		{
			locationHit = "Head";
		}
		
		tableCreation = tableCreation.replace("<<HIT_LOCATION>>", locationHit);
		tableCreation = tableCreation.replace("<<HIT_REVERSE>>", sum2);
		
		
		var damage1 = randomInteger(10);
		var damage2 = -1;
		if (impact == 1)
		{
			damage2 = randomInteger(10);
		}
		var main_damage = damage1;
		if (damage2 > damage1)
		{
			main_damage = damage2;
		}
		
		main_damage = main_damage + Number(moddamage);
		
		var ulric = false;
		if (damage1 == 10 || damage2 == 10)
		{
			ulric = true;
		}
		
		var tempdamage = damage1 + Number(moddamage);
		
		if (Number(moddamage) > 0)
		{
			tableCreation = tableCreation.replace("<<DAMAGE_MOD>>", "+<<DAMAGE_MOD>>");
		}
		else if (Number(moddamage) < 0)
		{
			tableCreation = tableCreation.replace("<<DAMAGE_MOD>>", "-<<DAMAGE_MOD>>");
		}
		
		tableCreation = tableCreation.replace("<<DAMAGE_MOD>>", moddamage);
		
		tableCreation = tableCreation.replace("<<DAMAGE1_TOTAL>>", tempdamage);
		tableCreation = tableCreation.replace("<<ROLL_DAMAGE1>>", damage1);
		
		if (impact == 1)
		{
			tableCreation = tableCreation.replace("<<IMPACT>>", warhammerCombatImpactTemplate);
			
			tempdamage = damage2 + Number(moddamage);
		
			tableCreation = tableCreation.replace("<<DAMAGE2_TOTAL>>", tempdamage);
			tableCreation = tableCreation.replace("<<ROLL_DAMAGE2>>", damage2);
		}
		else
		{
			tableCreation = tableCreation.replace("<<IMPACT>>", "");
		}
		
		if (ulric == true)
		{
			tableCreation = tableCreation.replace("<<ULRIC_FURY>>", warhammerCombatUlricFuryTemplate);
			
			if(damage1 == 10) tableCreation = tableCreation.replace("<<DAMAGE_COLOR1>>", "green");
			else  tableCreation = tableCreation.replace("<<DAMAGE_COLOR1>>", "black");
			
			if(damage2 == 10) tableCreation = tableCreation.replace("<<DAMAGE_COLOR2>>", "green");
			else  tableCreation = tableCreation.replace("<<DAMAGE_COLOR2>>", "black");
			
			var rollConfirmCrit = randomInteger(100);
			
			var colorConfirm = "red";
			
			if (rollConfirmCrit <= targetNumber)
			{
				colorConfirm = "green";
				
				tableCreation = tableCreation.replace("<<CRIT_ROLL_CONFIRMED>>", warhammerCombatCriticalDamage);
				
				var tempCritDamage = randomInteger(10);
				var tempTotalCritDamage = tempCritDamage;
				var rolledstr = "(" + tempCritDamage;
				if (tempCritDamage == 10) rolledstr +="<b>!</b>";
				while(tempCritDamage == 10)
				{
					tempCritDamage = randomInteger(10);
					tempTotalCritDamage = tempTotalCritDamage + tempCritDamage;
					rolledstr += "," + tempCritDamage;
					if (tempCritDamage == 10) rolledstr +="<b>!</b>";
				}
				rolledstr += ")";
				main_damage = main_damage + tempTotalCritDamage;
				
				tableCreation = tableCreation.replace("<<CRIT_DAMAGE>>", tempTotalCritDamage);
				tableCreation = tableCreation.replace("<<CRIT_ROLLEDDMG>>", rolledstr);
				tableCreation = tableCreation.replace("<<TOTAL_DAMAGE>>", main_damage);
			}
			else
			{
				tableCreation = tableCreation.replace("<<CRIT_ROLL_CONFIRMED>>", warhammerCombatRetryTemplate);
				tableCreation = tableCreation.replace("<<RETRY>>", "!wardmgrollretrycrit ;" + char + ";" + player + ";" + targetNumber + ";" + main_damage + ";" + hidden + ";" + whoSent + ";" + title + ";" + playerid + ";" + lastId);
			}
			
			tableCreation = tableCreation.replace("<<CRIT_CONFIRM>>", rollConfirmCrit);
			tableCreation = tableCreation.replace("<<CONFIRM_COLOR>>", colorConfirm);
		}
		else
		{
			tableCreation = tableCreation.replace("<<ULRIC_FURY>>", "");
			tableCreation = tableCreation.replace("<<DAMAGE_COLOR1>>", "black");
			tableCreation = tableCreation.replace("<<DAMAGE_COLOR2>>", "black");
		}
	}
    
	if (addQualities == true)
	{
		tableCreation = tableCreation.replace("<<QUALITIES>>", warhammerCombatQualitiesTemplate);
		tableCreation = tableCreation.replace("<<QUALITIES>>", qualities);
	}
	else
	{
		tableCreation = tableCreation.replace("<<QUALITIES>>", "");
	}
	
	if (hidden==2)
    {
        var tempText = "/w " + whoSent + " "+tableCreation;
        if (player==1) sendChat("player|"+char, tempText);
        else sendChat("character|"+char, tempText);
    }
    if (hidden >= 1) tableCreation = "/w gm " + tableCreation;
    if (player==1) sendChat("player|"+char, tableCreation);
    else sendChat("character|"+char, tableCreation);

};

function WarhammerCombatDiceRetryCrit(char, player, targetNumber, main_damage, hidden, whoSent, title)
{
	var tableCreation = warhammerCombatUlricRetryTableTemplate;
    var addTitle = false;
    if (title != null)
    {
        if (title != "")
        {
            addTitle = true;
        }
    }	
    if (addTitle == true)
    {
        tableCreation = tableCreation.replace("<<ATTACK_NAME>>", title + " ");
    }
    else
    {
        tableCreation = tableCreation.replace("<<ATTACK_NAME>>", "Custom Attack");
    }
        tableCreation = tableCreation.replace("<<ATTACK_SYMBOL>>", ulricSymbol);
			tableCreation = tableCreation.replace("<<STAT_NUMBER>>", targetNumber);
			var rollConfirmCrit = randomInteger(100);
	main_damage = Number(main_damage);
			var colorConfirm = "red";
			
			if (rollConfirmCrit <= targetNumber)
			{
				colorConfirm = "green";
				
				tableCreation = tableCreation.replace("<<IF_HIT>>", warhammerCombatCriticalDamage);
				
				var tempCritDamage = randomInteger(10);
				var tempTotalCritDamage = tempCritDamage;
				var rolledstr = "(" + tempCritDamage;
				if (tempCritDamage == 10) rolledstr +="<b>!</b>";
				while(tempCritDamage == 10)
				{
					tempCritDamage = randomInteger(10);
					tempTotalCritDamage = tempTotalCritDamage + tempCritDamage;
					rolledstr += "," + tempCritDamage;
					if (tempCritDamage == 10) rolledstr +="<b>!</b>";
				}
				rolledstr += ")"
				main_damage = main_damage + tempTotalCritDamage;
				
				tableCreation = tableCreation.replace("<<CRIT_DAMAGE>>", tempTotalCritDamage);
				tableCreation = tableCreation.replace("<<CRIT_ROLLEDDMG>>", rolledstr);
				tableCreation = tableCreation.replace("<<TOTAL_DAMAGE>>", main_damage);
			}
			else
			{
				tableCreation = tableCreation.replace("<<IF_HIT>>", "");
			}
			
			tableCreation = tableCreation.replace("<<CRIT_CONFIRM>>", rollConfirmCrit);
			tableCreation = tableCreation.replace("<<CONFIRM_COLOR>>", colorConfirm);
			
	if (hidden==2)
    {
        var tempText = "/w " + whoSent + " "+tableCreation;
        if (player==1) sendChat("player|"+char, tempText);
        else sendChat("character|"+char, tempText);
    }
    if (hidden >= 1) tableCreation = "/w gm " + tableCreation;
    if (player==1) sendChat("player|"+char, tableCreation);
    else sendChat("character|"+char, tableCreation);

};

function WarhammerParryDice(char, player, targetnum, mod, hidden, title, whoSent, retried, playerid, lastId)
{
    var addTitle = false;
    if (title != null)
    {
        if (title != "")
        {
            addTitle = true;
        }
    }
    var target = Number(targetnum) + Number(mod);
    var targetNumber = Number(target);

    if (targetNumber > 99) targetNumber = 99;
    if (targetNumber < 1) targetNumber = 1;


    var tableCreation = warhammerParryTableTemplate;
    if (addTitle == true)
    {
        tableCreation = tableCreation.replace("<<ATTACK_NAME>>", title + " ");
    }
    else
    {
        tableCreation = tableCreation.replace("<<ATTACK_NAME>>", "Custom Parry");
    }
	if ( Boolean(retried) == true)
	{
        tableCreation = tableCreation.replace("<<FORTUNE>>", " (Fortune's Point)");
	}
	else
	{
        tableCreation = tableCreation.replace("<<FORTUNE>>", "");
	}
	
	tableCreation = tableCreation.replace("<<STAT_NUMBER>>", targetNumber);
	var resulttemp = warhammerParryFailureTemplate;

    var rollOne = randomInteger(10) - 1;
    var rollTwo = randomInteger(10) - 1;

    var sum = (rollOne * 10) + rollTwo;
	if (sum == 0) sum = 100;
    var succ = false;
    var color = "red";
    if (sum <= targetNumber)
    {
        succ = true;
        color = "green";
		resulttemp = warhammerParrySuccessTemplate;
    }
	if (sum <= critSucParry)
	{
		resulttemp = warhammerParryCriticalSuccessTemplate;
	}
	if (sum >= critFailParry)
	{
		succ = false;
        color = "red";
		resulttemp = warhammerParryCriticalFailureTemplate;
	}
	
	tableCreation = tableCreation.replace("<<COLOR>>", color);
	tableCreation = tableCreation.replace("<<ROLL_NUMBER>>", sum);

    var MoS = 0;
    if (sum > targetNumber)
    {
        MoS = sum - targetNumber;
    }
    else
    {
        MoS = targetNumber - sum;
    }

	if (succ == true)
    {
		tableCreation = tableCreation.replace("<<ROLL_DEGREE>>", warhammerParryDoSTemplate);
    }
    else
    {
		tableCreation = tableCreation.replace("<<ROLL_DEGREE>>", warhammerParryDoFTemplate);
    }
	tableCreation = tableCreation.replace("<<DEGREE>>", Math.floor(MoS/10));

	tableCreation = tableCreation.replace("<<ROLL_RESULT>>", resulttemp);
    
	if (succ == false && Boolean(retried)  == false)
	{
		tableCreation = tableCreation.replace("<<ROLL_RETRY>>", warhammerParryRetryTemplate);
		tableCreation = tableCreation.replace("<<RETRY>>", "!warparryrollretry ;" + char + ";" + player + ";" + targetnum + ";" + mod + ";" + hidden + ";" + title + ";" + whoSent + ";true" + ";" + playerid + ";" + lastId);
	}
	else
	{
		tableCreation = tableCreation.replace("<<ROLL_RETRY>>", "");		
	}
	
	if (hidden==2)
    {
        var tempText = "/w " + whoSent + " "+tableCreation;
        if (player==1) sendChat("player|"+char, tempText);
        else sendChat("character|"+char, tempText);
    }
    if (hidden >= 1) tableCreation = "/w gm " + tableCreation;
    if (player==1) sendChat("player|"+char, tableCreation);
    else sendChat("character|"+char, tableCreation);

};

function WarhammerDice(char, player, targetnum, mod, hidden, title, whoSent, retried, playerid, lastId)
{
    var addTitle = false;
    if (title != null)
    {
        if (title != "")
        {
            addTitle = true;
        }
    }
    var target = Number(targetnum) + Number(mod);
    var targetNumber = Number(target);

    if (targetNumber > 99) targetNumber = 99;
    if (targetNumber < 1) targetNumber = 1;


    var tableCreation = warhammerSkillTableTemplate;
    if (addTitle == true)
    {
        tableCreation = tableCreation.replace("<<SKILL_NAME>>", title + " ");
    }
    else
    {
        tableCreation = tableCreation.replace("<<SKILL_NAME>>", "Custom Roll");
    }
	if ( Boolean(retried) == true)
	{
        tableCreation = tableCreation.replace("<<FORTUNE>>", " (Fortune's Point)");
	}
	else
	{
        tableCreation = tableCreation.replace("<<FORTUNE>>", "");
	}
	tableCreation = tableCreation.replace("<<STAT_NUMBER>>", targetNumber);
	var resulttemp = warhammerSkillFailureTemplate;

    var rollOne = randomInteger(10) - 1;
    var rollTwo = randomInteger(10) - 1;

    var sum = (rollOne * 10) + rollTwo;
	if (sum == 0) sum = 100;
    var succ = false;
    var color = "red";
    if (sum <= targetNumber)
    {
        succ = true;
        color = "green";
		resulttemp = warhammerSkillSuccessTemplate;
    }
	if (sum <= critSucSkill)
	{
		resulttemp = warhammerSkillCriticalSuccessTemplate;
	}
	if (sum >= critFailSkill)
	{
		succ = false;
        color = "red";
		resulttemp = warhammerSkillCriticalFailureTemplate;
	}
	
	tableCreation = tableCreation.replace("<<COLOR>>", color);
	tableCreation = tableCreation.replace("<<ROLL_NUMBER>>", sum);

    var MoS = 0;
    if (sum > targetNumber)
    {
        MoS = sum - targetNumber;
    }
    else
    {
        MoS = targetNumber - sum;
    }

	if (succ == true)
    {
		tableCreation = tableCreation.replace("<<ROLL_DEGREE>>", warhammerSkillDoSTemplate);
    }
    else
    {
		tableCreation = tableCreation.replace("<<ROLL_DEGREE>>", warhammerSkillDoFTemplate);
    }
	tableCreation = tableCreation.replace("<<DEGREE>>", Math.floor(MoS/10));

	tableCreation = tableCreation.replace("<<ROLL_RESULT>>", resulttemp);
    
	if (succ == false && retried == false)
	{
		tableCreation = tableCreation.replace("<<ROLL_RETRY>>", warhammerSkillRetryTemplate);
		tableCreation = tableCreation.replace("<<RETRY>>", "!warrollretry ;" + char + ";" + player + ";" + targetnum + ";" + mod + ";" + hidden + ";" + title + ";" + whoSent + ";true;" + playerid + ";" + lastId);
	}
	else
	{
		tableCreation = tableCreation.replace("<<ROLL_RETRY>>", "");		
	}
	
	if (hidden==2)
    {
        var tempText = "/w " + whoSent + " "+tableCreation;
        if (player==1) sendChat("player|"+char, tempText);
        else sendChat("character|"+char, tempText);
    }
    if (hidden >= 1) tableCreation = "/w gm " + tableCreation;
    if (player==1) sendChat("player|"+char, tableCreation);
    else sendChat("character|"+char, tableCreation);

};

function WarhammerInitiative(char, player, agility, adddice, mod, hidden, name, whoSent)
{
    var addName = false;
    if (name != null)
    {
        if (name != "")
        {
            addName = true;
        }
    }
	
	agility = Number(agility);
	adddice = Number(adddice);
	mod = Number(mod);
	
	if (adddice < 0)
	{
		adddice = 0;
	}
	
    var tableCreation = warhammerInitiativeTableTemplate;
    if (addName == true)
    {
        tableCreation = tableCreation.replace("<<CHAR_NAME>>", name);
    }
    else
    {
        tableCreation = tableCreation.replace("<<CHAR_NAME>>", "NPC");
    }
	
	tableCreation = tableCreation.replace("<<AGILITY>>", agility);

	var initTotal = 0;
    var initRoll = randomInteger(10);
	initTotal += initRoll;
	
	tableCreation = tableCreation.replace("<<ROLL>>", initRoll);
	var initSumAddSum = 0;
	
	if (adddice > 0)
	{
		for (i = 0; i < adddice; i++) 
		{ 
			initSumAddSum += randomInteger(10);
		}
	}
	
	initTotal += initSumAddSum;
	
	tableCreation = tableCreation.replace("<<ADD_DICE>>", adddice);
	tableCreation = tableCreation.replace("<<ADD_ROLL>>", initSumAddSum);
		
	initTotal += mod;
	tableCreation = tableCreation.replace("<<MODIFIER>>", mod);
		
	initTotal += agility;
	tableCreation = tableCreation.replace("<<TOTAL>>", initTotal);

	var turnorder;
    if (Campaign().get("turnorder") == "") 
	{
		turnorder = [];
    } 
	else 
		turnorder = JSON.parse(Campaign().get("turnorder"));     
	
			turnorder.push({
    				id: "-1",
  				pr: initTotal,
      				custom: name
      			});
	
	Campaign().set("turnorder", JSON.stringify(turnorder));
	
	if (hidden==2)
    {
        var tempText = "/w " + whoSent + " "+tableCreation;
        if (player==1) sendChat("player|"+char, tempText);
        else sendChat("character|"+char, tempText);
    }
    if (hidden >= 1) tableCreation = "/w gm " + tableCreation;
    if (player==1) sendChat("player|"+char, tableCreation);
    else sendChat("character|"+char, tableCreation);

};
		
function WarhammerMagicDice(char, player, magic, magicmax, channel, gooddice, modtototal, modtodice, armorpenal, chaosdice, dhar, componentvalue, hidden, spellnumber, includetext, spellname, spelldesc, spellcomponent, spelltime, spellduration, spellrange, spellimage, whoSent)
{
    if (!spellname)
    {
		spellname = "Custom Spell";
    }
    if (!spelldesc)
    {
		spelldesc = "?";
    }
    if (spelldesc == "") spelldesc = "?";
    
    if (!spellcomponent)
    {
		spellcomponent = "?";
    }
    if (spellcomponent == "") spellcomponent = "?";
    
    if (!spellimage)
    {
		spellimage = magicSymbol;
    }	
    
    if (!spelltime)
    {
        spelltime = "?";
    }
    if (spelltime == "") spelltime = "?";
	
    if (!spellduration)
    {
        spellduration = "?";
    }
    if (spellduration == "") spellduration = "?";
	
    if (!spellrange)
    {
        spellrange = "?";
    }
    if (spellrange == "") spellrange = "?";
	
	dhar = Number(dhar);
	if (dhar != 0 && dhar != 1)
	{
		dhar = 0;
	}
	
	componentvalue = Number(componentvalue);
	if (componentvalue < 0)
	{
		componentvalue = 0;
	}
	
	magic = Number(magic);
	if (magic < 1) magic = 1;
	
	magicmax = Number(magicmax);
	if (magicmax < 0) magicmax = 1;
	
	if (magicmax < magic) magic = magicmax;
	
	if (channel != 1 && channel != 0) channel = 0;
	if (includetext != 1 && includetext != 0) includetext = 0;
	
	modtototal = Number(modtototal);
	modtodice = Number(modtodice);
	armorpenal = Number(armorpenal);
	gooddice = Number(gooddice);
	if (gooddice < 0) gooddice = 0;
	
	chaosdice = Number(chaosdice);
	if (chaosdice < 0) chaosdice = 0;
	
	spellnumber = Number(spellnumber);
	if (spellnumber < 1) spellnumber = 1;
	
	var tableCreation = warhammerMagicTableTemplate;
		
	tableCreation = tableCreation.replace("<<SPELL_NAME>>", spellname);
	tableCreation = tableCreation.replace("<<SPELL_IMAGE>>", spellimage);
	
	if (includetext == 1)
	{
		tableCreation = tableCreation.replace("<<INCLUDE_TEXT>>", warhammerMagicTextTemplate);
		tableCreation = tableCreation.replace("<<DESCRIPTION>>", spelldesc);
		tableCreation = tableCreation.replace("<<INGREDIENTS>>", spellcomponent);
		tableCreation = tableCreation.replace("<<RANGE>>", spellrange);
		tableCreation = tableCreation.replace("<<CASTING_TIME>>", spelltime);
		tableCreation = tableCreation.replace("<<DURATION>>", spellduration);
	}
	else
	{
		tableCreation = tableCreation.replace("<<INCLUDE_TEXT>>", "");
	}
		
	tableCreation = tableCreation.replace("<<CAST_NUMBER>>", spellnumber);
	tableCreation = tableCreation.replace("<<CAST_NUMBER>>", spellnumber);
	tableCreation = tableCreation.replace("<<MAGIC_MAX>>", magicmax);
	tableCreation = tableCreation.replace("<<MAGIC_USED>>", magic);
	tableCreation = tableCreation.replace("<<GOOD_DICE>>", gooddice);
	
	var channelstr = "";
	if (channel == 0) channelstr = "No";
	else channelstr = "Yes (+" + magicmax + ")";
	
	tableCreation = tableCreation.replace("<<CHANNEL>>", channelstr);
	tableCreation = tableCreation.replace("<<MODIFIER_TOTAL>>", modtototal);
	tableCreation = tableCreation.replace("<<MODIFIER_DICE>>", modtodice);
	tableCreation = tableCreation.replace("<<MODIFIER_ARMOR>>", armorpenal);
	tableCreation = tableCreation.replace("<<CHAOS_DICE>>", chaosdice);
	if (dhar == 1)
	{
		tableCreation = tableCreation.replace("<<DHAR>>", "Yes");
	}
	else
	{
		tableCreation = tableCreation.replace("<<DHAR>>", "No");
	}
	
	var diceResults = [];
	var numberDice = gooddice + magic + dhar;
	var rollSum = 0;
	var lowestRoll = 0;
	
	for (var i = 0; i < numberDice; i++)
	{
		var roll = randomInteger(10);
		diceResults.push(roll);
		if (lowestRoll >= roll) lowestRoll = roll;
		if (lowestRoll == 0) lowestRoll = roll;
		rollSum += roll + modtodice;
		tableCreation = tableCreation.replace("<<DICE_ROLL>>", warhammerMagicDiceTemplate);
		tableCreation = tableCreation.replace("<<DICE_TOTAL>>", (roll + modtodice));
		tableCreation = tableCreation.replace("<<DICE_RESULT>>", roll);
		
		if ((diceResults.length % 3) == 0) tableCreation = tableCreation.replace("<<DICE_ROLL>>", "<br><<DICE_ROLL>>");
	}
	
	if (dhar == 1)
	{
		rollSum -= lowestRoll;
		tableCreation = tableCreation.replace("<<DICE_ROLL>>", "<br><b>Dhar, not counting roll:</b> " + lowestRoll.toString() + "<<DICE_ROLL>>");
	}
	
	if (chaosdice > 0) tableCreation = tableCreation.replace("<<DICE_ROLL>>", "<br><<DICE_ROLL>>");
	
	for (var i = 0; i < chaosdice; i++)
	{
		var roll = randomInteger(10);
		diceResults.push(roll);
		tableCreation = tableCreation.replace("<<DICE_ROLL>>", warhammerChaosDiceTemplate);
		tableCreation = tableCreation.replace("<<DICE_RESULT>>", roll);
		if (((i+1) % 3) == 0) tableCreation = tableCreation.replace("<<DICE_ROLL>>", "<br><<DICE_ROLL>>");
	}
	
	tableCreation = tableCreation.replace("<<DICE_ROLL>>", "");
	
	rollSum += armorpenal;
	rollSum += modtototal;
	if (channel == 1) rollSum += magicmax;
		
	var dup = false
	if (diceResults.length > 1)
	{
	var sorted_arr = diceResults.slice().sort();
	for (var i = 0; i < diceResults.length - 1; i++) 
	{
		if (sorted_arr[i + 1] == sorted_arr[i]) 
		{
			dup = true;
			break;
		}
	}
	}
	
	if (dup == true)
	{
		tableCreation = tableCreation.replace("<<BAD_STUFF>>", warhammerMagicBadStuffTemplate);
		var badroll = randomInteger(100);
		tableCreation = tableCreation.replace("<<BAD_ROLL>>", badroll);
		if ((badroll % 11) == 0)
		{
			tableCreation = tableCreation.replace("<<BAD_STUFF>>", warhammerMagicBadStuffDoublesTemplate);
		}
		else
		{
			tableCreation = tableCreation.replace("<<BAD_STUFF>>", "");
		}
	}
	else
	{	
		tableCreation = tableCreation.replace("<<BAD_STUFF>>", "");
	}
	
	if (rollSum >= spellnumber)
	{
		tableCreation = tableCreation.replace("<<RESULT>>", warhammerMagicSuccessTemplate);
	}
	else
	{
		tableCreation = tableCreation.replace("<<RESULT>>", warhammerMagicFailureTemplate);
	}
	
	tableCreation = tableCreation.replace("<<TOTAL>>", rollSum);
	
	var sumcomponent = componentvalue + rollSum;
	
	tableCreation = tableCreation.replace("<<COMP>>", componentvalue);
	tableCreation = tableCreation.replace("<<TOTALCOMP>>", sumcomponent);
	
	if (hidden==2)
    {
        var tempText = "/w " + whoSent + " "+tableCreation;
        if (player==1) sendChat("player|"+char, tempText);
        else sendChat("character|"+char, tempText);
    }
    if (hidden >= 1) tableCreation = "/w gm " + tableCreation;
    if (player==1) sendChat("player|"+char, tableCreation);
    else sendChat("character|"+char, tableCreation);

};

on("chat:message", function(msg) {
    if ( msg.type != 'api' ) return;
    var cmd = "";
    if (_.has(msg, 'inlinerolls')) {
        cmd = _.chain(msg.inlinerolls)
                .reduce(function(previous, current, index) {
                    previous['$[[' + index + ']]'] = current.results.total || 0;
                    return previous;
                },{})
                .reduce(function(previous, current, index) {
                    return previous.replace(index, current);
                }, msg.content)
                .value();
    } else {
        cmd = msg.content;
    }
    var cmd = cmd.toLowerCase().split(' ');
    if ( cmd[0] == "!warroll" )
    {
        var inputName = msg.who;
        var list = findObjs( {
			_type: "character",
			name: inputName
        });

        var cmd2 = msg.content.split(' ');
        var str = "";
        for (i = 4; i < cmd2.length; i++)
        {
            str = str + " " + cmd2[i];
        }
        str = str.substring(1);
        
        var roll = 0;
        if (isNaN(cmd[1]) == false) 
        {
            roll = cmd[1];            
        }
        else
        {
            msg.inlinerolls
        }
		
		if (_.has(state.WarhammerDiceStatus.playerDiceLastRoll, msg.playerid))
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId = (Math.random() + 1).toString(36).substring(7);;
		}
		else
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid] = { LastRollId: (Math.random() + 1).toString(36).substring(7)}
		}
		
        if (list.length == 0)
        {
            WarhammerDice( msg.playerid, 1, cmd[1], cmd[2], cmd[3], str, inputName, false, msg.playerid, state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId);
        }
        else
        {
            WarhammerDice( list[0].id, 0, cmd[1], cmd[2], cmd[3], str, inputName, false, msg.playerid, state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId);
        }
    }
	else if ( cmd[0] == "!warmagicroll" )
    {
        var inputName = msg.who;
        var list = findObjs( {
			_type: "character",
			name: inputName
        });

        var cmd2 = msg.content.split(' ');
        var str = "";
        for (i = 14; i < cmd2.length; i++)
        {
            str = str + " " + cmd2[i];
        }
        str = str.substring(1);
        
        var spelldesc = str.splitArgs();
		
		if (_.has(state.WarhammerDiceStatus.playerDiceLastRoll, msg.playerid))
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId = (Math.random() + 1).toString(36).substring(7);;
		}
		else
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid] = { LastRollId: (Math.random() + 1).toString(36).substring(7)}
		}
        
        var roll = 0;
        if (isNaN(cmd[1]) == false) 
        {
            roll = cmd[1];            
        }
        else
        {
            msg.inlinerolls
        }
        if (list.length == 0)
        {
												//magic, magicmax, channel, gooddice, modtototal, modtodice, armorpenal, chaosdice, dhar, componentvalue, hidden, spellnumber, spellname, spelldesc, spellcomponent, spelltime, spellduration, spellrange, spellimage, whoSent)
            WarhammerMagicDice( msg.playerid, 1, cmd[1], cmd[2], cmd[3], cmd[4], cmd[5], cmd[6], cmd[7], cmd[8], cmd[9], cmd[10], cmd[11], cmd[12], cmd[13], spelldesc[0], spelldesc[1], spelldesc[2], spelldesc[3], spelldesc[4], spelldesc[5], spelldesc[6], inputName);
        }
        else
        {
			//magic, magicmax, channel, gooddice, modtototal, modtodice, armorpenal, chaosdice, dhar, componentvalue, hidden, spellnumber, spellname, spelldesc, spellcomponent, spelltime, spellduration, spellrange, spellimage, whoSent)
            WarhammerMagicDice( list[0].id, 0, cmd[1], cmd[2], cmd[3], cmd[4], cmd[5], cmd[6], cmd[7], cmd[8], cmd[9], cmd[10], cmd[11], cmd[12], cmd[13], spelldesc[0], spelldesc[1], spelldesc[2], spelldesc[3], spelldesc[4], spelldesc[5], spelldesc[6], inputName);
        }
    }
	else if ( cmd[0] == "!warinitroll" )
    {
        var inputName = msg.who;
        var list = findObjs( {
			_type: "character",
			name: inputName
        });

        var cmd2 = msg.content.split(' ');
        var str = "";
        for (i = 5; i < cmd2.length; i++)
        {
            str = str + " " + cmd2[i];
        }
        str = str.substring(1);
        		
		
		if (_.has(state.WarhammerDiceStatus.playerDiceLastRoll, msg.playerid))
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId = (Math.random() + 1).toString(36).substring(7);;
		}
		else
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid] = { LastRollId: (Math.random() + 1).toString(36).substring(7)}
		}
        
        var roll = 0;
        if (isNaN(cmd[1]) == false) 
        {
            roll = cmd[1];            
        }
        else
        {
            msg.inlinerolls
        }
        if (list.length == 0)
        {
            WarhammerInitiative( msg.playerid, 1, cmd[1], cmd[2], cmd[3], cmd[4], str, inputName);
        }
        else
        {
            WarhammerInitiative( list[0].id, 0, cmd[1], cmd[2], cmd[3], cmd[4], str, inputName);
        }
	}
	else if ( cmd[0] == "!warparryroll" )
    {
        var inputName = msg.who;
        var list = findObjs( {
			_type: "character",
			name: inputName
        });

        var cmd2 = msg.content.split(' ');
        var str = "";
        for (i = 4; i < cmd2.length; i++)
        {
            str = str + " " + cmd2[i];
        }
        str = str.substring(1);
        
		if (_.has(state.WarhammerDiceStatus.playerDiceLastRoll, msg.playerid))
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId = (Math.random() + 1).toString(36).substring(7);;
		}
		else
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid] = { LastRollId: (Math.random() + 1).toString(36).substring(7)}
		}
        var roll = 0;
        if (isNaN(cmd[1]) == false) 
        {
            roll = cmd[1];            
        }
        else
        {
            msg.inlinerolls
        }
        if (list.length == 0)
        {
            WarhammerParryDice( msg.playerid, 1, cmd[1], cmd[2], cmd[3], str, inputName, false, msg.playerid, state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId);
        }
        else
        {
            WarhammerParryDice( list[0].id, 0, cmd[1], cmd[2], cmd[3], str, inputName, false, msg.playerid, state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId);
        }
	}
    else if ( cmd[0] == "!wardmgroll" )
    {
        var inputName = msg.who;
        var list = findObjs( {
			_type: "character",
			name: inputName
        });

        var cmd2 = msg.content.split(' ');
        var str = "";
        for (i = 7; i < cmd2.length; i++)
        {
            str = str + " " + cmd2[i];
        }
        str = str.substring(1);
        
		if (_.has(state.WarhammerDiceStatus.playerDiceLastRoll, msg.playerid))
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId = (Math.random() + 1).toString(36).substring(7);;
		}
		else
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid] = { LastRollId: (Math.random() + 1).toString(36).substring(7)}
		}
        var attackNameAndQualities = str.splitArgs();		
        
        var roll = 0;
        if (isNaN(cmd[1]) == false) 
        {
            roll = cmd[1];            
        }
        else
        {
            msg.inlinerolls
        }
        if (list.length == 0)
        {
            WarhammerCombatDice( msg.playerid, 1, cmd[1], cmd[2], cmd[3], cmd[4], cmd[5], cmd[6], attackNameAndQualities[0], attackNameAndQualities[1], inputName, false, msg.playerid, state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId);
        }
        else
        {
            WarhammerCombatDice( list[0].id, 0, cmd[1], cmd[2], cmd[3], cmd[4], cmd[5], cmd[6], attackNameAndQualities[0], attackNameAndQualities[1], inputName, false, msg.playerid, state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId);
        }
    }
	else if (cmd[0] == "!warrollretry" && _.has(state.WarhammerDiceStatus.playerDiceLastRoll, msg.playerid))
	{
		var retryArgs = msg.content.splitArgs(";");
		if (retryArgs[9] == msg.playerid && state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId == retryArgs[10])
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId = (Math.random() + 1).toString(36).substring(7);
			WarhammerDice( retryArgs[1], retryArgs[2], retryArgs[3], retryArgs[4], retryArgs[5], retryArgs[6], retryArgs[7], retryArgs[8]);
		}
	}
	else if (cmd[0] == "!wardmgrollretryattack" && _.has(state.WarhammerDiceStatus.playerDiceLastRoll, msg.playerid))
	{
		var retryArgs = msg.content.splitArgs(";");
		if (retryArgs[13] == msg.playerid && state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId == retryArgs[14])	
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId = (Math.random() + 1).toString(36).substring(7);
			WarhammerCombatDice( retryArgs[1], retryArgs[2], retryArgs[3], retryArgs[4], retryArgs[5], retryArgs[6], retryArgs[7], retryArgs[8], retryArgs[9], retryArgs[10], retryArgs[11], retryArgs[12]);
		}		
	}
	else if (cmd[0] == "!wardmgrollretrycrit" && _.has(state.WarhammerDiceStatus.playerDiceLastRoll, msg.playerid))
	{
		var retryArgs = msg.content.splitArgs(";");
		if (retryArgs[8] == msg.playerid && state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId == retryArgs[9])
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId = (Math.random() + 1).toString(36).substring(7);
			WarhammerCombatDiceRetryCrit( retryArgs[1], retryArgs[2], retryArgs[3], retryArgs[4], retryArgs[5], retryArgs[6], retryArgs[7]);
		}		
	}
	else if (cmd[0] == "!warparryrollretry" && _.has(state.WarhammerDiceStatus.playerDiceLastRoll, msg.playerid))
	{
		var retryArgs = msg.content.splitArgs(";");
		if (retryArgs[9] == msg.playerid && state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId == retryArgs[10])
		{
			state.WarhammerDiceStatus.playerDiceLastRoll[msg.playerid].LastRollId = (Math.random() + 1).toString(36).substring(7);
			WarhammerParryDice( retryArgs[1], retryArgs[2], retryArgs[3], retryArgs[4], retryArgs[5], retryArgs[6], retryArgs[7], retryArgs[8]);
		}			
	}


});

on('ready',function() {
    "use strict";

    if( ! state.WarhammerDiceStatus ) {
        state.WarhammerDiceStatus = {
            playerDiceLastRoll: {}
        };
    }

});