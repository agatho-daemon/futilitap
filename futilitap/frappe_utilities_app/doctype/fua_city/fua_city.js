// Copyright (c) 2023, Ismail Tabtabai and contributors
// For license information, please see license.txt

frappe.ui.form.on("FUA City", {
  setup(frm) {
    frm.set_query("state", () => ({
      filters: { country: frm.doc.country || "" },
    }));

    frm.set_query("county", () => ({
      filters: {
        country: frm.doc.country || "",
        ...(frm.doc.state ? { state: frm.doc.state } : {}),
      },
    }));
  },
});
