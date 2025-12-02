import { type } from "arktype";
import { getSession } from "@/actions/auth";

type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
};

export class ActionError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const authenticatedAction =
  <T, R>(
    schema: type.Any<T>,
    handler: (data: T, userId: string) => Promise<R>
  ) =>
  async (input: T): Promise<ActionResponse<R>> => {
    try {
      const session = await getSession();

      if (!session) {
        return {
          success: false,
          error: "Unauthorized",
          statusCode: 401,
        };
      }

      const validated = schema(input);

      if (validated instanceof type.errors) {
        return {
          success: false,
          error: `Validation failed: ${validated.summary}`,
          statusCode: 422,
        };
      }

      try {
        const result = await handler(validated as T, session.user.id);
        return {
          success: true,
          data: result,
        };
      } catch (error) {
        if (error instanceof ActionError) {
          return {
            success: false,
            error: error.message,
            statusCode: error.statusCode,
          };
        }
        console.error("Action error:", error);
        return {
          success: false,
          error: "Internal server error",
          statusCode: 500,
        };
      }
    } catch (error) {
      console.error("System error:", error);
      return {
        success: false,
        error: "Internal server error",
        statusCode: 500,
      };
    }
  };
