import { collection, firstDateField, secondDateField, errorMessage } from './config.js';

export default ({ filter }, { logger }) => {
	const validateDates = async (payload, meta, context) => {
		try {
			// Skip if not the target collection
			if (meta.collection !== collection) return;

			// Skip if no dates in payload
			if (!payload[firstDateField] && !payload[secondDateField]) return;

			let firstDate = payload[firstDateField] ?? null;
			let secondDate = payload[secondDateField] ?? null;

			// For update events, fetch missing date from database
			if (meta.event === 'items.update' && (!firstDate || !secondDate)) {
				const fieldToFetch = !firstDate ? firstDateField : secondDateField;
				const existingItem = await context.database
					.select(fieldToFetch)
					.from(meta.collection)
					.where({ id: meta.keys[0] })
					.first();

				if (!existingItem) return;

				if (!firstDate) {
					firstDate = existingItem[firstDateField];
				} else {
					secondDate = existingItem[secondDateField];
				}
			}

			// Validate dates if both are present
			if (firstDate && secondDate) {
				const departure = new Date(firstDate);
				const expectedDelivery = new Date(secondDate);

				if (isNaN(departure.getTime()) || isNaN(expectedDelivery.getTime())) {
					throw new Error('Invalid date format provided');
				}

				if (expectedDelivery <= departure) {
					throw new Error(errorMessage);
				}
			}
		} catch (error) {
			logger.error(`Date validation error: ${error.message}`);
			throw error;
		}
	};

	filter('items.create', validateDates);
	filter('items.update', validateDates);
};
