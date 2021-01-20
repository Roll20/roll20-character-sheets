//Traveller:TNE Cargo-Macro

Dette må bli et javascript fordi det er for mange elementer med - så her må vi tenke med fingrene

Informasjon som må inn:
	Source 
		Source world population "source_population"
		Tech Level "source_tl"
		Atmosphere "source_atmosphere"
		Size "source_size"
		Hydrographic "source_hydrographic"
		Government "source_government"
		Law Level "source_lawlevel"
		Source Starport "source_starport"

	Destination	
		Destination world population "destination_population"
		Tech level "destination_tl"
		travel zone "destination_zone"

	Crew
		Service skill "service_skill"
		Admin/Legal "adminlegal_skill"
		Streetwise skill "streetwise_skill"
		Liason skill "liason_skill"

	Valg
		Cargo eller Freight "cargo" "freight"			

Passasjerer
	if source_population < 11
		random nr mellom 3 og 18
			etc
	til en var som er "high_passage"	
		if destination_population < 5
			trekkes 3 fra "high_passage"
		else if destination_population > 7
			leggges 1 til "high_passage"
		else så skjer det ikke noe mer
	så
		if destination_zone == "red"
			trekkes 8 fra "high_passage"
		else if destination_zone == "amber"
			trekkes 4 fra "high_passage"
		else så skjer det ikke noe mer
	så
		"service_skill"/2 (rundet ned) legges til "high_passage"
	så
		"source_tl" - "destination_tl" legges til "high_passage" 	

	tilsvarende for "low_passage" og "middle_passage" - med unntak av at "red" "destination_zone" fører til 0 passasjerer, 
	og adminlegal_skill og streetwise_skill legges til hhv til middle_passage og low_passage.
	
	til slutt "high_passage_income" som er 10000 Cr pr "high_passage" og tilsvarende for de to andre

	Til slutt postes disse til chatten - ideelt på en lazyloot aktig måte slik at det kan velges og overføres til skipet.

Freight and Cargo
		if source_population < 11
			random nr mellom 7 og 12 til var "major_lots"
	så
		if destination_population < 5
			trekkes 3 fra "major_lots"
		else if destination_population > 7
			legges 1 til "major_lots"		
	så
		"source_tl" - "destination_tl" leggges til "major_lots"	

	etc og tilsvarende for "minor_lots" og "incidental_lots"

	så
		if "cargo_freight" == "freight"
			ganges "major_lots" med et tilfeldig tall mellom 2 og 16 som legges til en var "freigt_tonnes"

	så tilsvarende for minor_lots og incidental_lots
	så
		if "destination_zone" == "red" så ganges "freigt_tonnes" med 5000 for å gi "freight_value"  
		else if "destination_zone" == "amber" ganges "freigt_tonnes" med 2000 for å gi "freight_value"
		else ganges "freigt_tonnes" med 1000 for å gi "freight_value"

		else if "cargo_freight" == "cargo"	
	så må "major_lots" på noe vis bestemme hvor mange ganger de ulike tabellene skal kastes på
		if "major_lots"	< 2
			