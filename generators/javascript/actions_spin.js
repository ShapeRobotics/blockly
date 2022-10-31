/**
 * @fileoverview Generating JavaScript for actions/spin blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
 "use strict";

goog.provide("Blockly.JavaScript.actionsSpin");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["fable_set_speed_simple"] = function (block) {
    const commandMap = {
        BACKWARD: "backward",
        FORWARD: "forward",
        STOP: "stop",
        LEFT: "left",
        RIGHT: "right"
    }
    const moduleID = block.getDynamicIDFieldString();
    const command = block.getFieldValue("MOVEMENT");

    let speedA = "50";
    let speedB = "50";

    switch(command) {
        case commandMap.FORWARD: {
            speedA = "-50";
            speedB = "50";
            break;
        }
        case commandMap.BACKWARD: {
            speedA = "50";
            speedB = "-50";
            break;
        }
        case commandMap.STOP: {
            speedA = speedB = "0";
            break;
        }
        case commandMap.LEFT: {
            speedA = speedB = "-50";
            break;
        }
        case commandMap.RIGHT: {
            speedA = speedB = "50";
        }
    }

    const code = `api.setSpinSpeed(${speedA}, ${speedB}, ${moduleID});\n`;
    return code;
}

Blockly.JavaScript["fable_spin_set_speed"] = function (block) {
    const moduleID = block.getDynamicIDFieldString();
    const speedA = Blockly.JavaScript.valueToCode(block, "MOTOR_A_SPEED", Blockly.JavaScript.ORDER_NONE) || "None";
    const speedB = Blockly.JavaScript.valueToCode(block, "MOTOR_B_SPEED", Blockly.JavaScript.ORDER_NONE) || "None";
    const code = `api.setSpinSpeed(${speedA}, ${speedB}, ${moduleID});\n`;
    return code;
}

Blockly.JavaScript["fable_spin_drive"] = function (block) {
    const moduleID = block.getDynamicIDFieldString();
    const distance = Blockly.JavaScript.valueToCode(block, "DISTANCE", Blockly.JavaScript.ORDER_NONE) || "None";
    const metric = block.getFieldValue("METRIC");
    const code = `api.driveByMetric(${distance}, ${metric}, ${moduleID});\n`;
    return code;
}

Blockly.JavaScript["fable_spin_drive_with_speed"] = function (block) {
    const moduleID = block.getDynamicIDFieldString();
    const distance = Blockly.JavaScript.valueToCode(block, "DISTANCE", Blockly.JavaScript.ORDER_NONE) || "None";
    const metric = block.getFieldValue("METRIC");
    const speed = Blockly.JavaScript.valueToCode(block, "SPEED", Blockly.JavaScript.ORDER_NONE) || "None";
    const code = `api.driveByMetric(${distance}, ${metric}, ${moduleID}, ${speed});\n`;
    return code;
}

Blockly.JavaScript["fable_spin_spin"] = function (block) {
    const moduleID = block.getDynamicIDFieldString();
    const turns = Blockly.JavaScript.valueToCode(block, "TURNS", Blockly.JavaScript.ORDER_NONE) || "None";
    const metric = block.getFieldValue("METRIC");
    const code = `api.spinByMetric(${turns}, ${metric}, ${moduleID});\n`;
    return code;
}

Blockly.JavaScript["fable_spin_spin_with_speed"] = function (block) {
    const moduleID = block.getDynamicIDFieldString();
    const turns = Blockly.JavaScript.valueToCode(block, "TURNS", Blockly.JavaScript.ORDER_NONE) || "None";
    const metric = block.getFieldValue("METRIC");
    const speed = Blockly.JavaScript.valueToCode(block, "SPEED", Blockly.JavaScript.ORDER_NONE) || "None";
    const code = `api.spinByMetric(${turns}, ${metric}, ${moduleID}, ${speed});\n`;
    return code;
}

Blockly.JavaScript["fable_spin_headlights"] = function (block) {
    const moduleID = block.getDynamicIDFieldString();
    const selection = block.getFieldValue("HEADLIGHTS_ACTION");
    const code = `api.setSpinHeadlight("${selection}", ${moduleID});\n`;
    return code;
}

Blockly.JavaScript["fable_spin_set_ir_message"] = function (block) {
    const moduleID = block.getDynamicIDFieldString();
    const message = block.getField("MESSAGE").convertKeyToCode();
    const code = `api.setSpinIrMsg(${message}, ${moduleID});\n`;
    return code;
}

Blockly.JavaScript["fable_spin_reset_encoder"] = function (block) {
    const moduleID = block.getDynamicIDFieldString();
    const motorID = block.getFieldValue("MOTOR_ID");
    const code = `api.spinResetEncoder("${motorID}", ${moduleID});\n`;
    return code;
}

Blockly.JavaScript["fable_spin_set_constant"] = function (block) {
    const moduleID = block.getDynamicIDFieldString();
    const metric = block.getFieldValue("METRIC");
    const _token = "methodName"
    
    var value = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_NONE);
    var code = `api.${_token}(${value}, ${moduleID});\n`;

    if (metric === "AXLE") {
        value = value || 121.38;
        code = code.replace(_token, "setSpinAxle");
    } else if (metric === "WHEEL_DIAMETER") {
        value = value || 107.4;
        code = code.replace(_token, "setSpinWheelDiameter");
    } else {
        value = value || 0;
        code = "";
    }

    return code;
}

Blockly.JavaScript["fable_spin_spin_wheel_by_metric"] = function (block) {
  const moduleID = block.getDynamicIDFieldString();
  const motor = block.getFieldValue("MOTOR");
  const reference = block.getFieldValue("REFERENCE");
  const turns = Blockly.JavaScript.valueToCode(block, "TURNS", Blockly.JavaScript.ORDER_NONE) || "None";
  const metric = block.getFieldValue("METRIC");
  const speed = Blockly.JavaScript.valueToCode(block, "SPEED", Blockly.JavaScript.ORDER_NONE) || "None";
  const isAbsoluteReference = (reference === "absolute") ? "True" : "False";
  const code = `api.spinWheelByMetric("${motor}", ${turns}, ${metric}, ${moduleID}, ${speed}, abs=${isAbsoluteReference});\n`;
  return code;
}
