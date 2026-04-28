import { fetchMenuItemById } from '../service/menuService.js';

export async function authorizeOwnership(req, res, next) {
  const id = parseInt(req.params.id);
  const menuItem = await fetchMenuItemById(id);
  if (menuItem.userId !== req.user.id) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}
