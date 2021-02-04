import * as yup from 'yup';

import { Kind, Category } from 'src/types';

export const updateRecordPayloadSchema = yup.object().shape({
  catalog: yup.string().required(),
  kind: yup.string().oneOf(Object.values(Kind)).required(),
  category: yup.string().oneOf(Object.values(Category)).required(),
  expirationDate: yup.string(),
  purchaseDate: yup.string(),
  value: yup.number(),
  tags: yup.array().of(yup.string()),
  notes: yup.string(),
});
