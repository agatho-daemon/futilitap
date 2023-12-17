(() => {
  // ../futilitap/futilitap/public/js/address_query_filters.js
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
})();
//# sourceMappingURL=futilitap.bundle.46ZKN4K6.js.map
