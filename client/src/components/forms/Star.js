import React from 'react';
import StarRating from 'react-star-ratings';

const Star = ({starClick, numberOfStars}) => (<>
    <StarRating
        changeRating={() => starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension='20px'
        starHoverColor='red'
        starSpacing='2px'
        starEmptyColor='red'
    />
    <br/>
</>
);


export default Star;