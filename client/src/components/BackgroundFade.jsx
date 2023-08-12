// This is a reusable component for fading the background when a form, menu, lightbox, etc, is activated and...
// ...allows clicking of background to close component when this component is passed the form (..etc) visibility state as a property.

// PROPS:
// "componentToggle" is setState to toggle rendering/visibility of target component (and this component)
// "transparent" is boolean to indicate darkened background (set to "false") or transparent background (set to "true") 
// CSS STYLING:
// is located in App.css as of today
// "z-index: 1000;" to achive seperation of background clicks vs form/menu interactions 
// NOTE: z-index may have to be manually set on form/menu component to prevent closing of component when clicking inside of it.
const BackgroundFade = (props) => {
  const { componentToggle, componentClose, transparent } = props;
  
  const close = () => {
    componentToggle ? componentToggle(false) : componentClose && componentClose();
  }

  return (
    <div className={transparent ? "background-glass" : "background-fade"} onClick={() => close()} ></div>
  )
}

export default BackgroundFade;