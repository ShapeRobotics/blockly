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
};

Blockly.JavaScript["fable_get_time"] = function (block) {
	const order = Blockly.JavaScript.ORDER_ATOMIC;
	const code = `api.getTime()`;
	return [code, order];
};

Blockly.JavaScript['fable_get_microphone'] = function (block) {
	const order = Blockly.JavaScript.ORDER_ATOMIC;
	const code = `api.getSoundLevel()`;
	return [code, order];
};
