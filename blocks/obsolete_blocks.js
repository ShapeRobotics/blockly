/**
 * @fileoverview Obsolete blocks for Fable Blockly.
 * @author ivan@shaperobotics.com (Ivan Mladenov)
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
'use strict';

goog.provide('Blockly.Blocks.obsolete'); // Deprecated
goog.provide('Blockly.Constants.Obsolete');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.Blocks.Definitions');
goog.require('Blockly.Mutator');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.FieldColour');
goog.require('Blockly.FieldLabel');

// ----------------------------------------------------------------------------------- //
// --[JOINT BLOCKS]------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
 * @deprecated UNKNOWN DATE
 * @replacement Blockly.Blocks.fable_read_joint_sensor
 */
Blockly.Blocks.fable_get_module_motor_position = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.jointIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_JOINT_MOTOR_GET_POSITION);

    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['X', '\'X\''], ['Y', '\'Y\'']]), 'MOTOR_ID');
    this.appendDummyInput().appendField(Blockly.Msg.FABLE_ON_MODULE);

    this.appendDynamicIDInput(Blockly.Blocks.Definitions.requestedModules_Joint, [], [['#']]);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.sensesStyle);
    this.setTooltip(Blockly.Msg.FABLE_JOINT_MOTOR_GET_POSITION_TOOLTIP);
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_get_module_motor_position', [], []);
  }
};

/**
 * @deprecated UNKNOWN DATE
 * @replacement Blockly.Blocks.fable_read_joint_sensor
 */
Blockly.Blocks.fable_get_module_motor_speed = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(Blockly.Blocks.Definitions.jointIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_JOINT_GET_MOTOR_SPEED);

    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['X', '\'X\''], ['Y', '\'Y\'']]), 'MOTOR_ID');

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_ON_MODULE);

    this.appendDynamicIDInput(Blockly.Blocks.Definitions.requestedModules_Joint, [], [['#']]);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.sensesStyle);
    this.setTooltip(Blockly.Msg.FABLE_JOINT_GET_MOTOR_SPEED_TOOLTIP);
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_get_module_motor_speed', [], []);
  }
};

/**
 * @deprecated UNKNOWN DATE
 * @replacement Blockly.Blocks.fable_read_joint_sensor
 */
Blockly.Blocks.fable_get_module_motor_torque = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(Blockly.Blocks.Definitions.jointIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image)
      .appendField(Blockly.Msg.FABLE_JOINT_GET_MOTOR_TORQUE);

    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['X', '\'X\''], ['Y', '\'Y\'']]), 'MOTOR_ID');

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_ON_MODULE);

    this.appendDynamicIDInput(Blockly.Blocks.Definitions.requestedModules_Joint, [], [['#']]);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.sensesStyle);
    this.setTooltip(Blockly.Msg.FABLE_JOINT_GET_MOTOR_TORQUE_TOOLTIP);
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_get_module_motor_torque', [], []);
  }
};

// ----------------------------------------------------------------------------------- //
// --[SPIN BLOCKS]-------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
 * @removed UNKNOWN DATE
 */
Blockly.Blocks.fable_spin_gesture_detected = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(Blockly.Blocks.Definitions.spinIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_SPIN_GESTURE_DETECTED);

    var gestureArray = [[Blockly.Msg.FABLE_SPIN_GESTURE_PUSH, 'push'],
      [Blockly.Msg.FABLE_SPIN_GESTURE_PULL, 'pull']];

    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(gestureArray), 'GESTURE');

    var sensorsArray = [[Blockly.Msg.FABLE_SPIN_ANY_MOTORS, 'any sensor'],
      ['1', '1'],
      ['2', '2'],
      ['3', '3']];

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_SPIN_FROM_SENSOR)
      .appendField(new Blockly.FieldDropdown(sensorsArray), 'SPIN_SENSOR');

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_ON_MODULE);

    this.appendDynamicIDInput(Blockly.Blocks.Definitions.requestedModules_Spin, [], [['#']]);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.sensesStyle);
    this.setTooltip(Blockly.Msg.FABLE_SPIN_GESTURE_DETECTED_TOOLTIP);
    this.setOutput(true, 'Boolean');
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_spin_gesture_detected', [], []);
  }
};

/**
 * @removed UNKNOWN DATE
 */
Blockly.Blocks.fable_spin_turn_with_radius = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(Blockly.Blocks.Definitions.spinIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendValueInput('ANGLE')
      .appendField(Blockly.Msg.FABLE_SPIN_SET_TURN)
      .setCheck('Number');

    this.appendValueInput('RADIUS')
      .appendField(Blockly.Msg.FABLE_SPIN_SET_RADIUS)
      .setCheck('Number');

    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.CENTIMETERS, '\'cm\''],
        [Blockly.Msg.MILLIMETERS, '\'mm\''],
        [Blockly.Msg.FEET, '\'ft\''],
        [Blockly.Msg.INCHES, '\'in\'']]),
      'METRIC');

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_ON_MODULE);

    this.appendDynamicIDInput(Blockly.Blocks.Definitions.requestedModules_Spin, [], [['#']]);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.actionStyle);
    this.setTooltip(Blockly.Msg.FABLE_SPIN_SET_TURN_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_spin_turn_with_radius', [], []);
  }
};

/**
 * @removed UNKNOWN DATE
 */
Blockly.Blocks.fable_spin_lift_and_hold = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(Blockly.Blocks.Definitions.spinIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_SPIN_LIFT_MOTOR);

    const motorArray = [[Blockly.Msg.FABLE_SPIN_MOTOR_A, 'A'],
      [Blockly.Msg.FABLE_SPIN_MOTOR_B, 'B']];

    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(motorArray), 'MOTOR_ID');

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_SPIN_TO_ANGLE);

    this.appendValueInput('ANGLE')
      .setCheck('Number');

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_ON_MODULE);

    this.appendDynamicIDInput(Blockly.Blocks.Definitions.requestedModules_Spin, [], [['#']]);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.actionStyle);
    this.setTooltip(Blockly.Msg.FABLE_SPIN_LIFT_MOTOR_TOOLTIP); // change tool tip in translations
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_spin_lift_and_hold', [], []);
  }
};

// ----------------------------------------------------------------------------------- //
// --[FACE BLOCKS]-------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
 * @deprecated UNKNOWN DATE
 * @replacement Blockly.Blocks.fable_set_eyes_color
 */
Blockly.Blocks.fable_set_iris_color = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(Blockly.Blocks.Definitions.eyeIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image)
      .appendField(Blockly.Msg.FABLE_FACE_SET_IRIS_COLOR);

    this.appendValueInput('COLOUR')
      .setCheck('Colour');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.actionStyle);
    this.setTooltip(Blockly.Msg.FABLE_FACE_SET_IRIS_COLOR_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_set_iris_color', [], []);
  }
};

/**
 * @deprecated UNKNOWN DATE
 * @replacement Blockly.Blocks.fable_set_eyes_color
 */
Blockly.Blocks.fable_set_eyelid_color = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(Blockly.Blocks.Definitions.eyeIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');

    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_FACE_SET_EYELID_COLOR);

    this.appendValueInput('COLOUR')
      .setCheck('Colour');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.actionStyle);
    this.setTooltip(Blockly.Msg.FABLE_FACE_SET_EYELID_COLOR_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_set_eyelid_color', [], []);
  }
};

/**
 * @deprecated UNKNOWN DATE
 * @replacement Blockly.Blocks.fable_set_face_focus
 */
Blockly.Blocks.fable_set_face_focus_single_eye = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(Blockly.Blocks.Definitions.eyeIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_FACE_SET_FOCUS_SINGLE_EYE_PREFIX)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.FACE_BOTH_EYES, '\'Both\''],
        [Blockly.Msg.FACE_LEFT_EYE, '\'Left\''],
        [Blockly.Msg.FACE_RIGHT_EYE, '\'Right\'']]),
      'EYE');

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_FACE_SET_FOCUS_SINGLE_EYE_POSTFIX);

    this.appendValueInput('POS_X')
      .appendField('X: ')
      .setCheck('Number');

    this.appendValueInput('POS_Y')
      .appendField('Y: ')
      .setCheck('Number');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.actionStyle);
    this.setTooltip(Blockly.Msg.FABLE_FACE_SET_FOCUS_SINGLE_EYE_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_set_face_focus_single_eye', [], []);
  }
};

/**
 * @removed UNKNOWN DATE
 */
Blockly.Blocks.fable_set_face_blink = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(Blockly.Blocks.Definitions.eyeIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_FACE_SET_BLINK);

    this.appendValueInput('BLINK_DURATION')
      .setCheck('Number');

    this.appendDummyInput()
      .appendField(Blockly.Msg.SECONDS);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.actionStyle);
    this.setTooltip(Blockly.Msg.FABLE_FACE_SET_BLINK_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_set_face_blink', [], []);
  }
};

/**
 * @removed UNKNOWN DATE
 */
Blockly.Blocks.fable_set_face_blink_single_eye = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(Blockly.Blocks.Definitions.eyeIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_FACE_SET_BLINK_SINGLE_EYE_PREFIX)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.FACE_BOTH_EYES, '\'Both\''],
        [Blockly.Msg.FACE_LEFT_EYE, '\'Left\''],
        [Blockly.Msg.FACE_RIGHT_EYE, '\'Right\'']]),
      'EYE');

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_FACE_SET_BLINK_SINGLE_EYE_POSTFIX);

    this.appendValueInput('BLINK_DURATION')
      .setCheck('Number');

    this.appendDummyInput()
      .appendField(Blockly.Msg.SECONDS);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.actionStyle);
    this.setTooltip(Blockly.Msg.FABLE_FACE_SET_BLINK_SINGLE_EYE_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_set_face_blink_single_eye', [], []);
  }
};

// ----------------------------------------------------------------------------------- //
// --[DATA BLOCKS]-------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
 * @deprecated 07/03/2021
 * @replacement Blockly.Blocks.fable_save_as_csv
 */
Blockly.Blocks.fable_log = {
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.saveIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_LOG);

    this.appendValueInput('VALUE')
      .setCheck(null);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_LOG_IN_FILE)
      .appendField(new Blockly.FieldTextInput('Fable-log.csv'), 'FILENAME');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.dataStyle);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.FABLE_LOG_TOOLTIP);
    this.setHelpUrl('http://www.example.com/');

    const deprecationMsg = 'This block is deprecated. Please update your program by dragging the new SAVE LOG block.'
    this.setWarningText(deprecationMsg, 'deprecatedBlock');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('fable_log', [], []);
  }
};

// ----------------------------------------------------------------------------------- //
// --[LIST BLOCKS]-------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
 * @deprecated 29/06/2021
 * @replacement Blockly.Blocks.fable_lists_sort
 */
Blockly.Blocks['lists_sort'] = {
  /**
   * Block for sorting a list.
   * @this {Blockly.Block}
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg['LISTS_SORT_TITLE'],
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TYPE",
          "options": [
            [Blockly.Msg['LISTS_SORT_TYPE_NUMERIC'], "NUMERIC"],
            [Blockly.Msg['LISTS_SORT_TYPE_TEXT'], "TEXT"],
            [Blockly.Msg['LISTS_SORT_TYPE_IGNORECASE'], "IGNORE_CASE"]
          ]
        },
        {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [
            [Blockly.Msg['LISTS_SORT_ORDER_ASCENDING'], "1"],
            [Blockly.Msg['LISTS_SORT_ORDER_DESCENDING'], "-1"]
          ]
        },
        {
          "type": "input_value",
          "name": "LIST",
          "check": "Array"
        }
      ],
      "output": "Array",
      "style": "list_blocks",
      "tooltip": Blockly.Msg['LISTS_SORT_TOOLTIP'],
      "helpUrl": Blockly.Msg['LISTS_SORT_HELPURL']
    });

    const depecrationMsg = 'This block is deprecated. Please update your program by dragging the new SORT block.';
    this.setWarningText(depecrationMsg, 'deprecatedBlock');
  },
  ensureSearchKeywords: function () {
    Blockly.Search.preprocessSearchKeywords('lists_sort', [], []);
  }
};

// ----------------------------------------------------------------------------------- //
// --[UNKNOWN - NO CATEGORY]---------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

Blockly.Blocks.empty_block = {
  /**
     * Block with label, used as placeholder when most used category is empty.
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldLabel(Blockly.Msg.FABLE_EMPTY_PLACEHOLDER_1));
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldLabel(Blockly.Msg.FABLE_EMPTY_PLACEHOLDER_2));

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.mathStyle);
    this.setOutput(false);
    this.disabled = true;
    this.contextMenu = false;
  },
  ensureSearchKeywords: function () {
    // TODO:
    var keywords = [
      // 'blank'
    ];

    Blockly.Search.preprocessSearchKeywords('empty_block', keywords);
  }
};
