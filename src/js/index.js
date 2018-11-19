import * as Backbone from 'backbone';
import { AppRouter } from "./routes.router.js"
const router = new AppRouter();
Backbone.history.start({ pushState: true });