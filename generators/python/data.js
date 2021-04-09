/**
 * @fileoverview Generating Python for data blocks.
 * @author ivan@shaperobotics.com (Ivan Mladenov)
 */
'use strict';

goog.provide('Blockly.Python.data');

goog.require('Blockly.Python');

Blockly.Python.fable_save_as_csv = function (block) {
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || 'None';
  var fileName = Blockly.Python.valueToCode(block, 'FILENAME', Blockly.Python.ORDER_NONE) || 'MyFableCSV';
  // Generated: api.log([BLOCK], "FileName");
  var code = `api.log(${value}, ${fileName})\n`;

  return code;
};

Blockly.Python.fable_load_from_csv = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var fileName = Blockly.Python.valueToCode(block, 'FILENAME', Blockly.Python.ORDER_NONE) || 'MyFableCSV';
  // Generated: api.loadCSV("FileName", delimiter=';', skip_header=True);
  var code = `api.loadCSV(${fileName}, delimiter=';', skipheader=True)\n`;

  return [code, order];
};

Blockly.Python.fable_load_from_csv_advance = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var fileName = Blockly.Python.valueToCode(block, 'FILENAME', Blockly.Python.ORDER_NONE) || 'MyFableCSV';
  var delimiter = Blockly.Python.valueToCode(block, 'DELIMITER', Blockly.Python.ORDER_NONE) || ';';
  var skipHeader = Blockly.Python.valueToCode(block, 'SKIPHEADER', Blockly.Python.ORDER_NONE);
  // Generated: api.loadCSV("FileName", delimiter=';', skip_header=True);
  var code = `api.loadCSV(${fileName}, delimiter=${delimiter}, skipheader=${skipHeader})\n`;

  return [code, order];
};

Blockly.Python.fable_make_plot = function (block) {
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_NONE) || 'None';
  var sid = block.getFieldValue('SERIES_ID');
  var code = 'api.plot(' + value + ', "' + sid + '")\n';

  return code;
};

Blockly.Python.fable_make_plot_xy = function (block) {
  var valueX = Blockly.Python.valueToCode(block, 'VALUE_X', Blockly.Python.ORDER_NONE) || 'None';
  var valueY = Blockly.Python.valueToCode(block, 'VALUE_Y', Blockly.Python.ORDER_NONE) || 'None';
  var sid = block.getFieldValue('SERIES_ID');
  var code = 'api.plotXY(' + valueX + ', ' + valueY + ', "' + sid + '")\n';

  return code;
};

Blockly.Python.fable_make_scatter_plot = function (block) {
  var valueX = Blockly.Python.valueToCode(block, 'VALUE_X', Blockly.Python.ORDER_NONE) || 'None';
  var valueY = Blockly.Python.valueToCode(block, 'VALUE_Y', Blockly.Python.ORDER_NONE) || 'None';
  var sid = block.getFieldValue('SERIES_ID');
  var code = 'api.plotScatter(' + valueX + ', ' + valueY + ', "' + sid + '")\n';

  return code;
};

Blockly.Python.fable_cast_to_string = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || 'None';
  // Generated: str(value);
  var code = `str(${value})`;

  return [code, order];
};

Blockly.Python.fable_cast_to_int = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || 'None';
  // Generated: int(value);
  var code = `int(${value})`;

  return [code, order];
};

Blockly.Python.fable_cast_to_float = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || 'None';
  // Generated: float(value);
  var code = `float(${value})`;

  return [code, order];
};

Blockly.Python.fable_cast_to_list = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC) || 'None';
  // Generated: list(value);
  var code = `list(${value})`;

  return [code, order];
};

Blockly.Python.fable_cast_list_values_to_type = function (block) {
  const TYPES = {
    STR: 'str',
    INT: 'int',
    FLOAT: 'float'
  };
  var order = Blockly.Python.ORDER_ATOMIC;
  var list = Blockly.Python.valueToCode(block, 'LIST', Blockly.Python.ORDER_ATOMIC) || 'None';
  var targetType = TYPES[block.getFieldValue('TYPE')] || TYPES.STR;
  // Generated: catValuesTo(list, type);
  var code = `api.castValuesTo(${list}, ${targetType})`;

  return [code, order];
};
