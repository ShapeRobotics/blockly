/**
 * @fileoverview Data blocks for Fable Blockly.
 *
 * @author ivan@shaperobotics.com (Ivan Mladenov)
 */
'use strict';

goog.provide('Blockly.Blocks.data'); // Deprecated
goog.provide('Blockly.Constants.Data');

goog.require('Blockly');
goog.require('Blockly.Blocks');
goog.require('Blockly.Blocks.Definitions');
goog.require('Blockly.Mutator');
goog.require('Blockly.FieldDropdown');
goog.require('Blockly.FieldLabel');
goog.require('Blockly.FieldColour');
goog.require('Blockly.FieldLabel');

Blockly.Blocks.fable_make_plot = {
  /**
     * Block for realtime plot.
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.graphIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput().appendField(image);

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_TIME_SERIES);

    this.appendValueInput('VALUE').setCheck('Number');

    var labelColorOptions = new Blockly.FieldDropdown([
      [Blockly.Msg.RED, 'A'], [Blockly.Msg.GREEN, 'B'], [Blockly.Msg.BLUE, 'C'],
      [Blockly.Msg.YELLOW, 'D'], [Blockly.Msg.CYAN, 'E'], [Blockly.Msg.MAGENTA, 'F']
    ]);
    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_PLOT_LABEL)
      .appendField(labelColorOptions, 'SERIES_ID');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.dataStyle);
    this.setTooltip(Blockly.Msg.FABLE_TIME_SERIES_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_TIME_SERIES,
      Blockly.Msg.FABLE_PLOT_LABEL,
      '%{BKY_DATA}',
      '%{BKY_LABEL_TIME_SERIES}'
    ];

    var toolboxKeywords = [
      Blockly.Msg.RED, Blockly.Msg.GREEN, Blockly.Msg.BLUE,
      Blockly.Msg.YELLOW, Blockly.Msg.CYAN, Blockly.Msg.MAGENTA
    ];

    Blockly.Search.preprocessSearchKeywords('fable_make_plot', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.fable_make_plot_xy = {
  /**
     * Block for realtime plot.
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.graphIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_LINE_PLOT);

    this.appendValueInput('VALUE_X')
      .appendField('X: ')
      .setCheck('Number');

    this.appendValueInput('VALUE_Y')
      .appendField('Y: ')
      .setCheck('Number');

    var labelColorOptions = new Blockly.FieldDropdown([
      [Blockly.Msg.RED, 'A'], [Blockly.Msg.GREEN, 'B'], [Blockly.Msg.BLUE, 'C'],
      [Blockly.Msg.YELLOW, 'D'], [Blockly.Msg.CYAN, 'E'], [Blockly.Msg.MAGENTA, 'F']
    ]);
    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_PLOT_LABEL)
      .appendField(labelColorOptions, 'SERIES_ID');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.dataStyle);
    this.setTooltip(Blockly.Msg.FABLE_LINE_PLOT_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_LINE_PLOT,
      Blockly.Msg.FABLE_PLOT_LABEL,
      '%{BKY_DATA}',
      '%{BKY_LABEL_CARTESIAN}'
    ];

    var toolboxKeywords = [
      'X', 'Y',
      Blockly.Msg.RED, Blockly.Msg.GREEN, Blockly.Msg.BLUE,
      Blockly.Msg.YELLOW, Blockly.Msg.CYAN, Blockly.Msg.MAGENTA
    ];

    Blockly.Search.preprocessSearchKeywords('fable_make_plot_xy', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.fable_make_scatter_plot = {
  /**
     * Block for realtime plot.
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.graphIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_SCATTER_PLOT);

    this.appendValueInput('VALUE_X')
      .appendField('X: ')
      .setCheck('Number');

    this.appendValueInput('VALUE_Y')
      .appendField('Y: ')
      .setCheck('Number');

    var labelColorOptions = new Blockly.FieldDropdown([
      [Blockly.Msg.RED, 'A'], [Blockly.Msg.GREEN, 'B'], [Blockly.Msg.BLUE, 'C'],
      [Blockly.Msg.YELLOW, 'D'], [Blockly.Msg.CYAN, 'E'], [Blockly.Msg.MAGENTA, 'F']
    ]);
    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_PLOT_LABEL)
      .appendField(labelColorOptions, 'SERIES_ID');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.dataStyle);
    this.setTooltip(Blockly.Msg.FABLE_SCATTER_PLOT_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_SCATTER_PLOT,
      Blockly.Msg.FABLE_PLOT_LABEL,
      '%{BKY_DATA}',
      '%{BKY_LABEL_SCATTER}'
    ];

    var toolboxKeywords = [
      'X', 'Y',
      Blockly.Msg.RED, Blockly.Msg.GREEN, Blockly.Msg.BLUE,
      Blockly.Msg.YELLOW, Blockly.Msg.CYAN, Blockly.Msg.MAGENTA
    ];

    Blockly.Search.preprocessSearchKeywords('fable_make_scatter_plot', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.fable_save_as_csv = {
  /**
     * Block for data loggin into a csv file.
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.saveIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_LOG);

    this.appendValueInput('VALUE')
      .setCheck(null);

    this.appendDummyInput()
      .appendField(Blockly.Msg.FABLE_LOG_IN_FILE);

    this.appendValueInput('FILENAME')
      .setCheck('String');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.dataStyle);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.FABLE_LOG_TOOLTIP);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_LOG,
      Blockly.Msg.FABLE_LOG_IN_FILE,
      '%{BKY_DATA}',
      '%{BKY_LABEL_FILE_LOGGING}',
      'csv',
      'CSV'
    ];

    var toolboxKeywords = [
      'MyFableLog'
    ];

    Blockly.Search.preprocessSearchKeywords('fable_save_as_csv', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.fable_load_from_csv = {
  /**
     * Block for reading data from a csv file.
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.saveIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');

    this.appendDummyInput().appendField(image);

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_READ_CSV);

    this.appendValueInput('FILENAME').setCheck('String');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.dataStyle);
    this.setTooltip(Blockly.Msg.FABLE_READ_CSV_TOOLTIP);
    this.setOutput(true, 'Array');
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_READ_CSV,
      '%{BKY_DATA}',
      '%{BKY_LABEL_FILE_LOGGING}',
      'csv',
      'CSV'
    ];

    var toolboxKeywords = [
      'MyFableLog'
    ];

    Blockly.Search.preprocessSearchKeywords('fable_load_from_csv', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.fable_load_from_csv_advance = {
  /**
     * Block for reading data from a csv file.
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.saveIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');

    this.appendDummyInput().appendField(image);

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_READ_CSV);
    this.appendValueInput('FILENAME').setCheck('String');

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_READ_CSV_DELIMITER);
    this.appendValueInput('DELIMITER').setCheck('String');

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_READ_CSV_SKIP_HEADER);
    this.appendValueInput('SKIPHEADER').setCheck('Boolean');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.dataStyle);
    this.setTooltip(Blockly.Msg.FABLE_READ_CSV_TOOLTIP_ADVANCE);
    this.setOutput(true, 'Array');
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [
      Blockly.Msg.FABLE_READ_CSV,
      Blockly.Msg.FABLE_READ_CSV_DELIMITER,
      Blockly.Msg.FABLE_READ_CSV_SKIP_HEADER,
      '%{BKY_DATA}',
      '%{BKY_LABEL_FILE_LOGGING}',
      'csv',
      'CSV'
    ];

    var toolboxKeywords = [
      'MyFableLog'
    ];

    Blockly.Search.preprocessSearchKeywords('fable_load_from_csv_advance', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.fable_cast_to_type = {
  /**
   * Casts value to selected type.
   * @this Blockly.Block
   */

  init: function () {
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.consoleIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');

    this.appendDummyInput().appendField(image);

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_TYPE_CAST);

    this.appendValueInput('VALUE');

    var TYPEOPT = [['string', 'STRING'], ['int', 'INT'], ['float', 'FLOAT']];
    var thisBlock_ = this;

    var dropdown = new Blockly.FieldDropdown(TYPEOPT, function (selectedType) {
      thisBlock_.updateOutputType_(selectedType);
    });

    this.appendDummyInput().appendField(Blockly.Msg.TO).appendField(dropdown, 'TYPE');

    // Properties:
    this.setTooltip(function () {
      const selection = thisBlock_.getFieldValue('TYPE');

      var TOOLTIPS = {
        STRING: Blockly.Msg.FABLE_TYPE_CAST_TOOLTIP.replace('{0}', 'string'),
        INT: Blockly.Msg.FABLE_TYPE_CAST_TOOLTIP.replace('{0}', 'int'),
        FLOAT: Blockly.Msg.FABLE_TYPE_CAST_TOOLTIP.replace('{0}', 'float')
      };

      try {
        return TOOLTIPS[selection];
      } catch (err) {
        return '';
      }
    });

    this.setStyle(Blockly.Blocks.Definitions.dataStyle);
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [Blockly.Msg.FABLE_TYPE_CAST, '%{BKY_DATA}', 'string', 'int', 'float'];
    var toolboxKeywords = [Blockly.Msg.FABLE_TYPE_CAST, 'string', 'int', 'float'];

    Blockly.Search.preprocessSearchKeywords('fable_cast_to_type', keywords, toolboxKeywords);
  },
  updateOutputType_: function (selectedType) {
    const OUTPUT_TYPES = {
      STRING: 'String',
      INT: 'Number',
      FLOAT: 'Number'
    };

    try {
      this.outputConnection.setCheck(OUTPUT_TYPES[selectedType]);
    } catch (ex) {
      console.log(ex);
      this.outputConnection.setCheck('Number');
    }
  }
};

Blockly.Blocks.fable_cast_list_values_to_type = {
  /**
     * Block for casting values from a list to a selected type.
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(
      Blockly.Blocks.Definitions.consoleIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');

    this.appendDummyInput().appendField(image);

    this.appendDummyInput().appendField(Blockly.Msg.FABLE_TYPE_CAST_LIST);

    this.appendValueInput('LIST').setCheck('Array');

    var targetTypes = new Blockly.FieldDropdown(
      [['string', 'STRING'], ['int', 'INT'], ['float', 'FLOAT']]
    );

    this.appendDummyInput().appendField(Blockly.Msg.TO);

    this.appendDummyInput().appendField(targetTypes, 'TYPE');

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.dataStyle);
    this.setTooltip(Blockly.Msg.FABLE_TYPE_CAST_LIST_TOOLTIP);
    this.setOutput(true, 'Array');
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [Blockly.Msg.FABLE_TYPE_CAST_LIST, '%{BKY_DATA}', 'list', 'array', 'string', 'float', 'int'];
    var toolboxKeywords = ['cast'];

    Blockly.Search.preprocessSearchKeywords('fable_cast_list_values_to_type', keywords, toolboxKeywords);
  }
};

Blockly.Blocks.fable_print = {
  /**
     * Block for print.
     * @this Blockly.Block
     */
  init: function () {
    // Inputs:
    var image = new Blockly.FieldImage(Blockly.Blocks.Definitions.consoleIcon,
      Blockly.Blocks.Definitions.iconSize,
      Blockly.Blocks.Definitions.iconSize, '*');
    this.appendDummyInput()
      .appendField(image);

    this.appendValueInput('DATA')
      .appendField(Blockly.Msg.FABLE_PRINT);

    // Properties:
    this.setStyle(Blockly.Blocks.Definitions.dataStyle);
    this.setTooltip(Blockly.Msg.FABLE_PRINT_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setHelpUrl('http://www.example.com/');
  },
  ensureSearchKeywords: function () {
    var keywords = [Blockly.Msg.FABLE_PRINT];
    var toolboxKeywords = ['print'];

    Blockly.Search.preprocessSearchKeywords('fable_print', keywords, toolboxKeywords);
  }
};
