## Frappe Utilities Application

A Placeholder application for commonly attempted or asked about howtos in the forums.

#### Features

So far, the application only changes 3 fields in the **Address** DocType using **Property Setter**, namly:

1.  City - to be a Link field to a list of cities is provided in the **FUA City** DocType.

	- City **Title Field** is set to **City, State Abbreviation** in case of town/city names similarities in different country subdivisions.

2.  State - to be a Link field to a list of states is provided in the **FUA State** DocType.

3.  County - to be a Link field to a list of counties is provided in the **FUA County** DocType.

It also allows the user to search **Address** for a city by name and select it from the list of cities.

#### Installation

```bash
bench get-app --branch main https://github.com/agatho-daemon/futilitap.git

bench --site [site-name] install-app futilitap
```

### NOTES

1.	Since City, County, and State are now Link fields, the Address Template will display the document name instead of the city, county, and state names.

	Therefore, the Jinja Address Template have to be modified to have these fields pulled from the linked documents using the `set` property and `frappe.db.get_value()` function. Notice lines 5 and 8 in the example below:

```jinja
	{{ address_line1 }}<br>
	{% if address_line2 %}{{ address_line2 }}<br>{% endif -%}
	{{ address_line1 }}<br>
	{% if address_line2 %}{{ address_line2 }}<br>{% endif -%}
	{% set city = frappe.db.get_value('FUA City', city, ['city_name']) %}
	{{ city }}<br>
	{% if state %}
	{% set state = frappe.db.get_value('FUA State', state, ['state_name']) %}
	{{ state }}<br>{% endif -%}
	{% if pincode %}{{ pincode }}<br>{% endif -%}
	{{ country }}<br>
	<br>
	{% if phone %}{{ _("Phone") }}: {{ phone }}<br>{% endif -%}
	{% if fax %}{{ _("Fax") }}: {{ fax }}<br>{% endif -%}
	{% if email_id %}{{ _("Email") }}: {{ email_id }}<br>{% endif -%}
```

#### License

cc0-1.0