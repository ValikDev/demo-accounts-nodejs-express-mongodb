import { ObjectId } from 'mongodb';
import z from 'zod';

export const BaseModelSchema = z.object({
  _id: z.instanceof(ObjectId), // For simplicity, using ObjectId directly
  createdAt: z.date(),
  updatedAt: z.date().optional()
});
