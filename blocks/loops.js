/**
 * @license
 * Copyright 2012 Google LLC
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
 * @fileoverview Loop blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.loops');  // Deprecated
goog.provide('Blockly.Constants.Loops');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.Blocks.Definitions');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.FieldNumber');
goog.require('Blockly.FieldVariable');

/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg['LOOPS_HUE']. (2018 April 5)
 */
Blockly.Constants.Loops.HUE = 120;

Blockly.Blocks.controls_whileForever = {
  /**
     * Block for 'repeat forever' loop.
     * @this Blockly.Block
     */
  init: function () {
    this.setStyle(Blockly.Blocks.Definitions.loopsStyle);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_WHILE_FOREVER);

    this.appendStatementInput('DO')
      .appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);

    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.FABLE_WHILE_FOREVER_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_WHILE_FOREVER,
      Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO,
      '%{BKY_LOOPS}',
      '%{BKY_LABEL_LOOPS}'
    ];

    var toolboxKeywords = [

    ];

    Blockly.Search.preprocessSearchKeywords('controls_whileForever', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.controls_stopApp = {
  /**
     * Block for 'stop code' block.
     * @this Blockly.Block
     */
  init: function () {
    this.setStyle(Blockly.Blocks.Definitions.loopsStyle);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_STOP_PROGRAM);

    this.setPreviousStatement(true);

    // This block should not have blocks after it, as those would be useless
    this.setNextStatement(false);
    this.setTooltip(Blockly.Msg.FABLE_STOP_PROGRAM_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_STOP_PROGRAM,
      '%{BKY_LOOPS}',
      '%{BKY_LABEL_LOOPS}'
    ];

    var toolboxKeywords = [];

    Blockly.Search.preprocessSearchKeywords('controls_stopApp', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.fable_wait = {
  /**
     * Block for wait in seconds.
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.waitIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendValueInput('WAIT')
      .appendField(Blockly.Msg.FABLE_WAIT_TIME);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.loopsStyle);
    this.setTooltip(Blockly.Msg.FABLE_WAIT_TIME_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_WAIT_TIME,
      '%{BKY_LOOPS}',
      '%{BKY_LABEL_TIME_CONTROL}'
    ];

    var toolboxKeywords = [

    ];

    Blockly.Search.preprocessSearchKeywords('fable_wait', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.fable_wait_until = {
  /**
   *
   * @this Blockly.Block
   */
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.waitIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendValueInput('WAIT')
      .appendField(Blockly.Msg.FABLE_WAIT_UNTIL)
      .setCheck('Boolean');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.loopsStyle);
    this.setTooltip(Blockly.Msg.FABLE_WAIT_UNTIL_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_WAIT_UNTIL,
      '%{BKY_LOOPS}',
      '%{BKY_LABEL_TIME_CONTROL}'
    ];

    var toolboxKeywords = [];

    Blockly.Search.preprocessSearchKeywords('fable_wait_until', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.controls_whileUntil = {
  /**
   * Block for 'do while/until' loop.
   * @override Blockly.Block.controls_whileUntil JSON definition
   * @this Blockly.Block
   */
  init: function () {
    var modeOptions = [
      [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, 'WHILE'],
      [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, 'UNTIL']
    ];

    var modeDropdown = new Blockly.FieldDropdown(modeOptions);

    this.appendDummyInput().appendField(modeDropdown, 'MODE');

    this.appendValueInput('BOOL').setCheck('Boolean');

    this.appendStatementInput('DO')
      .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.loopsStyle);

    const _this = this;
    this.setTooltip(function () {
      const operator = _this.getFieldValue('MODE');

      var TOOLTIPS = {
        WHILE: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
        UNTIL: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
      };

      try {
        return TOOLTIPS[operator];
      } catch (err) {
        return 'controls_whileUntil_tooltip';
      }
    });
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      '%{BKY_CONTROLS_REPEAT_INPUT_DO}',
      '%{BKY_LABEL_TIME_CONTROL}',
      '%{BKY_LOOPS}'
    ];

    var toolboxKeywords = [
      '%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_WHILE}',
      '%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL}'
    ];

    Blockly.Search.preprocessSearchKeywords('controls_whileUntil', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.controls_flow_statements = {
  /**
   * Block for flow statements: continue, break.
   * @override Blockly.Block.controls_flow_statements JSON definition
   * @this Blockly.Block
   */
  init: function () {
    var flowOptions = [
      [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, 'BREAK'],
      [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, 'CONTINUE']
    ];

    var flowDropdown = new Blockly.FieldDropdown(flowOptions);

    this.appendDummyInput().appendField(flowDropdown, 'FLOW');
    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.loopsStyle);

    const _this = this;
    this.setTooltip(function () {
      const flowOp = _this.getFieldValue('FLOW');

      var TOOLTIPS = {
        BREAK: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
        CONTINUE: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
      };

      try {
        return TOOLTIPS[flowOp];
      } catch (err) {
        return 'controls_whileUntil_tooltip';
      }
    });

    this.setNextStatement(null);
    this.setPreviousStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');

    this.suppressPrefixSuffix = true;
  },
  ensureSearchKeywords: function () {
    var keywords = [
      '%{BKY_LABEL_TIME_CONTROL}',
      '%{BKY_LOOPS}'
    ];

    var toolboxKeywords = [
      '%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK}',
      '%{BKY_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE}'
    ];

    Blockly.Search.preprocessSearchKeywords('controls_flow_statements', keywords, toolboxKeywords);
  },
  /**
   * Is the given block enclosed (at any level) by a loop?
   * @param {!Blockly.Block} block Current block.
   * @return {Blockly.Block} The nearest surrounding loop, or null if none.
   */
  getSurroundLoop: function (block) {
    var LOOP_TYPES = [
      'controls_repeat',
      'controls_repeat_ext',
      'controls_forEach',
      'controls_for',
      'controls_whileUntil',
      'controls_whileForever'
    ];
    // Is the block nested in a loop?
    do {
      if (LOOP_TYPES.indexOf(block.type) !== -1) {
        return block;
      }
      block = block.getSurroundParent();
    } while (block);
    return null;
  },
  /**
   * Called whenever anything on the workspace changes.
   * Add warning if this flow block is not nested inside a loop.
   * @param {!Blockly.Events.Abstract} _e Change event.
   * @this {Blockly.Block}
   */
  onchange: function (_e) {
    if (!this.workspace.isDragging || this.workspace.isDragging()) {
      return; // Don't change state at the start of a drag.
    }
    if (this.getSurroundLoop(this)) {
      this.setWarningText(null);
      if (!this.isInFlyout) {
        this.setEnabled(true);
      }
    } else {
      this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING);
      if (!this.isInFlyout && !this.getInheritedDisabled()) {
        this.setEnabled(false);
      }
    }
  }
};

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for repeat n times (external number).
  {
    "type": "controls_repeat_ext",
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TIMES",
      "check": "Number"
    }],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}",
    "search_keywords": [
        "%{BKY_CONTROLS_REPEAT_TITLE}",
        "%{BKY_CONTROLS_REPEAT_INPUT_DO}",
        '%{BKY_LOOPS}',
        '%{BKY_LABEL_TIME_CONTROL}'
    ],
    "search_toolbox_keywords": []
  },
  // Block for repeat n times (internal number).
  // The 'controls_repeat_ext' block is preferred as it is more flexible.
  {
    "type": "controls_repeat",
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "field_number",
      "name": "TIMES",
      "value": 10,
      "min": 0,
      "precision": 1
    }],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}",
    "search_keywords": [
        "%{BKY_CONTROLS_REPEAT_TITLE}",
        "%{BKY_CONTROLS_REPEAT_INPUT_DO}",
        '%{BKY_LOOPS}',
        '%{BKY_LABEL_TIME_CONTROL}'
    ],
    "search_toolbox_keywords": []
  },
  // Block for 'for' loop.
  {
    "type": "controls_for",
    "message0": "%{BKY_CONTROLS_FOR_TITLE}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": null
      },
      {
        "type": "input_value",
        "name": "FROM",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "TO",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "BY",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "helpUrl": "%{BKY_CONTROLS_FOR_HELPURL}",
    "extensions": [
      "contextMenu_newGetVariableBlock",
      "controls_for_tooltip"
    ],
    "search_keywords": [
        "%{BKY_CONTROLS_FOR_TITLE}",
        "%{BKY_CONTROLS_REPEAT_INPUT_DO}",
        '%{BKY_LOOPS}',
        '%{BKY_LABEL_TIME_CONTROL}'
    ],
    "search_toolbox_keywords": []
  },
  // Block for 'for each' loop.
  {
    "type": "controls_forEach",
    "message0": "%{BKY_CONTROLS_FOREACH_TITLE}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": null
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "helpUrl": "%{BKY_CONTROLS_FOREACH_HELPURL}",
    "extensions": [
      "contextMenu_newGetVariableBlock",
      "controls_forEach_tooltip"
    ],
    "search_keywords": [
        "%{BKY_CONTROLS_FOREACH_TITLE}",
        "%{BKY_CONTROLS_REPEAT_INPUT_DO}",
        '%{BKY_LOOPS}',
        '%{BKY_LABEL_TIME_CONTROL}'
    ],
    "search_toolbox_keywords": []
  }
]); // END JSON EXTRACT (Do not delete this comment.)

/**
 * Tooltips for the 'controls_whileUntil' block, keyed by MODE value.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.Loops.WHILE_UNTIL_TOOLTIPS = {
  'WHILE': '%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE}',
  'UNTIL': '%{BKY_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL}'
};

Blockly.Extensions.register('controls_whileUntil_tooltip',
    Blockly.Extensions.buildTooltipForDropdown(
        'MODE', Blockly.Constants.Loops.WHILE_UNTIL_TOOLTIPS));

/**
 * Tooltips for the 'controls_flow_statements' block, keyed by FLOW value.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.Loops.BREAK_CONTINUE_TOOLTIPS = {
  'BREAK': '%{BKY_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK}',
  'CONTINUE': '%{BKY_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE}'
};

Blockly.Extensions.register('controls_flow_tooltip',
    Blockly.Extensions.buildTooltipForDropdown(
        'FLOW', Blockly.Constants.Loops.BREAK_CONTINUE_TOOLTIPS));

/**
 * Mixin to add a context menu item to create a 'variables_get' block.
 * Used by blocks 'controls_for' and 'controls_forEach'.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN = {
  /**
   * Add context menu option to create getter block for the loop's variable.
   * (customContextMenu support limited to web BlockSvg.)
   * @param {!Array} options List of menu options to add to.
   * @this {Blockly.Block}
   */
  customContextMenu: function(options) {
    if (this.isInFlyout) {
      return;
    }
    var variable = this.getField('VAR').getVariable();
    var varName = variable.name;
    if (!this.isCollapsed() && varName != null) {
      var option = {enabled: true};
      option.text =
          Blockly.Msg['VARIABLES_SET_CREATE_GET'].replace('%1', varName);
      var xmlField = Blockly.Variables.generateVariableFieldDom(variable);
      var xmlBlock = Blockly.utils.xml.createElement('block');
      xmlBlock.setAttribute('type', 'variables_get');
      xmlBlock.appendChild(xmlField);
      option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);
    }
  }
};

Blockly.Extensions.registerMixin('contextMenu_newGetVariableBlock',
    Blockly.Constants.Loops.CUSTOM_CONTEXT_MENU_CREATE_VARIABLES_GET_MIXIN);

Blockly.Extensions.register('controls_for_tooltip',
    Blockly.Extensions.buildTooltipWithFieldText(
        '%{BKY_CONTROLS_FOR_TOOLTIP}', 'VAR'));

Blockly.Extensions.register('controls_forEach_tooltip',
    Blockly.Extensions.buildTooltipWithFieldText(
        '%{BKY_CONTROLS_FOREACH_TOOLTIP}', 'VAR'));

/**
 * This mixin adds a check to make sure the 'controls_flow_statements' block
 * is contained in a loop. Otherwise a warning is added to the block.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN = {
  /**
   * List of block types that are loops and thus do not need warnings.
   * To add a new loop type add this to your code:
   * Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.LOOP_TYPES.push('custom_loop');
   */
  LOOP_TYPES: [
    'controls_repeat',
    'controls_repeat_ext',
    'controls_forEach',
    'controls_for',
    'controls_whileUntil',
    'controls_whileForever'
  ],

  /**
   * Don't automatically add STATEMENT_PREFIX and STATEMENT_SUFFIX to generated
   * code.  These will be handled manually in this block's generators.
   */
  suppressPrefixSuffix: true,

  /**
   * Is the given block enclosed (at any level) by a loop?
   * @param {!Blockly.Block} block Current block.
   * @return {Blockly.Block} The nearest surrounding loop, or null if none.
   */
  getSurroundLoop: function(block) {
    // Is the block nested in a loop?
    do {
      if (Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.LOOP_TYPES
          .indexOf(block.type) != -1) {
        return block;
      }
      block = block.getSurroundParent();
    } while (block);
    return null;
  },

  /**
   * Called whenever anything on the workspace changes.
   * Add warning if this flow block is not nested inside a loop.
   * @param {!Blockly.Events.Abstract} _e Change event.
   * @this {Blockly.Block}
   */
  onchange: function(_e) {
    if (!this.workspace.isDragging || this.workspace.isDragging()) {
      return;  // Don't change state at the start of a drag.
    }
    if (Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN
        .getSurroundLoop(this)) {
      this.setWarningText(null);
      if (!this.isInFlyout) {
        this.setEnabled(true);
      }
    } else {
      this.setWarningText(Blockly.Msg['CONTROLS_FLOW_STATEMENTS_WARNING']);
      if (!this.isInFlyout && !this.getInheritedDisabled()) {
        this.setEnabled(false);
      }
    }
  }
};

Blockly.Extensions.registerMixin('controls_flow_in_loop_check',
  Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN);

Blockly.Blocks.fable_wait_for_spin = {
  /**
   * @author Shape Robotics AS
   * @this Blockly.Block
   */
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.waitIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    const LABEL_PLACEHOLDER = 'wait until spin has finished driving';
    const TOOLTIP_PLACEHOLDER = 'Waits until both motors on the Spin have reached their target.';

    this.appendDummyInput().appendField(LABEL_PLACEHOLDER);
    this.appendDummyInput().appendField(Blockly.Msg.FABLE_ON_MODULE);

    this.appendDynamicIDInput(Blockly.Blocks.Definitions.requestedModules_Spin, [], [['#']]);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.prototypeStyle);
    this.setTooltip(TOOLTIP_PLACEHOLDER);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
    this.setWarningText('PROTOTYPE BLOCK - MIGHT NOT WORK IN LATER OFFICIAL RELEASES');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      'wait until spin has finished driving',
      '%{BKY_LOOPS}',
      '%{BKY_LABEL_TIME_CONTROL}'
    ];

    var toolboxKeywords = [];

    Blockly.Search.preprocessSearchKeywords('fable_wait_for_spin', keywords, toolboxKeywords);
  }
};
