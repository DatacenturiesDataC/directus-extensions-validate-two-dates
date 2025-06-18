# Directus Extension: Validate Two Dates

A Directus extension that validates that a second date field is greater than a first date field. This is particularly useful for scenarios like validating departure and arrival dates, start and end dates, etc.

## Features

- Validates that the second date is greater than the first date
- Works with both create and update operations
- Configurable collection and field names
- Customizable error messages
- Handles partial updates by fetching missing dates from the database

## Installation

1. Install the extension:

```bash
git clone https://github.com/yourusername/directus-extension-validate-two-dates.git
cd directus-extension-validate-two-dates
```

2. Install dependencies:

```bash
npm install
```

3. Configure the extension by editing `src/config.js`:

```js
export const collection = "your_collection"; // The collection to validate
export const firstDateField = "start_date"; // First date field name
export const secondDateField = "end_date"; // Second date field name
export const errorMessage = '"End Date" must be greater than "Start Date"'; // Custom error message
```

4. Build the extension:

```bash
npm run build
```

## Usage

Once installed and configured, the extension will automatically validate dates when:

- Creating new items
- Updating existing items

The validation ensures that the second date is always greater than the first date.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
