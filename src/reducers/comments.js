import lodash from 'lodash';

import { COMMENTS_SUCCESS, ADD_COMMENT_SUCCESS } from 'consts/comments';

function isCommentsEqual(first, second) {
  return first._id === second._id;
}

function selectCommentsInfo(state, companyId) {
  return (
    state[companyId] || {
      commentsCount: 0,
      comments: [],
      totalPages: 0,
      currentPage: 0,
    }
  );
}

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_SUCCESS: {
      const { companyId, page, payload } = action;
      const newComments = payload.comments;
      const prevComments = selectCommentsInfo(state, companyId).comments;
      const nextComments =
        page === 1
          ? newComments
          : lodash.uniqWith([...prevComments, ...newComments], isCommentsEqual);
      return Object.assign({}, state, {
        [companyId]: {
          ...payload,
          comments: nextComments,
        },
      });
    }

    case ADD_COMMENT_SUCCESS: {
      const { companyId, payload: newComment } = action;
      const commentsInfo = selectCommentsInfo(state, companyId);
      const prevComments = commentsInfo.comments;
      const nextComments = [newComment, ...prevComments];
      return Object.assign({}, state, {
        [companyId]: {
          ...commentsInfo,
          comments: nextComments,
          commentsCount: commentsInfo.commentsCount + 1,
        },
      });
    }

    default:
      return state;
  }
};

export default commentsReducer;
