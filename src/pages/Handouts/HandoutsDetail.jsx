import React from 'react'
import { baseURL } from '../../App';
import { json, useLoaderData } from 'react-router-dom';
import DetailComp from '../../components/detailComp/DetailComp';
const HandoutsDetail = () => {
    const handout = useLoaderData()
    return ( <>
            <DetailComp data={handout}/>

    </> );
}
 
export default HandoutsDetail;

export async function loader({ params }) {
    const id = params.classId;

    const response = await fetch(`${baseURL}/ce/v1/krc_handouts_name/` + id);

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
