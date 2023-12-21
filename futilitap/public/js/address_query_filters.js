// Description: Query filters for Address doctype.
// Author: Ismail Tabtabai
// Version: 0.0.1
// Last Update: 2023-12-17

frappe.provide('frappe.ui.form');

frappe.ui.form.on('Address', {
    country: function(frm) {
        if (!frm.doc.country) {
            // Clear the dependent fields only if country is cleared
            ['city', 'county', 'state', 'pincode'].forEach(field => {
                frm.set_value(field, "");
            });
            return;
        }

        // Trigger change events for each field to set the query filters
        ['city', 'county', 'state', 'pincode'].forEach(field => {
            frm.trigger(field);
        });

        // Function to set common query based on country
        function set_common_query(field_name) {
            frm.set_query(field_name, function() {
                return {
                    filters: {
                        'country': frm.doc.country
                    }
                };
            });
        }

        // Filter City, County, and State fields based on Country field
        ['city', 'county', 'state'].forEach(set_common_query);
    },

    city: function(frm) {
        if (!frm.doc.city) {
            // Clear the state field if no city is selected
            frm.set_value('state', '');
            return;
        }
        // Fetch city details
        frappe.db.get_value('FUA City', {'name': frm.doc.city}, 'state')
            .then(r => {
                // Set the state value in the dialog
                if (r && r.message && r.message.state) {
                    frm.set_value('state', r.message.state);
                } else {
                    frappe.msgprint(__("State not found for city {0}", frm.doc.city));
                    frm.set_value('state', "");
                }
            })
            .catch(err => {
                frm.set_value('state', "");
                frappe.msgprint(__("Error fetching city details: {0}", err));
                console.error("Error fetching city {0} details: ", frm.doc.city, err);
            });
    },
});