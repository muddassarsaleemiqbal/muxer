"use server";

import prisma from "@/lib/db";
import { ActionError, authenticatedAction } from "@/lib/safe-action";
import {
  CreateProjectSchema,
  DeleteProjectSchema,
  UpdateProjectSchema,
} from "@/schemas/projects";

const createProject = authenticatedAction(
  CreateProjectSchema,
  async (data, userId) => {
    await prisma.project.create({
      data: {
        name: data.name,
        userId,
      },
    });

    return "Project created successfully";
  }
);

const updateProject = authenticatedAction(
  UpdateProjectSchema,
  async (data, userId) => {
    const project = await prisma.project.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!project) {
      throw new ActionError("Project not found", 404);
    }

    if (project.userId !== userId) {
      throw new ActionError("Unauthorized", 401);
    }

    await prisma.project.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });

    return "Project updated successfully";
  }
);

const deleteProject = authenticatedAction(
  DeleteProjectSchema,
  async (data, userId) => {
    const project = await prisma.project.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!project) {
      throw new ActionError("Project not found", 404);
    }

    if (project.userId !== userId) {
      throw new ActionError("Unauthorized", 401);
    }

    await prisma.project.delete({
      where: {
        id: data.id,
      },
    });

    return "Project deleted successfully";
  }
);

export { createProject, updateProject, deleteProject };
