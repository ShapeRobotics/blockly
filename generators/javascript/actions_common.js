/**
 * @fileoverview Generating JavaScript for actions/common blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
 "use strict";

 goog.provide("Blockly.JavaScript.actionsCommon");
 goog.require("Blockly.JavaScript");
 
 Blockly.JavaScript["fable_set_module_rgb"] = function (block) {
    const _colorRGBDefault = "[None, None, None]";
	const moduleID = block.getDynamicIDFieldString();
	const colorRGB = Blockly.JavaScript.valueToCode(block, "COLOUR", Blockly.JavaScript.ORDER_NONE) || _colorRGBDefault;
    const code = `api.setColor(${colorRGB}, ${moduleID});\n`;
	return code;
}

Blockly.JavaScript["fable_set_channel_color"] = function (block) {
	return "#recoverChannelColor()";
};
  
Blockly.JavaScript["fable_speak"] = function (block) {
	return "#fableSpeak()";
};

Blockly.JavaScript["fable_speak_lang"] = function (block) {
	return "#fableSpeak()";
};

Blockly.JavaScript["fable_play_sound"] = function (block) {
	return "#playSound()";
};


Blockly.JavaScript["fable_play_custom_sound"] = function (block) {
	return "#playPCSound()";
};

Blockly.JavaScript["fable_play_note"] = function (block) {
	return "#playNote()";
};