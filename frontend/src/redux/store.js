import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/UserSlice';
import { studentReducer } from './studentRelated/StudentSlice';
import { noticeReducer } from './noticeRelated/NoticeSlice';
//import { sclassReducer } from './sclassRelated/sclassSlice';
//import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/ComplainSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
//teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
//sclass: sclassReducer
    },
});

export default store;