/**
 * @fileoverview Generating Python for senses/joint blocks.
 * @author ivan@shaperobotics.com (Ivan Mladenov)
 */
'use strict';

goog.provide('Blockly.Python.sensesJoint');

goog.require('Blockly.Python');

Blockly.Python.fable_read_joint_sensor = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var id = block.getDynamicIDFieldString();
  var metric = block.getFieldValue('METRIC');
  var code = 'api.readJointSensor(' + metric + ', ' + id + ')';

  return [code, order];
};
