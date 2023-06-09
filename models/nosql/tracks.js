const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema(
  {
    name: String,
    album: String,
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: 'ERROR URL'
      }
    },
    artist: {
      name: String,
      nickname: String,
      nationality: String,
    },
    duration: {
      start: Number,
      end: Number,
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

TrackSchema.pre('find', function() {
  this.where({ isDeleted: false });
})

TrackSchema.pre('findOne', function() {
  this.where({ isDeleted: false });
});

TrackSchema.statics.findAllData = function() {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: 'storages',
        localField: 'mediaId',
        foreignField: '_id',
        as: 'audio'
      }
    },
    {
      $unwind: '$audio'
    }
  ])
  return joinData;
}

TrackSchema.statics.findOneData = function(id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id)
      }
    },
    {
      $lookup: {
        from: 'storages',
        localField: 'mediaId',
        foreignField: '_id',
        as: 'audio'
      }
    },
    {
      $unwind: '$audio'
    }
  ])
  return joinData;
}

TrackSchema.methods.toJSON = function() {
  const { isDeleted, ...data } = this.toObject();
  return data;
};

module.exports = mongoose.model('Track', TrackSchema);