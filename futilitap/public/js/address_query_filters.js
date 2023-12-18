// Description: Query filters for Address doctype.
// Author: Ismail Tabtabai
// Version: 0.0.1
// Last Update: 2023-12-17

frappe.provide('frappe.ui.form');

frappe.ui.form.on('Address', {
    country: function(frm) {
        // Reset fields when country is changed.
        frm.set_value("city", "");
        frm.set_value("county", "");
        frm.set_value("state", "");
        frm.set_value("pincode", "");

        // Both City & State fields need to be filtered by Country field
        function set_common_query(field_name) {
            frm.set_query(field_name, function() {
                return {
                    "filters": {
                        "country": frm.doc.country
                    }
                };
            });
        }
        // Filter City and Governorate fields based on Country field
        set_common_query("city");
        set_common_query("county");
        set_common_query("state");
    },
});