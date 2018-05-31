
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
			} if (homeworldnumber < 1 ) {
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
			} else if (homeworldnumber < 13 ) {
				starport = "D"
				planetsize = 5
				atmosphere = 4
				hydrosphere = 4
				population = 6
				govlevel = 8
				lawlevel = 7
				techlevel = 7
				homeworld = "Vezina"
			} else if (homeworldnumber < 14 ) {
				starport = "D"
				planetsize = 8
				atmosphere = 9
				hydrosphere = 10
				population = 5
				govlevel = 6
				lawlevel = 8
				techlevel = 7
				homeworld = "Spencer"
			} else if (homeworldnumber < 15 ) {
				starport = "E"
				planetsize = 5
				atmosphere = 7
				hydrosphere = 10
				population = 5
				govlevel = 9
				lawlevel = 10
				techlevel = 6
				homeworld = "Ra"
			} else if (homeworldnumber < 16 ) {
				starport = "C"
				planetsize = 5
				atmosphere = 8
				hydrosphere = 5
				population = 4
				govlevel = 2
				lawlevel = 3
				techlevel = 6
				homeworld = "Shenandoah"
			} else if (homeworldnumber < 17 ) {
				starport = "E"
				planetsize = 5
				atmosphere = 1
				hydrosphere = 0
				population = 4
				govlevel = 1
				lawlevel = 5
				techlevel = 9
				homeworld = "Enkidu"
			} else if (homeworldnumber < 18 ) {
				starport = "D"
				planetsize = 5
				atmosphere = 6
				hydrosphere = 7
				population = 3
				govlevel = 3
				lawlevel = 3
				techlevel = 7
				homeworld = "Phoebus"
			} else if (homeworldnumber < 19 ) {
				starport = "E"
				planetsize = 8
				atmosphere = 12
				hydrosphere = 5
				population = 3
				govlevel = 0
				lawlevel = 0
				techlevel = 8
				homeworld = "Apollo"
			} else if (homeworldnumber < 20 ) {
				starport = "B"
				planetsize = 0
				atmosphere = 0
				hydrosphere = 0
				population = 3
				govlevel = 1
				lawlevel = 2
				techlevel = 11
				homeworld = "Kruyter"
			} else if (homeworldnumber < 21 ) {
				starport = "E"
				planetsize = 3
				atmosphere = 1
				hydrosphere = 0
				population = 3
				govlevel = 3
				lawlevel = 5
				techlevel = 9
				homeworld = "Rohit"
			} else if (homeworldnumber < 22 ) {
				starport = "E"
				planetsize = 4
				atmosphere = 3
				hydrosphere = 0
				population = 2
				govlevel = 2
				lawlevel = 5
				techlevel = 9
				homeworld = "Zloga"
			} else if (homeworldnumber < 23 ) {
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