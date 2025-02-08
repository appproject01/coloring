/**
 * If in Node environment, loads environment variables from .env file.
 */
if (typeof require !== 'undefined') {
    require('dotenv').config();
}

/**
 * Class to load environment variables in Node or Google Apps Script.
 */
class EnvironmentVariablesService {
    /**
     * Gets the value of the environment variable.
     * @param {string} name The name of the environment variable.
     * @returns {string} The value of the environment variable.
     * @throws {Error} If the environment variable is missing or blank.
     */
    getVariable(name) {
        if (typeof require !== 'undefined') {
            // Node.js environment
            const value = process.env[name];
            if (!value || value.length === 0) {
                throw new Error(`${name} environment variable is missing or blank`);
            }
            return value;
        } else {
            // Google Apps Script environment
            const value = PropertiesService.getScriptProperties().getProperty(name);
            if (!value || value.length === 0) {
                throw new Error(`${name} script property is missing or blank`);
            }
            return value;
        };
    }
}

/**
 * Exports the class in Node environment.
 */
if (typeof module !== 'undefined' && module.exports) { module.exports = EnvironmentVariablesService; }

