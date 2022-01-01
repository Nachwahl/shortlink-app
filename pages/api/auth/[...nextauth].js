"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var next_auth_1 = require("next-auth");
var prisma_adapter_1 = require("@next-auth/prisma-adapter");
var github_1 = require("next-auth/providers/github");
var email_1 = require("next-auth/providers/email");
var prisma_1 = require("../../../lib/prisma");
var authHandler = function (req, res) { return (0, next_auth_1.default)(req, res, options); };
exports.default = authHandler;
var options = {
    providers: [
        (0, github_1.default)({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        (0, email_1.default)({
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            from: process.env.SMTP_FROM,
        }),
    ],
    adapter: (0, prisma_adapter_1.PrismaAdapter)(prisma_1.default),
};
