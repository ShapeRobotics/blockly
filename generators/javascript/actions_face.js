/**
 * @fileoverview Generating JavaScript for actions/face blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
"use strict";

goog.provide("Blockly.JavaScript.actionsFace");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["fable_set_face_focus"] = function (block) {
    const x = Blockly.JavaScript.valueToCode(block, "POS_X", Blockly.JavaScript.ORDER_NONE) || "0";
    const y = Blockly.JavaScript.valueToCode(block, "POS_Y", Blockly.JavaScript.ORDER_NONE) || "0";
    const z = Blockly.JavaScript.valueToCode(block, "POS_Z", Blockly.JavaScript.ORDER_NONE) || "0";
    const code = `api.setFaceFocus(${x}, ${y}, ${z});\n`;
    return code;
}

Blockly.JavaScript["fable_set_face_emotion"] = function (block) {
    const emotionID = block.getFieldValue("EMOTION_ID");
    const code = `api.setFaceEmotion(${emotionID});\n`;
    return code;
}

Blockly.JavaScript["fable_set_face_animation"] = function (block) {
    const animationID = block.getFieldValue("EMOTION_ID");
    const code = `api.setFaceAnimation(${animationID});\n`;
    return code;
}

Blockly.JavaScript["fable_blend_face_emotion"] = function (block) {
    const emotionAID = block.getFieldValue("FIRST_ID");
    const emotionBID = block.getFieldValue("SECOND_ID");
    const blendRatio = Blockly.JavaScript.valueToCode(block, "RATIO", Blockly.JavaScript.ORDER_NONE) || 0;
    const code = `api.blendFaceEmotions(${emotionAID}, ${emotionBID}, ${blendRatio});\n`;
    return code;
}

Blockly.JavaScript["fable_set_eyes_color"] = function (block) {
    const _defaultColor = [247, 148, 27]
    const target = block.getFieldValue("TARGET");
    const color = Blockly.JavaScript.valueToCode(block, "COLOUR", Blockly.JavaScript.ORDER_NONE) || _defaultColor;
    const code = `api.setEyeColor(${target}, ${color});\n`;
    return code;
}

Blockly.JavaScript["fable_face_vibrate"] = function (block) {
    const code = `api.setFaceVibrate();\n`;
    return code;
}