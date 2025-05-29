import cron from "node-cron";
import { Todo } from "../model/todo.model";

export const scheduleExpiredTodoJob = () => {
  cron.schedule("*/10 * * * * *", async () => {
    const result = await Todo.updateMany(
      { dueDate: { $lt: new Date() }, completed: false },
      { completed: true }
    );
    console.log(`${result.modifiedCount} expired todos marked as completed`);
  });
};
