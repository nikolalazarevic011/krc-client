import React from "react";
import { json, useLoaderData } from "react-router-dom";
import { baseURL } from "../../App";
import { Toolbar } from "@mui/material";
import DetailComp from "../../components/detailComp/DetailComp";
const HomeworkDetail = () => {
    const homeworkSingle = useLoaderData()
    return (
        <>
            <Toolbar />
            <DetailComp data={homeworkSingle} />
        </>
    );
};

export default HomeworkDetail;

export async function loader({ params }) {
    const id = params.classId;

    const response = await fetch(`${baseURL}/ce/v1/krc_homework_name/` + id);

    if (!response.ok) {
        throw json(
            { message: "Could not fetch details for this class." },
            {
                status: 500,
            }
        );
    } else {
        return response;
    }
}
