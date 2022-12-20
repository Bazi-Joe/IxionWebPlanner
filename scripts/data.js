let game_data = JSON.parse(`{
    "buildings": {
        "maintanence": {
            "workshop": {
                "x": 4,
                "y": 4,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "small_storage": {
                "x": 4,
                "y": 4,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"storage.png"
            },
            "medium_storage": {
                "x": 8,
                "y": 4,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"storage.png"
            },
            "large_storage": {
                "x": 8,
                "y": 8,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"storage.png"
            },
            "small_battery": {
                "x": 3,
                "y": 3,
                "access": "all",
                "padding": 0,
                "wallmounted": false,
                "asset":"battery.png"
            },
            "medium_battery": {
                "x": 5,
                "y": 5,
                "access": "all",
                "padding": 0,
                "wallmounted": false,
                "asset":"battery.png"
            },
            "large_battery": {
                "x": 7,
                "y": 7,
                "access": "all",
                "padding": 0,
                "wallmounted": false,
                "asset":"battery.png"
            },
            "firestation": {
                "x": 6,
                "y": 6,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"firestation.png"
            },
            "drone_bay": {
                "x": 8,
                "y": 8,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            }
        },
        "space": {
            "docking_bay": {
                "x": 12,
                "y": 9,
                "access": "x",
                "padding": 2,
                "wallmounted": true,
                "asset":"workshop.png"
            },
            "eva_airlock": {
                "x": 12,
                "y": 9,
                "access": "x",
                "padding": 2,
                "wallmounted": true,
                "asset":"workshop.png"
            },
            "probe_launcher": {
                "x": 12,
                "y": 9,
                "access": "x",
                "padding": 2,
                "wallmounted": true,
                "asset":"workshop.png"
            },
            "colonization_training_center": {
                "x": 6,
                "y": 6,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            }
        },
        "factory": {
            "tech_lab": {
                "x": 9,
                "y": 9,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "steel_mill": {
                "x": 9,
                "y": 12,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "electronics_factory": {
                "x": 6,
                "y": 15,
                "access": "y",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "polymer_refinery": {
                "x": 6,
                "y": 9,
                "access": "y",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "fusion_station": {
                "x": 6,
                "y": 12,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "water_treatment_center": {
                "x": 5,
                "y": 7,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "waste_treatment_center": {
                "x": 9,
                "y": 9,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "nuclear_power_plant": {
                "x": 9,
                "y": 9,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            }
        },
        "population":{
            "crew_quarters": {
                "x": 3,
                "y": 3,
                "access": "all",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "optimized_quarter": {
                "x": 3,
                "y": 6,
                "access": "all",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "domotic_quarter": {
                "x": 3,
                "y": 6,
                "access": "all",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "cell_housing": {
                "x": 8,
                "y": 2,
                "access": "x",
                "padding": 0,
                "wallmounted": true,
                "asset":"workshop.png"
            },
            "cryonics_center": {
                "x": 5,
                "y": 7,
                "access": "y",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "infirmary": {
                "x": 3,
                "y": 6,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "health_center": {
                "x": 8,
                "y": 8,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            }
        },
        "food":{
            "mess_hall":{
                "x": 4,
                "y": 6,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "insect_farm":{
                "x": 4,
                "y": 8,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "crop_farm":{
                "x": 3,
                "y": 6,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "crop_farm_tile":{
                "x": 4,
                "y": 4,
                "access": "all",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "algae_farm":{
                "x": 4,
                "y": 6,
                "access": "y",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "algae_farm_tile":{
                "x": 4,
                "y": 6,
                "access": "all",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "mushroom_wall":{
                "x": 8,
                "y": 4,
                "access": "x",
                "padding": 0,
                "wallmounted": true,
                "asset":"workshop.png"
            }
        },
        "stability":{
            "dls_center":{
                "x": 5,
                "y": 7,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "alternative_life_center":{
                "x": 5,
                "y": 6,
                "access": "y",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "memorials":{
                "x": 7,
                "y": 7,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "legislative_strengthening_center":{
                "x": 6,
                "y": 6,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            },
            "hull_temple":{
                "x": 4,
                "y": 8,
                "access": "x",
                "padding": 0,
                "wallmounted": true,
                "asset":"workshop.png"
            },
            "observatory":{
                "x": 12,
                "y": 3,
                "access": "x",
                "padding": 0,
                "wallmounted": true,
                "asset":"workshop.png"
            },
            "exo_fighting_dome":{
                "x": 14,
                "y": 14,
                "access": "x",
                "padding": 0,
                "wallmounted": false,
                "asset":"workshop.png"
            }
        }
    }
}`);