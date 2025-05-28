import { Router } from "express";
import { createTodoItem, deleteTodoItem, getTodoItemById, getTodoItems, updateTodoItem } from "../controller/todo";
import { authMiddleware } from "../middleware/is-Auth";
import { createTodoSchema, todoIdParamSchema } from "../validators/todo.validator";
import { validateRequest } from "../middleware/requestValidator";

const router = Router();

router.post("/", authMiddleware, validateRequest(createTodoSchema), createTodoItem);
router.get("/", authMiddleware, getTodoItems);
router.get("/:id", authMiddleware, validateRequest(todoIdParamSchema), getTodoItemById);
router.put("/:id", authMiddleware,  updateTodoItem);
router.delete("/:id", authMiddleware, validateRequest(todoIdParamSchema), deleteTodoItem);

export default router;
