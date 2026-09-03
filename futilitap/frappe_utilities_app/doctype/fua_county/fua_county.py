# Copyright (c) 2023, Ismail Tabtabai and contributors
# For license information, please see license.txt

from frappe.model.document import Document

from futilitap.geography import (
	clean_geographic_value,
	set_geographic_name,
	validate_geographic_uniqueness,
	validate_parent_country,
)


class FUACounty(Document):
	def autoname(self):
		set_geographic_name(self, "county_name", "state", "country")

	def validate(self):
		self.county_name = clean_geographic_value(self.county_name)
		validate_parent_country(self, "state", "FUA State")
		validate_geographic_uniqueness(self, "county_name", "state", "country")
