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
    const code = `api.SetColor(${colorRGB}, ${moduleID});\n`;
	return code;
}