frappe.provide('frappe.ui.form');

frappe.ui.form.ContactQEntry = class ContactQEntry extends frappe.ui.form.QuickEntryForm {
	// constructor(doctype, after_insert, init_callback, doc, force) {
	// 	super(doctype, after_insert, init_callback, doc, force);
	// 	this.skip_redirect_on_error = true;
	// }

	render_dialog() {
		this.mandatory = this.mandatory.concat(this.get_variant_fields());
		super.render_dialog();

        // Attach onchange handler to country field
        this.dialog.fields_dict.country.df.onchange = () => {
                this.country_changed();
        };

        // Filter cities based on country
        this.dialog.fields_dict['city'].get_query = () => {
			let country = this.dialog.get_value('country');
            return {
                filters: { "country": country }
            };
        };

		// onchange handler for city
		this.dialog.fields_dict.city.df.onchange = () => {
			let cityName = this.dialog.get_value('city');
			if (cityName) {
				// Fetch city details
				frappe.db.get_doc('FUA City', cityName)
					.then(city => {
						// Set the state value in the dialog
						if (city && city.state) {
							this.dialog.set_value('state', city.state);
						}
					});
			}
		};
		

	}


	get_variant_fields(dialogInstance) {
		var variant_fields = [{
			fieldtype: "Section Break",
			label: __("Primary Contact Details"),
			collapsible: 1
		},
		{
			label: __("Email Id"),
			fieldname: "email_address",
			fieldtype: "Data",
			options: "Email",
		},
		{
			fieldtype: "Column Break"
		},
		{
			label: __("Mobile Number"),
			fieldname: "mobile_number",
			fieldtype: "Data"
		},
		{
			fieldtype: "Section Break",
			label: __("Primary Address Details"),
			collapsible: 1
		},
		{
			label: __("Address Line 1"),
			fieldname: "address_line1",
			fieldtype: "Data"
		},
		{
			label: __("Address Line 2"),
			fieldname: "address_line2",
			fieldtype: "Data"
		},
		{
			label: __("ZIP Code"),
			fieldname: "pincode",
			fieldtype: "Data"
		},
		{
			fieldtype: "Column Break"
		},
		{
			label: __("Country"),
			fieldname: "country",
			fieldtype: "Link",
			options: "Country",
            default: frappe.sys_defaults.country
		},
		{
			label: __("City"),
			fieldname: "city",
			fieldtype: "Link",
            options: "FUA City"
		},
		{
			label: __("State"),
			fieldname: "state",
			fieldtype: "Link",
            options: "FUA State",
		},
		{
			label: __("Customer POS Id"),
			fieldname: "customer_pos_id",
			fieldtype: "Data",
			hidden: 1
		}];

		return variant_fields;
	}

	country_changed() {
		this.resetFieldsToBlank(['city', 'state']);
	}

	resetFieldsToBlank(fieldNames) {
		if (this.dialog) {
			fieldNames.forEach(fieldName => {
				if (this.dialog.fields_dict[fieldName]) {
					this.dialog.set_value(fieldName, '');
				}
			});
		}
	}
}

frappe.ui.form.CustomerQuickEntryForm = frappe.ui.form.ContactQEntry;

// frappe.ui.form.CustomerQuickEntryForm = frappe.ui.form.QuickEntryForm.extend({
//     init: function(doctype, after_insert) {
//         this.skip_redirect_on_error = true;
//         this._super(doctype, after_insert);
//     },

//     render_dialog: function() {
//         this.mandatory = this.get_field();
//         this._super();
//     },

//     get_field: function() {
//         const variantFields = [
//             {
//                 fieldtype: "Section Break",
//                 label: __("Primary Contact Details"),
//                 collabsible: 1
//             },
//             {
//                 label: __("Email Id"),
//                 fieldname: "email_address",
//                 fieldtype: "Data",
//                 options: "Email"
//             },
//             {
//                 fieldtype: "Column Break"
//             },
//             {
//                 label: __("Mobile Number"),
//                 fieldname: "mobile_number",
//                 fieldtype: "Data"
//             },
//             {
//                 fieldtype: "Section Break",
//                 label: __("Primary Address Details"),
//                 collabsible: 1
//             },
//             {
//                 label: __("Address Line 1"),
//                 fieldname: "address_line1",
//                 fieldtype: "Data"
//             },
//             {
//                 label: __("Address Line 2"),
//                 fieldname: "address_line2",
//                 fieldtype: "Data"
//             },
//             {
//                 label: __("PACI"),
//                 fieldname: "pincode",
//                 fieldtype: "Data"
//             },
//             {
//                 fieldtype: "Column Break"
//             },
//             {
//                 label: __("City/Town"),
//                 fieldname: "city",
//                 fieldtype: "Link",
//                 options: "FUA City"
//             },
//             {
//                 label: __("Governorate"),
//                 fieldname: "state",
//                 fieldtype: "Link",
//                 options: "FUA Governorate"
//             },
//             {
//                 label: __("Country"),
//                 fieldname: "country",
//                 fieldtype: "Link",
//                 options: "Country"
//             },
//             {
//                 label: __("Customer POS Id"),
//                 fieldname: "customer_pos_id",
//                 fieldtype: "Data"
//                 hidden: 1
//             }
//         ];

//         return variantFields;
//     }
// })