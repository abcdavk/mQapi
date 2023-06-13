/**
* myQuest API v140 Changelog:
* > Removed objects/variables -- isNamespace, system.version, button.about
* > New objects/variables -- button.search
* > Move scripts/user/config.js to scripts/config.js
* > Move and rename scripts/main.js to scripts/src/mQapi.js
*
* Read documentation:
* https://abcdavk.github.io/pages/mQapi/docs/
*
* Report bug & suggestions:
* https://discord.gg/ZeVUDhuwpG
*
* Creator:
* @abcdave/k
*/

const myQuestAPI = {
    system: {
        inactive: "myQuestAPI is inactive", 
        enable: true, 
		tag: "op" 
		/**
		* @param {string} inactive
		* @param {boolean} enable
		* @param {string} tag
		*/
    },
    getIdentifier: {
        author: "abcdave",
        title: "§lmyQuestAPI",
        description: "Complate quest to getting reward"
        /**
        * @param {string} author
        * @param {string} title
        * @param {string} description
        */
    },
    getQuest: {
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
        /**
        * @param {string} itemHand
        * @param {string[]} items
        * @param {string, number[[]]} rewards
        */
    },
    getForm: {
    	title: {
    		enable: true, 
    		title: [
    			"Coal get apple",
    			"Iron get carrot",
    			"Copper get potato",
    			"Gold get sugar cane",
    			"Dm get wheat",
    			"Netherite get potion"
    		]
    		/**
    		* @param {boolean} enable
    		* @param {string[]} title
    		*/
    	},
    	description: {
    		description: [
    			"Collect coal",
    			"Collect iron",
    			"Collect copper",
    			" ", 
    			"Collect diamond",
    			"Collect netherite"
    		],
    		complated: "Complated",
    		notComplated: "In progress"
    		/**
    		* @param {string[]} description
    		* @param {string} completed
    		* @param {string} notCompleted 
    		*/
    	},
    	icon: {
    		enable: true, 
    		confirm: `textures/ui/confirm`,
    		items: [
    			"items/coal",
    			"items/iron_ingot",
    			"items/copper_ingot",
    			"items/gold_ingot",
    			"items/diamond",
    			"items/netherite_ingot"
			]
			/**
    		* @param {boolean} enable
    		* @param {string} confirm
    		* @param {string[]} items
    		*/
    	},
    	button: {
        	back: "§lBack", 
        	check: "§lCheck",
			search: "§lSearch"  
			// @param {string} *
    	}
    }
}

export {myQuestAPI}
