import React from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteGame } from '../../redux/actions';
import s from './GameCard.module.css';
// import deleteImage from '../../img/delete.png';


export default function GameCard(props) {
    const deleteImage = "https://res.cloudinary.com/dkf1okbsr/image/upload/v1663212306/PI/delete_qmp3hl.png";
    
    const dispatch = useDispatch();

    function handleDelete() {
        if (window.confirm(`Do you want delete "${props.name}"?`)) {
            dispatch(deleteGame(props.id));
        };
    };

    return (
        <div className={s.card} >
            {
                props.createdInDb ?
                <div>
                    <input onClick={() => handleDelete()} className={s.button_card} type="image" src={deleteImage} alt="edit" />
                    {/* <Link to={`/home/game/edit/${props.id}`}>
                        <img src={`${"editImage"}`} alt={`${props.name}`} />
                    </Link> */}
                </div> :
                <></>
            }
            <NavLink to={`/home/game/${props.id}`} className={s.link} >
                <img src={`${props.img}`} alt={`${props.name}`} className={s.img} />
                <h2 className={s.header} >{props.name}</h2>
                <div className={s.cardContent} >
                    <p className={s.card_text} >
                        {
                            props.genres?.reduce((text, genre) => text + (text ? " - " : " ") + genre, "")
                        }
                    </p>
                </div>
                <div className={s.card_rating} >
                    <p className={s.card_text} >{`${props.rating}`}</p>
                    <div>
                        <span 
                            className={Math.round(props.rating) >= 1 ? s.star_rating : ""} 
                        >★</span>
                        <span 
                            className={Math.round(props.rating) >= 2 ? s.star_rating : ""} 
                        >★</span>
                        <span 
                            className={Math.round(props.rating) >= 3 ? s.star_rating : ""} 
                        >★</span>
                        <span 
                            className={Math.round(props.rating) >= 4 ? s.star_rating : ""} 
                        >★</span>
                        <span 
                            className={Math.round(props.rating) === 5 ? s.star_rating : ""} 
                        >★</span>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};