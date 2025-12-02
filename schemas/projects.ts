import { type } from "arktype";

const CreateProjectSchema = type({
  name: "string",
  createdBy: "string",
});

type CreateProject = typeof CreateProjectSchema.infer;

const UpdateProjectSchema = type({
  id: "string",
  name: "string",
});

type UpdateProject = typeof UpdateProjectSchema.infer;

const DeleteProjectSchema = type({
  id: "string",
});

type DeleteProject = typeof DeleteProjectSchema.infer;

export {
  type CreateProject,
  type UpdateProject,
  type DeleteProject,
  CreateProjectSchema,
  UpdateProjectSchema,
  DeleteProjectSchema,
};
