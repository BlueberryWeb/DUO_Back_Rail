"use strict";
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
exports.uploadFile = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_S3_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_S3_PRIVATE_KEY,
    region: 'us-east-2',
});
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = new Date().getTime();
    const params = {
        Bucket: 'duoapp',
        Key: timestamp + '-' + file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    return s3.upload(params).promise();
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=s3Services.js.map