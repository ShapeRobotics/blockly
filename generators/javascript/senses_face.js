/**
 * @fileoverview Generating JavaScript for senses/face blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
 "use strict";

 goog.provide("Blockly.JavaScript.sensesFace");
 goog.require("Blockly.JavaScript");

 Blockly.JavaScript["fable_read_face_sensor"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const metric = block.getFieldValue("METRIC");
    const code = `api.readFaceSensor(${metric})`;
    return [code, order];
}