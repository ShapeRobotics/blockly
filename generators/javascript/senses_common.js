/**
 * @fileoverview Generating JavaScript for senses/common blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
"use strict";

goog.provide("Blockly.JavaScript.sensesCommon");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["fable_get_module_id"] = function (block) {
	const order = Blockly.JavaScript.ORDER_ATOMIC;
	const moduleID = block.getDynamicIDFieldString();
	const code = moduleID;
	return [code, order];
}

Blockly.JavaScript["fable_get_time"] = function (block) {
	const order = Blockly.JavaScript.ORDER_ATOMIC;
	const code = `api.getTime()`;
	return [code, order];
}

Blockly.JavaScript['fable_get_microphone'] = function (block) {
	const order = Blockly.JavaScript.ORDER_ATOMIC;
	const code = `api.getSoundLevel()`;
	return [code, order];
}

Blockly.JavaScript["fable_get_module_battery"] = function (block) {
	const order = Blockly.JavaScript.ORDER_ATOMIC;
	const moduleID = block.getDynamicIDFieldString();
	const code = `api.getBattery(${moduleID})`;
	return [code, order];
}

Blockly.JavaScript["fable_check_key"] = function (block) {
	const order = Blockly.JavaScript.ORDER_ATOMIC;
	const targetKey = block.getFieldValue("CHECK_KEY");
	const code = `api.isPressed("${targetKey}")`;
	return [code, order];
}

Blockly.JavaScript["fable_check_custom_key"] = function (block) {
	const order = Blockly.JavaScript.ORDER_ATOMIC;
	// ! It works because KEYBUTTON field is of type ButtonInput.
	const keyString = block.getField("KEYBUTTON").convertKeyToCode();
	const code = `api.isPressed("${keyString}")`;
	return [code, order];
}

Blockly.JavaScript["fable_get_chromebook_sensor"] = function (block) {
	return "";
}

Blockly.JavaScript["fable_get_chromebook_gesture"] = function (block) {
	return "";
}
