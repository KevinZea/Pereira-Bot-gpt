import React, { useState, useEffect } from 'react';
import './AddToHomeScreenButton.css';

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

const AddToHomeScreenButton = () => {
  const [prompt, setPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = (event) => {
      setPrompt(event);
      setShowPopup(true);
    };

    if (!isIOS) {
      window.addEventListener('beforeinstallprompt', handler);
    }

    return () => {
      if (!isIOS) {
        window.removeEventListener('beforeinstallprompt', handler);
      }
    };
  }, []);

  const handleClick = () => {
    if (!prompt) return;

    if (isIOS) {
      // Para iOS, proporciona instrucciones al usuario para agregar a la pantalla de inicio.
      alert("Para agregar esta aplicación a tu pantalla de inicio, toca el botón Compartir y selecciona 'Agregar a la pantalla de inicio'.");
    } else {
      prompt.prompt();
      prompt.userChoice.then((result) => {
        if (result.outcome === 'accepted') {
          console.log('Usuario aceptó la solicitud de agregar a la pantalla de inicio (A2HS)');
        } else {
          console.log('Usuario rechazó la solicitud de agregar a la pantalla de inicio (A2HS)');
        }
        setPrompt(null);
        setShowPopup(false);
      });
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="popup">
          <div className='popup-text'>
            <p>{isIOS ? 'Toca el botón Compartir para agregar a la pantalla de inicio.' : 'Agrega esta aplicación a tu pantalla de inicio.'}</p>
          </div>
          <div className='btns'>
            <button className="add-button" onClick={handleClick}>
              {isIOS ? 'Instrucciones' : 'Agregar'}
            </button>
            <button className="close-button" onClick={handleClose}>
              Más Tarde
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddToHomeScreenButton;


// import React, { useState, useEffect } from 'react';
// import './AddToHomeScreenButton.css';

// const AddToHomeScreenButton = () => {
//   const [prompt, setPrompt] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     const handler = (event) => {
//       setPrompt(event);
//       setShowPopup(true);
//     };
//     window.addEventListener('beforeinstallprompt', handler);
//     return () => {
//       window.removeEventListener('beforeinstallprompt', handler);
//     };
//   }, []);

//   const handleClick = () => {
//     if (!prompt) return;
//     prompt.prompt();
//     prompt.userChoice.then((result) => {
//       if (result.outcome === 'accepted') {
//         console.log('User accepted the A2HS prompt');
//       } else {
//         console.log('User dismissed the A2HS prompt');
//       }
//       setPrompt(null);
//       setShowPopup(false);
//     });
//   };

//   const handleClose = () => {
//     setShowPopup(false);
//   };

//   return (
//     <>
//       {showPopup && (
//         <div className="popup">
//           <div className='popup-text'>
//             <p>Agrega a el Asesor
//               a tu pantalla de inicio.
//             </p>
//           </div>
//           <div className='btns'>
//             <button className="add-button" onClick={handleClick}>
//               Agregar
//             </button>
//             <button className="close-button" onClick={handleClose}>
//               Más Tarde
//             </button>

//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AddToHomeScreenButton