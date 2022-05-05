import express from 'express';
import { PORT } from './environments/PORT';
import { productRoute } from './route/products-route';
import { categoryRoute } from './route/category-route';
import { saleRoute } from './route/sale-route';
import { clientRoute } from './route/client-route';
import { shoppingCartRoute } from './route/shopping-cart-route';
import { deliveryDataRoute } from './route/delivery-data-route';
import { paymentDataRoute } from './route/payment-data-route';
import { loginRoute } from './route/login-route';
import { userRoute } from './route/user-route';
import cors from 'cors';
import { deliveryRoute } from './route/delivery-route';
require('dotenv').config();

const app = express();

export class ApplicationEnterPoint{
    async onInit(){
        app.use(express.json());
        app.use(cors({origin : "*"}));
        app.use("/products" , productRoute.initRoutes());
        app.use("/category" , categoryRoute.initRoutes());
        app.use("/paymentData" , paymentDataRoute.initRoutes());
        app.use("/shoppingCart" , shoppingCartRoute.initRoutes());
        app.use("/deliveryData" , deliveryDataRoute.initRoutes());
        app.use("/sale" , saleRoute.initRoutes());
        app.use("/authenticate" , loginRoute.initRoutes());
        app.use("/user" , userRoute.initRoutes());
        app.use("/client" , clientRoute.initRoutes());
        app.use("/delivery" , deliveryRoute.initRoutes());
        app.use("/shoppingCart" , saleRoute.initRoutes());

        app.listen(PORT , ()=>console.log(`[APP] - APPLICATION STARTED ON PORT ${PORT}`));
    }
}

const applicationEnterPoint = new ApplicationEnterPoint();

applicationEnterPoint.onInit();