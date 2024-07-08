module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTest.js'],
    transform:{
        '^.+\\.jsx?$': 'babel-jest'
    },
    moduleFileExtension:['js','jsx']
};