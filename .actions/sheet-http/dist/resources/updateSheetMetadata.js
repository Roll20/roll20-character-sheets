"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMetadata = void 0;
const github = __importStar(require("@actions/github"));
const path = __importStar(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const axios_1 = __importDefault(require("axios"));
const urls = {
    "master": [
        "https://sheet-http.csc.roll20teams.net",
        "https://sheet-http.production.roll20preflight.net",
    ],
    "staging": [
        "https://sheet-http.staging.roll20preflight.net",
    ],
    "tavern": [
        "https://sheet-http.csc.roll20teams.net",
    ],
};
const updateMetadata = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const { repo } = github.context.repo;
    const branch = github.context.ref.split('/')[2];
    const folder = file.split('/')[0];
    const filePath = path.join(process.env['GITHUB_WORKSPACE'], file);
    const jsonFile = yield promises_1.default.readFile(filePath, { encoding: 'utf-8' });
    // For now, just send the tags to reduce the chance of bad requests
    const data = {
        tags: JSON.parse(jsonFile).tags || '',
    };
    for (const url of urls[branch]) {
        try {
            axios_1.default.post(`${url}/update_metadata`, {
                path: folder,
                repo,
                data,
            }, {
                headers: {
                    "Tavern-Token": "c2s17N0oeqMU5Zk8DfgPOkmvYGL0DW2cB0yfzUJk4bm44NTebOITvb8y69g1GUGH"
                }
            });
        }
        catch (e) {
            console.error('There was an error trying to update ', url);
            console.error(e);
        }
    }
});
exports.updateMetadata = updateMetadata;
//# sourceMappingURL=updateSheetMetadata.js.map