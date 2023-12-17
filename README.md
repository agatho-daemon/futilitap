## Frappe Utilities Application

A Placeholder application for commonly attempted or asked about howtos in the forums.

#### Features

So far, the application only changes 3 fields in the **Address** DocType using **Property Setter**, namly:

1.  City - to be a Link field to a list of cities is provided in the **FUA City** DocType.

2.  State - to be a Link field to a list of states is provided in the **FUA State** DocType.

3.  County - to be a Link field to a list of counties is provided in the **FUA County** DocType.

It also allows the user to search **Address** for a city by name and select it from the list of cities.

#### Installation

```bash
bench get-app --branch main https://github.com/agatho-daemon/futilitap.git

bench --site [site-name] install-app futilitap
```

#### License

cc0-1.0