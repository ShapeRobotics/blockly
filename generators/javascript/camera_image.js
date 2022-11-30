/**
 * @fileoverview Generating JavaScript for camera/cv blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
"use strict";

goog.provide("Blockly.JavaScript.cameraImage");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["fable_imshow"] = function (block) {
    const _default = `"None"`;
    const imageName = Blockly.JavaScript.valueToCode(block, "IMAGE", Blockly.JavaScript.ORDER_NONE) || _default;
    const code = `api.showImage(${imageName});\n`;
    return code;
}

Blockly.JavaScript["fable_imread"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const imageFile = block.getFieldValue("IMAGEFILE");
    const code = `api.readImage("${imageFile}")`;
    return [code, order];
}

Blockly.JavaScript["fable_imfilter"] = function (block) {
    const _default = `"None"`;
    const _filterOpts = ["canny", "gaussian", "thresholding"];
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const filter = block.getMutatedDropdownValue(_filterOpts, "SENSITIVITY");
    const filterType = filter[0];
    const sensitivity = filter[1];
    const imageName = Blockly.JavaScript.valueToCode(block, "IMAGE", Blockly.JavaScript.ORDER_NONE) || _default;
    
    var code;
    if (sensitivity != null) {
        code = `api.applyFilter("${filterType}", ${imageName}, ${sensitivity})`;
    } else {
        code = `api.applyFilter("${filterType}", ${imageName})`;
    }

    return [code, order];
}

Blockly.JavaScript["fable_imsave"] = function (block) {
    const _default = `"None"`;
    const imageName = Blockly.JavaScript.valueToCode(block, "IMAGE", Blockly.JavaScript.ORDER_NONE) || _default;
    const givenName = block.getFieldValue("FILENAME");
    const code = `api.saveImage(${imageName}, "${givenName}");\n`;
    return code;
}