import {
    system,
    world
} from "@minecraft/server";
import {
    ActionFormData,
    ModalFormData
} from '@minecraft/server-ui'
import * as dave from '../config.js'
const getEnable = dave.myQuestAPI.system.enable
const getTag = dave.myQuestAPI.system.tag
const msgDisable = dave.myQuestAPI.system.inactive
const getAuthor = dave.myQuestAPI.getIdentifier.author
const getTitle = dave.myQuestAPI.getIdentifier.title
const getDesc = dave.myQuestAPI.getIdentifier.description
const getItemHand = dave.myQuestAPI.getQuest.itemHand
const getItems = dave.myQuestAPI.getQuest.items
const getRewards = dave.myQuestAPI.getQuest.rewards
const getTitleOn = dave.myQuestAPI.getForm.title.enable
const getTitleItems = dave.myQuestAPI.getForm.title.title
const getDescItems = dave.myQuestAPI.getForm.description.description
const getComplated = dave.myQuestAPI.getForm.description.complated
const getNotComplated = dave.myQuestAPI.getForm.description.notComplated
const getIconOn = dave.myQuestAPI.getForm.icon.enable
const getIconConf = dave.myQuestAPI.getForm.icon.confirm
const getIconItems = dave.myQuestAPI.getForm.icon.items
const getBtnBack = dave.myQuestAPI.getForm.button.back
const getBtnCheck = dave.myQuestAPI.getForm.button.check
const getBtnSearch = dave.myQuestAPI.getForm.button.search

world.beforeEvents.itemUse.subscribe((eventData) => {
	let item = eventData.itemStack
	let player = eventData.source
    // Detect items used
    if (item.typeId == getItemHand) {
    	if (getEnable == true) {
    		// Open forms
    		system.run(() => {
				formMain(player)
				console.warn(player);
			})
    	} else {
    		if (player.hasTag(getTag)) {
    			// Open forms
				system.run(() => {
					formMain(player)
					console.warn(player);
				})
    		} else {
    			let runCmd = player.runCommandAsync
    			runCmd(`tellraw @s {"rawtext":[{"text":"${msgDisable}\n\n "}]}`);
   		 	runCmd(`tellraw @s {"rawtext":[{"text":"===== ${getTitle} =====\n§eRunning: §r${getEnable}\n§eVersion: §r1.4.0\n§eModule by: §r@${getAuthor}\n§eDev by: §r@abcdave"}]}`);
			}
   	 }
    }
});

//function fromItemReq(player)
let formMain = (player) => {
	let LIST = []
	    const form = new ActionFormData()
        .title(getTitle)
        .button(getBtnSearch)
    let COUNT = 0
    for (const thisItems of getItems) {
        if (getTitleOn == true) {
    		let getTitleAuto = getItems[COUNT].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
			// Checks whether the user wants to use the icon or not
        	if (getIconOn == true) {
            	if (!player.hasTag(thisItems)) {
          	      form.button(getTitleAuto , `textures/${getIconItems[COUNT]}`)
           	 } else {
              	  form.button(getTitleAuto , getIconConf)
            	}
            } else {
            	if (!player.hasTag(thisItems)) {
          	      form.button(getTitleAuto)
           	 } else {
              	  form.button(getTitleAuto + "\n §2Complate")
            	}
            }
            LIST.push(COUNT)
        } else {
        	if (getIconOn == true) {
            	if (!player.hasTag(thisItems)) {
          	      form.button(getTitleItems[COUNT] , `textures/${getIconItems[COUNT]}`)
           	 } else {
              	  form.button(getTitleItems[COUNT] , getIconConf)
            	}
            } else {
            	if (!player.hasTag(thisItems)) {
          	      form.button(getTitleItems[COUNT])
           	 } else {
              	  form.button(getTitleItems[COUNT] + "\n §2Complate")
            	}
            }
            LIST.push(COUNT)
        }
        COUNT += 1
    }
    form.show(player).then(response => {
    	if (response.selection == 0) {
			const form3 = new ModalFormData()
				.title('Search')
				.textField('Search', '')
			form3.show(player).then(response3 => {
				if (!response3.isCanceled) {
        			formSearch(player,response3.formValues[0].toLowerCase());
       		 }
			});
    	}
    	if (response.selection) {
			formSelection(player, response.selection)
		}
    })
}

let formSearch = (player,word) => {
	console.warn("Hello world type: " + word);
	let LIST = []
	    const form = new ActionFormData()
        .title(getTitle)
        .button("Search")
    let COUNT = 0
    for (const thisItems of getItems) {
        if (getTitleOn == true) {
    		let getTitleAuto = getItems[COUNT].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    		if (getTitleAuto.toLowerCase().includes(word)) {
			// Checks whether the user wants to use the icon or not
        		if (getIconOn == true) {
            		if (!player.hasTag(thisItems)) {
          	   	   form.button(getTitleAuto , `textures/${getIconItems[COUNT]}`)
           		 } else {
              		  form.button(getTitleAuto , getIconConf)
            		}
          	  } else {
            		if (!player.hasTag(thisItems)) {
          	      	form.button(getTitleAuto)
           		 } else {
              	  	form.button(getTitleAuto + "\n §2Complate")
            		}
            	}
            }
            LIST.push(COUNT)
        } else {
        	if (getTitleItems[COUNT].toLowerCase().includes(word)) {
        		if (getIconOn == true) {
            		if (!player.hasTag(thisItems)) {
          	    	  form.button(getTitleItems[COUNT] , `textures/${getIconItems[COUNT]}`)
           		 } else {
              		  form.button(getTitleItems[COUNT] , getIconConf)
            		}
          	  } else {
            		if (!player.hasTag(thisItems)) {
          	    	  form.button(getTitleItems[COUNT])
           		 } else {
              	  	form.button(getTitleItems[COUNT] + "\n §2Complate")
            		}
            	}
            }
            LIST.push(COUNT)
        }
        COUNT += 1
    }
    form.show(player).then(response => {
    	if (response.selection == 0) {
			const form3 = new ModalFormData()
				.title('Search')
				.textField('Search', '')
			form3.show(player).then(response3 => {
				if (!response3.isCanceled) {
        			formSearch(player,response3.formValues[0].toLowerCase());
       		 }
			});
    	}
    	if (response.selection) {
			formSelection(player, response.selection)
		}
    })
}

function formSelection(player, string) {
    let getItemName = getItems[string-1].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
    let getRewardName = getRewards[string-1][0].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
    let getIsComplate = player.hasTag(getItems[string-1])
	const form2 = new ActionFormData()
		.title(getTitle)
	if (getIsComplate == true) {
		form2.body(`${getDescItems[string-1]}\n\n§eObjective: §r${getItemName}\n§eReward: §r${getRewardName}\n§eComplated: §r${getComplated}`)
	}
	if (getIsComplate == false) {
		form2.body(`${getDescItems[string-1]}\n\n§eObjective: §r${getItemName}\n§eReward: §r${getRewardName}\n§eStatus: §r${getNotComplated}`)
	}
	form2.button(getBtnCheck)
	form2.button(getBtnBack)
	form2.show(player).then(response2 => {
		if (!response2.isCanceled){
			if (response2.selection == 0 && !player.hasTag(getItems[string-1])){
				for (let i = 0; i < 36; i++){
					if (player.getComponent("inventory").container.getItem(i) && player.getComponent("inventory").container.getItem(i).typeId == getItems[string-1]){
      	              player.runCommandAsync(`give @s ${getRewards[string-1][0]} ${getRewards[string-1][1]}`)
      				  player.runCommandAsync(`clear @s ${getItems[string-1]} 0 1`)
        	            player.addTag(getItems[string-1])
        	            break;
                    } 
                } 
            }
			if (response2.selection == 1) {
            	formMain(player)
            }
        }
	})
}

 
/*
const regex = new RegExp(`\\b${searchWord}\\b`, 'gi');
const matchedWords = text.match(regex);
if (matchedWords) {
console.log(`Kata ditemukan ${matchedWords.length} kali:`, matchedWords);
} else {
console.log("Kata tidak ditemukan");
}
**/