/**
 * Handles all incoming GET requests to the web API.
 * 
 * @param {object} request - The request object as received from Google Apps Script.
 * @returns {object} - The response object, which is a JSON string containing the requested data.
 */
function doGet(request) {
    try {
        // Create an instance of the routing service to handle the GET request
        const router = new WebAPIRoutingService();
        // Route the request to the appropriate handler function
        const output = router.routeGet(request);
        // Return the response as a JSON string
        return ContentService.createTextOutput(JSON.stringify(output))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (e) {
        // If an error occurs, return an error response in JSON format
        const output = {
            timestamp: Utilities.formatDate(new Date(), 'Etc/GMT', 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\''),
            error: e.message
        }
        // Log the error message to the console
        console.info(e.message);
        return ContentService.createTextOutput(JSON.stringify(output))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
