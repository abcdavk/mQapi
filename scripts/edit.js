import {
    Player,
    system,
    world
} from "@minecraft/server";
import {
    ActionFormData,
    ModalFormData,
    MessageFormData
} from '@minecraft/server-ui'

import * as dave from './user/config.js';
import { removeDB, arrayDB, hasDB, addDB, msgHandler, resetDB } from "./handler";

import { JaylyDB } from "./JaylyDB.js";
const cacheDB = new JaylyDB("cacheDB", false)
const questDB = new JaylyDB("quest", false);


const {
    getQuest: { itemHand: getItemHand, items: getItems, rewards: getRewards }
} = dave.myQuestAPI;

export function formEdit(player) {
    let form = new ModalFormData()
    .title("Edit Player Database")
    .textField("Player Nametag:", "(eg: abcdavc)", cacheDB.get(player.nameTag))
    .dropdown("Select Mode:", [ "Add", "Remove", "Reset" ], 1)
    .show(player).then((r) => {
        if (r.formValues) {
            if (questDB.has(r.formValues[0])) {
                if (r.formValues[1] === 0) addForm(player, r.formValues[0])
                if (r.formValues[1] === 1) removeForm(player, r.formValues[0])
                if (r.formValues[1] === 2) resetForm(player, r.formValues[0])
            } else {
                let databaseList = "Undefined player databases. List of available players:\n"
                questDB.forEach((value, key) => {
                    databaseList += "- " + key + "\n";
                });
                msgHandler(player, databaseList)
            }
            cacheDB.set(player.nameTag, r.formValues[0])
        } 
    })
}

function addForm(player, value) {
  const form = new ActionFormData().title("Select To Add Database").button("");
  const LIST = [];
  let COUNT = 0;

  for (const thisItems of getItems) {
    const hasTag = hasDB(value, thisItems)
    const button = hasTag ? thisItems + "\n §2Added" : thisItems;

    form.button(button);
    LIST.push(COUNT);
    COUNT++;
  }

  form.show(player).then(response => {
    if (response.selection === 0) {
      formEdit(player)
    }
    if (response.selection) {
      addDB(value, getItems[response.selection-1]);
      addForm(player, value)
    } else {
        formEdit(player)
    }
  });
}

function removeForm(player, value) {
    let dbArray = arrayDB(value)
    let form2 = new ActionFormData()
    .title("Select To Remove Database")
    dbArray.forEach(e => {
        form2.button(e)
    });
    form2.show(player).then((r) => {
        if (r.selection) {
            console.warn(r.selection)
            removeDB(value, r.selection)
            system.runTimeout(() => {
                removeForm(player, value)
            }, 0)
        } else {
            formEdit(player)
        }
    })
}

function resetForm(player, value) {
    let form = new MessageFormData()
    .title("Confirmation")
    .body(`You about to reset ${value} database. Are you sure?`)
    .button1("No, Just kidding")
    .button2("Yes")
    .show(player).then((r) => {
        if (r.selection === 0 || r.canceled) formEdit(player)
        else {
            resetDB(value)
            msgHandler(player, `Successfully reset ${value} database`)
        }
    })
}