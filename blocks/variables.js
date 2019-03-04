/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable blocks for Blockly.

 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.variables');  // Deprecated.
goog.provide('Blockly.Constants.Variables');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg['VARIABLES_HUE']. (2018 April 5)
 */
Blockly.Constants.Variables.HUE = 330;

Blockly.Blocks['variables_create'] = {
  /**
   * Mutator block for procedure argument.
   * @this Blockly.Block
   */
  init: function() {
    var field = new Blockly.FieldTextInput('x', this.validator_);

    this.appendDummyInput()
        .appendField("create variable with name")
        .appendField(field, 'NAME');

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Msg['VARIABLES_HUE']);
    

    // Create the default variable when we drag the block in from the flyout.
    // Have to do this after installing the field on the block.
    // field.onFinishEditing_ = this.deleteIntermediateVars_;

    // Create an empty list so onFinishEditing_ has something to look at, even
    // though the editor was never opened.
    field.createdVariable_ = null;
    this.blocksWithSameVar = [];
    console.log("test");
    field.callValidator(field.text_);

    // field.onFinishEditing_('x');
  },
  /**
   * Obtain a valid name for the procedure argument. Create a variable if
   * necessary.
   * Merge runs of whitespace.  Strip leading and trailing whitespace.
   * Beyond this, all names are legal.
   * @param {string} varName User-supplied name.
   * @return {?string} Valid name, or null if a name was not specified.
   * @private
   * @this Blockly.FieldTextInput
   */
  validator_: function(newVarName) {
    if (this.sourceBlock_.isInFlyout) {
      return newVarName;
    }

    var workspace = this.sourceBlock_.workspace;
    newVarName = newVarName.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');

    if (!newVarName) {
      return null;
    }

    //If nothing changed in the input, the variable shouldn't be renamed
    if (this.createdVariable_ && newVarName == this.createdVariable_.name) {
      return newVarName;
    }

    //Search for the new variable
    var model = workspace.getVariable(newVarName, '');

    if (this.sourceBlock_.blocksWithSameVar && this.sourceBlock_.blocksWithSameVar.length > 0) {
        if (model && this.createdVariable_ && model.getId() == this.createdVariable_.getId()) {
            console.log("wtfˆ2");
        }
        else if (model && this.createdVariable_ && model.getId() != this.createdVariable_.getId()) {
            console.log("Renaming");
            this.createdVariable_ = model;
            this.sourceBlock_.onWarnedBlockRename_();
            this.sourceBlock_.iterateAllBlocks_();
        }
        else if (model && !this.createdVariable_) {
          console.log("wtfˆ4");
        }
        else if (!model && this.createdVariable_) {
            console.log("Making a new variable");

            model = workspace.createVariable(newVarName, '');
      
            if (model) {
              this.createdVariable_ = model;
              this.sourceBlock_.onWarnedBlockRename_();
            }
        }
        else if (!model && !this.createdVariable_) {
          console.log("wtfˆ3");
        }
    }
    else {
        if (model && this.createdVariable_ && model.getId() != this.createdVariable_.getId()) {
            console.log("Will do some magic");
            this.createdVariable_ = model;
            this.sourceBlock_.iterateAllBlocks_();
        }
        else if (model && this.createdVariable_ && model.getId() == this.createdVariable_.getId()) {
            console.log("wtf");
        }
        else if (model && !this.createdVariable_) {
          console.log("Will do some magic 2");
          this.createdVariable_ = model;
          this.sourceBlock_.iterateAllBlocks_();
        }
        else if (!model && !this.createdVariable_) {
          console.log("Creating new variable");
          model = workspace.createVariable(newVarName, '');
      
          if (model) {
            this.createdVariable_ = model;
          }
        }
        else if (!model) {
          console.log("Renaming variable that is only used once");
          workspace.renameVariableById(this.createdVariable_.getId(), newVarName);
        }
    }

    return newVarName;
  },
  onWarnedBlockRename_: function() {
      this.setWarningText(null);

      if (this.blocksWithSameVar.length == 1) {
          this.blocksWithSameVar[0].setWarningText(null);
          var ind = this.blocksWithSameVar[0].blocksWithSameVar.indexOf(this);
          if (ind > -1) {
              this.blocksWithSameVar[0].blocksWithSameVar.splice(ind, 1);
          }
      }
      else {
          for (var i = 0; i < this.blocksWithSameVar.length; i++) {
              var ind = this.blocksWithSameVar[i].blocksWithSameVar.indexOf(this);
              if (ind > -1) {
                  this.blocksWithSameVar[i].blocksWithSameVar.splice(ind, 1);
              }
          }
      }

      this.blocksWithSameVar = [];
  },
  iterateAllBlocks_: function() {
      var workspace = this.workspace;
      if (!workspace) {
          return;
      }

      var topLevelBlocks = workspace.getTopBlocks();
      
      for (var i = 0; i < topLevelBlocks.length; i++) {
          var block = topLevelBlocks[i];

          this.checkSingleBlockOnRename_(block);

          if (block.childBlocks_ && block.childBlocks_.length > 0) {
              this.recursiveBlockIteration(block.childBlocks_);
          }
      }

      for (var i = 0; i < this.blocksWithSameVar.length; i++) {
          this.blocksWithSameVar[i].blocksWithSameVar.push(this);

          for (var j = 0; j < this.blocksWithSameVar.length; j++) {
              if (i != j) {
                  this.blocksWithSameVar[i].blocksWithSameVar.push(this.blocksWithSameVar[j]);
              }
          }
      }
  },
  recursiveBlockIteration: function(blockList) {
      for (var j = 0; j < blockList.length; j++) {
          var block = blockList[j];
          
          this.checkSingleBlockOnRename_(block);

          if (block.childBlocks_ && block.childBlocks_.length > 0) {
              this.recursiveBlockIteration(block.childBlocks_);
          }
      }
  },
  checkSingleBlockOnRename_: function(block) {
      var originalBlock = this;

      if (block.type == "variables_create") {
          var blockVarId = block.getField("NAME").createdVariable_.getId();

          if (blockVarId == originalBlock.getField("NAME").createdVariable_.getId()) {
              if (block.id == originalBlock.id) {
                  return;
              }

              block.setWarningText("TODO. This is for another block!");
              originalBlock.setWarningText("TODO: This is for original block!");
              originalBlock.blocksWithSameVar.push(block);
          }
      }
      else if (block.type == "variables_get" || block.type == "variables_set") {
          var blockVarId = block.getField("VAR").getVariable().getId();

          if (blockVarId == originalBlock.getField("NAME").createdVariable_.getId()) {
              block.setWarningText(null);
          }
      }
  },
  ondispose: function() {
      if (!this.getField("NAME") || !this.getField("NAME").createdVariable_) {
          return;
      }
      
      this.onWarnedBlockRename_();

      var workspace = this.workspace;
      if (!workspace) {
          return;
      }

      var topLevelBlocks = workspace.getTopBlocks();

      var hasFoundVariable = false;

      for (var i = 0; i < topLevelBlocks.length; i++) {
          var block = topLevelBlocks[i];

          hasFoundVariable = this.onDisposeCheckSingleBlock(block);

          if (block.childBlocks_ && block.childBlocks_.length > 0) {
              hasFoundVariable = this.onDisposeRecursiveBlockIteration(block.childBlocks_);
          }
      }

      if (!hasFoundVariable) {
          workspace.deleteVariableById(this.getField("NAME").createdVariable_.getId());
      }

  },
  onDisposeRecursiveBlockIteration: function(blockList) {
      var hasFound = false;
      for (var j = 0; j < blockList.length; j++) {
          var block = blockList[j];
          
          hasFound = this.onDisposeCheckSingleBlock(block);

          if (block.childBlocks_ && block.childBlocks_.length > 0) {
              hasFound = this.onDisposeRecursiveBlockIteration(block.childBlocks_);
          }
      }

      return hasFound;
  },
  onDisposeCheckSingleBlock: function(block) {
      var varId = this.getField("NAME").createdVariable_.getId();
      
      if (this.blocksWithSameVar && this.blocksWithSameVar.length > 0 && 
          block.type == "variables_get" || block.type == "variables_set") {
          var blockVarId = block.getField("VAR").getVariable().getId();

          if (blockVarId == varId) {
              block.setWarningText("TODO: You done goofed son!");
              return true;
          }
      }
      else if (block.type == "variables_create") {
          var blockVarId = block.getField("NAME").createdVariable_.getId();

          if (block.id == this.id) {
              return false;
          }

          return blockVarId == varId;
      }

      return false;
  }
};

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for variable getter.
  {
    "type": "variables_get",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
      }
    ],
    "output": null,
    "colour": "%{BKY_VARIABLES_HUE}",
    "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
    "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
    "extensions": ["contextMenu_variableSetterGetter"]
  },
  // Block for variable setter.
  {
    "type": "variables_set",
    "message0": "%{BKY_VARIABLES_SET}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_VARIABLES_HUE}",
    "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
    "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
    "extensions": ["contextMenu_variableSetterGetter"]
  }
]);  // END JSON EXTRACT (Do not delete this comment.)

/**
 * Mixin to add context menu items to create getter/setter blocks for this
 * setter/getter.
 * Used by blocks 'variables_set' and 'variables_get'.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    if (!this.isInFlyout){
      // Getter blocks have the option to create a setter block, and vice versa.
      if (this.type == 'variables_get') {
        var opposite_type = 'variables_set';
        var contextMenuMsg = Blockly.Msg['VARIABLES_GET_CREATE_SET'];
      } else {
        var opposite_type = 'variables_get';
        var contextMenuMsg = Blockly.Msg['VARIABLES_SET_CREATE_GET'];
      }

      var option = {enabled: this.workspace.remainingCapacity() > 0};
      var name = this.getField('VAR').getText();
      option.text = contextMenuMsg.replace('%1', name);
      var xmlField = document.createElement('field');
      xmlField.setAttribute('name', 'VAR');
      xmlField.appendChild(document.createTextNode(name));
      var xmlBlock = document.createElement('block');
      xmlBlock.setAttribute('type', opposite_type);
      xmlBlock.appendChild(xmlField);
      option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);
      // Getter blocks have the option to rename or delete that variable.
    } else {
      if (this.type == 'variables_get' || this.type == 'variables_get_reporter'){
        var renameOption = {
          text: Blockly.Msg.RENAME_VARIABLE,
          enabled: true,
          callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this)
        };
        var name = this.getField('VAR').getText();
        var deleteOption = {
          text: Blockly.Msg.DELETE_VARIABLE.replace('%1', name),
          enabled: true,
          callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this)
        };
        options.unshift(renameOption);
        options.unshift(deleteOption);
      }
    }
  }
};

/**
  * Callback for rename variable dropdown menu option associated with a
  * variable getter block.
  * @param {!Blockly.Block} block The block with the variable to rename.
  * @return {!function()} A function that renames the variable.
  */
Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY = function(block) {
  return function() {
    var workspace = block.workspace;
    var variable = block.getField('VAR').getVariable();
    Blockly.Variables.renameVariable(workspace, variable);
  };
};

/**
 * Callback for delete variable dropdown menu option associated with a
 * variable getter block.
 * @param {!Blockly.Block} block The block with the variable to delete.
 * @return {!function()} A function that deletes the variable.
 */
Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY = function(block) {
  return function() {
    var workspace = block.workspace;
    var variable = block.getField('VAR').getVariable();
    workspace.deleteVariableById(variable.getId());
    workspace.refreshToolboxSelection();
  };
};

Blockly.Extensions.registerMixin('contextMenu_variableSetterGetter',
    Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);
