import React from "react";
import DrawerItemListView from "../../components/data-display/DrawerItemListView";
const menuItems = [
    {
        text: "Food Log",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/handouts-food_log.pdf",
    },
    {
        text: "Faith",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_1/Notes.pdf",
    },
    {
        text: "Devotion",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_1/Book_Excerpt.pdf",
    },
    {
        text: "Faith always wins",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_1/Faith_Always_Wins.pdf",
    },
    {
        text: "Psalm 92",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_1/Psalm_92.pdf",
    },
    {
        text: "Mind Renewal Scriptures",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_2/WK2_KRC_MIND_RENEWAL_SCRIPTURES.pdf",
    },
    {
        text: "Dominating the Flesh",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_2/DominatingtheFlesh.pdf",
    },
];

const Handouts = () => {
    return <DrawerItemListView data={menuItems} />;
};

export default Handouts;
