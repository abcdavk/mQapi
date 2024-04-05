# mQapi (myQuestAPI)
Create quest easly for your minigames, addon pack, or server. Without any limitations. Support custom items and blocks. 

[Download latest](https://github.com/abcdavk/mQapi/releases)

# Basic guide

## Commands

### /scriptevent m:quest
Main command.

### /scriptevent m:quest quest 
Open quest UI for your self, just like open ui with a item.

### /scriptevent m:quest edit
Open edit UI. You can `add`, `remove` or `reset` player quest databases here by entering player `nameTag`.
mQapi will provide available player nameTag if you enter the wrong player nameTag.

### /scriptevent m:quest about
Just inform about this addons.

## Editing config.js
Config file location is `scripts\user\config.js`. We have provided a usage example in the configuration file, you can study and copy the code here.

I will start from top to bottom.

### Index
- [1. system](#1-system)
- [2. getIdentifier](#2-getidentifier)
- [3. getQuest](#3-getquest)
- [4. getForm](#4-getform)

___

### 1. system
This object is contain system interaction.

#### 1. inactive
Type: string

Sent message to the player when mQapi is inactive

#### 2. enable
Type: boolean

Set mQapi to active (`true`)or inactive (`false`)

#### 3. tag
Type: string

Set the `tag` who can use mQapi even in inactive mode.

___

### 2. getIdentifier
This object is provide for UI and message prefix.

#### 1. author
Type: string

Set the author of this config

#### 2. title
Type: string

Set the title to display to the UI and message previx.

#### 3. description
Type: string

Set the description of quest UI

___

### 3. getQuest
Building quest objectives and rewards

#### 1. itemHand
Type: string

Set the item to trigger quest UI

#### 2. items
Type: array[string]

Set the objective items

#### 3. rewards
Type: array[string]

Set the rewards items

### 4. getForm
This object provide the quest form UI body and button

#### 1. title
This object provide the quest title

##### 1. enable
Type: boolean

Set enable or disable automatically generate title by using objective item nameTag

##### 2. title
Type: array[string]

Set quest title manually

#### 2. description
This object provide quest description

##### 1. description
Type: array[string]

Set the quest description

##### 2. complated
Type: string

Message displayed if the quest complated

##### 3. not complated
Type: string

Message displayed if the quest not complated

#### 3. icon
This object provide the quest button icon

##### 1. enable
Type: boolean

Set enable or disable button icon

##### 2. confirm
Type: string

Set the confirm button icon

##### 3. items
Type: array[string]

Set the quest button icon

#### 4. button
This object provide message in the button

##### 1. back
Type: string

Button back message

##### 2. check
Type: string

Button check message 

##### 3. about
Type: string

Button about message

