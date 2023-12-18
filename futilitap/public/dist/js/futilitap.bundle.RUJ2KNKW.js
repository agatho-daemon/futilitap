(() => {
  // ../futilitap/futilitap/public/js/address_query_filters.js
  frappe.provide("frappe.ui.form");
  frappe.ui.form.on("Address", {
    country: function(frm) {
      frm.set_value("city", "");
      frm.set_value("county", "");
      frm.set_value("state", "");
      frm.set_value("pincode", "");
      function set_common_query(field_name) {
        frm.set_query(field_name, function() {
          return {
            "filters": {
              "country": frm.doc.country
            }
          };
        });
      }
      set_common_query("city");
      set_common_query("county");
      set_common_query("state");
    }
  });

  // ../futilitap/futilitap/public/js/contact_qentry.js
  frappe.provide("frappe.ui.form");
  frappe.ui.form.ContactQEntry = class ContactQEntry extends frappe.ui.form.QuickEntryForm {
    constructor(doctype, after_insert, init_callback, doc, force) {
      super(doctype, after_insert, init_callback, doc, force);
      this.skip_redirect_on_error = true;
    }
    render_dialog() {
      this.mandatory = this.mandatory.concat(this.get_variant_fields());
      super.render_dialog();
    }
    insert() {
      const map_field_names = {
        "email_address": "email_id",
        "mobile_number": "mobile_no"
      };
      Object.entries(map_field_names).forEach(([fieldname, new_fieldname]) => {
        this.dialog.doc[new_fieldname] = this.dialog.doc[fieldname];
        delete this.dialog.doc[fieldname];
      });
      return super.insert();
    }
    get_variant_fields() {
      var variant_fields = [
        {
          fieldtype: "Section Break",
          label: __("Primary Contact Details"),
          collapsible: 1
        },
        {
          label: __("Email Id"),
          fieldname: "email_address",
          fieldtype: "Data",
          options: "Email"
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
          options: "Country"
        },
        {
          label: __("City"),
          fieldname: "city",
          fieldtype: "Data"
        },
        {
          label: __("State"),
          fieldname: "state",
          fieldtype: "Data"
        },
        {
          label: __("Customer POS Id"),
          fieldname: "customer_pos_id",
          fieldtype: "Data",
          hidden: 1
        }
      ];
      return variant_fields;
    }
  };
  frappe.ui.form.CustomerQuickEntryForm = frappe.ui.form.ContactQEntry;
})();
//# sourceMappingURL=futilitap.bundle.RUJ2KNKW.js.map
