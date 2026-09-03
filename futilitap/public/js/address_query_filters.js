// Country-aware query filters for the standard Address DocType.

frappe.provide("frappe.ui.form");

function set_geography_queries(frm) {
  const geography_doctypes = {
    city: "FUA City",
    county: "FUA County",
    state: "FUA State",
  };

  Object.entries(geography_doctypes).forEach(([fieldname, doctype]) => {
    frm.set_query(fieldname, () => ({
      filters: { country: frm.doc.country || "" },
    }));

    // Property Setters normally supply this; retaining it here makes the
    // client behavior safe while fixtures are being synchronized.
    if (frm.fields_dict[fieldname]?.df) {
      frm.fields_dict[fieldname].df.options = doctype;
    }
  });
}

frappe.ui.form.on("Address", {
  setup(frm) {
    set_geography_queries(frm);
  },

  refresh(frm) {
    set_geography_queries(frm);
  },

  async country(frm) {
    set_geography_queries(frm);

    const values = { city: "", county: "", state: "" };
    if (!frm.doc.country) {
      values.pincode = "";
    }
    await frappe.model.set_value(frm.doctype, frm.docname, values);
  },

  async city(frm) {
    if (!frm.doc.city) {
      await frappe.model.set_value(frm.doctype, frm.docname, {
        county: "",
        state: "",
      });
      return;
    }

    try {
      const { message } = await frappe.db.get_value("FUA City", frm.doc.city, [
        "country",
        "county",
        "state",
      ]);

      if (!message) {
        frappe.msgprint(
          __("Geographic details were not found for city {0}.", [frm.doc.city])
        );
        return;
      }

      if (
        message.country &&
        frm.doc.country &&
        message.country !== frm.doc.country
      ) {
        frappe.msgprint(
          __("City {0} does not belong to the selected country.", [
            frm.doc.city,
          ])
        );
        await frm.set_value("city", "");
        return;
      }

      await frappe.model.set_value(frm.doctype, frm.docname, {
        county: message.county || "",
        state: message.state || "",
      });
    } catch (error) {
      console.error("Unable to load FUA City geographic details", error);
      frappe.msgprint(
        __("Unable to load geographic details for the selected city.")
      );
    }
  },
});
