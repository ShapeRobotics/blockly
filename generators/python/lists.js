/**
 * @license
 * Copyright 2012 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Python for list blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Python.lists');

goog.require('Blockly.Python');


Blockly.Python['lists_create_empty'] = function(block) {
  // Create an empty list.
  return ['[]', Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['lists_create_with'] = function(block) {
  // Create a list with any number of elements of any type.
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Python.valueToCode(block, 'ADD' + i,
        Blockly.Python.ORDER_NONE) || 'None';
  }
  var code = '[' + elements.join(', ') + ']';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['lists_repeat'] = function(block) {
  // Create a list with one element repeated.
  var item = Blockly.Python.valueToCode(block, 'ITEM',
      Blockly.Python.ORDER_NONE) || 'None';
  var times = Blockly.Python.valueToCode(block, 'NUM',
      Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
  var code = '[' + item + '] * ' + times;
  return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
};

Blockly.Python['lists_length'] = function(block) {
  // String or array length.
  var list = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '[]';
  return ['len(' + list + ')', Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['lists_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var list = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '[]';
  var code = 'not len(' + list + ')';
  return [code, Blockly.Python.ORDER_LOGICAL_NOT];
};

Blockly.Python['lists_indexOf'] = function(block) {
  // Find an item in the list.
  var item = Blockly.Python.valueToCode(block, 'FIND',
      Blockly.Python.ORDER_NONE) || '[]';
  var list = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '\'\'';
  if (block.workspace.options.oneBasedIndex) {
    var errorIndex = ' 0';
    var firstIndexAdjustment = ' + 1';
    var lastIndexAdjustment = '';
  } else {
    var errorIndex = ' -1';
    var firstIndexAdjustment = '';
    var lastIndexAdjustment = ' - 1';
  }
  if (block.getFieldValue('END') == 'FIRST') {
    var functionName = Blockly.Python.provideFunction_(
        'first_index',
        ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
            '(my_list, elem):',
         '  try: index = my_list.index(elem)' + firstIndexAdjustment,
         '  except: index =' + errorIndex,
         '  return index']);
    var code = functionName + '(' + list + ', ' + item + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
  }
  var functionName = Blockly.Python.provideFunction_(
      'last_index',
      ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(my_list, elem):',
       '  try: index = len(my_list) - my_list[::-1].index(elem)' +
         lastIndexAdjustment,
       '  except: index =' + errorIndex,
       '  return index']);
  var code = functionName + '(' + list + ', ' + item + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['lists_getIndex'] = function(block) {
  // Get element at index.
  // Note: Until January 2013 this block did not have MODE or WHERE inputs.
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var listOrder = (where == 'RANDOM') ? Blockly.Python.ORDER_NONE :
      Blockly.Python.ORDER_MEMBER;
  var list = Blockly.Python.valueToCode(block, 'VALUE', listOrder) || '[]';

  switch (where) {
    case 'FIRST':
      if (mode == 'GET') {
        var code = list + '[0]';
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop(0)';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.pop(0)\n';
      }
      break;
    case 'LAST':
      if (mode == 'GET') {
        var code = list + '[-1]';
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop()';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.pop()\n';
      }
      break;
    case 'FROM_START':
      var at = Blockly.Python.getAdjustedInt(block, 'AT');
      if (mode == 'GET') {
        var code = list + '[' + at + ']';
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop(' + at + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.pop(' + at + ')\n';
      }
      break;
    case'FROM_END':
      var at = Blockly.Python.getAdjustedInt(block, 'AT', 1, true);
      if (mode == 'GET') {
        var code = list + '[' + at + ']';
        return [code, Blockly.Python.ORDER_MEMBER];
      } else if (mode == 'GET_REMOVE') {
        var code = list + '.pop(' + at + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else if (mode == 'REMOVE') {
        return list + '.pop(' + at + ')\n';
      }
      break;
    case 'RANDOM':
      Blockly.Python.definitions_['import_random'] = 'import random';
      if (mode == 'GET') {
        code = 'random.choice(' + list + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
      } else {
        var functionName = Blockly.Python.provideFunction_(
            'lists_remove_random_item',
            ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
              '  x = int(random.random() * len(myList))',
              '  return myList.pop(x)']);
        code = functionName + '(' + list + ')';
        if (mode == 'GET_REMOVE') {
          return [code, Blockly.Python.ORDER_FUNCTION_CALL];
        } else if (mode == 'REMOVE') {
          return code + '\n';
        }
      }
      break;
  }
  throw Error('Unhandled combination (lists_getIndex).');
};

Blockly.Python['lists_setIndex'] = function(block) {
  // Set element at index.
  // Note: Until February 2013 this block did not have MODE or WHERE inputs.
  var list = Blockly.Python.valueToCode(block, 'LIST',
      Blockly.Python.ORDER_MEMBER) || '[]';
  var mode = block.getFieldValue('MODE') || 'GET';
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var value = Blockly.Python.valueToCode(block, 'TO',
      Blockly.Python.ORDER_NONE) || 'None';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  // Closure, which accesses and modifies 'list'.
  function cacheList() {
    if (list.match(/^\w+$/)) {
      return '';
    }
    var listVar = Blockly.Python.variableDB_.getDistinctName(
        'tmp_list', Blockly.Variables.NAME_TYPE);
    var code = listVar + ' = ' + list + '\n';
    list = listVar;
    return code;
  }

  switch (where) {
    case 'FIRST':
      if (mode == 'SET') {
        return list + '[0] = ' + value + '\n';
      } else if (mode == 'INSERT') {
        return list + '.insert(0, ' + value + ')\n';
      }
      break;
    case 'LAST':
        if (mode == 'SET') {
          return list + '[-1] = ' + value + '\n';
        } else if (mode == 'INSERT') {
          return list + '.append(' + value + ')\n';
        }
      break;
    case 'FROM_START':
      var at = Blockly.Python.getAdjustedInt(block, 'AT');
        if (mode == 'SET') {
          return list + '[' + at + '] = ' + value + '\n';
        } else if (mode == 'INSERT') {
          return list + '.insert(' + at + ', ' + value + ')\n';
        }
      break;
    case 'FROM_END':
      var at = Blockly.Python.getAdjustedInt(block, 'AT', 1, true);
        if (mode == 'SET') {
          return list + '[' + at + '] = ' + value + '\n';
        } else if (mode == 'INSERT') {
          return list + '.insert(' + at + ', ' + value + ')\n';
        }
      break;
    case 'RANDOM':
        Blockly.Python.definitions_['import_random'] = 'import random';
        var code = cacheList();
        var xVar = Blockly.Python.variableDB_.getDistinctName(
            'tmp_x', Blockly.Variables.NAME_TYPE);
        code += xVar + ' = int(random.random() * len(' + list + '))\n';
        if (mode == 'SET') {
          code += list + '[' + xVar + '] = ' + value + '\n';
          return code;
        } else if (mode == 'INSERT') {
          code += list + '.insert(' + xVar + ', ' + value + ')\n';
          return code;
        }
      break;
  }
  throw Error('Unhandled combination (lists_setIndex).');
};

Blockly.Python['lists_getSublist'] = function(block) {
  // Get sublist.
  var list = Blockly.Python.valueToCode(block, 'LIST',
      Blockly.Python.ORDER_MEMBER) || '[]';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  switch (where1) {
    case 'FROM_START':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1');
      if (at1 == '0') {
        at1 = '';
      }
      break;
    case 'FROM_END':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1', 1, true);
      break;
    case 'FIRST':
      var at1 = '';
      break;
    default:
      throw Error('Unhandled option (lists_getSublist)');
  }
  switch (where2) {
    case 'FROM_START':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 1);
      break;
    case 'FROM_END':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 0, true);
      // Ensure that if the result calculated is 0 that sub-sequence will
      // include all elements as expected.
      if (!Blockly.isNumber(String(at2))) {
        Blockly.Python.definitions_['import_sys'] = 'import sys';
        at2 += ' or sys.maxsize';
      } else if (at2 == '0') {
        at2 = '';
      }
      break;
    case 'LAST':
      var at2 = '';
      break;
    default:
      throw Error('Unhandled option (lists_getSublist)');
  }
  var code = list + '[' + at1 + ' : ' + at2 + ']';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['lists_split'] = function(block) {
  // Block for splitting text into a list, or joining a list into text.
  var mode = block.getFieldValue('MODE');
  if (mode == 'SPLIT') {
    var value_input = Blockly.Python.valueToCode(block, 'INPUT',
        Blockly.Python.ORDER_MEMBER) || '\'\'';
    var value_delim = Blockly.Python.valueToCode(block, 'DELIM',
        Blockly.Python.ORDER_NONE);
    var code = value_input + '.split(' + value_delim + ')';
  } else if (mode == 'JOIN') {
    var value_input = Blockly.Python.valueToCode(block, 'INPUT',
        Blockly.Python.ORDER_NONE) || '[]';
    var value_delim = Blockly.Python.valueToCode(block, 'DELIM',
        Blockly.Python.ORDER_MEMBER) || '\'\'';
    var code = value_delim + '.join(' + value_input + ')';
  } else {
    throw Error('Unknown mode: ' + mode);
  }
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['lists_reverse'] = function(block) {
  // Block for reversing a list.
  var list = Blockly.Python.valueToCode(block, 'LIST',
      Blockly.Python.ORDER_NONE) || '[]';
  var code = 'list(reversed(' + list + '))';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python.fable_lists_copy = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var targetList = Blockly.Python.valueToCode(block, 'LIST', Blockly.Python.ORDER_NONE);
  // Generated: targetList.copy();
  var code = `${targetList}.copy()`;

  return [code, order];
};

Blockly.Python.fable_lists_sort = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var targetList = Blockly.Python.valueToCode(block, 'LIST', Blockly.Python.ORDER_NONE);
  var reversed = block.getFieldValue('ORDER') || 'False';
  // Generated: targetList.sort(reverse=);
  var code = `sorted(${targetList}, reverse=${reversed})`;

  return [code, order];
};

Blockly.Python.fable_lists_count = function (block) {
  var order = Blockly.Python.ORDER_FUNCTION_CALL;
  var targetList = Blockly.Python.valueToCode(block, 'LIST', Blockly.Python.ORDER_NONE);
  var action = block.getFieldValue('ACTION') || 'MOST_FREQUENT';

  var code;

  if (action === 'COUNT_ELEMENT') {
    var elementToCount = Blockly.Python.valueToCode(block, 'ELEMENT', Blockly.Python.ORDER_ATOMIC) || 0;
    order = Blockly.Python.ORDER_ATOMIC;
    code = `${targetList}.count(${elementToCount})`;

    return [code, order];
  }

  var getMostFrequentFunctionName = Blockly.Python.provideFunction_(
    'getMostFrequent', [
      `def ${Blockly.Python.FUNCTION_NAME_PLACEHOLDER_}(a_list):`,
      '  return max(set(a_list), key = a_list.count)'
    ]
  );

  code = `${getMostFrequentFunctionName}(${targetList})`;

  return [code, order];
};

Blockly.Python.fable_lists_concat = function (block) {
  var order = Blockly.Python.ORDER_ATOMIC;
  var listOne = Blockly.Python.valueToCode(block, 'LIST_1', Blockly.Python.ORDER_NONE);
  var listTwo = Blockly.Python.valueToCode(block, 'LIST_2', Blockly.Python.ORDER_NONE);
  var withDups = Blockly.Python.valueToCode(block, 'WITH_DUPS', Blockly.Python.ORDER_NONE) || 'False';

  var code;

  if (withDups === 'False') {
    code = `list(${listOne}).extend(x for x in ${listTwo} if x not in ${listOne})\n`;
  } else {
    code = `${listOne} + ${listTwo}\n`;
  }

  return [code, order];
};

Blockly.Python.fable_lists_sublist = function (block) {
  // Get sublist.
  var list = Blockly.Python.valueToCode(block, 'LIST', Blockly.Python.ORDER_MEMBER) || '[]';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  var action = block.getFieldValue('ACTION');

  switch (where1) {
    case 'FROM_START':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1');
      if (at1 == '0') {
        at1 = '';
      }
      break;
    case 'FROM_END':
      var at1 = Blockly.Python.getAdjustedInt(block, 'AT1', 1, true);
      break;
    case 'FIRST':
      var at1 = '';
      break;
    default:
      throw Error('Unhandled option (lists_getSublist)');
  }
  switch (where2) {
    case 'FROM_START':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 1);
      break;
    case 'FROM_END':
      var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 0, true);
      // Ensure that if the result calculated is 0 that sub-sequence will
      // include all elements as expected.
      if (!Blockly.isNumber(String(at2))) {
        Blockly.Python.definitions_['import_sys'] = 'import sys';
        at2 += ' or sys.maxsize';
      } else if (at2 == '0') {
        at2 = '';
      }
      break;
    case 'LAST':
      var at2 = '';
      break;
    default:
      throw Error('Unhandled option (lists_getSublist)');
  }

  var code;

  switch (action) {
    case 'GET':
      code = list + '[' + at1 + ' : ' + at2 + ']';
      break;
    case 'GET_REMOVE':
      var getAndRemoveFunctionName = Blockly.Python.provideFunction_(
        'getAndRemove', [
          `def ${Blockly.Python.FUNCTION_NAME_PLACEHOLDER_}(a_list, start, end):`,
          '  removed = a_list[start:end]',
          '  for x in removed:',
          '    a_list.remove(x)',
          '  return removed'
        ]
      );
      code = `${getAndRemoveFunctionName}(${list}, ${at1}, ${at2})`;
      break;
    case 'REMOVE':
      var removeFunctionName = Blockly.Python.provideFunction_(
        'remove', [
          `def ${Blockly.Python.FUNCTION_NAME_PLACEHOLDER_}(a_list, start, end):`,
          '  toRemove = a_list[start:end]',
          '  for x in toRemove:',
          '    a_list.remove(x)',
          '  return a_list'
        ]
      );
      code = `${removeFunctionName}(${list}, ${at1}, ${at2})`;
      break;
    default:
      throw Error('Not a valid action (list_getSublist)');
  }

  return [code, Blockly.Python.ORDER_MEMBER];
};
