/**
 * @fileoverview Generated Python code for obsolete blocks.
 * @author ivan@shaperobotics.com (Ivan Mladenov)
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
'use strict';

goog.provide('Blockly.Python.obsolete');

goog.require('Blockly.Python');

// ----------------------------------------------------------------------------------- //
// --[JOINT BLOCKS]------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
 * @replacement Blockly.Python.fable_read_joint_sensor
 * @deprecated
 */
Blockly.Python.fable_get_module_motor_position = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var id = block.getDynamicIDFieldString();
  var mid = block.getFieldValue('MOTOR_ID');
  var code = 'api.getPos(' + mid + ', ' + id + ')';

  return [code, order];
};

/**
 * @replacement Blockly.Python.fable_read_joint_sensor
 * @deprecated
 */
Blockly.Python.fable_get_module_motor_speed = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var id = block.getDynamicIDFieldString();
  var mid = block.getFieldValue('MOTOR_ID');
  var code = 'api.getSpeed(' + mid + ', ' + id + ')';

  return [code, order];
};

/**
 * @replacement Blockly.Python.fable_read_joint_sensor
 * @deprecated
 */
Blockly.Python.fable_get_module_motor_torque = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var id = block.getDynamicIDFieldString();
  var mid = block.getFieldValue('MOTOR_ID');
  var code = 'api.getTorque(' + mid + ', ' + id + ')';

  return [code, order];
};

// ----------------------------------------------------------------------------------- //
// --[SPIN BLOCKS]-------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
 * @removed
 */
Blockly.Python.fable_spin_gesture_detected = function (block) {
  const id = block.getDynamicIDFieldString();
  const gesture = block.getFieldValue('GESTURE');
  var code = 'api.getGestureDetected("' + gesture + '", ' + id + ')';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

/**
 * @removed
 */
Blockly.Python.fable_spin_turn_with_radius = function (block) {
  const id = block.getDynamicIDFieldString();
  const angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_NONE) || '0';
  const radius = Blockly.Python.valueToCode(block, 'RADIUS', Blockly.Python.ORDER_NONE) || '0';
  const metric = block.getFieldValue('METRIC');
  // let motor_speed = Blockly.Python.valueToCode(block, 'MOTOR_SPEED', Blockly.Python.ORDER_NONE) || '50';

  const code = 'api.spinTurn(' + angle + ', ' + radius + ', ' + metric + ', ' + id + ')\n';

  return code;
};

/**
 * @removed
 */
Blockly.Python.fable_spin_lift_and_hold = function (block) {
  const id = block.getDynamicIDFieldString();
  const angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_NONE) || 'None';
  const motorID = block.getFieldValue('MOTOR_ID');

  const code = 'api.spinLiftPos(' + angle + ', \'' + motorID + '\', moduleID=' + id + ')\n';

  return code;
};

// ----------------------------------------------------------------------------------- //
// --[FACE BLOCKS]-------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
 * @replacement Blockly.Python.fable_set_eyes_color
 * @deprecated
 */
Blockly.Python.fable_set_iris_color = function (block) {
  var color = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_NONE) || '[247, 148, 27]';
  var code = 'api.setIrisColor(' + color + ')\n';
  return code;
};

/**
 * @replacement Blockly.Python.fable_set_eyes_color
 * @deprecated
 */
Blockly.Python.fable_set_eyelid_color = function (block) {
  var color = Blockly.Python.valueToCode(block, 'COLOUR', Blockly.Python.ORDER_NONE) || '[247, 148, 27]';
  var code = 'api.setEyelidColor(' + color + ')\n';

  return code;
};

/**
 * @replacement Blockly.Python.fable_set_face_focus
 * @deprecated
 */
Blockly.Python.fable_set_face_focus_single_eye = function (block) {
  var x = Blockly.Python.valueToCode(block, 'POS_X', Blockly.Python.ORDER_NONE) || '0';
  var y = Blockly.Python.valueToCode(block, 'POS_Y', Blockly.Python.ORDER_NONE) || '0';
  var z = Blockly.Python.valueToCode(block, 'POS_Z', Blockly.Python.ORDER_NONE) || '0';
  var eye = block.getFieldValue('EYE');
  var code = 'api.setFaceFocus(' + x + ', ' + y + ', ' + z + ', ' + eye + ')\n';

  return code;
};

/**
 * @removed
 */
Blockly.Python.fable_set_face_blink = function (block) {
  var duration = Blockly.Python.valueToCode(block, 'BLINK_DURATION', Blockly.Python.ORDER_NONE) || '0';
  var code = 'api.setFaceBlink(' + duration + ')\n';

  return code;
};

/**
 * @removed
 */
Blockly.Python.fable_set_face_blink_single_eye = function (block) {
  var duration = Blockly.Python.valueToCode(block, 'BLINK_DURATION', Blockly.Python.ORDER_NONE) || '0';
  var eye = block.getFieldValue('EYE');
  var code = 'api.setFaceBlink(' + duration + ', ' + eye + ')\n';

  return code;
};

// ----------------------------------------------------------------------------------- //
// --[DATA BLOCKS]-------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
 * @replacement Blockly.Python.fable_save_as_csv
 * @deprecated
 */
Blockly.Python.fable_log = function (block) {
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || 'None';
  var filename = block.getFieldValue('FILENAME');
  var code = 'api.log(' + value + ', \'' + filename + '\')\n';

  return code;
};

// ----------------------------------------------------------------------------------- //
// --[LIST BLOCKS]-------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

/**
 * @replacement Blockly.Python.fable_lists_sort
 */
Blockly.Python['lists_sort'] = function (block) {
  var list = (Blockly.Python.valueToCode(block, 'LIST',
    Blockly.Python.ORDER_NONE) || '[]');
  var type = block.getFieldValue('TYPE');
  var reverse = block.getFieldValue('DIRECTION') === '1' ? 'False' : 'True';
  var sortFunctionName = Blockly.Python.provideFunction_('lists_sort',
  ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
      '(my_list, type, reverse):',
    '  def try_float(s):',
    '    try:',
    '      return float(s)',
    '    except:',
    '      return 0',
    '  key_funcs = {',
    '    "NUMERIC": try_float,',
    '    "TEXT": str,',
    '    "IGNORE_CASE": lambda s: str(s).lower()',
    '  }',
    '  key_func = key_funcs[type]',
    '  list_cpy = list(my_list)', // Clone the list.
    '  return sorted(list_cpy, key=key_func, reverse=reverse)'
  ]);

  var code = sortFunctionName +
      '(' + list + ', "' + type + '", ' + reverse + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

// ----------------------------------------------------------------------------------- //
// --[UNKNOWN - NO CATEGORY]---------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //
