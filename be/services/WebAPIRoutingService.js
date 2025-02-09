if (typeof require !== 'undefined') {
    JWTService = require('./JWTService');
    FinancialAPIDataService = require('./GoogleDatabaseService');

} else {
    // Assume SupabaseService is defined in the global scope in Google Apps Script 
}

class WebAPIRoutingService {
    /**
     * Routes the GET request to the appropriate handler function.
     * 
     * @param {object} request - The request object as received from Google Apps Script.
     * @returns {object} - The response object, which is a JSON string containing the requested data.
     */
    routeGet(request) {
        const routes = [
            ["drawing", this._getDrawing],
            ["sudoku", this._getSudoku],
            ["image", this._getImage],

            // Add more routes as needed
        ];

        // if (!request.parameter.token || request.parameter.token.length === 0)
        //     throw new Error("token parameter is missing or blank");

        //const authResult = new JWTService().verifyToken(request.parameter.token);

        if (!request.parameter.o || request.parameter.o.length === 0)
            throw new Error("Object parameter o is missing or blank");

        const route = routes.find(route => route[0] === request.parameter.o);
        if (route) {
            return route[1](request);
        } else {
            throw new Error("Unsupported query parameter o: " + request.parameter.o + ". Please use query parameter ?o=" + routes.map(route => route[0]).join("|"));
        }
    }

    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Generates a Sudoku puzzle based on the given parameters.
     * 
     * @param {object} request - The request object as received from Google Apps Script.
     * @returns {object} - The response object, which is a JSON string containing the requested data.
     * @throws {Error} - If the function is not implemented yet.
     */
    /******  90f9fe12-e7b1-4e30-bf39-d483c682baec  *******/
    _getSudoku(request) {
        throw new Error("not implemented");
    }

    /**
     * Fetches the data from the Google Calculator Lite spreadsheet based on the ticker symbol.
     * 
     * @param {object} request - The request object as received from Google Apps Script.
     * @returns {object} - The response object, which is a JSON string containing the requested data.
     */
    _getDrawing(request) {
        const dbService = new GoogleDatabaseService();

        if (request.parameter.id != null) {
            return dbService.getDrawingById(request.parameter.id);
        } else {
            let bookParam = request.parameter.book || "";
            let queryParam = request.parameter.query || "";
            let offsetParam = request.parameter.offset || 0;
            let limitParam = request.parameter.limit || 20;
            return dbService.findDrawing(queryParam, bookParam, offsetParam, limitParam);
        }
    }


    _getImage(request) {

        if (!request.parameter.id || request.parameter.id.length === 0)
            throw new Error("Image id parameter is missing or blank");

        const dbService = new GoogleDatabaseService();
        return dbService.getImageById(request.parameter.id);

    }

}

if (typeof module !== 'undefined' && module.exports) { module.exports = WebAPIRoutingService; }