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
 * @fileoverview Dropdown input field.  Used for editable titles and variables.
 * In the interests of a consistent UI, the toolbox shares some functions and
 * properties with the context menu.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldDropdown');

goog.require('Blockly.Events');
goog.require('Blockly.Events.BlockChange');
goog.require('Blockly.Field');
goog.require('Blockly.fieldRegistry');
goog.require('Blockly.Menu');
goog.require('Blockly.MenuItem');
goog.require('Blockly.FilteredMenu');
goog.require('Blockly.navigation');
goog.require('Blockly.utils');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.Size');
goog.require('Blockly.utils.string');
goog.require('Blockly.utils.userAgent');


/**
 * Class for an editable dropdown field.
 * @param {(!Array.<!Array>|!Function)} menuGenerator A non-empty array of
 *     options for a dropdown list, or a function which generates these options.
 * @param {Function=} opt_validator A function that is called to validate
 *    changes to the field's value. Takes in a language-neutral dropdown
 *    option & returns a validated language-neutral dropdown option, or null to
 *    abort the change.
 * @param {Object=} opt_config A map of options used to configure the field.
 *    See the [field creation documentation]{@link https://developers.google.com/blockly/guides/create-custom-blocks/fields/built-in-fields/dropdown#creation}
 *    for a list of properties this parameter supports.
 * @extends {Blockly.Field}
 * @constructor
 * @throws {TypeError} If `menuGenerator` options are incorrectly structured.
 */
Blockly.FieldDropdown = function(menuGenerator, opt_validator, opt_config) {
  if (typeof menuGenerator != 'function') {
    Blockly.FieldDropdown.validateOptions_(menuGenerator);
  }

  // Default options
  this.shouldAllowSearch_ = false;
  this.maxLength = -1;

  /**
   * An array of options for a dropdown list,
   * or a function which generates these options.
   * @type {(!Array.<!Array>|
   *    !function(this:Blockly.FieldDropdown): !Array.<!Array>)}
   * @protected
   */
  this.menuGenerator_ = menuGenerator;

  /**
   * A cache of the most recently generated options.
   * @type {Array.<!Array.<string>>}
   * @private
   */
  this.generatedOptions_ = null;

  /**
   * The currently selected index. The field is initialized with the
   * first option selected.
   * @type {number}
   * @private
   */
  this.selectedIndex_ = 0;

  this.trimOptions_();
  var firstTuple = this.getOptions(false)[0];

  // Call parent's constructor.
  Blockly.FieldDropdown.superClass_.constructor.call(
      this, firstTuple[1], opt_validator, opt_config);

  /**
   * SVG image element if currently selected option is an image, or null.
   * @type {SVGElement}
   * @private
   */
  this.imageElement_ = null;

  /**
   * A reference to the currently selected menu item.
   * @type {Blockly.MenuItem}
   * @private
   */
  this.selectedMenuItem_ = null;

  this.storedSelection = null;
};
Blockly.utils.object.inherits(Blockly.FieldDropdown, Blockly.Field);

/**
 * Dropdown image properties.
 * @typedef {{
  *            src:string,
  *            alt:string,
  *            width:number,
  *            height:number
  *          }}
  */
Blockly.FieldDropdown.ImageProperties;

/**
 * Construct a FieldDropdown from a JSON arg object.f
 * @param {!Object} options A JSON object with options (options).
 * @return {!Blockly.FieldDropdown} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldDropdown.fromJson = function(options) {
  return new Blockly.FieldDropdown(options['options'], undefined, options);
};

/**
 * Serializable fields are saved by the XML renderer, non-serializable fields
 * are not. Editable fields should also be serializable.
 * @type {boolean}
 */
Blockly.FieldDropdown.prototype.SERIALIZABLE = true;

/**
 * Horizontal distance that a checkmark overhangs the dropdown.
 */
Blockly.FieldDropdown.CHECKMARK_OVERHANG = 0;

/**
 * Maximum height of the dropdown menu, as a percentage of the viewport height.
 */
Blockly.FieldDropdown.MAX_MENU_HEIGHT_VH = 0.45;

/**
 * The y offset from the top of the field to the top of the image, if an image
 * is selected.
 * @type {number}
 * @const
 * @private
 */
Blockly.FieldDropdown.IMAGE_Y_OFFSET = 5;

/**
 * The total vertical padding above and below an image.
 * @type {number}
 * @const
 * @private
 */
Blockly.FieldDropdown.IMAGE_Y_PADDING =
    Blockly.FieldDropdown.IMAGE_Y_OFFSET * 2;

/**
 * Android can't (in 2014) display "▾", so use "▼" instead.
 */
Blockly.FieldDropdown.ARROW_CHAR =
    Blockly.utils.userAgent.ANDROID ? '\u25BC' : '\u25BE';

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldDropdown.prototype.CURSOR = 'default';

Blockly.FieldDropdown.prototype.setShouldAllowSearch = function (shouldAllowSearch) {
  this.shouldAllowSearch_ = shouldAllowSearch;
};

Blockly.FieldDropdown.prototype.setOptionsMaxLength = function (maxLength) {
  this.maxLength = maxLength;
};

/**
 * Create the block UI for this dropdown.
 * @package
 */
Blockly.FieldDropdown.prototype.initView = function() {
  Blockly.FieldDropdown.superClass_.initView.call(this);

  this.imageElement_ = Blockly.utils.dom.createSvgElement( 'image',
      {
        'y': Blockly.FieldDropdown.IMAGE_Y_OFFSET
      }, this.fieldGroup_);

  this.arrow_ = Blockly.utils.dom.createSvgElement('tspan', {}, this.textElement_);
  this.arrow_.appendChild(document.createTextNode(
      this.sourceBlock_.RTL ?
      Blockly.FieldDropdown.ARROW_CHAR + ' ' :
      ' ' + Blockly.FieldDropdown.ARROW_CHAR));
  if (this.sourceBlock_.RTL) {
    this.textElement_.insertBefore(this.arrow_, this.textContent_);
  } else {
    this.textElement_.appendChild(this.arrow_);
  }
};

/**
 * Create a dropdown menu under the text.
 * @private
 */
Blockly.FieldDropdown.prototype.showEditor_ = function() {
  this.menu_ = this.dropdownCreate_();
  // Element gets created in render.
  this.menu_.render(Blockly.DropDownDiv.getContentDiv());
  Blockly.utils.dom.addClass(
      /** @type {!Element} */ (this.menu_.getElement()), 'blocklyDropdownMenu');

  // # SHAPE ####################################################################################################################
  Blockly.DropDownDiv.sourceFieldID_ = this.name; // Store a reference of this Field name.
  // ############################################################################################################################

  Blockly.DropDownDiv.showPositionedByField(
      this, this.dropdownDispose_.bind(this));

  // Focusing needs to be handled after the menu is rendered and positioned.
  // Otherwise it will cause a page scroll to get the misplaced menu in
  // view. See issue #1329.
  this.menu_.focus();

  // Scroll the dropdown to show the selected menu item.
  if (this.selectedMenuItem_) {
    Blockly.utils.style.scrollIntoContainerView(
        /** @type {!Element} */ (this.selectedMenuItem_.getElement()),
        /** @type {!Element} */ (this.menu_.getElement()));
  }
};

/**
 * Create the dropdown editor.
 * @return {Blockly.Menu} The newly created dropdown menu.
 * @private
 */
Blockly.FieldDropdown.prototype.dropdownCreate_ = function() {
  var options = this.getOptions(false);

  if (this.shouldAllowSearch_ && options.length > 2) {
    var menu = new Blockly.FilteredMenu();
  }
  else {
    var menu = new Blockly.Menu();
  }

  menu.setRightToLeft(this.sourceBlock_.RTL);
  menu.setRole('listbox');

  options = this.trimMaxLengthOptions_(options);

  this.selectedMenuItem_ = null;
  for (var i = 0; i < options.length; i++) {
    var content = options[i][0]; // Human-readable text or image.
    var value = options[i][1];   // Language-neutral value.
    if (typeof content == 'object') {
      // An image, not text.
      var image = new Image(content['width'], content['height']);
      image.src = content['src'];
      image.alt = content['alt'] || '';
      content = image;
    }

    if (typeof content === 'string' && content === '') {
      continue;
    }

    var menuItem = new Blockly.MenuItem(content);
    menuItem.setRole('option');
    menuItem.setRightToLeft(this.sourceBlock_.RTL);
    menuItem.setValue(value);
    menuItem.setCheckable(true);
    menu.addChild(menuItem, true);
    menuItem.setChecked(value == this.value_);
    if (value == this.value_) {
      this.selectedMenuItem_ = menuItem;
    }
    menuItem.onAction(this.handleMenuActionEvent_, this);
  }

  
  if (menu.filterInput_) {
    menu.filterInput_.setAttribute('placeholder', 'Search');
    menu.filterInput_.setAttribute('id', 'dropdownSearchInput');

    var clr = this.sourceBlock_.colour_;
    menu.filterInput_.style = 'border-bottom: 2px solid ' + clr + ';';
  }

  Blockly.utils.aria.setState(/** @type {!Element} */ (menu.getElement()),
      Blockly.utils.aria.State.ACTIVEDESCENDANT,
      this.selectedMenuItem_ ? this.selectedMenuItem_.getId() : '');

  return menu;
};

/**
 * Dispose of events belonging to the dropdown editor.
 * @private
 */
Blockly.FieldDropdown.prototype.dropdownDispose_ = function() {
  this.menu_.dispose();
  this.menu_ = null;
};

/**
 * Handle an action in the dropdown menu.
 * @param {!Blockly.MenuItem} menuItem The MenuItem selected within menu.
 * @private
 */
Blockly.FieldDropdown.prototype.handleMenuActionEvent_ = function(menuItem) {
  Blockly.DropDownDiv.hideIfOwner(this, true);
  this.onItemSelected(this.menu_, menuItem);
};

/**
 * Handle the selection of an item in the dropdown menu.
 * @param {!Blockly.Menu} menu The Menu component clicked.
 * @param {!Blockly.MenuItem} menuItem The MenuItem selected within menu.
 */
Blockly.FieldDropdown.prototype.onItemSelected = function(menu, menuItem) {
  this.setValue(menuItem.getValue());
};

/**
 * Factor out common words in statically defined options.
 * Create prefix and/or suffix labels.
 * @private
 */
Blockly.FieldDropdown.prototype.trimOptions_ = function() {
  this.prefixField = null;
  this.suffixField = null;
  var options = this.menuGenerator_;
  if (!Array.isArray(options)) {
    return;
  }
  var hasImages = false;

  // Localize label text and image alt text.
  for (var i = 0; i < options.length; i++) {
    var label = options[i][0];
    if (typeof label == 'string') {
      options[i][0] = Blockly.utils.replaceMessageReferences(label);
    } else {
      if (label.alt != null) {
        options[i][0].alt = Blockly.utils.replaceMessageReferences(label.alt);
      }
      hasImages = true;
    }
  }
  if (hasImages || options.length < 2) {
    return;  // Do nothing if too few items or at least one label is an image.
  }
  var strings = [];
  for (var i = 0; i < options.length; i++) {
    strings.push(options[i][0]);
  }
  var shortest = Blockly.utils.string.shortestStringLength(strings);
  var prefixLength = Blockly.utils.string.commonWordPrefix(strings, shortest);
  var suffixLength = Blockly.utils.string.commonWordSuffix(strings, shortest);
  
  if (!prefixLength && !suffixLength) {
    return;
  }
  if (shortest <= prefixLength + suffixLength) {
    // One or more strings will entirely vanish if we proceed.  Abort.
    return;
  }
  if (prefixLength) {
    this.prefixField = strings[0].substring(0, prefixLength - 1);
  }
  if (suffixLength) {
    this.suffixField = strings[0].substr(1 - suffixLength);
  }

  this.menuGenerator_ = Blockly.FieldDropdown.applyTrim_(options, prefixLength,
      suffixLength);
};

/**
 * Use the calculated prefix and suffix lengths to trim all of the options in
 * the given array.
 * @param {!Array.<!Array>} options Array of option tuples:
 *     (human-readable text or image, language-neutral name).
 * @param {number} prefixLength The length of the common prefix.
 * @param {number} suffixLength The length of the common suffix
 * @return {!Array.<!Array>} A new array with all of the option text trimmed.
 */
Blockly.FieldDropdown.applyTrim_ = function(options,
    prefixLength, suffixLength) {
  var newOptions = [];
  var strings = [];
  // Remove the prefix and suffix from the options.
  for (var i = 0; i < options.length; i++) {
    var text = options[i][0];
    var value = options[i][1];
    text = text.substring(prefixLength, text.length - suffixLength);
    newOptions[i] = [text, value];
    strings.push(text);
  }
  
  this.longestOption = Blockly.utils.string.longestString(strings);
  return newOptions;
};

/**
 * @return {boolean} True if the option list is generated by a function.
 *     Otherwise false.
 */
Blockly.FieldDropdown.prototype.isOptionListDynamic = function() {
  return typeof this.menuGenerator_ == 'function';
};

Blockly.FieldDropdown.prototype.trimMaxLengthOptions_ = function(options) {
  if (this.maxLength <= 0) {
    return options;
  }

  if (!Array.isArray(options)) {
    return options;
  }

  var strings = [];

  for (var i = 0; i < options.length; i++) {
    var content = options[i][0]; // Human-readable text or image.
    if (typeof content === 'object') {
      continue;
    }

    if (typeof content === 'string' && content.length > this.maxLength) {
      content = content.substring(0, this.maxLength) + "…";
    }

    options[i][0] = content;
    strings.push(content);
  }

  this.longestOption = Blockly.utils.string.longestString(strings);

  return options;
};

/**
 * Return a list of the options for this dropdown.
 * @param {boolean=} opt_useCache For dynamic options, whether or not to use the
 *     cached options or to re-generate them.
 * @return {!Array.<!Array>} A non-empty array of option tuples:
 *     (human-readable text or image, language-neutral name).
 * @throws {TypeError} If generated options are incorrectly structured.
 */
Blockly.FieldDropdown.prototype.getOptions = function(opt_useCache) {
  if (this.isOptionListDynamic()) {
    if (!this.generatedOptions_ || !opt_useCache || this.storedSelection) {
      this.generatedOptions_ = this.menuGenerator_.call(this);
      Blockly.FieldDropdown.validateOptions_(this.generatedOptions_, this.storedSelection);
    }
    return this.generatedOptions_;
  }
  return /** @type {!Array.<!Array.<string>>} */ (this.menuGenerator_);
};

/**
 * Ensure that the input value is a valid language-neutral option.
 * @param {*=} opt_newValue The input value.
 * @return {?string} A valid language-neutral option, or null if invalid.
 * @protected
 */
Blockly.FieldDropdown.prototype.doClassValidation_ = function(opt_newValue) {
  var isValueValid = false;
  var options = this.getOptions(true);
  for (var i = 0, option; option = options[i]; i++) {
    // Options are tuples of human-readable text and language-neutral values.
    if ((option.length === 1 && option[0] === opt_newValue) || 
        (option[1] == opt_newValue)) {
      isValueValid = true;
      this.skipTimeout = false;
      break;
    }
  }
  if (!isValueValid) {
    if (this.sourceBlock_) {
      // Check for two special cases, but only if the skipTimeout flag hasn't been raised yet
      if (!this.skipTimeout &&
          (this.sourceBlock_.type === 'fable_imread' ||
          this.sourceBlock_.type === 'fable_play_custom_sound')) {
        // Raise the skipTimeout flag
        this.skipTimeout = true;

        // Set a timeout for 500 ms that will repeat the check.
        // Used for "dynamic" dropdowns, which are based on FableAPI's response time
        var thisObj = this;
        setTimeout(function () {
          thisObj.setValue(opt_newValue);
        }, 500);

        return opt_newValue;
      }

      this.storedSelection = opt_newValue;

      console.warn('Cannot set the dropdown\'s value to an unavailable option.' +
          ' Block type: ' + this.sourceBlock_.type + ', Field name: ' + this.name +
          ', Value: ' + opt_newValue);

      return opt_newValue;
    }
    return null;
  }
  return /** @type {string} */ (opt_newValue);
};

/**
 * Update the value of this dropdown field.
 * @param {*} newValue The value to be saved. The default validator guarantees
 * that this is one of the valid dropdown options.
 * @protected
 */
Blockly.FieldDropdown.prototype.doValueUpdate_ = function(newValue) {
  Blockly.FieldDropdown.superClass_.doValueUpdate_.call(this, newValue);
  var options = this.getOptions(true);
  for (var i = 0, option; option = options[i]; i++) {
    if ((option.length === 1 && option[0] === this.value_) || 
        (option[1] == this.value_)) {
      this.selectedIndex_ = i;
    }
  }
};

/**
 * Updates the dropdown arrow to match the colour/style of the block.
 * @package
 */
Blockly.FieldDropdown.prototype.updateColour = function() {
  // Update arrow's colour.
  if (this.sourceBlock_ && this.arrow_) {
    if (this.sourceBlock_.isShadow()) {
      this.arrow_.style.fill = this.sourceBlock_.getColourShadow();
    } else {
      this.arrow_.style.fill = this.sourceBlock_.getColour();
    }
  }
};

/**
 * Draws the border with the correct width.
 * @private
 */
Blockly.FieldDropdown.prototype.render_ = function() {
  // Hide both elements.
  this.textContent_.nodeValue = '';
  this.imageElement_.style.display = 'none';

  // Show correct element.
  var options = this.getOptions(true);

  // ##SHAPE ROBOTICS##########################################################################################################################
  if (this.selectedIndex_ && this.selectedIndex_ >= options.length) {
    console.warn('Field Dropdown selected index out of bounds. Setting it to point to last option.' +
                 `Values: selectedIndex_=${this.selectedIndex_}, options.length=${options.length}.`);
    this.selectedIndex_ = options.length - 1;
  }
  // ###########################################################################################################################################

  var selectedOption = this.selectedIndex_ >= 0 &&
      options[this.selectedIndex_][0];
  if (selectedOption && typeof selectedOption == 'object') {
    this.renderSelectedImage_(selectedOption);
  } else {
    this.renderSelectedText_();
  }
  this.borderRect_.setAttribute('height', this.size_.height);
  this.borderRect_.setAttribute('width', this.size_.width);
  //TODOQ3: Old logic was this
  // this.borderRect_.setAttribute('width',
  //     this.size_.width + Blockly.BlockSvg.SEP_SPACE_X);
};

/**
 * Renders the selected option, which must be an image.
 * @param {!Blockly.FieldDropdown.ImageProperties} imageJson Selected
 *   option that must be an image.
 * @private
 */
Blockly.FieldDropdown.prototype.renderSelectedImage_ = function(imageJson) {
  this.imageElement_.style.display = '';
  this.imageElement_.setAttributeNS(
      Blockly.utils.dom.XLINK_NS, 'xlink:href', imageJson.src);
  this.imageElement_.setAttribute('height', imageJson.height);
  this.imageElement_.setAttribute('width', imageJson.width);

  var arrowWidth = Blockly.utils.dom.getTextWidth(this.arrow_);

  var imageHeight = Number(imageJson.height);
  var imageWidth = Number(imageJson.width);

  // Height and width include the border rect.
  this.size_.height = imageHeight + Blockly.FieldDropdown.IMAGE_Y_PADDING;
  this.size_.width = imageWidth + arrowWidth + Blockly.Field.X_PADDING;

  if (this.sourceBlock_.RTL) {
    var imageX = Blockly.Field.DEFAULT_TEXT_OFFSET + arrowWidth;
    var arrowX = Blockly.Field.DEFAULT_TEXT_OFFSET - 1;
    this.imageElement_.setAttribute('x', imageX);
    this.textElement_.setAttribute('x', arrowX);
  } else {
    var arrowX =
        imageWidth + arrowWidth + Blockly.Field.DEFAULT_TEXT_OFFSET + 1;
    this.textElement_.setAttribute('text-anchor', 'end');
    this.textElement_.setAttribute('x', arrowX);
    this.imageElement_.setAttribute('x', Blockly.Field.DEFAULT_TEXT_OFFSET);
  }

  //SHAPE: Added from blockly_changes
  this.textElement_.setAttribute('transform', 'translate(0,5)');
};

/**
 * Renders the selected option, which must be text.
 * @private
 */
Blockly.FieldDropdown.prototype.renderSelectedText_ = function() {
  // Retrieves the selected option to display through getText_.
  this.textContent_.nodeValue = this.getDisplayText_();
  this.textElement_.setAttribute('text-anchor', 'start');
  this.textElement_.setAttribute('x', Blockly.Field.DEFAULT_TEXT_OFFSET);
  // Height and width include the border rect.
  this.size_.height = Blockly.Field.BORDER_RECT_DEFAULT_HEIGHT;
  this.size_.width = Blockly.utils.dom.getTextWidth(this.textElement_) +
      Blockly.Field.X_PADDING;

  //TODOQ3: This was here before
  // //SHAPE: Added from blockly_changes
  // this.textElement_.setAttribute('transform', 'translate(0,0)');

  // //SHAPE: Removed dependence on constants from block_render_svg that SHOULD NOT BE REFERENCED here. Messes all of the vertical alignment.
  // this.size_.height = 30;
  // this.size_.width = Blockly.Field.getCachedWidth(this.textElement_);
};

/**
 * Use the `getText_` developer hook to override the field's text representation.
 * Get the selected option text. If the selected option is an image
 * we return the image alt text.
 * @return {?string} Selected option text.
 * @protected
 * @override
 */
Blockly.FieldDropdown.prototype.getText_ = function() {
  if (this.selectedIndex_ < 0) {
    return null;
  }
  var options = this.getOptions(true);
  var selectedOption = options[this.selectedIndex_][0];
  if (typeof selectedOption == 'object') {
    return selectedOption['alt'];
  }
  return selectedOption;
};

/**
 * Iterates through a dropdown and changes the colors of recent modules to grey them out.
 * @param activeIDsDict The list of current active modules.
 * @param recentIDsDict The list of 'seen' modules.
 * @author Shape Robotics
 */
/*
Blockly.FieldDropdown.changeRecentModuleColors = function (activeIDsDict, recentIDsDict) {
  // Find the dropdown HTML element
  var dropdownDiv = document.getElementsByClassName('blocklyDropDownDiv');
  if (dropdownDiv.length > 0) {
    dropdownDiv = dropdownDiv[0];
  } else {
    return;
  }

  // If the dropdown is not visible (aka closed), do not do anything
  if (dropdownDiv.style['display'] === 'none') {
    return;
  }

  // Get the dropdown's child, which contains a list with all the options
  var mainChild = dropdownDiv.children;
  if (mainChild.length > 0) {
    mainChild = mainChild[0];
  } else {
    return;
  }

  if (mainChild.children.length > 0) {
    mainChild = mainChild.children[0];
  } else {
    return;
  }

  // The following lines generate two lists for the active and recent modules.
  // Those lists contain ALL active/recent modules as strings. Makes for easier search later.
  var listOfActiveModules = [];
  var listOfRecentModules = [];

  // TODO: As new module types show up, add them in this list
  var listOfModuleTypes = ['Hub', 'Dongle', 'Joint', 'Spin', 'Face'];

  for (let key in listOfModuleTypes) {
    var moduleType = listOfModuleTypes[key];

    // Go through all the active modules of type "moduleType" and add them to the "global" list above
    if (activeIDsDict && moduleType in activeIDsDict) {
      for (var activeModule in activeIDsDict[moduleType]) {
        listOfActiveModules.push(activeIDsDict[moduleType][activeModule][0]);
      }
    }

    // Do the same for the recent modules
    if (recentIDsDict && moduleType in recentIDsDict) {
      for (var recentModule in recentIDsDict[moduleType]) {
        listOfRecentModules.push(recentIDsDict[moduleType][recentModule][0]);
      }
    }
  }

  // Go through all options in the dropdown
  for (var i = 0; i < mainChild.children.length; i++) {
    var child = mainChild.children[i];
    var innerText = child.innerText;
    if (innerText) {
      // remove that fun fun empty space
      innerText = innerText.trim();

      // Fix for a super weird bug where the spacebar at the end is replaced with /u0003 (End of Text) char.
      if (innerText.length === 4 && innerText.charCodeAt(innerText[3]) === 3) {
        innerText = innerText.substr(0, 3);
      }

      if (innerText !== 'Hub') {
        // uppercase for the Face module but not the Hub / Dongle
        innerText = innerText.toUpperCase();
      }

      // Search in the active and recent lists. If the option is inside the recent list, but not in the active list, grey it out.
      // Otherwise, un-grey it out.
      if (child.children.length > 0) {
        if (!(listOfActiveModules.includes(innerText)) &&
            (innerText !== '#')) {
          child.children[0].className = 'goog-menuitem-content recent-module';
        } else if (child.children[0].className === 'goog-menuitem-content recent-module') {
          child.children[0].className = 'goog-menuitem-content';
        }
      }
    }
  }
};
*/

/**
 * Implements new ChangeRecentModuleColors logic for the Tizen Project.
 * @param {*} activeIDsDict 
 * @param {*} recentIDsDict 
 * @author Nicolas Laverde [Shape Robotics AS]
 */
Blockly.FieldDropdown.changeRecentModuleColors = function (activeIDsDict, recentIDsDict) {
  const recentModuleClassName = "goog-menuitem-content recent-module";
  const activeModuleClassName = "goog-menuitem-content";
  
  // Find the dropdown HTML element
  const blocklyDropdownMenuElements = document.getElementsByClassName("blocklyDropdownMenu");
  if (blocklyDropdownMenuElements.length === 0) return;

  const moduleIDsBlocklyDropdownMenu = blocklyDropdownMenuElements[0];
  
  // Unfold the module dictionaries into ID lists of active modules.
  var activeModuleIDsList = [];
  var moduleTypeNamesList = ["Hub", "Dongle", "Joint", "Spin", "Face"];

  moduleTypeNamesList.forEach(_typeName => {
      if (activeIDsDict && _typeName in activeIDsDict) {
          const allActiveModulesOfTargetType = activeIDsDict[_typeName];
          allActiveModulesOfTargetType.forEach(_module => {
              activeModuleIDsList.push(_module[0].trim());
          })
      }
  });

  for (var moduleIDOption of moduleIDsBlocklyDropdownMenu.children) {
      const optionInnerText = moduleIDOption.innerText.trim();
      if (moduleIDOption.children.length > 0) {
          if (optionInnerText === "#") break;
          const isActiveModule = activeModuleIDsList.includes(optionInnerText) || optionInnerText === "Hub";
          moduleIDOption.children[0].className = isActiveModule ? activeModuleClassName : recentModuleClassName;
      }
  }
};

/**
 * Validates the data structure to be processed as an options list.
 * @param {?} options The proposed dropdown options.
 * @throws {TypeError} If proposed options are incorrectly structured.
 * @private
 */
Blockly.FieldDropdown.validateOptions_ = function(options, storedSelection) {
  if (!Array.isArray(options)) {
    throw TypeError('FieldDropdown options must be an array.');
  }
  if (!options.length) {
    throw TypeError('FieldDropdown options must not be an empty array.');
  }
  var foundError = false;
  var foundStored = false;
  for (var i = 0; i < options.length; ++i) {
    var tuple = options[i];
    if (typeof tuple == 'string') {	
      tuple = [tuple, tuple];	
      options[i] = tuple;	
    }
    if (!Array.isArray(tuple)) {
      foundError = true;
      console.error(
          'Invalid option[' + i + ']: Each FieldDropdown option must be an ' +
          'array. Found: ', tuple);
    } else if (tuple.length == 1) {
      tuple.push(tuple[0]);	
      options[i] = tuple;	
    } else if (typeof tuple[1] != 'string') {
      foundError = true;
      console.error(
          'Invalid option[' + i + ']: Each FieldDropdown option id must be ' +
          'a string. Found ' + tuple[1] + ' in: ', tuple);
    } else if (tuple[0] &&
              (typeof tuple[0] != 'string') &&
              (typeof tuple[0].src != 'string')) {
      foundError = true;
      console.error(
          'Invalid option[' + i + ']: Each FieldDropdown option must have a ' +
          'string label or image description. Found' + tuple[0] + ' in: ',
          tuple);
    }
    if (typeof tuple[1] != 'string') {	
      foundError = true;	
      console.error(	
          'Invalid option[' + i + ']: Each FieldDropdown option id must be ' +	
          'a string. Found ' + tuple[1] + ' in: ', tuple);	
    }

    if (storedSelection) {
      if (options[i][0] === storedSelection ||
          options[i][1] === storedSelection) {
        foundStored = true;
      }
    }
  }

  if (!foundStored && storedSelection) {
    options.push([storedSelection, storedSelection]);
  }

  if (foundError) {
    throw TypeError('Found invalid FieldDropdown options.');
  }
};

/**
 * Handles the given action.
 * This is only triggered when keyboard accessibility mode is enabled.
 * @param {!Blockly.Action} action The action to be handled.
 * @return {boolean} True if the field handled the action, false otherwise.
 * @package
 */
Blockly.FieldDropdown.prototype.onBlocklyAction = function(action) {
  if (this.menu_) {
    if (action === Blockly.navigation.ACTION_PREVIOUS) {
      this.menu_.highlightPrevious();
      return true;
    } else if (action === Blockly.navigation.ACTION_NEXT) {
      this.menu_.highlightNext();
      return true;
    }
  }
  return Blockly.FieldDropdown.superClass_.onBlocklyAction.call(this, action);
};

Blockly.fieldRegistry.register('field_dropdown', Blockly.FieldDropdown);
