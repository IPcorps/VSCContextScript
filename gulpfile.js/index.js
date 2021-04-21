
// File extension router

const { watch } = require("gulp");

// Configuration preparation
const wdsOpt = require('./config-wds.js');

exports.watcher = () => {

    // TypeScript -> JavaScript
    if (wdsOpt.ts.use) {
        const ts = require("./ts");
        watch(["app/**/*.ts", "!**/*.d.*"])
            .on('change', ts.change);
    }

};
