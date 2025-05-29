import { Router } from "express";
import { createTodoItem, deleteTodoItem, getTodoItemById, getTodoItems, updateTodoItem } from "../controller/todo";
import { authMiddleware } from "../middleware/is-Auth";
import { createTodoSchema, updateTodoSchema } from "../validators/todo.validator";
import { validateRequest } from "../middleware/requestValidator";

const router = Router();

router.post("/", authMiddleware, validateRequest(createTodoSchema), createTodoItem);
router.get("/", authMiddleware, getTodoItems);
router.get("/:todoId", authMiddleware, validateRequest(updateTodoSchema), getTodoItemById);
router.put("/:todoId", authMiddleware, validateRequest(updateTodoSchema), updateTodoItem);
router.delete("/:todoId", authMiddleware, validateRequest(updateTodoSchema), deleteTodoItem);

export default router;
