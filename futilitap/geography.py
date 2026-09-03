import re

import frappe
from frappe import _

_WHITESPACE = re.compile(r"\s+")
_SCOPE_TITLES = {
	"county": ("FUA County", "county_name"),
	"state": ("FUA State", "state_name"),
}
_MAX_NAME_LENGTH = 140


def clean_geographic_value(value):
	return _WHITESPACE.sub(" ", value or "").strip()


def get_scope_title(fieldname, value):
	if not value:
		return ""
	if fieldname not in _SCOPE_TITLES:
		return clean_geographic_value(value)

	doctype, title_field = _SCOPE_TITLES[fieldname]
	return clean_geographic_value(frappe.db.get_value(doctype, value, title_field) or value)


def make_geographic_name(doc, label_field, *scope_fields):
	"""Use the plain label unless it is taken, then add readable geographic scope."""
	label = clean_geographic_value(doc.get(label_field))
	if not frappe.db.exists(doc.doctype, label):
		return label

	scope = [get_scope_title(fieldname, doc.get(fieldname)) for fieldname in scope_fields]
	composite = "-".join(part for part in (label, *scope) if part)
	if len(composite) > _MAX_NAME_LENGTH:
		frappe.throw(
			_("The composed document ID {0} exceeds {1} characters.").format(
				frappe.bold(composite), _MAX_NAME_LENGTH
			)
		)

	candidate = composite
	sequence = 2
	while frappe.db.exists(doc.doctype, candidate):
		suffix = f"-{sequence}"
		candidate = f"{composite[: _MAX_NAME_LENGTH - len(suffix)]}{suffix}"
		sequence += 1
	return candidate


def set_geographic_name(doc, label_field, *scope_fields):
	label = clean_geographic_value(doc.get(label_field))
	doc.set(label_field, label)
	doc.name = make_geographic_name(doc, label_field, *scope_fields)


def validate_geographic_uniqueness(doc, label_field, *scope_fields):
	expected_scope = tuple(doc.get(fieldname) or "" for fieldname in scope_fields)
	candidates = frappe.get_all(
		doc.doctype,
		filters={label_field: doc.get(label_field), "name": ["!=", doc.name]},
		fields=["name", *scope_fields],
		limit_page_length=0,
	)
	duplicate = next(
		(
			record.name
			for record in candidates
			if tuple(record.get(fieldname) or "" for fieldname in scope_fields) == expected_scope
		),
		None,
	)
	if duplicate:
		frappe.throw(
			_("A {0} named {1} already exists in the same geographic scope.").format(
				_(doc.doctype), frappe.bold(doc.get(label_field))
			)
		)


def validate_parent_country(doc, parent_field, parent_doctype):
	parent = doc.get(parent_field)
	if not parent:
		return

	parent_country = frappe.db.get_value(parent_doctype, parent, "country")
	if parent_country and doc.country != parent_country:
		frappe.throw(
			_("{0} belongs to country {1}, not {2}.").format(
				frappe.bold(parent),
				frappe.bold(parent_country),
				frappe.bold(doc.country),
			)
		)
