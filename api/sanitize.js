const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const purify = DOMPurify(window);

/**
 * Sanitizes all string fields of an object by applying DOMPurify and trim()
 * @param {Object} obj - Object containing data to sanitize (e.g., user)
 * @returns {Object} - New object with sanitized fields
 */
module.exports = app =>{

    function sanitizeObject(obj){
        const sanitized = {};
        
        for(const key in obj){
            const value = obj[key];
            
            if(typeof value === 'string'){
                sanitized[key] = purify.sanitize(value).trim();
            }
            else{
                sanitized[key] = value;
            }
        }
        return sanitized;
    }

    return {sanitizeObject};
}