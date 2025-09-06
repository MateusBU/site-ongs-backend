var validator = require('validator');

module.exports = app =>{

    function existsOrError(value, msg){
        if(!value) throw msg;
        if(Array.isArray(value) && (value.length == 0)) throw msg;
        if((typeof value === 'string') && !value.trim()) throw msg;
    }

    function notExistsOrError(value, msg){
        try{
            existsOrError(value, msg);
        }
        catch(msg){
            return;
        }
        throw msg;
    }    

    function equalsOrError(value1, value2, msg){
        if(value1 !== value2) throw msg;
    }

    function notEqualsOrError(value1, value2, msg){
        if(value1 == value2) throw msg;
    }

    /*-----Specific for email-----*/
    function isEmailOrError(value, msg){
        if(!validator.isEmail(value)) throw msg;
    }

    /*-----Specific for Password-----*/
    function passwordContainsCharacOrError(value, msg){
        if(value.length < 8) throw msg;
        //TODO para os testes, vou fazer mais simples
        // if(!containUpper(value)) throw msg;
        // if(!containLower(value)) throw msg;
        // if(!containNumber(value)) throw msg;
        // if(!containSpecialCharacter(value)) throw msg;
    }

    function containUpper(value){
        return /[A-Z]/.test(value);
    }

    function containLower(value){
        return /[a-z]/.test(value);
    }

    function containNumber(value){
        return /[0-9]/.test(value);
    }

    function containSpecialCharacter(value){
        return /[^A-Za-z0-9]/.test(value);
    }

    function isSmallerThanOrError(value, maxLength, msg){
        if(value.length > maxLength) throw msg;
    }
    
    return {existsOrError, notExistsOrError, equalsOrError, 
        notEqualsOrError, passwordContainsCharacOrError,
        isSmallerThanOrError, isEmailOrError
    }
}