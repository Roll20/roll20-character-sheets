import csv
f = open('town.html','w')

def turnMacros():
	print >>f, '''
			<div class="sheet-row sheet-padr sheet-margin-top sheet-town-toggle">
				<div class="sheet-col-1-5">
					<div class="sheet-row sheet-padr sheet-margin-top">
						<div class="sheet-col-6-7 sheet-core-stat-label">1.Upkeep</div>
						<div class="sheet-col-1-7">
							<button type="roll" class="sheet-roll" name="roll_town_turn_stability" value='/as "Town" Kingdom Check:  \\n/as "Town" [[d20+(@{town_stability_total})]] >= [[20 + (@{town_kingdomsize_total}) + (@{town_numdistricts_total})]]? \\n/as "Town" Success: [[-1]] Unrest or [[1]] BP. \\n/as "Town" Fail <=4: [[1]] Unrest \\n/as "Town" Fail > 4: [[1d4]] Unrest'></button>
						</div>
					</div>
				</div>
				<div class="sheet-col-1-5">
					<div class="sheet-row sheet-padr sheet-margin-top">
						<div class="sheet-col-1 sheet-core-stat-label">2.Edicts</div>
					</div>
				</div>
				<div class="sheet-col-1-5">
					<div class="sheet-row sheet-padr sheet-margin-top">
						<div class="sheet-col-6-7 sheet-core-stat-label">3.Income</div>
						<div class="sheet-col-1-7">
							<button type="roll" class="sheet-roll" name="roll_town_turn_income" value='/as "Town" Total Income: [[ floor((d20+(@{town_economy_total}))/3) + @{town_income_total}]]'></button>
						</div>
					</div>
				</div>
				<div class="sheet-col-1-5">
					<div class="sheet-row sheet-padr sheet-margin-top">
						<div class="sheet-col-6-7 sheet-core-stat-label">4.Events</div>
						<div class="sheet-col-1-7">
							<button type="roll" class="sheet-roll" name="roll_town_turn_events" value='/as "Town" Event Happen? [[ {d100-(@{town_event_last_time})}<25 ]] \\n/as "Town" 0: No Event \\n/as "Town" 1: [[ 1t[Town-Event] ]].'></button>
						</div>
					</div>
				</div>
				<div class="sheet-col-1-5">
					<div class="sheet-row">
						<div class="sheet-col-1 sheet-padr sheet-center sheet-margin-top">
							<input type="checkbox" class="sheet-town-last-event" name="attr_town_event_last_time" value="50"><span class="sheet-town-last-event-tab"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="sheet-row sheet-padr sheet-margin-top sheet-town-details">
				<div class="sheet-col-1-3">
					<strong>Step 1 - Stability Check</strong><br>
						Success: -1 Unrest (if Unrest < 0, +1 BP instead).<br>
						Fail (<= 4):  +1 Unrest<br> 
						Fail (> 4): + 1d4 Unrest<br>
					<strong>Step 2 - Pay Consumption</strong><br> If Treasury is negative, +2 Unrest.<br>
					<strong>Step 3 - Manage Unrest</strong><br>
						+1 Unrest for each kingdom stat that is negative.<br>
						If Unrest >= 11 lose 1 hex.<br>
						If Unrest >= 20 anarchy. (Your kingdom takes no action and all checks fail). Requires a number of quests to restore order.<br>
				</div>
				<div class="sheet-col-1-3">
					<strong>Step 1 - Claim/Abandon Hexes</strong><br>
						Claim: Cost 1 BP and kingdom's Size +1.<br>
						Abandon: +1 Unrest (or +4 if the hex contained a settlement).<br>
					<strong>Step 2 - Build Improvements / Buildings</strong><br>
					<strong>Step 3 - Assign Leadership</strong><br>
					<strong>Step 4 - Issue Edicts.</strong><br>
					<strong>Step 5 - Create Settlements</strong><br>
					<strong>Step 6 - Manage Army</strong>
				</div>
			
				<div class="sheet-col-1-3">
					<strong>Step 1 - Collect Taxes</strong>
						<br>Add Economy check, divide by 3 (round down) to your Treasury.<br>
					<strong>Step 2 - Withdrawals/Deposits</strong><br>
						Withdrawals:  1BP = +1 Unrest, 2k gp withdrawn.<br>
						Deposits: 4k gp = +1 BP<br>
				</div>
			</div>
'''


def goverment():

	outBuilding = dict()
	outBuilding[0] =""
	outBuilding[1] =""
	outBuilding[2] =""
	outBuilding[3] =""
	
	x = 0
	for label in ['Economy', 'Loyalty','Stability','Defense','Unrest','Corruption','Crime', 'Law','Lore','Productivity','Society','Consumption']:
		label_lower = label.lower().replace(" ", "_")

		outBuilding[x%4] += "<div class=\"sheet-col-1-3\"><input class=\"sheet-underlined sheet-center\" type=\"number\" name=\"attr_town_goverment_"+label_lower+"\" value=\"0\" step=\"1\"><br>"+label+"</div>"
		x+=1
	print >>f, '<h4 class="sheet-center sheet-town-toggle">Goverment</h4>'
	print >>f, '''
		<div class="sheet-row sheet-town-details">
			<div class="sheet-col-1">
				<strong>Autocracy:</strong> <br>A single person rules the kingdom by popular acclaim.<br>
				Modifiers: None.<br>
				
				<strong>Magocracy:</strong> <br>An individual or group with potent magical power leads the kingdom and promotes the spread of magical and mundane knowledge.<br>
				Modifiers: Lore +2, Productivity -1, Society -1.<br>
				
				<strong>Oligarchy:</strong> <br>A group of councilors, guild masters, aristocrats, and other wealthy and powerful individuals meet in council to lead the kingdom and direct its policies.<br>
				Modifiers: Corruption +1, Law -1, Lore -1, Society +1.<br>
				
				<strong>Overlord:</strong> <br>The kingdom's ruler is a single individual who either seized control or inherited command. <br>
				Modifiers: Corruption +1, Crime -1, Law +1, Society -1.<br>
				
				<strong>Republic:</strong> <br>The kingdom is ruled by a parliament of elected or appointed officials. <br>
				Modifiers: Crime -1, Law -1, Productivity +1, Society +1.<br>
				
				<strong>Secret Syndicate:</strong> <br>An unofficial or illegal group like a thieves guild rules the kingdom.<br>
				Modifiers: Corruption +1, Crime +1, Law -3, Productivity +1.<br>
				
				<strong>Theocracy:</strong> <br>The kingdom is ruled by the leader of its most popular religion. <br>
				Modifiers: Corruption -1, Law +1, Lore +1, Society -1.<br>
			</div>
		</div>
'''
	print >>f, '<div class="sheet-row ">'
	print >>f, '\t<div class="sheet-col-1"><input type="text" name="attr_town_goverment_type" value=""></div>'
	print >>f, '<div class="sheet-row">'+outBuilding[0]+'</div>'
	print >>f, '<div class="sheet-row">'+outBuilding[1]+'</div>'
	print >>f, '<div class="sheet-row">'+outBuilding[2]+'</div>'
	print >>f, '<div class="sheet-row">'+outBuilding[3]+'</div>'
	print >>f, '</div>'

def income():
	print >>f, '''
			<h4 class="sheet-center sheet-town-toggle">Kingdom Mods</h4>
			<div class="sheet-row sheet-town-details">
				<div class="sheet-col-1">
					<div class="sheet-row sheet-sub-header">
						<div class="sheet-col-1-5">Size</div>
						<div class="sheet-col-1-5">Settl.</div>
						<div class="sheet-col-1-5">Build.</div>
						<div class="sheet-col-1-5">Terr.</div>
						<div class="sheet-col-1-5">Hexes</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">0-10</div>
						<div class="sheet-col-1-5">1</div>
						<div class="sheet-col-1-5">1</div>
						<div class="sheet-col-1-5">2</div>
						<div class="sheet-col-1-5">1</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">11-25</div>
						<div class="sheet-col-1-5">1</div>
						<div class="sheet-col-1-5">2</div>
						<div class="sheet-col-1-5">3</div>
						<div class="sheet-col-1-5">2</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">26-50</div>
						<div class="sheet-col-1-5">1</div>
						<div class="sheet-col-1-5">5</div>
						<div class="sheet-col-1-5">5</div>
						<div class="sheet-col-1-5">3</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">51-100</div>
						<div class="sheet-col-1-5">2</div>
						<div class="sheet-col-1-5">10</div>
						<div class="sheet-col-1-5">7</div>
						<div class="sheet-col-1-5">4</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">101-200</div>
						<div class="sheet-col-1-5">3</div>
						<div class="sheet-col-1-5">20</div>
						<div class="sheet-col-1-5">9</div>
						<div class="sheet-col-1-5">9</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">201+</div>
						<div class="sheet-col-1-5">4</div>
						<div class="sheet-col-1-5">No Limt</div>
						<div class="sheet-col-1-5">12</div>
						<div class="sheet-col-1-5">12</div>
					</div>
				</div>
			</div>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_size_newsettlements" step="1" min="1" value="1"><br>New Settlements</div>
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_size_newbuildings" step="1" min="1" value="1"><br>New Buildings</div>
			</div>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_size_improvements" step="1" min="1" value="1"><br>Improvements</div>
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_size_hexcost" step="1" min="1" value="1"><br>Hex Claims</div>
			</div>
			
			<h4 class="sheet-center sheet-town-toggle">Settlement Mods</h4>
			<div class="sheet-row sheet-town-details">
				<div class="sheet-col-1">
					<div class="sheet-row sheet-sub-header">
						<div class="sheet-col-1-5">Pop.</div>
						<div class="sheet-col-1-5">Mod.</div>
						<div class="sheet-col-1-5">Qual.</div>
						<div class="sheet-col-1-5">Dang.</div>
						<div class="sheet-col-1-5">Limit</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">1+</div>
						<div class="sheet-col-1-5">-4</div>
						<div class="sheet-col-1-5">1</div>
						<div class="sheet-col-1-5">-10</div>
						<div class="sheet-col-1-5">50</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">20+</div>
						<div class="sheet-col-1-5">-2</div>
						<div class="sheet-col-1-5">1</div>
						<div class="sheet-col-1-5">-5</div>
						<div class="sheet-col-1-5">200</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">60+</div>
						<div class="sheet-col-1-5">0</div>
						<div class="sheet-col-1-5">2</div>
						<div class="sheet-col-1-5">2</div>
						<div class="sheet-col-1-5">500</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">200+</div>
						<div class="sheet-col-1-5">1</div>
						<div class="sheet-col-1-5">2</div>
						<div class="sheet-col-1-5">0</div>
						<div class="sheet-col-1-5">1k</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">2k+</div>
						<div class="sheet-col-1-5">2</div>
						<div class="sheet-col-1-5">3</div>
						<div class="sheet-col-1-5">5</div>
						<div class="sheet-col-1-5">2k</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">10k+</div>
						<div class="sheet-col-1-5">3</div>
						<div class="sheet-col-1-5">4</div>
						<div class="sheet-col-1-5">5</div>
						<div class="sheet-col-1-5">4k</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">50k+</div>
						<div class="sheet-col-1-5">4</div>
						<div class="sheet-col-1-5">5</div>
						<div class="sheet-col-1-5">10</div>
						<div class="sheet-col-1-5">8k</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-5">250k+</div>
						<div class="sheet-col-1-5">5</div>
						<div class="sheet-col-1-5">5</div>
						<div class="sheet-col-1-5">20</div>
						<div class="sheet-col-1-5">16k</div>
					</div>
				</div>
			</div>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_settlement_modifiers" value="0" step="1"><br>Mod</div>
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_settlement_qualities" value="0" step="1"><br>Qualities</div>
			</div>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_settlement_danger" value="0" step="1"><br>Danger</div>
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_settlement_baselimit" value="0" min="0" step="50"><br>Limit</div>				
			</div>

'''
def kingdomSize():
	print >>f, '''
			<h4 class="sheet-center">Finances</h4>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-core-stat-label">Treasury</div>
				<div class="sheet-col-1-2"><input type="number" name="attr_town_treasury_total" value="0" step="1"></div>
			</div>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-core-stat-label">Income</div>
				<div class="sheet-col-1-2"><input type="number" name="attr_town_income_total" value="@{town_terrain_subtotal_bp}" disabled="disabled"></div>		
			</div>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-core-stat-label">Consump.</div>
				<div class="sheet-col-1-2"><input type="number" name="attr_town_consumption_total" value="@{town_kingdomsize_total}+@{town_numdistricts_total}+@{town_terrain_subtotal_consumption}+@{town_bonus_subtotal_consumption}+@{town_goverment_consumption}+@{town_edict_promotion_consumption}+@{town_edict_holidays_consumption}" disabled="disabled"></div>
			</div>
			<h4 class="sheet-center">Kingdom Size</h4>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-core-stat-label">Hexes</div>
				<div class="sheet-col-1-2"><input type="number" name="attr_town_kingdomsize_total" value="1" min="1" step="1"></div>
			</div>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-core-stat-label">Districts</div>
				<div class="sheet-col-1-2"><input type="number" name="attr_town_numdistricts_total" value="1" min="0" step="1"></div>
			</div>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-core-stat-label">Population</div>
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_settlement_population" value="1" step="1"></div>
			</div>
'''


def kingdomStats():
	print >>f, '''	
			<h4 class="sheet-center">Kingdom Stats</h4>
			<div class="sheet-row">
				<div class="sheet-col-2-17"><input type="number" name="attr_town_unrest_total" value="@{town_unrest_improvements}+@{town_unrest_goverment}+@{town_unrest_other}+@{town_unrest_upkeep}"  disabled="disabled"></div>
				<div class="sheet-col-4-17 sheet-core-stat-label">Unrest</div>
				<div class="sheet-col-1-17"><button type="roll" class="sheet-roll" name="roll_town_unrest" value='/as "Town" Unrest Check: [[d20+ (@{town_unrest_total})]]'></button></div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_unrest_improvements" value="@{town_building_subtotal_unrest}+@{town_terrain_subtotal_unrest}" disabled="disabled"></div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_unrest_goverment" value="@{town_goverment_unrest}" disabled="disabled"></div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_unrest_other" value="@{town_bonus_subtotal_unrest}" disabled="disabled"></div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center">&nbsp;</div>	
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_unrest_upkeep" value="0" step="1"></div>	
			</div>
			<div class="sheet-row">
				<div class="sheet-col-2-17"><input type="number" name="attr_town_stability_total" value="@{town_stability_improvements}+@{town_stability_goverment}+@{town_stability_other}+@{town_stability_upkeep}-(@{town_stability_unrest})"  disabled="disabled"></div>
				<div class="sheet-col-4-17 sheet-core-stat-label">Stability</div>
				<div class="sheet-col-1-17"><button type="roll" class="sheet-roll" name="roll_town_stability" value='/as "Town" Stability Check: [[d20+ (@{town_stability_total})]]'></button></div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_stability_improvements" value="@{town_building_subtotal_stability}+@{town_terrain_subtotal_stability}" disabled="disabled"><br>Impr.</div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_stability_goverment" value="@{town_leadership_subtotal_stability}+@{town_goverment_stability}+@{town_edict_promotion_stability}+@{town_edict_holidays_stability}" disabled="disabled"><br>Gov.</div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_stability_other" value="@{town_bonus_subtotal_stability}" disabled="disabled"><br>Other</div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_stability_unrest" value="@{town_unrest_total}" disabled="disabled"><br>Unrest</div>	
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_stability_upkeep" value="0" step="1"><br>Mod</div>
				</div>
			<div class="sheet-row">
				<div class="sheet-col-2-17"><input type="number" name="attr_town_economy_total" value="@{town_economy_improvements}+@{town_economy_goverment}+@{town_economy_other}-(@{town_economy_unrest})" disabled="disabled"></div>
				<div class="sheet-col-4-17 sheet-core-stat-label">Economy</div>
				<div class="sheet-col-1-17"><button type="roll" class="sheet-roll" name="roll_town_economy" value='/as "Town" Economy Check: [[d20+ (@{town_economy_total})]]'></button></div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_economy_improvements" value="@{town_building_subtotal_economy}+@{town_terrain_subtotal_economy}" disabled="disabled"></div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_economy_goverment" value="@{town_leadership_subtotal_economy}+@{town_goverment_economy}+@{town_edict_taxation_economy}" disabled="disabled"></div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_economy_other" value="@{town_bonus_subtotal_loyalty}" disabled="disabled"></div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_economy_unrest" value="@{town_unrest_total}" disabled="disabled"></div>	
			</div>	
			<div class="sheet-row">
				<div class="sheet-col-2-17"><input type="number" name="attr_town_loyalty_total" value="@{town_loyalty_improvements}+@{town_loyalty_goverment}+@{town_loyalty_other}-(@{town_loyalty_unrest})"  disabled="disabled"></div>
				<div class="sheet-col-4-17 sheet-core-stat-label">Loyalty</div>
				<div class="sheet-col-1-17"><button type="roll" class="sheet-roll" name="roll_town_loyalty" value='/as "Town" Loyalty Check: [[d20+ (@{town_loyalty_total})]]'></button></div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_loyalty_improvements" value="@{town_building_subtotal_loyalty}+@{town_terrain_subtotal_loyalty}" disabled="disabled"><br>Impr.</div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_loyalty_goverment" value="@{town_leadership_subtotal_loyalty}+@{town_goverment_loyalty}+@{town_edict_taxation_loyalty}" disabled="disabled"><br>Gov.</div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_loyalty_other" value="@{town_bonus_subtotal_loyalty}" disabled="disabled"><br>Other</div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_loyalty_unrest" value="@{town_unrest_total}" disabled="disabled"><br>Unrest</div>	
			</div>
			<div class="sheet-row">
				<div class="sheet-col-2-17"><input type="number" name="attr_town_fame_total" value="@{town_fame_size} + @{town_fame_improvements} + @{town_fame_other} + @{town_fame_culture}" disabled="disabled"></div>
				<div class="sheet-col-4-17 sheet-core-stat-label">Fame</div>
				<div class="sheet-col-1-17"><button type="roll" class="sheet-roll" name="roll_town_fame" value='/as "Town" Fame Check: [[d20+ (@{town_fame_total})]]'></button></div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_fame_size" value="0" step="1"><br>Size</div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_fame_improvements" value="@{town_building_subtotal_fame}" disabled="disabled"><br>Impr.</div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_fame_other" value="@{town_bonus_subtotal_fame}+@{town_edict_promotion_fame}" disabled="disabled"><br>Other</div>
				<div class="sheet-col-2-17 sheet-small-label sheet-center"><input type="number" class="sheet-underlined" name="attr_town_fame_culture" value="@{town_lore_total} + @{town_society_total} - (@{town_crime_total})-(@{town_corruption_total})" disabled="disabled"><br>Cult.</div>
			</div>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-core-stat-label">Settlement Base Value</div>
				<div class="sheet-col-1-4"><input type="number" name="attr_town_base_value_total" value="@{town_building_subtotal_base_value}" disabled="disabled"></div>	
			</div>
'''

def settlementStats():
	print >>f, '''		
			<h4 class="sheet-center">Settlement Stats</h4>	
			<div class="sheet-row">
				<div class="sheet-col-2-15"><input type="number" name="attr_town_law_total" value="(@{town_law_settlement})+(@{town_law_goverment})+(@{town_law_other})" disabled="disabled"></div>
				<div class="sheet-col-4-15 sheet-core-stat-label">Law</div>
				<div class="sheet-col-1-15"><button type="roll" class="sheet-roll" name="roll_town_law" value='/as "Town" Law Check: [[d20+ (@{town_law_total})]]'></button></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_law_settlement" value="@{town_building_subtotal_law}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_law_goverment" value="@{town_goverment_law}+@{town_leadership_subtotal_law}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_law_other" value="(@{town_bonus_subtotal_law})" disabled="disabled"></div>			
			</div>
			<div class="sheet-row">
				<div class="sheet-col-2-15"><input type="number" name="attr_town_lore_total" value="(@{town_lore_settlement})+(@{town_lore_goverment})+(@{town_lore_other})" disabled="disabled"></div>
				<div class="sheet-col-4-15 sheet-core-stat-label">Lore</div>
				<div class="sheet-col-1-15"><button type="roll" class="sheet-roll" name="roll_town_lore" value='/as "Town" Lore Check: [[d20+ (@{town_lore_total})]]'></button></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_lore_settlement" value="@{town_building_subtotal_lore}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_lore_goverment" value="@{town_goverment_lore}+@{town_leadership_subtotal_lore}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_lore_other" value="(@{town_bonus_subtotal_lore})" disabled="disabled"></div>			
			</div>
			<div class="sheet-row">
				<div class="sheet-col-2-15"><input type="number" name="attr_town_corruption_total" value="(@{town_corruption_settlement})+(@{town_corruption_goverment})+(@{town_corruption_other})" disabled="disabled"></div>
				<div class="sheet-col-4-15 sheet-core-stat-label">Corrupt.</div>
				<div class="sheet-col-1-15"><button type="roll" class="sheet-roll" name="roll_town_corruption" value='/as "Town" Corruption Check: [[d20+ (@{town_corruption_total})]]'></button></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_corruption_settlement" value="@{town_building_subtotal_corruption}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_corruption_goverment" value="@{town_goverment_corruption}+@{town_leadership_subtotal_corruption}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_corruption_other" value="(@{town_bonus_subtotal_corruption})" disabled="disabled"></div>			
			</div>
			<div class="sheet-row">
				<div class="sheet-col-2-15"><input type="number" name="attr_town_crime_total" value="(@{town_crime_settlement})+(@{town_crime_goverment})+(@{town_crime_other})" disabled="disabled"></div>
				<div class="sheet-col-4-15 sheet-core-stat-label">Crime.</div>
				<div class="sheet-col-1-15"><button type="roll" class="sheet-roll" name="roll_town_crime" value='/as "Town" Crime Check: [[d20+ (@{town_crime_total})]]'></button></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_crime_settlement" value="@{town_building_subtotal_crime}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_crime_goverment" value="@{town_goverment_crime}+@{town_leadership_subtotal_crime}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_crime_other" value="(@{town_bonus_subtotal_crime})" disabled="disabled"></div>			
			</div>
			<div class="sheet-row">
				<div class="sheet-col-2-15"><input type="number" name="attr_town_productivity_total" value="(@{town_productivity_settlement})+(@{town_productivity_goverment})+(@{town_productivity_other})" disabled="disabled"></div>
				<div class="sheet-col-4-15 sheet-core-stat-label">Productivity</div>
				<div class="sheet-col-1-15"><button type="roll" class="sheet-roll" name="roll_town_productivity" value='/as "Town" Productivity Check: [[d20+ (@{town_productivity_total})]]'></button></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_productivity_settlement" value="@{town_building_subtotal_productivity}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_productivity_goverment" value="@{town_goverment_productivity}+@{town_leadership_subtotal_productivity}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_productivity_other" value="(@{town_bonus_subtotal_productivity})" disabled="disabled"></div>			
			</div>
			<div class="sheet-row">
				<div class="sheet-col-2-15"><input type="number" name="attr_town_society_total" value="(@{town_society_settlement})+(@{town_society_goverment})+(@{town_society_other})" disabled="disabled"></div>
				<div class="sheet-col-4-15 sheet-core-stat-label">Society</div>
				<div class="sheet-col-1-15"><button type="roll" class="sheet-roll" name="roll_town_society" value='/as "Town" Society Check: [[d20+ (@{town_society_total})]]'></button></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_society_settlement" value="@{town_building_subtotal_society}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_society_goverment" value="@{town_goverment_society}+@{town_leadership_subtotal_society}" disabled="disabled"></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_society_other" value="(@{town_bonus_subtotal_society})" disabled="disabled"></div>			
			</div>
			<div class="sheet-row">
				<div class="sheet-col-2-15"><input type="number" name="attr_town_defense_total" value="(@{town_defense_improvements})+(@{town_defense_leadership})+(@{town_defense_other})+(@{town_defense_army})" disabled="disabled"></div>
				<div class="sheet-col-4-15 sheet-core-stat-label">Defense</div>
				<div class="sheet-col-1-15"><button type="roll" class="sheet-roll" name="roll_town_defense" value='/as "Town" Defense Check: [[@{town_defense_total}]] [[d20+ (@{town_defense_total})]]'></button></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_defense_improvements" value="@{town_building_subtotal_defense}+@{town_terrain_subtotal_defense}" disabled="disabled"><br>Impr.</div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_defense_leadership" value="@{town_leadership_subtotal_defense}+@{town_goverment_defense}" disabled="disabled"><br>Gov.</div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_defense_other" value="@{town_bonus_subtotal_defense}" disabled="disabled"><br>Other</div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_defense_army" value="0" min="0" step="1"><br>Army</div>				
			</div>
			<div class="sheet-row">
				<div class="sheet-col-2-15"><input type="number" name="attr_town_danger_total" value="(@{town_danger_improvements})+(@{town_danger_fame})+(@{town_danger_other})+(@{town_danger_population})" disabled="disabled"></div>
				<div class="sheet-col-4-15 sheet-core-stat-label">Danger</div>
				<div class="sheet-col-1-15"><button type="roll" class="sheet-roll" name="roll_town_danger" value='/as "Town" Danger Check: [[@{town_danger_total}]] [[d20+ (@{town_danger_total})]]'></button></div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_danger_improvements" value="@{town_settlement_danger}" disabled="disabled"><br>Impr.</div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_danger_fame" value="@{town_fame_total}" disabled="disabled"><br>Fame.</div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_danger_other" value="@{town_bonus_subtotal_danger}" disabled="disabled"><br>Other.</div>
				<div class="sheet-col-2-15 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_danger_population" value="@{town_corruption_total}+@{town_crime_total}-(@{town_law_total})" disabled="disabled"><br>Pop</div>			
			</div>			
'''

def edicts():
	print >>f, '''
			<h4 class="sheet-center">Edicts</h4>
			<div class="sheet-row sheet-sub-header sheet-town-toggle">
				<div class="sheet-col-1-2 sheet-center"><strong>Promotion</strong></div>
				<div class="sheet-col-1-2 sheet-center">
					<select name="attr_town_edict_promotion_number">
						<option value="None">None</option>
						<option value="Token">Token</option>
						<option value="Standard">Standard</option>
						<option value="Aggressive">Aggressive</option>
						<option value="Expansionist">Expansionist</option>
					</select>
				</div>
			</div>
			<div class="sheet-row  sheet-town-details">
				<div class="sheet-col-1 sheet-center">
					<div class="sheet-row sheet-sub-header">
						<div class="sheet-col-1-2 sheet-center">Level</div>
						<div class="sheet-col-1-4 sheet-center">Stab.</div>
						<div class="sheet-col-1-4 sheet-center">Consum.</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-2 sheet-center">None</div>
						<div class="sheet-col-1-4 sheet-center">-1</div>
						<div class="sheet-col-1-4 sheet-center">0</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-2 sheet-center">Token</div>
						<div class="sheet-col-1-4 sheet-center">1</div>
						<div class="sheet-col-1-4 sheet-center">1</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-2 sheet-center">Standard</div>
						<div class="sheet-col-1-4 sheet-center">2</div>
						<div class="sheet-col-1-4 sheet-center">2</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-2 sheet-center">Aggres.</div>
						<div class="sheet-col-1-4 sheet-center">3</div>
						<div class="sheet-col-1-4 sheet-center">4</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-2 sheet-center">Expans.</div>
						<div class="sheet-col-1-4 sheet-center">4</div>
						<div class="sheet-col-1-4 sheet-center">8</div>
					</div>
				</div>
			</div>
			
			<div class="sheet-row">
				<div class="sheet-col-1-3 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_edict_promotion_stability" step="1" value="-1"><br>Stability</div>
				<div class="sheet-col-1-3 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_edict_promotion_fame" step="1" value="0"><br>Fame</div>
				<div class="sheet-col-1-3 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_edict_promotion_consumption" step="1" value="0"><br>Consumption</div>
			</div>
			<div class="sheet-row sheet-sub-header sheet-town-toggle">
				<div class="sheet-col-1-2 sheet-center"><strong>Holidays</strong></div>
				<div class="sheet-col-1-2 sheet-center">
					<select name="attr_town_edict_holidays_number">
						<option value="0">None</option>
						<option value="1">1</option>
						<option value="6">6</option>
						<option value="12">12</option>
						<option value="24">24</option>
						<option value="48">48</option>
						<option value="96">96</option>
					</select>
				</div>
			</div>
			<div class="sheet-row  sheet-town-details">
				<div class="sheet-col-1 sheet-center">
					<div class="sheet-row sheet-sub-header">
						<div class="sheet-col-1-3 sheet-center">Number</div>
						<div class="sheet-col-1-3 sheet-center">Loyal.</div>
						<div class="sheet-col-1-3 sheet-center">Consum.</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-3 sheet-center">0</div>
						<div class="sheet-col-1-3 sheet-center">-1</div>
						<div class="sheet-col-1-3 sheet-center">0</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-3 sheet-center">1</div>
						<div class="sheet-col-1-3 sheet-center">1</div>
						<div class="sheet-col-1-3 sheet-center">1</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-3 sheet-center">6</div>
						<div class="sheet-col-1-3 sheet-center">2</div>
						<div class="sheet-col-1-3 sheet-center">2</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-3 sheet-center">12</div>
						<div class="sheet-col-1-3 sheet-center">3</div>
						<div class="sheet-col-1-3 sheet-center">4</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-3 sheet-center">24</div>
						<div class="sheet-col-1-3 sheet-center">4</div>
						<div class="sheet-col-1-3 sheet-center">8</div>
					</div>
				</div>
			</div>
			
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_edict_holidays_stability" step="1" value="-1"><br>Stability</div>
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_edict_holidays_consumption" step="1" value="0"><br>Consumption</div>
			</div>
			<div class="sheet-row sheet-sub-header sheet-town-toggle">
				<div class="sheet-col-1-2 sheet-center"><strong>Taxation</strong></div>
				<div class="sheet-col-1-2 sheet-center">
					<select name="attr_town_edict_taxation__number">
						<option value="None">None</option>
						<option value="Light">Light</option>
						<option value="Normal">Normal</option>
						<option value="Heavy">Heavy</option>
						<option value="Overwhelming">Overwhelming</option>
					</select>
				</div>
			</div>
			<div class="sheet-row  sheet-town-details">
				<div class="sheet-col-1 sheet-center">
					<div class="sheet-row sheet-sub-header">
						<div class="sheet-col-1-2 sheet-center">Level</div>
						<div class="sheet-col-1-4 sheet-center">Econ.</div>
						<div class="sheet-col-1-4 sheet-center">Loyal.</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-2 sheet-center">None</div>
						<div class="sheet-col-1-4 sheet-center">0</div>
						<div class="sheet-col-1-4 sheet-center">1</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-2 sheet-center">Light</div>
						<div class="sheet-col-1-4 sheet-center">1</div>
						<div class="sheet-col-1-4 sheet-center">-1</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-2 sheet-center">Normal</div>
						<div class="sheet-col-1-4 sheet-center">2</div>
						<div class="sheet-col-1-4 sheet-center">-2</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-2 sheet-center">Heavy</div>
						<div class="sheet-col-1-4 sheet-center">3</div>
						<div class="sheet-col-1-4 sheet-center">-4</div>
					</div>
					<div class="sheet-row">
						<div class="sheet-col-1-2 sheet-center">Overwh.</div>
						<div class="sheet-col-1-4 sheet-center">4</div>
						<div class="sheet-col-1-4 sheet-center">-8</div>
					</div>
				</div>
			</div>
			<div class="sheet-row">
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_edict_taxation_economy" step="1" value="0"><br>Economy</div>
				<div class="sheet-col-1-2 sheet-small-label sheet-center"><input class="sheet-underlined" type="number" name="attr_town_edict_taxation_loyalty" step="1" value="1"><br>Loyalty</div>
			</div>
'''

def leadership():
	attributes = ['Economy', 'Loyalty', 'Stability','Fame','Defense', "Corruption", "Crime", "Law", "Lore", "Productivity", "Society"]
	total = dict()
	for atr in attributes:
		total[atr] = "0"

	outBuilding =""
	for x in range(0,10):
		out = "\t\t"
		
		out +=  "<div class=\"sheet-row sheet-town-toggle\">"	
		out +=  "<div class=\"sheet-col-1-2\"><input type=\"text\" name=\"attr_town_leadership"+str(x)+"_position\" value=\"\"></div>"
		out +=  "<div class=\"sheet-col-1-2\"><input type=\"text\" name=\"attr_town_leadership"+str(x)+"_person\" value=\"\"></div>"
		out +=  "</div>"
		
		out +=  "\n\t\t<div class=\"sheet-row sheet-town-details\">"
		out +=  "\t\t<div class=\"sheet-col-1\">"
		

		for label in attributes:
			label_lower = label.lower().replace(" ", "_")
						
			total[label]  += "+ @{town_leadership"+str(x)+"_"+label_lower+"}"
			out +=  "<div class=\"sheet-town-desc-label\">"+label+"</div>"
			out +=  "<input class=\"sheet-underlined sheet-center\" type=\"number\" name=\"attr_town_leadership"+str(x)+"_"+label_lower+"\" value=\"0\" step=\"1\"><br>"
		
		out +=  "</div>"
		out +=  "</div>\n"
		
		outBuilding += out

	print >>f, '\t\t<h4 class="sheet-center">Leadership</h4>'
	print >>f, '\t\t<div class="sheet-row sheet-sub-header">'
	print >>f, '\t\t\t<div class="sheet-col-1-2 sheet-center sheet-small-label">Position</div>'
	print >>f, '\t\t\t<div class="sheet-col-1-2 sheet-center sheet-small-label">Person</div>'
	print >>f, '\t\t</div>'
	print >>f, outBuilding
	print >>f, "\t\t<div class=\"sheet-row\">"
	for label in ['Economy', 'Loyalty', 'Stability','Fame','Defense']:
		label_lower = label.lower().replace(" ", "_")
		print >>f, "\t\t\t<div class=\"sheet-col-1-5 sheet-small-label sheet-center\"><input type=\"number\" class=\"sheet-underlined\" name=\"attr_town_leadership_subtotal_"+label_lower+"\" disabled=\"disabled\" value=\""+total[label]+"\"><br>"+label+"</div>"
	print >>f, "\t\t</div>"
	print >>f, "\t\t<div class=\"sheet-row\">"
	for label in ["Corruption", "Crime", "Law", "Lore", "Productivity", "Society"]:
		label_lower = label.lower().replace(" ", "_")
		print >>f, "\t\t\t<div class=\"sheet-col-1-6 sheet-small-label sheet-center\"><input type=\"number\" class=\"sheet-underlined\" name=\"attr_town_leadership_subtotal_"+label_lower+"\" disabled=\"disabled\" value=\""+total[label]+"\"><br>"+label[:5]+"</div>"
	print >>f, "\t\t</div>"
	
def bonuses():
	total = dict()
	attributes = ["Economy", "Loyalty", "Stability", "Fame", "Defense", "Unrest", "Corruption", "Crime", "Law", "Lore", "Productivity", "Society", "Consumption", "Danger"]
				
	for atr in attributes:
		total[atr] = "0" 
	outBuilding = dict()
	outBuilding[0] =""
	outBuilding[1] =""
	outBuilding[2] =""
	for x in range(0,30):
		out = "\t\t"
		
		out +=  "<div class=\"sheet-row sheet-town-toggle\">"	
		out +=  "<div class=\"sheet-col-1\"><input type=\"text\" name=\"attr_town_bonus"+str(x)+"_name\" value=\"\"></div>"
		out +=  "</div>"
		
		out +=  "\n\t\t<div class=\"sheet-row sheet-town-details\">"
		out +=  "\t\t<div class=\"sheet-col-1\">"
		

		for label in attributes:
			label_lower = label.lower().replace(" ", "_")
						
			total[label]  += "+ @{town_bonus"+str(x)+"_"+label_lower+"}"
			out +=  "<div class=\"sheet-town-desc-label\">"+label+"</div>"
			out +=  "<input class=\"sheet-underlined sheet-center\" type=\"number\" name=\"attr_town_bonus"+str(x)+"_"+label_lower+"\" value=\"0\" step=\"1\"><br>"
		
		out +=  "</div>"
		out +=  "</div>\n"
		
		outBuilding[x % 3] += out

	print >>f, '\t\t<h4 class="sheet-center">Bonuses</h4>'
	print >>f, '\t\t<div class="sheet-row ">'
	print >>f, '\t\t\t<div class="sheet-col-1-3 sheet-center sheet-small-label">'+outBuilding[0]+'</div>'
	print >>f, '\t\t\t<div class="sheet-col-1-3 sheet-center sheet-small-label">'+outBuilding[1]+'</div>'
	print >>f, '\t\t\t<div class="sheet-col-1-3 sheet-center sheet-small-label">'+outBuilding[2]+'</div>'
	print >>f, '\t\t</div>'
	
	print >>f, "\t\t<div class=\"sheet-row\">"
	for label in ["Economy", "Loyalty", "Stability", "Fame", "Defense", "Unrest", "Corruption"]:
		label_lower = label.lower().replace(" ", "_")
		print >>f, "\t\t\t<div class=\"sheet-col-1-7 sheet-small-label sheet-center\"><input type=\"number\" class=\"sheet-underlined\" name=\"attr_town_bonus_subtotal_"+label_lower+"\" disabled=\"disabled\" value=\""+total[label]+"\"><br>"+label+"</div>"
	print >>f, "\t\t</div>"
	

	print >>f, "\t\t<div class=\"sheet-row\">"
	for label in [ "Crime", "Law", "Lore", "Productivity", "Society", "Consumption", "Danger"]:
		label_lower = label.lower().replace(" ", "_")
		print >>f, "\t\t\t<div class=\"sheet-col-1-7 sheet-small-label sheet-center\"><input type=\"number\" class=\"sheet-underlined\" name=\"attr_town_bonus_subtotal_"+label_lower+"\" disabled=\"disabled\" value=\""+total[label]+"\"><br>"+label+"</div>"
	print >>f, "\t\t</div>"
	
	print >>f, '\t\t</div>'
	
def terrain(filename):
	total = dict()
	total["Quantity"] = "0"
	total["Economy"] = "0"
	total["Loyalty"] = "0"
	total["Stability"] = "0"
	total["Fame"] = "0"
	total["Defense"] = "0"
	total["Unrest"] = "0"
	total["Consumption"] = "0"
	total["BP"] = "0"

	outBuilding = dict();
	outBuilding[0] =""
	outBuilding[1] =""
	outBuilding[2] =""
	outBuilding[3] =""
	x = 0;

	with open(filename, "rb") as cf:
		reader = csv.DictReader(cf, delimiter=",")
		for line in reader:

			out = "\t\t"
			
			total["Quantity"]  += "+@{town_terrain"+str(x)+"_quantity}"
			
			out +=  "<div class=\"sheet-row sheet-town-toggle\">"	
			if line["Name"] == "V" or line["Name"] == "v":
				out +=  "<div class=\"sheet-col-3-4\"><input type=\"text\" name=\"attr_town_terrain"+str(x)+"_name\" value=\"\"></div>"
			else:
				out +=  "<div class=\"sheet-col-3-4\"><input type=\"text\" name=\"attr_town_terrain"+str(x)+"_name\" value=\""+line["Name"]+"\" disabled=\"disabled\"></div>"
			out +=  "<div class=\"sheet-col-1-4\"><input type=\"number\" name=\"attr_town_terrain"+str(x)+"_quantity\" value=\"0\" min=\"0\" step=\"1\" ></div>"
			out +=  "</div>"
			
			out +=  "\n\t\t<div class=\"sheet-row sheet-town-details\">"
			out +=  "<div class=\"sheet-col-1\">"
			
			if line["Cost"] != "":		
				out +=  "<div class=\"sheet-town-desc-label\"><strong>Cost</strong></div>" +line["Cost"]+"<br>"
				
			
			prnt_kingdom = 0
			for label in ['Economy', 'Loyalty', 'Stability','Fame','Defense','Unrest','Consumption','BP']:
				label_lower = label.lower().replace(" ", "_")
				
				if prnt_kingdom == 0:
					out +=  "<strong>Effect</strong><br>"
					prnt_kingdom = 1	
					
				if line[label] != "":
					total[label]  += "+ (@{town_terrain"+str(x)+"_"+label_lower+"} * @{town_terrain"+str(x)+"_quantity})"
					out +=  "<div class=\"sheet-town-desc-label\">"+label+"</div>"
					if line[label] == "V" or line[label] == "v":
						out +=  "<input class=\"sheet-underlined sheet-center\" type=\"number\" name=\"attr_town_terrain"+str(x)+"_"+label_lower+"\" value=\"0\" step=\"1\" ><br>"
					else:
						out +=  "<input class=\"sheet-underlined sheet-center\" type=\"number\" name=\"attr_town_terrain"+str(x)+"_"+label_lower+"\" value=\""+line[label]+"\" step=\"1\" disabled=\"disabled\"><br>"


			if line["Terrain"] != "":		
				out +=  "<strong>Terrain</strong> " + line["Terrain"]+"<br>"
			if line["Effect"] != "":	
				out +=  "<strong>Effect</strong> " + line["Effect"]+"<br>"
			if line["Description"] != "":	
				out += "<br>"+line["Description"]
			
			out +=  "</div>"
			out +=  "</div>\n"
			
			outBuilding[x % 4] += out
			
			x += 1
	print >>f, "<h4 class=\"sheet-center sheet-town-toggle\">Terrain</h4>"
	print >>f, "<div class=\"sheet-row sheet-town-details\">"
	print >>f, "\t<div class=\"sheet-col-1\">"
	
	print >>f, "\t\t<div class=\"sheet-row sheet-sub-header\">"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Terrain</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Exploration Time</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Preperation Time</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Preperation Cost</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Farm Cost</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Road Cost</div>"
	print >>f, "\t\t</div>"
	print >>f, "\t\t<div class=\"sheet-row\">"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Cavern</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">3 days</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">3 months</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">8BP</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">N/A</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">4BP</div>"
	print >>f, "\t\t</div>"
	print >>f, "\t\t<div class=\"sheet-row\">"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Desert</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">2 days</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">1 month</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">4BP</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">8BP</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">4BP</div>"
	print >>f, "\t\t</div>"
	print >>f, "\t\t<div class=\"sheet-row\">"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Forest</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">2 days</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">2 months</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">4BP</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">N/A</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">2BP</div>"
	print >>f, "\t\t</div>"
	print >>f, "\t\t<div class=\"sheet-row\">"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Hills</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">1 day</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">1 month</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">4BP</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">8BP</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">4BP</div>"
	print >>f, "\t\t</div>"
	print >>f, "\t\t<div class=\"sheet-row\">"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Jungle</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">2 days</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">4 months</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">12BP</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">N/A</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">4BP</div>"
	print >>f, "\t\t</div>"
	print >>f, "\t\t<div class=\"sheet-row\">"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Marsh</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">3 days</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">3 months</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">8BP</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">N/A</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">4BP</div>"
	print >>f, "\t\t</div>"
	print >>f, "\t\t<div class=\"sheet-row\">"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Mountains</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">3 days</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">4 months</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">12BP</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">N/A</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">4BP</div>"
	print >>f, "\t\t</div>"
	print >>f, "\t\t<div class=\"sheet-row\">"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Plains</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">1 day</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Immediate</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">1BP</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">2BP</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">1BP</div>"
	print >>f, "\t\t</div>"
	print >>f, "\t\t<div class=\"sheet-row\">"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">Water</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">2 days</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">N/A</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">N/A</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">N/A</div>"
	print >>f, "\t\t\t<div class=\"sheet-col-1-6\">N/A</div>"
	print >>f, "\t\t</div>"
	print >>f, "\t</div>"
	print >>f, "</div>"
	
	print >>f, '<div class="sheet-row">'
	print >>f, "\t<div class=\"sheet-col-1-4\">\n"+outBuilding[0]+"\t</div>"
	print >>f, "\t<div class=\"sheet-col-1-4\">\n"+outBuilding[1]+"\t</div>"
	print >>f, "\t<div class=\"sheet-col-1-4\">\n"+outBuilding[2]+"\t</div>"
	print >>f, "\t<div class=\"sheet-col-1-4\">\n"+outBuilding[3]+"\t</div>"
	print >>f, '</div>'
			
	print >>f, "<div class=\"sheet-row\">"
	for label in ['Quantity', 'Economy', 'Loyalty', 'Stability','Fame','Defense','Unrest','Consumption','BP']:
		label_lower = label.lower().replace(" ", "_")
		print >>f, "	<div class=\"sheet-col-1-9 sheet-small-label sheet-center\"><input type=\"number\" class=\"sheet-underlined\" name=\"attr_town_terrain_subtotal_"+label_lower+"\" disabled=\"disabled\" value=\""+total[label]+"\"><br>"+label+"</div>"
	print >>f, "</div>"
	
def buildings(filename):
	total = dict()
	total["Quantity"] = "0"
	total["Economy"] = "0"
	total["Loyalty"] = "0"
	total["Stability"] = "0"
	total["Fame"] = "0"
	total["Defense"] = "0"
	total["Unrest"] = "0"
	total["Corruption"] = "0"
	total["Crime"] = "0"
	total["Law"] = "0"
	total["Lore"] = "0"
	total["Productivity"] = "0"
	total["Society"] = "0"
	total["Base Value"] = "0"


	outBuilding = dict();
	outBuilding[0] =""
	outBuilding[1] =""
	outBuilding[2] =""
	outBuilding[3] =""
	x = 0;

	with open(filename, "rb") as cf:
		reader = csv.DictReader(cf, delimiter=",")
		for line in reader:

			out = "\t\t"
			
			total["Quantity"]  += "+@{town_building"+str(x)+"_quantity}"
			
			out +=  "<div class=\"sheet-row sheet-town-toggle\">"	
			if line["Name"] == "V" or line["Name"] == "v":
				out +=  "<div class=\"sheet-col-3-4\"><input type=\"text\" name=\"attr_town_building"+str(x)+"_name\" value=\"\"></div>"
			else:
				out +=  "<div class=\"sheet-col-3-4\"><input type=\"text\" name=\"attr_town_building"+str(x)+"_name\" value=\""+line["Name"]+"\" disabled=\"disabled\"></div>"
			out +=  "<div class=\"sheet-col-1-4\"><input type=\"number\" name=\"attr_town_building"+str(x)+"_quantity\" value=\"0\" min=\"0\" step=\"1\" ></div>"
			out +=  "</div>"
			
			out +=  "\n\t\t<div class=\"sheet-row sheet-town-details\">"
			out +=  "<div class=\"sheet-col-1\">"
			
			if line["Cost"] != "":		
				out +=  "<div class=\"sheet-town-desc-label\"><strong>Cost</strong> " +line["Cost"]+"</div>"
				
			if line["Lots"] != "":		
				out +=  "<div class=\"sheet-town-desc-label\"><strong>Lots</strong> " + line["Lots"]+"</div>"
			
			if line["Lots"] != "" or line["Lots"] != "":
				out += "<br>"
			
			prnt_kingdom = 0
			for label in ['Economy', 'Loyalty', 'Stability','Fame','Defense','Unrest']:
				label_lower = label.lower().replace(" ", "_")
				
				if prnt_kingdom == 0:
					out +=  "<strong>Kingdom</strong><br>"
					prnt_kingdom = 1	
					
				if line[label] != "":
					total[label]  += "+ (@{town_building"+str(x)+"_"+label_lower+"} * @{town_building"+str(x)+"_quantity})"
					out +=  "<div class=\"sheet-town-desc-label\">"+label+"</div>"
					if line[label] == "V" or line[label] == "v":
						out +=  "<input class=\"sheet-underlined sheet-center\" type=\"number\" name=\"attr_town_building"+str(x)+"_"+label_lower+"\" value=\"0\" step=\"1\" ><br>"
					else:
						out +=  "<input class=\"sheet-underlined sheet-center\" type=\"number\" name=\"attr_town_building"+str(x)+"_"+label_lower+"\" value=\""+line[label]+"\" step=\"1\" disabled=\"disabled\"><br>"

			prnt_settlement = 0
			for label in ['Corruption', 'Crime', 'Law','Lore','Productivity','Society','Base Value']:
				label_lower = label.lower().replace(" ", "_")
				if line[label] != "":
					
					if prnt_settlement == 0:
						out +=  "<strong>Settlement</strong><br>"
						prnt_settlement = 1	
					
					total[label]  += "+ (@{town_building"+str(x)+"_"+label_lower+"} * @{town_building"+str(x)+"_quantity})"
					out +=  "<div class=\"sheet-town-desc-label\">"+label+"</div>"
					if line[label] == "V" or line[label] == "v":
						out +=  "<input class=\"sheet-underlined sheet-center\" type=\"number\" name=\"attr_town_building"+str(x)+"_"+label_lower+"\" value=\"0\" step=\"1\" ><br>"
					else:
						out +=  "<input class=\"sheet-underlined sheet-center\" type=\"number\" name=\"attr_town_building"+str(x)+"_"+label_lower+"\" value=\""+line[label]+"\" step=\"1\" disabled=\"disabled\"><br>"
				
			if line["Discount"] != "":		
				out +=  "<strong>Discount</strong> " + line["Discount"]+"<br>"
			if line["Upgrade From"] != "":	
				out +=  "<strong>Upgrade From</strong> " + line["Upgrade From"]+"<br>"
			if line["Upgrade To"] != "":	
				out +=  "<strong>Upgrade To</strong> " + line["Upgrade To"]+"<br>"
			if line["Special"] != "":	
				out +=  "<strong>Special</strong> " + line["Special"]+"<br>"
			if line["Description"] != "":	
				out += "<br>"+line["Description"]
			
			out +=  "</div>"
			out +=  "</div>\n"
			
			outBuilding[x % 4] += out
			
			x += 1

	print >>f, '<h4 class="sheet-center">Buildings</h4>'
	print >>f, '<div class="sheet-row">'
	print >>f, "\t<div class=\"sheet-col-1-4\">\n"+outBuilding[0]+"\t</div>"
	print >>f, "\t<div class=\"sheet-col-1-4\">\n"+outBuilding[1]+"\t</div>"
	print >>f, "\t<div class=\"sheet-col-1-4\">\n"+outBuilding[2]+"\t</div>"
	print >>f, "\t<div class=\"sheet-col-1-4\">\n"+outBuilding[3]+"\t</div>"
	print >>f, '</div>'
			
	print >>f, "<div class=\"sheet-row\">"
	for label in ['Quantity', 'Economy', 'Loyalty','Stability','Fame','Defense','Unrest','Corruption', 'Crime', 'Law','Lore','Productivity','Society','Base Value']:
		label_lower = label.lower().replace(" ", "_")
		print >>f, "	<div class=\"sheet-col-1-14 sheet-small-label sheet-center\"><input type=\"number\" class=\"sheet-underlined\" name=\"attr_town_building_subtotal_"+label_lower+"\" disabled=\"disabled\" value=\""+total[label]+"\"><br>"+label+"</div>"
	print >>f, "</div>"

	
	
	
 
# Generate page
print >>f, "<!-- Town Sheet -->"
#print >>f, "<div class=\"sheet-town\">"
	
turnMacros()
	
print >>f, '<div class="sheet-row">'
print >>f, '\t<div class="sheet-col-1-4 sheet-padr sheet-margin-top">'
kingdomSize()
print >>f, "\t</div>"
print >>f, '\t<div class="sheet-col-1-4 sheet-padr sheet-margin-top">'
income()	
print >>f, "\t</div>"
print >>f, '\t<div class="sheet-col-1-4 sheet-padr sheet-margin-top">'
goverment()	
print >>f, "\t</div>"
print >>f, '\t<div class="sheet-col-1-4 sheet-padr sheet-margin-top">'
edicts()	
print >>f, "\t</div>"
print >>f, "</div>"

print >>f, '<div class="sheet-row">'
print >>f, '\t<div class="sheet-col-8-15 sheet-padr sheet-margin-top">'
kingdomStats()
print >>f, "\t</div>"
print >>f, '\t<div class="sheet-col-7-15 sheet-padr sheet-margin-top">'
settlementStats()	
print >>f, "\t</div>"
print >>f, "</div>"

print >>f, '<div class="sheet-row">'
print >>f, '\t<div class="sheet-col-1-3 sheet-padr sheet-margin-top">'
leadership()
print >>f, "\t</div>"
print >>f, '\t<div class="sheet-col-2-3 sheet-padr sheet-margin-top">'
bonuses()
print >>f, "\t</div>"

print >>f, "</div>"	

terrain("terrain.csv")	
buildings("buildings.csv")

#print >>f, "</div>"	
print >>f, "<!-- End Town Sheet -->"