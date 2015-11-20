/**
 * Plugin: "disable_options" (selectize.js)
 * Copyright (c) 2013 Mondo Robot & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @authors Jake Myers <jmyers0022@gmail.com>, Vaughn Draughon <vaughn@rocksolidwebdesign.com>
 */

 Selectize.define('disable_options', function(options){

    var self = this;

    if(Object.keys(options).length > 0) {

        options = $.extend({'disableOptions': []}, options);
    }

    self.getDisabledOptions = (function () {
    	
	return function() {
            
            return options.disableOptions;
	}
    })();

    self.setDisabledOptions = (function () {

        return function(disableOptions) {

            if(Object.prototype.toString.call(disableOptions) === '[object Array]') {

                options = $.extend({'disableOptions': []}, {'disableOptions': disableOptions});
            }
            else {

                console.error('options must be passed in array');
            }
        }

    })();

    self.enableOptions = (function () {

        return function(enableOptions) {

            if(enableOptions !== undefined) {

                if(Object.prototype.toString.call(enableOptions) === '[object Array]') {

                    options = $.extend({'disableOptions': []}, {'disableOptions': enableOptions});
                }
                else {

                    console.error('options must be passed in array');
                }
            }
            else {

                options.disableOptions = [];
            }
        }
    })();

    self.onFocus = (function() {
        var original = self.onFocus;

        return function() {
            original.apply(this, arguments);

            for(var option in options.disableOptions) {

                self.$dropdown_content
                    .find('[data-value="' + String(options.disableOptions[option]) + '"]')
                    .addClass('option-disabled');
            }
        };
    })();

    self.onOptionSelect = (function() {
        var original = self.onOptionSelect;

        return function(e) {
            var value;
            var $target;

            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }

            $target = $(e.currentTarget);

            if ($target.hasClass('option-disabled')) {
                return;
            } else if ($target.hasClass('create')) {
                self.createItem();
            } else {
                value = $target.attr('data-value');
                if (value) {
                    self.lastQuery = null;
                    self.setTextboxValue('');
                    self.addItem(value);
                    if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
                        self.setActiveOption(self.getOption(value));
                    }
                }

                self.blur();
            }
            return original.apply(this, arguments);
        };
    })();
});
