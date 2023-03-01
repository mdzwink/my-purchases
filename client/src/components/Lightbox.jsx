import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Lightbox = (props) => {
  const { img, handleImageClick } = props;

  return (
    <div className="lightbox" onClick={() => handleImageClick(false)}>
      <div className="back"><FontAwesomeIcon icon={faArrowLeft} /></div>
      <img src={img} alt='receipt'/>
      <div className="forward"><FontAwesomeIcon icon={faArrowRight} /></div>
    </div>
  )
}

export default Lightbox;