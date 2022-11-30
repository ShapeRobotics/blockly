/**
 * @fileoverview Generating JavaScript for camera/cv blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
"use strict";

goog.provide("Blockly.JavaScript.cameraVideo");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["fable_video_filter"] = function (block) {
    const _filterOpts = ["canny", "gaussian", "thresholding", "smear"];
    const filter = block.getMutatedDropdownValue(_filterOpts, "SENSITIVITY");
    const filterType = filter[0];
    const sensitivity = filter[1];
    var code;
    if (sensitivity != null) {
        code = `api.feedFilter("${filterType}", ${sensitivity});\n`;
    } else {
        code = `api.feedFilter("${filterType}");\n`;
    }

    return code;
}

Blockly.JavaScript["fable_clear_video_filters"] = function (block) {
    var code = `api.resetVideoFilters();\n`;
    return code;
}

Blockly.JavaScript["fable_draw_circle"] = function (block) {
    const _defaultCoordinate = "0";
    const _defaultColor = "[0, 0, 0]";
    const centerX = Blockly.JavaScript.valueToCode(block, "CENTROID_X", Blockly.JavaScript.ORDER_NONE) || _defaultCoordinate;
    const centerY = Blockly.JavaScript.valueToCode(block, "CENTROID_Y", Blockly.JavaScript.ORDER_NONE) || _defaultCoordinate;
    const radius = Blockly.JavaScript.valueToCode(block, "RADIUS", Blockly.JavaScript.ORDER_NONE) || _defaultCoordinate;
    const color = Blockly.JavaScript.valueToCode(block, "COLOUR", Blockly.JavaScript.ORDER_NONE) || _defaultColor;
    const code = `api.drawCircle((${centerX}, ${centerY}), ${radius}, ${color});\n`;
    return code;
}

Blockly.JavaScript["fable_draw_rect"] = function (block) {
    const _defaultCoordinate = "0";
    const _defaultColor = "[0, 0, 0]";
    const originX = Blockly.JavaScript.valueToCode(block, "ORIGIN_X", Blockly.JavaScript.ORDER_NONE) || _defaultCoordinate;
    const originY = Blockly.JavaScript.valueToCode(block, "ORIGIN_Y", Blockly.JavaScript.ORDER_NONE) || _defaultCoordinate;
    const width = Blockly.JavaScript.valueToCode(block, "WIDTH", Blockly.JavaScript.ORDER_NONE) || _defaultCoordinate;
    const height = Blockly.JavaScript.valueToCode(block, "HEIGHT", Blockly.JavaScript.ORDER_NONE) || _defaultCoordinate;
    const color = Blockly.JavaScript.valueToCode(block, "COLOUR", Blockly.JavaScript.ORDER_NONE) || _defaultColor;
    const code = `api.drawRect((${originX}, ${originY}), ${width}, ${height}, ${color});\n`;
    return code;
}

Blockly.JavaScript["fable_draw_text"] = function (block) {
    const _defaultCoordinate = "0";
    const _defaultText = "Fable Blockly";
    const _defaultColor = "[0, 0, 0]";
    const userText = Blockly.JavaScript.valueToCode(block, 'INPUT_TEXT', Blockly.JavaScript.ORDER_NONE) || _defaultText;
    const centerX = Blockly.JavaScript.valueToCode(block, 'CENTROID_X', Blockly.JavaScript.ORDER_NONE) || _defaultCoordinate;
    const centerY = Blockly.JavaScript.valueToCode(block, 'CENTROID_Y', Blockly.JavaScript.ORDER_NONE) || _defaultCoordinate;
    const color = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_NONE) || _defaultColor;
    const code = `api.drawText(${userText}, (${centerX}, ${centerY}), ${color});\n`;
    return code;
}