/*
* dave.myQuestAPI.{..}
* getItemHand
* getItems
* getFormTitle
* getFromDesc
* getFromButton
*/

import {
    system,
    world
} from "@minecraft/server";
import {
    ActionFormData
} from '@minecraft/server-ui'

// Used to import variables from config.js
import * as dave from './user/config.js';
import { hasDB, addDB, removeDB, msgHandler } from "./handler.js";
import { formEdit } from "./edit.js";
import { JaylyDB } from "./JaylyDB.js";
const questDB = new JaylyDB("quest", false);

const {
  system: { enable: systemEnable, tag: systemTag, inactive: systemInactive },
  getIdentifier: { author: getAuthor, title: getTitle, description: getDescription },
  getQuest: { itemHand: getItemHand, items: getItems, rewards: getRewards },
  getForm: {
    title: { enable: getTitleEnable, title: getTitleTitle },
    description: { description: getDescriptionDescription, complated: getDescriptionComplated, notComplated: getDescriptionNotComplated },
    icon: { enable: getIconEnable, confirm: getIconConfirm, items: getIconItems },
    button: { back: getButtonBack, check: getButtonCheck, about: getButtonAbout }
  }
} = dave.myQuestAPI;

world.afterEvents.playerSpawn.subscribe((eventData) => {
  let player = eventData.player
  if (!questDB.has(player)) {
    questDB.set(player.nameTag, "")
    if (player.isOP()) {
      msgHandler(player, `Set up successfully`)
      msgHandler(player, `is active \n§eUsage command: /scriptevent m:quest`, false)
    }
  } 
})

system.afterEvents.scriptEventReceive.subscribe((eventData) => {
  const {id, sourceEntity, message} = eventData
  const player = sourceEntity
  
  if (id === "m:quest") {
    switch (message) {
      case "":
        msgHandler(player, `Commands:\n- /scriptevent m:quest quest\n- /scriptevent m:quest edit\n- /scriptevent m:quest about`)
        break;
      case "about":
        formAbout(player, false)
        break;
      case "quest":
        formMain(player)
        break;
      case "edit":
        formEdit(player)
        break;
    }
  }
})


world.beforeEvents.itemUse.subscribe((eventData) => {
  const { itemStack: item, source: player } = eventData;

  if (item.typeId === getItemHand) {
    if (systemEnable || player.hasTag(systemTag)) {
      system.run(() => {
        formMain(player);
      });
    } else {
      const runCmd = player.runCommandAsync;
      runCmd(`tellraw @s {"rawtext":[{"text":"${systemInactive}\n\n "}]}`);
      runCmd(`tellraw @s {"rawtext":[{"text":"===== ${getTitle} =====\n§eRunning: §r${systemEnable}\n§eVersion: §r${systemVersion}\n§eModule by: §r@${getAuthor}\n§eDev by: §r@abcdave"}]}`);
    }
  }
});

const formMain = (player) => {
  const form = new ActionFormData().title(getTitle).button(getButtonAbout);
  const LIST = [];
  let COUNT = 0;

  for (const thisItems of getItems) {
    const getTitleAuto = thisItems.split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    const hasTag = hasDB(player.nameTag, thisItems)
    //const hasTag = player.hasTag(thisItems);

    const title = getTitleEnable ? getTitleAuto : getTitleTitle[COUNT];
    const icon = getIconEnable ? (hasTag ? getIconConfirm : `textures/${getIconItems[COUNT]}`) : undefined;
    const button = hasTag ? title + "\n §2Complate" : title;

    form.button(button, icon);
    LIST.push(COUNT);
    COUNT++;
  }

  form.show(player).then(response => {
    if (response.selection === 0) {
      formAbout(player);
    }
    if (response.selection) {
      formSelection(player, response.selection);
    }
  });
};

const formSelection = (player, string) => {
  const getItemName = getItems[string - 1].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  const getRewardName = getRewards[string - 1][0].split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  const getIsComplate = player.hasTag(getItems[string - 1]);
  const form2 = new ActionFormData().title(getTitle);

  if (getIsComplate) {
    form2.body(`${getDescriptionDescription[string - 1]}\n\n§eObjective: §r${getItemName}\n§eReward: §r${getRewardName}\n§eComplated: §r${getDescriptionComplated}`);
  } else {
    form2.body(`${getDescriptionDescription[string - 1]}\n\n§eObjective: §r${getItemName}\n§eReward: §r${getRewardName}\n§eStatus: §r${getDescriptionNotComplated}`);
  }

  form2.button(getButtonCheck).button(getButtonBack);
  form2.show(player).then(response2 => {
    if (!response2.isCanceled) {
      if (response2.selection === 0) {
        if (!hasDB(player.nameTag, getItems[string-1])) {
          if (checkInv(player, getItems, string)) {
            player.runCommandAsync(`give @s ${getRewards[string - 1][0]} ${getRewards[string - 1][1]}`);
            addDB(player.nameTag, getItems[string - 1]);
            msgHandler(player, `Quest complate! ${getItemName}`, false)
          } else {
            msgHandler(player, `Make sure you have objective item on your inventory!`, true)
          }
        } else {
          msgHandler(player, `You already completed this quest!`, true)
        }
      }
      if (response2.selection === 1) {
        formMain(player);
      }
    }
  });
};

const formAbout = (player, backToForm = true) => {
  const form = new ActionFormData().title(getTitle).body(`§eRunning: §r${systemEnable}\n§eModule by: §r@${getAuthor}\n§eDev by: §r@abcdave`).button(getButtonBack);

  form.show(player).then(response => {
    if (response.selection === 0) {
      if (backToForm == true) {
        return formMain(player);
      } else {
        return
      }
    }
  });
};

function checkInv(player, getItems, string) {
  for (let i = 0; i < 36; i++) {
    const inventoryItem = player.getComponent("inventory").container.getItem(i)
    if (inventoryItem && inventoryItem.typeId === getItems[string - 1]) {
      return true
    }
  }
  return false
}

