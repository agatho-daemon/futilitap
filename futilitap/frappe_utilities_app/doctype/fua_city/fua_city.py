# Copyright (c) 2023, Ismail Tabtabai and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document

from futilitap.geography import (
	clean_geographic_value,
	set_geographic_name,
	validate_geographic_uniqueness,
	validate_parent_country,
)


class FUACity(Document):
	def autoname(self):
		set_geographic_name(self, "city_name", "county", "state", "country")

	def validate(self):
		self.city_name = clean_geographic_value(self.city_name)
		validate_parent_country(self, "state", "FUA State")
		validate_parent_country(self, "county", "FUA County")
		validate_geographic_uniqueness(self, "city_name", "county", "state", "country")

		if self.county and self.state:
			county_state = frappe.db.get_value("FUA County", self.county, "state")
			if county_state and county_state != self.state:
				frappe.throw(
					_("{0} belongs to region {1}, not {2}.").format(
						frappe.bold(self.county),
						frappe.bold(county_state),
						frappe.bold(self.state),
					)
				)
