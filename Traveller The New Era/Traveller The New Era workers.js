	//Ship design
	//Hull
	//Calculate Volume, Size, intial length and material volume
	on ("change:ship_displacement", function () {
		getAttrs(["Ship_Displacement", "Ship_Volume", "Ship_Initial_MV", "Ship_Initial_LM", "Ship_Size"], function (values) {
			var Ship_Displacement = values.Ship_Displacement;
			var Ship_Volume = (Ship_Displacement*14);
			var Ship_Initial_MV = (3.14**(1/3))*((6*Ship_Volume)**(2/3))*0.01;
			var Ship_Initial_LM = (((3*(Ship_Volume+Ship_Initial_MV))/(4*3.14))**(1/3)*2);
			var Ship_Size;	
			if (Ship_Displacement < 1) {
			Ship_Size = "SM (Sub Micro)" 
			} else if (Ship_Displacement < 10) {
			Ship_Size = "Mc (Micro)"	
			} else if (Ship_Displacement < 100) {
				Ship_Size = "S (Small)"
			} else if (Ship_Displacement < 1000) {
				Ship_Size = "M (Medium)"
			}	else if (Ship_Displacement < 10000) {
				Ship_Size = "L (Large)"
			} 	else if (Ship_Displacement < 100000) {
				Ship_Size = "VL (Very Large)"
			} else {
				Ship_Size = "G (Gigantic)"
			} setAttrs ({Ship_Initial_MV:Ship_Initial_MV, Ship_Initial_LM:Ship_Initial_LM, Ship_Initial_Volume:Ship_Initial_Volume, Ship_Size:Ship_Size});
		});
	});

//Calculate Ship Length, Surface Area, Price modifier and adjusted material volume
	on ("change:hull_form change:ship_displacement" , function () {
		getAttrs (["Hull_Form", "Adjusted_MV", "Ship_Length", "Ship_Configuration_Price_Modifier", "Ship_Initial_MV", "Ship_Initial_LM", "Ship_Surface"], function (values) {
			var Hull_Form = values.Hull_Form;
			var Ship_Initial_MV = values.Ship_Initial_MV;
			var Ship_Initial_LM = values.Ship_Initial_LM;
			var Adjusted_MV;
			var Ship_Length;
			var Ship_Surface;
			var Ship_Configuration_Price_Modifier;
			if (Hull_Form == "Open Frame") {
				Adjusted_MV = (Ship_Initial_MV*2)
				Ship_Length = (Ship_Initial_LM*3.5)
				Ship_Configuration_Price_Modifier = 0.3
				Ship_Surface = (Ship_Initial_MV)*100
			} else if (Hull_Form == "Needle") {
				Ship_Configuration_Price_Modifier = 0.7
				Adjusted_MV = (Ship_Initial_MV*1.3)
				Ship_Length = (Ship_Initial_LM*3)
				Ship_Surface = (Adjusted_MV)*100	
			} else if (Hull_Form == "Needle Streamlined") {
				Adjusted_MV = (Ship_Initial_MV*1.3)
				Ship_Length = (Ship_Initial_LM*3)
				Ship_Configuration_Price_Modifier = 0.8
				Ship_Surface = (Adjusted_MV)*100	
			} else if (Hull_Form == "Needle Airframe") {
				Ship_Configuration_Price_Modifier = 1.5
				Adjusted_MV = ((Ship_Initial_MV*1.3)*1.3)
				Ship_Length = (Ship_Initial_LM*3)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Wedge") {
				Ship_Configuration_Price_Modifier = 0.5
				Adjusted_MV = (Ship_Initial_MV*1.5)
				Ship_Length = (Ship_Initial_LM*2.5)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Wedge Streamlined") {
				Ship_Configuration_Price_Modifier = 0.7
				Adjusted_MV = (Ship_Initial_MV*1.5)
				Ship_Length = (Ship_Initial_LM*2.5)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Wedge Airframe") {
				Ship_Configuration_Price_Modifier = 0.5
				Adjusted_MV = ((Ship_Initial_MV*1.5)*1.3)
				Ship_Length = (Ship_Initial_LM*2.5)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Cylinder") {
				Ship_Configuration_Price_Modifier = 0.6
				Adjusted_MV = (Ship_Initial_MV*1.1)
				Ship_Length = (Ship_Initial_LM*2)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Cylinder Streamlined") {
				Ship_Configuration_Price_Modifier = 0.8
				Adjusted_MV = (Ship_Initial_MV*1.1)
				Ship_Length = (Ship_Initial_LM*2)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Cylinder Airframe") {
				Ship_Configuration_Price_Modifier = 2
				Adjusted_MV = ((Ship_Initial_MV*1.1)*1.3)
				Ship_Length = (Ship_Initial_LM*2)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Box") {
				Ship_Configuration_Price_Modifier = 0.4
				Adjusted_MV = (Ship_Initial_MV*1.1)
				Ship_Length = (Ship_Initial_LM*2)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Box Streamlined") {
				Ship_Configuration_Price_Modifier = 0.6
				Adjusted_MV = (Ship_Initial_MV*1.1)
				Ship_Length = (Ship_Initial_LM*2)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Sphere") {
				Ship_Configuration_Price_Modifier = 0.8
				Adjusted_MV = (Ship_Initial_MV*1)
				Ship_Length = (Ship_Initial_LM*1)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Sphere Streamlined") {
				Ship_Configuration_Price_Modifier = 1
				Adjusted_MV = (Ship_Initial_MV*1)
				Ship_Length = (Ship_Initial_LM*1)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Dome/Disc") {
				Ship_Configuration_Price_Modifier = 1.4
				Adjusted_MV = (Ship_Initial_MV*1.2)
				Ship_Length = (Ship_Initial_LM*1.5)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Dome/Disc Streamlined") {
				Ship_Configuration_Price_Modifier = 1.6
				Adjusted_MV = (Ship_Initial_MV*1.2)
				Ship_Length = (Ship_Initial_LM*1.5)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Dome/Disc Airframe") {
				Ship_Configuration_Price_Modifier = 1.2
				Adjusted_MV = ((Ship_Initial_MV*1.2)*1.3)
				Ship_Length = (Ship_Initial_LM*1.5)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Close Structure") {
				Ship_Configuration_Price_Modifier = 0.3
				Adjusted_MV = (Ship_Initial_MV*1.4)
				Ship_Length = (Ship_Initial_LM*1.5)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Slab") {
				Ship_Configuration_Price_Modifier = 0.5
				Adjusted_MV = (Ship_Initial_MV*1.5)
				Ship_Length = (Ship_Initial_LM*2.75)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form == "Slab Streamlined") {
				Ship_Configuration_Price_Modifier = 0.7
				Adjusted_MV = (Ship_Initial_MV*1.5)
				Ship_Length = (Ship_Initial_LM*2.75)
				Ship_Surface = (Adjusted_MV)*100
			}	else if (Hull_Form = "Slab Airframe") {
				Ship_Configuration_Price_Modifier = 1.5
				Adjusted_MV = ((Ship_Initial_MV*1.5)*1.3)
				Ship_Length = (Ship_Initial_LM*2.75)
				Ship_Surface = (Adjusted_MV)*100
			} else {
				Ship_Configuration_Price_Modifier = 0
				Adjusted_MV = ((Ship_Initial_MV*1.5)*0)
				Ship_Length = (Ship_Initial_LM*0)
				Ship_Surface = (Adjusted_MV)*100
			} setAttrs ({Ship_Configuration_Price_Modifier:Ship_Configuration_Price_Modifier, Adjusted_MV:Adjusted_MV, Ship_Length:Ship_Length, Ship_Surface:Ship_Surface})	
			});
		});

//Calculate Minimum Armor
		on ("change:g_rating" , function () {
		getAttrs (["G_Rating"], function (values) {
			var G_Rating = values.G_Rating;
			var Min_Armor;
			if (G_Rating < 1) {
				Min_Armor = 1
			} else {
				Min_Armor = (G_Rating*10)
			} setAttrs ({Min_Armor:Min_Armor})
			});
		});


//Calculate Tech Level - dosent currently compile
		on ("change:hull_tech_level change:jump_drive_tech_level change:control_tech_level" , function () {
		getAttrs (["Hull_Tech_Level, Ship_Tech_Level, Jump_Drive_Tech_Level, Control_Tech_Level, Minimum_Tech_Level"], function (values) {
			var Hull_Tech_Level = values.Hull_Tech_Level
      		var Jump_Drive_Tech_Level = values.Jump_Drive_Tech_Level
      		var Control_Tech_Level = values.Control_Tech_Level
      		var Minimum_Tech_Level = Math.max(Hull_Tech_Level, Jump_Drive_Tech_Level, Control_Tech_Level)
			} setAttrs ({Minimum_Tech_Level:Minimum_Tech_Level})
			});
		


//Calculate Hull Armor, Tech Level, Material Weight and Cost - Uses thickness and material to determine armor value. Could be done other way around as well?
		on ("change:hull_thickness change:hull_material" , function () {
		getAttrs (["Hull_Thickness", "Hull_Material", "Hull_Armor", "Hull_Cost", "Hull_Material_Mass", "Hull_Cost", "Adjusted_MV", "Hull_Tech_Level"], function (values) {
			var Hull_Thickness = values.Hull_Thickness;
			var Adjusted_MV = values.Adjusted_MV
			var Hull_Material;
			var Hull_Armor;
			var Hull_Material_Mass
			var Hull_Cost
			var Hull_Tech_Level 
			if (Hull_Material == "Soft Steel") {
				Hull_Armor = Hull_Thickness*1.7;
				Hull_Material_Mass = (Adjusted_MV*8)
				Hull_Cost =  (Adjusted_MV*0.0016)
				Hull_Tech_Level = 5
			} else if {
				(Hull_Material == "Hard Steel") {
				Hull_Armor = Hull_Thickness*2;	
				Hull_Material_Mass = (Adjusted_MV*8)*(Hull_Thickness)
				Hull_Cost = (Adjusted_MV*0.002)*(Hull_Thickness)
				Hull_Tech_Level = 6
			} else if {
				(Hull_Material == "Light Alloy") {
				Hull_Armor = Hull_Thickness*1.7;
				Hull_Material_Mass = (Adjusted_MV*6)*(Hull_Thickness)
				Hull_Cost = (Adjusted_MV*0.004)*(Hull_Thickness)
				Hull_Tech_Level = 6
			} else if {
				(Hull_Material == "Composite") {
				Hull_Armor = Hull_Thickness*4;
				Hull_Material_Mass = (Adjusted_MV*7)*(Hull_Thickness)
				Hull_Cost = (Adjusted_MV*0.007)*(Hull_Thickness)
				Hull_Tech_Level = 7
			} else if {
				(Hull_Material == "Composite Laminate") {
				Hull_Armor = Hull_Thickness*6;
				Hull_Material_Mass = (Adjusted_MV*8)*(Hull_Thickness)
				Hull_Cost = (Adjusted_MV*0.008)*(Hull_Thickness)
				Hull_Tech_Level = 8
			} else if {
				(Hull_Material == "Crystaliron") {
				Hull_Armor = Hull_Thickness*8;
				Hull_Material_Mass = (Adjusted_MV*10)*(Hull_Thickness)
				Hull_Cost = (Adjusted_MV*0.009)*(Hull_Thickness)
				Hull_Tech_Level = 10
			} else if {
				(Hull_Material == "Superdense (SD)") {
				Hull_Armor = Hull_Thickness*14;
				Hull_Material_Mass = (Adjusted_MV*15)*(Hull_Thickness)
				Hull_Cost = (Adjusted_MV*0.014)*(Hull_Thickness)
				Hull_Tech_Level = 12
			} else if {
				(Hull_Material == "Bonded SD") {
				Hull_Armor = Hull_Thickness*28;
				Hull_Material_Mass = (Adjusted_MV*15)*(Hull_Thickness)
				Hull_Cost = (Adjusted_MV*0.028)*(Hull_Thickness)
				Hull_Tech_Level = 14
			} else if {
				(Hull_Material == "Bonded Coherent SD") {
				Hull_Armor = Hull_Thickness*40;
				Hull_Material_Mass = (Adjusted_MV*15)
				Hull_Cost = (Adjusted_MV*0.035)
				Hull_Tech_Level = 7				
			} else {
				Min_Armor = (G_Rating*10)
			} setAttrs ({Min_Armor:Min_Armor, Hull_Material_Mass:Hull_Material_Mass, Hull_Cost:Hull_Cost})
			});
		});

		//Calculates Jump Drive details
		on ("change:max_jump change:ship_volume" , function () {
		getAttrs (["Max_Jump", "Ship_Volume"], function (values) {
			var Max_Jump = values.Max_Jump;
			var Ship_Volume = values.Ship_Volume
			var Jump_Drive_Volume;
			var Jump_Drive_Area;
			var Jump_Drive_Mass;
			var Jump_Drive_Cost;
			var Jump_Drive_Tech_Level;
			var Fuel_Parsec;
			if (Max_Jump == 0) {
				Jump_Drive_Volume = 0
				Jump_Drive_Area = 0
				Jump_Drive_Mass = 0
				Jump_Drive_Cost = 0
				Jump_Drive_Tech_Level = 0
			} else if (Max_Jump == 1) {
				Jump_Drive_Volume = (Ship_Volume)*((1+(Max_Jump))/100)
				Jump_Drive_Mass = (Jump_Drive_Volume*3)
				Jump_Drive_Area = (Jump_Drive_Volume/3)
				Jump_Drive_Cost = (Jump_Drive_Volume*0.3)
				Jump_Drive_Tech_Level = 9
			} else if (Max_Jump == 2) {
				Jump_Drive_Volume = (Ship_Volume)*((1+(Max_Jump))/100)
				Jump_Drive_Mass = (Jump_Drive_Volume*3)
				Jump_Drive_Area = (Jump_Drive_Volume/3)
				Jump_Drive_Cost = (Jump_Drive_Volume*0.3)
				Jump_Drive_Tech_Level = 12
			} else if (Max_Jump == 3) {
				Jump_Drive_Volume = (Ship_Volume)*((1+(Max_Jump))/100)
				Jump_Drive_Mass = (Jump_Drive_Volume*3)
				Jump_Drive_Area = (Jump_Drive_Volume/3)
				Jump_Drive_Cost = (Jump_Drive_Volume*0.3)
				Jump_Drive_Tech_Level = 12
			} else if (Max_Jump == 4) {
				Jump_Drive_Volume = (Ship_Volume)*((1+(Max_Jump))/100)
				Jump_Drive_Mass = (Jump_Drive_Volume*3)
				Jump_Drive_Area = (Jump_Drive_Volume/3)
				Jump_Drive_Cost = (Jump_Drive_Volume*0.3)
				Jump_Drive_Tech_Level = 13
			} else if (Max_Jump == 5) {
				Jump_Drive_Volume = (Ship_Volume)*((1+(Max_Jump))/100)
				Jump_Drive_Mass = (Jump_Drive_Volume*2.5)
				Jump_Drive_Area = (Jump_Drive_Volume/3)
				Jump_Drive_Cost = (Jump_Drive_Volume*0.3)
				Jump_Drive_Tech_Level = 14		
			} else if (Max_Jump == 6) {
				Jump_Drive_Volume = (Ship_Volume)*((1+(Max_Jump))/100)
				Jump_Drive_Mass = (Jump_Drive_Volume*2)
				Jump_Drive_Area = (Jump_Drive_Volume/3)
				Jump_Drive_Cost = (Jump_Drive_Volume*0.3)
				Jump_Drive_Tech_Level = 15 
			} setAttrs ({Jump_Drive_Volume:Jump_Drive_Volume, Jump_Drive_Mass:Jump_Drive_Mass, Jump_Drive_Area:Jump_Drive_Area, Jump_Drive_Cost:Jump_Drive_Cost, Jump_Drive_Tech_Level:Jump_Drive_Tech_Level})
			});
		});

		//Calculates Control System details
		on ("change:ship_controls change:ship_displacement" , function () {
		getAttrs (["Ship_Control", "Ship_Displacement"], function (values) {
			var Ship_Control = values.Ship_Control;
			var Ship_Displacement = values.Ship_Displacement
			var Control_Volume;
			var Control_Mass;
			var Control_Cost;
			var Control_Tech_Level;
			var Control_Power;
			if (Ship_Control == "Basic Mechanical") {
				Control_Volume = Ship_Displacement*0.014
				Control_Mass = Ship_Displacement*0.0014
				Control_Cost = Ship_Displacement*0.0002
				Control_Power = Ship_Displacement*0
				Control_Tech_Level = 5
			} else if (Ship_Control == "Enhanced Mechanical") {
				Control_Volume = Ship_Displacement*0.014
				Control_Mass = Ship_Displacement*0.0014
				Control_Cost = Ship_Displacement*0.0003
				Control_Power = Ship_Displacement*0.0002
				Control_Tech_Level = 6
			} else if (Ship_Control == "Electronic") {
				Control_Volume = Ship_Displacement*0.014
				Control_Mass = Ship_Displacement*0.0014
				Control_Cost = Ship_Displacement*0.0005
				Control_Power = Ship_Displacement*0.0005
				Control_Tech_Level = 7
			} else if (Ship_Control == "Enhanced Electronic") {
				Control_Volume = Ship_Displacement*0.014
				Control_Mass = Ship_Displacement*0.0014
				Control_Cost = Ship_Displacement*0.00075
				Control_Power = Ship_Displacement*0.0005
				Control_Tech_Level = 8
			} else if (Ship_Control == "Computer Linked") {
				Control_Volume = Ship_Displacement*0.014
				Control_Mass = Ship_Displacement*0.0014
				Control_Cost = Ship_Displacement*0.001
				Control_Power = Ship_Displacement*0.0005
				Control_Tech_Level = 9
			} else if (Ship_Control == "Dynamic Linked") {
				Control_Volume = Ship_Displacement*0.014
				Control_Mass = Ship_Displacement*0.0014
				Control_Cost = Ship_Displacement*0.0015
				Control_Power = Ship_Displacement*0.001
				Control_Tech_Level = 10
			} else if (Ship_Control == "Holograpich Linked") {
				Control_Volume = Ship_Displacement*0.014
				Control_Mass = Ship_Displacement*0.0014
				Control_Cost = Ship_Displacement*0.002
				Control_Power = Ship_Displacement*0.001
				Control_Tech_Level = 13				 
			} setAttrs ({Control_Volume:Control_Volume, Control_Mass:Control_Mass, Control_Cost:Control_Cost, Control_Tech_Level:Control_Tech_Level, Control_Power:Control_Power})
			});
		});

	//Homeworld data
			on ("change:homeworldnumber", function () {
			getAttrs(["HomeworldNumber", "Starport", "Planetsize", "Atmosphere", "Hydrosphere", "Population", "Govlevel", "Lawlevel", "Techlevel", "Homeworld"], function (values) {
				var homeworldnumber = values.HomeworldNumber
				var starport;
				var planetsize;
				var atmosphere;
				var hydrosphere;
				var population;
				var govlevel;
				var lawlevel;
				var techlevel;
			if (homeworldnumber < 1 ) {
				starport = "B"
				planetsize = 8
				atmosphere = 4
				hydrosphere = 6
				population = 8
				govlevel = 5
				lawlevel = 7
				techlevel = 9
				homeworld = "Oriflamme"
			} else if (homeworldnumber < 2 ) {
				starport = "A"
				planetsize = 7
				atmosphere = 8
				hydrosphere = 10
				population = 8
				govlevel = 8
				lawlevel = 4
				techlevel = 12
				homeworld = "Aubaine"
			} else if (homeworldnumber < 3 ) {
				starport = "C"
				planetsize = 5
				atmosphere = 4
				hydrosphere = 7
				population = 7
				govlevel = 8
				lawlevel = 9
				techlevel = 9
				homeworld = "Nike Nimbus"
			} else if (homeworldnumber < 4 ) {
				starport = "D"
				planetsize = 5
				atmosphere = 5
				hydrosphere = 3
				population = 7
				govlevel = 5
				lawlevel = 4
				techlevel = 10
				homeworld = "Fija"
			} else if (homeworldnumber < 5 ) {
				starport = "E"
				planetsize = 8
				atmosphere = 9
				hydrosphere = 4
				population = 7
				govlevel = 8
				lawlevel = 9
				techlevel = 2
				homeworld = "Spires"	
			} else if (homeworldnumber < 6 ) {
				starport = "C"
				planetsize = 10
				atmosphere = 9
				hydrosphere = 10
				population = 7
				govlevel = 5
				lawlevel = 6
				techlevel = 9
				homeworld = "Baldur"
			} else if (homeworldnumber < 7 ) {
				starport = "D"
				planetsize = 5
				atmosphere = 7
				hydrosphere = 4
				population = 7
				govlevel = 8
				lawlevel = 4
				techlevel = 8
				homeworld = "Lucifer"
			} else if (homeworldnumber < 8 ) {
				starport = "B"
				planetsize = 5
				atmosphere = 7
				hydrosphere = 6
				population = 6
				govlevel = 4
				lawlevel = 6
				techlevel = 11
				homeworld = "Aurora"
			} else if (homeworldnumber < 9 ) {
				starport = "B"
				planetsize = 5
				atmosphere = 4
				hydrosphere = 3
				population = 6
				govlevel = 1
				lawlevel = 0
				techlevel = 10
				homeworld = "Trybec"
			} else if (homeworldnumber < 10) {
				starport = "E"
				planetsize = 5
				atmosphere = 7
				hydrosphere = 10
				population = 6
				govlevel = 5
				lawlevel = 5
				techlevel = 7
				homeworld = "Schall"
			} else if (homeworldnumber < 11 ) {
				starport = "C"
				planetsize = 6
				atmosphere = 7
				hydrosphere = 4
				population = 6
				govlevel = 5
				lawlevel = 6
				techlevel = 11
				homeworld = "Eos"
			} else if (homeworldnumber < 12 ) {
				starport = "D"
				planetsize = 5
				atmosphere = 4
				hydrosphere = 4
				population = 6
				govlevel = 8
				lawlevel = 7
				techlevel = 7
				homeworld = "Vezina"
			} else if (homeworldnumber < 13 ) {
				starport = "D"
				planetsize = 8
				atmosphere = 9
				hydrosphere = 10
				population = 5
				govlevel = 6
				lawlevel = 8
				techlevel = 7
				homeworld = "Spencer"
			} else if (homeworldnumber < 14 ) {
				starport = "E"
				planetsize = 5
				atmosphere = 7
				hydrosphere = 10
				population = 5
				govlevel = 9
				lawlevel = 10
				techlevel = 6
				homeworld = "Ra"
			} else if (homeworldnumber < 15 ) {
				starport = "C"
				planetsize = 5
				atmosphere = 8
				hydrosphere = 5
				population = 4
				govlevel = 2
				lawlevel = 3
				techlevel = 6
				homeworld = "Shenandoah"
			} else if (homeworldnumber < 16 ) {
				starport = "E"
				planetsize = 5
				atmosphere = 1
				hydrosphere = 0
				population = 4
				govlevel = 1
				lawlevel = 5
				techlevel = 9
				homeworld = "Enkidu"
			} else if (homeworldnumber < 17 ) {
				starport = "D"
				planetsize = 5
				atmosphere = 6
				hydrosphere = 7
				population = 3
				govlevel = 3
				lawlevel = 3
				techlevel = 7
				homeworld = "Phoebus"
			} else if (homeworldnumber < 18 ) {
				starport = "E"
				planetsize = 8
				atmosphere = 12
				hydrosphere = 5
				population = 3
				govlevel = 0
				lawlevel = 0
				techlevel = 8
				homeworld = "Apollo"
			} else if (homeworldnumber < 19 ) {
				starport = "B"
				planetsize = 0
				atmosphere = 0
				hydrosphere = 0
				population = 3
				govlevel = 1
				lawlevel = 2
				techlevel = 11
				homeworld = "Kruyter"
			} else if (homeworldnumber < 20 ) {
				starport = "E"
				planetsize = 3
				atmosphere = 1
				hydrosphere = 0
				population = 3
				govlevel = 3
				lawlevel = 5
				techlevel = 9
				homeworld = "Rohit"
			} else if (homeworldnumber < 21 ) {
				starport = "E"
				planetsize = 4
				atmosphere = 3
				hydrosphere = 0
				population = 2
				govlevel = 2
				lawlevel = 5
				techlevel = 9
				homeworld = "Zloga"
			} else if (homeworldnumber < 22 ) {
				starport = "E"
				planetsize = 6
				atmosphere = 4
				hydrosphere = 8
				population = 2
				govlevel = 4
				lawlevel = 3
				techlevel = 4
				homeworld = "Helios"
			} else {
				starport = 0
				planetsize = 0
				atmosphere = 0
				hydrosphere = 0
				population = 0
				govlevel = 0
				lawlevel = 0
				techlevel = 0
				homeworld = "Not Set"
			} setAttrs({Homeworld:homeworld, Starport:starport, Planetsize:planetsize, Atmosphere:atmosphere, Hydrosphere:hydrosphere, Population:population, Govlevel:govlevel, Lawlevel:lawlevel, Techlevel:techlevel});
			});
		})	
	
	//Age and terms
		//Number of terms
			on("change:repeating_careers:careername", function() {
	    	getSectionIDs("careername", function(idArray) {
	            var termNo = idArray.length;
		    setAttrs({termNo:termNo});
	    	});
		})

		//Number of terms if a term is deleted
			on("remove:repeating_careers", function() {
	    	getSectionIDs("careername", function(idArray) {
	            var termNo = idArray.length;
		    setAttrs({termNo:termNo});
	    	});
		})


		//Age
		    on("change:termno", function() {
		    getAttrs(["termNo", "age"
					], function(pvalue) {
				console.log("************ start capacities caclulation ************");
				var termNo =  parseInt(pvalue.termNo);
				var adjusted_age =  ((termNo*4)+17);
				setAttrs({age:adjusted_age});
		    });
		});    

	//Homeworld effects
		//Homeworld effects on Education
	    on("change:techlevel", function() {
		    getAttrs(["techlevel", "edumod"
					], function(pvalue) {
				console.log("************ start capacities caclulation ************");
				var techlevel =  parseInt(pvalue.techlevel);
				var edumod =parseInt(pvalue.edumod) ;
		if (techlevel < 4) {
	        edumod = "-2";
	    } else if (techlevel < 9) {
	        edumod = "0";
	    } else if (techlevel < 14) {
	        edumod = "1";
	    } else {
	        edumod = "2";
	    }
				setAttrs({edumod});
		    });
	    });
		
		//Homeworld effects on Charisma
	    on("change:population", function() {
		    getAttrs(["population", "chamod"
					], function(pvalue) {
				console.log("************ start capacities caclulation ************");
				var population =  parseInt(pvalue.population);
				var chamod =parseInt(pvalue.chamod) ;
		if (population < 6) {
	        chamod = "-1";
	    } else if (population < 9) {
	        chamod = "0";
	 	} else {
	        chamod = "1";
	    }
				setAttrs({chamod});
		    });
	    });

		//Homeworld effects on Agility
	    on("change:atmosphere", function() {
		    getAttrs(["atmosphere", "aglmod"
					], function(pvalue) {
				console.log("************ start capacities caclulation ************");
				var atmosphere =  parseInt(pvalue.atmosphere);
				var aglmod =parseInt(pvalue.aglmod) ;
		if (atmosphere < 2) {
	        aglmod = "1";
	    } else {
	        aglmod = "0";
	    }
				setAttrs({aglmod});
		    });
	    });

	    //Homeworld effects on Strength
	    on("change:planetsize", function() {
		    getAttrs(["planetsize", "strmod"
					], function(pvalue) {
				console.log("************ start capacities caclulation ************");
				var planetsize =  parseInt(pvalue.planetsize);
				var strmod =parseInt(pvalue.strmod) ;
		if (planetsize < 3) {
	        strmod = "-2";
	    } else if (planetsize < 5) {
	        strmod = "-1";
	    } else if (planetsize < 12) {
	        strmod = "0";
	    } else if (planetsize < 16) {
	        strmod = "1";
	    } else {
	        strmod = "2";
	    }
				setAttrs({strmod});
		    });
	    });

	    
	    //Homeworld effects on Constitution
	    on("change:planetsize change:atmosphere change:techlevel", function() {
		    getAttrs(["planetsize", "conmod", "atmosphere", "techlevel"
					], function(pvalue) {
				console.log("************ start capacities caclulation ************");
				var planetsize =  parseInt(pvalue.planetsize);
				var atmosphere =  parseInt(pvalue.atmosphere);
				var techlevel =  parseInt(pvalue.techlevel);
				var conmod = parseInt(pvalue.conmod) ;
				var consizemod;
				var conatmosmod;
				var contechmod;
		if (planetsize < 3) {
	        consizemod = -2;
	    } else if (planetsize < 5) {
	        consizemod = -1;
	    } else if (planetsize < 12) {
	        consizemod = 0;
	    } else if (planetsize < 16) {
	        consizemod = -1;
	    } else {
	        consizemod = -2;
	    }
		
		if (atmosphere < 2) {
	        conatmosmod = 0;
	    } else if (atmosphere  < 3) {
	        conatmosmod = -1;
	    } else if (atmosphere  < 4) {
	        conatmosmod = 0;
	    } else if (atmosphere  < 5) {
	        conatmosmod = -1;
	    } else if (atmosphere  < 9) {
	        conatmosmod = 0;
	    } else if (atmosphere  < 10) {
	        conatmosmod = -1;
	    } else {
	        conatmosmod = 0;
	    }
		if (techlevel < 4) {
	        contechmod = 1;
	    } else {
	        contechmod = 0;
	    }
				setAttrs({conmod:(contechmod+consizemod+conatmosmod)});
		    });
	    });

	//Scripts for credits calculations
		//cashbasevalue
	    on("change:techlevel", function() {
		    getAttrs(["techlevel", "cashbase"
					], function(pvalue) {
				console.log("************ start capacities caclulation ************");
				var techlevel =  parseInt(pvalue.techlevel);
				var cashbasevalue =parseInt(pvalue.cashbase) ;
				if (techlevel < 4) {
	        cashbasevalue = "10";
	    } else if (techlevel < 6) {
	        cashbasevalue = "100";
	    } else if (techlevel < 9) {
	        cashbasevalue = "500";
	    } else if (techlevel < 11) {
	        cashbasevalue = "1000";
	    } else {
	        cashbasevalue = "5000";
	    }
				setAttrs({cashbase:cashbasevalue});
		    });
	    });

		//Total credits
		on("change:repeating_careers:careercredits", function() {
	   getSectionIDs("repeating_careers", function(IDArray) {
	      var fieldNames = [];
	        for (var i=0; i < IDArray.length; i++) {
	         fieldNames.push("repeating_careers_" + IDArray[i] + "_careercredits");
	      }

	        var totalcredits = 0;
	        getAttrs(fieldNames, function(values) {
	         for (var i=0; i < IDArray.length; i++) {
	            total += parseInt(values["repeating_careers_" + IDArray[i] + "_careercredits"])||0;
	         }
	         setAttrs({
	            "credits": totalcredits
	         });
	        });
		   });
		});

		//check for gambling skill
		on("change:repeating_intskills:intskillName change:repeating_intskills:intskillValue", function() {
	   getAttrs(["repeating_intskills_intskillName","repeating_intskills_intskillValue"], function(values) {
	 
	        var skill = values.repeating_intskills_intskillName;
	        skill = skill.toLowerCase();
	        skill = skill.trim();

	         if (skill === "gambling"){
	              var gambling_value = parseInt(values.repeating_intskills_intskillValue);
	               setAttrs({gambling:gambling_value});
	           }
	   		});
		});

		//Determine if gambling or SOC is the highest value
		on("change:gambling change:soc", function() {
	    getAttrs(["gambling", "soc"
				], function(pvalue) {
			console.log("************ start capacities caclulation ************");
			var soc =  parseInt(pvalue.soc);
			var gambling =parseInt(pvalue.gambling) ;
			var cashmodifier = 0
			if (soc < gambling) {
		        cashmodifier = gambling;
		    } else {
		        cashmodifier = soc ;
		    }
					setAttrs({cashmodifier});
			    });
		    });
			
	//Total shipdms
		on("change:repeating_careers:careershipdm", function() {
	   	getSectionIDs("repeating_careers", function(IDArray) {
	      var fieldNames = [];
	        for (var i=0; i < IDArray.length; i++) {
	         fieldNames.push("repeating_careers_" + IDArray[i] + "_careershipdm");
	      }

	        var totalshipdms = 0;
	        getAttrs(fieldNames, function(values) {
	         for (var i=0; i < IDArray.length; i++) {
	            total += parseInt(values["repeating_careers_" + IDArray[i] + "_careershipdm"])||0;
	         }
	         setAttrs({
	            "shipdms": totalshipdms
	         });
	        });
	   	});
		});

	//Derived values	
		//check for unarmed martial arts skill
			on("change:repeating_strskills:strskillName change:repeating_strskills:strskillValue", function() {
		   getAttrs(["repeating_strskills_strskillName","repeating_strskills_strskillValue"], function(values) {
		 
		        var skill = values.repeating_strskills_strskillName;
		        skill = skill.toLowerCase();
		        skill = skill.trim();

		         if (skill === "unarmed martial arts"){
		              var rank = parseInt(values.repeating_strskills_strskillValue);
		               setAttrs({unarmed_martial_arts:rank});
		           }
		   });
		});

		//unarmed combat damage
		    on("change:strength change:unarmed_martial_arts", function() {
			    getAttrs(["strength","unarmed_martial_arts" ,"unarmed_damage"
						], function(pvalue) {
					console.log("************ start unarmed combat calc************");
					var unarmed_skill =  parseInt(pvalue.unarmed_martial_arts);
					var strength =  parseInt(pvalue.strength);
					var udamage =  Math.floor((unarmed_skill * strength)/10);
					console.log("udamage "+udamage);
					if(udamage < 1){
						udamage = 1;
					}
					setAttrs({unarmed_damage:udamage});
			    });
		    });

		//set location hit capacities load and throw range
		    on("change:strength change:constitution", function() {
			    getAttrs(["strength", "constitution", "head_scratch","head_slight","head_serious","head_critical",
				          "head_scratch","head_slight","head_serious","head_critical",
						  "load","throw_range"
						], function(pvalue) {
					console.log("************ start capacities caclulation ************");
					var constitution =  parseInt(pvalue.constitution);
					var strength =  parseInt(pvalue.strength);
					var head_hc =constitution;
					var chest_hc=(constitution+strength)*3;
					var other_hc = (constitution+strength)*2;
					setAttrs({head_scratch: head_hc,head_slight: head_hc*2,head_serious: head_hc*4,head_critical: head_hc*8});
					setAttrs({chest_scratch: Math.floor(chest_hc*0.5),chest_slight: chest_hc,chest_serious: chest_hc*2,chest_critical: chest_hc*4});  
					setAttrs({other_scratch: Math.floor(other_hc*0.5),other_slight: other_hc,other_serious: other_hc*2,other_critical: other_hc*4});			
					setAttrs({load: chest_hc,throw_range:strength*4});
			    });
		    });

		//weight
		    on("change:strength change:agility change:baseweight", function() {
			    getAttrs(["strength", "agility", "baseweight","weight"
						], function(pvalue) {
					console.log("************ start capacities caclulation ************");
					var agility =  parseInt(pvalue.agility);
					var strength =  parseInt(pvalue.strength);
					var baseweight = parseInt(pvalue.baseweight);
					var adjusted_weight = baseweight+(strength-agility);
					setAttrs({weight: "" + adjusted_weight + "kgs"});
			    });
		    });

	//Determining final attributes
		//strength
		    on("change:strbase change:strmod change:age_str_mod", function() {
			    getAttrs(["strength", "strmod", "strbase", "age_str_mod"
						], function(pvalue) {
					console.log("************ start capacities caclulation ************");
					var strmod =  parseInt(pvalue.strmod);
					var strbase =  parseInt(pvalue.strbase);
					var age_str_mod = parseInt(pvalue.age_str_mod);
					var adjusted_str = strmod+strbase+age_str_mod;
					setAttrs({strength:adjusted_str});
			    });
		    });


		//agility
		    on("change:aglbase change:aglmod change:age_agl_mod", function() {
			    getAttrs(["agility", "aglmod", "aglbase", "age_agl_mod"
						], function(pvalue) {
					console.log("************ start capacities caclulation ************");
					var aglmod =  parseInt(pvalue.aglmod);
					var aglbase =  parseInt(pvalue.aglbase);
					var age_agl_mod = parseInt(pvalue.age_agl_mod);
					var adjusted_agl = (aglmod+aglbase+age_agl_mod);
					setAttrs({agility:adjusted_agl});
			    });
			});    

		//constitution
		    on("change:conbase change:conmod change:age_con_mod", function() {
			    getAttrs(["constitution", "conmod", "conbase", "age_con_mod"
						], function(pvalue) {
					console.log("************ start capacities caclulation ************");
					var conmod =  parseInt(pvalue.conmod);
					var conbase =  parseInt(pvalue.conbase);
					var age_con_mod =  parseInt(pvalue.age_con_mod);
					var adjusted_con = (conmod+conbase+age_con_mod);
					setAttrs({constitution:adjusted_con});
			    });
			});

		//Intelligence
		    on("change:intbase change:age_int_mod", function() {
			    getAttrs(["intelligence", "age_int_mod", "intbase"
						], function(pvalue) {
					console.log("************ start capacities caclulation ************");
					var age_int_mod =  parseInt(pvalue.age_int_mod);
					var intbase =  parseInt(pvalue.intbase);
					var adjusted_int = (age_int_mod+intbase);
					setAttrs({intelligence:adjusted_int});
			    });
			});    

		//education
		    on("change:edubase change:edumod", function() {
			    getAttrs(["education", "edumod", "edubase",
						], function(pvalue) {
					console.log("************ start capacities caclulation ************");
					var edumod =  parseInt(pvalue.edumod);
					var edubase =  parseInt(pvalue.edubase);
					var adjusted_edu = (edumod+edubase);
					setAttrs({education:adjusted_edu});
			    });
			});

		//Charisma
		    on("change:chabase change:chamod", function() {
			    getAttrs(["charisma", "chamod", "chabase"
						], function(pvalue) {
					console.log("************ start capacities caclulation ************");
					var chamod =  parseInt(pvalue.chamod);
					var chabase =  parseInt(pvalue.chabase);
					var adjusted_cha = (chamod+chabase);
					setAttrs({charisma:adjusted_cha});
			    });
			});    