import * as yup from 'yup';

import { Kind, Category } from 'src/types';

export const searchRecordsQuerySchema = yup.object().shape({
  boxes: yup.array().of(yup.string()),
  catalogs: yup.array().of(yup.string()),
  kinds: yup.array().of(yup.string().oneOf(Object.values(Kind))),
  categories: yup.array().of(yup.string().oneOf(Object.values(Category))),
  expirationDateFrom: yup.string(),
  expirationDateTo: yup.string(),
  purchaseDateFrom: yup.string(),
  purchaseDateTo: yup.string(),
  valueFrom: yup.number(),
  valueTo: yup.number(),
  search: yup.string(),
});
