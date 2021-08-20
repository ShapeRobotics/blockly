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
 * @fileoverview Math blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.math'); // Deprecated
goog.provide('Blockly.Constants.Math');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.Blocks.Definitions');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.FieldNumber');
goog.require('Blockly.FieldVariable');

/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg['MATH_HUE']. (2018 April 5)
 */
Blockly.Constants.Math.HUE = 230;

Blockly.Blocks.fable_angle = {
  /**
     * Block for setting angle
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    this.appendDummyInput('normalAngleType')
      .appendField(Blockly.Msg.FABLE_ANGLE)
      .appendField(new Blockly.FieldAngle(0), 'ANGLE');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.mathStyle);
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
    this.fullModeEnabled_ = true;
  },
  onchange: function (event) {
    // If a global event happens that doesn't affect this block, skip the event
    if (!event.blockId) {
      return;
    }

    // Ensure that either A) the angle block was moved into a new parent block, or
    // B) the block was created into a parenting block
    // In both of these cases, make sure to convert to a normal or to a joint block depending on the parent.
    if (event.blockId === this.id &&
        event.type === Blockly.Events.MOVE &&
        (event.newParentId || event.oldParentId)) {
      this.updateShape_();
    } else if (event.type === Blockly.Events.CREATE &&
               event.ids.includes(this.id)) {
      this.updateShape_();
    }
  },
  // Contains a list of all blocks that trigger a change into a joint block
  jointBlocks: [
    'fable_set_module_motor_positions',
    'fable_set_module_motor_pos_speed',
    'fable_set_module_motor_position'
  ],
  // Changes the block to a joint or a normal 360 angle depending on its parent
  updateShape_: function () {
    // If there is a parent block, check if it's a joint block
    if (this.parentBlock_ && this.fullModeEnabled_) {
      const parentType = this.parentBlock_.type;

      // If the parent block is a joint block, update the insides of this.
      if (this.jointBlocks.includes(parentType)) {
        // Get the current angle and clamp its value
        let val = parseInt(this.getFieldValue('ANGLE'));
        if (val > 90) {
          if (val < 270) {
            val = 90;
          } else {
            val = val - 360;
          }
        }

        // Add a joint angle picker
        this.appendDummyInput('jointAngleType')
          .appendField(Blockly.Msg.FABLE_ANGLE)
          .appendField(new Blockly.FieldJointAngle(val), 'ANGLE');

        // And remove the current 360 picker
        this.removeInput('normalAngleType');

        // Raise a flag
        this.fullModeEnabled_ = false;
      }
    } else if (!this.fullModeEnabled_) {
      // If there is no parent block (or the flag has been raised), change back to 360 block
      // Get the current angle and clamp its value
      let val = parseInt(this.getFieldValue('ANGLE'));
      if (val < 0) {
        val = val + 360;
      }

      // Add a normal 360 degree picker
      this.appendDummyInput('normalAngleType')
        .appendField(Blockly.Msg.FABLE_ANGLE)
        .appendField(new Blockly.FieldAngle(val), 'ANGLE');

      // Remove the joint angle picker
      this.removeInput('jointAngleType');

      // Raise a flag
      this.fullModeEnabled_ = true;
    }
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_ANGLE,
      '%{BKY_MATH}',
      '%{BKY_LABEL_TRIGONOMETRY}'
    ];

    var toolboxKeywords = [];

    Blockly.Search.preprocessSearchKeywords('fable_angle', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.fable_joint_angle = {
  /**
     * Block for setting angle
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_ANGLE)
      .appendField(new Blockly.FieldJointAngle(0), 'ANGLE');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.mathStyle);
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_ANGLE,
      '%{BKY_MATH}',
      '%{BKY_LABEL_TRIGONOMETRY}'
    ];

    var toolboxKeywords = [];

    Blockly.Search.preprocessSearchKeywords('fable_joint_angle', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.math_min_max = {
  /**
     * Block for getting the max/min between two numbers.
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_MATH_GET)
      .appendField(new Blockly.FieldDropdown([[Blockly.Msg.FABLE_MATH_MIN, 'min'],
        [Blockly.Msg.FABLE_MATH_MAX, 'max']]), 'MIN_MAX')
      .appendField(Blockly.Msg.FABLE_MATH_BETWEEN);

    this.appendValueInput('NUM_1')
      .setCheck('Number');

    this.appendValueInput('NUM_2')
      .setCheck('Number');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.mathStyle);
    this.setTooltip(Blockly.Msg.FABLE_MIN_MAX_TOOLTIP);
    this.setOutput(true, 'Number');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_MATH_GET,
      Blockly.Msg.FABLE_MATH_BETWEEN,
      '%{BKY_MATH}',
      '%{BKY_LABEL_MATH_FUNCTION}'
    ];

    var toolboxKeywords = [
      Blockly.Msg.FABLE_MATH_MIN,
      Blockly.Msg.FABLE_MATH_MAX
    ];

    Blockly.Search.preprocessSearchKeywords('math_min_max', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.math_single = {
  /**
   * Block for advanced math operators with single operand.
   * @override Blockly.Block.math_single JSON definition
   * @this Blockly.Block
   */
  init: function () {
    var mathOperatorOptions = [
      [Blockly.Msg.MATH_SINGLE_OP_ROOT, 'ROOT'],
      [Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE, 'ABS'],
      ['-', 'NEG'],
      ['ln', 'LN'],
      ['log10', 'LOG10'],
      ['e^', 'EXP'],
      ['10^', 'POW10']
    ];
    var operatorDropdown = new Blockly.FieldDropdown(mathOperatorOptions);

    this.appendDummyInput().appendField(operatorDropdown, 'OP');
    this.appendValueInput('NUM').setCheck('Number');

    this.setStyle(Blockly.Blocks.Definitions.mathStyle);

    const _this = this;
    this.setTooltip(function () {
      const operator = _this.getFieldValue('OP');

      var TOOLTIPS = {
        ROOT: Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT,
        ABS: Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS,
        NEG: Blockly.Msg.MATH_SINGLE_TOOLTIP_NEG,
        LN: Blockly.Msg.MATH_SINGLE_TOOLTIP_LN,
        LOG10: Blockly.Msg.MATH_SINGLE_TOOLTIP_LOG10,
        EXP: Blockly.Msg.MATH_SINGLE_TOOLTIP_EXP,
        POW10: Blockly.Msg.MATH_SINGLE_TOOLTIP_POW10
      };

      try {
        return TOOLTIPS[operator];
      } catch (err) {
        return 'math_single_tooltip';
      }
    });

    this.setOutput(true, 'Number');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      '%{BKY_MATH}',
      '%{BKY_LABEL_ARITHMETICS}'
    ];

    var toolboxKeywords = [
      Blockly.Msg.MATH_SINGLE_OP_ROOT,
      Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE,
      '-',
      'ln',
      'log10',
      'e^',
      '10^'
    ];

    Blockly.Search.preprocessSearchKeywords('math_single', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.math_number_property = {
  /**
   * Block for checking if a number is even, odd, prime, whole, positive,
   * negative or if it is divisible by certain number.
   * @override Blockly.Block.math_number_property JSON definition
   * @this Blockly.Block
   */
  init: function () {
    this.appendValueInput('NUMBER_TO_CHECK').setCheck('Number');

    var numberPropertyOptions = [
      [Blockly.Msg.MATH_IS_EVEN, 'EVEN'],
      [Blockly.Msg.MATH_IS_ODD, 'ODD'],
      [Blockly.Msg.MATH_IS_PRIME, 'PRIME'],
      [Blockly.Msg.MATH_IS_WHOLE, 'WHOLE'],
      [Blockly.Msg.MATH_IS_POSITIVE, 'POSITIVE'],
      [Blockly.Msg.MATH_IS_NEGATIVE, 'NEGATIVE'],
      [Blockly.Msg.MATH_IS_DIVISIBLE_BY, 'DIVISIBLE_BY']
    ];

    const _this = this;
    var numberPropertyDropdown = new Blockly.FieldDropdown(numberPropertyOptions, function (option) {
      _this.updateShape_(option === 'DIVISIBLE_BY');
    });

    this.appendDummyInput().appendField(numberPropertyDropdown, 'PROPERTY');

    this.setStyle(Blockly.Blocks.Definitions.mathStyle);
    this.setTooltip(Blockly.Msg.MATH_IS_TOOLTIP);
    this.setOutput(true, 'Boolean');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      '%{BKY_MATH}',
      '%{BKY_LABEL_MATH_FUNCTION}'
    ];

    var toolboxKeywords = [
      Blockly.Msg.MATH_IS_EVEN,
      Blockly.Msg.MATH_IS_ODD,
      Blockly.Msg.MATH_IS_PRIME,
      Blockly.Msg.MATH_IS_WHOLE,
      Blockly.Msg.MATH_IS_POSITIVE,
      Blockly.Msg.MATH_IS_NEGATIVE,
      Blockly.Msg.MATH_IS_DIVISIBLE_BY
    ];

    Blockly.Search.preprocessSearchKeywords('math_number_property', keywords, toolboxKeywords);
  },
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    var divisorInput = (this.getFieldValue('PROPERTY') === 'DIVISIBLE_BY');
    container.setAttribute('divisor_input', divisorInput);
    return container;
  },
  domToMutation: function (xmlElement) {
    var divisorInput = (xmlElement.getAttribute('divisor_input') === 'true');
    this.updateShape_(divisorInput);
  },
  updateShape_: function (divisorInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('DIVISOR');
    if (divisorInput) {
      if (!inputExists) {
        this.appendValueInput('DIVISOR').setCheck('Number');
      }
    } else if (inputExists) {
      this.removeInput('DIVISOR');
    }
  }
};

Blockly.Blocks.math_round = {
  /**
   * Block for rounding functions.
   * @override Blockly.Block.math_round JSON definition
   * @this Blockly.Block
   */
  init: function () {
    var roundingOptions = [
      [Blockly.Msg.MATH_ROUND_OPERATOR_ROUND, 'ROUND'],
      [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDUP, 'ROUNDUP'],
      [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDDOWN, 'ROUNDDOWN']
    ];
    var roundingDropdown = new Blockly.FieldDropdown(roundingOptions);

    this.appendDummyInput().appendField(roundingDropdown, 'OP');
    this.appendValueInput('NUM').setCheck('Number');

    this.setStyle(Blockly.Blocks.Definitions.mathStyle);
    this.setTooltip(Blockly.Msg.MATH_ROUND_TOOLTIP);
    this.setOutput(true, 'Number');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      '%{BKY_MATH}',
      '%{BKY_LABEL_MATH_FUNCTION}'
    ];

    var toolboxKeywords = [
      Blockly.Msg.MATH_ROUND_OPERATOR_ROUND,
      Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDUP,
      Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDDOWN
    ];

    Blockly.Search.preprocessSearchKeywords('math_round', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.math_on_list = {
  /**
   * Block for evaluating a list of numbers to return sum, average, min, max,
   * etc.  Some functions also work on text (min, max, mode, median).
   * @override Blockly.Block.math_on_list JSON definition
   * @this Blockly.Block
   */
  init: function () {
    var onListOperators = [
      [Blockly.Msg.MATH_ONLIST_OPERATOR_SUM, 'SUM'],
      [Blockly.Msg.MATH_ONLIST_OPERATOR_MIN, 'MIN'],
      [Blockly.Msg.MATH_ONLIST_OPERATOR_MAX, 'MAX'],
      [Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE, 'AVERAGE'],
      [Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN, 'MEDIAN'],
      [Blockly.Msg.MATH_ONLIST_OPERATOR_MODE, 'MODE'],
      [Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV, 'STD_DEV'],
      [Blockly.Msg.MATH_ONLIST_OPERATOR_RANDOM, 'RANDOM']
    ];

    const _this = this;

    var operatorsDropdown = new Blockly.FieldDropdown(onListOperators, function (option) {
      _this.updateType_(option);
    });

    this.appendDummyInput().appendField(operatorsDropdown, 'OP');

    this.appendValueInput('LIST').setCheck('Array');

    this.setStyle(Blockly.Blocks.Definitions.mathStyle);

    this.setTooltip(function () {
      const operator = _this.getFieldValue('OP');

      var TOOLTIPS = {
        SUM: Blockly.Msg.MATH_ONLIST_TOOLTIP_SUM,
        MIN: Blockly.Msg.MATH_ONLIST_TOOLTIP_MIN,
        MAX: Blockly.Msg.MATH_ONLIST_TOOLTIP_MAX,
        AVERAGE: Blockly.Msg.MATH_ONLIST_TOOLTIP_AVERAGE,
        MEDIAN: Blockly.Msg.MATH_ONLIST_TOOLTIP_MEDIAN,
        MODE: Blockly.Msg.MATH_ONLIST_TOOLTIP_MODE,
        STD_DEV: Blockly.Msg.MATH_ONLIST_TOOLTIP_STD_DEV,
        RANDOM: Blockly.Msg.MATH_ONLIST_TOOLTIP_RANDOM
      };

      try {
        return TOOLTIPS[operator];
      } catch (err) {
        return 'math_on_list';
      }
    });

    this.setOutput(true, 'Number');
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      '%{BKY_MATH}',
      '%{BKY_LABEL_MATH_FUNCTION}'
    ];

    var toolboxKeywords = [
      Blockly.Msg.MATH_ONLIST_OPERATOR_SUM,
      Blockly.Msg.MATH_ONLIST_OPERATOR_MIN,
      Blockly.Msg.MATH_ONLIST_OPERATOR_MAX,
      Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE,
      Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN,
      Blockly.Msg.MATH_ONLIST_OPERATOR_MODE,
      Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV,
      Blockly.Msg.MATH_ONLIST_OPERATOR_RANDOM
    ];

    Blockly.Search.preprocessSearchKeywords('math_on_list', keywords, toolboxKeywords);
  },
  updateType_: function (newOp) {
    if (newOp === 'MODE') {
      this.outputConnection.setCheck('Array');
    } else {
      this.outputConnection.setCheck('Number');
    }
  },
  mutationToDom: function () {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('op', this.getFieldValue('OP'));
    return container;
  },
  domToMutation: function (xmlElement) {
    this.updateType_(xmlElement.getAttribute('op'));
  }
};

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for numeric value.
  {
    "type": "math_number",
    "message0": "%1",
    "args0": [{
      "type": "field_number",
      "name": "NUM",
      "value": 0
    }],
    "output": "Number",
    "helpUrl": "%{BKY_MATH_NUMBER_HELPURL}",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_NUMBER_TOOLTIP}",
    "extensions": ["parent_tooltip_when_inline"],
    "search_keywords": [
      "%{BKY_MATH}",
      "%{BKY_LABEL_ARITHMETICS}"
    ],
    "search_toolbox_keywords": []
  },

  // Block for basic arithmetic operator.
  {
    "type": "math_arithmetic",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
          ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
          ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
          ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
          ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "style": "math_blocks",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    "extensions": ["math_op_tooltip"],
    "search_keywords": [
        "%{BKY_MATH}",
        "%{BKY_LABEL_ARITHMETICS}"
    ],
    "search_toolbox_keywords": [
      "%{BKY_MATH_ADDITION_SYMBOL}",
      "%{BKY_MATH_SUBTRACTION_SYMBOL}",
      "%{BKY_MATH_MULTIPLICATION_SYMBOL}",
      "%{BKY_MATH_DIVISION_SYMBOL}",
      "%{BKY_MATH_POWER_SYMBOL}"
    ]
  },

  // Block for trigonometry operators.
  {
    "type": "math_trig",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_TRIG_SIN}", "SIN"],
          ["%{BKY_MATH_TRIG_COS}", "COS"],
          ["%{BKY_MATH_TRIG_TAN}", "TAN"],
          ["%{BKY_MATH_TRIG_ASIN}", "ASIN"],
          ["%{BKY_MATH_TRIG_ACOS}", "ACOS"],
          ["%{BKY_MATH_TRIG_ATAN}", "ATAN"]
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }
    ],
    "output": "Number",
    "style": "math_blocks",
    "helpUrl": "%{BKY_MATH_TRIG_HELPURL}",
    "extensions": ["math_op_tooltip"],
    "search_keywords": [
        "%{BKY_MATH}",
        "%{BKY_LABEL_TRIGONOMETRY}"
    ],
    "search_toolbox_keywords": [
      "%{BKY_MATH_TRIG_SIN}",
      "%{BKY_MATH_TRIG_COS}",
      "%{BKY_MATH_TRIG_TAN}",
      "%{BKY_MATH_TRIG_ASIN}",
      "%{BKY_MATH_TRIG_ACOS}",
      "%{BKY_MATH_TRIG_ATAN}"
    ]
  },

  // Block for constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  {
    "type": "math_constant",
    "message0": "%1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "CONSTANT",
        "options": [
          ["\u03c0", "PI"],
          ["e", "E"],
          ["\u03c6", "GOLDEN_RATIO"],
          ["sqrt(2)", "SQRT2"],
          ["sqrt(\u00bd)", "SQRT1_2"],
          ["\u221e", "INFINITY"]
        ]
      }
    ],
    "output": "Number",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_CONSTANT_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_CONSTANT_HELPURL}",
    "search_keywords": [
        "%{BKY_MATH}",
        "%{BKY_LABEL_TRIGONOMETRY}"
    ],
    "search_toolbox_keywords": [
      "\u03c0",
      "e",
      "\u03c6",
      "sqrt(2)",
      "sqrt(\u00bd)",
      "\u221e"
    ]
  },

  // Block for adding to a variable in place.
  {
    "type": "math_change",
    "message0": "%{BKY_MATH_CHANGE_TITLE}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_MATH_CHANGE_TITLE_ITEM}"
      },
      {
        "type": "input_value",
        "name": "DELTA",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "variable_blocks",
    "helpUrl": "%{BKY_MATH_CHANGE_HELPURL}",
    "extensions": ["math_change_tooltip"],
    "search_keywords": [
      "%{BKY_MATH_CHANGE_TITLE}",
      "%{BKY_MATH}",
      "%{BKY_LABEL_MATH_FUNCTION}",
      "%{BKY_FABLE_SEARCH_KEYWORD_VARIABLES_SET}"
    ],
    "search_toolbox_keywords": []
  },

  // Block for remainder of a division.
  {
    "type": "math_modulo",
    "message0": "%{BKY_MATH_MODULO_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "DIVIDEND",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "DIVISOR",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_MODULO_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_MODULO_HELPURL}",
    "search_keywords": [
        "%{BKY_MATH_MODULO_TITLE}",
        "%{BKY_MATH}",
        "%{BKY_LABEL_MATH_FUNCTION}"
    ],
    "search_toolbox_keywords": []
  },

  // Block for constraining a number between two limits.
  {
    "type": "math_constrain",
    "message0": "%{BKY_MATH_CONSTRAIN_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "LOW",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "HIGH",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_CONSTRAIN_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_CONSTRAIN_HELPURL}",
    "search_keywords": [
        "%{BKY_MATH_CONSTRAIN_TITLE}",
        "%{BKY_MATH}",
        "%{BKY_LABEL_MATH_FUNCTION}"
    ],
    "search_toolbox_keywords": []
  },

  // Block for random integer between [X] and [Y].
  {
    "type": "math_random_int",
    "message0": "%{BKY_MATH_RANDOM_INT_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "FROM",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "TO",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_RANDOM_INT_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_RANDOM_INT_HELPURL}",
    "search_keywords": [
        "%{BKY_MATH_RANDOM_INT_TITLE}",
        "%{BKY_MATH}",
        "%{BKY_LABEL_MATH_FUNCTION}"
    ],
    "search_toolbox_keywords": []
  },

  // Block for random integer between [X] and [Y].
  {
    "type": "math_random_float",
    "message0": "%{BKY_MATH_RANDOM_FLOAT_TITLE_RANDOM}",
    "output": "Number",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_RANDOM_FLOAT_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_RANDOM_FLOAT_HELPURL}",
    "search_keywords": [
        "%{BKY_MATH_RANDOM_FLOAT_TITLE_RANDOM}",
        "%{BKY_MATH}",
        "%{BKY_LABEL_MATH_FUNCTION}"
    ],
    "search_toolbox_keywords": []
  },

  // Block for calculating atan2 of [X] and [Y].
  {
    "type": "math_atan2",
    "message0": "%{BKY_MATH_ATAN2_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "X",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "Y",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "style": "math_blocks",
    "tooltip": "%{BKY_MATH_ATAN2_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_ATAN2_HELPURL}",
    "search_keywords": [
        "%{BKY_MATH_ATAN2_TITLE}",
        "%{BKY_MATH}",
        "%{BKY_LABEL_MATH_FUNCTION}"
    ],
    "search_toolbox_keywords": []
  }
]);  // END JSON EXTRACT (Do not delete this comment.)

/**
 * Mapping of math block OP value to tooltip message for blocks
 * math_arithmetic, math_simple, math_trig, and math_on_lists.
 * @see {Blockly.Extensions#buildTooltipForDropdown}
 * @package
 * @readonly
 */
Blockly.Constants.Math.TOOLTIPS_BY_OP = {
  // math_arithmetic
  'ADD': '%{BKY_MATH_ARITHMETIC_TOOLTIP_ADD}',
  'MINUS': '%{BKY_MATH_ARITHMETIC_TOOLTIP_MINUS}',
  'MULTIPLY': '%{BKY_MATH_ARITHMETIC_TOOLTIP_MULTIPLY}',
  'DIVIDE': '%{BKY_MATH_ARITHMETIC_TOOLTIP_DIVIDE}',
  'POWER': '%{BKY_MATH_ARITHMETIC_TOOLTIP_POWER}',

  // math_simple
  'ROOT': '%{BKY_MATH_SINGLE_TOOLTIP_ROOT}',
  'ABS': '%{BKY_MATH_SINGLE_TOOLTIP_ABS}',
  'NEG': '%{BKY_MATH_SINGLE_TOOLTIP_NEG}',
  'LN': '%{BKY_MATH_SINGLE_TOOLTIP_LN}',
  'LOG10': '%{BKY_MATH_SINGLE_TOOLTIP_LOG10}',
  'EXP': '%{BKY_MATH_SINGLE_TOOLTIP_EXP}',
  'POW10': '%{BKY_MATH_SINGLE_TOOLTIP_POW10}',

  // math_trig
  'SIN': '%{BKY_MATH_TRIG_TOOLTIP_SIN}',
  'COS': '%{BKY_MATH_TRIG_TOOLTIP_COS}',
  'TAN': '%{BKY_MATH_TRIG_TOOLTIP_TAN}',
  'ASIN': '%{BKY_MATH_TRIG_TOOLTIP_ASIN}',
  'ACOS': '%{BKY_MATH_TRIG_TOOLTIP_ACOS}',
  'ATAN': '%{BKY_MATH_TRIG_TOOLTIP_ATAN}',

  // math_on_lists
  'SUM': '%{BKY_MATH_ONLIST_TOOLTIP_SUM}',
  'MIN': '%{BKY_MATH_ONLIST_TOOLTIP_MIN}',
  'MAX': '%{BKY_MATH_ONLIST_TOOLTIP_MAX}',
  'AVERAGE': '%{BKY_MATH_ONLIST_TOOLTIP_AVERAGE}',
  'MEDIAN': '%{BKY_MATH_ONLIST_TOOLTIP_MEDIAN}',
  'MODE': '%{BKY_MATH_ONLIST_TOOLTIP_MODE}',
  'STD_DEV': '%{BKY_MATH_ONLIST_TOOLTIP_STD_DEV}',
  'RANDOM': '%{BKY_MATH_ONLIST_TOOLTIP_RANDOM}'
};

Blockly.Extensions.register('math_op_tooltip',
    Blockly.Extensions.buildTooltipForDropdown(
        'OP', Blockly.Constants.Math.TOOLTIPS_BY_OP));


/**
 * Mixin for mutator functions in the 'math_is_divisibleby_mutator'
 * extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Math.IS_DIVISIBLEBY_MUTATOR_MIXIN = {
  /**
   * Create XML to represent whether the 'divisorInput' should be present.
   * @return {Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var divisorInput = (this.getFieldValue('PROPERTY') == 'DIVISIBLE_BY');
    container.setAttribute('divisor_input', divisorInput);
    return container;
  },
  /**
   * Parse XML to restore the 'divisorInput'.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
    this.updateShape_(divisorInput);
  },
  /**
   * Modify this block to have (or not have) an input for 'is divisible by'.
   * @param {boolean} divisorInput True if this block has a divisor input.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function(divisorInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('DIVISOR');
    if (divisorInput) {
      if (!inputExists) {
        this.appendValueInput('DIVISOR')
            .setCheck('Number');
      }
    } else if (inputExists) {
      this.removeInput('DIVISOR');
    }
  }
};

/**
 * 'math_is_divisibleby_mutator' extension to the 'math_property' block that
 * can update the block shape (add/remove divisor input) based on whether
 * property is "divisble by".
 * @this {Blockly.Block}
 * @package
 */
Blockly.Constants.Math.IS_DIVISIBLE_MUTATOR_EXTENSION = function() {
  this.getField('PROPERTY').setValidator(function(option) {
    var divisorInput = (option == 'DIVISIBLE_BY');
    this.getSourceBlock().updateShape_(divisorInput);
  });
};

Blockly.Extensions.registerMutator('math_is_divisibleby_mutator',
    Blockly.Constants.Math.IS_DIVISIBLEBY_MUTATOR_MIXIN,
    Blockly.Constants.Math.IS_DIVISIBLE_MUTATOR_EXTENSION);

// Update the tooltip of 'math_change' block to reference the variable.
Blockly.Extensions.register('math_change_tooltip',
    Blockly.Extensions.buildTooltipWithFieldText(
        '%{BKY_MATH_CHANGE_TOOLTIP}', 'VAR'));

/**
 * Mixin with mutator methods to support alternate output based if the
 * 'math_on_list' block uses the 'MODE' operation.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Math.LIST_MODES_MUTATOR_MIXIN = {
  /**
   * Modify this block to have the correct output type.
   * @param {string} newOp Either 'MODE' or some op than returns a number.
   * @private
   * @this {Blockly.Block}
   */
  updateType_: function(newOp) {
    if (newOp == 'MODE') {
      this.outputConnection.setCheck('Array');
    } else {
      this.outputConnection.setCheck('Number');
    }
  },
  /**
   * Create XML to represent the output type.
   * @return {Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('op', this.getFieldValue('OP'));
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    this.updateType_(xmlElement.getAttribute('op'));
  }
};

/**
 * Extension to 'math_on_list' blocks that allows support of
 * modes operation (outputs a list of numbers).
 * @this {Blockly.Block}
 * @package
 */
Blockly.Constants.Math.LIST_MODES_MUTATOR_EXTENSION = function() {
  this.getField('OP').setValidator(function(newOp) {
    this.updateType_(newOp);
  }.bind(this));
};

Blockly.Extensions.registerMutator('math_modes_of_list_mutator',
    Blockly.Constants.Math.LIST_MODES_MUTATOR_MIXIN,
    Blockly.Constants.Math.LIST_MODES_MUTATOR_EXTENSION);
