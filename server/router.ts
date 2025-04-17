// import external dependencies
import { Router } from 'express';

// import internal dependencies
import controllers from '@server/controllers';

////////////////////////////////////////////////////////////////////////////////////////////////////

const router: Router = Router();

// root
router.get('/', controllers.root.index);

// customers
router.get('/customers', controllers.customers.getAll);
router.get('/customers/:id', controllers.customers.getOne);

////////////////////////////////////////////////////////////////////////////////////////////////////

export default router;
