import { Request, Response } from "express";
import { Todo } from "../model/todo.model";
import moment from "moment";

export const createTodoItem = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.validatedData as {
      title: string;
      description: string;
      dueDate: string;
    };
    const user = req.user;

    const dueDateMoment = moment(dueDate).startOf("day");
    const now = moment().startOf("day");

    if (dueDateMoment.isBefore(now)) {
      return res
        .status(400)
        .json({ message: "please don't enter the past dueDate" });
    }

    const todoItem = {
      title,
      description,
      dueDate: dueDate,
      user: user?.id,
    };
    const createdItem = await Todo.create(todoItem);
    return res.status(200).json({
      message: "Todo item created successfully.",
      createdItem,
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getTodoItems = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const todoItems = await Todo.find({ user: user?.id })
      .skip(skip)
      .limit(limit);
    console.log("Todo items:", todoItems);

    return res.status(200).json({
      message: "Todo items retrieved successfully.",
      todoItems,
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getTodoItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.validatedData as { id: string };
    const user = req.user;

    const item = await Todo.findOne({ id: id, user: user?.id });
    if (!item) {
      return res.status(404).json({ message: "Todo item not found." });
    }

    return res.status(200).json({
      message: "Todo item retrieved successfully.",
      item,
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateTodoItem = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;
    const { id } = req.params;
    const user = req.user;

    if (dueDate) {
      const dueDateMoment = moment(dueDate).startOf("day");
      const now = moment().startOf("day");
      if (dueDateMoment.isBefore(now)) {
        return res
          .status(400)
          .json({ message: "please don't enter the past dueDate" });
      }
    }

    const updatedItem = await Todo.findOneAndUpdate(
      { id: id, user: user?.id },
      { title, description, dueDate: dueDate },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Todo item not found." });
    }

    return res.status(200).json({
      message: "Todo item updated successfully.",
      updatedItem,
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteTodoItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.validatedData as { id: string };
    const user = req.user;

    const deletedItem = await Todo.findOneAndDelete({ id: id, user: user?.id });
    if (!deletedItem) {
      return res.status(404).json({ message: "Todo item not found." });
    }

    return res.status(200).json({
      message: "Todo item deleted successfully.",
      deletedItem,
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
