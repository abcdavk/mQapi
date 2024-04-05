const myQuestAPI = {
    system: {
        inactive: "myQuestAPI is inactive", // will be displayed if MyQuestAPI is not active
        enable: true, // Set to true to enable and false to disable
		tag: "op" // tag who can see quests when system[enable = false] || /tag @s add op
    },
    getIdentifier: {
        author: "abcdave", // Author Name
        title: "myQuestAPI", // Title
        description: "Complate quest to getting reward" // Description
    },
    getQuest: {
    	isNamespace: { 
			isDefault: false,  // Useless  for now. If true, will use default namespace
    							 	 // so you don't need to write namespace anymore
			namespace: "minecraft:" // Only work if "isDefault: true"
		},
        itemHand: "minecraft:book",
        items: [
            "minecraft:coal",
            "minecraft:iron_ingot",
            "minecraft:copper_ingot",
            "minecraft:gold_ingot",
            "minecraft:diamond",
            "minecraft:netherite_ingot"
        ],
        rewards: [
        	["minecraft:apple", 1],
        	["minecraft:carrot", 1],
        	["minecraft:potato", 1],
        	["minecraft:sugar_cane", 1],
        	["minecraft:wheat", 1],
        	["minecraft:potion", 1]
        ]
    },
    getForm: {
    	title: {
    		enable: true, // Change to false to generate title automatically
    		title: [
    			// you don't need to fill this field if title[enable = true]
    			"Title here",
    			"Title here",
    			"Title here",
    			"Title here",
    			"Title here",
    			"Title here"
    		]
    	},
    	description: {
    		description: [
    			"Collect coal",
    			"Collect iron",
    			"Collect copper",
    			" ", // You can skip the description by writing a space
    			"Collect diamond",
    			"Collect netherite"
    		],
    		complated: "Complated",
    		notComplated: "In progress"
    	},
    	icon: {
    		enable: true, // Set to true to enable and false to disable
    		confirm: `textures/ui/confirm`,
    		items: [
    			"items/coal",
    			"items/iron_ingot",
    			"items/copper_ingot",
    			"items/gold_ingot",
    			"items/diamond",
    			"items/netherite_ingot"
			]
    	},
    	button: {
        	back: "§lBack", // Button Back
        	check: "§lCheck", // Button Check
			about: "§lAbout"  // Button About
    	}
    }
}

export {myQuestAPI}
