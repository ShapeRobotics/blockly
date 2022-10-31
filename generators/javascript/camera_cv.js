/**
 * @fileoverview Generating JavaScript for actions/common blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
 "use strict";

goog.provide("Blockly.JavaScript.cameraCompVision");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["camera_take_picture"] = function (block) {
    const code = "api.takePicture();\n";
    return code;
};