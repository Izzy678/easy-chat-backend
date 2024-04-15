import * as joi from 'joi'
import { customObjectIdValidator } from '../../utils/function/objectIdValidator'

export const initiateChatSchema  = joi.object({
ids: joi.array().items(joi.string().required()).required(),
message:joi.string().required(),
chatroomId:joi.string()
});

export const sendChatSchema = joi.object({
message:joi.string().required(),
chatroomId:joi.string().required()
});