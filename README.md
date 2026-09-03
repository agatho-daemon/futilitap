## Frappe Utilities Application

Futilitap provides reusable, country-neutral geographic master data for Frappe and ERPNext v16.

### Geographic masters

- **FUA City** stores cities and towns, with optional county/district, state/province/region,
  ERPNext Territory, abbreviation, and Country links.
- **FUA State** stores first-level administrative regions such as states, provinces,
  governorates, regions, and territories.
- **FUA County** stores optional county, district, or equivalent subdivisions.

The `FUA` prefix is retained to keep the DocType names unique across installed Frappe apps.
Labels remain generic so each site can enter the geographic hierarchy used by its countries.
Existing document IDs remain unchanged. New records use the plain geographic name as their ID
when it is available. Only a conflicting name receives a readable parent suffix, such as
`Springfield-Illinois-United States`. Links continue to display the familiar geographic name.

### Address integration

Property Setters change the standard Address `city`, `county`, and `state` fields into links to
the corresponding FUA masters. Address queries are filtered by Country, and selecting a city
fills its configured county/district and state/province/region.

Futilitap does not replace ERPNext's native Customer Quick Entry form. Regional presentation
and address-entry behavior belongs in regional applications such as `erpnext_kwt`.

### Requirements

- Frappe 16
- ERPNext 16
- Python 3.14

### Installation

```bash
bench get-app --branch main https://github.com/agatho-daemon/futilitap.git
bench --site [site-name] install-app futilitap
```

### License

CC0-1.0
