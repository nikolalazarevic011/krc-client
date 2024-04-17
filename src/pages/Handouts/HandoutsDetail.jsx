import React from "react";
import { baseURL } from "../../App";
import { json, useLoaderData } from "react-router-dom";
import DetailComp from "../../components/detailComp/DetailComp";


//! NOT IN USE from now, handouts open into new tab straight to pdf from handouts page 

const HandoutsDetail = () => {
    const handout = useLoaderData();
    return (
        <>
            <DetailComp data={handout} />
        </>
    );
};

export default HandoutsDetail;

export async function loader({ params }) {
    const id = params.handoutId;

    const response = await fetch(`${baseURL}/ce/v1/krc_handout_name/` + id);

    if (!response.ok) {
        throw json(
            { message: "Could not fetch details for this class." },
            {
                status: 500,
            }
        );
    } else {
        const classesData = await response.json();

        const newHandouts = [];

        classesData.forEach((classItem) => {
            if (classItem.class_document_1) {
                newHandouts.push({
                    id: classItem.id,
                    slug: classItem.class_document_1,
                    title: classItem.handout_title || "Class Document 1",
                });
            }
            if (classItem.class_document_2) {
                newHandouts.push({
                    id: classItem.id,
                    slug: classItem.class_document_2,
                    title: classItem.handout_doc_2_title || "Class Document 2",
                });
            }
            if (classItem.class_document_3) {
                newHandouts.push({
                    id: classItem.id,
                    slug: classItem.class_document_3,
                    title: classItem.handout_doc_3_title || "Class Document 3",
                });
            }
            if (classItem.class_document_4) {
                newHandouts.push({
                    id: classItem.id,
                    slug: classItem.class_document_4,
                    title: classItem.handout_doc_4_title || "Class Document 4",
                });
            }
        });
        console.log(newHandouts);
        return newHandouts;
    }
}
