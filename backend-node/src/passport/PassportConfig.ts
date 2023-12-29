import passport from "passport";
import Strategies from "./Strategies";
import { Application } from "express";
import { container } from "tsyringe";

export class PassportConfig {
    constructor(app: Application) {
        // Initialize Passport and configure strategies
        app.use(passport.initialize());
        app.use(passport.session());

        // Setup Passport strategies
        container.resolve(Strategies);
    }
}
