# How to run the app

- Open a new terminal and install dependencies by executing: `pnpm i`, prior to that if pnpm is not installed run `npm install -g pnpm`
- Run app by executing this command: `pnpm start`
- Run server by executing this command: `pnpm run json-server`
- If everything was setup correctly, you can verify app running locally by typing in the browser: http://localhost:3000

## How might you make this app more secure?
* Authentication and Authorization: Implement user authentication (OAuth or JWT) to ensure only authorized users access certain sections. Role-based access control can restrict who can create, update, or delete job sites and items.
* Input Sanitization: Ensures that any special characters or unwanted HTML/SQL content are removed from the input.
* Data Encryption: Use HTTPS and ensure that sensitive information, such as user credentials or any other sensitive data, is encrypted in transit. 
* Error Handling: Avoid exposing sensitive error messages to the client side. Log detailed errors server-side and show generic messages to users.
* Regular Security Audits: Use tools like npm audit to find vulnerabilities in dependencies to enforce secure coding practices.

## How would you make this solution scale to millions of records?
* Pagination: Implement pagination or infinite scroll for jobs or items list to load data in smaller chunks, reducing initial load times and memory usage.
* Efficient Data Storage: Use a scalable database solution with optimized indexes for frequent search fields. Using indexes on job site names, categories, and item fields can help in quick retrieval.
* Caching: React Query can be used as it caches data by default, reducing the need to re-fetch data unless necessary. It also supports background refetching to keep data up-to-date without requiring a full page reload.
