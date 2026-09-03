# Copyright (c) 2023, Ismail Tabtabai and contributors
# For license information, please see license.txt

from frappe.model.document import Document

from futilitap.geography import (
	clean_geographic_value,
	set_geographic_name,
	validate_geographic_uniqueness,
)


class FUAState(Document):
	def autoname(self):
		set_geographic_name(self, "state_name", "country")

	def validate(self):
		self.state_name = clean_geographic_value(self.state_name)
		validate_geographic_uniqueness(self, "state_name", "country")
