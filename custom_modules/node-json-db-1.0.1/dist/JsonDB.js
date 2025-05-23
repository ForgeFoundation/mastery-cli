"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./lib/Utils");
const FS = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const Errors_1 = require("./lib/Errors");
const DBParentData_1 = require("./lib/DBParentData");
const ArrayInfo_1 = require("./lib/ArrayInfo");
const JsonDBConfig_1 = require("./lib/JsonDBConfig");
var JsonDBConfig_2 = require("./lib/JsonDBConfig");
exports.Config = JsonDBConfig_2.Config;
class JsonDB {
    /**
     * JSONDB Constructor
     * @param filename where to save the "DB". Can also be used to give the whole configuration
     * @param saveOnPush save the database at each push command into the json file
     * @param humanReadable the JSON file will be readable easily by a human
     * @param separator what to use as separator
     */
    constructor(filename, saveOnPush = true, humanReadable = false, separator = '/') {
        this.loaded = false;
        this.data = {};
        if (filename instanceof JsonDBConfig_1.Config) {
            this.config = filename;
        }
        else {
            this.config = new JsonDBConfig_1.Config(filename, saveOnPush, humanReadable, separator);
        }
        if (!FS.existsSync(this.config.filename)) {
            const dirname = path.dirname(this.config.filename);
            mkdirp.sync(dirname);
            this.save(true);
            this.loaded = true;
        }
    }
    /**
     * Process datapath into different parts
     * @param dataPath
     */
    processDataPath(dataPath) {
        if (dataPath === undefined || !dataPath.trim()) {
            throw new Errors_1.DataError("The Data Path can't be empty", 6);
        }
        if (dataPath == this.config.separator) {
            return [];
        }
        dataPath = Utils_1.removeTrailingChar(dataPath, this.config.separator);
        const path = dataPath.split(this.config.separator);
        path.shift();
        return path;
    }
    retrieveData(dataPath, create = false) {
        this.load();
        const thisDb = this;
        const recursiveProcessDataPath = (data, index) => {
            let property = dataPath[index];
            /**
             * Find the wanted Data or create it.
             */
            function findData(isArray = false) {
                if (data.hasOwnProperty(property)) {
                    data = data[property];
                }
                else if (create) {
                    if (isArray) {
                        data[property] = [];
                    }
                    else {
                        data[property] = {};
                    }
                    data = data[property];
                }
                else {
                    throw new Errors_1.DataError(`Can't find dataPath: ${thisDb.config.separator}${dataPath.join(thisDb.config.separator)}. Stopped at ${property}`, 5);
                }
            }
            const arrayInfo = ArrayInfo_1.ArrayInfo.processArray(property);
            if (arrayInfo) {
                property = arrayInfo.property;
                findData(true);
                if (!Array.isArray(data)) {
                    throw new Errors_1.DataError(`DataPath: ${thisDb.config.separator}${dataPath.join(thisDb.config.separator)}. ${property} is not an array.`, 11);
                }
                const arrayIndex = arrayInfo.getIndex(data, true);
                if (!arrayInfo.append && data.hasOwnProperty(arrayIndex)) {
                    data = data[arrayIndex];
                }
                else if (create) {
                    if (arrayInfo.append) {
                        data.push({});
                        data = data[data.length - 1];
                    }
                    else {
                        data[arrayIndex] = {};
                        data = data[arrayIndex];
                    }
                }
                else {
                    throw new Errors_1.DataError(`DataPath: ${thisDb.config.separator}${dataPath.join(thisDb.config.separator)}. . Can't find index ${arrayInfo.index} in array ${property}`, 10);
                }
            }
            else {
                findData();
            }
            if (dataPath.length == ++index) {
                return data;
            }
            return recursiveProcessDataPath(data, index);
        };
        if (dataPath.length === 0) {
            return this.data;
        }
        return recursiveProcessDataPath(this.data, 0);
    }
    getParentData(dataPath, create) {
        const path = this.processDataPath(dataPath);
        const last = path.pop();
        return new DBParentData_1.DBParentData(this.retrieveData(path, create), this, dataPath, last);
    }
    /**
     * Get the wanted data
     * @param dataPath
     */
    getData(dataPath) {
        const path = this.processDataPath(dataPath);
        return this.retrieveData(path, false);
    }
    /**
     * Check for existing datapath
     * @param dataPath
     */
    exists(dataPath) {
        try {
            this.getData(dataPath);
            return true;
        }
        catch (e) {
            if (e instanceof Errors_1.DataError) {
                return false;
            }
            throw e;
        }
    }
    /**
     * Find all specific entry in an array/object
     * @param rootPath base dataPath from where to start searching
     * @param callback method to filter the result and find the wanted entry. Receive the entry and it's index.
     */
    filter(rootPath, callback) {
        const result = this.getData(rootPath);
        if (Array.isArray(result)) {
            return result.filter(callback);
        }
        if (result instanceof Object) {
            const entries = Object.entries(result);
            const found = entries.filter((entry) => {
                return callback(entry[1], entry[0]);
            });
            if (!found || found.length < 1) {
                return undefined;
            }
            return found.map((entry) => {
                return entry[1];
            });
        }
        throw new Errors_1.DataError("The entry at the path (" + rootPath + ") needs to be either an Object or an Array", 12);
    }
    /**
     * Find a specific entry in an array/object
     * @param rootPath base dataPath from where to start searching
     * @param callback method to filter the result and find the wanted entry. Receive the entry and it's index.
     */
    find(rootPath, callback) {
        const result = this.getData(rootPath);
        if (Array.isArray(result)) {
            return result.find(callback);
        }
        if (result instanceof Object) {
            const entries = Object.entries(result);
            const found = entries.find((entry) => {
                return callback(entry[1], entry[0]);
            });
            if (!found || found.length < 2) {
                return undefined;
            }
            return found[1];
        }
        throw new Errors_1.DataError("The entry at the path (" + rootPath + ") needs to be either an Object or an Array", 12);
    }
    /**
     * Pushing data into the database
     * @param dataPath path leading to the data
     * @param data data to push
     * @param override overriding or not the data, if not, it will merge them
     */
    push(dataPath, data, override = true) {
        const dbData = this.getParentData(dataPath, true);
        if (!dbData) {
            throw new Error("Data not found");
        }
        let toSet = data;
        if (!override) {
            if (Array.isArray(data)) {
                let storedData = dbData.getData();
                if (storedData === undefined) {
                    storedData = [];
                }
                else if (!Array.isArray(storedData)) {
                    throw new Errors_1.DataError("Can't merge another type of data with an Array", 3);
                }
                toSet = storedData.concat(data);
            }
            else if (data === Object(data)) {
                if (Array.isArray(dbData.getData())) {
                    throw new Errors_1.DataError("Can't merge an Array with an Object", 4);
                }
                toSet = Utils_1.merge(dbData.getData(), data);
            }
        }
        dbData.setData(toSet);
        if (this.config.saveOnPush) {
            this.save();
        }
    }
    /**
     * Delete the data
     * @param dataPath path leading to the data
     */
    delete(dataPath) {
        const dbData = this.getParentData(dataPath, true);
        if (!dbData) {
            return;
        }
        dbData.delete();
        if (this.config.saveOnPush) {
            this.save();
        }
    }
    /**
     * Only use this if you know what you're doing.
     * It reset the full data of the database.
     * @param data
     */
    resetData(data) {
        this.data = data;
    }
    /**
     * Reload the database from the file
     */
    reload() {
        this.loaded = false;
        this.load();
    }
    ;
    /**
     * Manually load the database
     * It is automatically called when the first getData is done
     */
    load() {
        if (this.loaded) {
            return;
        }
        try {
            const data = FS.readFileSync(this.config.filename, 'utf8');
            this.data = JSON.parse(data);
            this.loaded = true;
        }
        catch (err) {
            const error = new Errors_1.DatabaseError("Can't Load Database", 1, err);
            throw error;
        }
    }
    /**
     * Manually save the database
     * By default you can't save the database if it's not loaded
     * @param force force the save of the database
     */
    save(force) {
        force = force || false;
        if (!force && !this.loaded) {
            throw new Errors_1.DatabaseError("DataBase not loaded. Can't write", 7);
        }
        let data = "";
        try {
            if (this.config.humanReadable) {
                data = JSON.stringify(this.data, null, 4);
            }
            else {
                data = JSON.stringify(this.data);
            }
            FS.writeFileSync(this.config.filename, data, 'utf8');
        }
        catch (err) {
            const error = new Errors_1.DatabaseError("Can't save the database", 2, err);
            throw error;
        }
    }
}
exports.JsonDB = JsonDB;
//# sourceMappingURL=JsonDB.js.map