/**
 * @fileoverview Generating JavaScript for actions/joint blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
"use strict";

goog.provide("Blockly.JavaScript.actionsJoint");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["fable_set_module_motor_positions"] = function (block) {
	const moduleID = block.getDynamicIDFieldString();
	const targetX = Blockly.JavaScript.valueToCode(block, "MOTOR_POSITION_X", Blockly.JavaScript.ORDER_NONE) || "None";
	const targetY = Blockly.JavaScript.valueToCode(block, "MOTOR_POSITION_Y", Blockly.JavaScript.ORDER_NONE) || "None";
	const code = `api.setPos(${targetX}, ${targetY}, ${moduleID});\n`;
	const _codeAppendage = `api.setSpeed(50, 50, ${moduleID});\n`;
	return "".concat(_codeAppendage, code);
}

Blockly.JavaScript["fable_set_module_motor_pos_speed"] = function (block) {
	const moduleID = block.getDynamicIDFieldString();
	const targetX = Blockly.JavaScript.valueToCode(block, "MOTOR_POSITION_X", Blockly.JavaScript.ORDER_NONE) || "None";
	const targetY = Blockly.JavaScript.valueToCode(block, "MOTOR_POSITION_Y", Blockly.JavaScript.ORDER_NONE) || "None";
	const targetSpeed = Blockly.JavaScript.valueToCode(block, "MOTORS_SPEEDS", Blockly.JavaScript.ORDER_NONE) || "None";
	const code = `api.setPos(${targetX}, ${targetY}, ${moduleID});\n`;
	const _codeAppendage = `api.setSpeed(${targetSpeed}, ${targetSpeed}, ${moduleID});\n`;
	return "".concat(_codeAppendage, code);
}

Blockly.JavaScript["fable_set_module_accuracy"] = function (block) {
	const moduleID = block.getDynamicIDFieldString();
	const accuracy = block.getFieldValue("MOTOR_ACCURACY_VALUE");
	const code = `api.setAccurate("${accuracy}", "${accuracy}", ${moduleID});\n`;
	return code;
}