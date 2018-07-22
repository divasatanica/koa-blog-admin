import mongoose from 'mongoose'
const Schema = mongoose.Schema

// structure 为数据的字段结构，collection为该种数据对应的数据库表名

const dbSchema = {
  article: {
    structure: {
      'header': String,
      'paras': Array,
      'timeStamp': String,
      'marked': String,
      'clock': String,
      'author': String,
      'tag': Array
    },
    collection: {
      collection: 'article'
    }
  },
  role: {
    structure: {
      '_id': String,
      'name': String,
      'contain': [{
        type: Schema.Types.String,
        ref: 'user'
      }]
    },
    collection: {
      collection: 'role'
    }
  },
  user: {
    structure: {
      'name': String,
      'roleId': String,
      'token': String
    },
    collection: {
      collection: 'user'
    }
  }
}

export default dbSchema