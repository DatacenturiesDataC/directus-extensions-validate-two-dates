# Directus Extension: Validate Two Dates

A simple Directus extension that validates two date fields, ensuring the second date is greater than the first.

## Installation

1. Clone this repository:

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

The extension will automatically validate the dates when:

- Creating new items
- Updating existing items

If the second date is not greater than the first date, the operation will be rejected with the configured error message.
