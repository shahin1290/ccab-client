import React from "react";
import Countdown from "react-countdown";
import { useSelector, useDispatch } from "react-redux";
import { updatePromo } from "../../redux/actions/promoAction";

// Random component
const Completionist = () => {
  const dispatch = useDispatch();

  const {
    promos,
    success: promoSuccess,
    loading: promoLoading,
    error: promoError,
  } = useSelector((state) => state.promoList);

  dispatch(
    updatePromo(
      {
        ...promos[0],
        show: false,
      },
      promos[0]._id
    )
  );

  return null;
};

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <section
        className='position-sticky'
        style={{ height: "70px", background: "#eb6c85" }}
      >
        <div className='auto-container d-flex justify-content-between title text-white p-2'>
          <div>Get 20% discount today</div>
          <span>
            <span>{days}</span> <span className='text-danger ml-1'>D</span>{" "}
            <span className='pl-4'>{hours}</span>{" "}
            <span className='text-danger ml-1'>H</span>{" "}
            <span className='pl-4'>{minutes}</span>
            <span className='text-danger ml-1'>M</span>
            <span className='pl-4'>{seconds}</span>{" "}
            <span className='text-danger'>S</span>
          </span>
        </div>
      </section>
    );
  }
};

const PromoCountDown = ({ promo }) => {
  return (
    <Countdown
      date={
        new Date(promo.createdAt).getTime() +
        (promo.days * 24 * 60 * 60 +
          promo.hours * 60 * 60 +
          promo.minutes * 60) *
          1000
      }
      renderer={renderer}
    />
  );
};

export default PromoCountDown;
