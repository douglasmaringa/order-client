import React from 'react';

function HomeCardSmall() {
    //row mb-3 for parent div
  return (
    <div class="col-md-4 mb-3">
    <div class="d-flex align-items-center list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
        <div class="list-card-image">
            <div class="star position-absolute"><span class="badge badge-success"><i class="feather-star"></i> 3.1 (300+)</span></div>
            <div class="favourite-heart text-danger position-absolute"><a href="#"><i class="feather-heart"></i></a></div>
            <div class="member-plan position-absolute"><span class="badge badge-dark">Promoted</span></div>
            <a href="restaurant.html">
                <img alt="#" src={require("../img/sales1.png")} class="img-fluid item-img w-100"/>
            </a>
        </div>
        <div class="p-3 position-relative">
            <div class="list-card-body">
                <h6 class="mb-1"><a href="restaurant.html" class="text-black">The osahan Restaurant
             </a>
                </h6>
                <p class="text-gray mb-3">North • Hamburgers • Pure veg</p>
                <p class="text-gray mb-3 time"><span class="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2"><i class="feather-clock"></i> 15–25 min</span> <span class="float-right text-black-50"> $500 FOR TWO</span></p>
            </div>
            <div class="list-card-badge">
                <span class="badge badge-danger">OFFER</span> <small>65% OSAHAN50</small>
            </div>
        </div>
    </div>
</div>);
}

export default HomeCardSmall;
