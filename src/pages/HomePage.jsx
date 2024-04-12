import React, { useEffect, useState } from "react";
import HomeMain from "../components/home/HomeMain";
import { baseURL } from "../App";
import store from "../store";
import { UIActions } from "../store/ui";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import UpdatedDetailedComp from "../components/detailComp/UpdatedDetailedComp";

const HomePage = () => {
    const data = useLoaderData();

    // const [latest, setLatest] = useState([]);
    // const [loading, setLoading] = useState(true); // Add loading state
    const loading = useSelector((state) => state.ui.isLoading);

    // useEffect(() => {
    //     async function fetchData() {
    //         // Your data fetching logic...
    //         try {
    //             const [
    //                 newestClass,
    //                 newestHomework,
    //                 newestExercise,
    //                 newestHandout,
    //             ] = await loader();
    //             setLatest([
    //                 newestClass,
    //                 newestHomework,
    //                 newestExercise,
    //                 newestHandout,
    //             ]);
    //             setLoading(false); // Set loading to false after data is fetched
    //         } catch (error) {
    //             console.error("Failed to fetch data: ", error);
    //             setLoading(false); // Also set loading to false in case of error
    //         }
    //     }
    //     fetchData();
    // }, []);

    return (
        <>
            {/* <Toolbar /> */}
            {/* <HomeMain data={data} loading={loading} /> */}
            <UpdatedDetailedComp data={data} loading={loading}/>
        </>
    );
};

export default HomePage;

// export async function loader() {
//     const url1 = `${baseURL}/ce/v1/krc_classes`;
//     const url2 = `${baseURL}/ce/v1/krc_homework`;
//     const url3 = `${baseURL}/wp/v2/krc-exercise`;
//     const url4 = `${baseURL}/ce/v1/krc_handouts`;

//     try {
//         // Execute all fetch requests concurrently
//         const responses = await Promise.all([
//             fetch(url1),
//             fetch(url2),
//             fetch(url3),
//             fetch(url4),
//         ]);

//         // Check if any of the responses are not ok
//         if (!responses.every((response) => response.ok)) {
//             throw new Error("Failed to fetch data");
//         }

//         // Parse JSON responses concurrently
//         const [data1, data2, data3, data4] = await Promise.all(
//             responses.map((response) => response.json())
//         );

//         // Function to find the object with the highest id in each data set
//         const findHighestIdObject = (dataSet) =>
//             dataSet.reduce(
//                 (max, item) => (item.id > max.id ? item : max),
//                 dataSet[0]
//             );

//         // Find the object with the highest id in each dataset
//         const newestClass = findHighestIdObject(data1);
//         const newestHomework = findHighestIdObject(data2);
//         //exercise gotta be transformed first, because it's default return form wp, other 2 alan optimized to the list below, that's why you're manipulating it first
//         const newestExerciseArray = data3.map((item) => ({
//             id: item.id,
//             title: item.title.rendered,
//             content: item.content.rendered,
//             slug: item.id.toString(),
//             class_text: item.acf.class_text,
//             class_video_url: item.acf.class_video_url,
//             class_week_description: item.acf.class_week_description,
//             class_document_1: item.acf.class_document_1,
//             class_document_2: item.acf.class_document_2,
//             class_document_3: item.acf.class_document_3,
//         }));
//         const newestExercise = findHighestIdObject(newestExerciseArray);
//         const newestHandout = findHighestIdObject(data4);

//         // Return an object containing the highest id object from each API call
//         return [newestClass, newestExercise, newestHomework, newestHandout];
//     } catch (error) {
//         // Handle any errors that occurred during fetch or JSON parsing
//         throw new Error(error.message);
//     }
// }

export async function loader() {
    store.dispatch(UIActions.isLoading(true));

    const url1 = `${baseURL}/ce/v1/krc_classes`;

    try {
        // Execute the fetch request
        const response1 = await fetch(url1);

        // Check if the response is ok
        if (!response1.ok) {
            throw new Error("Failed to fetch class data");
        }

        // Parse the JSON response
        const data1 = await response1.json();

        // Function to find the object with the highest class_number in the data set
        const findHighestClassNumberObject = (dataSet) =>
            dataSet.reduce((max, item) => {
                const maxClassNumber = parseInt(max.class_number, 10);
                const currentItemClassNumber = parseInt(item.class_number, 10);
                return currentItemClassNumber > maxClassNumber ? item : max;
            }, dataSet[0]);

        // Find the object with the highest class_number in the dataset
        const newestClass = findHighestClassNumberObject(data1);


        
        // Return the object with the highest class_number
        const transformedData = {
            ...newestClass,
        };
        store.dispatch(UIActions.isLoading(false));
        return transformedData;
    } catch (error) {
        // Handle any errors that occurred during fetch or JSON parsing
        throw new Error(error.message);
    }
}
