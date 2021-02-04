import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Kind, Category } from 'src/types';

export type RecordDocument = Record & Document;

@Schema()
export class Record {
  @Prop()
  box: string;

  @Prop()
  catalog: string;

  @Prop({
    type: String,
    enum: Object.values(Kind),
  })
  kind: Kind;

  @Prop({
    type: String,
    enum: Object.values(Category),
  })
  category: Category;

  @Prop()
  expirationDate: Date;

  @Prop()
  purchaseDate: Date;

  @Prop()
  value: number;

  @Prop()
  tags: string[];

  @Prop()
  notes: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
