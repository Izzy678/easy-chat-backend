import {Types} from 'mongoose';
import * as joi from 'joi';

export const customObjectIdValidator = joi.custom((value, helpers) => {
    if (Types.ObjectId.isValid(value)) {
      return value;
    }
    return helpers.message({
      custom: 'please provide a valid object id',
    });
  });