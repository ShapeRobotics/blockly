/**
 * @fileoverview Generating JavaScript for actions/common blocks.
 * @author nicolas@shaperobotics.com (Nicolas Laverde)
 */
"use strict";

goog.provide("Blockly.JavaScript.data");
goog.require("Blockly.JavaScript");

Blockly.JavaScript["fable_save_as_csv"] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_ATOMIC) || "None";
  const fileName = Blockly.JavaScript.valueToCode(block, "FILENAME", Blockly.JavaScript.ORDER_NONE) || "MyFableCSV";
  const code = `api.log(${value}, ${fileName});\n`;
  return code;
}

Blockly.JavaScript["fable_load_from_csv"] = function (block) {
  const order = Blockly.JavaScript.ORDER_ATOMIC;
  const fileName = Blockly.JavaScript.valueToCode(block, "FILENAME", Blockly.JavaScript.ORDER_NONE) || "MyFableCSV";
  const code = `api.loadCSV(${fileName}, delimiter=";", skipheader=True)`;
  return [code, order];
}

Blockly.JavaScript["fable_load_from_csv_advance"] = function (block) {
  const order = Blockly.JavaScript.ORDER_ATOMIC;
  const fileName = Blockly.JavaScript.valueToCode(block, "FILENAME", Blockly.JavaScript.ORDER_NONE) || "MyFableCSV";
  const delimiter = Blockly.JavaScript.valueToCode(block, "DELIMITER", Blockly.JavaScript.ORDER_NONE) || ";";
  const skipHeader = Blockly.JavaScript.valueToCode(block, "SKIPHEADER", Blockly.JavaScript.ORDER_NONE);
  const code = `api.loadCSV(${fileName}, delimiter=${delimiter}, skipheader=${skipHeader})`;
  return [code, order];
}

Blockly.JavaScript["fable_make_plot"] = function (block) {
  const value = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_NONE) || "None";
  const sid = block.getFieldValue("SERIES_ID");
  const code = `api.plot(${value}, "${sid}");\n`;
  return code;
}

Blockly.JavaScript["fable_make_plot_xy"] = function (block) {
  const valueX = Blockly.JavaScript.valueToCode(block, "VALUE_X", Blockly.JavaScript.ORDER_NONE) || "None";
  const valueY = Blockly.JavaScript.valueToCode(block, "VALUE_Y", Blockly.JavaScript.ORDER_NONE) || "None";
  const sid = block.getFieldValue("SERIES_ID");
  const code = `api.plotXY(${valueX}, ${valueY}, "${sid}");\n`;
  return code;
}

Blockly.JavaScript["fable_make_scatter_plot"] = function (block) {
  const valueX = Blockly.JavaScript.valueToCode(block, "VALUE_X", Blockly.JavaScript.ORDER_NONE) || "None";
  const valueY = Blockly.JavaScript.valueToCode(block, "VALUE_Y", Blockly.JavaScript.ORDER_NONE) || "None";
  const sid = block.getFieldValue("SERIES_ID");
  const code = `api.plotScatter(${valueX}, ${valueY}, "${sid}");\n`;
  return code;
}

Blockly.JavaScript["fable_cast_to_type"] = function (block) {
  const order = Blockly.JavaScript.ORDER_ATOMIC;
	const value = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_ATOMIC) || "";
	const targetType = block.getFieldValue("TYPE");

	var methodSignature;

	if (targetType == "STRING") {
		methodSignature = `(${value}).toString()`;
	}
	else if (targetType == "INT") {
		methodSignature = `parseInt(${value})`;
	}
	else if (targetType == "FLOAT") {
		methodSignature = `parseFloat(${value})`;
	}
	else {
		methodSignature = `${value}`;
	}

	return [methodSignature, order];
}

Blockly.JavaScript["fable_cast_list_values_to_type"] = function (block) {
  const order = Blockly.JavaScript.ORDER_FUNCTION_CALL;
	const list = Blockly.JavaScript.valueToCode(block, "LIST", Blockly.JavaScript.ORDER_ATOMIC) || "";
	const targetType = block.getFieldValue("TYPE");
	const strToken = "CAST_OP";
	
  var methodSignature = `${list}.map(n => ${strToken})`;
	if (targetType == "STRING") {
		methodSignature = methodSignature.replace(strToken, "n.toString()");
	} else if (targetType == "INT") {
		methodSignature = methodSignature.replace(strToken, "parseInt(n)");
	} else if (targetType == "FLOAT") {
		methodSignature = methodSignature.replace(strToken, "parseFloat(n)");
	} else {
		methodSignature = methodSignature.replace(strToken, "n");
	}

	return [methodSignature, order];
}

Blockly.JavaScript["fable_print"] = function (block) {
  const data = Blockly.JavaScript.valueToCode(block, "DATA", Blockly.JavaScript.ORDER_ATOMIC);
  const code = `console.log(${data});\n`;
  return code;
}
