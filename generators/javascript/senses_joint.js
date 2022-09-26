/**
 * @fileoverview Generating JavaScript for actions/common blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
 "use strict";

goog.provide("Blockly.JavaScript.sensesJoint");
goog.require("Blockly.JavaScript");

Blockly.JavaScript.fable_read_joint_sensor = function (block) {
  const order = Blockly.JavaScript.ORDER_ATOMIC;
  const moduleID = block.getDynamicIDFieldString();
  const metric = block.getFieldValue("METRIC");
  const code = `api.readJointSensor(${metric}, ${moduleID})`;

  return [code, order];
};
