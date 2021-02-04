import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { Record, RecordDocument } from './schemas/record.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Record.name)
    private readonly RecordModel: Model<RecordDocument>,
  ) {}

  async searchRecords(query) {
    console.log(query);

    const {
      boxes,
      catalogs,
      kinds,
      categories,
      expirationDateFrom,
      expirationDateTo,
      purchaseDateFrom,
      purchaseDateTo,
      valueFrom,
      valueTo,
      search,
    } = query;

    const dbQuery = {};

    if (boxes) {
      Object.assign(dbQuery, {
        box: { $in: boxes },
      });
    }

    if (catalogs) {
      Object.assign(dbQuery, {
        catalog: { $in: catalogs },
      });
    }

    if (kinds) {
      Object.assign(dbQuery, {
        kind: { $in: kinds },
      });
    }

    if (categories) {
      Object.assign(dbQuery, {
        category: { $in: categories },
      });
    }

    if (expirationDateFrom && expirationDateTo) {
      Object.assign(dbQuery, {
        expirationDate: {
          $gt: new Date(expirationDateFrom),
          $lt: new Date(expirationDateTo),
        },
      });
    } else if (expirationDateFrom) {
      Object.assign(dbQuery, {
        expirationDate: {
          $gt: new Date(expirationDateFrom),
        },
      });
    } else if (expirationDateTo) {
      Object.assign(dbQuery, {
        expirationDate: {
          $lt: new Date(expirationDateTo),
        },
      });
    }

    if (purchaseDateFrom && purchaseDateTo) {
      Object.assign(dbQuery, {
        purchaseDate: {
          $gt: new Date(purchaseDateFrom),
          $lt: new Date(purchaseDateTo),
        },
      });
    } else if (purchaseDateFrom) {
      Object.assign(dbQuery, {
        purchaseDate: {
          $gt: new Date(purchaseDateFrom),
        },
      });
    } else if (purchaseDateTo) {
      Object.assign(dbQuery, {
        purchaseDate: {
          $lt: new Date(purchaseDateTo),
        },
      });
    }

    if (valueFrom || valueTo) {
      Object.assign(dbQuery, {
        value: {
          $gt: valueFrom,
          $lt: valueTo,
        },
      });
    } else if (valueFrom) {
      Object.assign(dbQuery, {
        value: {
          $gt: valueFrom,
        },
      });
    } else if (valueTo) {
      Object.assign(dbQuery, {
        value: {
          $lt: valueTo,
        },
      });
    }

    if (search) {
      Object.assign(dbQuery, {
        $or: [
          { tags: { $in: [search] } },
          {
            notes: { $regex: search, $options: 'i' },
          },
        ],
      });
    }

    console.log(dbQuery);

    const records = await this.RecordModel.find(dbQuery);

    return records;
  }

  async getBoxes() {
    const boxes = await this.RecordModel.distinct('box');

    return boxes;
  }

  async getCatalogs() {
    const catalogs = await this.RecordModel.distinct('catalog');

    return catalogs;
  }

  async createRecord(payload) {
    const {
      box,
      catalog,
      kind,
      category,
      expirationDate,
      purchaseDate,
      value,
      tags,
      notes,
    } = payload;

    const newRecord = new this.RecordModel({
      box,
      catalog,
      kind,
      category,
      value,
      tags,
      notes,
    });

    if (expirationDate) {
      Object.assign(newRecord, {
        expirationDate: new Date(expirationDate),
      });
    }

    if (purchaseDate) {
      Object.assign(newRecord, {
        purchaseDate: new Date(purchaseDate),
      });
    }

    await newRecord.save();

    return newRecord;
  }

  async updateRecord(recordId, payload) {
    const record = await this.RecordModel.findById(recordId);

    const {
      box,
      catalog,
      kind,
      category,
      expirationDate,
      purchaseDate,
      value,
      tags,
      notes,
    } = payload;

    Object.assign(record, {
      box,
      catalog,
      kind,
      category,
      value,
      tags,
      notes,
    });

    if (expirationDate) {
      Object.assign(record, {
        expirationDate: new Date(expirationDate),
      });
    }

    if (purchaseDate) {
      Object.assign(record, {
        purchaseDate: new Date(purchaseDate),
      });
    }

    await record.save();

    return record;
  }

  async deleteRecord(recordId) {
    await this.RecordModel.deleteOne({ _id: recordId });
  }
}
