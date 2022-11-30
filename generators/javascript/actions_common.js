/**
 * @fileoverview Generating JavaScript for actions/common blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
"use strict";

goog.provide("Blockly.JavaScript.actionsCommon");
goog.require("Blockly.JavaScript");
 
Blockly.JavaScript["fable_set_module_rgb"] = function (block) {
    const _colorRGBDefault = "[0, 0, 0]";
	const moduleID = block.getDynamicIDFieldString();
	const colorRGB = Blockly.JavaScript.valueToCode(block, "COLOUR", Blockly.JavaScript.ORDER_NONE) || _colorRGBDefault;
    const code = `api.setColor(${colorRGB}, ${moduleID});\n`;
	return code;
}

Blockly.JavaScript["fable_set_channel_color"] = function (block) {
	const moduleID = block.getFieldValue("MODULE");
	const code = `api.recoverChannelColor("${moduleID}");\n`;
	return code;
}
  
Blockly.JavaScript["fable_speak"] = function (block) {
	const _lenghtTreshold = 200;
	const _warningID = 666;
	const lang = block.getLanguage() || "en";
	const userText = Blockly.JavaScript.valueToCode(block, "INPUT_TEXT", Blockly.JavaScript.ORDER_NONE) || "";
	
	const matchGroups = /(str\()(.*)(\)\s\+\s'\s'\s\+\sstr\()(.*)(\))/gm.exec(userText);
	var croppedText = userText;
	if (matchGroups && matchGroups.length >= 5) {
		croppedText = matchGroups[2] + matchGroups[4];
	}
	// ID 666 allows for easily removing the warning later
	// without clearing OTHER warnings on the block.
	if (croppedText.length && croppedText.length > _lenghtTreshold) {
		block.setWarningText(Blockly.Msg.FABLE_FIELD_WRN_TEXT_TOO_LONG, _warningID);
	} else {
		block.setWarningText(null, _warningID);
	}

	const code = `api.fableSpeak(str(${userText}), "${lang}");\n`;
	return code;
}

Blockly.JavaScript["fable_speak_lang"] = function (block) {
	return "#fableSpeak()";
}

Blockly.JavaScript["fable_play_sound"] = function (block) {
	const soundFile = block.getFieldValue("SOUNDFILE");
	const device = block.getFieldValue("MODULE");
	const code = `api.playSound("${soundFile}", "${device}");\n`;
	return code;
}

Blockly.JavaScript["fable_play_custom_sound"] = function (block) {
	var soundFile = block.getFieldValue("SOUNDFILE");
	if (soundFile === "NOFILE") { soundFile = ""; }
	const code = `api.playSoundFile("${soundFile}", "custom");\n`;
	return code;
}

Blockly.JavaScript["fable_play_note"] = function (block) {
	const soundFile = block.getFieldValue("SOUNDFILE");
	const code = `api.playNote("${soundFile}");\n`;
	return code;
}