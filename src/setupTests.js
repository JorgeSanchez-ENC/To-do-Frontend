import '@testing-library/jest-dom/extended-expect';

window.matchMedia = window.matchMedia || function(){
    return{
        matches:false,
        addListener: function(){},
        removeListener: function(){}
    };
};