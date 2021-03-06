"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectionMySQL_1 = __importDefault(require("../bin/connectionMySQL"));
const query = (query, variables = []) => {
    return new Promise((resolve, reject) => {
        connectionMySQL_1.default.query(query, variables, (error, result) => {
            if (error) {
                return reject(error);
            }
            else {
                return resolve(result);
            }
        });
    });
};
exports.default = query;
