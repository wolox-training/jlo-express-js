const { UNPROCESSABLE_ENTITY, BAD_REQUEST } = require('../../app/errors');
const { CREATED, UPDATED, RESOURCE_DOES_NOT_EXIST, VALIDATE_SCORE_IS_IN } = require('../../config/constants');

module.exports = {
  score: {
    type: 'integer',
    example: -1
  },
  createRatingInuput: {
    type: 'object',
    properties: {
      score: {
        $ref: '#/components/schemas/score'
      }
    }
  },
  ratingCreated: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: CREATED
      },
      data: {
        type: 'object',
        properties: {
          rating: {
            type: 'object',
            properties: {
              id: {
                $ref: '#/components/schemas/id'
              },
              userId: {
                $ref: '#/components/schemas/id'
              },
              weetId: {
                $ref: '#/components/schemas/id'
              },
              score: {
                $ref: '#/components/schemas/score'
              }
            }
          }
        }
      }
    }
  },
  ratingUpdated: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: UPDATED
      },
      data: {
        type: 'object',
        properties: {
          rating: {
            type: 'object',
            properties: {
              id: {
                $ref: '#/components/schemas/id'
              },
              userId: {
                $ref: '#/components/schemas/id'
              },
              weetId: {
                $ref: '#/components/schemas/id'
              },
              score: {
                $ref: '#/components/schemas/score'
              }
            }
          }
        }
      }
    }
  },
  invalidScoreInput: {
    type: 'object',
    properties: {
      message: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            value: {
              type: 'integer',
              example: -2
            },
            msg: {
              type: 'string',
              example: `'score' ${VALIDATE_SCORE_IS_IN}`
            },
            param: {
              type: 'string',
              example: 'name'
            },
            location: {
              type: 'string',
              example: 'body'
            }
          }
        }
      },
      internal_code: {
        type: 'string',
        example: BAD_REQUEST
      }
    }
  },
  invalidResource: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: RESOURCE_DOES_NOT_EXIST
      },
      internal_code: {
        type: 'string',
        example: UNPROCESSABLE_ENTITY
      }
    }
  }
};
