import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import TableViewTemplate from './TableViewTemplate';

const SeeNotice = () => {
    const dispatch = useDispatch();
    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error, response } = useSelector(state => state.notice);

    useEffect(() => {
        const userId = currentRole === "Admin" ? currentUser._id : currentUser.school._id;
        dispatch(getAllNotices(userId, "Notice"));
    }, [dispatch, currentUser, currentRole]);

    if (error) {
        return (
            <div className="mt-5 text-red-500">
                An error occurred while fetching notices: {error.message}
            </div>
        );
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList.map(notice => {
        const date = new Date(notice.date);
        const dateString = !isNaN(date) ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    return (
        <div className="mt-12 mr-5">
            {loading ? (
                <div className="flex justify-center mt-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
            ) : response ? (
                <div className="text-lg">
                    No Notices to Show Right Now
                </div>
            ) : (
                <>
                    <h3 className="text-2xl mb-10">Notices</h3>
                    <div className="overflow-hidden shadow-lg border rounded-lg">
                        {Array.isArray(noticesList) && noticesList.length > 0 &&
                            <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                        }
                    </div>
                </>
            )}
        </div>
    );
};

export default SeeNotice;
