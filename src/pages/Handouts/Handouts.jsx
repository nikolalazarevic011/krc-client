import React from "react";
import DrawerItemListView from "../../components/helper/DrawerItemListView";
import { baseURL } from "../../App";
import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";

const Handouts = () => {
    const handouts = useRouteLoaderData("handoutsLoader");
    return <DrawerItemListView data={handouts} route={'handouts'} />;
};

export default Handouts;

export async function loader() {
    const response = await fetch(`${baseURL}/ce/v1/krc_classes`);

    // we need id, title and some kind of slug
    if (!response.ok) {
        throw json(
            { message: "Could not fetch classes." },
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
