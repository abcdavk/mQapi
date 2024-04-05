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
    ActionFormData,
    ModalFormData
} from '@minecraft/server-ui'

// Used to import variables from config.js
import * as dave from './user/config.js';

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
    const hasTag = player.hasTag(thisItems);

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
      if (response2.selection === 0 && !player.hasTag(getItems[string - 1])) {
        for (let i = 0; i < 36; i++) {
          const inventoryItem = player.getComponent("inventory").container.getItem(i);

          if (inventoryItem && inventoryItem.typeId === getItems[string - 1]) {
            player.runCommandAsync(`give @s ${getRewards[string - 1][0]} ${getRewards[string - 1][1]}`);
            player.addTag(getItems[string - 1]);
            break;
          }
        }
      }
      if (response2.selection === 1) {
        formMain(player);
      }
    }
  });
};

const formAbout = (player) => {
  const form = new ActionFormData().title(getTitle).body(`§eRunning: §r${systemEnable}\n§eModule by: §r@${getAuthor}\n§eDev by: §r@abcdave`).button(getButtonBack);

  form.show(player).then(response => {
    if (response.selection === 0) {
      formMain(player);
    }
  });
};
