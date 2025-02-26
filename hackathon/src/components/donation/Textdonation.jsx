// import React from 'react'
import "./style.css"
import img1 from "../../assets/decoration/FoodDonation.jpg"
import img2 from "../../assets/decoration/HAI_20191125_WFP-Alexis_Masciarelli_0975.jpg"
import img3 from "../../assets/decoration/Hungry.jpg"
import img4 from "../../assets/decoration/joinus.jpg"
import img5 from "../../assets/decoration/kenya-photo-5.jpg"
import img6 from "../../assets/decoration/Kids.jpg"
import img7 from "../../assets/decoration/ourmission.jpg"
import img8 from "../../assets/About/help.jpg"
import img9 from "../../assets/decoration/pexels-thom-gonzalez-3126166-6836476.jpg"
import img10 from "../../assets/decoration/hunger_1665841206251_1665841211558_1665841211558.avif"
import img11 from "../../assets/decoration/WF1692199_IMG_1756-1024x683.jpg"
import img12 from "../../assets/decoration/th (4).jpeg"

function Textdonation() {
  return (
    <div className="text-deco-box w-full h-screen grid grid-rows-4 p-5">
        <div className="grid w-full grid-cols-4 gap-3">
            <div className="image-text-deco">
                <img src={img1} alt="" />
            </div>
            <div className="image-text-deco">
                <img src={img2} alt="" />
            </div>
            <div className="texts">Our</div>
            <div className="image-text-deco">
                <img src={img3} alt="" />
            </div>
        </div>
        <div className="grid w-full grid-cols-4 gap-3">
            <div className="image-text-deco">
                <img src={img4} alt="" />
            </div>
            <div className="texts">Mission:</div>
            <div className="image-text-deco">
                <img src={img5} alt="" />
            </div>
            <div className="image-text-deco">
                <img src={img6} alt="" />
            </div>
        </div>
        <div className="grid w-full grid-cols-4 gap-3">
            <div className="image-text-deco">
                <img src={img7} alt="" />
            </div>
            <div className="image-text-deco">
                <img src={img8} alt="" />
            </div>
            <div className="texts">Nourish</div>
            <div className="image-text-deco">
                <img src={img9} alt="" />
            </div>
        </div>
        <div className="grid w-full grid-cols-4 gap-3">
            <div className="image-text-deco">
                <img src={img10} alt="" />
            </div>
            <div className="texts">lives.</div>
            <div className="image-text-deco">
                <img src={img11} alt="" />
            </div>
            <div className="image-text-deco">
                <img src={img12} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Textdonation