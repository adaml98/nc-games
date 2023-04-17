import { useState, useEffect } from "react"
import * as api from '../api.js'

export default function Reviews(){
    const [reviews, setReviews] = useState([]);
    useEffect(()=> {
        api.getReviews().then((data) => {
        setReviews(data.reviews);
    });
    }, [])

    return <>{reviews.map(({review_id, title, review_img_url, owner,votes}) => {
        return <li key={review_id}>
            <h2>{title}</h2>
            <img src={review_img_url} alt="" />
            <h3>Author: {owner}</h3>
            <p>Likes:{votes}</p>
        </li>
    })}</>
}