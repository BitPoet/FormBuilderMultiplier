# FormBuilderMultiplier
[ProcessWire](https://processwire.com) module extending [FormBuilder](https://processwire.com/api/modules/form-builder/) commercial module to allow multiplying fieldsets in the frontend form

# Compatiblity
Compatible with ProcessWire 3.x

# Status
alpha - feedback welcome

# Description
This module is an extension to the commercial FormBuilder module and adds a multiplication option to fieldsets so the user can add and fill in multiple sets of the contained fields (think "Repeater light" in ProcessWire terms).

Values entered this way can be saved and emailed, but can not be handled by the "Save to ProcessWire page" action.

# Usage
After installing this module, create/edit a form with a fieldset. Go into the fieldset's configuration and check the "Multiply fields in this set" in the Details tab. Optionally, enter a multiplication limit.

Visit the form in the frontend or prevew. Under each fieldset enabled for multiplication, a button "Add row" has been added. Clicking on it adds another set of the fieldset's fields, comparable to PW's Repeater field type in the page editor.

The labels and names of such enabled fields are suffixed with an underscore and a consecutive number. So if your fieldset, e.g., contains fields with the name "surname" and "givenname", the first ocurrence in the form will get renamed to "surname_1" resp. "givenname_1". Clicking the button adds "surname_2" and "givenname_2". The "row number" is also appended to the fields' labels.

# Screencast
![Screencast/Gif](http://bitpoet.github.io/img/FBMulitplier.gif)

## Thanks
Big thanks to viergg-jfc for language support, remove row functionality and bugfixes.

# License
Released under Mozilla Public License (MPL) v2. You can read the full text [here](https://github.com/BitPoet/FormBuilderMultiplier/raw/master/LICENSE) or open the "LICENSE" file included in your download of this module.
