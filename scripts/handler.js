import { system } from "@minecraft/server";
import { JaylyDB } from "./JaylyDB";
import { myQuestAPI } from "./user/config";

const {
    getIdentifier: { title: getTitle }
} = myQuestAPI;
const questDB = new JaylyDB("quest", false);

function hasDB(player, item) {
    let getDB = questDB.get(player).split(',')
    for (var i = 0; i < getDB.length; i++) {
        if (getDB[i] == item) {
            return true
        }
    }
    return false
}

function addDB(player, item) {
    let getDB = questDB.get(player)
    let dbArray = getDB.split(',')
    if (!dbArray.includes(item)) {
        dbArray.push(item)
        console.warn("Database " + item + " added!")
    } else {
        console.warn("Database already written!")
    }
    getDB = dbArray.join(",")
    questDB.set(player, getDB)
}

function removeDB(player, index) {
    let getDB = questDB.get(player);
    let dbArray = getDB.split(',');

    if (index >= 0 && index < dbArray.length) {
        let removedItem = dbArray.splice(index, 1)[0];  
        console.warn(`Database ${removedItem} removed!`);
    } else {
        console.warn("Invalid index or item not found!");
    }
    getDB = dbArray.join(',');
    questDB.set(player, getDB);
}

function resetDB(player) {
    questDB.delete(player);
    system.runTimeout(() => {
        questDB.set(player, "")
    }, 20)
}

function arrayDB(player) {
    let getDB = questDB.get(player)
    let dbArray = getDB.split(',')
    return dbArray
}

function msgHandler (player, message, isWarning = false) {
    if (isWarning === false) {
      player.sendMessage(`§l§a[${getTitle}] §r§f` + message)
    } else {
      player.sendMessage(`§l§c[${getTitle}] §r§f` + message)
    }
}



export { hasDB, addDB, removeDB, arrayDB, msgHandler, resetDB }