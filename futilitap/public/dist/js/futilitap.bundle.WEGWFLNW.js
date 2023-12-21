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
    render_dialog() {
      this.mandatory = this.mandatory.concat(this.get_variant_fields());
      super.render_dialog();
      this.dialog.fields_dict.country.df.onchange = () => {
        this.country_changed();
      };
      this.dialog.fields_dict["city"].get_query = () => {
        let country = this.dialog.get_value("country");
        return {
          filters: { "country": country }
        };
      };
      this.dialog.fields_dict.city.df.onchange = () => {
        let cityName = this.dialog.get_value("city");
        if (cityName) {
          frappe.db.get_doc("FUA City", cityName).then((city) => {
            if (city && city.state) {
              this.dialog.set_value("state", city.state);
            }
          });
        }
      };
    }
    get_variant_fields(dialogInstance) {
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
          options: "FUA State"
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
    country_changed() {
      this.resetFieldsToBlank(["city", "state"]);
    }
    resetFieldsToBlank(fieldNames) {
      if (this.dialog) {
        fieldNames.forEach((fieldName) => {
          if (this.dialog.fields_dict[fieldName]) {
            this.dialog.set_value(fieldName, "");
          }
        });
      }
    }
  };
  frappe.ui.form.CustomerQuickEntryForm = frappe.ui.form.ContactQEntry;
})();
//# sourceMappingURL=futilitap.bundle.WEGWFLNW.js.map
