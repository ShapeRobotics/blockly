/**
 * @fileoverview Generating JavaScript for camera/cv blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
"use strict";

goog.provide("Blockly.JavaScript.cameraCompVision");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["camera_take_picture"] = function (block) {
    const code = `api.takePicture();\n`;
    return code;
}

Blockly.JavaScript["camera_check_for_simple_color"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const color = Blockly.JavaScript.valueToCode(block, "COLOUR", Blockly.JavaScript.ORDER_NONE);
    const code = `api.foundSimpleColor(${color})`;
    return [code, order];
}

Blockly.JavaScript["camera_check_for_advanced_color"] = function (block) {
    const _colorDefault = "[0, 0, 0]";
    const _noneDefault = "None";
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const color = Blockly.JavaScript.valueToCode(block, "COLOUR", Blockly.JavaScript.ORDER_NONE) || _colorDefault;
    const nuances = Blockly.JavaScript.valueToCode(block, "NUANCES", Blockly.JavaScript.ORDER_NONE) || _noneDefault;
    const size = Blockly.JavaScript.valueToCode(block, "SIZE", Blockly.JavaScript.ORDER_NONE) || _noneDefault;
    const code = `api.foundAdvanceColor(${color}, ${nuances}, ${size})`;
    return [code, order];
}

Blockly.JavaScript["camera_get_center_from_simple_color"] = function (block) {
    const _colorDefault = "[0, 0, 0]";
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const coordinate = block.getFieldValue("COLOR_CENTER");
    const color = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_NONE) || _colorDefault;
    const index = (coordinate[1] === "x") ? 0 : 1;
    const code = `api.getSimpleColorCenter(${color})[${index}]`;
    return [code, order];
}

Blockly.JavaScript["camera_get_center_from_advanced_color"] = function (block) {
    const _colorDefault = "[0, 0, 0]";
    const _noneDefault = "None";
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const coordinate = block.getFieldValue("COLOR_CENTER");
    const nuances = Blockly.JavaScript.valueToCode(block, "NUANCES", Blockly.JavaScript.ORDER_NONE) || _noneDefault;
    const color = Blockly.JavaScript.valueToCode(block, "COLOUR", Blockly.JavaScript.ORDER_NONE) || _colorDefault;
    const size = Blockly.JavaScript.valueToCode(block, "SIZE", Blockly.JavaScript.ORDER_NONE) || _noneDefault;
    const index = (coordinate[1] === "x") ? 0 : 1;
    const code = `api.getAdvancedColorCenter(${color}, ${nuances}, ${size})[${index}]`;
    return [code, order];
}

Blockly.JavaScript["camera_check_for_motion"] = function (block) {
    const _noneDefault = "None";
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const amount = Blockly.JavaScript.valueToCode(block, "AMOUNT", Blockly.JavaScript.ORDER_NONE) || _noneDefault;
    const code = `api.detectedMotion(${amount})`;
    return [code, order];
}

Blockly.JavaScript["camera_get_center_of_motion"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const coordinate = block.getFieldValue("MOTION_CENTER");
    const amount = Blockly.JavaScript.valueToCode(block, "AMOUNT", Blockly.JavaScript.ORDER_NONE) || 'None';
    const index = (coordinate[1] === "x") ? 0 : 1;
    const code = `api.getMotionCenter(${amount})[${index}]`;
    return [code, order];
}

Blockly.JavaScript["camera_check_for_face"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const code = `api.detectedFace()`;
    return [code, order];
}

Blockly.JavaScript["camera_get_center_of_face"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const axis = block.getFieldValue("FACE_CENTER");
    const index = (axis === "X_COORD") ? 0 : 1;
    const code = `api.getFaceCenter()[${index}]`;
    return [code, order];
}