/**
 * @fileoverview Generating JavaScript for senses/spin blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
 "use strict";

goog.provmoduleIDe("Blockly.JavaScript.sensesSpin");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["fable_spin_get_sensor"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const moduleID = block.getDynamicIDFieldString();
    const measure = block.getFieldValue("MEASURE");
    const sensorID = block.getFieldValue("SPIN_SENSOR");
    const code = `api.getSpinSensorReading("${measure}", ${sensorID}, ${moduleID})`;
    return [code, order];
}

Blockly.JavaScript["fable_spin_obstacle_detected"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const moduleID = block.getDynamicIDFieldString();
    const proximity = Blockly.JavaScript.valueToCode(block, "PROXIMITY_PERC", Blockly.JavaScript.ORDER_NONE) || "0";
    const code = `api.spinObstacleDetected(${proximity}, ${moduleID})`;
    return [code, order];
}

Blockly.JavaScript["fable_spin_color_found"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const moduleID = block.getDynamicIDFieldString();
    const targetColor = block.getFieldValue("COLOUR") || "[0, 0, 0]";
    const code = `api.getSpinIsColorFound(${targetColor}, ${moduleID})`;
    return [code, order];
}

Blockly.JavaScript["fable_spin_motor_moving"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const moduleID = block.getDynamicIDFieldString();
    const motorCombo = block.getFieldValue("MOTOR");
    const code = `api.areSpinMotorsMoving("${motorCombo}", ${moduleID})`;
    return [code, order];
}

Blockly.JavaScript["fable_spin_get_motor"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const moduleID = block.getDynamicIDFieldString();
    const metric = block.getFieldValue("MEASURE");
    const code = `api.getSpinMotorMetric("${metric}", ${moduleID})`;
    return [code, order];
}

Blockly.JavaScript["fable_spin_has_reached_target"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const moduleID = block.getDynamicIDFieldString();
    const targetMotor = block.getFieldValue("MOTOR");
    const code = `api.getSpinHasReachedTarget("${targetMotor}", ${moduleID})`;
    return [code, order];
}

Blockly.JavaScript["fable_spin_get_ir_message"] = function (block) {
    const order = Blockly.JavaScript.ORDER_ATOMIC;
    const message = block.getField("MESSAGE").convertKeyToCode();
    const moduleID = block.getDynamicIDFieldString();
    const code = `(api.getSpinIrMsg(${moduleID}) is ${message})`;
    return [code, order];
}