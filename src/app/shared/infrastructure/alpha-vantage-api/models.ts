import { z } from 'zod';

export const AlphaVantageGetResponseSchema = z.object({
	'Realtime Currency Exchange Rate': z.object({
		'1. From_Currency Code': z.string(), // 'USD';
		'2. From_Currency Name': z.string(), // 'United States Dollar';
		'3. To_Currency Code': z.string(), // 'JPY';
		'4. To_Currency Name': z.string(), // 'Japanese Yen';
		'5. Exchange Rate': z.string(), // '155.32700000';
		'6. Last Refreshed': z.string(), // '2025-01-29 04:41:02';
		'7. Time Zone': z.string(), // 'UTC';
		'8. Bid Price': z.string(), // '155.32010000';
		'9. Ask Price': z.string(), // '155.33000000';
	}),
});

export type AlphaVantageGetResponse = z.infer<
	typeof AlphaVantageGetResponseSchema
>;
